import React, { useState } from 'react';
import { BusStop } from '../../types/transit';

interface SwitchStopModalProps {
  isOpen: boolean;
  onClose: () => void;
  stops: BusStop[];
  currentStopId: string;
  onSelectStop: (stop: BusStop) => void;
}

export const SwitchStopModal: React.FC<SwitchStopModalProps> = ({
  isOpen,
  onClose,
  stops,
  currentStopId,
  onSelectStop
}) => {
  const [search, setSearch] = useState('');

  if (!isOpen) return null;

  const filteredStops = stops.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.code.includes(search) ||
      s.road.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-xl border border-[#E4E4EB] overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="p-4 bg-[#fbf0ff] border-b border-[#E4E4EB] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#5d0052] text-[22px]">swap_horiz</span>
            <h3 className="font-headline text-[18px] font-bold text-[#1f1925]">
              Switch Bus Stop
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-[#f0e4f6] text-[#52424c] transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Search Bar */}
        <div className="p-4 border-b border-[#E4E4EB] bg-white">
          <div className="flex items-center bg-[#f0e4f6]/80 rounded-xl px-3 py-2 border border-transparent focus-within:border-[#7b1c6d] focus-within:bg-white transition-all">
            <span className="material-symbols-outlined text-[#52424c] text-[20px] mr-2">search</span>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by stop name, 5-digit code or road..."
              className="w-full bg-transparent text-[14px] text-[#1f1925] focus:outline-none"
              autoFocus
            />
            {search && (
              <button onClick={() => setSearch('')} className="text-[#52424c] hover:text-[#1f1925]">
                <span className="material-symbols-outlined text-[16px]">close</span>
              </button>
            )}
          </div>
        </div>

        {/* Stop list */}
        <div className="overflow-y-auto p-3 flex flex-col gap-2">
          {filteredStops.length === 0 ? (
            <div className="p-8 text-center text-[#52424c] text-[13px]">
              No bus stops found matching &ldquo;{search}&rdquo;. Try another stop code or street name.
            </div>
          ) : (
            filteredStops.map((stop) => {
              const isSelected = stop.id === currentStopId;
              return (
                <div
                  key={stop.id}
                  onClick={() => {
                    onSelectStop(stop);
                    onClose();
                  }}
                  className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                    isSelected
                      ? 'border-[#5d0052] bg-[#fbf0ff] shadow-xs'
                      : 'border-[#E4E4EB] hover:bg-[#fbf0ff]/50 hover:border-[#7b1c6d]'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="px-2 py-0.5 rounded bg-[#352e3b] text-white text-[11px] font-bold tabular-nums shrink-0 mt-0.5">
                      {stop.code}
                    </span>
                    <div className="flex flex-col">
                      <span className="text-[14px] font-bold text-[#1f1925] leading-tight">
                        {stop.name}
                      </span>
                      <span className="text-[12px] text-[#52424c] mt-0.5">
                        {stop.road} · {stop.subLocation}
                      </span>
                      <div className="flex items-center gap-2 mt-1.5 text-[11px] text-[#52424c]">
                        <span className="text-[#0E8345] font-semibold flex items-center gap-0.5">
                          <span className="material-symbols-outlined text-[13px]">near_me</span>
                          {stop.distanceMeters}m away
                        </span>
                        <span>·</span>
                        <span>{stop.services.length} bus services</span>
                      </div>
                    </div>
                  </div>

                  {isSelected ? (
                    <span className="px-2.5 py-1 rounded-full bg-[#5d0052] text-white text-[11px] font-bold">
                      Active
                    </span>
                  ) : (
                    <span className="material-symbols-outlined text-[20px] text-[#84727d]">
                      chevron_right
                    </span>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-[#f6eafc] border-t border-[#E4E4EB] text-center text-[11px] text-[#52424c]">
          GPS location calibrated with Singapore LTA Geographic Transit Network.
        </div>
      </div>
    </div>
  );
};
