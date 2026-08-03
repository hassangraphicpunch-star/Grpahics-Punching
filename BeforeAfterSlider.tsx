import React, { useState, useRef, useCallback } from 'react';
import { ArrowLeftRight, Sparkles, CheckCircle2 } from 'lucide-react';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  title?: string;
  description?: string;
  stitches?: number;
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({
  beforeImage,
  afterImage,
  beforeLabel = 'Original Artwork File',
  afterLabel = 'Digitized Stitch Simulation',
  title,
  description,
  stitches,
}) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback(
    (clientX: number) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      let percentage = (x / rect.width) * 100;
      if (percentage < 0) percentage = 0;
      if (percentage > 100) percentage = 100;
      setSliderPosition(percentage);
    },
    []
  );

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  return (
    <div className="bg-slate-950 rounded-2xl border border-slate-800 p-4 sm:p-6 space-y-4 shadow-xl">
      {title && (
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h4 className="text-lg font-bold text-white flex items-center gap-2">
              <span>{title}</span>
              {stitches && (
                <span className="text-xs bg-red-950 text-red-300 border border-red-800 px-2 py-0.5 rounded-full font-mono">
                  {stitches.toLocaleString()} stitches
                </span>
              )}
            </h4>
            {description && <p className="text-xs text-slate-400 mt-1">{description}</p>}
          </div>

          <div className="text-xs text-amber-400 font-semibold flex items-center gap-1 bg-slate-900 px-2.5 py-1 rounded-full border border-slate-800">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Drag slider to compare quality</span>
          </div>
        </div>
      )}

      {/* Interactive Slider Area */}
      <div
        ref={containerRef}
        onMouseDown={() => setIsDragging(true)}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        className="relative h-72 sm:h-96 w-full rounded-xl overflow-hidden select-none cursor-ew-resize border border-slate-800 bg-slate-900"
      >
        {/* AFTER Image (Background full width) */}
        <img
          src={afterImage}
          alt={afterLabel}
          className="absolute inset-0 w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />

        {/* AFTER Label Tag (Right top) */}
        <div className="absolute top-3 right-3 bg-red-600/90 text-white text-xs font-bold px-3 py-1 rounded-full backdrop-blur-md shadow-lg z-10 flex items-center gap-1">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>{afterLabel}</span>
        </div>

        {/* BEFORE Image (Clipped overlay) */}
        <div
          className="absolute inset-0 h-full overflow-hidden"
          style={{ width: `${sliderPosition}%` }}
        >
          <img
            src={beforeImage}
            alt={beforeLabel}
            className="absolute top-0 left-0 max-w-none h-full object-cover"
            style={{ width: containerRef.current ? containerRef.current.offsetWidth : '100%' }}
            referrerPolicy="no-referrer"
          />

          {/* BEFORE Label Tag (Left top) */}
          <div className="absolute top-3 left-3 bg-slate-900/90 text-slate-200 text-xs font-bold px-3 py-1 rounded-full border border-slate-700 backdrop-blur-md shadow-lg">
            <span>{beforeLabel}</span>
          </div>
        </div>

        {/* Vertical Divider Bar */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-amber-400 shadow-[0_0_12px_rgba(251,191,36,0.8)] z-20"
          style={{ left: `${sliderPosition}%` }}
        >
          {/* Center Drag Handle Icon Button */}
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-slate-900 border-2 border-amber-400 text-amber-300 flex items-center justify-center shadow-2xl">
            <ArrowLeftRight className="w-5 h-5 animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
};
