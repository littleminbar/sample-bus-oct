import React from 'react';
import { BusStop } from '../../types/transit';

interface NearbyStopsViewProps {
  stops: BusStop[];
  currentStopId: string;
  onSelectStop: (stop: BusStop) => void;
  onBackToArrivals: () => void;
}

export const NearbyStopsView: React.FC<NearbyStopsViewProps> = ({
  stops,
  currentStopId,
  onSelectStop,
  onBackToArrivals
}) => {
  return (
    <div className="flex flex-col gap-5">
      {/* Top Banner */}
      <div className="bg-white rounded-xl p-5 shadow-xs border border-[#E4E4EB] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] uppercase tracking-wider text-[#5d0052] font-bold">
              Spatial Geolocation Radar
            </span>
            <span className="px-2 py-0.5 rounded-full bg-[#0E8345]/15 text-[#0E8345] text-[11px] font-bold">
              GPS Calibrated
            </span>
          </div>
          <h2 className="font-headline text-[24px] font-bold text-[#1f1925]">
            Nearby Bus Stops &amp; Hubs
          </h2>
          <p className="text-[13px] text-[#52424c]">
            Bus stops within 15 minutes walking radius of Tampines Ave 4 / Blk 938.
          </p>
        </div>

        <button
          onClick={onBackToArrivals}
          className="px-4 py-2 rounded-lg bg-[#5d0052] text-white text-[13px] font-bold hover:bg-[#7b1c6d] transition-all cursor-pointer self-start md:self-auto flex items-center gap-1.5"
        >
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          <span>Back to Live Arrivals</span>
        </button>
      </div>

      {/* Grid of Nearby Stops */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {stops.map((stop) => {
          const isCurrent = stop.id === currentStopId;
          return (
            <div
              key={stop.id}
              className={`bg-white rounded-xl p-5 border shadow-xs transition-all flex flex-col justify-between gap-4 ${
                isCurrent
                  ? 'border-[#5d0052] ring-2 ring-[#5d0052]/20 bg-[#fbf0ff]/40'
                  : 'border-[#E4E4EB] hover:border-[#7b1c6d] hover:shadow-sm'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-[#352e3b] text-white text-[11px] font-bold tabular-nums">
                      STOP {stop.code}
                    </span>
                    {isCurrent && (
                      <span className="px-2 py-0.5 rounded-full bg-[#5d0052] text-white text-[10px] font-bold">
                        Current Active Hub
                      </span>
                    )}
                  </div>
                  <span className="text-[12px] font-semibold text-[#0E8345] flex items-center gap-1">
                    <span className="material-symbols-outlined text-[15px]">near_me</span>
                    {stop.distanceMeters}m ({stop.walkMinutes} min walk)
                  </span>
                </div>

                <h3 className="font-headline text-[18px] font-bold text-[#1f1925] leading-tight">
                  {stop.name}
                </h3>
                <span className="text-[12px] text-[#52424c]">
                  {stop.road} · {stop.subLocation}
                </span>

                {/* Available Services Pills */}
                <div className="mt-3 flex flex-wrap items-center gap-1.5">
                  <span className="text-[11px] text-[#52424c] font-semibold mr-1">Services:</span>
                  {stop.services.map((svc) => (
                    <span
                      key={svc.serviceNo}
                      className="px-2 py-0.5 rounded bg-[#f6eafc] text-[#5d0052] text-[11px] font-bold"
                    >
                      {svc.serviceNo}
                    </span>
                  ))}
                </div>

                {/* Live upcoming arrival sneak peek */}
                {stop.services.length > 0 && (
                  <div className="mt-3 pt-2.5 border-t border-[#f0e4f6] flex items-center justify-between text-[12px]">
                    <span className="text-[#52424c]">
                      Next Bus ({stop.services[0].serviceNo} to {stop.services[0].destination}):
                    </span>
                    <span className="font-bold text-[#0E8345]">
                      {stop.services[0].arrivals[0]?.minutesText === 'Arr'
                        ? 'Arriving Now'
                        : `${stop.services[0].arrivals[0]?.minutesText} mins`}
                    </span>
                  </div>
                )}
              </div>

              <button
                onClick={() => {
                  onSelectStop(stop);
                  onBackToArrivals();
                }}
                className={`w-full py-2 rounded-lg text-[13px] font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  isCurrent
                    ? 'bg-[#f0e4f6] text-[#5d0052]'
                    : 'bg-[#5d0052] hover:bg-[#7b1c6d] text-white shadow-xs'
                }`}
              >
                <span>{isCurrent ? 'Viewing Telemetry' : 'Switch to this Stop'}</span>
                <span className="material-symbols-outlined text-[16px]">
                  {isCurrent ? 'check_circle' : 'arrow_forward'}
                </span>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
