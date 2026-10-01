import React, { useState } from 'react';

interface FareCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultDistanceKm?: number;
}

export const FareCalculatorModal: React.FC<FareCalculatorModalProps> = ({
  isOpen,
  onClose,
  defaultDistanceKm = 21.4
}) => {
  const [distanceKm, setDistanceKm] = useState(defaultDistanceKm);
  const [passengerType, setPassengerType] = useState<'adult' | 'senior' | 'student' | 'workfare' | 'cash'>('adult');

  if (!isOpen) return null;

  // LTA Distance-based Singapore Public Transport Fare Formula simulation
  const calculateFare = (dist: number, type: typeof passengerType) => {
    let base = 1.09;
    if (dist <= 3.2) base = 1.09;
    else if (dist <= 7.2) base = 1.09 + (dist - 3.2) * 0.08;
    else if (dist <= 15.2) base = 1.41 + (dist - 7.2) * 0.06;
    else base = 1.89 + (dist - 15.2) * 0.045;

    switch (type) {
      case 'senior':
        return Math.min(1.05, Math.max(0.65, base * 0.45));
      case 'student':
        return Math.min(0.70, Math.max(0.50, base * 0.35));
      case 'workfare':
        return Math.max(0.85, base * 0.72);
      case 'cash':
        return Math.ceil(base + 0.90 * 10) / 10;
      case 'adult':
      default:
        return Math.min(2.45, Math.max(1.09, base));
    }
  };

  const calculatedFare = calculateFare(distanceKm, passengerType);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl border border-[#E4E4EB] overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 bg-gradient-to-r from-[#5d0052] to-[#a43e00] text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="material-symbols-outlined text-[24px]">calculate</span>
            <div>
              <h3 className="font-headline text-[18px] font-bold">
                LTA Distance-Based Fare Calculator
              </h3>
              <p className="text-[12px] text-white/80">
                Official Public Transport Council (PTC) tariff structure
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

        {/* Calculator Body */}
        <div className="p-5 overflow-y-auto flex flex-col gap-4 bg-[#fff7ff]">
          {/* Distance Slider */}
          <div className="bg-white p-4 rounded-xl border border-[#E4E4EB] shadow-xs flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-[12px] font-bold text-[#1f1925] uppercase tracking-wider">
                Travel Journey Distance
              </span>
              <span className="font-headline text-[20px] font-extrabold text-[#5d0052] tabular-nums">
                {distanceKm.toFixed(1)} km
              </span>
            </div>
            <input
              type="range"
              min="1.0"
              max="40.0"
              step="0.5"
              value={distanceKm}
              onChange={(e) => setDistanceKm(parseFloat(e.target.value))}
              className="w-full accent-[#5d0052] cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-[#52424c]">
              <span>1.0 km (Short Feeder)</span>
              <span>20 km (Cross-Town)</span>
              <span>40.0 km (Express Trunk)</span>
            </div>
          </div>

          {/* Passenger Type Selector */}
          <div className="flex flex-col gap-1.5">
            <span className="text-[12px] font-bold text-[#1f1925] uppercase tracking-wider">
              Commuter Concession Category
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              <button
                onClick={() => setPassengerType('adult')}
                className={`p-2.5 rounded-xl border text-left text-[12px] transition-all cursor-pointer ${
                  passengerType === 'adult'
                    ? 'border-[#5d0052] bg-[#5d0052] text-white font-bold shadow-xs'
                    : 'border-[#E4E4EB] bg-white text-[#1f1925] hover:bg-[#f6eafc]'
                }`}
              >
                <div>Adult Card</div>
                <div className="text-[10px] opacity-80">SimplyGo / EZ-Link</div>
              </button>

              <button
                onClick={() => setPassengerType('senior')}
                className={`p-2.5 rounded-xl border text-left text-[12px] transition-all cursor-pointer ${
                  passengerType === 'senior'
                    ? 'border-[#5d0052] bg-[#5d0052] text-white font-bold shadow-xs'
                    : 'border-[#E4E4EB] bg-white text-[#1f1925] hover:bg-[#f6eafc]'
                }`}
              >
                <div>Senior Citizen</div>
                <div className="text-[10px] opacity-80">Aged 60+ Concession</div>
              </button>

              <button
                onClick={() => setPassengerType('student')}
                className={`p-2.5 rounded-xl border text-left text-[12px] transition-all cursor-pointer ${
                  passengerType === 'student'
                    ? 'border-[#5d0052] bg-[#5d0052] text-white font-bold shadow-xs'
                    : 'border-[#E4E4EB] bg-white text-[#1f1925] hover:bg-[#f6eafc]'
                }`}
              >
                <div>Student Card</div>
                <div className="text-[10px] opacity-80">Pri / Sec / JC / ITE</div>
              </button>

              <button
                onClick={() => setPassengerType('workfare')}
                className={`p-2.5 rounded-xl border text-left text-[12px] transition-all cursor-pointer ${
                  passengerType === 'workfare'
                    ? 'border-[#5d0052] bg-[#5d0052] text-white font-bold shadow-xs'
                    : 'border-[#E4E4EB] bg-white text-[#1f1925] hover:bg-[#f6eafc]'
                }`}
              >
                <div>Workfare (WTCS)</div>
                <div className="text-[10px] opacity-80">Concession Scheme</div>
              </button>

              <button
                onClick={() => setPassengerType('cash')}
                className={`p-2.5 rounded-xl border text-left text-[12px] transition-all cursor-pointer ${
                  passengerType === 'cash'
                    ? 'border-[#5d0052] bg-[#5d0052] text-white font-bold shadow-xs'
                    : 'border-[#E4E4EB] bg-white text-[#1f1925] hover:bg-[#f6eafc]'
                }`}
              >
                <div>Cash / Single</div>
                <div className="text-[10px] opacity-80">Onboard Cash Coin</div>
              </button>
            </div>
          </div>

          {/* Computed Result Box */}
          <div className="bg-white p-4 rounded-xl border-2 border-[#5d0052] shadow-sm flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-[11px] uppercase font-bold text-[#52424c]">
                Applicable Fare (One-Way)
              </span>
              <span className="text-[12px] text-[#52424c] mt-0.5">
                Includes transfer rebate within 45-minute window
              </span>
            </div>

            <div className="flex items-baseline gap-1">
              <span className="text-[14px] font-bold text-[#52424c]">S$</span>
              <span className="font-headline text-[32px] font-black text-[#0E8345] tabular-nums">
                {calculatedFare.toFixed(2)}
              </span>
            </div>
          </div>

          {/* SimplyGo Reminder */}
          <div className="p-3 rounded-lg bg-[#f6eafc] text-[#52424c] text-[11px] flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px] text-[#5d0052]">contactless</span>
            <span>Tap in &amp; out with contactless bank cards, Apple Pay, Google Wallet, or EZ-Link.</span>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3.5 bg-white border-t border-[#E4E4EB] flex items-center justify-between">
          <button
            onClick={() => setDistanceKm(21.4)}
            className="text-[12px] text-[#5d0052] font-semibold hover:underline cursor-pointer"
          >
            Reset to Route 65 (21.4 km)
          </button>
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
