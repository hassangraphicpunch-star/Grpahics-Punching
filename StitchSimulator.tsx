import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  FastForward,
  Sparkles,
  Download,
  Gauge,
  Layers,
  Zap,
  Maximize2,
  Sliders,
  CheckCircle2,
} from 'lucide-react';
import { Needle } from './NeedleIcon';

interface SampleDesign {
  id: string;
  name: string;
  totalStitches: number;
  placement: string;
  hoopSize: string;
  colors: Array<{ name: string; hex: string; stitches: number }>;
}

const PRESET_DESIGNS: SampleDesign[] = [
  {
    id: 'design-1',
    name: '3D Foam Eagle Cap Front',
    totalStitches: 12450,
    placement: 'Cap Center Front',
    hoopSize: '100mm x 100mm',
    colors: [
      { name: 'Madeira Metallic Gold', hex: '#D4AF37', stitches: 6200 },
      { name: 'Madeira Jet Black', hex: '#111111', stitches: 4150 },
      { name: 'Madeira Scarlet Red', hex: '#D32F2F', stitches: 2100 },
    ],
  },
  {
    id: 'design-2',
    name: 'Classic Monogram Polo Crest',
    totalStitches: 7800,
    placement: 'Left Chest Polo',
    hoopSize: '120mm x 120mm',
    colors: [
      { name: 'Madeira Royal Navy', hex: '#0D47A1', stitches: 4800 },
      { name: 'Madeira Super White', hex: '#FFFFFF', stitches: 3000 },
    ],
  },
  {
    id: 'design-3',
    name: 'Motorcycle Tiger Jacket Back',
    totalStitches: 28400,
    placement: 'Leather Jacket Center Back',
    hoopSize: '300mm x 300mm',
    colors: [
      { name: 'Madeira Goldenrod', hex: '#F57F17', stitches: 11200 },
      { name: 'Madeira Jet Black', hex: '#111111', stitches: 9400 },
      { name: 'Madeira Emerald Green', hex: '#2E7D32', stitches: 4800 },
      { name: 'Madeira Crimson Red', hex: '#B71C1C', stitches: 3000 },
    ],
  },
];

interface StitchSimulatorProps {
  onOpenQuoteModal: (service?: string) => void;
}

export const StitchSimulator: React.FC<StitchSimulatorProps> = ({ onOpenQuoteModal }) => {
  const [selectedDesign, setSelectedDesign] = useState<SampleDesign>(PRESET_DESIGNS[0]);
  const [currentStitch, setCurrentStitch] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(5); // 1 to 20
  const [showGrid, setShowGrid] = useState<boolean>(true);
  const [densityMode, setDensityMode] = useState<boolean>(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number | null>(null);

  // Reset stitch counter when design changes
  useEffect(() => {
    setCurrentStitch(0);
    setIsPlaying(false);
  }, [selectedDesign]);

  // Main Canvas Rendering Loop for Stitch Simulation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions
    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;

    // Clear canvas background (Emulated fabric background)
    ctx.fillStyle = '#0f172a'; // dark slate
    ctx.fillRect(0, 0, width, height);

    // Draw Hoop Grid & Boundary
    if (showGrid) {
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 1;
      const gridSize = 20;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Hoop Circle
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(centerX, centerY, Math.min(width, height) * 0.42, 0, Math.PI * 2);
      ctx.stroke();
      ctx.fillStyle = '#475569';
      ctx.font = '10px monospace';
      ctx.fillText(`EMBROIDERY HOOP (${selectedDesign.hoopSize})`, centerX - 70, 20);
    }

    // Generate deterministic mathematical stitch paths based on design ID & stitch ratio
    const progressRatio = currentStitch / selectedDesign.totalStitches;
    const totalPoints = 350; // points along vector path
    const activePointsCount = Math.floor(progressRatio * totalPoints);

    let accumStitches = 0;
    selectedDesign.colors.forEach((col, colorIndex) => {
      const colorRatio = col.stitches / selectedDesign.totalStitches;
      const colorEndStitch = accumStitches + col.stitches;
      const colorStartRatio = accumStitches / selectedDesign.totalStitches;
      accumStitches = colorEndStitch;

      if (currentStitch < accumStitches - col.stitches) return;

      ctx.save();
      ctx.strokeStyle = densityMode ? '#f59e0b' : col.hex;
      ctx.lineWidth = densityMode ? 3 : 2.5;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      // Draw satin stitch columns & fill stitches
      ctx.beginPath();
      const numRings = colorIndex === 0 ? 5 : colorIndex === 1 ? 8 : 12;
      const baseRadius = 30 + colorIndex * 25;

      for (let i = 0; i <= Math.min(activePointsCount, totalPoints); i++) {
        const angle = (i / totalPoints) * Math.PI * 2 * (colorIndex + 1);
        const r = baseRadius + Math.sin(i * 0.3) * 15;
        const x = centerX + Math.cos(angle) * r;
        const y = centerY + Math.sin(angle) * r;

        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          // Draw zigzag satin stitches
          const offset = (i % 2 === 0 ? 3 : -3);
          ctx.lineTo(x + offset, y + offset);
        }
      }
      ctx.stroke();
      ctx.restore();
    });

    // Draw active needle head position
    if (activePointsCount > 0 && currentStitch < selectedDesign.totalStitches) {
      const angle = (activePointsCount / totalPoints) * Math.PI * 2;
      const r = 30 + Math.sin(activePointsCount * 0.3) * 15;
      const needleX = centerX + Math.cos(angle) * r;
      const needleY = centerY + Math.sin(angle) * r;

      // Needle glow
      ctx.save();
      ctx.fillStyle = '#ef4444';
      ctx.beginPath();
      ctx.arc(needleX, needleY, 5, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = '#fcd34d';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(needleX, needleY, 9, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
    }
  }, [currentStitch, selectedDesign, showGrid, densityMode]);

  // Animation playback loop
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentStitch((prev) => {
        const next = prev + speed * 60;
        if (next >= selectedDesign.totalStitches) {
          setIsPlaying(false);
          return selectedDesign.totalStitches;
        }
        return next;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [isPlaying, speed, selectedDesign]);

  const estimatedMinutes = Math.ceil(selectedDesign.totalStitches / 850); // 850 stitches per min

  return (
    <section id="simulator-section" className="py-16 md:py-24 bg-slate-900 text-white border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-950/80 border border-red-800/50 text-red-400 text-xs font-semibold">
            <Needle className="w-3.5 h-3.5 text-amber-400" />
            <span>Interactive Digitizing Viewer</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold">
            Interactive Embroidery <span className="bg-gradient-to-r from-red-500 to-amber-400 bg-clip-text text-transparent">Stitch Simulator</span>
          </h2>
          <p className="text-slate-300 text-sm leading-relaxed">
            Test and inspect machine needle paths, thread sequence, density layout, and jump cuts in real-time before sending to production.
          </p>
        </div>

        {/* Main Simulator Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-slate-950 rounded-2xl border border-slate-800 p-6 shadow-2xl">
          
          {/* Left Controls & Preset Selection */}
          <div className="lg:col-span-4 space-y-6">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
                Select Preset Digitized Design:
              </label>
              <div className="space-y-2">
                {PRESET_DESIGNS.map((d) => (
                  <button
                    key={d.id}
                    onClick={() => setSelectedDesign(d)}
                    className={`w-full p-3 rounded-xl border text-left transition-all flex items-center justify-between ${
                      selectedDesign.id === d.id
                        ? 'bg-red-950/80 border-red-600 text-white shadow-md'
                        : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div>
                      <div className="text-sm font-bold">{d.name}</div>
                      <div className="text-xs text-slate-400 mt-0.5">
                        {d.placement} • {d.totalStitches.toLocaleString()} stitches
                      </div>
                    </div>
                    {selectedDesign.id === d.id && (
                      <CheckCircle2 className="w-5 h-5 text-red-400 shrink-0" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Design Spec Dashboard */}
            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center justify-between">
                <span>Production Metrics</span>
                <Gauge className="w-4 h-4 text-amber-400" />
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                  <div className="text-slate-400">Total Stitches</div>
                  <div className="text-sm font-mono font-bold text-white mt-0.5">
                    {selectedDesign.totalStitches.toLocaleString()}
                  </div>
                </div>

                <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                  <div className="text-slate-400">Est. Machine Time</div>
                  <div className="text-sm font-mono font-bold text-amber-400 mt-0.5">
                    ~{estimatedMinutes} min @ 850 RPM
                  </div>
                </div>
              </div>

              {/* Thread Color Layers List */}
              <div className="pt-2">
                <div className="text-xs font-bold text-slate-400 mb-2 flex items-center gap-1">
                  <Layers className="w-3.5 h-3.5" />
                  <span>Thread Color Stops ({selectedDesign.colors.length}):</span>
                </div>
                <div className="space-y-1.5">
                  {selectedDesign.colors.map((c, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between text-xs bg-slate-950 px-2.5 py-1.5 rounded border border-slate-800"
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className="w-3 h-3 rounded-full border border-white/20"
                          style={{ backgroundColor: c.hex }}
                        ></span>
                        <span className="font-medium text-slate-200">{c.name}</span>
                      </div>
                      <span className="font-mono text-slate-400">{c.stitches.toLocaleString()} st</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-2">
              <button
                onClick={() => onOpenQuoteModal('digitizing')}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2"
              >
                <Zap className="w-4 h-4 text-amber-200" />
                <span>Order Your Custom Design ($10 Flat)</span>
              </button>
            </div>
          </div>

          {/* Right Canvas Simulation View */}
          <div className="lg:col-span-8 flex flex-col justify-between space-y-4">
            
            {/* Canvas Header Bar */}
            <div className="flex flex-wrap items-center justify-between gap-2 bg-slate-900 p-3 rounded-xl border border-slate-800 text-xs font-mono">
              <div className="flex items-center gap-3">
                <span className="text-slate-400">LIVE STITCH COUNTER:</span>
                <span className="text-amber-400 font-bold text-sm">
                  {currentStitch.toLocaleString()} / {selectedDesign.totalStitches.toLocaleString()}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowGrid(!showGrid)}
                  className={`px-2.5 py-1 rounded border transition-colors ${
                    showGrid ? 'bg-slate-800 text-amber-300 border-amber-500/50' : 'bg-slate-950 text-slate-400 border-slate-800'
                  }`}
                >
                  Grid: {showGrid ? 'ON' : 'OFF'}
                </button>

                <button
                  onClick={() => setDensityMode(!densityMode)}
                  className={`px-2.5 py-1 rounded border transition-colors ${
                    densityMode ? 'bg-amber-950 text-amber-300 border-amber-500' : 'bg-slate-950 text-slate-400 border-slate-800'
                  }`}
                >
                  Density View: {densityMode ? 'ON' : 'OFF'}
                </button>
              </div>
            </div>

            {/* Interactive Canvas Stage */}
            <div className="relative rounded-xl overflow-hidden border border-slate-800 bg-slate-950 flex items-center justify-center h-[340px] sm:h-[420px]">
              <canvas
                ref={canvasRef}
                width={560}
                height={400}
                className="w-full h-full object-contain cursor-crosshair"
              />

              {/* Completed Overlay Banner */}
              {currentStitch >= selectedDesign.totalStitches && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-slate-900/90 border border-emerald-500 text-emerald-300 px-4 py-2 rounded-xl backdrop-blur-md shadow-2xl text-xs font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Stitch Simulation Completed (100% Quality Passed)</span>
                </div>
              )}
            </div>

            {/* Playback Progress Slider Bar */}
            <div className="space-y-2 bg-slate-900 p-4 rounded-xl border border-slate-800">
              <input
                type="range"
                min={0}
                max={selectedDesign.totalStitches}
                value={currentStitch}
                onChange={(e) => setCurrentStitch(Number(e.target.value))}
                className="w-full accent-red-500 cursor-pointer h-2 rounded-lg bg-slate-800"
              />

              {/* Playback Controls */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md"
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    <span>{isPlaying ? 'Pause' : 'Play Simulation'}</span>
                  </button>

                  <button
                    onClick={() => {
                      setIsPlaying(false);
                      setCurrentStitch(0);
                    }}
                    className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700"
                    title="Reset to Stitch 0"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>

                {/* Speed Selector */}
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <FastForward className="w-4 h-4 text-amber-400" />
                  <span>Speed:</span>
                  {[1, 5, 10, 20].map((s) => (
                    <button
                      key={s}
                      onClick={() => setSpeed(s)}
                      className={`px-2 py-1 rounded font-mono font-bold text-xs ${
                        speed === s ? 'bg-amber-500 text-black' : 'bg-slate-800 text-slate-300'
                      }`}
                    >
                      {s}x
                    </button>
                  ))}
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
