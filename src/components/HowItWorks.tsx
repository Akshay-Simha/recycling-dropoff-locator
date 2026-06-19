import { motion } from 'motion/react';
import { Target, MapPin, Map, CheckCircle2, ArrowRight } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      step: '1',
      title: 'Get Started',
      description: 'Click the primary CTA button or scroll directly to the Store Locator section to activate the interface.',
      details: 'Look for the "Find Nearby Centers" button on our hero section.',
      icon: Target,
      color: 'text-indigo-600 bg-indigo-50 border-indigo-100',
      lineColor: 'bg-indigo-300'
    },
    {
      step: '2',
      title: 'Enter Location',
      description: 'Start by entering your address or zip code into the search bar, or allow browser Geolocation services to match instantly.',
      details: 'Automatic coords detection supports quick localized matches.',
      icon: MapPin,
      color: 'text-amber-600 bg-amber-50 border-amber-100',
      lineColor: 'bg-amber-300'
    },
    {
      step: '3',
      title: 'Locate a Drop-Off',
      description: 'The map will render detailed markers of all certified recycling drop-off locations within your selected vicinity.',
      details: 'Advanced markers and coordinates are loaded of Bengaluru hubs.',
      icon: Map,
      color: 'text-emerald-600 bg-emerald-50 border-emerald-100',
      lineColor: 'bg-emerald-300'
    },
    {
      step: '4',
      title: 'Choose a Location',
      description: 'Review operating hours and compliant materials to select the drop-off location that is most convenient for you.',
      details: 'Pick what is most convenient for you and submit recyclables safely.',
      icon: CheckCircle2,
      color: 'text-emerald-700 bg-emerald-100 border-emerald-200',
      lineColor: 'transparent'
    },
  ];

  return (
    <section id="how-it-works" className="py-20 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Caption & Heading Block */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-mono text-xs font-bold text-emerald-600 uppercase tracking-widest block mb-2">
            Step-by-Step Operations
          </span>
          <h2 className="font-sans font-extrabold text-gray-900 tracking-tight text-3xl sm:text-4xl">
            Locate a Drop-Off Location
          </h2>
          <p className="mt-3 text-gray-600 font-sans text-sm sm:text-base">
            Use our interactive map to find the closest recycling drop-off location to you.
          </p>
        </div>

        {/* Timeline Grid (Vertical layout on mobile, elegant horizontal flow on desktop) */}
        <div className="relative mt-8">
          
          {/* Connecting line on desktop */}
          <div className="hidden lg:block absolute top-[2.75rem] left-8 right-8 h-0.5 bg-gradient-to-r from-indigo-100 via-amber-100 to-emerald-150 -z-10" />

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-6">
            {steps.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  className="bg-slate-50 border border-gray-100/70 p-6 sm:p-8 rounded-2xl relative hover:border-gray-200 shadow-3xs hover:shadow-md transition-all flex flex-col justify-between"
                >
                  
                  <div>
                    {/* Circle Numerical Index & Icon */}
                    <div className="flex items-center justify-between mb-6">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center border shadow-xs ${item.color}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="font-mono font-extrabold text-2xl text-gray-300">
                        {item.step.padStart(2, '0')}
                      </span>
                    </div>

                    {/* Content Block */}
                    <span className="font-mono text-[9px] font-bold text-gray-400 block uppercase tracking-wider mb-2">
                      STEP {item.step}
                    </span>
                    <h3 className="font-sans font-bold text-gray-900 text-lg mb-2">
                      {item.title}
                    </h3>
                    <p className="font-sans text-xs sm:text-sm text-gray-650 leading-relaxed block mb-4">
                      {item.description}
                    </p>
                  </div>

                  {/* Micro Hint Info */}
                  <div className="border-t border-gray-200/50 pt-3 mt-4 text-[11px] text-gray-500 font-sans italic flex items-center justify-between">
                    <span>{item.details}</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  </div>

                </motion.div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
