import React from 'react';
import { Mail, Phone, ShieldCheck, Heart, ArrowUp } from 'lucide-react';
import { Needle } from './NeedleIcon';

interface FooterProps {
  setActiveTab: (tab: string) => void;
  onOpenQuoteModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab, onOpenQuoteModal }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-white border-t border-slate-800 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Brand & About */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-amber-500 rounded-xl flex items-center justify-center text-white shadow-lg">
                <Needle className="w-6 h-6 text-amber-100" />
              </div>
              <div className="text-xl font-black tracking-tight">
                GRAPHICS<span className="text-red-500">PUNCHING</span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              World-class custom embroidery digitizing, vector artwork conversion, and custom patches manufacturing. Delivering precision machine files with 2 to 6 hours express turnaround.
            </p>

            <div className="text-xs text-slate-400 space-y-1">
              <p>📍 Global Service Center | 24/7 Production Shift</p>
              <p>📧 Email: support@graphicspunching.com</p>
              <p>📞 Phone: +1 (800) 555-PUNCH</p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">Navigation</h4>
            <ul className="space-y-2 text-xs text-slate-300">
              {['home', 'services', 'portfolio', 'pricing', 'simulator'].map((tab) => (
                <li key={tab}>
                  <button
                    onClick={() => {
                      setActiveTab(tab);
                      scrollToTop();
                    }}
                    className="hover:text-amber-400 capitalize transition-colors"
                  >
                    {tab.replace('-', ' ')}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Tools & Resources */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">Interactive Tools</h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <button
                  onClick={() => {
                    setActiveTab('simulator');
                    scrollToTop();
                  }}
                  className="hover:text-amber-400 transition-colors"
                >
                  Stitch Simulator
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveTab('thread-chart');
                    scrollToTop();
                  }}
                  className="hover:text-amber-400 transition-colors"
                >
                  Thread Color Matcher
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveTab('tracker');
                    scrollToTop();
                  }}
                  className="hover:text-amber-400 transition-colors"
                >
                  Track Order Status
                </button>
              </li>
              <li>
                <button onClick={onOpenQuoteModal} className="hover:text-amber-400 transition-colors">
                  Instant Quote Estimator
                </button>
              </li>
            </ul>
          </div>

          {/* Formats Supported */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">Supported Formats</h4>
            <div className="flex flex-wrap gap-1.5 font-mono text-[10px]">
              {['.DST', '.PES', '.EMB', '.EXP', '.JEF', '.VP3', '.HUS', '.AI', '.EPS', '.SVG', '.CDR', '.PDF'].map(
                (f) => (
                  <span key={f} className="bg-slate-900 border border-slate-800 px-2 py-0.5 rounded text-slate-300">
                    {f}
                  </span>
                )
              )}
            </div>
            <div className="pt-2 text-[10px] text-slate-500">
              Compatible with Tajima, Brother, Melco, Wilcom, Janome, Barudan & ZSK embroidery machines.
            </div>
          </div>

        </div>

        {/* Bottom Copyright & Security Badges */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} Graphics Punching. All rights reserved. Professional Custom Embroidery Digitizing Services.
          </div>

          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
              <span>256-Bit SSL Encrypted Order Portal</span>
            </span>

            <button
              onClick={scrollToTop}
              className="p-2 bg-slate-900 hover:bg-slate-800 text-slate-300 rounded-lg border border-slate-800"
              title="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
