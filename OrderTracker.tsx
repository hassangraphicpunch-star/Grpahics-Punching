import React, { useState } from 'react';
import { SAMPLE_TRACKED_ORDERS } from './mockData';
import { TrackedOrder } from './types';
import {
  Search,
  CheckCircle2,
  Clock,
  Download,
  FileCheck,
  Package,
  Layers,
  Sparkles,
} from 'lucide-react';
import { Needle } from './NeedleIcon';

export const OrderTracker: React.FC = () => {
  const [searchId, setSearchId] = useState<string>('GP-84920');
  const [activeOrder, setActiveOrder] = useState<TrackedOrder | null>(SAMPLE_TRACKED_ORDERS[0]);
  const [notFound, setNotFound] = useState<boolean>(false);
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const found = SAMPLE_TRACKED_ORDERS.find(
      (o) =>
        o.orderId.toLowerCase() === searchId.trim().toLowerCase() ||
        o.clientEmail.toLowerCase() === searchId.trim().toLowerCase()
    );

    if (found) {
      setActiveOrder(found);
      setNotFound(false);
    } else {
      setActiveOrder(null);
      setNotFound(true);
    }
  };

  const handleDownloadFile = (fmt: string) => {
    setDownloadSuccess(`Downloading ${activeOrder?.designName}_master${fmt}...`);
    setTimeout(() => setDownloadSuccess(null), 3000);
  };

  return (
    <section id="tracker-section" className="py-16 md:py-24 bg-slate-900 text-white border-t border-slate-800">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-950/80 border border-red-800/50 text-red-400 text-xs font-semibold">
            <Search className="w-3.5 h-3.5 text-amber-400" />
            <span>Client Order Tracking Portal</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold">
            Track Your <span className="bg-gradient-to-r from-red-500 to-amber-400 bg-clip-text text-transparent">Digitizing & Vector Order</span>
          </h2>
          <p className="text-slate-300 text-sm leading-relaxed">
            Enter your Order ID (e.g. <strong>GP-84920</strong>) or account email to view real-time status and download completed embroidery files.
          </p>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="max-w-xl mx-auto flex gap-2">
          <div className="relative flex-1">
            <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              placeholder="Enter Order ID (e.g. GP-84920)..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-red-500 font-mono"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg transition-colors shrink-0"
          >
            Lookup Order
          </button>
        </form>

        {/* Quick Sample Selector */}
        <div className="flex items-center justify-center gap-2 text-xs text-slate-400 flex-wrap">
          <span>Try Sample Orders:</span>
          {SAMPLE_TRACKED_ORDERS.map((o) => (
            <button
              key={o.orderId}
              onClick={() => {
                setSearchId(o.orderId);
                setActiveOrder(o);
                setNotFound(false);
              }}
              className="px-2.5 py-1 bg-slate-950 border border-slate-800 rounded-md font-mono text-amber-400 hover:text-white hover:border-amber-500 transition-colors"
            >
              {o.orderId}
            </button>
          ))}
        </div>

        {/* Not Found State */}
        {notFound && (
          <div className="bg-red-950/50 border border-red-800 p-6 rounded-2xl text-center max-w-md mx-auto space-y-2">
            <div className="text-red-400 font-bold text-base">Order Not Found</div>
            <p className="text-xs text-slate-300">
              We couldn't find an order matching "{searchId}". Please check your receipt or contact support at support@graphicspunching.com.
            </p>
          </div>
        )}

        {/* Active Tracked Order Details */}
        {activeOrder && (
          <div className="bg-slate-950 rounded-2xl border border-slate-800 p-6 md:p-8 space-y-6 shadow-2xl">
            
            {/* Top Order Overview Banner */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-800">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-black text-white font-mono">{activeOrder.orderId}</span>
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-950 border border-amber-500 text-amber-300">
                    {activeOrder.serviceType}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Submitted: {activeOrder.dateSubmitted} • Email: {activeOrder.clientEmail}
                </p>
              </div>

              <div className="text-right">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Current Status:</div>
                <div className="text-sm font-bold text-emerald-400 flex items-center justify-end gap-1.5 mt-0.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>{activeOrder.status}</span>
                </div>
              </div>
            </div>

            {/* Status Timeline Bar */}
            <div className="py-2">
              <div className="grid grid-cols-4 gap-2 relative">
                {[
                  { label: 'Received', done: true },
                  { label: 'In Digitizing', done: true },
                  { label: 'Quality Stitch Check', done: true },
                  { label: 'Completed', done: activeOrder.status === 'Completed' },
                ].map((step, idx) => (
                  <div key={idx} className="text-center space-y-2">
                    <div
                      className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center font-bold text-xs ${
                        step.done
                          ? 'bg-emerald-600 text-white shadow-lg'
                          : 'bg-slate-800 text-slate-500 border border-slate-700'
                      }`}
                    >
                      {step.done ? '✓' : idx + 1}
                    </div>
                    <div className="text-[11px] font-medium text-slate-300">{step.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Content Split Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-4 border-t border-slate-800">
              
              {/* Preview Image */}
              <div className="md:col-span-5 relative rounded-xl overflow-hidden border border-slate-800 h-56 bg-slate-900">
                <img
                  src={activeOrder.previewImage}
                  alt={activeOrder.designName}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
                <div className="absolute bottom-3 left-3 text-white font-bold text-sm">
                  {activeOrder.designName}
                </div>
              </div>

              {/* Order Specifications & Downloads */}
              <div className="md:col-span-7 space-y-4">
                <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-amber-400">
                    Production Specifications
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="text-slate-400">Stitch Count:</span>
                      <p className="font-mono font-bold text-white">
                        {activeOrder.stitches ? `${activeOrder.stitches.toLocaleString()} stitches` : 'N/A (Vector)'}
                      </p>
                    </div>
                    <div>
                      <span className="text-slate-400">Dimensions:</span>
                      <p className="font-mono font-bold text-white">{activeOrder.dimensions}</p>
                    </div>
                    <div>
                      <span className="text-slate-400">Color Stops:</span>
                      <p className="font-mono font-bold text-white">{activeOrder.colors} Colors</p>
                    </div>
                    <div>
                      <span className="text-slate-400">Estimated Delivery:</span>
                      <p className="font-mono font-bold text-amber-400">{activeOrder.estimatedCompletion}</p>
                    </div>
                  </div>
                </div>

                {/* Available Downloads */}
                <div className="space-y-2">
                  <div className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                    Download Files & Stitch Worksheet:
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {activeOrder.downloadFormats.map((fmt) => (
                      <button
                        key={fmt}
                        onClick={() => handleDownloadFile(fmt)}
                        className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-red-600 border border-slate-700 text-slate-200 hover:text-white text-xs font-mono font-bold transition-all flex items-center gap-1.5 shadow-md"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Download {fmt}</span>
                      </button>
                    ))}

                    <button
                      onClick={() => handleDownloadFile('.PDF_Worksheet')}
                      className="px-3.5 py-2 rounded-xl bg-amber-950 hover:bg-amber-800 border border-amber-800 text-amber-300 text-xs font-bold transition-all flex items-center gap-1.5 shadow-md"
                    >
                      <FileCheck className="w-3.5 h-3.5" />
                      <span>PDF Thread Sheet</span>
                    </button>
                  </div>

                  {downloadSuccess && (
                    <div className="p-2.5 bg-emerald-950/80 border border-emerald-500 text-emerald-300 text-xs rounded-lg font-mono animate-fade-in">
                      ✓ {downloadSuccess}
                    </div>
                  )}
                </div>

              </div>

            </div>

          </div>
        )}

      </div>
    </section>
  );
};
