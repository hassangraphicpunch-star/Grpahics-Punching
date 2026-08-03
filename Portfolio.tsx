import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '../data/mockData';
import { PortfolioItem } from '../types';
import { BeforeAfterSlider } from './BeforeAfterSlider';
import {
  PenTool,
  ShieldCheck,
  Search,
  Sparkles,
  Layers,
  Download,
  Eye,
  CheckCircle2,
} from 'lucide-react';
import { Needle } from './NeedleIcon';

interface PortfolioProps {
  onOpenQuoteModal: (service?: string) => void;
}

export const Portfolio: React.FC<PortfolioProps> = ({ onOpenQuoteModal }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);

  const filteredItems = PORTFOLIO_DATA.filter((item) => {
    const matchesCategory =
      activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.placement.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="portfolio-section" className="py-16 md:py-24 bg-slate-950 text-white border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-950/80 border border-amber-800/50 text-amber-400 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Craftsmanship Gallery</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Our Master Digitizing & <span className="bg-gradient-to-r from-red-500 to-amber-400 bg-clip-text text-transparent">Vector Showcase</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Inspect real production stitch quality, 3D foam puff execution, and surgical vector tracing. Test stitched on commercial Tajima & Melco embroidery machines.
          </p>
        </div>

        {/* Filter Controls & Search */}
        <div className="mt-8 mb-10 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {[
              { id: 'all', label: 'All Showcase' },
              { id: '3d-puff', label: '3D Puff & Caps' },
              { id: 'embroidery', label: 'Jackets & Logos' },
              { id: 'vector', label: 'Vector Art' },
              { id: 'patches', label: 'Custom Patches' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  activeCategory === cat.id
                    ? 'bg-red-600 text-white shadow-md shadow-red-900/30'
                    : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by keyword..."
              className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
            />
          </div>
        </div>

        {/* Featured Interactive Compare Slider */}
        <div className="mb-12">
          <BeforeAfterSlider
            title="Featured Masterwork: 3D Foam Puff Eagle Cap Digitizing"
            description="Notice the clean satin column caps, zero raw foam exposure, and high density underlay required for 3D puff cap embroidery."
            beforeImage="https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=1200&q=80"
            afterImage={PORTFOLIO_DATA[0].afterImage}
            beforeLabel="Raw Client Artwork File"
            afterLabel="Graphics Punching Digitized Result"
            stitches={12450}
          />
        </div>

        {/* Portfolio Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden flex flex-col justify-between hover:border-slate-700 transition-all hover:shadow-xl group"
            >
              <div>
                {/* Image Showcase */}
                <div className="relative h-56 overflow-hidden bg-slate-950">
                  <img
                    src={item.afterImage}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>

                  <button
                    onClick={() => setSelectedItem(item)}
                    className="absolute top-3 right-3 bg-slate-950/80 hover:bg-red-600 text-white p-2 rounded-xl border border-slate-700 transition-colors shadow-lg flex items-center gap-1.5 text-xs font-semibold px-3"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Compare Quality</span>
                  </button>

                  <div className="absolute bottom-3 left-3 bg-slate-900/90 text-amber-300 text-[10px] font-mono px-2.5 py-0.5 rounded-md border border-slate-700">
                    {item.placement}
                  </div>
                </div>

                {/* Card Info */}
                <div className="p-5 space-y-3">
                  <h3 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-300 line-clamp-2">{item.description}</p>

                  <div className="flex flex-wrap items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800">
                    {item.stitches ? (
                      <span className="font-mono text-slate-300">
                        ⚡ {item.stitches.toLocaleString()} stitches
                      </span>
                    ) : (
                      <span className="font-mono text-amber-400">Scalable Vector</span>
                    )}

                    <div className="flex gap-1 font-mono text-[10px] text-slate-400">
                      {item.formats.slice(0, 3).map((f) => (
                        <span key={f} className="bg-slate-950 px-1.5 py-0.5 rounded border border-slate-800">
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-5 pt-0">
                <button
                  onClick={() => onOpenQuoteModal(item.category === 'vector' ? 'vector' : 'digitizing')}
                  className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-red-600 text-slate-200 hover:text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>Order Similar Design ($10 Flat)</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal View for Detailed Before/After Inspection */}
        {selectedItem && (
          <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-4xl w-full p-6 text-white space-y-6 relative max-h-[90vh] overflow-y-auto">
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white p-2 bg-slate-800 rounded-xl"
              >
                ✕
              </button>

              <div className="space-y-1">
                <h3 className="text-2xl font-bold">{selectedItem.title}</h3>
                <p className="text-xs text-amber-400 font-mono">
                  Placement: {selectedItem.placement} {selectedItem.stitches ? `| ${selectedItem.stitches.toLocaleString()} Stitches` : ''}
                </p>
              </div>

              <BeforeAfterSlider
                beforeImage={selectedItem.beforeImage}
                afterImage={selectedItem.afterImage}
                beforeLabel="Submitted Original Artwork"
                afterLabel="Graphics Punching Digitized File"
              />

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider">
                  Description & Master Specs:
                </h4>
                <p className="text-sm text-slate-300 leading-relaxed">{selectedItem.description}</p>

                <div className="pt-2 flex flex-wrap gap-2 text-xs">
                  <span className="text-slate-400">Available Machine Formats:</span>
                  {selectedItem.formats.map((fmt) => (
                    <span
                      key={fmt}
                      className="px-2 py-0.5 bg-slate-900 border border-slate-800 rounded text-amber-300 font-mono font-bold"
                    >
                      {fmt}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  onClick={() => setSelectedItem(null)}
                  className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    const cat = selectedItem.category === 'vector' ? 'vector' : 'digitizing';
                    setSelectedItem(null);
                    onOpenQuoteModal(cat);
                  }}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-amber-600 text-white text-xs font-bold shadow-lg"
                >
                  Order This Style Now
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
