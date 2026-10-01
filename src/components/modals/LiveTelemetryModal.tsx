import React, { useState, useEffect } from 'react';
import { BusService } from '../../types/transit';

interface LiveTelemetryModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: BusService;
}

export const LiveTelemetryModal: React.FC<LiveTelemetryModalProps> = ({
  isOpen,
  onClose,
  service
}) => {
  const [speed, setSpeed] = useState(service.speedKmh);
  const [passengerCount, setPassengerCount] = useState(58);
  const [chimePlayed, setChimePlayed] = useState(false);

  // Subtle speed fluctuation simulation
  useEffect(() => {
    if (!isOpen) return;
    const interval = setInterval(() => {
      setSpeed((prev) => {
        const delta = (Math.random() - 0.5) * 4;
        const next = Math.max(25, Math.min(52, Math.round(prev + delta)));
        return next;
      });
    }, 2000);
    return () => clearInterval(interval);
  }, [isOpen]);

  if (!isOpen) return null;

  // Play audio chime using Web Audio API
  const playStopChime = () => {
    try {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioContextClass();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
      osc.frequency.setValueAtTime(880, ctx.currentTime + 0.15); // A5

      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.8);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.8);
      setChimePlayed(true);
      setTimeout(() => setChimePlayed(false), 2000);
    } catch {
      // Fallback silent
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl border border-[#E4E4EB] overflow-hidden flex flex-col max-h-[90vh]">
        {/* Top Header */}
        <div className="p-4 bg-gradient-to-r from-[#5d0052] to-[#7b1c6d] text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-[#0E8345] animate-ping"></span>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-headline text-[18px] font-bold">
                  Live Bus Telemetry Stream
                </span>
                <span className="px-2 py-0.5 rounded bg-white/20 text-[11px] font-mono">
                  {service.activeVehicleReg}
                </span>
              </div>
              <span className="text-[12px] text-white/80">
                Route {service.serviceNo} towards {service.destination}
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[22px]">close</span>
          </button>
        </div>

        {/* Cockpit Simulation Body */}
        <div className="p-5 overflow-y-auto flex flex-col gap-5 bg-[#fff7ff]">
          {/* Main Gauges Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Speedometer */}
            <div className="bg-white rounded-xl p-4 border border-[#E4E4EB] shadow-xs flex flex-col items-center justify-center text-center">
              <span className="text-[11px] uppercase font-bold text-[#52424c]">Current Velocity</span>
              <div className="my-2 flex items-baseline gap-1">
                <span className="font-headline text-[42px] font-black text-[#5d0052] tabular-nums leading-none">
                  {speed}
                </span>
                <span className="text-[14px] font-bold text-[#52424c]">km/h</span>
              </div>
              <span className="text-[11px] text-[#0E8345] font-semibold flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#0E8345]"></span>
                Within speed limit (50 km/h)
              </span>
            </div>

            {/* Occupancy Gauge */}
            <div className="bg-white rounded-xl p-4 border border-[#E4E4EB] shadow-xs flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-[11px] uppercase font-bold text-[#52424c]">Passenger Load</span>
                <span className="px-1.5 py-0.5 rounded bg-[#f6eafc] text-[10px] font-bold text-[#5d0052]">
                  Level 2
                </span>
              </div>
              <div className="my-1">
                <div className="flex items-baseline justify-between">
                  <span className="font-headline text-[28px] font-bold text-[#1f1925] tabular-nums">
                    {passengerCount}
                  </span>
                  <span className="text-[12px] text-[#52424c]">/ 95 capacity (61%)</span>
                </div>
                <div className="w-full bg-[#f0e4f6] h-2 rounded-full mt-1 overflow-hidden">
                  <div className="bg-[#D97706] h-full rounded-full" style={{ width: '61%' }}></div>
                </div>
              </div>
              <span className="text-[11px] text-[#D97706] font-semibold">
                Standing Available (Upper Deck Free)
              </span>
            </div>

            {/* Vehicle Model & Telematics */}
            <div className="bg-white rounded-xl p-4 border border-[#E4E4EB] shadow-xs flex flex-col justify-between">
              <span className="text-[11px] uppercase font-bold text-[#52424c]">Fleet Telematics</span>
              <div className="flex flex-col text-[12px] gap-1 my-1">
                <span className="font-semibold text-[#1f1925]">{service.vehicleModel}</span>
                <span className="text-[#52424c]">Doors: <strong className="text-[#0E8345]">Closed &amp; Locked</strong></span>
                <span className="text-[#52424c]">Air-Con: <strong className="text-[#1f1925]">23.5°C Active</strong></span>
              </div>
              <span className="text-[11px] text-[#0E8345] font-semibold">
                LTA CAN-Bus Sync 100%
              </span>
            </div>
          </div>

          {/* Next Stop Annunciator Banner */}
          <div className="bg-white rounded-xl p-4 border border-[#E4E4EB] shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#5d0052] text-white flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[20px]">volume_up</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] uppercase tracking-wider text-[#5d0052] font-bold">
                  Approaching Next Stop
                </span>
                <span className="font-headline text-[16px] font-bold text-[#1f1925]">
                  Blk 938 · Tampines Ave 4 (Stop #76111)
                </span>
                <span className="text-[12px] text-[#52424c]">
                  Estimated arrival in 1 min 15 sec · Shelter Bay 01
                </span>
              </div>
            </div>

            <button
              onClick={playStopChime}
              className={`px-3.5 py-2 rounded-xl text-[12px] font-bold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
                chimePlayed
                  ? 'bg-[#0E8345] text-white'
                  : 'bg-[#f0e4f6] hover:bg-[#eadef0] text-[#5d0052]'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">campaign</span>
              <span>{chimePlayed ? 'Chime Announcing...' : 'Test Station Chime'}</span>
            </button>
          </div>

          {/* Sequential Route Progress */}
          <div className="bg-white rounded-xl p-4 border border-[#E4E4EB] shadow-xs flex flex-col gap-3">
            <span className="text-[12px] font-bold text-[#1f1925] uppercase tracking-wider">
              Real-Time Route Telemetry Path
            </span>

            <div className="flex flex-col gap-2">
              {service.routeStops.map((stop, idx) => (
                <div key={stop.code} className="flex items-center justify-between py-1.5 border-b border-[#f0e4f6] last:border-0 text-[13px]">
                  <div className="flex items-center gap-3">
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
                      idx === 0
                        ? 'bg-[#5d0052] text-white'
                        : idx === 1
                        ? 'bg-[#0E8345] text-white animate-pulse'
                        : 'bg-[#f0e4f6] text-[#52424c]'
                    }`}>
                      {idx + 1}
                    </span>
                    <div className="flex flex-col">
                      <span className="font-semibold text-[#1f1925]">{stop.name}</span>
                      <span className="text-[11px] text-[#52424c]">{stop.road} · #{stop.code}</span>
                    </div>
                  </div>

                  <div className="text-right">
                    {idx === 0 ? (
                      <span className="px-2 py-0.5 rounded bg-[#f6eafc] text-[#5d0052] text-[11px] font-bold">
                        Departed
                      </span>
                    ) : idx === 1 ? (
                      <span className="px-2 py-0.5 rounded bg-[#0E8345]/15 text-[#0E8345] text-[11px] font-bold animate-pulse">
                        Arriving Next
                      </span>
                    ) : (
                      <span className="text-[12px] text-[#52424c] font-medium">
                        +{stop.estMins} mins
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3.5 bg-white border-t border-[#E4E4EB] flex items-center justify-between">
          <span className="text-[11px] text-[#52424c]">
            Real-time feed streaming from LTA OCC Telematics Satellite.
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-[#5d0052] text-white text-[12px] font-bold hover:bg-[#7b1c6d] cursor-pointer"
          >
            Close Feed
          </button>
        </div>
      </div>
    </div>
  );
};
