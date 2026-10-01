import React from 'react';
import { BusStop } from '../types/transit';

interface NearestStopBannerProps {
  currentStop: BusStop;
  secondsSinceRefresh: number;
  onSwitchStop: () => void;
  isPinned: boolean;
  onTogglePin: () => void;
}

export const NearestStopBanner: React.FC<NearestStopBannerProps> = ({
  currentStop,
  secondsSinceRefresh,
  onSwitchStop,
  isPinned,
  onTogglePin
}) => {
  return (
    <div className="bg-white rounded-xl p-4 md:p-5 shadow-xs border border-[#E4E4EB] flex flex-col lg:flex-row lg:items-center justify-between gap-4">
      {/* Stop Signpost & Details */}
      <div className="flex items-start sm:items-center gap-3.5">
        <div className="w-12 h-12 rounded-xl bg-[#5d0052] flex items-center justify-center text-white shrink-0 shadow-xs">
          <span className="material-symbols-outlined text-[28px]">signpost</span>
        </div>
        <div className="flex flex-col">
          <div className="flex flex-wrap items-center gap-1.5 mb-1">
            <span className="px-2 py-0.5 rounded bg-[#352e3b] text-[#f9edff] text-[11px] font-bold tracking-wider tabular-nums">
              STOP {currentStop.code}
            </span>
            <span className="px-2 py-0.5 rounded-full bg-[#0E8345]/15 text-[#0E8345] text-[11px] font-semibold flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">my_location</span>
              Nearest to you ({currentStop.distanceMeters}m away)
            </span>
            <span className="px-2 py-0.5 rounded bg-[#f6eafc] text-[11px] text-[#52424c] hidden md:inline-flex items-center gap-1 font-medium">
              <span className="material-symbols-outlined text-[14px]">directions_walk</span>
              {currentStop.walkMinutes} min walk via Exit B
            </span>
          </div>

          <h2 className="font-headline text-[20px] text-[#1f1925] font-bold leading-tight">
            {currentStop.name}
          </h2>
          <span className="text-[12px] text-[#52424c]">
            {currentStop.road} · {currentStop.subLocation}
          </span>
        </div>
      </div>

      {/* Right Controls: Refresh indicator, Switch button, Pin button */}
      <div className="flex flex-wrap items-center gap-2 pt-1 lg:pt-0">
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#f6eafc] text-[11px] text-[#52424c]">
          <span className="w-2 h-2 rounded-full bg-[#0E8345] animate-pulse"></span>
          <span>
            Refreshed{' '}
            <strong className="text-[#1f1925] font-semibold tabular-nums">
              {secondsSinceRefresh}s ago
            </strong>
          </span>
        </div>

        <button
          onClick={onSwitchStop}
          className="px-3.5 py-1.5 rounded-lg bg-[#f6eafc] hover:bg-[#eadef0] text-[#1f1925] text-[12px] font-semibold flex items-center gap-1.5 transition-colors cursor-pointer border border-[#E4E4EB]"
        >
          <span className="material-symbols-outlined text-[18px] text-[#5d0052]">swap_horiz</span>
          <span>Switch Bus Stop</span>
        </button>

        <button
          onClick={onTogglePin}
          className={`p-2 rounded-lg transition-colors cursor-pointer border border-[#E4E4EB] ${
            isPinned
              ? 'bg-[#5d0052] text-white shadow-xs'
              : 'bg-[#f6eafc] hover:bg-[#eadef0] text-[#52424c]'
          }`}
          title={isPinned ? "Stop is pinned as default" : "Pin this stop as default"}
        >
          <span
            className="material-symbols-outlined text-[18px]"
            style={{ fontVariationSettings: isPinned ? "'FILL' 1" : "'FILL' 0" }}
          >
            push_pin
          </span>
        </button>
      </div>
    </div>
  );
};
