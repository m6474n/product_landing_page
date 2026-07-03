import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'motion/react';
import {
  Cpu,
  Layers,
  Wind,
  Zap,
  Maximize2,
  Compass,
  ChevronDown,
  Download,
  CheckCircle2,
  HardDrive
} from 'lucide-react';
import LaptopVisualizer from './LaptopVisualizer';
import { SectionId } from '../types';

gsap.registerPlugin(ScrollTrigger);

export default function ScrollSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState<SectionId>('hero');
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);

  // Set up GSAP ScrollTrigger
  useEffect(() => {
    const trigger = triggerRef.current;
    const container = containerRef.current;
    const video = videoRef.current;

    if (!trigger || !container || !video) return;

    let scrollTween: gsap.core.Tween | null = null;

    const initScrollTrigger = () => {
      if (!video.duration) return;

      const playhead = { frame: 0 };

      // Create a smooth GSAP tween that binds to scroll progress
      scrollTween = gsap.to(playhead, {
        frame: video.duration,
        ease: 'none',
        scrollTrigger: {
          trigger: trigger,
          start: 'top top',
          end: '+=6000',
          pin: container,
          scrub: 1.2, // Smooth seeking interpolation (adjust for more/less inertia)
          onUpdate: (self) => {
            const progress = self.progress;
            setScrollProgress(progress);

            // Map scroll progress to the 10 Sections
            if (progress < 0.1) {
              setActiveSection('hero');
            } else if (progress < 0.2) {
              setActiveSection('precision');
            } else if (progress < 0.32) {
              setActiveSection('engineering');
            } else if (progress < 0.44) {
              setActiveSection('cooling');
            } else if (progress < 0.56) {
              setActiveSection('performance');
            } else if (progress < 0.68) {
              setActiveSection('memory');
            } else if (progress < 0.8) {
              setActiveSection('battery');
            } else if (progress < 0.88) {
              setActiveSection('display');
            } else if (progress < 0.95) {
              setActiveSection('ports');
            } else {
              setActiveSection('final');
            }
          },
        },
        onUpdate: () => {
          // Throttle/update video currentTime smoothly
          if (video && video.readyState >= 2) {
            video.currentTime = playhead.frame;
          }
        }
      });
    };

    if (video.readyState >= 1) {
      initScrollTrigger();
    } else {
      video.addEventListener('loadedmetadata', initScrollTrigger);
    }

    return () => {
      if (video) {
        video.removeEventListener('loadedmetadata', initScrollTrigger);
      }
      if (scrollTween) {
        if (scrollTween.scrollTrigger) {
          scrollTween.scrollTrigger.kill();
        }
        scrollTween.kill();
      }
    };
  }, [videoLoaded]);

  // Set up video handlers
  const handleVideoLoaded = () => {
    setVideoLoaded(true);
    setVideoError(false);
  };

  const handleVideoError = () => {
    setVideoError(true);
    setVideoLoaded(false);
  };

  // Battery percentage animation helper
  const batteryPct = Math.min(100, Math.max(0, Math.round((1 - scrollProgress) * 100)));

  return (
    <div ref={triggerRef} className="relative w-full h-[6800px] bg-[#050505]">
      {/* Pinned Content Viewport */}
      <div
        ref={containerRef}
        className="sticky top-0 left-0 w-full h-screen overflow-hidden flex flex-col items-center justify-center bg-[#050505] text-white select-none"
      >
        {/* Background Layer: absolute black and radial ambient glow */}
        <div className="absolute inset-0 bg-[#050505] -z-30" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,_rgba(60,60,60,0.25)_0%,_transparent_70%)] -z-25" />

        {/* Subtle Tech Blueprint grid lines */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.012)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.012)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none opacity-30 -z-20" />

        {/* Cinematic Video Element */}
        <video
          ref={videoRef}
          src="/videos/hp-zbook-firefly-scroll.mp4"
          muted
          playsInline
          preload="auto"
          onLoadedMetadata={handleVideoLoaded}
          onError={handleVideoError}
          className="absolute inset-0 w-full h-full object-cover opacity-100 pointer-events-none -z-10"
        />

        {/* Interactive 3D Laptop Component Container */}
        {/* <div className="absolute inset-0 w-full h-full flex items-center justify-center z-10">
          <LaptopVisualizer progress={scrollProgress} activeSection={activeSection} />
        </div> */}

        {/* Decorative Compass Grid Anchor for Industrial Blueprint Vibe */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] border border-white/5 rounded-full flex items-center justify-center pointer-events-none -z-20">
          <div className="w-[500px] h-[500px] border border-dashed border-white/5 rounded-full" />
          <div className="w-[300px] h-[300px] border border-white/5 rounded-full" />
        </div>

        {/* Dynamic Storytelling Text Overlay - Positioned with safe zones */}
        <div className="absolute inset-0 w-full h-full z-20 pointer-events-none flex flex-col justify-between p-8 md:p-16">
          {/* Top Info Tag */}
          <div className="flex justify-between items-center w-full">
            <div className="flex gap-4 items-center">
              <span className="text-[9px] font-mono tracking-[0.2em] text-white/40 uppercase">HP WORKSTATION DESIGN LAB</span>
              <span className="h-4 w-[1px] bg-white/10" />
              <span className="text-[9px] font-mono tracking-[0.2em] text-white/60 uppercase">ZBOOK FIREFLY G7</span>
            </div>
            <div className="hidden sm:flex gap-3 items-center">
              <div className="text-[9px] font-mono text-white/40 uppercase tracking-[0.1em]">CHASSIS FLIGHT: {Math.round(scrollProgress * 100)}%</div>
              <div className="w-16 h-1 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-white/40 transition-all duration-300" style={{ width: `${scrollProgress * 100}%` }} />
              </div>
            </div>
          </div>

          {/* Central Animated Content Blocks */}
          <div className="w-full flex-1 flex flex-col md:flex-row justify-between items-center pointer-events-auto relative mt-16">

            {/* Left Content Column */}
            <div className="w-full md:w-[420px] shrink-0 text-left self-start md:self-center z-30">
              <AnimatePresence mode="wait">
                {activeSection === 'hero' && (
                  <motion.div
                    key="hero"
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 30 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <span className="text-white/40 font-mono text-[10px] uppercase tracking-[0.2em] mb-3 block">Now Available</span>
                    <h1 className="text-5xl md:text-7xl font-sans font-extrabold tracking-tighter leading-[0.9] text-white mb-4">
                      HP ZBOOK <br />
                      <span className="bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent">FIREFLY G7</span>
                    </h1>
                    <p className="text-white/60 text-sm font-sans font-light leading-relaxed tracking-wide mb-8">
                      Professional Performance. <br />
                      Ultra-Light Mobility. Engineered to master demanding creative workflows anywhere.
                    </p>
                    <div className="flex gap-4">
                      <a href="#purchase" className="px-5 py-2 border border-white/20 rounded-full text-[10px] uppercase tracking-widest text-white hover:bg-white hover:text-black transition-colors duration-300">
                        Explore
                      </a>
                      <a href="#specifications" className="px-5 py-2 border border-white/10 rounded-full text-[10px] uppercase tracking-widest text-white/50 hover:border-white/20 hover:text-white transition-colors duration-300">
                        Specifications
                      </a>
                    </div>
                  </motion.div>
                )}

                {activeSection === 'precision' && (
                  <motion.div
                    key="precision"
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 30 }}
                    transition={{ duration: 0.5 }}
                  >
                    <span className="text-white/40 font-mono text-[10px] uppercase tracking-[0.2em] mb-3 block">01 / Material Architecture</span>
                    <h2 className="text-4xl font-sans font-bold tracking-tighter uppercase text-white mb-4 leading-none">
                      Precision <br />Chassis Design
                    </h2>
                    <p className="text-white/60 text-sm font-light leading-relaxed mb-6">
                      Sculpted from heavy-duty CNC machined aluminum, achieving an ultra-thin form factor that remains remarkably lightweight and rigid under pressure.
                    </p>
                    <div className="grid grid-cols-3 gap-4 border-t border-white/10 pt-6">
                      <div>
                        <div className="text-[10px] font-mono text-white/40 uppercase tracking-wider">Thickness</div>
                        <div className="text-lg font-sans font-bold text-white mt-1">17.9 mm</div>
                      </div>
                      <div>
                        <div className="text-[10px] font-mono text-white/40 uppercase tracking-wider">Weight</div>
                        <div className="text-lg font-sans font-bold text-white mt-1">1.34 kg</div>
                      </div>
                      <div>
                        <div className="text-[10px] font-mono text-white/40 uppercase tracking-wider">Finish</div>
                        <div className="text-lg font-sans font-bold text-white mt-1">Aluminum</div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeSection === 'engineering' && (
                  <motion.div
                    key="engineering"
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 30 }}
                    transition={{ duration: 0.5 }}
                  >
                    <span className="text-white/40 font-mono text-[10px] uppercase tracking-[0.2em] mb-3 block">02 / Structural Integrity</span>
                    <h2 className="text-4xl font-sans font-bold tracking-tighter uppercase text-white mb-4 leading-none">
                      Engineered <br />To Explode
                    </h2>
                    <p className="text-white/60 text-sm font-light leading-relaxed mb-6">
                      Observe how every screw, spacer, and hinge aligns symmetrically. Precision-machined hinges provide dual-rotation stability for the display.
                    </p>
                    <div className="flex flex-col gap-3">
                      <div className="flex gap-3 items-center text-xs font-mono text-white/80">
                        <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
                        <span>High-Torque Friction Hinges</span>
                      </div>
                      <div className="flex gap-3 items-center text-xs font-mono text-white/80">
                        <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
                        <span>Anti-Flex Aluminum Frame Reinforcements</span>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeSection === 'cooling' && (
                  <motion.div
                    key="cooling"
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 30 }}
                    transition={{ duration: 0.5 }}
                  >
                    <span className="text-white/40 font-mono text-[10px] uppercase tracking-[0.2em] mb-3 block">03 / Active Thermals</span>
                    <h2 className="text-4xl font-sans font-bold tracking-tighter uppercase text-white mb-4 leading-none">
                      Active <br />Cooling Grid
                    </h2>
                    <p className="text-white/60 text-sm font-light leading-relaxed mb-6">
                      Dual active PWM-controlled exhaust fans pair with custom-engineered composite copper heatpipes to dissipate heat instantly during intense loads.
                    </p>
                    <div className="flex items-center gap-4 bg-zinc-900/30 border border-white/10 rounded-2xl p-4">
                      <Wind className="w-8 h-8 text-white/80 shrink-0" />
                      <div>
                        <div className="text-[10px] font-mono text-white/40 uppercase tracking-wider">Cooling Power</div>
                        <div className="text-xs text-white/60 mt-1 font-mono">Dual active micro-turbines adjust dynamically via board temp arrays.</div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeSection === 'performance' && (
                  <motion.div
                    key="performance"
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 30 }}
                    transition={{ duration: 0.5 }}
                  >
                    <span className="text-white/40 font-mono text-[10px] uppercase tracking-[0.2em] mb-3 block">04 / Raw Core Computing</span>
                    <h2 className="text-4xl font-sans font-bold tracking-tighter uppercase text-white mb-4 leading-none">
                      Uncompromised <br />Performance
                    </h2>
                    <p className="text-white/60 text-sm font-light leading-relaxed mb-6">
                      Equipped with high-performance Intel® Core™ vPro processors and enterprise-grade discrete graphics for hardware acceleration.
                    </p>
                    <div className="space-y-3">
                      <div className="bg-zinc-900/30 border border-white/10 p-3 rounded-xl flex items-center gap-3">
                        <Cpu className="w-5 h-5 text-white/75" />
                        <div>
                          <div className="text-[9px] font-mono text-white/40 uppercase tracking-wider">PROCESSOR</div>
                          <div className="text-xs font-sans font-medium text-white">Intel® Core™ i7-10810U</div>
                        </div>
                      </div>
                      <div className="bg-zinc-900/30 border border-white/10 p-3 rounded-xl flex items-center gap-3">
                        <Compass className="w-5 h-5 text-white/75" />
                        <div>
                          <div className="text-[9px] font-mono text-white/40 uppercase tracking-wider">PROFESSIONAL GRAPHICS</div>
                          <div className="text-xs font-sans font-medium text-white">NVIDIA® Quadro® T500</div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeSection === 'memory' && (
                  <motion.div
                    key="memory"
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 30 }}
                    transition={{ duration: 0.5 }}
                  >
                    <span className="text-white/40 font-mono text-[10px] uppercase tracking-[0.2em] mb-3 block">05 / Storage & Channels</span>
                    <h2 className="text-4xl font-sans font-bold tracking-tighter uppercase text-white mb-4 leading-none">
                      Vast Memory <br />Ultra-Fast Drive
                    </h2>
                    <p className="text-white/60 text-sm font-light leading-relaxed mb-6">
                      Accelerate multi-threaded operations. High-speed dual-channel DDR4 memory acts alongside NVMe storage to run apps in real-time.
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-zinc-900/30 border border-white/10 p-3.5 rounded-2xl">
                        <Layers className="w-5 h-5 text-white/75 mb-2" />
                        <span className="text-[9px] font-mono text-white/40 uppercase tracking-wider">MEMORY</span>
                        <div className="text-sm font-bold text-white mt-1">Up to 64GB DDR4</div>
                      </div>
                      <div className="bg-zinc-900/30 border border-white/10 p-3.5 rounded-2xl">
                        <HardDrive className="w-5 h-5 text-white/75 mb-2" />
                        <span className="text-[9px] font-mono text-white/40 uppercase tracking-wider">DRIVE RATE</span>
                        <div className="text-sm font-bold text-white mt-1">2TB PCIe NVMe</div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeSection === 'battery' && (
                  <motion.div
                    key="battery"
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 30 }}
                    transition={{ duration: 0.5 }}
                  >
                    <span className="text-white/40 font-mono text-[10px] uppercase tracking-[0.2em] mb-3 block">06 / Energy Reservoir</span>
                    <h2 className="text-4xl font-sans font-bold tracking-tighter uppercase text-white mb-4 leading-none">
                      Long-Life <br />Energy Core
                    </h2>
                    <p className="text-white/60 text-sm font-light leading-relaxed mb-6">
                      An intelligent battery engine engineered for multi-hour production. Built-in FastCharge technology powers your laptop up rapidly.
                    </p>
                    <div className="flex gap-6 items-center border-t border-white/10 pt-6">
                      <div>
                        <div className="text-[9px] font-mono text-white/40 uppercase tracking-wider">CAPACITY</div>
                        <div className="text-3xl font-mono font-bold text-white mt-1">{batteryPct}%</div>
                      </div>
                      <div>
                        <div className="text-[9px] font-mono text-white/40 uppercase tracking-wider">FASTCHARGE RATE</div>
                        <div className="text-3xl font-mono font-bold text-white/80 mt-1">0-50% / 30m</div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeSection === 'display' && (
                  <motion.div
                    key="display"
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 30 }}
                    transition={{ duration: 0.5 }}
                  >
                    <span className="text-white/40 font-mono text-[10px] uppercase tracking-[0.2em] mb-3 block">07 / Optics & Glass</span>
                    <h2 className="text-4xl font-sans font-bold tracking-tighter uppercase text-white mb-4 leading-none">
                      DreamColor <br />UHD Display
                    </h2>
                    <p className="text-white/60 text-sm font-light leading-relaxed mb-6">
                      A gorgeous 4K display equipped with individual backing panels, factory color calibration profiles, and high-transmission filter glass.
                    </p>
                    <div className="grid grid-cols-2 gap-4 border-t border-white/10 pt-6">
                      <div>
                        <div className="text-[9px] font-mono text-white/40 uppercase tracking-wider">GAMUT ACCURACY</div>
                        <div className="text-base font-sans font-semibold text-white mt-1">100% DCI-P3</div>
                      </div>
                      <div>
                        <div className="text-[9px] font-mono text-white/40 uppercase tracking-wider">BRIGHTNESS</div>
                        <div className="text-base font-sans font-semibold text-white mt-1">400 Nits HDR</div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeSection === 'ports' && (
                  <motion.div
                    key="ports"
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 30 }}
                    transition={{ duration: 0.5 }}
                  >
                    <span className="text-white/40 font-mono text-[10px] uppercase tracking-[0.2em] mb-3 block">08 / Universal Ingress</span>
                    <h2 className="text-4xl font-sans font-bold tracking-tighter uppercase text-white mb-4 leading-none">
                      Elite <br />Connectivity
                    </h2>
                    <p className="text-white/60 text-sm font-light leading-relaxed mb-6">
                      High-speed I/O interfaces line both profiles of the workstation. Transfer data, charge devices, and display screens up to 8K effortlessly.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {['Thunderbolt 3', 'HDMI 2.0', 'USB 3.1', 'SmartCard', 'Audio Jack'].map((port) => (
                        <span key={port} className="px-3 py-1 bg-zinc-900/40 border border-white/10 rounded-full text-[10px] font-mono text-white/70">
                          {port}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                )}

                {activeSection === 'final' && (
                  <motion.div
                    key="final"
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 30 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <span className="text-white/40 font-mono text-[10px] uppercase tracking-[0.2em] mb-3 block">Complete Assembly</span>
                    <h2 className="text-5xl md:text-6xl font-sans font-extrabold tracking-tighter text-white mb-4 leading-none uppercase">
                      Engineered Without <br />
                      <span className="bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent">Compromise.</span>
                    </h2>
                    <p className="text-white/60 text-sm font-light leading-relaxed mb-8">
                      ZBook Firefly G7 redefines what's possible for developers, creative professionals, and researchers on the move.
                    </p>
                    <div className="flex gap-4">
                      <a href="#purchase" className="px-5 py-2 border border-white/20 rounded-full text-[10px] uppercase tracking-widest text-white hover:bg-white hover:text-black transition-colors duration-300">
                        Configure & Buy
                      </a>
                      <a href="#specifications" className="px-5 py-2 border border-white/10 rounded-full text-[10px] uppercase tracking-widest text-white/50 hover:border-white/20 hover:text-white transition-colors duration-300 flex items-center gap-2">
                        <Download className="w-3.5 h-3.5" />
                        Technical Sheet
                      </a>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Right Column: Interactive Vector Callouts pointing to Laptop components */}
            <div className="hidden md:flex flex-col gap-4 absolute right-0 w-[280px] text-right pointer-events-none z-30">
              <AnimatePresence mode="wait">
                {activeSection === 'engineering' && (
                  <motion.div
                    key="engineering-callouts"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    <div className="p-4 bg-black/60 backdrop-blur-md border-r border-white/20 rounded text-right">
                      <div className="text-[10px] font-mono text-white/40 uppercase tracking-widest">01 / DUAL HINGES</div>
                      <div className="text-xs text-white/60 font-sans mt-1">Allows 175° smooth rotation screen tilt.</div>
                    </div>
                    <div className="p-4 bg-black/60 backdrop-blur-md border-r border-white/20 rounded text-right">
                      <div className="text-[10px] font-mono text-white/40 uppercase tracking-widest">02 / SPACER MATRICES</div>
                      <div className="text-xs text-white/60 font-sans mt-1">Isolates component vibrations dynamically.</div>
                    </div>
                  </motion.div>
                )}

                {activeSection === 'cooling' && (
                  <motion.div
                    key="cooling-callouts"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    <div className="p-4 bg-black/60 backdrop-blur-md border-r border-white/20 rounded text-right">
                      <div className="text-[10px] font-mono text-white/40 uppercase tracking-widest">01 / JET DUAL FANS</div>
                      <div className="text-xs text-white/60 font-sans mt-1">Multi-vane fans accelerate dynamic airflow out.</div>
                    </div>
                    <div className="p-4 bg-black/60 backdrop-blur-md border-r border-white/20 rounded text-right">
                      <div className="text-[10px] font-mono text-white/40 uppercase tracking-widest">02 / COPPER HEATPIPES</div>
                      <div className="text-xs text-white/60 font-sans mt-1">Transports heat away from silicon cores instantly.</div>
                    </div>
                  </motion.div>
                )}

                {activeSection === 'performance' && (
                  <motion.div
                    key="performance-callouts"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    <div className="p-4 bg-black/60 backdrop-blur-md border-r border-white/20 rounded text-right">
                      <div className="text-[10px] font-mono text-white/40 uppercase tracking-widest">01 / CORE SILICON</div>
                      <div className="text-xs text-white/60 font-sans mt-1">Intel® Core™ Core processors run extreme thread arrays.</div>
                    </div>
                    <div className="p-4 bg-black/60 backdrop-blur-md border-r border-white/20 rounded text-right">
                      <div className="text-[10px] font-mono text-white/40 uppercase tracking-widest">02 / NVIDIA GPU</div>
                      <div className="text-xs text-white/60 font-sans mt-1">Accelerates rendering, CAD work, and vector workloads.</div>
                    </div>
                  </motion.div>
                )}

                {activeSection === 'display' && (
                  <motion.div
                    key="display-callouts"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    <div className="p-4 bg-black/60 backdrop-blur-md border-r border-white/20 rounded text-right">
                      <div className="text-[10px] font-mono text-white/40 uppercase tracking-widest">01 / UHD MATRIX</div>
                      <div className="text-xs text-white/60 font-sans mt-1">IPS technology provides 178° viewing angles.</div>
                    </div>
                    <div className="p-4 bg-black/60 backdrop-blur-md border-r border-white/20 rounded text-right">
                      <div className="text-[10px] font-mono text-white/40 uppercase tracking-widest">02 / DREAMCOLOR PANEL</div>
                      <div className="text-xs text-white/60 font-sans mt-1">Pre-calibrated RGB filters render perfect color spectra.</div>
                    </div>
                  </motion.div>
                )}

                {activeSection === 'ports' && (
                  <motion.div
                    key="ports-callouts"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    <div className="p-4 bg-black/60 backdrop-blur-md border-r border-white/20 rounded text-right">
                      <div className="text-[10px] font-mono text-white/40 uppercase tracking-widest">01 / THUNDERBOLT 3</div>
                      <div className="text-xs text-white/60 font-sans mt-1">Two ports transfer up to 40Gb/s per lane.</div>
                    </div>
                    <div className="p-4 bg-black/60 backdrop-blur-md border-r border-white/20 rounded text-right">
                      <div className="text-[10px] font-mono text-white/40 uppercase tracking-widest">02 / HDMI 2.0 PORT</div>
                      <div className="text-xs text-white/60 font-sans mt-1">Plugs directly into external 4K monitors and display panels.</div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Bottom Indicators */}
          <div className="flex justify-between items-center w-full mt-4">
            <span className="text-[9px] font-mono text-white/30 tracking-[0.2em] uppercase">
              SCROLL ENGINE // CALIBRATED V1.04
            </span>
            {activeSection !== 'final' && (
              <motion.div
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="flex items-center gap-1.5 text-[9px] font-mono text-white/50 uppercase tracking-[0.15em]"
              >
                <span>SCROLL TO UNVEIL TECHNOLOGY</span>
                <ChevronDown className="w-3.5 h-3.5 text-white/50" />
              </motion.div>
            )}
            <span className="text-[9px] font-mono text-white/30 tracking-[0.2em] uppercase">
              HP SECURE DEVICE INTEGRITY
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
