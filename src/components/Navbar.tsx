import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Cpu, ShoppingCart, HelpCircle } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 50);
    }
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Overview', href: '#hero' },
    { label: 'Features', href: '#features' },
    { label: 'Specifications', href: '#specifications' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Support', href: '#support' },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'py-4 bg-[#050505]/90 backdrop-blur-md border-b border-white/10' 
            : 'py-6 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-12 flex items-center justify-between">
          {/* Logo / Brand */}
          <a href="#" className="flex items-center gap-2 group">
            <div className="text-xl font-bold tracking-tighter text-white">
              HP ZBOOK <span className="font-light opacity-60">FIREFLY</span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[10px] uppercase tracking-[0.2em] font-medium text-white/70 hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Call to Action */}
          <div className="hidden md:flex items-center gap-6">
            <a 
              href="#specifications" 
              className="px-4 py-1.5 border border-white/10 rounded-full text-[10px] uppercase tracking-widest text-white/70 hover:border-white/20 hover:text-white transition-all duration-300"
            >
              Tech Specs
            </a>
            <a 
              href="#purchase" 
              className="px-4 py-1.5 border border-white/20 rounded-full text-[10px] uppercase tracking-widest hover:bg-white hover:text-black text-white font-medium transition-colors cursor-pointer"
            >
              Buy Now
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-zinc-300 hover:text-white p-1"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 top-[56px] bg-black/95 backdrop-blur-2xl z-40 md:hidden flex flex-col p-6 border-t border-zinc-900"
          >
            <div className="flex flex-col gap-6 mt-8">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-sans text-lg font-medium text-zinc-300 hover:text-white tracking-wide uppercase"
                >
                  {link.label}
                </a>
              ))}
              
              <div className="h-[1px] bg-zinc-900 my-4" />

              <a 
                href="#purchase"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3 bg-white text-black text-center font-sans font-bold tracking-widest uppercase rounded-lg text-sm shadow-xl flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-4 h-4" />
                Buy Now
              </a>
              <a 
                href="#specifications"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3 bg-zinc-900 border border-zinc-800 text-zinc-300 text-center font-sans font-medium tracking-widest uppercase rounded-lg text-sm"
              >
                View Specifications
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
