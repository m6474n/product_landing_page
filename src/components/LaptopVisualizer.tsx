import { useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Cpu, 
  Wind, 
  Layers, 
  Gauge, 
  Battery, 
  Maximize2, 
  Zap, 
  HardDrive,
  CheckCircle2
} from 'lucide-react';

interface LaptopVisualizerProps {
  progress: number; // 0 to 1
  activeSection: string;
}

export default function LaptopVisualizer({ progress, activeSection }: LaptopVisualizerProps) {
  // Smoothly interpolate the camera rotation and translation based on progress
  // progress goes from 0 to 1. We define segments.
  const cameraStyle = useMemo(() => {
    let rx = 55;   // rotateX
    let ry = 0;    // rotateY
    let rz = -25;  // rotateZ
    let tz = 0;    // translateZ
    let ty = 0;    // translateY
    let scale = 1;

    if (progress < 0.1) {
      // Phase 0: Hero Closed (mostly flat or subtle tilt)
      const t = progress / 0.1;
      rx = 25 - t * 5;
      ry = 0;
      rz = -5 + t * 5;
      scale = 0.85 + t * 0.1;
    } else if (progress < 0.2) {
      // Phase 1: Opening
      const t = (progress - 0.1) / 0.1;
      rx = 20 + t * 30;
      ry = 0;
      rz = 0 - t * 20;
      scale = 0.95 + t * 0.05;
    } else if (progress < 0.5) {
      // Phase 2: Isometric Exploded view (Cooling & Performance)
      const t = (progress - 0.2) / 0.3;
      rx = 50 + t * 10;
      ry = 0;
      rz = -20 - t * 10;
      scale = 1.0;
    } else if (progress < 0.8) {
      // Phase 3: Display & Internals Focus
      const t = (progress - 0.5) / 0.3;
      rx = 60 - t * 15;
      ry = 0;
      rz = -30 + t * 15;
      scale = 1.0 + t * 0.05;
    } else if (progress < 0.9) {
      // Phase 4: Ports Highlight (Sideways rotation!)
      const t = (progress - 0.8) / 0.1;
      rx = 45 - t * 25; // drop down to look from side
      ry = t * -55;     // rotate sideways
      rz = -15 + t * 15;
      ty = t * -20;
      tz = t * 100;
      scale = 1.05 + t * 0.15;
    } else {
      // Phase 5: Final Exploded Constellation
      const t = (progress - 0.9) / 0.1;
      rx = 20 + t * 25;
      ry = -55 + t * 55;
      rz = 0 - t * 25;
      ty = -20 + t * 20;
      tz = 100 - t * 100;
      scale = 1.2 - t * 0.15;
    }

    return {
      transform: `perspective(1600px) rotateX(${rx}deg) rotateY(${ry}deg) rotateZ(${rz}deg) translateZ(${tz}px) translateY(${ty}px) scale(${scale})`,
      transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
    };
  }, [progress]);

  // Determine explosion offsets based on scroll progress
  // Some layers go up (positive Y/Z), some go down (negative Y/Z)
  const layerOffsets = useMemo(() => {
    // 0 is assembled, 1 is fully exploded
    // We start exploding around progress = 0.25 (after engineering starts)
    const explodeFactor = progress < 0.2 ? 0 : Math.min(1, (progress - 0.2) / 0.75);

    return {
      screenBack: explodeFactor * 240,
      screenBacklight: explodeFactor * 200,
      screenLCD: explodeFactor * 160,
      screenBezel: explodeFactor * 120,
      
      cooling: explodeFactor * 40,
      motherboard: explodeFactor * -10,
      chips: explodeFactor * 15, // fly off board
      battery: explodeFactor * -80,
      bottomCase: explodeFactor * -150,
    };
  }, [progress]);

  // Lid Opening angle (0 = closed, 110 = open)
  const lidAngle = useMemo(() => {
    if (progress < 0.1) return 0; // closed
    if (progress < 0.25) {
      const t = (progress - 0.1) / 0.15;
      return t * 115; // smooth open
    }
    return 115; // stays open during exploded views
  }, [progress]);

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 bg-radial-[circle_at_center,_var(--tw-gradient-stops)] from-zinc-900/40 via-black to-black -z-10" />
      
      {/* Ambient glowing orbs behind laptop */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-sky-500/10 rounded-full blur-[120px] pointer-events-none transition-opacity duration-1000"
        style={{ opacity: activeSection === 'cooling' || activeSection === 'performance' ? 0.7 : 0.2 }}
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-purple-500/10 rounded-full blur-[140px] pointer-events-none transition-opacity duration-1000"
        style={{ opacity: activeSection === 'battery' || activeSection === 'display' ? 0.6 : 0.15 }}
      />

      {/* 3D Stage */}
      <div 
        className="relative w-[500px] h-[350px] flex items-center justify-center transition-all duration-300"
        style={cameraStyle}
      >
        {/* ==================== 1. DISPLAY CONSTELLATION (LID ASSEMBLY) ==================== */}
        <div 
          className="absolute inset-0 origin-bottom transition-transform duration-300"
          style={{
            transform: `translateY(-90px) rotateX(${-lidAngle}deg)`,
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Layer 1.1: Screen Back Cover (Metal Case) */}
          <div 
            className="absolute inset-0 w-full h-full rounded-t-2xl bg-zinc-800 border border-zinc-700/50 shadow-2xl flex flex-col items-center justify-center transition-transform duration-300"
            style={{
              transform: `translateZ(${layerOffsets.screenBack}px)`,
              backfaceVisibility: 'hidden',
              boxShadow: '0 25px 50px -12px rgba(0,0,0,0.8)',
            }}
          >
            {/* HP Logo */}
            <div className="w-16 h-16 rounded-full border border-zinc-600 flex items-center justify-center bg-zinc-900">
              <span className="font-sans font-bold text-zinc-300 tracking-widest text-lg">hp</span>
            </div>
            <div className="absolute top-4 left-1/2 -translate-x-1/2 text-[8px] font-mono text-zinc-500 uppercase tracking-widest">
              ZBOOK FIREFLY G7 • CHASSIS AL-102
            </div>
            
            {/* CNC Edge Bevel Accent */}
            <div className="absolute inset-1 rounded-t-xl border border-zinc-700/30 pointer-events-none" />
          </div>

          {/* Layer 1.2: Screen Backlight LED Panel */}
          <div 
            className="absolute inset-0 w-full h-full rounded-t-xl bg-zinc-950/90 border border-zinc-800 flex flex-col items-center justify-center transition-transform duration-300"
            style={{
              transform: `translateZ(${layerOffsets.screenBacklight}px)`,
              opacity: progress > 0.2 ? 0.85 : 0,
            }}
          >
            <div className="absolute inset-2 bg-sky-500/10 rounded border border-sky-500/30 flex flex-col items-center justify-center p-4">
              <Layers className="w-8 h-8 text-sky-400 mb-1 animate-pulse" />
              <div className="text-[10px] font-mono text-sky-400 uppercase tracking-widest">WLED BACKLIGHT</div>
              <div className="text-[8px] font-mono text-zinc-500 mt-1">400 NITS • EDP INTERFACE</div>
            </div>
          </div>

          {/* Layer 1.3: LCD Panel with active display content */}
          <div 
            className="absolute inset-0 w-full h-full rounded-t-xl bg-black border border-zinc-900 overflow-hidden transition-transform duration-300 shadow-xl"
            style={{
              transform: `translateZ(${layerOffsets.screenLCD}px)`,
            }}
          >
            {/* Laptop Screen Content (Glowing wallpaper) */}
            <div className="relative w-full h-full bg-zinc-950 flex flex-col items-center justify-between p-4">
              {/* Wallpaper pattern */}
              <div className="absolute inset-0 bg-gradient-to-tr from-sky-900/30 via-purple-950/20 to-zinc-950" />
              <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-20" />
              
              {/* Wallpaper glowing wave */}
              <div className="absolute top-1/4 left-1/4 right-1/4 bottom-1/4 bg-radial-gradient from-blue-500/20 to-transparent blur-3xl rounded-full" />

              {/* Top Bezel Details */}
              <div className="w-full flex justify-between items-center z-10">
                <div className="text-[8px] font-mono text-zinc-500">SECURE_BOOT</div>
                {/* Web Camera */}
                <div className="flex gap-1 items-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-zinc-900 flex items-center justify-center">
                    <div className="w-0.5 h-0.5 rounded-full bg-blue-500" />
                  </div>
                  <div className="w-1 h-1 rounded-full bg-amber-500/30" />
                </div>
                <div className="text-[8px] font-mono text-zinc-500">HP SURE VIEW</div>
              </div>

              {/* Dynamic Dashboard UI on Screen */}
              <div className="w-full z-10 flex flex-col items-center justify-center flex-1">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center"
                >
                  <h3 className="text-zinc-200 text-sm font-sans font-semibold tracking-wider">ZBOOK FIREFLY</h3>
                  <div className="text-[9px] font-mono text-zinc-400 mt-1 flex items-center justify-center gap-2">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    SYSTEM_STABLE // 100%
                  </div>
                </motion.div>

                {/* Dashboard Metrics */}
                <div className="w-full grid grid-cols-3 gap-2 mt-4 max-w-[320px]">
                  <div className="bg-zinc-900/80 border border-zinc-800 rounded p-1.5 text-center">
                    <div className="text-[8px] font-mono text-zinc-500 uppercase">CPU TEMP</div>
                    <div className="text-xs font-mono font-medium text-sky-400">42°C</div>
                  </div>
                  <div className="bg-zinc-900/80 border border-zinc-800 rounded p-1.5 text-center">
                    <div className="text-[8px] font-mono text-zinc-500 uppercase">GPU CLOCK</div>
                    <div className="text-xs font-mono font-medium text-purple-400">1.8 GHz</div>
                  </div>
                  <div className="bg-zinc-900/80 border border-zinc-800 rounded p-1.5 text-center">
                    <div className="text-[8px] font-mono text-zinc-500 uppercase">RAM IN USE</div>
                    <div className="text-xs font-mono font-medium text-emerald-400">32%</div>
                  </div>
                </div>
              </div>

              {/* Bottom Bezel logo area */}
              <div className="w-full flex justify-between items-center z-10">
                <span className="text-[9px] font-semibold text-zinc-400 tracking-wider">HP ZBOOK</span>
                <span className="text-[7px] font-mono text-zinc-600">DreamColor Display Tech</span>
              </div>
            </div>
          </div>

          {/* Layer 1.4: Screen Front Bezel and Glass Cover */}
          <div 
            className="absolute inset-0 w-full h-full rounded-t-xl border-4 border-zinc-900 bg-transparent flex flex-col items-center justify-center transition-transform duration-300 pointer-events-none"
            style={{
              transform: `translateZ(${layerOffsets.screenBezel}px)`,
              boxShadow: 'inset 0 0 10px rgba(0,0,0,0.8)',
            }}
          >
            {/* Front Glass High Gloss Highlight */}
            <div className="absolute top-0 left-0 w-full h-[150%] bg-gradient-to-tr from-transparent via-white/5 to-white/10 rotate-45 transform -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* ==================== 2. MAIN CHASSIS CONSTELLATION ==================== */}
        {/* Layer 2.1: Key Deck (Upper Aluminum C-Chassis) */}
        <div 
          className="absolute inset-0 w-full h-[320px] rounded-2xl bg-zinc-800 border border-zinc-700 shadow-2xl transition-transform duration-300"
          style={{
            transform: `translateY(40px) translateZ(0px)`,
            transformStyle: 'preserve-3d',
            boxShadow: '0 30px 60px rgba(0,0,0,0.8)',
          }}
        >
          {/* CNC Aluminum Details */}
          <div className="absolute inset-1 rounded-xl border border-zinc-700/50 pointer-events-none" />

          {/* Keyboard Recess area */}
          <div className="absolute top-4 left-4 right-4 h-[160px] bg-zinc-900/90 rounded-lg border border-zinc-950 shadow-inner p-2 flex flex-col gap-1 justify-between">
            {/* Mocking detailed premium keyboard grid layout */}
            {Array.from({ length: 5 }).map((_, rIdx) => (
              <div key={rIdx} className="w-full flex gap-1 justify-between">
                {Array.from({ length: 14 }).map((_, kIdx) => {
                  let keyWidth = 'flex-1';
                  // customize key caps to look ultra realistic
                  if (rIdx === 0) keyWidth = 'flex-1 h-2';
                  if (rIdx === 4 && kIdx === 5) keyWidth = 'w-[120px]'; // space bar
                  return (
                    <div 
                      key={kIdx} 
                      className={`${keyWidth} bg-zinc-800 border-b border-zinc-950 rounded-xs shadow-md text-[4px] font-mono flex items-center justify-center text-zinc-600`}
                      style={{
                        boxShadow: '0 1px 1px rgba(0,0,0,0.5)',
                        borderTop: '1px solid rgba(255,255,255,0.05)'
                      }}
                    >
                      {/* Keyboard Backlighting Glow */}
                      <div className="absolute inset-0 rounded-xs bg-sky-500/10 pointer-events-none" />
                    </div>
                  );
                })}
              </div>
            ))}
          </div>

          {/* Touchpad / Trackpad */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[110px] h-[70px] bg-zinc-850 border border-zinc-750 rounded shadow-inner flex flex-col items-center justify-between p-1">
            <div className="w-full h-[1px] bg-zinc-750/30" />
            <div className="text-[6px] font-mono text-zinc-500">Precision Touchpad</div>
          </div>

          {/* Speaker Grilles */}
          <div className="absolute top-[175px] left-6 right-6 h-1 flex justify-between gap-1">
            <div className="w-[80px] h-full bg-[radial-gradient(ellipse_at_center,_#27272a_1px,_transparent_1px)] [background-size:3px_3px] opacity-60" />
            <div className="w-[80px] h-full bg-[radial-gradient(ellipse_at_center,_#27272a_1px,_transparent_1px)] [background-size:3px_3px] opacity-60" />
          </div>

          {/* ZBook Logo Inscription */}
          <div className="absolute bottom-4 left-6 text-[8px] font-sans font-bold text-zinc-500 tracking-wider">
            ZBOOK
          </div>

          {/* Bang & Olufsen inscription */}
          <div className="absolute bottom-4 right-6 text-[6px] font-mono text-zinc-500 tracking-wider uppercase">
            sound by bang & olufsen
          </div>

          {/* CNC Chamfer Side Highlights for Ports */}
          <div className="absolute -left-1 top-12 w-1.5 h-[150px] bg-zinc-900 rounded-r border-r border-zinc-700 flex flex-col justify-around py-2 pl-0.5">
            {/* Side Port cuts */}
            <div className="w-1 h-3 bg-zinc-950 rounded-xs" /> {/* USB */}
            <div className="w-1 h-2 bg-zinc-950 rounded-xs" /> {/* Audio */}
          </div>
          <div className="absolute -right-1 top-12 w-1.5 h-[150px] bg-zinc-900 rounded-l border-l border-zinc-700 flex flex-col justify-around py-2 pr-0.5">
            {/* Side Port cuts right */}
            <div className="w-1 h-4 bg-zinc-950 rounded-xs" /> {/* HDMI */}
            <div className="w-1 h-3 bg-zinc-950 rounded-xs" /> {/* USB-C */}
            <div className="w-1 h-3 bg-zinc-950 rounded-xs" /> {/* USB-C */}
          </div>
        </div>

        {/* ==================== 3. INTERNAL COMPONENTS CONSTELLATION ==================== */}
        {/* Layer 3.2: Dual Fans & Heatpipes (Cooling Assembly) */}
        <div 
          className="absolute inset-0 w-full h-[320px] pointer-events-none transition-all duration-300"
          style={{
            transform: `translateY(40px) translateZ(${layerOffsets.cooling}px)`,
            transformStyle: 'preserve-3d',
            opacity: progress > 0.25 ? 1 : 0,
          }}
        >
          {/* Copper Heat Pipes */}
          <div className="absolute top-12 left-16 right-16 h-4 bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 rounded-full border border-amber-700/60 shadow-lg flex items-center justify-around z-20">
            <div className="text-[6px] font-mono text-zinc-950 font-bold uppercase tracking-widest">LIQUID COPPER HEAT PIPE</div>
            <div className="text-[6px] font-mono text-zinc-950 font-bold uppercase tracking-widest">HP ACTIVESHIELD</div>
          </div>

          {/* Cooling Fan Left */}
          <div className="absolute top-6 left-10 w-[70px] h-[70px] rounded-full bg-zinc-900/90 border-2 border-zinc-800 flex items-center justify-center shadow-2xl z-10">
            <div className="absolute inset-1 rounded-full border border-zinc-750" />
            {/* Fan Blades rotating SVG */}
            <svg className="w-12 h-12 text-zinc-700 animate-[spin_4s_linear_infinite]" viewBox="0 0 100 100">
              {Array.from({ length: 15 }).map((_, i) => (
                <path 
                  key={i} 
                  d="M50,50 L55,10 A5,5 0 0,1 65,12 L50,50 Z" 
                  fill="currentColor" 
                  transform={`rotate(${i * (360 / 15)} 50 50)`} 
                />
              ))}
              <circle cx="50" cy="50" r="10" fill="#18181b" />
            </svg>
            <div className="absolute bottom-1 text-[5px] font-mono text-sky-400">PWM FAN_1</div>
          </div>

          {/* Cooling Fan Right */}
          <div className="absolute top-6 right-10 w-[70px] h-[70px] rounded-full bg-zinc-900/90 border-2 border-zinc-800 flex items-center justify-center shadow-2xl z-10">
            <div className="absolute inset-1 rounded-full border border-zinc-750" />
            {/* Fan Blades rotating SVG */}
            <svg className="w-12 h-12 text-zinc-700 animate-[spin_3s_linear_infinite]" viewBox="0 0 100 100">
              {Array.from({ length: 15 }).map((_, i) => (
                <path 
                  key={i} 
                  d="M50,50 L55,10 A5,5 0 0,1 65,12 L50,50 Z" 
                  fill="currentColor" 
                  transform={`rotate(${i * (360 / 15)} 50 50)`} 
                />
              ))}
              <circle cx="50" cy="50" r="10" fill="#18181b" />
            </svg>
            <div className="absolute bottom-1 text-[5px] font-mono text-sky-400">PWM FAN_2</div>
          </div>

          {/* Airflow Wind Vectors overlay (cool wind particles) */}
          {activeSection === 'cooling' && (
            <div className="absolute top-10 left-8 right-8 h-12 pointer-events-none flex justify-between px-6">
              <div className="w-12 h-12 bg-[radial-gradient(circle,_rgba(56,189,248,0.2)_0%,_transparent_70%)] animate-ping" />
              <div className="w-12 h-12 bg-[radial-gradient(circle,_rgba(56,189,248,0.2)_0%,_transparent_70%)] animate-ping delay-300" />
            </div>
          )}
        </div>

        {/* Layer 3.3: Motherboard & Chips (CPU, GPU, RAM, SSD) */}
        <div 
          className="absolute inset-0 w-full h-[320px] pointer-events-none transition-all duration-300"
          style={{
            transform: `translateY(40px) translateZ(${layerOffsets.motherboard}px)`,
            transformStyle: 'preserve-3d',
            opacity: progress > 0.3 ? 1 : 0,
          }}
        >
          {/* Main PCB Board (Dark Technical Green/Black) */}
          <svg className="absolute top-4 left-6 right-6 bottom-4 w-[452px] h-[288px]" viewBox="0 0 452 288" fill="none">
            {/* Custom shaped PCB motherboard outline */}
            <path 
              d="M 10 40 L 100 40 L 100 10 L 350 10 L 350 40 L 442 40 L 442 160 L 400 160 L 400 240 L 52 240 L 52 160 L 10 160 Z" 
              fill="#09090b" 
              stroke="#27272a" 
              strokeWidth="2" 
            />
            {/* Circuit traces drawing */}
            <path d="M 50 80 L 150 80 M 150 80 L 180 110 M 200 40 L 200 120" stroke="#14b8a6" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
            <path d="M 300 80 L 250 80 M 250 80 L 220 110 M 280 40 L 280 120" stroke="#a855f7" strokeWidth="1" strokeDasharray="4 2" opacity="0.4" />
          </svg>

          {/* CPU chip core (with hovering heat spreader/die) */}
          <div 
            className="absolute top-16 left-[160px] w-14 h-14 bg-zinc-900 border border-zinc-750 flex flex-col items-center justify-center p-1 shadow-2xl transition-transform duration-300"
            style={{
              transform: `translateZ(${layerOffsets.chips}px)`,
              boxShadow: '0 10px 20px rgba(0,0,0,0.8)',
            }}
          >
            {/* Silicon Die highlight */}
            <div className="w-10 h-10 bg-radial-gradient from-amber-500/30 to-zinc-950 border border-amber-500/40 rounded flex flex-col items-center justify-center">
              <Cpu className="w-5 h-5 text-amber-500 animate-pulse" />
              <div className="text-[5px] font-mono text-zinc-300">Intel i7</div>
            </div>
            <div className="text-[5px] font-mono text-zinc-500 mt-1 uppercase">VPRO SECURE</div>
          </div>

          {/* Professional GPU Chip */}
          <div 
            className="absolute top-16 right-[160px] w-14 h-14 bg-zinc-900 border border-zinc-750 flex flex-col items-center justify-center p-1 shadow-2xl transition-transform duration-300"
            style={{
              transform: `translateZ(${layerOffsets.chips}px)`,
              boxShadow: '0 10px 20px rgba(0,0,0,0.8)',
            }}
          >
            {/* Nvidia/AMD style die */}
            <div className="w-10 h-10 bg-radial-gradient from-emerald-500/30 to-zinc-950 border border-emerald-500/40 rounded flex flex-col items-center justify-center">
              <Gauge className="w-5 h-5 text-emerald-400" />
              <div className="text-[5px] font-mono text-zinc-300">NVIDIA</div>
            </div>
            <div className="text-[5px] font-mono text-zinc-500 mt-1 uppercase">QUADRO T500</div>
          </div>

          {/* DDR4 Memory Modules (RAM Sticks popping out) */}
          <div 
            className="absolute top-[140px] left-[150px] w-14 h-8 bg-zinc-900 border border-emerald-500/30 rounded flex flex-col justify-between p-1 shadow-2xl transition-transform duration-500"
            style={{
              transform: `translateZ(${layerOffsets.chips * 1.5}px) rotateY(-5deg)`,
            }}
          >
            {/* Memory Chip modules */}
            <div className="w-full flex justify-between">
              <div className="w-2.5 h-3 bg-zinc-950 border border-zinc-850 rounded-xs" />
              <div className="w-2.5 h-3 bg-zinc-950 border border-zinc-850 rounded-xs" />
              <div className="w-2.5 h-3 bg-zinc-950 border border-zinc-850 rounded-xs" />
              <div className="w-2.5 h-3 bg-zinc-950 border border-zinc-850 rounded-xs" />
            </div>
            <div className="text-[5px] font-mono text-emerald-400 tracking-wide uppercase text-center">32GB DDR4</div>
          </div>

          <div 
            className="absolute top-[140px] left-[215px] w-14 h-8 bg-zinc-900 border border-emerald-500/30 rounded flex flex-col justify-between p-1 shadow-2xl transition-transform duration-500"
            style={{
              transform: `translateZ(${layerOffsets.chips * 1.5}px) rotateY(-5deg)`,
            }}
          >
            {/* Memory Chip modules stick 2 */}
            <div className="w-full flex justify-between">
              <div className="w-2.5 h-3 bg-zinc-950 border border-zinc-850 rounded-xs" />
              <div className="w-2.5 h-3 bg-zinc-950 border border-zinc-850 rounded-xs" />
              <div className="w-2.5 h-3 bg-zinc-950 border border-zinc-850 rounded-xs" />
              <div className="w-2.5 h-3 bg-zinc-950 border border-zinc-850 rounded-xs" />
            </div>
            <div className="text-[5px] font-mono text-emerald-400 tracking-wide uppercase text-center">DUAL-CHANNEL</div>
          </div>

          {/* NVMe M.2 SSD PCIe 4.0 Module (Lifting off) */}
          <div 
            className="absolute top-[140px] right-[130px] w-24 h-6 bg-zinc-900 border border-sky-500/30 rounded flex items-center justify-between px-1.5 shadow-2xl transition-transform duration-500"
            style={{
              transform: `translateZ(${layerOffsets.chips * 1.8}px) rotateZ(10deg)`,
            }}
          >
            <div className="w-4 h-4 rounded bg-sky-500/20 border border-sky-400/30 flex items-center justify-center">
              <HardDrive className="w-2.5 h-2.5 text-sky-400" />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-[5px] font-mono text-zinc-300 font-bold leading-none">NVME M.2 PCIe Gen4</span>
              <span className="text-[4px] font-mono text-zinc-500">2TB TURBO DRIVE</span>
            </div>
            <div className="w-4 h-full bg-amber-500/20 border-l border-zinc-800" />
          </div>
        </div>

        {/* Layer 3.4: Li-ion Polymer Battery Module */}
        <div 
          className="absolute bottom-6 left-12 right-12 h-[75px] bg-zinc-950/95 border border-zinc-850 rounded-lg p-2 flex gap-1.5 items-stretch transition-transform duration-300 shadow-xl"
          style={{
            transform: `translateY(40px) translateZ(${layerOffsets.battery}px)`,
            transformStyle: 'preserve-3d',
            opacity: progress > 0.35 ? 1 : 0,
            boxShadow: '0 20px 40px rgba(0,0,0,0.9)',
          }}
        >
          {/* Lithium Polymer Cells */}
          <div className="flex-1 bg-zinc-900 border border-zinc-800 rounded flex flex-col justify-between p-1">
            <div className="text-[5px] font-mono text-zinc-500">LI-ION CELL_1</div>
            <div className="h-1 bg-zinc-950 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 animate-[pulse_2s_infinite]" style={{ width: '85%' }} />
            </div>
          </div>
          <div className="flex-1 bg-zinc-900 border border-zinc-800 rounded flex flex-col justify-between p-1">
            <div className="text-[5px] font-mono text-zinc-500">LI-ION CELL_2</div>
            <div className="h-1 bg-zinc-950 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 animate-[pulse_2s_infinite]" style={{ width: '85%' }} />
            </div>
          </div>
          <div className="flex-1 bg-zinc-900 border border-zinc-800 rounded flex flex-col justify-between p-1">
            <div className="text-[5px] font-mono text-zinc-500">LI-ION CELL_3</div>
            <div className="h-1 bg-zinc-950 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 animate-[pulse_2s_infinite]" style={{ width: '85%' }} />
            </div>
          </div>

          {/* Controller Circuit board */}
          <div className="w-16 bg-zinc-900 border border-amber-500/20 rounded flex flex-col items-center justify-center p-1">
            <Zap className="w-4 h-4 text-amber-500 mb-0.5 animate-pulse" />
            <div className="text-[4px] font-mono text-amber-500 uppercase tracking-widest font-bold">53 Whr FastCharge</div>
          </div>
        </div>

        {/* ==================== 4. BOTTOM CHASSIS BASE CONSTELLATION ==================== */}
        {/* Layer 4.1: Aluminum Bottom Case cover */}
        <div 
          className="absolute inset-0 w-full h-[320px] rounded-2xl bg-zinc-850 border border-zinc-750 flex flex-col justify-between p-4 transition-transform duration-300 shadow-2xl"
          style={{
            transform: `translateY(40px) translateZ(${layerOffsets.bottomCase}px)`,
            boxShadow: '0 40px 80px rgba(0,0,0,0.95)',
          }}
        >
          {/* Air intakes grilles */}
          <div className="w-full h-10 bg-zinc-900/90 rounded-lg border border-zinc-900/40 p-1 flex items-center justify-center gap-1">
            <div className="flex-1 h-full bg-[linear-gradient(90deg,_#1f2937_1px,_transparent_1px)] bg-[size:4px_100%] opacity-40" />
            <div className="w-8 h-full bg-zinc-950 flex items-center justify-center rounded-sm">
              <span className="text-[4px] font-mono text-zinc-600">INTAKE_L</span>
            </div>
            <div className="flex-1 h-full bg-[linear-gradient(90deg,_#1f2937_1px,_transparent_1px)] bg-[size:4px_100%] opacity-40" />
            <div className="w-8 h-full bg-zinc-950 flex items-center justify-center rounded-sm">
              <span className="text-[4px] font-mono text-zinc-600">INTAKE_R</span>
            </div>
            <div className="flex-1 h-full bg-[linear-gradient(90deg,_#1f2937_1px,_transparent_1px)] bg-[size:4px_100%] opacity-40" />
          </div>

          {/* Rubber Support Feet */}
          <div className="absolute top-2 left-6 right-6 h-1 bg-zinc-950 rounded-full" />
          <div className="absolute bottom-2 left-6 right-6 h-1 bg-zinc-950 rounded-full" />

          {/* Regulatory Laser Engravings & Serial details */}
          <div className="w-full flex justify-between items-end mt-auto text-zinc-500 font-mono text-[5px] uppercase tracking-widest leading-normal pt-4">
            <div>
              <span>Regulatory Model: HSN-I37C</span>
              <br />
              <span>FCC ID: B94-HSNI37C • IC: 2878D-HSNI37C</span>
            </div>
            <div className="text-right">
              <span>DESIGNED IN HOUSTON, TX • MADE IN CHINA</span>
              <br />
              <span>ZBOOK® FIREFLY LAPTOP SERIES</span>
            </div>
          </div>
        </div>
      </div>

      {/* Dynamic Spec Stats overlay based on Section */}
      <AnimatePresence mode="wait">
        {activeSection && (
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-zinc-950/80 backdrop-blur-md border border-zinc-800 px-4 py-2 rounded-full flex items-center gap-4 text-xs font-mono text-zinc-300 z-50 shadow-2xl"
          >
            {activeSection === 'hero' && (
              <>
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
                <span>HP ZBook Firefly G7 Ready</span>
              </>
            )}
            {activeSection === 'precision' && (
              <>
                <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse" />
                <span>Ultra-light Chassis: CNC Aluminum</span>
              </>
            )}
            {activeSection === 'engineering' && (
              <>
                <span className="w-2 h-2 rounded-full bg-purple-500" />
                <span>Exploded View: Engineering Assembly</span>
              </>
            )}
            {activeSection === 'cooling' && (
              <>
                <span className="w-2 h-2 rounded-full bg-teal-400 animate-spin" />
                <span>Dual Active Fans & Liquid Heat Pipes Engaged</span>
              </>
            )}
            {activeSection === 'performance' && (
              <>
                <Cpu className="w-4 h-4 text-orange-400 animate-pulse" />
                <span>Intel Core i7-10810U • NVIDIA Quadro T500</span>
              </>
            )}
            {activeSection === 'memory' && (
              <>
                <Layers className="w-4 h-4 text-emerald-400" />
                <span>Up to 64GB DDR4 Memory • 2TB NVMe SSD</span>
              </>
            )}
            {activeSection === 'battery' && (
              <>
                <Battery className="w-4 h-4 text-emerald-400 animate-bounce" />
                <span>3-Cell 53 Whr Battery Active (FastCharge 0-50% in 30 mins)</span>
              </>
            )}
            {activeSection === 'display' && (
              <>
                <Maximize2 className="w-4 h-4 text-sky-400" />
                <span>14" UHD DreamColor HDR Display Active</span>
              </>
            )}
            {activeSection === 'ports' && (
              <>
                <Zap className="w-4 h-4 text-amber-500" />
                <span>Thunderbolt™ 3 + USB-A + HDMI 2.0</span>
              </>
            )}
            {activeSection === 'final' && (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Configuration Complete</span>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
