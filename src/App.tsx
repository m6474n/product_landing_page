/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Navbar from './components/Navbar';
import SmoothScroll from './components/SmoothScroll';
import ScrollSection from './components/ScrollSection';
import ProductGallery from './components/ProductGallery';
import SpecsPanel from './components/SpecsPanel';
import PurchaseConfigurator from './components/PurchaseConfigurator';
import SupportPanel from './components/SupportPanel';
import { Compass, ShieldCheck, Cpu, Layers, HelpCircle } from 'lucide-react';

export default function App() {
  return (
    <div className="bg-[#050505] text-white min-h-screen selection:bg-white selection:text-black relative overflow-hidden">
      {/* Ambient background light radial gradient */}
      <div className="absolute inset-x-0 top-0 h-[1000px] bg-[radial-gradient(circle_at_50%_30%,_rgba(100,100,100,0.15)_0%,_transparent_70%)] pointer-events-none -z-15" />
      <div className="absolute inset-x-0 bottom-0 h-[800px] bg-[radial-gradient(circle_at_50%_70%,_rgba(60,60,60,0.1)_0%,_transparent_75%)] pointer-events-none -z-15" />

      {/* Floating Transparent Blurred Navbar */}
      <Navbar />

      {/* Smooth Deceleration Scroll Container */}
      <SmoothScroll>
        
        {/* Pinned Cinematic Interactive 10-Stage Story Section */}
        <ScrollSection />

        {/* Section B: Feature Grid Highlights */}
        <section id="features" className="py-32 px-6 max-w-7xl mx-auto border-t border-white/10 relative">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-[10px] uppercase tracking-[0.23em] font-medium text-white/40 mb-3 block">WORKSTATION CALIBRATION</span>
            <h2 className="text-5xl md:text-7xl font-semibold tracking-tighter leading-[0.95] mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/30 uppercase">
              Power That Belongs <br className="hidden sm:inline" /> At The Creative Edge.
            </h2>
            <div className="w-12 h-px bg-white/20 mx-auto my-6" />
            <p className="text-white/60 text-sm font-light max-w-2xl mx-auto leading-relaxed tracking-wide">
              Designed from the chassis up for developers, architectural designers, and researchers who require persistent computing mobility without compromise.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature card 1 */}
            <div className="p-8 bg-zinc-900/30 border border-white/10 rounded-2xl relative overflow-hidden group hover:border-white/20 transition-all duration-500 shadow-2xl backdrop-blur-sm">
              <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/5 rounded-full blur-2xl pointer-events-none" />
              <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center bg-black/40 mb-8 transition-transform group-hover:scale-105 duration-300">
                <Cpu className="w-5 h-5 text-white/80" />
              </div>
              <h3 className="text-lg font-sans font-semibold tracking-tight text-white mb-2 uppercase">High-Grade Processing</h3>
              <p className="text-white/50 text-xs font-light leading-relaxed">
                Harness extreme performance configurations using quad-core Intel® Core™ processors designed to resolve compile blocks and compute tasks instantly.
              </p>
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>

            {/* Feature card 2 */}
            <div className="p-8 bg-zinc-900/30 border border-white/10 rounded-2xl relative overflow-hidden group hover:border-white/20 transition-all duration-500 shadow-2xl backdrop-blur-sm">
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-2xl pointer-events-none" />
              <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center bg-black/40 mb-8 transition-transform group-hover:scale-105 duration-300">
                <Compass className="w-5 h-5 text-white/80" />
              </div>
              <h3 className="text-lg font-sans font-semibold tracking-tight text-white mb-2 uppercase">Independent Accelerators</h3>
              <p className="text-white/50 text-xs font-light leading-relaxed">
                NVIDIA® Quadro® discrete graphics cards provide accelerated calculations for CAD workflows, high-fidelity mockups, and video render pipelines.
              </p>
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>

            {/* Feature card 3 */}
            <div className="p-8 bg-zinc-900/30 border border-white/10 rounded-2xl relative overflow-hidden group hover:border-white/20 transition-all duration-500 shadow-2xl backdrop-blur-sm">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />
              <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center bg-black/40 mb-8 transition-transform group-hover:scale-105 duration-300">
                <Layers className="w-5 h-5 text-white/80" />
              </div>
              <h3 className="text-lg font-sans font-semibold tracking-tight text-white mb-2 uppercase">DreamColor Optic Panel</h3>
              <p className="text-white/50 text-xs font-light leading-relaxed">
                Enjoy a spectacular 4K IPS display pre-configured with active color depth profiles, covering 100% of the DCI-P3 wide color gamut.
              </p>
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          </div>
        </section>

        {/* Section C: Product Visual Gallery */}
        <section className="py-12 px-6">
          <ProductGallery />
        </section>

        {/* Section D: Product Configurator & Real-time purchase checkout */}
        <section className="py-12 px-6">
          <PurchaseConfigurator />
        </section>

        {/* Section E: Complete specifications sheets */}
        <section className="py-12 px-6">
          <SpecsPanel />
        </section>

        {/* Section F: Enterprise Helpdesk Support */}
        <section className="py-12 px-6">
          <SupportPanel />
        </section>

        {/* Section G: Elegant Tech Footer */}
        <footer className="bg-black border-t border-zinc-900 pt-16 pb-12 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-zinc-900 text-left">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse" />
                  <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest">HP WORKSTATION GROUP</span>
                </div>
                <p className="text-zinc-500 text-xs font-light leading-relaxed">
                  ZBook Firefly G7 workstations represent elite computing form factors built to unlock next-generation potential across multiple technical fields.
                </p>
              </div>
              <div>
                <h4 className="text-xs font-mono font-bold text-zinc-300 uppercase tracking-wider mb-4">Product Family</h4>
                <ul className="space-y-2 text-xs font-sans text-zinc-500">
                  <li><a href="#" className="hover:text-zinc-300 transition-colors">ZBook Firefly 14 G7</a></li>
                  <li><a href="#" className="hover:text-zinc-300 transition-colors">ZBook Firefly 15 G7</a></li>
                  <li><a href="#" className="hover:text-zinc-300 transition-colors">ZBook Fury Workstations</a></li>
                  <li><a href="#" className="hover:text-zinc-300 transition-colors">HP ZCentral Remote Boost</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-xs font-mono font-bold text-zinc-300 uppercase tracking-wider mb-4">Support Channels</h4>
                <ul className="space-y-2 text-xs font-sans text-zinc-500">
                  <li><a href="#support" className="hover:text-zinc-300 transition-colors">Enterprise Support Desk</a></li>
                  <li><a href="#specifications" className="hover:text-zinc-300 transition-colors">Blueprints & Manuals</a></li>
                  <li><a href="#" className="hover:text-zinc-300 transition-colors">HP business diagnostics</a></li>
                  <li><a href="#" className="hover:text-zinc-300 transition-colors">Warranty registration</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-xs font-mono font-bold text-zinc-300 uppercase tracking-wider mb-4">Corporate Info</h4>
                <p className="text-zinc-500 text-xs font-light leading-relaxed mb-4">
                  Request custom corporate configurations or request fleet integration services from sales engineers.
                </p>
                <a href="#support" className="inline-block px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-full text-xs font-mono text-zinc-300 hover:text-white hover:border-zinc-700 transition-colors">
                  Contact Specialist
                </a>
              </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center pt-8 text-[10px] font-mono text-zinc-600 gap-4">
              <span>© {new Date().getFullYear()} HP DEVELOPMENT COMPANY, L.P. ALL RIGHTS RESERVED.</span>
              <div className="flex gap-6 uppercase">
                <a href="#" className="hover:text-zinc-400 transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-zinc-400 transition-colors">Terms of Use</a>
                <a href="#" className="hover:text-zinc-400 transition-colors">Corporate Governance</a>
              </div>
            </div>
          </div>
        </footer>

      </SmoothScroll>
    </div>
  );
}
