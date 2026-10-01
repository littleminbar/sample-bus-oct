import React from 'react';
import { BusService, CapacityLoad } from '../types/transit';

interface ActiveServiceHeroProps {
  service: BusService;
  onOpenLiveStream: () => void;
  onOpenSchedule: () => void;
  isBookmarked: boolean;
  onToggleBookmark: () => void;
}

export const ActiveServiceHero: React.FC<ActiveServiceHeroProps> = ({
  service,
  onOpenLiveStream,
  onOpenSchedule,
  isBookmarked,
  onToggleBookmark
}) => {
  const [arr1, arr2, arr3] = service.arrivals;

  // Capacity Meter renderer
  const renderCapacityMeter = (load: CapacityLoad, wab: boolean) => {
    if (load === 'SEA') {
      return (
        <div className="flex items-center justify-between bg-[#fbf0ff] rounded-lg p-2">
          <div className="flex items-center gap-1.5">
            <div className="flex items-center gap-0.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#0E8345]"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#e2d6e8]"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#e2d6e8]"></span>
            </div>
            <span className="text-[11px] font-bold text-[#0E8345]">Seats Available</span>
          </div>
          {wab ? (
            <div className="flex items-center gap-1 text-[#52424c] text-[11px]" title="Wheelchair Accessible Bus">
              <span className="material-symbols-outlined text-[16px] text-[#5d0052]">accessible</span>
              <span className="font-semibold">WAB</span>
            </div>
          ) : (
            <div className="flex items-center gap-1 text-[#52424c]/60 text-[11px]" title="Non-wheelchair accessible">
              <span className="material-symbols-outlined text-[16px]">not_accessible</span>
              <span className="font-semibold">Standard</span>
            </div>
          )}
        </div>
      );
    }

    if (load === 'SDA') {
      return (
        <div className="flex items-center justify-between bg-[#fbf0ff] rounded-lg p-2">
          <div className="flex items-center gap-1.5">
            <div className="flex items-center gap-0.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#D97706]"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#D97706]"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#e2d6e8]"></span>
            </div>
            <span className="text-[11px] font-bold text-[#D97706]">Standing Available</span>
          </div>
          {wab ? (
            <div className="flex items-center gap-1 text-[#52424c] text-[11px]" title="Wheelchair Accessible Bus">
              <span className="material-symbols-outlined text-[16px] text-[#5d0052]">accessible</span>
              <span className="font-semibold">WAB</span>
            </div>
          ) : (
            <div className="flex items-center gap-1 text-[#52424c]/60 text-[11px]" title="Non-wheelchair accessible">
              <span className="material-symbols-outlined text-[16px]">not_accessible</span>
              <span className="font-semibold">Standard</span>
            </div>
          )}
        </div>
      );
    }

    return (
      <div className="flex items-center justify-between bg-[#fbf0ff] rounded-lg p-2">
        <div className="flex items-center gap-1.5">
          <div className="flex items-center gap-0.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#DC2626]"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-[#DC2626]"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-[#DC2626]"></span>
          </div>
          <span className="text-[11px] font-bold text-[#DC2626]">Limited Standing</span>
        </div>
        {wab ? (
          <div className="flex items-center gap-1 text-[#52424c] text-[11px]" title="Wheelchair Accessible Bus">
            <span className="material-symbols-outlined text-[16px] text-[#5d0052]">accessible</span>
            <span className="font-semibold">WAB</span>
          </div>
        ) : (
          <div className="flex items-center gap-1 text-[#52424c]/60 text-[11px]" title="Non-wheelchair accessible">
            <span className="material-symbols-outlined text-[16px]">not_accessible</span>
            <span className="font-semibold">Standard</span>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="w-full bg-white rounded-xl shadow-md border border-[#E4E4EB] overflow-hidden flex flex-col">
      {/* Active Card Header Strip with Rich SBS Gradient */}
      <div className="p-5 md:p-6 bg-gradient-to-r from-[#5d0052] via-[#7b1c6d] to-[#a43e00] text-white flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          {/* Service Badge Plate */}
          <div className="px-4 py-2 rounded-xl bg-white text-[#5d0052] font-headline text-[32px] font-black tracking-tight shadow-md flex flex-col items-center leading-none min-w-[76px]">
            <span>{service.serviceNo}</span>
            <span className="text-[9px] uppercase tracking-widest text-[#7b1c6d] mt-1 font-bold">
              {service.category}
            </span>
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-1.5 mb-1">
              <span className="px-2 py-0.5 rounded bg-white/20 text-white text-[11px] font-semibold tracking-wide uppercase">
                To {service.destination}
              </span>
              <span className="px-2 py-0.5 rounded bg-[#cdee91] text-[#131f00] text-[11px] font-bold">
                {service.fleetType}
              </span>
            </div>
            <h3 className="font-headline text-[22px] text-white font-bold leading-tight">
              {service.destination}
            </h3>
            <p className="text-[13px] text-white/85 max-w-2xl">
              {service.viaRoads}
            </p>
          </div>
        </div>

        {/* Action Buttons: Live Stream, Full Schedule, Bookmark */}
        <div className="flex items-center gap-1.5 bg-white/10 rounded-xl p-1 self-start md:self-auto backdrop-blur-sm border border-white/15">
          <button
            onClick={onOpenLiveStream}
            className="px-3.5 py-1.5 rounded-lg bg-white text-[#5d0052] text-[13px] font-bold shadow-sm hover:bg-white/95 active:scale-95 transition-all cursor-pointer flex items-center gap-1.5"
          >
            <span className="w-2 h-2 rounded-full bg-[#0E8345] animate-pulse"></span>
            Live Stream
          </button>
          <button
            onClick={onOpenSchedule}
            className="px-3.5 py-1.5 rounded-lg text-white hover:bg-white/20 text-[13px] font-semibold transition-colors cursor-pointer"
          >
            Full Schedule
          </button>
          <button
            onClick={onToggleBookmark}
            className="p-1.5 rounded-lg text-white hover:bg-white/20 transition-colors cursor-pointer"
            title={isBookmarked ? "Remove bookmark for Route 65" : "Bookmark route 65"}
          >
            <span
              className="material-symbols-outlined text-[20px]"
              style={{ fontVariationSettings: isBookmarked ? "'FILL' 1" : "'FILL' 0" }}
            >
              bookmark
            </span>
          </button>
        </div>
      </div>

      {/* Tri-Arrival Display & Real-Time Capacity Cluster */}
      <div className="p-5 md:p-6 grid grid-cols-1 md:grid-cols-3 gap-4 bg-[#fff7ff]">
        {/* 1st Arrival (Imminent) */}
        <div className="bg-white rounded-xl p-4 shadow-xs border border-[#E4E4EB] relative overflow-hidden flex flex-col justify-between hover:shadow-sm transition-shadow">
          <div className="absolute top-0 left-0 w-1.5 h-full bg-[#0E8345]"></div>
          <div className="flex items-center justify-between mb-2 pl-1">
            <span className="text-[11px] uppercase tracking-wider text-[#52424c] font-bold">
              Next Vehicle (Bus 1)
            </span>
            <span className="px-2 py-0.5 rounded-full bg-[#0E8345]/15 text-[#0E8345] text-[11px] font-bold animate-pulse">
              {arr1?.statusLabel || 'ARRIVING'}
            </span>
          </div>

          <div className="pl-1 my-2 flex items-baseline justify-between">
            <div>
              <span className="font-headline text-[26px] font-black text-[#0E8345] tracking-tight">
                {arr1?.minutesText}
              </span>
              <span className="text-[12px] text-[#52424c] ml-1.5 font-medium">
                &lt; 45 sec
              </span>
            </div>
            <div className="text-right">
              <span className="px-2.5 py-1 rounded bg-[#f0e4f6] text-[11px] font-semibold text-[#1f1925]">
                {arr1?.vehicleType || 'Double Decker'}
              </span>
            </div>
          </div>

          {/* Capacity Meter */}
          <div className="mt-2 pt-1 pl-1">
            {renderCapacityMeter(arr1?.load || 'SEA', arr1?.wab ?? true)}
          </div>
        </div>

        {/* 2nd Arrival */}
        <div className="bg-white rounded-xl p-4 shadow-xs border border-[#E4E4EB] relative overflow-hidden flex flex-col justify-between hover:shadow-sm transition-shadow">
          <div className="absolute top-0 left-0 w-1.5 h-full bg-[#D97706]"></div>
          <div className="flex items-center justify-between mb-2 pl-1">
            <span className="text-[11px] uppercase tracking-wider text-[#52424c] font-bold">
              Subsequent (Bus 2)
            </span>
            <span className="px-2 py-0.5 rounded bg-[#f6eafc] text-[11px] text-[#52424c] font-semibold">
              {arr2?.statusLabel || 'On Schedule'}
            </span>
          </div>

          <div className="pl-1 my-2 flex items-baseline justify-between">
            <div className="flex items-baseline">
              <span className="font-headline text-[26px] font-bold text-[#1f1925] tracking-tight tabular-nums">
                {arr2?.minutesText}
              </span>
              <span className="text-[16px] font-semibold text-[#52424c] ml-1.5">
                mins
              </span>
            </div>
            <div className="text-right">
              <span className="px-2.5 py-1 rounded bg-[#f0e4f6] text-[11px] font-semibold text-[#1f1925]">
                {arr2?.vehicleType || 'Double Decker'}
              </span>
            </div>
          </div>

          {/* Capacity Meter */}
          <div className="mt-2 pt-1 pl-1">
            {renderCapacityMeter(arr2?.load || 'SDA', arr2?.wab ?? true)}
          </div>
        </div>

        {/* 3rd Arrival */}
        <div className="bg-white rounded-xl p-4 shadow-xs border border-[#E4E4EB] relative overflow-hidden flex flex-col justify-between hover:shadow-sm transition-shadow">
          <div className="absolute top-0 left-0 w-1.5 h-full bg-[#DC2626]"></div>
          <div className="flex items-center justify-between mb-2 pl-1">
            <span className="text-[11px] uppercase tracking-wider text-[#52424c] font-bold">
              Trailing (Bus 3)
            </span>
            <span className="px-2 py-0.5 rounded bg-[#f6eafc] text-[11px] text-[#52424c] font-semibold">
              {arr3?.statusLabel || 'Heavy Load'}
            </span>
          </div>

          <div className="pl-1 my-2 flex items-baseline justify-between">
            <div className="flex items-baseline">
              <span className="font-headline text-[26px] font-bold text-[#1f1925] tracking-tight tabular-nums">
                {arr3?.minutesText}
              </span>
              <span className="text-[16px] font-semibold text-[#52424c] ml-1.5">
                mins
              </span>
            </div>
            <div className="text-right">
              <span className="px-2.5 py-1 rounded bg-[#f0e4f6] text-[11px] font-semibold text-[#1f1925]">
                {arr3?.vehicleType || 'Single Deck'}
              </span>
            </div>
          </div>

          {/* Capacity Meter */}
          <div className="mt-2 pt-1 pl-1">
            {renderCapacityMeter(arr3?.load || 'LSD', arr3?.wab ?? false)}
          </div>
        </div>
      </div>

      {/* Live Route Stepper & Progress Mini-Map Diagram */}
      <div className="p-5 md:p-6 bg-white border-t border-[#E4E4EB]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-1">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#5d0052] text-[20px]">alt_route</span>
            <span className="text-[14px] font-bold text-[#1f1925]">
              Active Route Segment · Approaching Next Stop
            </span>
          </div>
          <span className="text-[12px] text-[#52424c] font-mono">
            Vehicle Reg: {service.activeVehicleReg}
          </span>
        </div>

        {/* Horizontal Stepper Diagram */}
        <div className="w-full relative py-3">
          {/* Track line behind */}
          <div className="hidden sm:block absolute top-7 left-12 right-12 h-1.5 bg-[#eadef0] rounded-full"></div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 relative z-10">
            {/* Stop 1: Current Active */}
            <div className="flex items-start sm:flex-col sm:items-center text-left sm:text-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#5d0052] text-white flex items-center justify-center font-bold text-[13px] ring-4 ring-[#5d0052]/20 shrink-0 shadow-sm">
                <span className="material-symbols-outlined text-[18px]">directions_bus</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] text-[#5d0052] font-bold uppercase tracking-wider">
                  Here Now
                </span>
                <span className="text-[13px] font-bold text-[#1f1925]">
                  Opp Tampines Stn
                </span>
                <span className="text-[11px] text-[#52424c]">
                  Stop #76191
                </span>
              </div>
            </div>

            {/* Stop 2 */}
            <div className="flex items-start sm:flex-col sm:items-center text-left sm:text-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white border-2 border-[#5d0052] text-[#5d0052] flex items-center justify-center font-bold text-[12px] shadow-xs shrink-0">
                <span>2m</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] text-[#52424c] font-medium">Est. 2 mins</span>
                <span className="text-[13px] font-bold text-[#1f1925]">Blk 938</span>
                <span className="text-[11px] text-[#52424c]">Stop #76111</span>
              </div>
            </div>

            {/* Stop 3 */}
            <div className="flex items-start sm:flex-col sm:items-center text-left sm:text-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#eadef0] text-[#52424c] flex items-center justify-center font-bold text-[12px] shrink-0">
                <span>5m</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] text-[#52424c] font-medium">Est. 5 mins</span>
                <span className="text-[13px] font-bold text-[#1f1925]">SAFRA Tampines</span>
                <span className="text-[11px] text-[#52424c]">Stop #76101</span>
              </div>
            </div>

            {/* Stop 4 */}
            <div className="flex items-start sm:flex-col sm:items-center text-left sm:text-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#eadef0] text-[#52424c] flex items-center justify-center font-bold text-[12px] shrink-0">
                <span>9m</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] text-[#52424c] font-medium">Est. 9 mins</span>
                <span className="text-[13px] font-bold text-[#1f1925]">Opp Bedok Reform</span>
                <span className="text-[11px] text-[#52424c]">Stop #84011</span>
              </div>
            </div>
          </div>
        </div>

        {/* Inline Velocity & Smoothness Sparkline */}
        <div className="mt-4 p-3 bg-[#fff7ff] rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-3 border border-[#E4E4EB]">
          <div className="flex items-center gap-2.5">
            <span className="text-[11px] text-[#52424c] font-bold uppercase tracking-wider">
              Traffic Velocity
            </span>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#0E8345]"></span>
              <span className="text-[12px] text-[#1f1925] font-semibold">
                {service.trafficStatus}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-[#52424c] text-[12px]">
            <span>Route Speed Index:</span>
            <svg className="w-28 h-6 text-[#0E8345]" fill="none" viewBox="0 0 120 24">
              <path
                d="M0 12 Q 15 4, 30 14 T 60 8 T 90 18 T 120 10"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="2.5"
              />
              <circle cx="120" cy="10" r="3" fill="currentColor" className="animate-ping" />
            </svg>
            <span className="font-bold text-[#0E8345]">
              {service.smoothnessPercent}% Smooth
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
