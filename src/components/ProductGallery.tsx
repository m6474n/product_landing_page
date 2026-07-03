import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Minimize2, ZoomIn, Info } from 'lucide-react';

interface GalleryItem {
  id: number;
  title: string;
  category: string;
  description: string;
  color: string;
  blueprintSymbol: string;
}

export default function ProductGallery() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const galleryItems: GalleryItem[] = [
    {
      id: 1,
      title: "UHD IPS DreamColor Tech",
      category: "OPTICS ASSEMBLY",
      description: "A spectacular 3840x2160 pixels HDR display factory-calibrated for perfect RGB color representation.",
      color: "from-white/10 via-[#050505] to-[#050505]",
      blueprintSymbol: "LCD_PANEL_RE_3840"
    },
    {
      id: 2,
      title: "Premium CNC Aluminum Lid",
      category: "CHASSIS METALS",
      description: "Anodized structural layers provide optimal defense against external pressure while maintaining elegant sheen.",
      color: "from-white/10 via-[#050505] to-[#050505]",
      blueprintSymbol: "LID_CNC_AL_102"
    },
    {
      id: 3,
      title: "Bang & Olufsen Acoustic Array",
      category: "AUDIO SYSTEM",
      description: "Custom-tuned speakers fire upward, providing acoustic depth and spatial projection.",
      color: "from-white/10 via-[#050505] to-[#050505]",
      blueprintSymbol: "BO_STEREO_AMP_91"
    },
    {
      id: 4,
      title: "Double-Active Micro Turbines",
      category: "ACTIVE THERMALS",
      description: "Sub-30 decibel silent operation guarantees perfect cooling focus without disturbing acoustics.",
      color: "from-white/10 via-[#050505] to-[#050505]",
      blueprintSymbol: "FAN_PWM_JET_12"
    }
  ];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % galleryItems.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + galleryItems.length) % galleryItems.length);
  };

  const currentItem = galleryItems[currentIndex];

  return (
    <div id="gallery" className="w-full bg-[#050505] border border-white/10 rounded-2xl p-8 max-w-5xl mx-auto shadow-2xl relative overflow-hidden my-16">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-white/40 mb-2 block">DESIGN GALLERY</span>
          <h2 className="text-4xl font-semibold tracking-tighter text-white uppercase bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40">Visual Breakdown</h2>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handlePrev}
            className="w-10 h-10 rounded-full bg-zinc-900/30 border border-white/10 flex items-center justify-center hover:border-white/20 hover:text-white text-white/60 transition-all duration-300"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={handleNext}
            className="w-10 h-10 rounded-full bg-zinc-900/30 border border-white/10 flex items-center justify-center hover:border-white/20 hover:text-white text-white/60 transition-all duration-300"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch min-h-[400px]">
        {/* Gallery Visualizer Panel */}
        <div className={`md:col-span-7 bg-gradient-to-br ${currentItem.color} border border-white/10 rounded-xl p-6 flex flex-col justify-between relative overflow-hidden`}>
          {/* Blueprint markings for tech aesthetic */}
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff03_1px,transparent_1px)] [background-size:16px_16px]" />
          
          <div className="flex justify-between items-center z-10">
            <span className="text-[9px] font-mono text-white/40 uppercase tracking-widest">
              SYSTEM INTEGRATOR GRAPHICS
            </span>
            <span className="text-[9px] font-mono text-white/60 uppercase tracking-widest font-semibold">
              {currentItem.blueprintSymbol}
            </span>
          </div>

          {/* Centered Technical Abstract wireframes */}
          <div className="w-full h-44 flex items-center justify-center my-6 z-10">
            <svg className="w-full h-full text-white/10 max-w-[280px]" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.75">
              <circle cx="50" cy="50" r="35" strokeDasharray="2 2" stroke="rgba(255,255,255,0.15)" />
              <circle cx="50" cy="50" r="20" stroke="rgba(255,255,255,0.2)" />
              <line x1="10" y1="50" x2="90" y2="50" stroke="rgba(255,255,255,0.1)" />
              <line x1="50" y1="10" x2="50" y2="90" stroke="rgba(255,255,255,0.1)" />
              <rect x="25" y="25" width="50" height="50" strokeDasharray="4 4" stroke="rgba(255,255,255,0.15)" />
              <circle cx="50" cy="50" r="2" fill="currentColor" />
              {/* Rotating radar swept light */}
              <circle cx="50" cy="50" r="40" className="animate-[pulse_3s_infinite]" stroke="rgba(255,255,255,0.05)" />
            </svg>
          </div>

          <div className="flex justify-between items-center z-10 pt-4 border-t border-white/10">
            <div className="flex gap-1.5 items-center text-[10px] font-mono text-white/40 uppercase">
              <Info className="w-3.5 h-3.5" />
              <span>Interactive visualizer ready</span>
            </div>
            <span className="text-[9px] font-mono text-white/40 uppercase">
              INDEX: 0{currentItem.id} // 04
            </span>
          </div>
        </div>

        {/* Gallery Text Content Panel */}
        <div className="md:col-span-5 flex flex-col justify-between py-2 text-left">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <span className="text-white/40 font-mono text-[10px] tracking-widest uppercase block">
                {currentItem.category}
              </span>
              <h3 className="text-2xl font-semibold text-white tracking-tight uppercase">
                {currentItem.title}
              </h3>
              <p className="text-white/60 text-sm font-light leading-relaxed">
                {currentItem.description}
              </p>
              
              <div className="h-[1px] bg-white/10 my-6" />

              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-zinc-900/20 border border-white/10 rounded-xl">
                  <div className="text-[9px] font-mono text-white/40 uppercase">SYSTEM STATUS</div>
                  <div className="text-xs font-mono text-white/80 mt-1 uppercase">100% OPERATIONAL</div>
                </div>
                <div className="p-3 bg-zinc-900/20 border border-white/10 rounded-xl">
                  <div className="text-[9px] font-mono text-white/40 uppercase">CALIBRATION</div>
                  <div className="text-xs font-mono text-white/80 mt-1 uppercase">FACTORY OK</div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Thumbnail track indicator */}
          <div className="flex gap-2.5 mt-8">
            {galleryItems.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-1 rounded-full transition-all duration-300 ${
                  currentIndex === idx ? 'w-10 bg-white' : 'w-4 bg-white/10 hover:bg-white/20'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
