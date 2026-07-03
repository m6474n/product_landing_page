import React, { useState } from 'react';
import { HelpCircle, FileText, PhoneCall, ShieldCheck, Mail, Send, Check } from 'lucide-react';

export default function SupportPanel() {
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setEmailSubmitted(true);
      setTimeout(() => {
        setEmailSubmitted(false);
        setEmail('');
      }, 3000);
    }
  };

  return (
    <div id="support" className="w-full bg-[#050505] border border-white/10 rounded-2xl p-8 max-w-5xl mx-auto shadow-2xl relative overflow-hidden my-16 text-left">
      <div className="absolute top-0 left-0 w-80 h-80 bg-white/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
        
        {/* Support Options Column */}
        <div className="md:col-span-7 space-y-8 flex flex-col justify-between">
          <div>
            <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-white/40 mb-2 block">WORKSTATION ASSISTANCE</span>
            <h2 className="text-4xl font-semibold tracking-tighter text-white uppercase bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40 mb-4">Enterprise Support Hub</h2>
            <p className="text-white/60 text-sm font-light leading-relaxed mb-6">
              HP ZBook devices are backed by premier business support and dedicated enterprise response channels. Get assistance with warranty, bulk deployments, and driver calibrations.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <a href="#specifications" className="flex items-start gap-4 p-4 bg-transparent border border-white/10 rounded-xl hover:bg-white/5 transition-colors">
              <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-white shrink-0">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-sans font-semibold text-white uppercase tracking-wider">Manuals & Drivers</h4>
                <p className="text-[10px] font-mono text-white/40 mt-1">Download complete blueprints and setup datasheets.</p>
              </div>
            </a>

            <div className="flex items-start gap-4 p-4 bg-transparent border border-white/10 rounded-xl">
              <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-white shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-sans font-semibold text-white uppercase tracking-wider">Active Warranty</h4>
                <p className="text-[10px] font-mono text-white/40 mt-1">Standard 3-year warranty included. On-site help available.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Support Form Column */}
        <div className="md:col-span-5 bg-transparent border border-white/10 rounded-xl p-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-white/60">
              <Mail className="w-4 h-4 text-white/60" />
              <span className="text-[10px] font-mono uppercase tracking-widest font-semibold">Enterprise Request</span>
            </div>
            <h3 className="text-lg font-sans font-semibold text-white uppercase">Contact Sales Engineer</h3>
            <p className="text-white/40 text-xs leading-relaxed font-mono uppercase">
              Configure multiple units, setup corporate procurement lines, or request customized pricing from a representative.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-3">
            <input
              type="email"
              required
              placeholder="ENTER CORPORATE EMAIL..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#050505] border border-white/10 rounded-lg px-4 py-3 text-xs font-mono tracking-wider text-white placeholder-white/20 focus:outline-none focus:border-white/30 transition-colors"
            />
            {emailSubmitted ? (
              <div className="w-full py-3 rounded-lg bg-zinc-900/40 border border-white/10 text-white/80 text-xs font-mono font-bold tracking-widest uppercase flex items-center justify-center gap-2">
                <Check className="w-4 h-4" />
                <span>REQUEST SENT</span>
              </div>
            ) : (
              <button
                type="submit"
                className="w-full py-3 rounded-lg bg-white hover:bg-zinc-200 text-black text-xs font-sans font-bold tracking-[0.2em] uppercase transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>SEND INQUIRY</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            )}
          </form>
        </div>

      </div>
    </div>
  );
}
