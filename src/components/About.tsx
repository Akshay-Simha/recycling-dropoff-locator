import { motion } from 'motion/react';
import { Search, Zap, Leaf, ArrowRight } from 'lucide-react';

export default function About() {
  const features = [
    {
      title: 'Easy',
      desc: 'Search and simply bring your recyclable items to a designated drop-off location nearest to you. Clear guides tell you what fits where.',
      icon: Search,
      bgClass: 'bg-indigo-50 border-indigo-100/60',
      iconClass: 'bg-indigo-600/10 border border-indigo-500/20 text-indigo-700',
      accentColor: 'text-indigo-700'
    },
    {
      title: 'Convenient',
      desc: 'We have a wide network of drop-off locations across the city, making it easy for you to recycle. Check real-time operating hours.',
      icon: Zap,
      bgClass: 'bg-amber-50 border-amber-100/60',
      iconClass: 'bg-amber-600/10 border border-amber-500/20 text-amber-700',
      accentColor: 'text-amber-700'
    },
    {
      title: 'Sustainable',
      desc: 'We are committed to protecting the environment and ensuring that your recyclable items are processed properly. Complete transparency on waste cycles.',
      icon: Leaf,
      bgClass: 'bg-emerald-50 border-emerald-100/60',
      iconClass: 'bg-emerald-600/10 border border-emerald-500/20 text-emerald-700',
      accentColor: 'text-emerald-700'
    },
  ];

  return (
    <section id="about" className="py-20 bg-transparent border-t border-slate-200/30 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Caption & Heading Block */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-sans font-extrabold text-slate-900 tracking-tight text-3xl sm:text-4xl"
          >
            About Our Recycling Service
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-slate-650 text-sm sm:text-base font-sans font-medium"
          >
            Our service simplifies the process of recycling, ensuring that your waste is processed responsibly. We create cohesive pathways to bridge localized drop-offs, clear compliance directions, and green processing hubs.
          </motion.p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="group relative bg-white/60 backdrop-blur-md border border-white/50 hover:border-white/80 shadow-xs hover:shadow-xl rounded-3xl p-8 transition-all duration-300 hover:-translate-y-1 block"
              >
                {/* Visual Icon Halo */}
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-105 duration-300 shadow-sm ${item.iconClass}`}>
                  <IconComponent className="w-5 h-5" />
                </div>

                {/* Card Title */}
                <h3 className="font-sans font-bold text-slate-950 text-xl mb-3 tracking-tight flex items-center">
                  <span>{item.title}</span>
                  <ArrowRight className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-1.5 transition-all text-slate-400 group-hover:text-emerald-600" />
                </h3>

                {/* Card Description */}
                <p className="text-slate-600 text-sm font-sans leading-relaxed">
                  {item.desc}
                </p>

                {/* Bottom Accentuators */}
                <div className="mt-6 border-t border-slate-200/40 pt-4 flex justify-between items-center">
                  <span className={`font-mono text-[9px] font-bold uppercase tracking-wider ${item.accentColor}`}>
                    CORE PRINCIPLE
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Informative Callout strip */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 bg-white/70 backdrop-blur-xl border border-white/50 shadow-md rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex w-12 h-12 rounded-2xl bg-emerald-600/10 border border-emerald-500/20 flex-shrink-0 items-center justify-center text-emerald-800">
              <Leaf className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <h4 className="font-sans font-extrabold text-slate-900 text-lg leading-tight">
                Want to check your carbon output?
              </h4>
              <p className="font-sans text-sm text-slate-655 mt-1 max-w-xl">
                RecycleDrop centers convert load weight directly into environmental saved data. Every plastic bottle, alloy rim, or cell battery contributes to a central, open-source registry.
              </p>
            </div>
          </div>
          <a
            href="#locator"
            className="flex-shrink-0 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-sans font-bold text-sm rounded-full transition-all hover:scale-[1.01] active:scale-[0.99] shadow-lg shadow-emerald-500/20 cursor-pointer text-center"
          >
            Locate Nearest Center
          </a>
        </motion.div>

      </div>
    </section>
  );
}
