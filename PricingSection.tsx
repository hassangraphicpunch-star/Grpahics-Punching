import React, { useState } from 'react';
import { PRICING_PLANS } from './mockData';
import { CheckCircle2, Zap, Clock, ShieldCheck, Sparkles } from 'lucide-react';

interface PricingSectionProps {
  onOpenQuoteModal: (service?: string) => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onOpenQuoteModal }) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'digitizing' | 'vector' | 'patches'>('all');

  const filteredPlans =
    activeCategory === 'all'
      ? PRICING_PLANS
      : PRICING_PLANS.filter((p) => p.category === activeCategory);

  return (
    <section id="pricing-section" className="py-16 md:py-24 bg-slate-950 text-white border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-950/80 border border-red-800/50 text-red-400 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Transparent Flat-Rate Pricing</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold">
            No Hidden Fees. <span className="bg-gradient-to-r from-red-500 to-amber-400 bg-clip-text text-transparent">Simple Flat Rates</span>
          </h2>
          <p className="text-slate-300 text-sm leading-relaxed">
            Starting at just $10 flat rate for standard cap and left chest embroidery digitizing or vector art conversion. Unlimited free minor edits included!
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center justify-center gap-2 flex-wrap">
          {[
            { id: 'all', label: 'All Pricing Plans' },
            { id: 'digitizing', label: 'Digitizing' },
            { id: 'vector', label: 'Vector Artwork' },
            { id: 'patches', label: 'Custom Patches' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveCategory(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeCategory === tab.id
                  ? 'bg-red-600 text-white shadow-lg shadow-red-900/40'
                  : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredPlans.map((plan) => (
            <div
              key={plan.id}
              className={`relative bg-slate-900 rounded-2xl p-6 sm:p-8 border flex flex-col justify-between transition-all ${
                plan.popular
                  ? 'border-red-500 shadow-2xl shadow-red-950 ring-1 ring-red-500'
                  : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-red-600 to-amber-500 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-lg">
                  Most Popular Choice
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-extrabold text-white">{plan.name}</h3>
                  <p className="text-xs text-slate-400 mt-1">{plan.description}</p>
                </div>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-center">
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-4xl font-black text-amber-400 font-mono">{plan.price}</span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5 font-medium">{plan.unit}</div>
                  <div className="text-[10px] text-emerald-400 font-semibold mt-1 flex items-center justify-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>Turnaround: {plan.turnaround}</span>
                  </div>
                </div>

                <ul className="space-y-2.5 text-xs text-slate-300">
                  {plan.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6">
                <button
                  onClick={() => onOpenQuoteModal(plan.category)}
                  className={`w-full py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-lg ${
                    plan.popular
                      ? 'bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white shadow-red-900/40'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700'
                  }`}
                >
                  Order {plan.name} Now
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Guarantees Box */}
        <div className="bg-slate-900/60 rounded-2xl border border-slate-800 p-6 grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-red-950/80 rounded-xl border border-red-800 text-red-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">100% Quality Guaranteed</div>
              <div className="text-xs text-slate-400">Tested on commercial embroidery machines.</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-3 bg-amber-950/80 rounded-xl border border-amber-800 text-amber-400">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">2 to 6 Hours Express</div>
              <div className="text-xs text-slate-400">Super rush delivery available 24/7.</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-3 bg-emerald-950/80 rounded-xl border border-emerald-800 text-emerald-400">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">Free Revisions</div>
              <div className="text-xs text-slate-400">Unlimited minor adjustments & format changes.</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
