import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HelpCircle, ChevronDown, ChevronUp, MessageSquare, Sparkles } from 'lucide-react';
import { FAQItem } from '../types';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FAQItem[] = [
    {
      question: 'What types of materials can I recycle?',
      answer: 'We accept a wide range of recyclable materials, including paper, oil filters, tires, batteries, aluminum, and scrap materials. Specific centers may focus on distinct subclasses; check details on each card under our Locator above.'
    },
    {
      question: 'Are there any fees for using the drop-off locations?',
      answer: 'No, all listed drop-off locations are 100% free to use for general public waste management. We encourage everyone to recycle and contribute to a sustainable future.'
    },
    {
      question: 'How do I determine which coordinates location is nearest?',
      answer: 'Simply tap the "Determine Nearest Center" button inside the Locator control bar. After granting device coordinates permission, the system will apply the geodesic Haversine formula to find, highlight, and zoom down to the nearest depot.'
    },
    {
      question: 'Do I need to prepare my items before dropping them off?',
      answer: 'Yes. We recommend washing and emptying all containers, unscrewing plastisol caps, and peeling paper labels or residue stickers. Separating your alloys, paper pulp, and wet materials reduces sorting labor extensively.'
    }
  ];

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Heading and copy (4 Cols) */}
          <div className="lg:col-span-4 flex flex-col space-y-4">
            <span className="font-mono text-xs font-bold text-emerald-600 uppercase tracking-widest block">
              Frequently Asked Questions
            </span>
            <h2 className="font-sans font-extrabold text-gray-950 tracking-tight text-3xl">
              Got Questions? <br />
              We Have Answers.
            </h2>
            <p className="font-sans text-sm text-gray-650 leading-relaxed">
              We compiled a list of common questions about our recycling service, compliance requirements, and locator GPS maps.
            </p>
            
            {/* Supporting helper card */}
            <div className="hidden lg:flex bg-emerald-50 border border-emerald-100 p-5 rounded-2xl items-start space-x-3 mt-4">
              <MessageSquare className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-sans font-bold text-gray-900 text-xs">Still have inquiries?</h4>
                <p className="text-[11px] text-gray-600 mt-1 leading-relaxed">
                  Our developer relations support desk helps answer structural compliance inquiries. Feel free to shoot us an email using our form below.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Custom Interactive Accordions (8 Cols) */}
          <div className="lg:col-span-8 flex flex-col space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={index}
                  className={`border rounded-2xl transition-all overflow-hidden bg-white ${
                    isOpen 
                      ? 'border-emerald-500 shadow-md ring-2 ring-emerald-500/5' 
                      : 'border-gray-100 hover:border-gray-200 shadow-3xs'
                  }`}
                >
                  <button
                    onClick={() => toggleAccordion(index)}
                    className="w-full text-left p-6 flex justify-between items-center space-x-4 cursor-pointer"
                  >
                    <div className="flex items-center space-x-3.5">
                      <HelpCircle className={`w-5 h-5 flex-shrink-0 transition-colors ${isOpen ? 'text-emerald-600' : 'text-slate-400'}`} />
                      <span className="font-sans font-bold text-gray-950 text-sm sm:text-base leading-tight">
                        {faq.question}
                      </span>
                    </div>
                    <div>
                      {isOpen ? (
                        <ChevronUp className="w-5 h-5 text-emerald-600 shrink-0" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-slate-400 hover:text-gray-900 shrink-0" />
                      )}
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                      >
                        <div className="px-6 pb-6 pt-1 border-t border-gray-50 text-slate-600 text-xs sm:text-sm font-sans leading-relaxed">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
