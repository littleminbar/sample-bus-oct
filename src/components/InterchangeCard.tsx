import React from 'react';
import { TAMPINES_HUB_IMG_URL } from '../data/transitData';

interface InterchangeCardProps {
  onExploreHub?: () => void;
}

export const InterchangeCard: React.FC<InterchangeCardProps> = ({ onExploreHub }) => {
  return (
    <div className="bg-white rounded-xl p-4 shadow-xs border border-[#E4E4EB] flex flex-col sm:flex-row gap-4 items-center">
      {/* Map Image Thumbnail */}
      <div 
        className="w-full sm:w-44 h-32 rounded-lg bg-cover bg-center shrink-0 shadow-inner relative overflow-hidden group cursor-pointer"
        style={{ backgroundImage: `url('${TAMPINES_HUB_IMG_URL}')` }}
        onClick={onExploreHub}
        title="View Tampines Station Transfer Hub Guide"
      >
        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/25 transition-colors flex items-center justify-center">
          <span className="material-symbols-outlined text-white text-[24px] opacity-0 group-hover:opacity-100 transition-opacity drop-shadow">
            zoom_in
          </span>
        </div>
      </div>

      {/* Description & MRT Line Statuses */}
      <div className="flex flex-col flex-1">
        <span className="text-[11px] font-bold text-[#5d0052] uppercase tracking-wider">
          Interchange Transit Connection
        </span>
        <h4 className="font-headline text-[18px] font-bold text-[#1f1925]">
          Tampines Station Transfer Hub
        </h4>
        <p className="text-[12px] text-[#52424c] mt-1 leading-relaxed">
          Sheltered transfer available to East-West MRT Line (EW2) and Downtown MRT Line (DT32). Underground linkway accessible via Exit B.
        </p>
        
        <div className="flex flex-wrap items-center gap-2 mt-3">
          <span className="px-2 py-0.5 rounded bg-[#0E8345] text-white text-[10px] font-bold tracking-wide">
            EW Line: Normal
          </span>
          <span className="px-2 py-0.5 rounded bg-[#7b1c6d] text-white text-[10px] font-bold tracking-wide">
            DT Line: Normal
          </span>
          <button
            onClick={onExploreHub}
            className="text-[11px] text-[#5d0052] font-semibold hover:underline ml-auto flex items-center gap-0.5 cursor-pointer"
          >
            <span>Station Layout</span>
            <span className="material-symbols-outlined text-[13px]">open_in_new</span>
          </button>
        </div>
      </div>
    </div>
  );
};
