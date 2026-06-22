import { motion } from 'motion/react';
import { ArrowDown, Recycle, MapPin, Globe, Sparkles } from 'lucide-react';

interface HeroProps {
  onLocateClick: () => void;
}

export default function Hero({ onLocateClick }: HeroProps) {
  return (
    <section
      id="home"
      className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden bg-transparent"
    >
      {/* Decorative Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20" />

      {/* Decorative Blur Spheres */}
      <div className="absolute top-1/4 left-1/10 w-96 h-96 bg-emerald-200/30 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse duration-5000" />
      <div className="absolute top-1/3 right-1/10 w-96 h-96 bg-emerald-100/40 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse duration-7000" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left Block: Narrative */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col space-y-6"
          >
            {/* SaaS Tag */}
            <div className="inline-flex self-start items-center space-x-1.5 px-3.5 py-1.5 bg-emerald-600/10 border border-emerald-500/20 rounded-full text-emerald-805 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600 animate-spin" />
              <span>Version 2.0 Live — Fully Interactive GPS Map</span>
            </div>

            {/* Typography Heading */}
            <h1 className="font-sans font-extrabold text-slate-900 tracking-tight text-4xl sm:text-5xl lg:text-6xl leading-[1.08]">
              Recycling Drop-Off{' '}
              <span className="text-emerald-600 relative inline-block">
                Store Locator
                <svg className="absolute left-0 bottom-0 w-full h-[6px] text-emerald-200" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0,5 C30,8 70,2 100,5" stroke="currentColor" strokeWidth="6" strokeLinecap="round" fill="none" />
                </svg>
              </span>
            </h1>

            {/* Subtext Paragraph */}
            <p className="text-base sm:text-lg text-slate-600 font-sans leading-relaxed max-w-xl">
              Our mission is to make recycling easy and convenient for everyone, creating a sustainable future. Find recycling centers near you, learn exact materials guidelines, and trace your community impact.
            </p>

            {/* CTA Trigger Group */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 pt-2">
              <button
                onClick={onLocateClick}
                className="px-8 py-4 font-sans font-semibold text-white bg-emerald-600 hover:bg-emerald-700 hover:scale-[1.01] shadow-lg shadow-emerald-500/20 active:scale-[0.99] rounded-full transition-all cursor-pointer flex items-center justify-center space-x-2 text-base group"
              >
                <span>Find Nearby Centers</span>
                <ArrowDown className="w-5 h-5 group-hover:translate-y-0.5 transition-transform" />
              </button>
              <a
                href="#guidelines"
                className="px-7 py-4 font-sans font-semibold text-slate-705 bg-white/55 border border-slate-200/50 hover:bg-white/80 active:scale-[0.99] rounded-full transition-all cursor-pointer text-center text-sm md:text-base flex items-center justify-center space-x-1.5 shadow-sm backdrop-blur-xs"
              >
                <span>Guidelines Reference</span>
              </a>
            </div>

            {/* Micro Trust Stats */}
            <div className="grid grid-cols-3 gap-4 border-t border-slate-200/30 pt-8 mt-4">
              <div>
                <span className="font-sans font-extrabold text-2xl text-slate-900 block">100%</span>
                <span className="font-mono text-[9px] text-slate-500 uppercase tracking-widest block font-bold">Eco-Friendly Hubs</span>
              </div>
              <div>
                <span className="font-sans font-extrabold text-2xl text-slate-900 block">60+</span>
                <span className="font-mono text-[9px] text-slate-500 uppercase tracking-widest block font-bold">Bengaluru locations</span>
              </div>
              <div>
                <span className="font-sans font-extrabold text-2xl text-slate-900 block">0 Cost</span>
                <span className="font-mono text-[9px] text-slate-500 uppercase tracking-widest block font-bold">Free public access</span>
              </div>
            </div>
          </motion.div>

          {/* Right Block: Graphic Illustration Mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="relative lg:mt-0 flex justify-center"
          >
            {/* Tech UI Deck Container */}
            <div className="relative w-full max-w-md bg-white/70 backdrop-blur-xl border border-white/40 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] rounded-3xl p-6 overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-emerald-600" />

              {/* Mock Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-200/50">
                <div className="flex space-x-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                </div>
                <span className="font-mono text-[9px] text-emerald-605 bg-emerald-600/10 px-2.5 py-0.5 rounded-full font-bold">
                  RECIPROCAL SAAS LOCATOR
                </span>
              </div>

              {/* Mock UI Content */}
              <div className="py-5 space-y-5">

                {/* Active Impact Card */}
                <div className="bg-emerald-600/5 border border-emerald-500/10 rounded-2xl p-4 flex items-center justify-between">
                  <div>
                    <span className="font-sans font-medium text-xs text-slate-500 uppercase tracking-wider block">Tons Carbon Kept</span>
                    <span className="font-sans font-extrabold text-2xl text-emerald-850 tracking-tight">4,812.5 T</span>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center text-white shadow-md shadow-emerald-500/20">
                    <Globe className="w-5 h-5 animate-spin-slow" />
                  </div>
                </div>

                {/* Locator Interactive visual card */}
                <div className="relative h-44 bg-white/40 border border-white/30 rounded-2xl overflow-hidden flex items-center justify-center">
                  <div className="absolute inset-0 bg-[radial-gradient(#10b981_0.6px,transparent_0.6px)] [bg-size:12px_12px] opacity-15" />

                  {/* Custom Minimal SVG Map representation */}
                  <div className="absolute inset-x-8 inset-y-6 border border-emerald-500/10 rounded-2xl bg-white/60 backdrop-blur-xs flex flex-col justify-between p-3">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[9px] text-slate-400 uppercase font-black tracking-wider">ZONE: BENGALURU CENTRAL</span>
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                    </div>

                    {/* Centered Loop */}
                    <div className="flex justify-center items-center py-2 space-x-6">
                      <div className="flex flex-col items-center">
                        <MapPin className="w-5 h-5 text-emerald-600 bounce-animation" />
                        <span className="font-sans text-[9px] font-bold text-slate-700">Malleswaram</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <MapPin className="w-5 h-5 text-emerald-500 bounce-animation" />
                        <span className="font-sans text-[9px] font-bold text-slate-700">Indiranagar</span>
                      </div>
                    </div>

                    <div className="text-[8px] text-slate-400 text-center font-mono uppercase tracking-wider font-bold">
                      GPS Feed Verified Active
                    </div>
                  </div>
                </div>

                {/* Secondary Ticker */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="border border-white/40 rounded-xl p-3 bg-white/40">
                    <span className="text-[9px] text-slate-400 uppercase tracking-widest block font-bold">E-GreenHub</span>
                    <span className="font-sans text-[11px] font-bold text-slate-800">Mon-Sat: open until 5pm</span>
                  </div>
                  <div className="border border-white/40 rounded-xl p-3 bg-white/40">
                    <span className="text-[9px] text-slate-400 uppercase tracking-widest block font-bold">WasteCycle</span>
                    <span className="font-sans text-[11px] font-bold text-slate-800">Sat-Sun: Weekend drop</span>
                  </div>
                </div>

              </div>

              {/* Loop Icon Decorative */}
              <div className="absolute -bottom-10 -right-10 w-28 h-28 text-emerald-100/40 pointer-events-none">
                <Recycle className="w-full h-full rotate-12" />
              </div>

            </div>

            {/* Custom styled badges floating */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
              className="absolute -top-6 -left-6 bg-white/70 backdrop-blur-md shadow-xl border border-white/40 rounded-2xl p-3.5 flex items-center space-x-2.5"
            >
              <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-md shadow-emerald-500/20">
                <Recycle className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[9px] text-slate-400 block uppercase font-mono tracking-wider font-bold">Real-time GPS</span>
                <span className="font-sans text-xs font-extrabold text-slate-800 block">Instant Store Match</span>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
