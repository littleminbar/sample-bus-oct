import React, { useState } from 'react';
import { SERVICE_NOTICES } from '../../data/transitData';

interface ServiceAlertsViewProps {
  onBackToArrivals: () => void;
}

export const ServiceAlertsView: React.FC<ServiceAlertsViewProps> = ({ onBackToArrivals }) => {
  const [filter, setFilter] = useState<'all' | 'bus' | 'mrt' | 'road'>('all');

  const filteredNotices = SERVICE_NOTICES.filter((n) => filter === 'all' || n.type === filter);

  return (
    <div className="flex flex-col gap-5">
      {/* Top Alerts Header */}
      <div className="bg-white rounded-xl p-5 shadow-xs border border-[#E4E4EB] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-[#0E8345] animate-pulse"></span>
            <span className="text-[11px] uppercase tracking-wider text-[#0E8345] font-bold">
              LTA OCC Real-Time Dispatch
            </span>
          </div>
          <h2 className="font-headline text-[24px] font-bold text-[#1f1925]">
            Service Alerts &amp; Network Health
          </h2>
          <p className="text-[13px] text-[#52424c]">
            Live operational updates from SBS Transit OCC and Land Transport Authority.
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

      {/* Filter Tabs */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setFilter('all')}
          className={`px-3.5 py-1.5 rounded-lg text-[13px] font-bold transition-all cursor-pointer ${
            filter === 'all'
              ? 'bg-[#5d0052] text-white shadow-xs'
              : 'bg-white text-[#52424c] hover:bg-[#f6eafc] border border-[#E4E4EB]'
          }`}
        >
          All Notices ({SERVICE_NOTICES.length})
        </button>
        <button
          onClick={() => setFilter('bus')}
          className={`px-3.5 py-1.5 rounded-lg text-[13px] font-bold transition-all cursor-pointer ${
            filter === 'bus'
              ? 'bg-[#5d0052] text-white shadow-xs'
              : 'bg-white text-[#52424c] hover:bg-[#f6eafc] border border-[#E4E4EB]'
          }`}
        >
          Bus Corridors
        </button>
        <button
          onClick={() => setFilter('mrt')}
          className={`px-3.5 py-1.5 rounded-lg text-[13px] font-bold transition-all cursor-pointer ${
            filter === 'mrt'
              ? 'bg-[#5d0052] text-white shadow-xs'
              : 'bg-white text-[#52424c] hover:bg-[#f6eafc] border border-[#E4E4EB]'
          }`}
        >
          Rail Network
        </button>
        <button
          onClick={() => setFilter('road')}
          className={`px-3.5 py-1.5 rounded-lg text-[13px] font-bold transition-all cursor-pointer ${
            filter === 'road'
              ? 'bg-[#5d0052] text-white shadow-xs'
              : 'bg-white text-[#52424c] hover:bg-[#f6eafc] border border-[#E4E4EB]'
          }`}
        >
          Road &amp; Expressway
        </button>
      </div>

      {/* Notices Stream */}
      <div className="flex flex-col gap-3.5">
        {filteredNotices.map((notice) => (
          <div
            key={notice.id}
            className="bg-white rounded-xl p-5 border border-[#E4E4EB] shadow-xs flex flex-col gap-2.5"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className={`w-2.5 h-2.5 rounded-full ${
                  notice.severity === 'normal' ? 'bg-[#0E8345]' : 'bg-[#D97706]'
                }`}></span>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#52424c]">
                  {notice.corridor}
                </span>
              </div>
              <span className="text-[12px] font-semibold text-[#5d0052]">
                {notice.timestamp}
              </span>
            </div>

            <h4 className="font-headline text-[16px] font-bold text-[#1f1925]">
              {notice.title}
            </h4>

            <p className="text-[13px] text-[#52424c] leading-relaxed">
              {notice.description}
            </p>

            {notice.affectedServices && (
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                <span className="text-[11px] text-[#52424c] font-semibold">Services Monitored:</span>
                {notice.affectedServices.map((svc) => (
                  <span
                    key={svc}
                    className="px-2 py-0.5 rounded bg-[#f6eafc] text-[#5d0052] text-[11px] font-bold"
                  >
                    {svc}
                  </span>
                ))}
              </div>
            )}

            <div className="pt-2 border-t border-[#f0e4f6] text-[11px] text-[#52424c] flex items-center justify-between">
              <span>Verified Dispatcher: {notice.source}</span>
              <span className="text-[#0E8345] font-semibold flex items-center gap-0.5">
                <span className="material-symbols-outlined text-[13px]">verified</span>
                Verified by LTA DataMall
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
