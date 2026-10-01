import React, { useState } from 'react';
import { BusService } from '../types/transit';

interface AllServicesListProps {
  services: BusService[];
  selectedServiceNo: string;
  onSelectService: (serviceNo: string) => void;
  secondsSinceRefresh: number;
  searchQuery?: string;
  onClearSearch?: () => void;
}

export const AllServicesList: React.FC<AllServicesListProps> = ({
  services,
  selectedServiceNo,
  onSelectService,
  secondsSinceRefresh,
  searchQuery = '',
  onClearSearch
}) => {
  const [filterType, setFilterType] = useState<'all' | 'double' | 'wab'>('all');
  const [sortBy, setSortBy] = useState<'timing' | 'number'>('timing');
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  const cleanQuery = searchQuery.trim().toLowerCase();

  // Filter & sort services
  const filteredServices = services
    .filter((s) => {
      // Search filter if user typed text
      if (cleanQuery.length > 0) {
        const matchesNo = s.serviceNo.toLowerCase().includes(cleanQuery);
        const matchesDest = s.destination.toLowerCase().includes(cleanQuery);
        const matchesVia = s.viaRoads.toLowerCase().includes(cleanQuery);
        if (!matchesNo && !matchesDest && !matchesVia) {
          return false;
        }
      }

      if (filterType === 'double') {
        return s.fleetType.toLowerCase().includes('double');
      }
      if (filterType === 'wab') {
        return s.arrivals.some((a) => a.wab);
      }
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'number') {
        return parseInt(a.serviceNo, 10) - parseInt(b.serviceNo, 10);
      }
      // sort by nearest arrival
      return (a.arrivals[0]?.numericMins ?? 99) - (b.arrivals[0]?.numericMins ?? 99);
    });

  const renderLoadIndicator = (load: 'SEA' | 'SDA' | 'LSD') => {
    if (load === 'SEA') {
      return (
        <span className="text-[10px] font-bold text-[#0E8345] flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-[#0E8345]"></span>
          Seats Avail
        </span>
      );
    }
    if (load === 'SDA') {
      return (
        <span className="text-[10px] font-semibold text-[#D97706] flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-[#D97706]"></span>
          Standing
        </span>
      );
    }
    return (
      <span className="text-[10px] font-bold text-[#DC2626] flex items-center gap-1">
        <span className="w-1.5 h-1.5 rounded-full bg-[#DC2626]"></span>
        Limited
      </span>
    );
  };

  return (
    <div className="flex flex-col gap-3.5">
      {/* Title & Filter/Sort Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h3 className="font-headline text-[20px] text-[#1f1925] font-bold">
            All Services at Stop 76191
          </h3>
          <p className="text-[12px] text-[#52424c]">
            Sorted by arrival proximity · Updated {secondsSinceRefresh} seconds ago
          </p>
        </div>

        <div className="flex items-center gap-2 relative">
          {/* Filter Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setShowFilterDropdown(!showFilterDropdown);
                setShowSortDropdown(false);
              }}
              className="px-3 py-1.5 rounded-lg bg-white hover:bg-[#f6eafc] text-[12px] text-[#1f1925] font-semibold shadow-xs border border-[#E4E4EB] transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px] text-[#5d0052]">filter_list</span>
              <span>Filter {filterType !== 'all' ? `(${filterType})` : ''}</span>
            </button>

            {showFilterDropdown && (
              <div className="absolute right-0 mt-1 w-44 bg-white rounded-xl shadow-lg border border-[#E4E4EB] py-1.5 z-20">
                <button
                  onClick={() => { setFilterType('all'); setShowFilterDropdown(false); }}
                  className={`w-full px-3 py-1.5 text-left text-[12px] font-medium hover:bg-[#f6eafc] flex items-center justify-between ${filterType === 'all' ? 'text-[#5d0052] font-bold bg-[#fbf0ff]' : 'text-[#1f1925]'}`}
                >
                  <span>All Services</span>
                  {filterType === 'all' && <span className="material-symbols-outlined text-[14px]">check</span>}
                </button>
                <button
                  onClick={() => { setFilterType('double'); setShowFilterDropdown(false); }}
                  className={`w-full px-3 py-1.5 text-left text-[12px] font-medium hover:bg-[#f6eafc] flex items-center justify-between ${filterType === 'double' ? 'text-[#5d0052] font-bold bg-[#fbf0ff]' : 'text-[#1f1925]'}`}
                >
                  <span>Double Decker Only</span>
                  {filterType === 'double' && <span className="material-symbols-outlined text-[14px]">check</span>}
                </button>
                <button
                  onClick={() => { setFilterType('wab'); setShowFilterDropdown(false); }}
                  className={`w-full px-3 py-1.5 text-left text-[12px] font-medium hover:bg-[#f6eafc] flex items-center justify-between ${filterType === 'wab' ? 'text-[#5d0052] font-bold bg-[#fbf0ff]' : 'text-[#1f1925]'}`}
                >
                  <span>Wheelchair (WAB) Only</span>
                  {filterType === 'wab' && <span className="material-symbols-outlined text-[14px]">check</span>}
                </button>
              </div>
            )}
          </div>

          {/* Sort Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setShowSortDropdown(!showSortDropdown);
                setShowFilterDropdown(false);
              }}
              className="px-3 py-1.5 rounded-lg bg-white hover:bg-[#f6eafc] text-[12px] text-[#1f1925] font-semibold shadow-xs border border-[#E4E4EB] transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px] text-[#5d0052]">sort</span>
              <span>Timing {sortBy === 'number' ? '(By Bus No)' : ''}</span>
            </button>

            {showSortDropdown && (
              <div className="absolute right-0 mt-1 w-40 bg-white rounded-xl shadow-lg border border-[#E4E4EB] py-1.5 z-20">
                <button
                  onClick={() => { setSortBy('timing'); setShowSortDropdown(false); }}
                  className={`w-full px-3 py-1.5 text-left text-[12px] font-medium hover:bg-[#f6eafc] flex items-center justify-between ${sortBy === 'timing' ? 'text-[#5d0052] font-bold bg-[#fbf0ff]' : 'text-[#1f1925]'}`}
                >
                  <span>Nearest Timing</span>
                  {sortBy === 'timing' && <span className="material-symbols-outlined text-[14px]">check</span>}
                </button>
                <button
                  onClick={() => { setSortBy('number'); setShowSortDropdown(false); }}
                  className={`w-full px-3 py-1.5 text-left text-[12px] font-medium hover:bg-[#f6eafc] flex items-center justify-between ${sortBy === 'number' ? 'text-[#5d0052] font-bold bg-[#fbf0ff]' : 'text-[#1f1925]'}`}
                >
                  <span>Bus Number</span>
                  {sortBy === 'number' && <span className="material-symbols-outlined text-[14px]">check</span>}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Active Search Query Filter Chip */}
      {cleanQuery && (
        <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-[#fbf0ff] border border-[#E4E4EB] text-[12px]">
          <span className="text-[#52424c]">
            Filtering services matching: <strong className="text-[#5d0052] font-bold">&ldquo;{searchQuery}&rdquo;</strong>
          </span>
          {onClearSearch && (
            <button
              onClick={onClearSearch}
              className="text-[#5d0052] font-semibold hover:underline flex items-center gap-0.5 cursor-pointer"
            >
              <span>Show all services</span>
              <span className="material-symbols-outlined text-[14px]">close</span>
            </button>
          )}
        </div>
      )}

      {/* Bus Cards Stream */}
      <div className="flex flex-col gap-2.5">
        {filteredServices.length === 0 ? (
          <div className="p-8 text-center bg-white rounded-xl border border-[#E4E4EB]">
            <p className="text-[14px] font-bold text-[#1f1925]">
              No bus services at this stop match &ldquo;{searchQuery}&rdquo;
            </p>
            <p className="text-[12px] text-[#52424c] mt-1">
              Try searching by bus number or stop code in the search console above.
            </p>
            {onClearSearch && (
              <button
                onClick={onClearSearch}
                className="mt-3 px-3.5 py-1.5 rounded-lg bg-[#5d0052] text-white text-[12px] font-bold hover:bg-[#7b1c6d] cursor-pointer"
              >
                Clear Search Filter
              </button>
            )}
          </div>
        ) : (
          filteredServices.map((bus) => {
          const isSelected = selectedServiceNo === bus.serviceNo;
          const [firstArr, secondArr] = bus.arrivals;

          return (
            <div
              key={bus.serviceNo}
              onClick={() => onSelectService(bus.serviceNo)}
              className={`bg-white rounded-xl p-4 shadow-xs hover:shadow-md transition-all border flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer ${
                isSelected ? 'border-[#5d0052] ring-2 ring-[#5d0052]/15 bg-[#fbf0ff]/50' : 'border-[#E4E4EB]'
              }`}
            >
              {/* Left Info */}
              <div className="flex items-start sm:items-center gap-3.5">
                <div className="px-3.5 py-1.5 rounded-xl bg-[#5d0052] text-white font-headline text-[18px] font-extrabold shrink-0 shadow-xs min-w-[58px] text-center">
                  {bus.serviceNo}
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <h4 className="text-[14px] font-bold text-[#1f1925]">
                      {bus.destination}
                    </h4>
                    <span className="px-1.5 py-0.5 rounded bg-[#f0e4f6] text-[11px] text-[#52424c] font-medium">
                      {bus.fleetType.replace(' Fleet', '')}
                    </span>
                    {firstArr?.wab && (
                      <span className="material-symbols-outlined text-[15px] text-[#5d0052]" title="Wheelchair Accessible">
                        accessible
                      </span>
                    )}
                  </div>
                  <span className="text-[12px] text-[#52424c] line-clamp-1">
                    {bus.viaRoads}
                  </span>
                </div>
              </div>

              {/* Arrival Timings Cluster */}
              <div className="flex items-center gap-4 justify-between sm:justify-end shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#f0e4f6]">
                {/* 1st Arrival */}
                <div className="flex flex-col items-end min-w-[70px]">
                  <span className="text-[11px] text-[#52424c] uppercase font-bold tracking-wider">
                    Next
                  </span>
                  <div className="flex items-baseline gap-1">
                    <span
                      className={`font-headline text-[20px] font-black ${
                        firstArr?.minutesText === 'Arr' ? 'text-[#0E8345] animate-pulse' : 'text-[#0E8345]'
                      }`}
                    >
                      {firstArr?.minutesText}
                    </span>
                    {firstArr?.minutesText !== 'Arr' ? (
                      <span className="text-[11px] font-bold text-[#0E8345]">min</span>
                    ) : (
                      <span className="text-[11px] font-bold text-[#0E8345]">Now</span>
                    )}
                  </div>
                  {renderLoadIndicator(firstArr?.load || 'SEA')}
                </div>

                <div className="w-px h-8 bg-[#eadef0]"></div>

                {/* 2nd Arrival */}
                <div className="flex flex-col items-end min-w-[70px]">
                  <span className="text-[11px] text-[#52424c] uppercase font-bold tracking-wider">
                    2nd
                  </span>
                  <div className="flex items-baseline gap-1">
                    <span className="font-headline text-[16px] font-bold text-[#1f1925] tabular-nums">
                      {secondArr?.minutesText}
                    </span>
                    <span className="text-[11px] text-[#52424c] font-medium">min</span>
                  </div>
                  {renderLoadIndicator(secondArr?.load || 'SEA')}
                </div>

                <button
                  className="p-1.5 rounded-lg hover:bg-[#f6eafc] text-[#52424c] transition-colors"
                  title={`Track line ${bus.serviceNo}`}
                >
                  <span className="material-symbols-outlined text-[20px]">chevron_right</span>
                </button>
              </div>
            </div>
          );
        })
      )}
      </div>
    </div>
  );
};
