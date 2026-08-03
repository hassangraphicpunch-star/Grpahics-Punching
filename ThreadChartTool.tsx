import React, { useState } from 'react';
import { THREAD_COLORS } from './mockData';
import { ThreadColor } from './types';
import { Search, Palette, Check, Copy, Sparkles, Filter } from 'lucide-react';

export const ThreadChartTool: React.FC = () => {
  const [selectedBrand, setSelectedBrand] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [pickerHex, setPickerHex] = useState<string>('#D32F2F');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // Helper function to calculate color distance (RGB euclidean)
  const hexToRgb = (hex: string) => {
    const clean = hex.replace('#', '');
    return {
      r: parseInt(clean.substring(0, 2), 16) || 0,
      g: parseInt(clean.substring(2, 4), 16) || 0,
      b: parseInt(clean.substring(4, 6), 16) || 0,
    };
  };

  const getClosestThread = (hex: string): ThreadColor => {
    const targetRgb = hexToRgb(hex);
    let closest = THREAD_COLORS[0];
    let minDistance = Infinity;

    THREAD_COLORS.forEach((t) => {
      const rgb = hexToRgb(t.hex);
      const dist = Math.sqrt(
        Math.pow(rgb.r - targetRgb.r, 2) +
          Math.pow(rgb.g - targetRgb.g, 2) +
          Math.pow(rgb.b - targetRgb.b, 2)
      );
      if (dist < minDistance) {
        minDistance = dist;
        closest = t;
      }
    });

    return closest;
  };

  const matchedThread = getClosestThread(pickerHex);

  const filteredThreads = THREAD_COLORS.filter((t) => {
    const matchesBrand = selectedBrand === 'All' || t.brand === selectedBrand;
    const matchesQuery =
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesBrand && matchesQuery;
  });

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <section id="thread-chart-section" className="py-16 md:py-24 bg-slate-950 text-white border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-950/80 border border-red-800/50 text-red-400 text-xs font-semibold">
            <Palette className="w-3.5 h-3.5 text-amber-400" />
            <span>Thread Color Lookup & Matcher</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold">
            Commercial Embroidery <span className="bg-gradient-to-r from-red-500 to-amber-400 bg-clip-text text-transparent">Thread Color Chart</span>
          </h2>
          <p className="text-slate-300 text-sm leading-relaxed">
            Search Madeira Classic, Polyneon, and Isacord thread color numbers or pick a custom hex color from your logo to find the exact thread match.
          </p>
        </div>

        {/* Interactive Hex Matcher Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 rounded-2xl border border-slate-800 p-6 shadow-xl grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-5 space-y-3">
            <h3 className="text-lg font-bold flex items-center gap-2 text-white">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <span>Smart Logo Thread Matcher</span>
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Pick any RGB/HEX color from your logo artwork file to instantly convert it to the nearest commercial Madeira thread shade number.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <input
                type="color"
                value={pickerHex}
                onChange={(e) => setPickerHex(e.target.value)}
                className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-700 cursor-pointer p-1"
              />
              <div>
                <div className="text-xs text-slate-400 font-mono">Selected Hex:</div>
                <div className="text-sm font-bold font-mono text-amber-400">{pickerHex.toUpperCase()}</div>
              </div>
            </div>
          </div>

          <div className="md:col-span-7 bg-slate-900/90 p-4 rounded-xl border border-slate-800 flex flex-wrap sm:flex-nowrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div
                className="w-14 h-14 rounded-xl border-2 border-white/20 shadow-md shrink-0"
                style={{ backgroundColor: matchedThread.hex }}
              ></div>
              <div>
                <div className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                  Closest Matching Thread Code:
                </div>
                <div className="text-lg font-black text-white">{matchedThread.name}</div>
                <div className="text-xs text-slate-400">
                  Brand: {matchedThread.brand} • Code: <strong className="text-amber-300">{matchedThread.code}</strong>
                </div>
              </div>
            </div>

            <button
              onClick={() => handleCopyCode(`${matchedThread.brand} ${matchedThread.code}`)}
              className="px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold transition-colors flex items-center gap-1.5 shrink-0"
            >
              {copiedCode === `${matchedThread.brand} ${matchedThread.code}` ? (
                <>
                  <Check className="w-4 h-4 text-amber-200" />
                  <span>Code Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy Code</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Filter Controls & Search */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 flex-wrap">
            {['All', 'Madeira Classic', 'Madeira Polyneon', 'Isacord'].map((brand) => (
              <button
                key={brand}
                onClick={() => setSelectedBrand(brand)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                  selectedBrand === brand
                    ? 'bg-red-600 text-white font-bold'
                    : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800'
                }`}
              >
                {brand}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search code or color..."
              className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
            />
          </div>
        </div>

        {/* Thread Swatches Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {filteredThreads.map((thread) => (
            <div
              key={`${thread.brand}-${thread.code}`}
              className="bg-slate-900 rounded-xl border border-slate-800 p-3.5 space-y-2 hover:border-slate-700 transition-all hover:scale-105 group"
            >
              <div
                className="w-full h-20 rounded-lg shadow-inner relative overflow-hidden flex items-end justify-end p-2"
                style={{ backgroundColor: thread.hex }}
              >
                <button
                  onClick={() => handleCopyCode(`${thread.brand} ${thread.code}`)}
                  className="bg-black/60 hover:bg-black/90 text-white p-1.5 rounded-md text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity"
                  title="Copy Code"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>
              </div>

              <div>
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span>{thread.brand}</span>
                  <span className="font-bold text-amber-400">#{thread.code}</span>
                </div>
                <div className="text-xs font-bold text-white truncate mt-0.5">{thread.name}</div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
