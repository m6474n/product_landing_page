import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Cpu, HardDrive, ShoppingCart, Check, Sliders, ShieldCheck, Truck, RotateCcw } from 'lucide-react';

interface Option {
  id: string;
  name: string;
  extraPrice: number;
}

export default function PurchaseConfigurator() {
  const [cpu, setCpu] = useState('i7-base');
  const [ram, setRam] = useState('32gb');
  const [storage, setStorage] = useState('1tb');
  const [screen, setScreen] = useState('fhd');
  const [isOrdered, setIsOrdered] = useState(false);
  const [ordering, setOrdering] = useState(false);

  const basePrice = 1499;

  const cpus: Option[] = [
    { id: 'i5', name: 'Intel® Core™ i5-10310U (vPro® Option)', extraPrice: 0 },
    { id: 'i7-base', name: 'Intel® Core™ i7-10510U (Up to 4.9 GHz)', extraPrice: 180 },
    { id: 'i7-pro', name: 'Intel® Core™ i7-10810U (6 Cores, vPro® Core)', extraPrice: 320 },
  ];

  const rams: Option[] = [
    { id: '16gb', name: '16 GB DDR4-3200 MHz SDRAM', extraPrice: 0 },
    { id: '32gb', name: '32 GB DDR4-3200 MHz (Dual Channel)', extraPrice: 150 },
    { id: '64gb', name: '64 GB DDR4-3200 MHz (Max Configuration)', extraPrice: 350 },
  ];

  const storages: Option[] = [
    { id: '512gb', name: '512 GB PCIe® NVMe™ M.2 SSD', extraPrice: 0 },
    { id: '1tb', name: '1 TB PCIe® NVMe™ M.2 SSD', extraPrice: 120 },
    { id: '2tb', name: '2 TB PCIe® NVMe™ M.2 SSD (Turbo Drive)', extraPrice: 280 },
  ];

  const screens: Option[] = [
    { id: 'fhd', name: '14" FHD IPS Anti-Glare Display (250 nits)', extraPrice: 0 },
    { id: 'fhd-bright', name: '14" FHD IPS Anti-Glare Display (400 nits, Low Power)', extraPrice: 90 },
    { id: 'uhd-dream', name: '14" UHD 4K IPS DreamColor Display (400 nits, HDR)', extraPrice: 260 },
  ];

  const finalPrice = useMemo(() => {
    const cpuExtra = cpus.find((c) => c.id === cpu)?.extraPrice || 0;
    const ramExtra = rams.find((r) => r.id === ram)?.extraPrice || 0;
    const storageExtra = storages.find((s) => s.id === storage)?.extraPrice || 0;
    const screenExtra = screens.find((s) => s.id === screen)?.extraPrice || 0;
    return basePrice + cpuExtra + ramExtra + storageExtra + screenExtra;
  }, [cpu, ram, storage, screen]);

  const handleOrder = () => {
    setOrdering(true);
    setTimeout(() => {
      setOrdering(false);
      setIsOrdered(true);
    }, 2000);
  };

  const handleReset = () => {
    setIsOrdered(false);
    setCpu('i7-base');
    setRam('32gb');
    setStorage('1tb');
    setScreen('fhd');
  };

  return (
    <div id="purchase" className="w-full bg-[#050505] border border-white/10 rounded-2xl p-8 max-w-5xl mx-auto shadow-2xl relative overflow-hidden my-16">
      <div className="absolute inset-0 bg-radial-[circle_at_bottom_right,_var(--tw-gradient-stops)] from-white/5 via-transparent to-transparent pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10">
        
        {/* Left Column: Visual summary and checkout pricing */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div>
            <div className="text-[10px] font-mono text-white/40 uppercase tracking-[0.2em] mb-2 flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-white/40" />
              <span>CUSTOM WORKSTATION CONFIGURATOR</span>
            </div>
            <h2 className="text-4xl font-semibold tracking-tighter text-white uppercase bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40 mb-4">Configure Your ZBook</h2>
            <p className="text-white/40 text-[10px] font-mono uppercase tracking-widest leading-relaxed mb-6">
              Tailor the performance components of your HP ZBook Firefly G7. Built-to-order models undergo strict hardware calibration before shipment.
            </p>

            <div className="space-y-3 bg-zinc-900/20 border border-white/10 p-4 rounded-xl mb-8">
              <div className="text-[10px] font-mono text-white/40 uppercase">Selected Configuration:</div>
              <div className="text-xs font-sans text-white/80 flex justify-between gap-4">
                <span className="text-white/40">CPU</span>
                <span className="font-medium text-right">{cpus.find((c) => c.id === cpu)?.name}</span>
              </div>
              <div className="text-xs font-sans text-white/80 flex justify-between gap-4">
                <span className="text-white/40">RAM</span>
                <span className="font-medium text-right">{rams.find((r) => r.id === ram)?.name}</span>
              </div>
              <div className="text-xs font-sans text-white/80 flex justify-between gap-4">
                <span className="text-white/40">Storage</span>
                <span className="font-medium text-right">{storages.find((s) => s.id === storage)?.name}</span>
              </div>
              <div className="text-xs font-sans text-white/80 flex justify-between gap-4">
                <span className="text-white/40">Display</span>
                <span className="font-medium text-right">{screens.find((s) => s.id === screen)?.name}</span>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 pt-6">
            <div className="flex justify-between items-end mb-6">
              <div>
                <span className="text-[10px] font-mono text-white/40 uppercase tracking-[0.15em]">ESTIMATED PRICE</span>
                <div className="text-4xl font-sans font-bold text-white mt-1">
                  ${finalPrice.toLocaleString()}
                </div>
              </div>
              <div className="text-right text-[10px] font-mono text-white/40 uppercase tracking-[0.1em]">
                <span>FREE EXPEDITED SHIPPING</span>
                <br />
                <span>3-YEAR BUSINESS WARRANTY</span>
              </div>
            </div>

            <AnimatePresence mode="wait">
              {isOrdered ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="w-full bg-zinc-900/20 border border-white/10 p-4 rounded-xl flex flex-col items-center gap-4 text-center"
                >
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                    <Check className="w-5 h-5 text-white/80" />
                  </div>
                  <div>
                    <h4 className="text-xs font-sans font-bold text-white uppercase tracking-wider">Order Placed Successfully</h4>
                    <p className="text-[11px] font-mono text-white/40 mt-1">Check your inbox for configuration summary & delivery timeline details.</p>
                  </div>
                  <button
                    onClick={handleReset}
                    className="mt-2 text-[10px] font-mono text-white/60 hover:text-white flex items-center gap-1 bg-[#050505] border border-white/10 px-4 py-1.5 rounded-full hover:border-white/20 transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    Configure New Unit
                  </button>
                </motion.div>
              ) : (
                <button
                  onClick={handleOrder}
                  disabled={ordering}
                  className="w-full py-4 border border-white/20 rounded-xl bg-white hover:bg-zinc-200 text-black font-sans font-bold tracking-[0.2em] uppercase transition-all duration-300 shadow-xl flex items-center justify-center gap-2.5 disabled:opacity-50 cursor-pointer text-xs"
                >
                  {ordering ? (
                    <>
                      <div className="w-4 h-4 rounded-full border-2 border-zinc-900 border-t-transparent animate-spin" />
                      <span>CONFIGURING CORE ENGINE...</span>
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-4 h-4" />
                      <span>PLACE COMPLETED ORDER</span>
                    </>
                  )}
                </button>
              )}
            </AnimatePresence>

            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-white/40" />
                <span className="text-[9px] font-mono text-white/40 uppercase">HP SureStart Sec. Bios</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-white/40" />
                <span className="text-[9px] font-mono text-white/40 uppercase">Est. Delivery: 3-5 days</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Selectors */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* CPU Selection */}
          <div>
            <span className="text-[10px] font-mono text-white/40 uppercase tracking-[0.2em] mb-3 block">01 / Choose Processor</span>
            <div className="grid grid-cols-1 gap-2">
              {cpus.map((option) => (
                <button
                  key={option.id}
                  onClick={() => setCpu(option.id)}
                  className={`flex justify-between items-center p-3.5 rounded-xl border text-left transition-all duration-300 cursor-pointer ${
                    cpu === option.id
                      ? 'bg-[#0d0d0d] border-white/35 text-white shadow-lg shadow-white/5'
                      : 'bg-transparent border-white/10 text-white/50 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Cpu className={`w-4 h-4 ${cpu === option.id ? 'text-white' : 'text-white/20'}`} />
                    <span className="text-xs font-sans font-medium">{option.name}</span>
                  </div>
                  <span className="text-xs font-mono font-bold">
                    {option.extraPrice === 0 ? 'Base' : `+$${option.extraPrice}`}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* RAM Selection */}
          <div>
            <span className="text-[10px] font-mono text-white/40 uppercase tracking-[0.2em] mb-3 block">02 / System Memory (RAM)</span>
            <div className="grid grid-cols-1 gap-2">
              {rams.map((option) => (
                <button
                  key={option.id}
                  onClick={() => setRam(option.id)}
                  className={`flex justify-between items-center p-3.5 rounded-xl border text-left transition-all duration-300 cursor-pointer ${
                    ram === option.id
                      ? 'bg-[#0d0d0d] border-white/35 text-white shadow-lg shadow-white/5'
                      : 'bg-transparent border-white/10 text-white/50 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Sliders className={`w-4 h-4 ${ram === option.id ? 'text-white' : 'text-white/20'}`} />
                    <span className="text-xs font-sans font-medium">{option.name}</span>
                  </div>
                  <span className="text-xs font-mono font-bold">
                    {option.extraPrice === 0 ? 'Base' : `+$${option.extraPrice}`}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Storage Selection */}
          <div>
            <span className="text-[10px] font-mono text-white/40 uppercase tracking-[0.2em] mb-3 block">03 / SSD Storage Volume</span>
            <div className="grid grid-cols-1 gap-2">
              {storages.map((option) => (
                <button
                  key={option.id}
                  onClick={() => setStorage(option.id)}
                  className={`flex justify-between items-center p-3.5 rounded-xl border text-left transition-all duration-300 cursor-pointer ${
                    storage === option.id
                      ? 'bg-[#0d0d0d] border-white/35 text-white shadow-lg shadow-white/5'
                      : 'bg-transparent border-white/10 text-white/50 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <HardDrive className={`w-4 h-4 ${storage === option.id ? 'text-white' : 'text-white/20'}`} />
                    <span className="text-xs font-sans font-medium">{option.name}</span>
                  </div>
                  <span className="text-xs font-mono font-bold">
                    {option.extraPrice === 0 ? 'Base' : `+$${option.extraPrice}`}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Screen Selection */}
          <div>
            <span className="text-[10px] font-mono text-white/40 uppercase tracking-[0.2em] mb-3 block">04 / Display Calibration</span>
            <div className="grid grid-cols-1 gap-2">
              {screens.map((option) => (
                <button
                  key={option.id}
                  onClick={() => setScreen(option.id)}
                  className={`flex justify-between items-center p-3.5 rounded-xl border text-left transition-all duration-300 cursor-pointer ${
                    screen === option.id
                      ? 'bg-[#0d0d0d] border-white/35 text-white shadow-lg shadow-white/5'
                      : 'bg-transparent border-white/10 text-white/50 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Sliders className={`w-4 h-4 ${screen === option.id ? 'text-white' : 'text-white/20'}`} />
                    <span className="text-xs font-sans font-medium">{option.name}</span>
                  </div>
                  <span className="text-xs font-mono font-bold">
                    {option.extraPrice === 0 ? 'Base' : `+$${option.extraPrice}`}
                  </span>
                </button>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
