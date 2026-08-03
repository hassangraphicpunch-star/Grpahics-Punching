import React, { useState } from 'react';
import { ServiceCategory } from './types';
import {
  PenTool,
  ShieldCheck,
  Upload,
  CheckCircle2,
  Clock,
  Zap,
  Sparkles,
  Calculator,
  ArrowRight,
  ArrowLeft,
  FileText,
  Layers,
} from 'lucide-react';
import { Needle } from './NeedleIcon';

interface QuoteCalculatorProps {
  initialService?: ServiceCategory;
  onClose?: () => void;
  onOrderCreated?: (orderId: string) => void;
}

export const QuoteCalculator: React.FC<QuoteCalculatorProps> = ({
  initialService = 'digitizing',
  onClose,
  onOrderCreated,
}) => {
  const [step, setStep] = useState<number>(1);
  const [serviceType, setServiceType] = useState<ServiceCategory>(initialService);
  const [placement, setPlacement] = useState<string>('Left Chest Polo');
  const [width, setWidth] = useState<number>(3.5);
  const [height, setHeight] = useState<number>(2.5);
  const [fabricType, setFabricType] = useState<string>('Pique Polo / Cotton');
  const [machineFormat, setMachineFormat] = useState<string>('.DST (Tajima)');
  const [threadBrand, setThreadBrand] = useState<string>('Madeira Classic');
  const [turnaround, setTurnaround] = useState<'express' | 'standard'>('standard');
  const [clientName, setClientName] = useState<string>('');
  const [clientEmail, setClientEmail] = useState<string>('');
  const [clientPhone, setClientPhone] = useState<string>('');
  const [specialInstructions, setSpecialInstructions] = useState<string>('');
  const [uploadedFiles, setUploadedFiles] = useState<Array<{ name: string; size: string }>>([
    { name: 'my_company_logo_v2.png', size: '2.4 MB' },
  ]);
  const [orderCompleteId, setOrderCompleteId] = useState<string | null>(null);

  // Auto Stitch Estimator Formula
  const estimatedStitches = Math.max(
    3500,
    Math.round(width * height * 1150 * (placement.includes('Cap') ? 1.3 : 1.0))
  );

  // Price Calculation Formula
  let basePrice = 10;
  if (serviceType === 'digitizing') {
    if (placement.includes('Jacket Back') || estimatedStitches > 25000) {
      basePrice = 35;
    } else {
      basePrice = 10;
    }
  } else if (serviceType === 'vector') {
    basePrice = 10;
  } else if (serviceType === 'patches') {
    basePrice = 45; // min batch
  }

  const rushFee = turnaround === 'express' ? 5 : 0;
  const totalPrice = basePrice + rushFee;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setUploadedFiles([
        ...uploadedFiles,
        { name: file.name, size: `${(file.size / (1024 * 1024)).toFixed(1)} MB` },
      ]);
    }
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const newOrderId = `GP-${Math.floor(10000 + Math.random() * 90000)}`;
    setOrderCompleteId(newOrderId);
    if (onOrderCreated) {
      onOrderCreated(newOrderId);
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 text-white max-w-3xl w-full mx-auto space-y-6 shadow-2xl">
      
      {/* Wizard Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-red-950 rounded-xl border border-red-800 text-red-400">
            <Calculator className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold">Instant Quote & Order Wizard</h3>
            <p className="text-xs text-slate-400">Step {step} of 3 • Transparent Flat Rate Pricing</p>
          </div>
        </div>

        {onClose && (
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 bg-slate-800 rounded-lg text-sm font-bold"
          >
            ✕
          </button>
        )}
      </div>

      {orderCompleteId ? (
        /* Order Complete Success Screen */
        <div className="py-8 text-center space-y-4 animate-fade-in">
          <div className="w-16 h-16 bg-emerald-950 border-2 border-emerald-500 rounded-full flex items-center justify-center mx-auto text-emerald-400 shadow-xl">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <h4 className="text-2xl font-black text-white">Order Placed Successfully!</h4>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 max-w-md mx-auto space-y-2">
            <div className="text-xs text-slate-400">Your Official Order ID:</div>
            <div className="text-2xl font-mono font-black text-amber-400">{orderCompleteId}</div>
            <div className="text-xs text-slate-300">
              A confirmation invoice and download portal link have been sent to <strong>{clientEmail || 'your email'}</strong>.
            </div>
          </div>

          <div className="text-xs text-slate-400 space-y-1">
            <p>⚡ Estimated Completion: <strong>{turnaround === 'express' ? '2 to 4 Hours' : '4 to 8 Hours'}</strong></p>
            <p>You can track your design live in our Order Tracker using Order ID: <strong className="text-amber-400">{orderCompleteId}</strong></p>
          </div>

          <div className="pt-4 flex justify-center gap-3">
            <button
              onClick={() => {
                setOrderCompleteId(null);
                setStep(1);
              }}
              className="px-6 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-200 text-xs font-bold hover:text-white"
            >
              Submit Another Design
            </button>
          </div>
        </div>
      ) : (
        /* Step-by-Step Order Form */
        <div>
          {/* Progress Indicator */}
          <div className="grid grid-cols-3 gap-2 mb-6">
            {[
              { num: 1, name: 'Service & Size' },
              { num: 2, name: 'Format & File' },
              { num: 3, name: 'Review & Submit' },
            ].map((s) => (
              <div
                key={s.num}
                className={`p-2 rounded-xl text-center border text-xs font-bold transition-colors ${
                  step === s.num
                    ? 'bg-red-600 border-red-500 text-white'
                    : step > s.num
                    ? 'bg-slate-800 border-emerald-500 text-emerald-400'
                    : 'bg-slate-950 border-slate-800 text-slate-500'
                }`}
              >
                {s.num}. {s.name}
              </div>
            ))}
          </div>

          {/* STEP 1: Service Type & Dimensions */}
          {step === 1 && (
            <div className="space-y-6 animate-fade-in">
              {/* Service Selection Pills */}
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  1. Choose Service Category:
                </label>
                <div className="grid grid-cols-3 gap-3 text-xs">
                  <button
                    type="button"
                    onClick={() => setServiceType('digitizing')}
                    className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center gap-1 ${
                      serviceType === 'digitizing'
                        ? 'bg-red-950 border-red-500 text-white font-bold shadow-lg'
                        : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <Needle className="w-5 h-5 text-red-400" />
                    <span>Embroidery Digitizing</span>
                    <span className="text-[10px] text-amber-400">$10 Flat</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setServiceType('vector')}
                    className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center gap-1 ${
                      serviceType === 'vector'
                        ? 'bg-amber-950 border-amber-500 text-white font-bold shadow-lg'
                        : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <PenTool className="w-5 h-5 text-amber-400" />
                    <span>Vector Art Conversion</span>
                    <span className="text-[10px] text-amber-400">$10 Flat</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setServiceType('patches')}
                    className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center gap-1 ${
                      serviceType === 'patches'
                        ? 'bg-emerald-950 border-emerald-500 text-white font-bold shadow-lg'
                        : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <ShieldCheck className="w-5 h-5 text-emerald-400" />
                    <span>Custom Patches</span>
                    <span className="text-[10px] text-emerald-400">$1.20 / patch</span>
                  </button>
                </div>
              </div>

              {/* Placement & Size Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-1">Garment Placement / Location</label>
                  <select
                    value={placement}
                    onChange={(e) => setPlacement(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-red-500"
                  >
                    <option value="Left Chest Polo">Left Chest Polo / Shirt</option>
                    <option value="Cap Front 3D Puff">Cap Front (3D Foam Puff)</option>
                    <option value="Cap Side / Back">Cap Side or Back</option>
                    <option value="Jacket Back Center">Jacket Back Center (Oversized)</option>
                    <option value="Sleeve Logo">Sleeve / Cuff Logo</option>
                    <option value="Beanie / Mask">Beanie / Mask / Apron</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-1">Garment Fabric Type</label>
                  <select
                    value={fabricType}
                    onChange={(e) => setFabricType(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-red-500"
                  >
                    <option value="Pique Polo / Cotton">Pique Polo / Cotton Shirt</option>
                    <option value="Flexfit Twill Cap">Flexfit Twill / Structured Cap</option>
                    <option value="Leather / Heavy Denim">Leather / Heavy Denim Jacket</option>
                    <option value="Fleece Hoodie">Fleece / Hoodie Sweatshirt</option>
                    <option value="Performance Polyester">Performance Polyester / Mesh</option>
                  </select>
                </div>
              </div>

              {/* Target Dimensions */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-slate-300">Target Design Size (Inches):</span>
                  {serviceType === 'digitizing' && (
                    <span className="text-amber-400 font-mono">
                      Estimated Stitches: ~{estimatedStitches.toLocaleString()}
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="text-slate-400 block mb-1">Width (Inches):</label>
                    <input
                      type="number"
                      step="0.1"
                      min="0.5"
                      max="16"
                      value={width}
                      onChange={(e) => setWidth(parseFloat(e.target.value) || 1)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-white font-mono font-bold"
                    />
                  </div>

                  <div>
                    <label className="text-slate-400 block mb-1">Height (Inches):</label>
                    <input
                      type="number"
                      step="0.1"
                      min="0.5"
                      max="16"
                      value={height}
                      onChange={(e) => setHeight(parseFloat(e.target.value) || 1)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-white font-mono font-bold"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={() => setStep(2)}
                  className="px-6 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-lg"
                >
                  <span>Next: Formats & File Upload</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Format & File Upload */}
          {step === 2 && (
            <div className="space-y-6 animate-fade-in">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-1">Primary Machine Format</label>
                  <select
                    value={machineFormat}
                    onChange={(e) => setMachineFormat(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-red-500"
                  >
                    <option value=".DST (Tajima)">.DST (Tajima Commercial)</option>
                    <option value=".PES (Brother)">.PES (Brother / Babylock)</option>
                    <option value=".EXP (Melco)">.EXP (Melco / Bernina)</option>
                    <option value=".EMB (Wilcom)">.EMB (Wilcom Native Master)</option>
                    <option value=".JEF (Janome)">.JEF (Janome)</option>
                    <option value=".VP3 (Pfaff)">.VP3 (Pfaff / Husqvarna)</option>
                    <option value=".AI / .EPS Vector">.AI / .EPS (Vector Source)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-1">Thread Brand Preference</label>
                  <select
                    value={threadBrand}
                    onChange={(e) => setThreadBrand(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-red-500"
                  >
                    <option value="Madeira Classic">Madeira Classic Rayon</option>
                    <option value="Madeira Polyneon">Madeira Polyneon Polyester</option>
                    <option value="Isacord">Isacord Polyester</option>
                    <option value="Robison-Anton">Robison-Anton</option>
                  </select>
                </div>
              </div>

              {/* Turnaround Time Selection */}
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Turnaround Speed Option:
                </label>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <button
                    type="button"
                    onClick={() => setTurnaround('standard')}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      turnaround === 'standard'
                        ? 'bg-slate-800 border-amber-500 text-white font-bold'
                        : 'bg-slate-950 border-slate-800 text-slate-400'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>Standard Turnaround</span>
                      <span className="text-emerald-400 font-bold">Free</span>
                    </div>
                    <p className="text-[10px] text-slate-400 mt-1">4 to 8 Hours Delivery</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setTurnaround('express')}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      turnaround === 'express'
                        ? 'bg-red-950 border-red-500 text-white font-bold'
                        : 'bg-slate-950 border-slate-800 text-slate-400'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1">
                        <Zap className="w-3.5 h-3.5 text-amber-400" />
                        <span>Super Rush Delivery</span>
                      </span>
                      <span className="text-amber-400 font-bold">+$5</span>
                    </div>
                    <p className="text-[10px] text-slate-400 mt-1">2 to 4 Hours Guaranteed</p>
                  </button>
                </div>
              </div>

              {/* Drag and Drop File Upload Area */}
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Upload Logo Artwork File (PNG, JPG, AI, PDF, SVG):
                </label>
                <div className="border-2 border-dashed border-slate-800 hover:border-red-500 rounded-2xl p-6 bg-slate-950 text-center space-y-3 cursor-pointer relative transition-colors">
                  <input
                    type="file"
                    onChange={handleFileUpload}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                  <Upload className="w-8 h-8 text-amber-400 mx-auto" />
                  <div className="text-xs text-slate-300 font-bold">
                    Click or Drag & Drop Artwork Files Here
                  </div>
                  <p className="text-[10px] text-slate-500">Supports PNG, JPG, PDF, AI, EPS, SVG up to 50MB</p>
                </div>

                {/* Uploaded Files List */}
                {uploadedFiles.length > 0 && (
                  <div className="mt-3 space-y-1.5 text-xs">
                    {uploadedFiles.map((f, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between bg-slate-950 px-3 py-2 rounded-lg border border-slate-800"
                      >
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-amber-400" />
                          <span className="font-mono text-slate-200">{f.name}</span>
                        </div>
                        <span className="text-[10px] text-slate-400 font-mono">{f.size}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={() => setStep(1)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>

                <button
                  onClick={() => setStep(3)}
                  className="px-6 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-lg"
                >
                  <span>Next: Review & Submit</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Review & Submit */}
          {step === 3 && (
            <form onSubmit={handlePlaceOrder} className="space-y-6 animate-fade-in">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3 text-xs">
                <div className="flex items-center justify-between font-bold border-b border-slate-800 pb-2">
                  <span className="text-white uppercase tracking-wider">Order Summary</span>
                  <span className="text-amber-400 font-mono text-sm">${totalPrice} USD</span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-slate-300">
                  <div>Service: <strong className="text-white uppercase">{serviceType}</strong></div>
                  <div>Placement: <strong className="text-white">{placement}</strong></div>
                  <div>Dimensions: <strong className="text-white">{width}" W x {height}" H</strong></div>
                  <div>Format: <strong className="text-white">{machineFormat}</strong></div>
                  <div>Speed: <strong className="text-amber-400">{turnaround.toUpperCase()}</strong></div>
                  <div>Revisions: <strong className="text-emerald-400">100% Free</strong></div>
                </div>
              </div>

              {/* Client Contact Details */}
              <div className="space-y-3 text-xs">
                <label className="block font-bold text-slate-400 uppercase tracking-wider">
                  Contact & Delivery Details:
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="Full Name *"
                    className="bg-slate-950 border border-slate-800 rounded-xl p-3 text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
                  />

                  <input
                    type="email"
                    required
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    placeholder="Email Address (for file delivery) *"
                    className="bg-slate-950 border border-slate-800 rounded-xl p-3 text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
                  />
                </div>

                <input
                  type="tel"
                  value={clientPhone}
                  onChange={(e) => setClientPhone(e.target.value)}
                  placeholder="Phone / WhatsApp (optional for instant updates)"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
                />

                <textarea
                  rows={2}
                  value={specialInstructions}
                  onChange={(e) => setSpecialInstructions(e.target.value)}
                  placeholder="Special instructions (e.g. trim jump stitches, keep satin column wider for knit cap)..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
                ></textarea>
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>

                <button
                  type="submit"
                  className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-red-600 via-amber-600 to-red-600 hover:from-red-500 hover:to-amber-500 text-white font-black text-xs uppercase tracking-wider shadow-xl flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-amber-200" />
                  <span>Confirm & Place Order (${totalPrice} Flat)</span>
                </button>
              </div>
            </form>
          )}
        </div>
      )}

    </div>
  );
};
