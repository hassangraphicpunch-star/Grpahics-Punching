import React from 'react';
import {
  Sparkles,
  Zap,
  CheckCircle,
  Clock,
  ShieldCheck,
  Award,
  ArrowRight,
  Upload,
  PenTool,
  Shield,
  Layers,
} from 'lucide-react';
import { Needle } from './NeedleIcon';
import { HERO_IMAGE } from '../data/mockData';

interface HeroProps {
  onOpenQuoteModal: (service?: string) => void;
  setActiveTab: (tab: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenQuoteModal, setActiveTab }) => {
  return (
    <div className="relative bg-slate-950 text-white overflow-hidden border-b border-slate-800">
      {/* Background Graphic Grid Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-40"></div>
      
      {/* Glowing Backdrop Lights */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-red-600/15 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-amber-600/15 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Hero Content & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-red-500/30 text-xs sm:text-sm font-semibold text-red-400 shadow-md">
              <span className="flex h-2 w-2 rounded-full bg-red-500 animate-ping"></span>
              <span>Master Digitizing & Vector Artwork Specialists</span>
              <span className="bg-red-500/20 text-red-300 text-[10px] px-2 py-0.5 rounded-full font-bold uppercase">
                #1 Rated
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
              Flawless <span className="bg-gradient-to-r from-red-500 via-amber-400 to-amber-200 bg-clip-text text-transparent">Embroidery Digitizing</span> & Vector Art
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-300 font-normal max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              We punch clean, high-density embroidery files (.DST, .PES, .EMB) and redraw sharp vector artwork with guaranteed <strong>2 to 6 hours delivery</strong>. Built for commercial apparel decorators, hat makers, and screen printers.
            </p>

            {/* Key Value Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 pb-2">
              <div className="flex items-center gap-2 bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
                <Clock className="w-5 h-5 text-amber-400 shrink-0" />
                <div className="text-left">
                  <div className="text-xs font-bold text-white">2 - 6 Hours</div>
                  <div className="text-[10px] text-slate-400">Express Turnaround</div>
                </div>
              </div>

              <div className="flex items-center gap-2 bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
                <Award className="w-5 h-5 text-red-400 shrink-0" />
                <div className="text-left">
                  <div className="text-xs font-bold text-white">$10 Flat Rate</div>
                  <div className="text-[10px] text-slate-400">Cap & Left Chest</div>
                </div>
              </div>

              <div className="col-span-2 sm:col-span-1 flex items-center gap-2 bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
                <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                <div className="text-left">
                  <div className="text-xs font-bold text-white">Free Edits</div>
                  <div className="text-[10px] text-slate-400">100% Test Stitched</div>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <button
                onClick={() => onOpenQuoteModal()}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-red-600 via-amber-600 to-red-600 hover:from-red-500 hover:to-amber-500 text-white font-bold text-base shadow-xl shadow-red-900/50 hover:shadow-red-800/70 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2 group"
              >
                <Sparkles className="w-5 h-5 text-amber-200" />
                <span>Get Instant Quote & Order</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => setActiveTab('simulator')}
                className="w-full sm:w-auto px-6 py-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white font-semibold text-base border border-slate-700 hover:border-slate-600 transition-all flex items-center justify-center gap-2"
              >
                <Needle className="w-5 h-5 text-amber-400" />
                <span>Try Stitch Simulator</span>
              </button>
            </div>

            {/* Supported Machine Formats Pills */}
            <div className="pt-4 border-t border-slate-800/80">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Supported Machine Formats & Files:
              </p>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
                {['.DST (Tajima)', '.PES (Brother)', '.EXP (Melco)', '.EMB (Wilcom)', '.JEF (Janome)', '.AI / .EPS', '.VP3 / .HUS'].map(
                  (fmt) => (
                    <span
                      key={fmt}
                      className="px-2.5 py-1 text-xs font-mono font-medium bg-slate-900 border border-slate-800 rounded-md text-slate-300"
                    >
                      {fmt}
                    </span>
                  )
                )}
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Featured Card Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none rounded-2xl p-1 bg-gradient-to-b from-red-500/40 via-amber-500/20 to-slate-800 shadow-2xl">
              <div className="bg-slate-900 rounded-xl overflow-hidden">
                {/* Image Preview Container */}
                <div className="relative h-64 sm:h-72 overflow-hidden group">
                  <img
                    src={HERO_IMAGE}
                    alt="Precision Embroidery Digitizing Sample"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
                  
                  {/* Floating Badges over Image */}
                  <div className="absolute top-3 left-3 bg-slate-900/90 backdrop-blur-md px-3 py-1 rounded-full border border-amber-500/40 text-amber-300 text-xs font-bold flex items-center gap-1.5 shadow-lg">
                    <Needle className="w-3.5 h-3.5 text-amber-400" />
                    <span>Master Digitized Sample</span>
                  </div>

                  <div className="absolute top-3 right-3 bg-emerald-950/90 backdrop-blur-md px-2.5 py-1 rounded-full border border-emerald-500/40 text-emerald-300 text-xs font-semibold flex items-center gap-1 shadow-lg">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                    <span>0 Thread Breaks</span>
                  </div>

                  {/* Image Overlay Footer Info */}
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <div className="text-sm font-bold">3D Foam Cap Digitizing</div>
                    <div className="flex items-center justify-between text-xs text-slate-300 mt-0.5">
                      <span>12,450 Stitches • 3 Colors</span>
                      <span className="font-mono text-amber-400">Format: .DST / .PES</span>
                    </div>
                  </div>
                </div>

                {/* Quick Order Widget Inside Hero */}
                <div className="p-5 space-y-4 bg-slate-900">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between">
                    <span>⚡ Quick Order Estimate</span>
                    <span className="text-amber-400 font-mono font-bold">$10 Flat Rate</span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <button
                      onClick={() => onOpenQuoteModal('digitizing')}
                      className="p-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-red-500 text-slate-200 hover:text-white font-medium text-center transition-colors flex flex-col items-center gap-1"
                    >
                      <Needle className="w-4 h-4 text-red-400" />
                      <span>Digitizing</span>
                    </button>

                    <button
                      onClick={() => onOpenQuoteModal('vector')}
                      className="p-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-amber-500 text-slate-200 hover:text-white font-medium text-center transition-colors flex flex-col items-center gap-1"
                    >
                      <PenTool className="w-4 h-4 text-amber-400" />
                      <span>Vector Art</span>
                    </button>

                    <button
                      onClick={() => onOpenQuoteModal('patches')}
                      className="p-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-emerald-500 text-slate-200 hover:text-white font-medium text-center transition-colors flex flex-col items-center gap-1"
                    >
                      <Shield className="w-4 h-4 text-emerald-400" />
                      <span>Patches</span>
                    </button>
                  </div>

                  <button
                    onClick={() => onOpenQuoteModal()}
                    className="w-full py-3 rounded-lg bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-bold text-xs uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <Upload className="w-4 h-4" />
                    <span>Upload Logo File & Order Now</span>
                  </button>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
