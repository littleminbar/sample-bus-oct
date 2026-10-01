import React, { useState } from 'react';
import { SBS_LOGO_URL } from '../data/transitData';

interface HeaderProps {
  activeTab: 'bus-arrivals' | 'nearby-stops' | 'route-planner' | 'service-alerts';
  onSelectTab: (tab: 'bus-arrivals' | 'nearby-stops' | 'route-planner' | 'service-alerts') => void;
  currentLocationName: string;
  onOpenSettings: () => void;
  onSwitchStop: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onSelectTab,
  currentLocationName,
  onOpenSettings,
  onSwitchStop
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[#fff7ff]/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(24,18,30,0.04)] border-b border-[#E4E4EB]">
      <div className="h-16 max-w-[1280px] mx-auto px-4 md:px-10 flex items-center justify-between gap-4">
        {/* Brand Lockup */}
        <div 
          className="flex items-center gap-3.5 cursor-pointer select-none" 
          onClick={() => onSelectTab('bus-arrivals')}
        >
          <img 
            alt="SBS Transit Pulse Logo" 
            className="h-8 w-auto object-contain" 
            src={SBS_LOGO_URL} 
            referrerPolicy="no-referrer"
          />
          <div className="flex flex-col">
            <span className="font-headline text-[20px] font-bold tracking-tight text-[#5d0052] leading-tight">
              SBS Transit
            </span>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#52424c] hidden sm:inline-block">
              Real-Time Bus Telemetry
            </span>
          </div>
        </div>

        {/* Primary Desktop Navigation Bar */}
        <nav className="hidden lg:flex items-center gap-1 p-1 bg-[#f0e4f6] rounded-xl">
          <button
            onClick={() => onSelectTab('bus-arrivals')}
            className={`px-3.5 py-1.5 transition-all text-[14px] font-semibold rounded-lg ${
              activeTab === 'bus-arrivals'
                ? 'bg-[#7b1c6d] text-white shadow-sm'
                : 'text-[#52424c] hover:text-[#1f1925] hover:bg-white/50'
            }`}
          >
            Bus Arrivals
          </button>
          <button
            onClick={() => onSelectTab('nearby-stops')}
            className={`px-3.5 py-1.5 transition-all text-[14px] font-semibold rounded-lg ${
              activeTab === 'nearby-stops'
                ? 'bg-[#7b1c6d] text-white shadow-sm'
                : 'text-[#52424c] hover:text-[#1f1925] hover:bg-white/50'
            }`}
          >
            Nearby Stops
          </button>
          <button
            onClick={() => onSelectTab('route-planner')}
            className={`px-3.5 py-1.5 transition-all text-[14px] font-semibold rounded-lg ${
              activeTab === 'route-planner'
                ? 'bg-[#7b1c6d] text-white shadow-sm'
                : 'text-[#52424c] hover:text-[#1f1925] hover:bg-white/50'
            }`}
          >
            Route Planner
          </button>
          <button
            onClick={() => onSelectTab('service-alerts')}
            className={`px-3.5 py-1.5 transition-all text-[14px] font-semibold rounded-lg ${
              activeTab === 'service-alerts'
                ? 'bg-[#7b1c6d] text-white shadow-sm'
                : 'text-[#52424c] hover:text-[#1f1925] hover:bg-white/50'
            }`}
          >
            Service Alerts
          </button>
        </nav>

        {/* Top Right Utility Badges & User Profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* LTA Feed Active Badge */}
          <div className="hidden xl:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white shadow-[0_1px_3px_rgba(24,18,30,0.04)] border border-[#E4E4EB]">
            <span className="w-2 h-2 rounded-full bg-[#0E8345] animate-pulse"></span>
            <span className="text-[11px] text-[#52424c] font-semibold">LTA Data Feed Active</span>
          </div>

          {/* Current Nearest Location Chip */}
          <button
            onClick={onSwitchStop}
            className="hidden sm:flex items-center gap-1 px-3 py-1 rounded-full bg-white text-[#1f1925] shadow-[0_1px_3px_rgba(24,18,30,0.04)] border border-[#E4E4EB] hover:border-[#7b1c6d] transition-colors"
            title="Click to switch current bus stop location"
          >
            <span className="material-symbols-outlined text-[16px] text-[#5d0052]">near_me</span>
            <span className="text-[11px] font-semibold truncate max-w-[180px] text-left">
              {currentLocationName}
            </span>
          </button>

          {/* Profile Button */}
          <button
            onClick={onOpenSettings}
            className="w-8 h-8 rounded-full bg-[#5d0052] flex items-center justify-center hover:opacity-90 active:scale-95 transition-all text-white shadow-sm"
            title="Commuter settings and preferences"
          >
            <span className="material-symbols-outlined text-[18px]">person</span>
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 lg:hidden rounded-lg hover:bg-[#f0e4f6] text-[#52424c]"
            aria-label="Toggle navigation menu"
          >
            <span className="material-symbols-outlined text-[24px]">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden px-4 py-3 bg-[#fff7ff] border-t border-[#E4E4EB] flex flex-col gap-1.5 shadow-lg">
          <button
            onClick={() => { onSelectTab('bus-arrivals'); setMobileMenuOpen(false); }}
            className={`px-4 py-2.5 rounded-lg text-left text-sm font-semibold transition-colors flex items-center gap-2 ${
              activeTab === 'bus-arrivals' ? 'bg-[#7b1c6d] text-white' : 'text-[#52424c] hover:bg-[#f0e4f6]'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">directions_bus</span>
            Bus Arrivals
          </button>
          <button
            onClick={() => { onSelectTab('nearby-stops'); setMobileMenuOpen(false); }}
            className={`px-4 py-2.5 rounded-lg text-left text-sm font-semibold transition-colors flex items-center gap-2 ${
              activeTab === 'nearby-stops' ? 'bg-[#7b1c6d] text-white' : 'text-[#52424c] hover:bg-[#f0e4f6]'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">near_me</span>
            Nearby Stops
          </button>
          <button
            onClick={() => { onSelectTab('route-planner'); setMobileMenuOpen(false); }}
            className={`px-4 py-2.5 rounded-lg text-left text-sm font-semibold transition-colors flex items-center gap-2 ${
              activeTab === 'route-planner' ? 'bg-[#7b1c6d] text-white' : 'text-[#52424c] hover:bg-[#f0e4f6]'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">alt_route</span>
            Route Planner
          </button>
          <button
            onClick={() => { onSelectTab('service-alerts'); setMobileMenuOpen(false); }}
            className={`px-4 py-2.5 rounded-lg text-left text-sm font-semibold transition-colors flex items-center gap-2 ${
              activeTab === 'service-alerts' ? 'bg-[#7b1c6d] text-white' : 'text-[#52424c] hover:bg-[#f0e4f6]'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">notifications_active</span>
            Service Alerts
          </button>
        </div>
      )}
    </header>
  );
};
