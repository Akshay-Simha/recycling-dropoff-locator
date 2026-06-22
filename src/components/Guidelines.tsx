import { motion } from 'motion/react';
import { useMemo } from 'react';
import { Droplet, Tag, Layers, ShieldAlert, Sparkles, AlertCircle, Check, X, HelpCircle } from 'lucide-react';
import guidelinesData from '../data/guidelines.json';
import { GuidelineItem } from '../types';

export default function Guidelines() {
  const guidelines = guidelinesData as GuidelineItem[];

  // Icon mapping dictionary
  const iconMap: Record<string, any> = {
    Droplet: Droplet,
    Tag: Tag,
    Layers: Layers,
    ShieldAlert: ShieldAlert,
  };

  // Accepted vs Unaccepted side list
  const complianceMatrix = useMemo(() => {
    return {
      accepted: [
        'Clean papers & cardboard boxes',
        'Rinsed metal cans & aluminum trays',
        'Spent vehicle batteries (lead-acid)',
        'Automotive engine oil filters',
        'Scrap steel & clean sheet metals',
      ],
      declined: [
        'Containers filled with wet food residue',
        'Ceramics, glass cups & windows',
        'Styrofoam food packaging sleeves',
        'Hazardous medical syringes',
        'Standard battery cells (alkaline)',
      ]
    };
  }, []);

  return (
    <section id="guidelines" className="py-20 bg-slate-50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Caption & Heading Block */}
        <div className="mb-16 max-w-3xl">
          <span className="font-mono text-xs font-bold text-emerald-600 uppercase tracking-widest block mb-2">
            Safety & Compliance Guide
          </span>
          <h2 className="font-sans font-extrabold text-gray-900 tracking-tight text-3xl sm:text-4xl">
            Recycling Guidelines and Tips
          </h2>
          <p className="mt-3 text-gray-600 font-sans text-sm sm:text-base">
            Follow these guidelines to ensure that your recyclables are processed correctly. Accurate sorting reduces contaminate ratios and ensures waste streams are successfully repurposed into raw commodities.
          </p>
        </div>

        {/* Double-Pane Presentation Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Guidelines Roadmap (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col space-y-6">
            {guidelines.map((item, index) => {
              const IconComponent = iconMap[item.iconName] || HelpCircle;
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="bg-white border border-gray-200/80 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-6 hover:border-emerald-250 transition-all hover:shadow-lg hover:-translate-y-0.5 group"
                >
                  {/* Step Badge & Icon */}
                  <div className="flex sm:flex-col items-center space-x-3 sm:space-x-0 sm:space-y-3 shrink-0">
                    <span className="font-mono text-xs font-extrabold text-gray-400 bg-gray-50 border border-gray-100 w-8 h-8 rounded-full flex items-center justify-center">
                      {item.id}
                    </span>
                    <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 transition-all group-hover:scale-105 shadow-xs border border-emerald-100">
                      <IconComponent className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Guide Text details */}
                  <div className="flex-1">
                    <h3 className="font-sans font-extrabold text-gray-900 text-lg mb-1.5 flex items-center">
                      <span>{item.title}</span>
                    </h3>
                    <p className="font-sans text-sm text-gray-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Right Column: Visual Allowed/Forbidden SaaS dashboard widget (5 Cols) */}
          <motion.div
            initial={{ opacity: 0, x: 15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 bg-white border border-gray-200 shadow-xl rounded-2xl p-6 sm:p-8 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-indigo-500" />
            
            {/* Header tag */}
            <div className="flex items-center space-x-2 pb-4 mb-4 border-b border-gray-100">
              <AlertCircle className="w-5 h-5 text-indigo-500" />
              <span className="font-sans font-bold text-gray-950 text-sm tracking-tight">
                Quick Sorting Compliance Deck
              </span>
            </div>

            {/* Allowed items */}
            <div className="space-y-3.5 mb-6">
              <span className="text-[10px] font-mono font-bold text-emerald-600 uppercase tracking-wider block">
                🟢 ACCEPTED AT OUR LOCATOR DEPOSITS
              </span>
              <ul className="space-y-2">
                {complianceMatrix.accepted.map((item, idx) => (
                  <li key={idx} className="flex items-start space-x-2.5 text-xs font-sans text-gray-700">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Declined items */}
            <div className="space-y-3.5 pt-6 border-t border-gray-100">
              <span className="text-[10px] font-mono font-bold text-red-500 uppercase tracking-wider block">
                🔴 CANNOT BE DEPOSITED
              </span>
              <ul className="space-y-2">
                {complianceMatrix.declined.map((item, idx) => (
                  <li key={idx} className="flex items-start space-x-2.5 text-xs font-sans text-gray-400">
                    <X className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                    <span className="line-through decoration-slate-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Alert foot explanation */}
            <div className="mt-6 bg-slate-50 border border-gray-100 rounded-xl p-3.5 flex items-start space-x-2.5">
              <HelpCircle className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
              <p className="text-[11px] text-gray-500 font-sans leading-normal">
                Have a material not covered here? Use our direct <a href="#contact" className="text-emerald-600 hover:underline font-bold">Contact Channel</a> to request confirmation before visiting.
              </p>
            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
}
