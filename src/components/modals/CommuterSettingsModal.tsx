import React from 'react';

interface CommuterSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  refreshInterval: number;
  onSetRefreshInterval: (sec: number) => void;
  alertsEnabled: boolean;
  onToggleAlerts: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export const CommuterSettingsModal: React.FC<CommuterSettingsModalProps> = ({
  isOpen,
  onClose,
  refreshInterval,
  onSetRefreshInterval,
  alertsEnabled,
  onToggleAlerts,
  soundEnabled,
  onToggleSound
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl border border-[#E4E4EB] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-4 bg-[#fbf0ff] border-b border-[#E4E4EB] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#5d0052] text-[22px]">settings</span>
            <h3 className="font-headline text-[18px] font-bold text-[#1f1925]">
              Commuter Preferences
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-[#f0e4f6] text-[#52424c] transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Settings Body */}
        <div className="p-5 flex flex-col gap-4 bg-white">
          {/* Telemetry Polling Rate */}
          <div className="flex flex-col gap-2">
            <span className="text-[12px] font-bold text-[#1f1925] uppercase tracking-wider">
              Telemetry Polling Frequency
            </span>
            <div className="grid grid-cols-3 gap-2">
              {[8, 15, 30].map((sec) => (
                <button
                  key={sec}
                  onClick={() => onSetRefreshInterval(sec)}
                  className={`py-2 rounded-xl text-[12px] font-semibold border transition-all cursor-pointer ${
                    refreshInterval === sec
                      ? 'border-[#5d0052] bg-[#5d0052] text-white shadow-xs'
                      : 'border-[#E4E4EB] bg-[#fbf0ff] text-[#1f1925] hover:bg-[#f6eafc]'
                  }`}
                >
                  {sec} seconds {sec === 15 ? '(Default)' : ''}
                </button>
              ))}
            </div>
            <span className="text-[11px] text-[#52424c]">
              Synchronized directly with LTA DataMall GTFS-RT precision engine.
            </span>
          </div>

          <div className="h-px bg-[#E4E4EB]"></div>

          {/* Toggle Options */}
          <div className="flex flex-col gap-3">
            <label className="flex items-center justify-between cursor-pointer">
              <div className="flex flex-col">
                <span className="text-[13px] font-bold text-[#1f1925]">Arrival Vibration Notification</span>
                <span className="text-[11px] text-[#52424c]">Vibrate when target bus is &lt; 2 mins away</span>
              </div>
              <input
                type="checkbox"
                checked={alertsEnabled}
                onChange={onToggleAlerts}
                className="w-5 h-5 accent-[#5d0052] cursor-pointer"
              />
            </label>

            <label className="flex items-center justify-between cursor-pointer">
              <div className="flex flex-col">
                <span className="text-[13px] font-bold text-[#1f1925]">Audio Station Chime</span>
                <span className="text-[11px] text-[#52424c]">Play chime when switching stops and tracking line</span>
              </div>
              <input
                type="checkbox"
                checked={soundEnabled}
                onChange={onToggleSound}
                className="w-5 h-5 accent-[#5d0052] cursor-pointer"
              />
            </label>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3.5 bg-[#fbf0ff] border-t border-[#E4E4EB] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-[#5d0052] text-white text-[12px] font-bold hover:bg-[#7b1c6d] cursor-pointer"
          >
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
};
