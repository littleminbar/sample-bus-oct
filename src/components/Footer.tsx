import React from 'react';

interface FooterProps {
  onOpenFareCalculator: () => void;
  onOpenAlerts: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenFareCalculator, onOpenAlerts }) => {
  return (
    <footer className="w-full bg-white mt-auto border-t border-[#E4E4EB] shadow-[0_-1px_6px_rgba(24,18,30,0.02)]">
      <div className="max-w-[1280px] mx-auto px-4 md:px-10 py-8 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col items-center md:items-start gap-1">
          <div className="flex items-center gap-2">
            <span className="font-headline text-[18px] font-bold text-[#5d0052]">
              SBS Transit Ltd
            </span>
            <span className="text-[11px] px-2 py-0.5 rounded bg-[#f6eafc] text-[#52424c] font-medium">
              Public Transport Utility
            </span>
          </div>
          <p className="text-[12px] text-[#52424c] text-center md:text-left">
            Official partner in the Land Transport Authority (LTA) Singapore DataMall framework.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-5 text-[13px] font-medium text-[#52424c]">
          <a
            href="https://datamall.lta.gov.sg"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#5d0052] transition-colors"
          >
            LTA DataMall
          </a>
          <a
            href="https://www.transitlink.com.sg"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#5d0052] transition-colors"
          >
            TransitLink Guide
          </a>
          <button
            onClick={onOpenFareCalculator}
            className="hover:text-[#5d0052] transition-colors cursor-pointer"
          >
            Fare Calculator
          </button>
          <button
            onClick={onOpenAlerts}
            className="hover:text-[#5d0052] transition-colors cursor-pointer"
          >
            Service Operating Hours
          </button>
          <button
            onClick={() => alert("SBS Transit Customer Relations Hotline: 1800-2872-727 (Daily: 7.30am - 8.00pm)")}
            className="hover:text-[#5d0052] transition-colors cursor-pointer"
          >
            Contact &amp; Feedback
          </button>
        </div>

        <div className="text-[11px] text-[#52424c]">
          &copy; 2025 SBS Transit Ltd. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
