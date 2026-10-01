import React, { useState } from 'react';
import { PLANNED_COMMUTE_TRIPS } from '../../data/transitData';
import { PlannedTrip } from '../../types/transit';

interface RoutePlannerViewProps {
  onBackToArrivals: () => void;
  onSelectServiceNo: (svcNo: string) => void;
}

export const RoutePlannerView: React.FC<RoutePlannerViewProps> = ({
  onBackToArrivals,
  onSelectServiceNo
}) => {
  const [origin, setOrigin] = useState('Opp Tampines Stn / Int (76191)');
  const [destination, setDestination] = useState('HarbourFront Int / VivoCity');
  const [selectedTrip, setSelectedTrip] = useState<PlannedTrip>(PLANNED_COMMUTE_TRIPS[0]);

  return (
    <div className="flex flex-col gap-5">
      {/* Top Planner Header */}
      <div className="bg-white rounded-xl p-5 shadow-xs border border-[#E4E4EB] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] uppercase tracking-wider text-[#5d0052] font-bold">
              Singapore Multi-Modal Transit Planner
            </span>
            <span className="px-2 py-0.5 rounded-full bg-[#f6eafc] text-[#5d0052] text-[11px] font-bold">
              Direct Trunk Routes
            </span>
          </div>
          <h2 className="font-headline text-[24px] font-bold text-[#1f1925]">
            Transit Route Planner &amp; Transfers
          </h2>
          <p className="text-[13px] text-[#52424c]">
            Plan direct bus itineraries with real-time headway synchronization.
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

      {/* Origin & Destination Console */}
      <div className="bg-white rounded-xl p-5 shadow-xs border border-[#E4E4EB] flex flex-col gap-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold text-[#52424c] uppercase tracking-wider">
              Starting From (Origin Hub)
            </label>
            <div className="flex items-center bg-[#f0e4f6]/80 rounded-xl px-3.5 py-2 border border-transparent focus-within:border-[#7b1c6d] focus-within:bg-white transition-all">
              <span className="material-symbols-outlined text-[#0E8345] text-[20px] mr-2">trip_origin</span>
              <input
                type="text"
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                className="w-full bg-transparent text-[14px] text-[#1f1925] focus:outline-none"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold text-[#52424c] uppercase tracking-wider">
              Going To (Destination)
            </label>
            <div className="flex items-center bg-[#f0e4f6]/80 rounded-xl px-3.5 py-2 border border-transparent focus-within:border-[#7b1c6d] focus-within:bg-white transition-all">
              <span className="material-symbols-outlined text-[#a43e00] text-[20px] mr-2">location_on</span>
              <input
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full bg-transparent text-[14px] text-[#1f1925] focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Quick presets */}
        <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-[#f0e4f6]">
          <span className="text-[11px] text-[#52424c] font-semibold">Popular Commutes:</span>
          {PLANNED_COMMUTE_TRIPS.map((trip) => (
            <button
              key={trip.id}
              onClick={() => {
                setOrigin(trip.from);
                setDestination(trip.to);
                setSelectedTrip(trip);
              }}
              className={`px-3 py-1 rounded-lg text-[12px] font-medium transition-colors cursor-pointer ${
                selectedTrip.id === trip.id
                  ? 'bg-[#5d0052] text-white font-bold'
                  : 'bg-[#f6eafc] text-[#1f1925] hover:bg-[#eadef0]'
              }`}
            >
              {trip.to.split('/')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Selected Trip Details Card */}
      {selectedTrip && (
        <div className="bg-white rounded-xl p-5 shadow-xs border border-[#E4E4EB] flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#f0e4f6]">
            <div>
              <span className="text-[11px] font-bold text-[#0E8345] uppercase tracking-wider">
                Recommended Direct Route
              </span>
              <h3 className="font-headline text-[20px] font-bold text-[#1f1925]">
                {selectedTrip.from} → {selectedTrip.to}
              </h3>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex flex-col items-end">
                <span className="text-[11px] text-[#52424c]">Travel Time</span>
                <span className="font-headline text-[20px] font-black text-[#5d0052] tabular-nums">
                  ~{selectedTrip.totalDurationMins} mins
                </span>
              </div>
              <div className="w-px h-8 bg-[#eadef0]"></div>
              <div className="flex flex-col items-end">
                <span className="text-[11px] text-[#52424c]">Adult Card Fare</span>
                <span className="font-headline text-[20px] font-black text-[#0E8345] tabular-nums">
                  S$ {selectedTrip.fareSgd.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {/* Sequential Steps */}
          <div className="flex flex-col gap-3">
            {selectedTrip.steps.map((step, idx) => (
              <div key={idx} className="flex items-start gap-3.5 p-3 rounded-xl bg-[#fbf0ff] border border-[#E4E4EB]">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                  step.mode === 'bus' ? 'bg-[#5d0052] text-white' : 'bg-[#eadef0] text-[#52424c]'
                }`}>
                  <span className="material-symbols-outlined text-[18px]">
                    {step.mode === 'bus' ? 'directions_bus' : 'directions_walk'}
                  </span>
                </div>

                <div className="flex flex-col flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[14px] text-[#1f1925]">
                      {step.instruction}
                    </span>
                    <span className="text-[12px] font-semibold text-[#52424c] tabular-nums">
                      {step.durationMins} mins
                    </span>
                  </div>

                  {step.serviceNo && (
                    <div className="mt-2 flex items-center gap-2">
                      <button
                        onClick={() => {
                          onSelectServiceNo(step.serviceNo!);
                          onBackToArrivals();
                        }}
                        className="px-2.5 py-1 rounded bg-[#5d0052] text-white text-[11px] font-bold hover:bg-[#7b1c6d] cursor-pointer flex items-center gap-1"
                      >
                        <span>View Bus {step.serviceNo} Telemetry</span>
                        <span className="material-symbols-outlined text-[13px]">arrow_forward</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
