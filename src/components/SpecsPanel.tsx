import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Cpu, HardDrive, ShieldAlert, Monitor, BatteryCharging, Wifi, ArrowDownToLine, Check } from 'lucide-react';

interface SpecItem {
  label: string;
  value: string;
}

interface SpecCategory {
  id: string;
  title: string;
  icon: any;
  specs: SpecItem[];
}

export default function SpecsPanel() {
  const [activeTab, setActiveTab] = useState('performance');
  const [downloading, setDownloading] = useState(false);

  const specCategories: SpecCategory[] = [
    {
      id: 'performance',
      title: 'Performance',
      icon: Cpu,
      specs: [
        { label: 'Processor', value: 'Intel® Core™ i7-10810U with Intel® UHD Graphics (1.1 GHz base, up to 4.9 GHz with Intel® Turbo Boost Technology)' },
        { label: 'Cores & Cache', value: '6 Cores, 12 Threads, 12 MB L3 cache' },
        { label: 'Graphics', value: 'NVIDIA® Quadro® P520 (4 GB GDDR5 dedicated) or NVIDIA® Quadro® T500 (4 GB GDDR5)' },
        { label: 'Thermal Tech', value: 'Dual Active PWM Fans, copper composite heatpipes, HP ActiveShield thermal profiles' },
      ],
    },
    {
      id: 'memory_storage',
      title: 'Memory & Storage',
      icon: HardDrive,
      specs: [
        { label: 'Memory (RAM)', value: '32 GB DDR4-3200 MHz SDRAM (2 x 16 GB), expandable up to 64 GB dual-channel' },
        { label: 'Storage', value: '2 TB PCIe® NVMe™ M.2 SSD PCIe Gen 4 x4 Turbo Drive' },
        { label: 'Memory Slots', value: '2 SODIMM slots (user upgradeable)' },
      ],
    },
    {
      id: 'display',
      title: 'Display & Audio',
      icon: Monitor,
      specs: [
        { label: 'Screen Size', value: '14" diagonal, UHD (3840 x 2160), IPS, anti-glare' },
        { label: 'Color Accuracy', value: '100% DCI-P3, HP DreamColor technology, factory calibrated' },
        { label: 'Brightness', value: '400 nits high-brightness, HDR-400 compliance' },
        { label: 'Audio', value: 'Bang & Olufsen custom-tuned stereo speakers, HP World Facing Microphone' },
      ],
    },
    {
      id: 'power_connectivity',
      title: 'Power & Ports',
      icon: BatteryCharging,
      specs: [
        { label: 'Battery', value: 'HP Long Life 3-cell, 53 Wh Li-ion polymer' },
        { label: 'Fast Charge', value: 'Supports battery fast charge (approximately 50% in 30 minutes)' },
        { label: 'Thunderbolt', value: '2 x USB Type-C™ with Thunderbolt™ 3 support (Power Delivery 3.0, DisplayPort™ 1.2)' },
        { label: 'Standard Ports', value: '2 x USB 3.1 Gen 1 (1 charging); 1 x HDMI 1.4b; 1 x headphone/microphone combo' },
        { label: 'Wireless', value: 'Intel® Wi-Fi 6 AX201 (2x2) and Bluetooth® 5 combo, vPro®' },
      ],
    },
  ];

  const activeCategory = specCategories.find((cat) => cat.id === activeTab) || specCategories[0];

  const handleDownload = () => {
    setDownloading(true);
    setTimeout(() => setDownloading(false), 2000);
  };

  return (
    <div id="specifications" className="w-full bg-[#050505] border border-white/10 rounded-2xl p-8 max-w-5xl mx-auto shadow-2xl relative overflow-hidden">
      {/* Background vector blueprint lines */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.012)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.012)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none opacity-30" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <div className="text-[10px] uppercase tracking-[0.2em] font-medium text-white/40 mb-2 block">COMPLETE DATASHEET</div>
            <h2 className="text-4xl font-semibold tracking-tighter text-white uppercase bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40">Technical Specifications</h2>
          </div>
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 px-5 py-2 border border-white/20 rounded-full text-[10px] uppercase tracking-widest text-white hover:bg-white hover:text-black transition-colors duration-300 self-start md:self-auto cursor-pointer"
          >
            {downloading ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>PDF GENERATED</span>
              </>
            ) : (
              <>
                <ArrowDownToLine className="w-3.5 h-3.5" />
                <span>DOWNLOAD DATASHEET</span>
              </>
            )}
          </button>
        </div>

        {/* Tab Selection */}
        <div className="flex flex-wrap gap-2 border-b border-white/10 pb-6 mb-8">
          {specCategories.map((cat) => {
            const Icon = cat.icon;
            const isActive = cat.id === activeTab;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`flex items-center gap-2 px-4 py-2 border rounded-full text-[10px] font-mono tracking-wider transition-all duration-300 uppercase cursor-pointer ${
                  isActive
                    ? 'bg-white text-black font-semibold border-white/10'
                    : 'bg-transparent text-white/50 hover:text-white border-white/10 hover:bg-white/5'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-black' : 'text-white/40'}`} />
                {cat.title}
              </button>
            );
          })}
        </div>

        {/* Tab Contents */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {activeCategory.specs.map((spec, sIdx) => (
              <div 
                key={sIdx} 
                className="group border-b border-white/10 pb-4 flex flex-col justify-between hover:border-white/20 transition-colors duration-300"
              >
                <span className="text-[10px] font-mono text-white/40 uppercase tracking-[0.15em] mb-1 group-hover:text-white/60 transition-colors">
                  {spec.label}
                </span>
                <span className="text-sm font-sans text-white/80 leading-relaxed font-light">
                  {spec.value}
                </span>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

        <div className="mt-12 flex items-center gap-3 bg-zinc-900/10 border border-white/10 rounded-xl p-4">
          <ShieldAlert className="w-5 h-5 text-white/40 shrink-0" />
          <p className="text-[10px] font-mono text-white/40 leading-normal uppercase">
            * Specifications are configured for premium model options. Performance metrics may vary based on exact hardware configs selected at checkout. Intel vPro platform available on select processors.
          </p>
        </div>
      </div>
    </div>
  );
}
