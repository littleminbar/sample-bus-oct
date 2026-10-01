import React, { useState, useRef, useEffect } from 'react';
import { BusStop } from '../types/transit';

interface SearchAndFilterProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedServiceNo: string;
  onSelectService: (serviceNo: string) => void;
  onSelectStop: (stop: BusStop) => void;
  onTrackLine: (query: string) => void;
  onViewAllRoutes: () => void;
  allStops: BusStop[];
  isSearchingLta?: boolean;
}

export const SearchAndFilter: React.FC<SearchAndFilterProps> = ({
  searchQuery,
  onSearchChange,
  selectedServiceNo,
  onSelectService,
  onSelectStop,
  onTrackLine,
  onViewAllRoutes,
  allStops,
  isSearchingLta = false
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const popularServices = ['65', '14', '15', '21', '27', '168', '176', '518 (Express)'];

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const trimmedQuery = searchQuery.trim().toLowerCase();

  // Find matching services across all stops
  const matchingServices: { serviceNo: string; destination: string; stopName: string; stopCode: string; stop: BusStop }[] = [];
  const seenServices = new Set<string>();

  // Find matching stops
  const matchingStops: BusStop[] = [];

  if (trimmedQuery.length > 0) {
    allStops.forEach((stop) => {
      // Check stop match
      if (
        stop.code.includes(trimmedQuery) ||
        stop.name.toLowerCase().includes(trimmedQuery) ||
        stop.road.toLowerCase().includes(trimmedQuery)
      ) {
        if (!matchingStops.some((s) => s.id === stop.id)) {
          matchingStops.push(stop);
        }
      }

      // Check service match
      stop.services.forEach((svc) => {
        if (
          (svc.serviceNo.toLowerCase().includes(trimmedQuery) ||
            svc.destination.toLowerCase().includes(trimmedQuery)) &&
          !seenServices.has(svc.serviceNo)
        ) {
          seenServices.add(svc.serviceNo);
          matchingServices.push({
            serviceNo: svc.serviceNo,
            destination: svc.destination,
            stopName: stop.name,
            stopCode: stop.code,
            stop
          });
        }
      });
    });
  }

  const is5DigitCode = /^\d{5}$/.test(searchQuery.trim());
  const hasLocalStopMatch = allStops.some((s) => s.code === searchQuery.trim());

  const handlePillClick = (serviceLabel: string) => {
    const rawNo = serviceLabel.replace(' (Express)', '');
    onSearchChange(rawNo);
    onSelectService(rawNo);
    setIsDropdownOpen(false);
  };

  const handleSelectServiceItem = (svc: typeof matchingServices[0]) => {
    onSearchChange(svc.serviceNo);
    onSelectStop(svc.stop);
    onSelectService(svc.serviceNo);
    setIsDropdownOpen(false);
  };

  const handleSelectStopItem = (stop: BusStop) => {
    onSearchChange(stop.code);
    onSelectStop(stop);
    if (stop.services.length > 0) {
      onSelectService(stop.services[0].serviceNo);
    }
    setIsDropdownOpen(false);
  };

  const handleTriggerSearch = () => {
    setIsDropdownOpen(false);
    onTrackLine(searchQuery);
  };

  return (
    <div ref={containerRef} className="bg-white rounded-xl p-5 shadow-xs border border-[#E4E4EB] flex flex-col gap-3.5 relative">
      {/* Title & Guidance Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
        <div>
          <span className="text-[11px] uppercase tracking-wider text-[#5d0052] font-bold">
            Real-Time Transit Hub
          </span>
          <h1 className="font-headline text-[24px] text-[#1f1925] font-bold leading-tight">
            Live Bus Telemetry &amp; Arrivals
          </h1>
        </div>
        <div className="flex items-center gap-1.5 self-start md:self-auto">
          <span className="px-2.5 py-1 rounded-full bg-[#f6eafc] text-[11px] text-[#52424c] font-medium">
            Search any 5-digit stop code or bus number
          </span>
        </div>
      </div>

      {/* Search Input Box */}
      <div className="relative w-full">
        <div className="flex items-center bg-[#f0e4f6]/80 rounded-xl px-3.5 py-1.5 border border-transparent focus-within:border-[#7b1c6d] focus-within:bg-white focus-within:shadow-sm transition-all">
          <span className="material-symbols-outlined text-[#5d0052] text-[22px] mr-2">
            search
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              onSearchChange(e.target.value);
              setIsDropdownOpen(true);
            }}
            onFocus={() => {
              if (searchQuery.trim().length > 0) {
                setIsDropdownOpen(true);
              }
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleTriggerSearch();
            }}
            placeholder="Search bus service (e.g. 15, 65, 176) or bus stop code (e.g. 83139, 76191)..."
            className="w-full bg-transparent text-[#1f1925] text-[15px] placeholder:text-[#52424c]/60 focus:outline-none py-1"
          />

          {searchQuery && (
            <button
              onClick={() => {
                onSearchChange('');
                setIsDropdownOpen(false);
              }}
              className="p-1 rounded-full hover:bg-[#eadef0] text-[#52424c] mr-1 transition-colors cursor-pointer"
              title="Clear search"
            >
              <span className="material-symbols-outlined text-[18px]">cancel</span>
            </button>
          )}

          <button
            onClick={handleTriggerSearch}
            disabled={isSearchingLta}
            className="flex items-center gap-1 px-3.5 py-1.5 rounded-lg bg-[#5d0052] text-white text-[12px] font-semibold hover:bg-[#7b1c6d] transition-transform active:scale-95 shadow-xs whitespace-nowrap cursor-pointer disabled:opacity-70"
          >
            {isSearchingLta ? (
              <>
                <span className="material-symbols-outlined text-[16px] animate-spin">sync</span>
                <span className="hidden sm:inline">Querying LTA...</span>
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-[16px]">travel_explore</span>
                <span className="hidden sm:inline">Track Line</span>
              </>
            )}
          </button>
        </div>

        {/* Live Search Suggestions Dropdown */}
        {isDropdownOpen && trimmedQuery.length > 0 && (
          <div className="absolute left-0 right-0 top-full mt-1.5 bg-white rounded-2xl shadow-xl border border-[#E4E4EB] overflow-hidden z-40 max-h-80 overflow-y-auto animate-in fade-in duration-100">
            {/* Direct LTA DataMall Query Option if 5 digits */}
            {is5DigitCode && !hasLocalStopMatch && (
              <div
                onClick={handleTriggerSearch}
                className="p-3 bg-[#fbf0ff] border-b border-[#E4E4EB] flex items-center justify-between cursor-pointer hover:bg-[#f6eafc] transition-colors"
              >
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#0E8345] text-[20px]">cloud_sync</span>
                  <div className="flex flex-col">
                    <span className="text-[13px] font-bold text-[#5d0052]">
                      Query LTA DataMall v3 Live for Stop #{searchQuery.trim()}
                    </span>
                    <span className="text-[11px] text-[#52424c]">
                      Fetch live real-time bus arrivals directly from Singapore LTA API
                    </span>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded bg-[#0E8345] text-white text-[10px] font-bold">
                  Fetch Live
                </span>
              </div>
            )}

            {/* Matching Bus Services Section */}
            {matchingServices.length > 0 && (
              <div className="p-2 border-b border-[#f0e4f6]">
                <span className="px-2 py-1 text-[11px] uppercase tracking-wider text-[#52424c] font-bold block">
                  Bus Services ({matchingServices.length})
                </span>
                <div className="flex flex-col gap-1 mt-1">
                  {matchingServices.slice(0, 5).map((svc) => (
                    <div
                      key={svc.serviceNo}
                      onClick={() => handleSelectServiceItem(svc)}
                      className="px-3 py-2 rounded-lg hover:bg-[#fbf0ff] flex items-center justify-between cursor-pointer transition-colors"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="px-2.5 py-1 rounded-md bg-[#5d0052] text-white text-[12px] font-extrabold min-w-[42px] text-center">
                          {svc.serviceNo}
                        </span>
                        <div className="flex flex-col">
                          <span className="text-[13px] font-bold text-[#1f1925]">
                            To {svc.destination}
                          </span>
                          <span className="text-[11px] text-[#52424c]">
                            Calling at {svc.stopName} (#{svc.stopCode})
                          </span>
                        </div>
                      </div>
                      <span className="text-[11px] text-[#5d0052] font-semibold flex items-center gap-0.5">
                        Track <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Matching Bus Stops Section */}
            {matchingStops.length > 0 && (
              <div className="p-2">
                <span className="px-2 py-1 text-[11px] uppercase tracking-wider text-[#52424c] font-bold block">
                  Bus Stops ({matchingStops.length})
                </span>
                <div className="flex flex-col gap-1 mt-1">
                  {matchingStops.slice(0, 5).map((stop) => (
                    <div
                      key={stop.id}
                      onClick={() => handleSelectStopItem(stop)}
                      className="px-3 py-2 rounded-lg hover:bg-[#fbf0ff] flex items-center justify-between cursor-pointer transition-colors"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="px-2 py-0.5 rounded bg-[#352e3b] text-white text-[11px] font-bold tabular-nums">
                          {stop.code}
                        </span>
                        <div className="flex flex-col">
                          <span className="text-[13px] font-bold text-[#1f1925]">
                            {stop.name}
                          </span>
                          <span className="text-[11px] text-[#52424c]">
                            {stop.road} · {stop.services.length} services
                          </span>
                        </div>
                      </div>
                      <span className="text-[11px] text-[#5d0052] font-semibold flex items-center gap-0.5">
                        View Stop <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* No immediate local matches */}
            {matchingServices.length === 0 && matchingStops.length === 0 && (
              <div className="p-4 text-center">
                <p className="text-[13px] text-[#1f1925] font-semibold">
                  No local matches for &ldquo;{searchQuery}&rdquo;
                </p>
                <p className="text-[11px] text-[#52424c] mt-1">
                  Press &ldquo;Track Line&rdquo; or Enter to query the live LTA DataMall network.
                </p>
                <button
                  onClick={handleTriggerSearch}
                  className="mt-2.5 px-3 py-1.5 rounded-lg bg-[#5d0052] text-white text-[12px] font-bold hover:bg-[#7b1c6d] cursor-pointer"
                >
                  Search Singapore LTA Network
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Quick Filter Pills */}
      <div className="flex flex-wrap items-center gap-1.5 pt-1">
        <span className="text-[11px] text-[#52424c] font-semibold mr-1">
          Popular at this hub:
        </span>
        {popularServices.map((serviceLabel) => {
          const rawNo = serviceLabel.replace(' (Express)', '');
          const isSelected = selectedServiceNo === rawNo;
          return (
            <button
              key={serviceLabel}
              onClick={() => handlePillClick(serviceLabel)}
              className={`px-3 py-1 rounded-lg text-[12px] font-semibold transition-all flex items-center gap-1 cursor-pointer ${
                isSelected
                  ? 'bg-[#5d0052] text-white shadow-xs font-bold'
                  : 'bg-[#f6eafc] text-[#1f1925] hover:bg-[#eadef0]'
              }`}
            >
              <span>{serviceLabel}</span>
              {isSelected && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#0E8345]"></span>
              )}
            </button>
          );
        })}
        <button
          onClick={onViewAllRoutes}
          className="ml-auto text-[#5d0052] text-[11px] font-semibold flex items-center gap-0.5 hover:underline cursor-pointer"
        >
          <span>All Stop Routes</span>
          <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
        </button>
      </div>
    </div>
  );
};
