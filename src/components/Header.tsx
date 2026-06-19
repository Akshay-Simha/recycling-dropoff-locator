import { useState, useEffect } from 'react';
import { Recycle, Menu, X, ArrowRight } from 'lucide-react';

interface HeaderProps {
  onLocateClick: () => void;
}

export default function Header({ onLocateClick }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Monitor scroll position to apply glassmorphic backdrop
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'About', id: 'about' },
    { name: 'Locator', id: 'locator' },
    { name: 'How It Works', id: 'how-it-works' },
    { name: 'Guidelines', id: 'guidelines' },
    { name: 'FAQ', id: 'faq' },
    { name: 'Contact', id: 'contact' },
  ];

  return (
    <header
      id="site-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/70 backdrop-blur-xl border-b border-slate-200/50 shadow-[0_4px_30px_rgba(0,0,0,0.03)] py-3'
          : 'bg-white/30 backdrop-blur-md border-b border-white/30 py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div
            className="flex items-center space-x-2 cursor-pointer group"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white transition-transform group-hover:rotate-12 duration-300 shadow-md shadow-emerald-500/20">
              <Recycle className="w-5 h-5" />
            </div>
            <div>
              <span className="font-sans font-bold text-slate-900 tracking-tight block text-sm sm:text-base">
                RecycleDrop
              </span>
              <span className="font-mono text-[9px] text-slate-500 block uppercase leading-none tracking-wider font-bold">
                Store Locator
              </span>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="px-4 py-2 text-sm font-sans font-medium text-slate-650 hover:text-emerald-700 hover:underline hover:underline-offset-4 rounded-md transition-colors cursor-pointer"
              >
                {link.name}
              </button>
            ))}
          </nav>

          {/* Nav CTA Actions */}
          <div className="hidden md:flex items-center">
            <button
              onClick={onLocateClick}
              className="px-5 py-2.5 bg-emerald-600 text-white text-xs sm:text-sm font-semibold rounded-full shadow-lg shadow-emerald-600/20 hover:bg-emerald-700 hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer flex items-center space-x-1.5 group"
            >
              <span>Map Locator</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white/90 backdrop-blur-xl border-b border-slate-200/50 shadow-xl animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="px-4 pt-2 pb-6 space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="w-full text-left px-4 py-3 text-base font-sans font-medium text-slate-800 hover:text-emerald-750 hover:bg-emerald-500/10 rounded-xl transition-all cursor-pointer block"
              >
                {link.name}
              </button>
            ))}
            <div className="pt-4 px-4">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onLocateClick();
                }}
                className="w-full text-center px-4 py-3 text-sm font-sans font-semibold text-white bg-emerald-600 hover:bg-emerald-700 shadow-lg shadow-emerald-500/25 rounded-full transition-all cursor-pointer block"
              >
                Find Nearest Store
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
