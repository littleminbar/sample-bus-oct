import React from 'react';

interface UtilityBarProps {
  countdown: number;
  isPaused: boolean;
  onTogglePause: () => void;
  onManualRefresh: () => void;
  isSyncing: boolean;
}

export const UtilityBar: React.FC<UtilityBarProps> = ({
  countdown,
  isPaused,
  onTogglePause,
  onManualRefresh,
  isSyncing
}) => {
  return (
    <section className="w-full bg-[#fbf0ff] border-b border-[#E4E4EB] shadow-xs">
      <div className="max-w-[1280px] mx-auto px-4 md:px-10 py-2 flex flex-wrap items-center justify-between gap-2 text-[#52424c] text-[11px] font-medium">
        {/* Left Telemetry Status */}
        <div className="flex items-center flex-wrap gap-2.5">
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#0E8345]/10 text-[#0E8345] font-bold">
            <span className="w-2 h-2 rounded-full bg-[#0E8345] animate-ping"></span>
            Telemetry Engine v4.2 Active
          </span>
          <span className="text-[#84727d] hidden sm:inline">|</span>
          <span className="flex items-center gap-1">
            <span className="material-symbols-outlined text-[15px] text-[#5d0052]">sensors</span>
            LTA DataMall Precision Sync (3.2s latency)
          </span>
        </div>

        {/* Right Weather & Auto-Refresh Controls */}
        <div className="flex items-center gap-3 ml-auto sm:ml-0">
          <span className="hidden md:flex items-center gap-1 text-[#1f1925] font-semibold">
            <span className="material-symbols-outlined text-[15px] text-[#a43e00]">wb_sunny</span>
            Singapore 31°C · Humidity 78%
          </span>

          <button
            onClick={onTogglePause}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-white shadow-xs hover:bg-[#f6eafc] transition-colors text-[#1f1925] font-semibold border border-[#E4E4EB] cursor-pointer ${
              isPaused ? 'opacity-70 bg-amber-50 border-amber-200' : ''
            }`}
            title={isPaused ? "Resume auto-refresh countdown" : "Pause auto-refresh countdown"}
          >
            <span
              onClick={(e) => {
                e.stopPropagation();
                onManualRefresh();
              }}
              className={`material-symbols-outlined text-[14px] text-[#0E8345] hover:rotate-180 transition-transform ${
                isSyncing ? 'animate-spin' : ''
              }`}
              title="Click to force immediate sync"
            >
              sync
            </span>
            <span>
              Auto-refresh{' '}
              <strong className="text-[#5d0052] font-bold tabular-nums">
                {isPaused ? 'Paused' : `${countdown}s`}
              </strong>
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};
