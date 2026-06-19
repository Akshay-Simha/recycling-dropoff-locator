import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, Mail, Send, CheckCircle, Smartphone, MapPin, Loader2 } from 'lucide-react';
import centersData from '../data/centers.json';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    centerId: '',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      return;
    }

    setStatus('loading');

    // Simulate standard SaaS submission timing
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', centerId: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000); // revert back to form after 5s
    }, 1500);
  };

  return (
    <section id="contact" className="py-20 bg-slate-50 border-t border-gray-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Coordinates Info & Contact Cards (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col space-y-8">
            <div>
              <span className="font-mono text-xs font-bold text-emerald-600 uppercase tracking-widest block mb-2">
                Get In Touch
              </span>
              <h2 className="font-sans font-extrabold text-gray-900 tracking-tight text-3xl sm:text-4xl">
                Contact Us
              </h2>
              <p className="mt-3 text-gray-650 font-sans text-sm sm:text-base leading-relaxed">
                We're here to help! Contact us with any questions or concerns you may have regarding waste compliance, bulk drop-offs, or location schedules.
              </p>
            </div>

            {/* Quick Contact Info Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Phone Info */}
              <div className="bg-white border border-gray-200/60 p-5 rounded-2xl shadow-3xs flex flex-col space-y-3 hover:border-emerald-250 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100">
                  <Phone className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <span className="font-sans text-[11px] text-gray-400 uppercase tracking-wider block font-semibold">
                    Speak on Phone
                  </span>
                  <a
                    href="tel:5555555555"
                    className="font-sans font-bold text-gray-900 text-sm hover:text-emerald-700 transition-colors block mt-0.5"
                  >
                    (555) 555-5555
                  </a>
                  <p className="text-[10px] text-gray-500 mt-1 font-sans">
                    Mon-Fri, 10 AM to 5 PM
                  </p>
                </div>
              </div>

              {/* Email Info */}
              <div className="bg-white border border-gray-200/60 p-5 rounded-2xl shadow-3xs flex flex-col space-y-3 hover:border-emerald-250 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-sans text-[11px] text-gray-400 uppercase tracking-wider block font-semibold">
                    Inquire via Email
                  </span>
                  <a
                    href="mailto:info@recycling.com"
                    className="font-sans font-bold text-gray-900 text-sm hover:text-emerald-700 transition-colors block mt-0.5"
                  >
                    info@recycling.com
                  </a>
                  <p className="text-[10px] text-gray-500 mt-1 font-sans">
                    24-hour typical response window
                  </p>
                </div>
              </div>

            </div>

            {/* Simulated Live Alert ticker card */}
            <div className="bg-emerald-950 text-emerald-200 rounded-2xl p-6 relative overflow-hidden border border-emerald-800 shadow-xl">
              <span className="font-mono text-[9px] font-bold text-emerald-400 tracking-wider block uppercase mb-1">
                PUBLIC STATUS BULLETIN
              </span>
              <h4 className="font-sans font-semibold text-white text-sm mb-1">
                Bulk Drop-offs Supported
              </h4>
              <p className="text-xs text-emerald-300 leading-normal font-sans">
                Corporate physical scrap volumes, large battery arrays, or fleet vehicle oil filter replacements require scheduling. Complete the inquiry form to book a fast gate-pass at Malleswaram or Indiranagar.
              </p>
            </div>

          </div>

          {/* Right Column: High Fidelity Forms and States (7 Cols) */}
          <div className="lg:col-span-7 bg-white border border-gray-200 rounded-2xl shadow-xl p-6 sm:p-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-emerald-500" />
            
            <AnimatePresence mode="wait">
              {status === 'success' ? (
                /* Success screen */
                <motion.div
                  key="success-screen"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="py-12 flex flex-col items-center justify-center text-center space-y-4"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shadow-md animate-bounce border border-emerald-200">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <h3 className="font-sans font-extrabold text-gray-900 text-xl tracking-tight">
                    Inquiry Transmitted Successfully
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-gray-650 max-w-md leading-relaxed mx-auto">
                    Thank you! Your ticket reservation has been recorded. A representative from the chosen RecycleDrop center will process your details and reply within 12 business hours.
                  </p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="mt-6 px-5 py-2.5 text-xs font-sans font-bold bg-slate-900 hover:bg-slate-800 text-white rounded-lg transition-colors cursor-pointer"
                  >
                    Submit alternative ticket
                  </button>
                </motion.div>
              ) : (
                /* Formal SaaS form */
                <motion.form
                  key="contact-form"
                  onSubmit={handleSubmit}
                  className="space-y-5"
                >
                  <h3 className="font-sans font-extrabold text-gray-950 text-lg tracking-tight mb-2">
                    Submit Drop-Off Protocol Inquiries
                  </h3>

                  {/* Name Input */}
                  <div className="flex flex-col space-y-1.5">
                    <label className="text-xs font-sans font-bold text-gray-700 uppercase tracking-wide">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Anand Kumar"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="px-4 py-2.5 bg-gray-50 border border-gray-200 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/15 focus:border-emerald-500 rounded-xl text-sm font-sans text-gray-800 transition-all placeholder-gray-400"
                    />
                  </div>

                  {/* Email Input */}
                  <div className="flex flex-col space-y-1.5">
                    <label className="text-xs font-sans font-bold text-gray-700 uppercase tracking-wide">
                      Corporate/Personal Email
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. anand@outlook.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="px-4 py-2.5 bg-gray-50 border border-gray-200 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/15 focus:border-emerald-500 rounded-xl text-sm font-sans text-gray-800 transition-all placeholder-gray-400"
                    />
                  </div>

                  {/* Center selection context link list */}
                  <div className="flex flex-col space-y-1.5">
                    <label className="text-xs font-sans font-bold text-gray-700 uppercase tracking-wide flex items-center justify-between">
                      <span>Recipient Center (Optional)</span>
                      <span className="text-[10px] text-gray-400 font-mono capitalize leading-none">Context linkage</span>
                    </label>
                    <select
                      value={formData.centerId}
                      onChange={(e) => setFormData({ ...formData, centerId: e.target.value })}
                      className="px-4 py-2.5 bg-gray-50 border border-gray-200 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/15 focus:border-emerald-500 rounded-xl text-sm font-sans text-gray-700 transition-all cursor-pointer"
                    >
                      <option value="">General Support Desk</option>
                      {centersData.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name} — {c.address.split(',')[1] || c.address}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Message box */}
                  <div className="flex flex-col space-y-1.5">
                    <label className="text-xs font-sans font-bold text-gray-700 uppercase tracking-wide">
                      Message details
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Indicate your recyclables, volume sizes, and preferred drop dates..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="px-4 py-2.5 bg-gray-50 border border-gray-200 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/15 focus:border-emerald-500 rounded-xl text-sm font-sans text-gray-800 transition-all placeholder-gray-400 resize-none"
                    />
                  </div>

                  {/* Submit Button Trigger */}
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-600/60 text-white rounded-xl font-sans font-bold text-sm tracking-wide shadow-md hover:shadow-emerald-100 flex items-center justify-center space-x-2 cursor-pointer transition-all active:scale-[0.99]"
                  >
                    {status === 'loading' ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-white" />
                        <span>Transmitting protocol request...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Transmit Inquiry Ticket</span>
                      </>
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>

          </div>

        </div>

      </div>
    </section>
  );
}
