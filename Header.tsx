import React, { useState } from 'react';
import {
  Zap,
  Phone,
  Mail,
  FileText,
  Search,
  CheckCircle2,
  Menu,
  X,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { Needle } from './NeedleIcon';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenQuoteModal: (service?: string) => void;
  onOpenTrackModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenQuoteModal,
  onOpenTrackModal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'pricing', label: 'Pricing' },
    { id: 'simulator', label: 'Stitch Simulator' },
    { id: 'thread-chart', label: 'Thread Chart' },
    { id: 'tracker', label: 'Track Order' },
    { id: 'faq', label: 'FAQ' },
    { id: 'contact', label: 'Contact Us' },
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-slate-900 text-white shadow-xl border-b border-slate-800">
      {/* Top Announcement & Quick Info Bar */}
      <div className="bg-gradient-to-r from-red-600 via-amber-600 to-red-700 text-xs py-1.5 px-4 font-medium">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 bg-black/25 px-2 py-0.5 rounded-full text-amber-200">
              <Zap className="w-3.5 h-3.5 animate-pulse text-amber-300" />
              <span>Super Fast Turnaround: 2 - 6 Hours</span>
            </span>
            <span className="hidden sm:inline-block text-slate-200">
              ⚡ 24/7 Dedicated Master Digitizers | Free Revisions
            </span>
          </div>
          <div className="flex items-center gap-4 text-slate-100">
            <a
              href="mailto:support@graphicspunching.com"
              className="hover:text-amber-300 transition-colors flex items-center gap-1"
            >
              <Mail className="w-3.5 h-3.5" />
              <span className="hidden md:inline">support@graphicspunching.com</span>
            </a>
            <span className="text-slate-400">|</span>
            <a
              href="tel:+18005557862"
              className="hover:text-amber-300 transition-colors flex items-center gap-1 font-semibold"
            >
              <Phone className="w-3.5 h-3.5 text-amber-300" />
              <span>+1 (800) 555-PUNCH</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <div
          onClick={() => handleNavClick('home')}
          className="cursor-pointer flex items-center gap-2.5 group"
        >
          <div className="relative w-10 h-10 bg-gradient-to-br from-red-600 to-amber-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-red-900/40 group-hover:scale-105 transition-transform">
            <Needle className="w-6 h-6 text-amber-100" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
            </span>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-black tracking-tight leading-none bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
              GRAPHICS<span className="text-red-500">PUNCHING</span>
            </div>
            <p className="text-[10px] text-slate-400 font-medium tracking-widest uppercase mt-0.5">
              Embroidery Digitizing & Vector Art
            </p>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 text-sm font-medium">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeTab === item.id
                  ? 'bg-red-600 text-white font-semibold shadow-md shadow-red-900/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Quick Action CTAs */}
        <div className="hidden sm:flex items-center gap-2.5">
          <button
            onClick={onOpenTrackModal}
            className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-700 bg-slate-800 text-slate-200 hover:text-white hover:bg-slate-700 transition-colors flex items-center gap-1.5"
          >
            <Search className="w-3.5 h-3.5 text-amber-400" />
            <span>Track Order</span>
          </button>

          <button
            onClick={() => onOpenQuoteModal()}
            className="px-4 py-2 text-xs sm:text-sm font-bold rounded-lg bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white shadow-lg shadow-red-900/40 hover:shadow-red-800/60 transition-all flex items-center gap-1.5"
          >
            <Sparkles className="w-4 h-4 text-amber-200 animate-spin-slow" />
            <span>Get Instant Quote</span>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-slate-300 hover:text-white rounded-lg bg-slate-800 border border-slate-700"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-900 border-t border-slate-800 px-4 py-4 space-y-3 animate-in slide-in-from-top-2 duration-200">
          <div className="grid grid-cols-2 gap-2 pb-2 border-b border-slate-800">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === item.id
                    ? 'bg-red-600 text-white font-semibold'
                    : 'text-slate-300 hover:bg-slate-800'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="pt-1 space-y-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenTrackModal();
              }}
              className="w-full py-2.5 px-4 rounded-xl border border-slate-700 bg-slate-800 text-slate-200 text-sm font-semibold flex items-center justify-center gap-2"
            >
              <Search className="w-4 h-4 text-amber-400" />
              <span>Track Existing Order</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenQuoteModal();
              }}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-red-600 to-amber-600 text-white text-sm font-bold shadow-lg shadow-red-900/40 flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-amber-200" />
              <span>Get Instant Quote & Order ($10 Flat)</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
