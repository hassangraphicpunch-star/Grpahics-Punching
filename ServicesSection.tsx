import React, { useState } from 'react';
import {
  PenTool,
  ShieldCheck,
  CheckCircle2,
  Clock,
  ArrowRight,
  Zap,
  Sparkles,
  Layers,
  FileCheck,
} from 'lucide-react';
import { Needle } from './NeedleIcon';
import { SERVICES_DATA } from './mockData';
import { ServiceItem } from './types';

interface ServicesSectionProps {
  onOpenQuoteModal: (service?: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onOpenQuoteModal }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'digitizing' | 'vector' | 'patches'>('all');
  const [selectedServiceModal, setSelectedServiceModal] = useState<ServiceItem | null>(null);

  const filteredServices =
    activeTab === 'all'
      ? SERVICES_DATA
      : SERVICES_DATA.filter((s) => s.category === activeTab);

  return (
    <section id="services-section" className="py-16 md:py-24 bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-950/80 border border-red-800/50 text-red-400 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Our Specialist Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Comprehensive <span className="bg-gradient-to-r from-red-500 to-amber-400 bg-clip-text text-transparent">Digitizing & Vector Services</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Engineered with precision for flawless production runs. Every file undergoes manual digitizing by master craftsmen and thorough test-stitching before dispatch.
          </p>
        </div>

        {/* Filter Navigation Tabs */}
        <div className="flex items-center justify-center gap-2 mt-8 mb-12 flex-wrap">
          {[
            { id: 'all', label: 'All Services' },
            { id: 'digitizing', label: 'Embroidery Digitizing' },
            { id: 'vector', label: 'Vector Artwork' },
            { id: 'patches', label: 'Custom Patches' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                activeTab === tab.id
                  ? 'bg-red-600 text-white shadow-lg shadow-red-900/40'
                  : 'bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 border border-slate-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden flex flex-col justify-between hover:border-slate-700 transition-all hover:shadow-2xl hover:shadow-slate-950 group"
            >
              <div>
                {/* Service Image Header */}
                <div className="relative h-48 sm:h-52 overflow-hidden bg-slate-900">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>

                  {/* Starting Price Pill */}
                  <div className="absolute top-3 right-3 bg-red-600 text-white text-xs font-black px-3 py-1 rounded-full shadow-md">
                    Starts at {service.startingPrice}
                  </div>

                  <div className="absolute top-3 left-3 bg-slate-900/90 text-amber-300 border border-amber-500/30 text-[11px] font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
                    <Clock className="w-3 h-3 text-amber-400" />
                    <span>{service.turnaround}</span>
                  </div>
                </div>

                {/* Service Content */}
                <div className="p-6 space-y-4">
                  <div className="flex items-center gap-2">
                    {service.category === 'digitizing' && <Needle className="w-5 h-5 text-red-500" />}
                    {service.category === 'vector' && <PenTool className="w-5 h-5 text-amber-500" />}
                    {service.category === 'patches' && <ShieldCheck className="w-5 h-5 text-emerald-500" />}
                    <h3 className="text-xl font-bold text-white">{service.title}</h3>
                  </div>

                  <p className="text-slate-300 text-sm leading-relaxed">{service.shortDesc}</p>

                  <div className="space-y-2 pt-2 border-t border-slate-800/80">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Included Capabilities:
                    </p>
                    <ul className="space-y-1.5 text-xs text-slate-300">
                      {service.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Service Action Footer */}
              <div className="p-6 pt-0 space-y-2">
                <button
                  onClick={() => onOpenQuoteModal(service.category)}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-red-900/30 flex items-center justify-center gap-2 transition-all"
                >
                  <Zap className="w-4 h-4 text-amber-200" />
                  <span>Order {service.title}</span>
                </button>

                <button
                  onClick={() => setSelectedServiceModal(service)}
                  className="w-full py-2 text-xs font-semibold text-slate-400 hover:text-slate-200 transition-colors text-center"
                >
                  View Full Details & Specs →
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Detailed Service Specs Modal */}
        {selectedServiceModal && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full p-6 text-white space-y-6 relative max-h-[90vh] overflow-y-auto">
              <button
                onClick={() => setSelectedServiceModal(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white text-lg font-bold p-1 bg-slate-800 rounded-lg"
              >
                ✕
              </button>

              <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
                <div className="p-3 bg-red-950/80 rounded-xl border border-red-800 text-red-400">
                  <Layers className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">{selectedServiceModal.title}</h3>
                  <p className="text-xs text-amber-400 font-medium">
                    Turnaround: {selectedServiceModal.turnaround} • Starts at {selectedServiceModal.startingPrice}
                  </p>
                </div>
              </div>

              <div className="space-y-4 text-sm text-slate-300">
                <p className="leading-relaxed">{selectedServiceModal.fullDesc}</p>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                  <h4 className="font-bold text-white text-xs uppercase tracking-wider text-amber-400">
                    Technical Specifications:
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {selectedServiceModal.features.map((f, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <FileCheck className="w-4 h-4 text-emerald-400" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  onClick={() => setSelectedServiceModal(null)}
                  className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    const cat = selectedServiceModal.category;
                    setSelectedServiceModal(null);
                    onOpenQuoteModal(cat);
                  }}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-amber-600 text-white text-xs font-bold shadow-lg"
                >
                  Get Instant Quote Now
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
