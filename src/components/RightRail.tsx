import React from 'react';
import { BusService } from '../types/transit';

interface RightRailProps {
  service: BusService;
  onOpenFareCalculator: () => void;
  onOpenAlerts: () => void;
}

export const RightRail: React.FC<RightRailProps> = ({
  service,
  onOpenFareCalculator,
  onOpenAlerts
}) => {
  return (
    <div className="flex flex-col gap-4">
      {/* Service Notice Widget */}
      <div 
        onClick={onOpenAlerts}
        className="bg-white rounded-xl p-4 shadow-xs border border-[#E4E4EB] flex flex-col gap-2 relative overflow-hidden cursor-pointer hover:border-[#7b1c6d] transition-colors group"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#0E8345]"></span>
            <span className="text-[11px] uppercase tracking-wider text-[#0E8345] font-bold">
              Service Status Verified
            </span>
          </div>
          <span className="material-symbols-outlined text-[16px] text-[#52424c] opacity-0 group-hover:opacity-100 transition-opacity">
            chevron_right
          </span>
        </div>

        <h4 className="text-[14px] font-bold text-[#1f1925]">
          Tampines Corridor Operating Normal
        </h4>
        <p className="text-[12px] text-[#52424c] leading-relaxed">
          Normal service along Tampines Ave 4 &amp; Tampines Ave 5. No route diversions, road works, or operational delays currently reported by OCC.
        </p>

        <div className="mt-1 pt-2 flex items-center justify-between text-[#52424c] text-[11px] border-t border-[#f0e4f6]">
          <span>Source: SBS Control Centre</span>
          <span className="font-semibold text-[#5d0052]">07:42 SGT</span>
        </div>
      </div>

      {/* Selected Route Operating Details */}
      <div className="bg-white rounded-xl p-4 shadow-xs border border-[#E4E4EB] flex flex-col gap-3.5">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold text-[#1f1925] uppercase tracking-wider">
            Bus {service.serviceNo} Timing Window
          </span>
          <span className="material-symbols-outlined text-[#5d0052] text-[18px]">
            schedule
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2 bg-[#fbf0ff] rounded-lg p-3 border border-[#E4E4EB]">
          <div className="flex flex-col">
            <span className="text-[11px] text-[#52424c]">First Bus Today</span>
            <span className="font-headline text-[18px] font-bold text-[#1f1925] tabular-nums">
              {service.firstBus}
            </span>
            <span className="text-[10px] text-[#52424c]">From {service.origin}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[11px] text-[#52424c]">Last Bus Tonight</span>
            <span className="font-headline text-[18px] font-bold text-[#1f1925] tabular-nums">
              {service.lastBus}
            </span>
            <span className="text-[10px] text-[#52424c]">From {service.origin}</span>
          </div>
        </div>

        {/* Peak Headway Frequency Gauge */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-[#52424c]">Peak Headway Frequency</span>
            <span className="font-bold text-[#5d0052]">{service.peakHeadway}</span>
          </div>
          <div className="w-full bg-[#f0e4f6] h-2 rounded-full overflow-hidden">
            <div className="bg-[#5d0052] h-full rounded-full" style={{ width: '78%' }}></div>
          </div>
          <div className="flex items-center justify-between text-[10px] text-[#52424c]">
            <span>High Frequency Loop</span>
            <span>Off-peak: {service.offPeakHeadway}</span>
          </div>
        </div>
      </div>

      {/* Fare Calculator Preview */}
      <div className="bg-white rounded-xl p-4 shadow-xs border border-[#E4E4EB] flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[#a43e00] text-[20px]">
              credit_card
            </span>
            <span className="text-[14px] font-bold text-[#1f1925]">
              Fare Calculator Preview
            </span>
          </div>
          <span className="px-2 py-0.5 rounded bg-[#f6eafc] text-[11px] text-[#52424c] font-semibold">
            Adult Card
          </span>
        </div>

        <div className="flex flex-col gap-1.5 text-[13px]">
          <div className="flex items-center justify-between py-1 border-b border-[#f0e4f6]">
            <span className="text-[#52424c] text-[12px]">Stop #76191 → {service.destination}</span>
            <span className="font-bold text-[#1f1925] tabular-nums">{service.distanceKm} km</span>
          </div>
          <div className="flex items-center justify-between py-1 border-b border-[#f0e4f6]">
            <span className="text-[#52424c] text-[12px]">Standard Distance-Based Fare</span>
            <span className="font-bold text-[#1f1925] tabular-nums">S$ {service.adultFare.toFixed(2)}</span>
          </div>
          <div className="flex items-center justify-between py-1">
            <span className="text-[#52424c] text-[12px]">Senior / Concession Tariff</span>
            <span className="font-bold text-[#0E8345] tabular-nums">S$ {service.concessionFare.toFixed(2)}</span>
          </div>
        </div>

        <div className="p-2 rounded bg-[#f6eafc] text-[#52424c] text-[11px] flex items-center gap-1.5">
          <span className="material-symbols-outlined text-[15px] text-[#5d0052]">info</span>
          <span>SimplyGo contactless Mastercard, Visa &amp; NETS supported.</span>
        </div>

        <button
          onClick={onOpenFareCalculator}
          className="w-full py-1.5 rounded-lg bg-[#f0e4f6] hover:bg-[#eadef0] text-[#5d0052] text-[12px] font-bold transition-colors cursor-pointer flex items-center justify-center gap-1"
        >
          <span>Calculate All Concession Fares</span>
          <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
        </button>
      </div>

      {/* Commuter Passenger Legend */}
      <div className="bg-white rounded-xl p-4 shadow-xs border border-[#E4E4EB] flex flex-col gap-2.5">
        <span className="text-[11px] font-bold text-[#1f1925] uppercase tracking-wider">
          Commuter Passenger Legend
        </span>
        <div className="flex flex-col gap-1.5 text-[12px]">
          <div className="flex items-center gap-2.5 py-1">
            <span className="w-3 h-3 rounded-full bg-[#0E8345] shrink-0"></span>
            <span className="text-[#1f1925] font-medium">Seats Available (Low Load &lt; 50%)</span>
          </div>
          <div className="flex items-center gap-2.5 py-1">
            <span className="w-3 h-3 rounded-full bg-[#D97706] shrink-0"></span>
            <span className="text-[#1f1925] font-medium">Standing Available (Moderate Load 50-85%)</span>
          </div>
          <div className="flex items-center gap-2.5 py-1">
            <span className="w-3 h-3 rounded-full bg-[#DC2626] shrink-0"></span>
            <span className="text-[#1f1925] font-medium">Limited Standing (High Load &gt; 85%)</span>
          </div>
          <div className="flex items-center gap-2.5 py-1">
            <span className="material-symbols-outlined text-[16px] text-[#5d0052] shrink-0">
              accessible
            </span>
            <span className="text-[#1f1925] font-medium">
              Wheelchair Accessible Bus (WAB Certified)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
