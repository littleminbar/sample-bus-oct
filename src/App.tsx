/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { UtilityBar } from './components/UtilityBar';
import { SearchAndFilter } from './components/SearchAndFilter';
import { NearestStopBanner } from './components/NearestStopBanner';
import { ActiveServiceHero } from './components/ActiveServiceHero';
import { AllServicesList } from './components/AllServicesList';
import { InterchangeCard } from './components/InterchangeCard';
import { RightRail } from './components/RightRail';
import { Footer } from './components/Footer';

// Modals & Secondary Screens
import { SwitchStopModal } from './components/modals/SwitchStopModal';
import { LiveTelemetryModal } from './components/modals/LiveTelemetryModal';
import { FullScheduleModal } from './components/modals/FullScheduleModal';
import { FareCalculatorModal } from './components/modals/FareCalculatorModal';
import { CommuterSettingsModal } from './components/modals/CommuterSettingsModal';

import { NearbyStopsView } from './components/views/NearbyStopsView';
import { RoutePlannerView } from './components/views/RoutePlannerView';
import { ServiceAlertsView } from './components/views/ServiceAlertsView';

import { INITIAL_BUS_STOPS } from './data/transitData';
import { BusStop, BusService } from './types/transit';
import { fetchBusArrivals, checkApiHealth } from './services/ltaApi';

export default function App() {
  // Navigation State
  const [activeTab, setActiveTab] = useState<'bus-arrivals' | 'nearby-stops' | 'route-planner' | 'service-alerts'>('bus-arrivals');

  // Stops & Active Service State
  const [stops, setStops] = useState<BusStop[]>(INITIAL_BUS_STOPS);
  const [currentStopId, setCurrentStopId] = useState<string>('stop-76191');
  const [selectedServiceNo, setSelectedServiceNo] = useState<string>('65');
  const [searchQuery, setSearchQuery] = useState<string>('65');

  // Telemetry Engine State
  const [countdown, setCountdown] = useState<number>(12);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [secondsSinceRefresh, setSecondsSinceRefresh] = useState<number>(8);
  const [refreshInterval, setRefreshInterval] = useState<number>(15);
  const [dataSource, setDataSource] = useState<'lta_datamall' | 'simulated_fallback'>('lta_datamall');
  const [hasKeyConfigured, setHasKeyConfigured] = useState<boolean>(false);

  // Commuter Preferences & Bookmarks
  const [bookmarkedServices, setBookmarkedServices] = useState<Set<string>>(new Set(['65']));
  const [pinnedStops, setPinnedStops] = useState<Set<string>>(new Set(['stop-76191']));
  const [alertsEnabled, setAlertsEnabled] = useState<boolean>(true);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  // Modals Open State
  const [isSwitchStopOpen, setIsSwitchStopOpen] = useState<boolean>(false);
  const [isLiveStreamOpen, setIsLiveStreamOpen] = useState<boolean>(false);
  const [isScheduleOpen, setIsScheduleOpen] = useState<boolean>(false);
  const [isFareCalculatorOpen, setIsFareCalculatorOpen] = useState<boolean>(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);

  // Active current bus stop and active focus service
  const currentStop = stops.find((s) => s.id === currentStopId) || stops[0];
  const activeService: BusService =
    currentStop.services.find((s) => s.serviceNo === selectedServiceNo) ||
    currentStop.services[0] ||
    stops[0].services[0];

  // Fetch real-time bus arrivals from LTA endpoint /api/bus-arrival
  const loadArrivals = useCallback(async (stopCode: string, svcNo?: string) => {
    try {
      const data = await fetchBusArrivals(stopCode, svcNo);
      setDataSource(data.source);
      if (data.hasAccountKeyConfigured !== undefined) {
        setHasKeyConfigured(data.hasAccountKeyConfigured);
      }

      if (data.Services && data.Services.length > 0) {
        setStops((prevStops) =>
          prevStops.map((stop) => {
            if (stop.code !== stopCode) return stop;

            const updatedServices = stop.services.map((existingSvc) => {
              const incoming = data.Services.find((s) => s.ServiceNo === existingSvc.serviceNo);
              if (!incoming) return existingSvc;

              const mapLtaBus = (nextBus: any, order: 1 | 2 | 3) => {
                if (!nextBus) {
                  return existingSvc.arrivals[order - 1];
                }
                return {
                  order,
                  minutesText: nextBus.FormattedArrival || (nextBus.MinutesUntilArrival <= 0 ? 'Arr' : `${nextBus.MinutesUntilArrival}`),
                  numericMins: nextBus.MinutesUntilArrival ?? 0,
                  secondsRemaining: nextBus.SecondsRemaining ?? 30,
                  vehicleType: (nextBus.VehicleTypeLabel || (nextBus.Type === 'DD' ? 'Double Decker' : 'Single Deck')) as any,
                  load: (nextBus.Load || 'SEA') as any,
                  wab: nextBus.Feature === 'WAB' || nextBus.IsWab === true,
                  statusLabel: (nextBus.MinutesUntilArrival ?? 0) <= 0 ? 'ARRIVING' : 'On Schedule'
                };
              };

              const newArrivals = [
                mapLtaBus(incoming.NextBus, 1),
                mapLtaBus(incoming.NextBus2, 2),
                mapLtaBus(incoming.NextBus3, 3)
              ] as [any, any, any];

              return {
                ...existingSvc,
                arrivals: newArrivals
              };
            });

            return {
              ...stop,
              services: updatedServices
            };
          })
        );
      }
    } catch (err) {
      console.warn('Arrival fetch fallback active:', err);
    }
  }, []);

  // Check health of /api/health and load initial arrivals on mount
  useEffect(() => {
    checkApiHealth()
      .then((health) => {
        setHasKeyConfigured(health.apis.busArrival.hasLtaAccountKey);
      })
      .catch(() => {});

    loadArrivals(currentStop.code, selectedServiceNo);
  }, [currentStop.code, selectedServiceNo, loadArrivals]);

  // Auto-refresh countdown loop
  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsSinceRefresh((prev) => prev + 1);

      if (!isPaused) {
        setCountdown((prev) => {
          if (prev <= 1) {
            // Trigger fresh sync
            setIsSyncing(true);
            setSecondsSinceRefresh(0);
            loadArrivals(currentStop.code, selectedServiceNo);
            setTimeout(() => setIsSyncing(false), 800);
            return refreshInterval;
          }
          return prev - 1;
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [isPaused, refreshInterval, currentStop.code, selectedServiceNo, loadArrivals]);

  // Handle manual force sync
  const handleManualRefresh = () => {
    setIsSyncing(true);
    setCountdown(refreshInterval);
    setSecondsSinceRefresh(0);
    loadArrivals(currentStop.code, selectedServiceNo);
    setTimeout(() => setIsSyncing(false), 800);
  };

  // Toggle bookmark for current service
  const handleToggleBookmark = (serviceNo: string) => {
    setBookmarkedServices((prev) => {
      const next = new Set(prev);
      if (next.has(serviceNo)) {
        next.delete(serviceNo);
      } else {
        next.add(serviceNo);
      }
      return next;
    });
  };

  // Toggle pinned stop
  const handleTogglePin = (stopId: string) => {
    setPinnedStops((prev) => {
      const next = new Set(prev);
      if (next.has(stopId)) {
        next.delete(stopId);
      } else {
        next.add(stopId);
      }
      return next;
    });
  };

  // Handle service selection (e.g. from pill, card click, search)
  const handleSelectService = (serviceNo: string) => {
    setSelectedServiceNo(serviceNo);
    setSearchQuery(serviceNo);
    // If the active stop does not have this service, check if another stop has it
    if (!currentStop.services.some((s) => s.serviceNo === serviceNo)) {
      const matchingStop = stops.find((st) => st.services.some((s) => s.serviceNo === serviceNo));
      if (matchingStop) {
        setCurrentStopId(matchingStop.id);
      }
    }
  };

  // Handle search track line
  const handleTrackLine = () => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return;

    // Search by bus service
    const serviceMatch = currentStop.services.find(
      (s) => s.serviceNo.toLowerCase() === query || s.destination.toLowerCase().includes(query)
    );
    if (serviceMatch) {
      setSelectedServiceNo(serviceMatch.serviceNo);
      return;
    }

    // Search across all stops for this service
    for (const stop of stops) {
      const svc = stop.services.find((s) => s.serviceNo.toLowerCase() === query);
      if (svc) {
        setCurrentStopId(stop.id);
        setSelectedServiceNo(svc.serviceNo);
        return;
      }
    }

    // Search by stop name or code
    const stopMatch = stops.find(
      (s) => s.code.includes(query) || s.name.toLowerCase().includes(query) || s.road.toLowerCase().includes(query)
    );
    if (stopMatch) {
      setCurrentStopId(stopMatch.id);
    }
  };

  return (
    <div className="bg-[#F4F4F6] text-[#1f1925] font-['Inter',sans-serif] antialiased min-h-screen flex flex-col selection:bg-[#5d0052]/20">
      {/* Fixed Municipal Header */}
      <Header
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        currentLocationName={`${currentStop.road} / ${currentStop.subLocation.split('·')[0].trim()}`}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onSwitchStop={() => setIsSwitchStopOpen(true)}
      />

      {/* Main Content Area */}
      <main className="w-full pt-16 flex-1 bg-[#F4F4F6]">
        {/* Real-Time Telemetry Utility Strip */}
        <UtilityBar
          countdown={countdown}
          isPaused={isPaused}
          onTogglePause={() => setIsPaused(!isPaused)}
          onManualRefresh={handleManualRefresh}
          isSyncing={isSyncing}
          dataSource={dataSource}
          hasKeyConfigured={hasKeyConfigured}
        />

        {/* Dynamic Main View Switcher */}
        <div className="max-w-[1280px] mx-auto w-full px-4 md:px-10 py-5 flex flex-col gap-5">
          {activeTab === 'bus-arrivals' && (
            <>
              {/* Top Search & Geo-Locate Console */}
              <SearchAndFilter
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                selectedServiceNo={selectedServiceNo}
                onSelectService={handleSelectService}
                onTrackLine={handleTrackLine}
                onViewAllRoutes={() => setIsScheduleOpen(true)}
              />

              {/* Detected Nearest Bus Stop Banner */}
              <NearestStopBanner
                currentStop={currentStop}
                secondsSinceRefresh={secondsSinceRefresh}
                onSwitchStop={() => setIsSwitchStopOpen(true)}
                isPinned={pinnedStops.has(currentStop.id)}
                onTogglePin={() => handleTogglePin(currentStop.id)}
              />

              {/* Active Service Highlight Bento (Focus Bus 65) */}
              <ActiveServiceHero
                service={activeService}
                onOpenLiveStream={() => setIsLiveStreamOpen(true)}
                onOpenSchedule={() => setIsScheduleOpen(true)}
                isBookmarked={bookmarkedServices.has(activeService.serviceNo)}
                onToggleBookmark={() => handleToggleBookmark(activeService.serviceNo)}
              />

              {/* Multi-Column Layout: Other Services Grid & Right Insights Rail */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                {/* Left Column (8 cols): All Services Stream + Interchange Transfer */}
                <div className="lg:col-span-8 flex flex-col gap-5">
                  <AllServicesList
                    services={currentStop.services}
                    selectedServiceNo={selectedServiceNo}
                    onSelectService={handleSelectService}
                    secondsSinceRefresh={secondsSinceRefresh}
                  />

                  {/* Interchange Transit Connection Card */}
                  <InterchangeCard
                    onExploreHub={() => {
                      alert("Tampines MRT Interchange: Connect to East-West Line (EW2) towards Pasir Ris / Tuas Link, and Downtown Line (DT32) towards Bukit Panjang / Expo.");
                    }}
                  />
                </div>

                {/* Right Rail (4 cols): Service Status, Operating Timings, Fare Preview, Commuter Legend */}
                <div className="lg:col-span-4">
                  <RightRail
                    service={activeService}
                    onOpenFareCalculator={() => setIsFareCalculatorOpen(true)}
                    onOpenAlerts={() => setActiveTab('service-alerts')}
                  />
                </div>
              </div>
            </>
          )}

          {activeTab === 'nearby-stops' && (
            <NearbyStopsView
              stops={stops}
              currentStopId={currentStopId}
              onSelectStop={(stop) => {
                setCurrentStopId(stop.id);
                if (stop.services.length > 0) {
                  setSelectedServiceNo(stop.services[0].serviceNo);
                }
              }}
              onBackToArrivals={() => setActiveTab('bus-arrivals')}
            />
          )}

          {activeTab === 'route-planner' && (
            <RoutePlannerView
              onBackToArrivals={() => setActiveTab('bus-arrivals')}
              onSelectServiceNo={(svcNo) => {
                handleSelectService(svcNo);
                setActiveTab('bus-arrivals');
              }}
            />
          )}

          {activeTab === 'service-alerts' && (
            <ServiceAlertsView onBackToArrivals={() => setActiveTab('bus-arrivals')} />
          )}
        </div>
      </main>

      {/* Footer */}
      <Footer
        onOpenFareCalculator={() => setIsFareCalculatorOpen(true)}
        onOpenAlerts={() => setActiveTab('service-alerts')}
      />

      {/* Modals */}
      <SwitchStopModal
        isOpen={isSwitchStopOpen}
        onClose={() => setIsSwitchStopOpen(false)}
        stops={stops}
        currentStopId={currentStopId}
        onSelectStop={(stop) => {
          setCurrentStopId(stop.id);
          if (stop.services.length > 0) {
            setSelectedServiceNo(stop.services[0].serviceNo);
            setSearchQuery(stop.services[0].serviceNo);
          }
        }}
      />

      <LiveTelemetryModal
        isOpen={isLiveStreamOpen}
        onClose={() => setIsLiveStreamOpen(false)}
        service={activeService}
      />

      <FullScheduleModal
        isOpen={isScheduleOpen}
        onClose={() => setIsScheduleOpen(false)}
        service={activeService}
      />

      <FareCalculatorModal
        isOpen={isFareCalculatorOpen}
        onClose={() => setIsFareCalculatorOpen(false)}
        defaultDistanceKm={activeService.distanceKm}
      />

      <CommuterSettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        refreshInterval={refreshInterval}
        onSetRefreshInterval={setRefreshInterval}
        alertsEnabled={alertsEnabled}
        onToggleAlerts={() => setAlertsEnabled(!alertsEnabled)}
        soundEnabled={soundEnabled}
        onToggleSound={() => setSoundEnabled(!soundEnabled)}
      />
    </div>
  );
}
