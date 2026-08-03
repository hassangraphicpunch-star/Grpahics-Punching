import React from 'react';
import { TESTIMONIALS_DATA } from '../data/mockData';
import { Star, Quote, CheckCircle2 } from 'lucide-react';

export const Testimonials: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-slate-900 text-white border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10">
        
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-950/80 border border-amber-800 text-amber-400 text-xs font-semibold">
            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span>Trusted By Over 8,500+ Apparel Professionals</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold">
            What Our <span className="bg-gradient-to-r from-red-500 to-amber-400 bg-clip-text text-transparent">Clients Say</span>
          </h2>
          <p className="text-slate-300 text-sm leading-relaxed">
            From commercial embroiderers to high-volume screen printers and streetwear brands worldwide.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS_DATA.map((t) => (
            <div
              key={t.id}
              className="bg-slate-950 rounded-2xl p-6 border border-slate-800 flex flex-col justify-between space-y-4 hover:border-slate-700 transition-all shadow-xl"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex text-amber-400 gap-1">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-slate-700" />
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic">
                  "{t.comment}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-slate-800">
                <img
                  src={t.avatar}
                  alt={t.clientName}
                  className="w-10 h-10 rounded-full object-cover border border-amber-500/40"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <div className="text-sm font-bold text-white flex items-center gap-1">
                    <span>{t.clientName}</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  </div>
                  <div className="text-xs text-slate-400">
                    {t.role} • <strong className="text-slate-300">{t.company}</strong> ({t.location})
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
