import React from 'react';

interface SearchAndFilterProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedServiceNo: string;
  onSelectService: (serviceNo: string) => void;
  onTrackLine: () => void;
  onViewAllRoutes: () => void;
}

export const SearchAndFilter: React.FC<SearchAndFilterProps> = ({
  searchQuery,
  onSearchChange,
  selectedServiceNo,
  onSelectService,
  onTrackLine,
  onViewAllRoutes
}) => {
  const popularServices = ['65', '14', '21', '27', '168', '518 (Express)'];

  const handlePillClick = (serviceLabel: string) => {
    const rawNo = serviceLabel.replace(' (Express)', '');
    onSelectService(rawNo);
    onSearchChange(rawNo);
  };

  return (
    <div className="bg-white rounded-xl p-5 shadow-xs border border-[#E4E4EB] flex flex-col gap-3.5">
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
            Tap service pill for fast lookup
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
            onChange={(e) => onSearchChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') onTrackLine();
            }}
            placeholder="Enter bus service number (e.g. 65, 14, 168, 518) or bus stop..."
            className="w-full bg-transparent text-[#1f1925] text-[15px] placeholder:text-[#52424c]/60 focus:outline-none py-1"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="p-1 rounded-full hover:bg-[#eadef0] text-[#52424c] mr-1 transition-colors"
              title="Clear search"
            >
              <span className="material-symbols-outlined text-[18px]">cancel</span>
            </button>
          )}
          <button
            onClick={onTrackLine}
            className="flex items-center gap-1 px-3.5 py-1.5 rounded-lg bg-[#5d0052] text-white text-[12px] font-semibold hover:bg-[#7b1c6d] transition-transform active:scale-95 shadow-xs whitespace-nowrap cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">travel_explore</span>
            <span className="hidden sm:inline">Track Line</span>
          </button>
        </div>
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
          <span>All 18 Stop Routes</span>
          <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
        </button>
      </div>
    </div>
  );
};
