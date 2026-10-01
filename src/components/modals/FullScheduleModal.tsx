import React, { useState } from 'react';
import { BusService } from '../../types/transit';

interface FullScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: BusService;
}

export const FullScheduleModal: React.FC<FullScheduleModalProps> = ({
  isOpen,
  onClose,
  service
}) => {
  const [direction, setDirection] = useState<1 | 2>(1);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl border border-[#E4E4EB] overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 bg-gradient-to-r from-[#5d0052] to-[#7b1c6d] text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="px-3 py-1 rounded-lg bg-white text-[#5d0052] font-headline text-[20px] font-black">
              {service.serviceNo}
            </div>
            <div>
              <h3 className="font-headline text-[18px] font-bold">
                Complete Route Timetable &amp; Schedule
              </h3>
              <p className="text-[12px] text-white/80">
                {service.origin} ⇄ {service.destination}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[22px]">close</span>
          </button>
        </div>

        {/* Direction Switcher & Frequency Grid */}
        <div className="p-4 bg-[#fbf0ff] border-b border-[#E4E4EB] flex flex-col gap-3">
          <div className="flex items-center gap-2 p-1 bg-white rounded-xl border border-[#E4E4EB]">
            <button
              onClick={() => setDirection(1)}
              className={`flex-1 py-1.5 rounded-lg text-[12px] font-bold transition-all cursor-pointer ${
                direction === 1
                  ? 'bg-[#5d0052] text-white shadow-xs'
                  : 'text-[#52424c] hover:bg-[#f6eafc]'
              }`}
            >
              Direction 1: To {service.destination}
            </button>
            <button
              onClick={() => setDirection(2)}
              className={`flex-1 py-1.5 rounded-lg text-[12px] font-bold transition-all cursor-pointer ${
                direction === 2
                  ? 'bg-[#5d0052] text-white shadow-xs'
                  : 'text-[#52424c] hover:bg-[#f6eafc]'
              }`}
            >
              Direction 2: To {service.origin}
            </button>
          </div>

          {/* Timetable Frequency Matrices */}
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="bg-white rounded-xl p-2.5 border border-[#E4E4EB]">
              <span className="text-[11px] text-[#52424c] font-bold uppercase">Weekdays</span>
              <div className="mt-1 text-[13px] font-bold text-[#1f1925]">{service.peakHeadway}</div>
              <span className="text-[10px] text-[#52424c]">First: {service.firstBus} · Last: {service.lastBus}</span>
            </div>
            <div className="bg-white rounded-xl p-2.5 border border-[#E4E4EB]">
              <span className="text-[11px] text-[#52424c] font-bold uppercase">Saturdays</span>
              <div className="mt-1 text-[13px] font-bold text-[#1f1925]">8 - 12 mins</div>
              <span className="text-[10px] text-[#52424c]">First: 05:30 · Last: 23:45</span>
            </div>
            <div className="bg-white rounded-xl p-2.5 border border-[#E4E4EB]">
              <span className="text-[11px] text-[#52424c] font-bold uppercase">Sundays / PH</span>
              <div className="mt-1 text-[13px] font-bold text-[#1f1925]">10 - 14 mins</div>
              <span className="text-[10px] text-[#52424c]">First: 05:45 · Last: 23:45</span>
            </div>
          </div>
        </div>

        {/* Stops Sequence Timeline */}
        <div className="p-4 overflow-y-auto flex flex-col gap-2 bg-white">
          <span className="text-[12px] font-bold text-[#1f1925] uppercase tracking-wider mb-1">
            Sequential Bus Stops along Route
          </span>

          <div className="relative pl-6 flex flex-col gap-3 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#eadef0]">
            {service.routeStops.map((stop, i) => (
              <div key={stop.code} className="relative flex items-start justify-between text-[13px] group">
                <span className={`absolute -left-6 top-1 w-3.5 h-3.5 rounded-full border-2 border-white ${
                  i === 0 ? 'bg-[#5d0052] ring-2 ring-[#5d0052]/30' : 'bg-[#7b1c6d]'
                }`}></span>

                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[#1f1925]">{stop.name}</span>
                    <span className="px-1.5 py-0.2 rounded bg-[#f6eafc] text-[10px] text-[#5d0052] font-mono font-semibold">
                      #{stop.code}
                    </span>
                  </div>
                  <span className="text-[11px] text-[#52424c]">{stop.road}</span>
                </div>

                <div className="text-right text-[11px] text-[#52424c]">
                  {i === 0 ? (
                    <span className="font-bold text-[#0E8345]">Origin Stop</span>
                  ) : (
                    <span>~{stop.estMins} mins</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-3.5 bg-[#fbf0ff] border-t border-[#E4E4EB] flex items-center justify-between">
          <span className="text-[11px] text-[#52424c]">
            Schedule adhering to LTA Bus Service Reliability Framework (BSRF).
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-[#5d0052] text-white text-[12px] font-bold hover:bg-[#7b1c6d] cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
