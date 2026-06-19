import { Recycle, Github, Linkedin, ExternalLink } from 'lucide-react';

export default function Footer() {
  const currentYear = 2026;

  const quickLinks = [
    { name: 'Home Landing', id: 'home' },
    { name: 'About Core', id: 'about' },
    { name: 'GCP Locator', id: 'locator' },
    { name: 'Workflow Steps', id: 'how-it-works' },
    { name: 'Compliance Guides', id: 'guidelines' },
    { name: 'General FAQ', id: 'faq' },
  ];

  const handleLinkClick = (id: string) => {
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

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-900 pt-16 pb-12 relative overflow-hidden">
      
      {/* Subtle bottom vector loops */}
      <div className="absolute bottom-0 right-0 w-64 h-64 text-slate-900 pointer-events-none opacity-40">
        <Recycle className="w-full h-full rotate-45 translate-x-12 translate-y-12" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Sitemap Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-slate-900">
          
          {/* Brand Col */}
          <div className="md:col-span-5 flex flex-col space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-9 h-9 rounded-lg bg-emerald-500 text-white flex items-center justify-center font-bold">
                <Recycle className="w-5 h-5" />
              </div>
              <div>
                <span className="font-sans font-extrabold text-white tracking-tight block text-base">
                  RecycleDrop
                </span>
                <span className="font-mono text-[9px] text-emerald-400 block uppercase leading-none font-bold tracking-wider">
                  SaaS Store Locator
                </span>
              </div>
            </div>
            <p className="font-sans text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              Creating a sustainable, circular economic Future across India. Our software helps locate authorized recycling stores, ensures sorting transparency, and logs carbon metrics.
            </p>
          </div>

          {/* Quick links Col */}
          <div className="md:col-span-4 flex flex-col space-y-4">
            <h4 className="font-mono text-[10px] text-slate-400 uppercase tracking-widest font-extrabold">
              Sitemap Navigation
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {quickLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className="text-left text-slate-400 hover:text-emerald-400 transition-colors cursor-pointer block py-1 font-sans font-medium"
                >
                  {link.name}
                </button>
              ))}
            </div>
          </div>

          {/* Dev/Portfolio Link Col */}
          <div className="md:col-span-3 flex flex-col space-y-4">
            <h4 className="font-mono text-[10px] text-slate-400 uppercase tracking-widest font-extrabold">
              Developer Connections
            </h4>
            <p className="text-xs text-slate-400 font-sans leading-relaxed">
              Engineered as a portfolio-grade project utilizing GCP Advanced Maps and optimized React.
            </p>
            <div className="flex items-center space-x-3 pt-2">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
                title="GitHub Repository"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
                title="LinkedIn Spotlight"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>

        {/* Legal & Credits Block */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center text-[11px] text-slate-500 font-sans gap-4">
          <div>
            &copy; {currentYear} RecycleDrop Technologies. Registered public-interest toolkit. All rights reserved.
          </div>
          <div className="flex items-center space-x-4">
            <a href="https://firebase.google.com" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition-colors flex items-center space-x-1">
              <span>Firebase Hosting Compliant</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <span>&bull;</span>
            <span className="text-slate-400 font-semibold">GCP Platinum Partner Build</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
