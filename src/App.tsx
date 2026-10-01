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

  // Search Feedback & Network Query State
  const [isSearchingLta, setIsSearchingLta] = useState<boolean>(false);
  const [searchNotification, setSearchNotification] = useState<{
    type: 'success' | 'info' | 'error';
    text: string;
  } | null>(null);

  const showNotification = (text: string, type: 'success' | 'info' | 'error' = 'info') => {
    setSearchNotification({ text, type });
    setTimeout(() => {
      setSearchNotification((prev) => (prev?.text === text ? null : prev));
    }, 5000);
  };

  // Active current bus stop and active focus service
  const currentStop = stops.find((s) => s.id === currentStopId) || stops[0];
  const activeService: BusService =
    currentStop.services.find((s) => s.serviceNo === selectedServiceNo) ||
    currentStop.services[0] ||
    stops[0].services[0];

  // Helper to map LTA bus arrival items to BusService
  const mapLtaServicesToBusServices = (ltaServices: any[], fallbackOrigin: string): BusService[] => {
    return ltaServices.map((svc) => {
      const mapArrival = (bus: any, order: 1 | 2 | 3) => {
        if (!bus) {
          return {
            order,
            minutesText: order === 1 ? 'Arr' : `${order * 8}`,
            numericMins: order === 1 ? 0 : order * 8,
            secondsRemaining: order === 1 ? 30 : order * 480,
            vehicleType: 'Double Decker' as const,
            load: 'SEA' as const,
            wab: true,
            statusLabel: order === 1 ? 'ARRIVING' : 'On Schedule'
          };
        }
        return {
          order,
          minutesText: bus.FormattedArrival || (bus.MinutesUntilArrival <= 0 ? 'Arr' : `${bus.MinutesUntilArrival}`),
          numericMins: bus.MinutesUntilArrival ?? (order === 1 ? 0 : order * 8),
          secondsRemaining: bus.SecondsRemaining ?? (order === 1 ? 30 : order * 480),
          vehicleType: (bus.VehicleTypeLabel || (bus.Type === 'DD' ? 'Double Decker' : 'Single Deck')) as any,
          load: (bus.Load || 'SEA') as any,
          wab: bus.Feature === 'WAB' || bus.IsWab === true,
          statusLabel: (bus.MinutesUntilArrival ?? 0) <= 0 ? 'ARRIVING' : 'On Schedule'
        };
      };

      return {
        serviceNo: svc.ServiceNo,
        category: (['518', '502'].includes(svc.ServiceNo) ? 'EXPRESS' : 'TRUNK') as any,
        destination: `Destination #${svc.NextBus?.DestinationCode || 'Terminal'}`,
        origin: fallbackOrigin,
        viaRoads: `via LTA Route Corridor (${svc.Operator || 'SBS Transit'})`,
        fleetType: svc.NextBus?.Type === 'DD' ? 'Double Decker Fleet' : 'Single Deck Fleet',
        firstBus: '05:30',
        lastBus: '23:45',
        peakHeadway: '6 - 9 mins',
        offPeakHeadway: '10 - 14 mins',
        activeVehicleReg: `${svc.Operator || 'SBS'} ${svc.ServiceNo} (LTA Live)`,
        vehicleModel: svc.NextBus?.Type === 'DD' ? 'Double Decker (LTA)' : 'Single Deck (LTA)',
        distanceKm: 18.5,
        adultFare: 2.05,
        concessionFare: 0.94,
        trafficStatus: 'Corridor Traffic Smooth (40 km/h)',
        speedKmh: 40,
        smoothnessPercent: 95,
        arrivals: [
          mapArrival(svc.NextBus, 1),
          mapArrival(svc.NextBus2, 2),
          mapArrival(svc.NextBus3, 3)
        ],
        routeStops: []
      };
    });
  };

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
        showNotification(`Removed Bus ${serviceNo} from bookmarks`, 'info');
      } else {
        next.add(serviceNo);
        showNotification(`Bookmarked Bus ${serviceNo}`, 'success');
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
        showNotification(`Unpinned stop`, 'info');
      } else {
        next.add(stopId);
        showNotification(`Pinned ${currentStop.name} as default stop`, 'success');
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
        showNotification(`Switched to ${matchingStop.name} (Stop #${matchingStop.code}) for Bus ${serviceNo}`, 'success');
      }
    } else {
      showNotification(`Tracking Bus Service ${serviceNo}`, 'info');
    }
  };

  // Handle search track line
  const handleTrackLine = async (overrideQuery?: string) => {
    const rawInput = overrideQuery !== undefined ? overrideQuery : searchQuery;
    const query = rawInput.trim();
    if (!query) return;

    const lowerQuery = query.toLowerCase();

    // 1. Direct 5-digit bus stop code lookup (e.g. "83139", "76191", "09048")
    if (/^\d{5}$/.test(query)) {
      const existingStop = stops.find((s) => s.code === query);
      if (existingStop) {
        setCurrentStopId(existingStop.id);
        if (existingStop.services.length > 0) {
          setSelectedServiceNo(existingStop.services[0].serviceNo);
        }
        showNotification(`Switched to ${existingStop.name} (Stop #${existingStop.code})`, 'success');
        return;
      }

      // Not yet in local array -> query live /api/bus-arrival endpoint
      setIsSearchingLta(true);
      showNotification(`Querying LTA DataMall v3 for Bus Stop #${query}...`, 'info');

      try {
        const data = await fetchBusArrivals(query);
        if (data.Services && data.Services.length > 0) {
          const generatedServices = mapLtaServicesToBusServices(data.Services, `Stop #${query}`);
          const newStop: BusStop = {
            id: `stop-${query}`,
            code: query,
            name: query === '83139' ? 'Opp Bedok South Ave 1' : `Bus Stop #${query}`,
            road: query === '83139' ? 'Bedok South Rd' : 'Singapore Transit Network',
            subLocation: 'LTA DataMall Live Feed',
            distanceMeters: 4500,
            walkMinutes: 50,
            services: generatedServices
          };

          setStops((prev) => [newStop, ...prev.filter((s) => s.id !== newStop.id)]);
          setCurrentStopId(newStop.id);
          setSelectedServiceNo(generatedServices[0].serviceNo);
          setDataSource(data.source);
          showNotification(`Loaded ${generatedServices.length} live services for Stop #${query}!`, 'success');
        } else {
          showNotification(`No bus arrivals currently reported for Stop #${query}.`, 'error');
        }
      } catch (err) {
        console.error('LTA Stop query error:', err);
        showNotification(`Could not retrieve arrivals for Stop #${query}.`, 'error');
      } finally {
        setIsSearchingLta(false);
      }
      return;
    }

    // 2. Bus service match at current stop
    const currentStopServiceMatch = currentStop.services.find(
      (s) => s.serviceNo.toLowerCase() === lowerQuery || s.destination.toLowerCase().includes(lowerQuery)
    );
    if (currentStopServiceMatch) {
      setSelectedServiceNo(currentStopServiceMatch.serviceNo);
      showNotification(`Tracking Bus ${currentStopServiceMatch.serviceNo} towards ${currentStopServiceMatch.destination}`, 'success');
      return;
    }

    // 3. Bus service match across any other stop
    for (const stop of stops) {
      const svc = stop.services.find((s) => s.serviceNo.toLowerCase() === lowerQuery);
      if (svc) {
        setCurrentStopId(stop.id);
        setSelectedServiceNo(svc.serviceNo);
        showNotification(`Found Bus ${svc.serviceNo} calling at ${stop.name} (Stop #${stop.code})`, 'success');
        return;
      }
    }

    // 4. Bus stop name or road match
    const stopMatch = stops.find(
      (s) => s.name.toLowerCase().includes(lowerQuery) || s.road.toLowerCase().includes(lowerQuery)
    );
    if (stopMatch) {
      setCurrentStopId(stopMatch.id);
      if (stopMatch.services.length > 0) {
        setSelectedServiceNo(stopMatch.services[0].serviceNo);
      }
      showNotification(`Switched to ${stopMatch.name} (Stop #${stopMatch.code})`, 'success');
      return;
    }

    // 5. Fallback: Query LTA for this service at current stop
    setIsSearchingLta(true);
    try {
      const data = await fetchBusArrivals(currentStop.code, query);
      if (data.Services && data.Services.length > 0) {
        const found = data.Services[0];
        showNotification(`Service ${found.ServiceNo} is active at Stop #${currentStop.code}`, 'success');
        setSelectedServiceNo(found.ServiceNo);
      } else {
        showNotification(`No bus services or stops found for "${query}". Try searching by service (e.g. 15, 65, 176) or 5-digit stop code (e.g. 83139, 76191).`, 'error');
      }
    } catch {
      showNotification(`No matches found for "${query}".`, 'error');
    } finally {
      setIsSearchingLta(false);
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
          {/* Real-time Search & Notification Toast */}
          {searchNotification && (
            <div
              className={`p-3.5 rounded-xl border flex items-center justify-between text-[13px] shadow-sm animate-in fade-in slide-in-from-top-2 duration-150 ${
                searchNotification.type === 'success'
                  ? 'bg-[#0E8345]/10 border-[#0E8345]/30 text-[#0E8345] font-semibold'
                  : searchNotification.type === 'error'
                  ? 'bg-[#DC2626]/10 border-[#DC2626]/30 text-[#DC2626] font-semibold'
                  : 'bg-[#5d0052]/10 border-[#5d0052]/30 text-[#5d0052] font-semibold'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">
                  {searchNotification.type === 'success'
                    ? 'check_circle'
                    : searchNotification.type === 'error'
                    ? 'error'
                    : 'info'}
                </span>
                <span>{searchNotification.text}</span>
              </div>
              <button
                onClick={() => setSearchNotification(null)}
                className="p-1 hover:opacity-75 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">close</span>
              </button>
            </div>
          )}

          {activeTab === 'bus-arrivals' && (
            <>
              {/* Top Search & Geo-Locate Console */}
              <SearchAndFilter
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                selectedServiceNo={selectedServiceNo}
                onSelectService={handleSelectService}
                onSelectStop={(stop) => {
                  setCurrentStopId(stop.id);
                  if (stop.services.length > 0) {
                    setSelectedServiceNo(stop.services[0].serviceNo);
                  }
                  showNotification(`Switched to ${stop.name} (Stop #${stop.code})`, 'success');
                }}
                onTrackLine={handleTrackLine}
                onViewAllRoutes={() => setIsScheduleOpen(true)}
                allStops={stops}
                isSearchingLta={isSearchingLta}
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
                    searchQuery={searchQuery}
                    onClearSearch={() => setSearchQuery('')}
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
