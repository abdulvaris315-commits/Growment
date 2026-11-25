import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import TiltCard from './TiltCard';

const serviceOptions = [
  'Poster Design',
  'Video Creation',
  'Video Production',
  'Graphic Design',
  'Full Brand Campaign',
];

export default function ContactSection({ initialService, onOpenPrivacy }) {
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [selectedService, setSelectedService] = useState(initialService || 'Poster Design');
  const [brief, setBrief] = useState('');
  const [status, setStatus] = useState(null);

  useEffect(() => {
    if (initialService) {
      setSelectedService(initialService);
    }
  }, [initialService]);

  const handleWhatsApp = (e) => {
    e.preventDefault();
    if (!name.trim() || !brand.trim()) {
      setStatus('Please provide your name and brand/business name.');
      return;
    }

    const message = 
`*GROWMENT STUDIO — PROJECT INQUIRY*
• *Name:* ${name.trim()}
• *Brand / Business:* ${brand.trim()}
• *Service Needed:* ${selectedService}
• *Brief / Timeline:* ${brief.trim() || 'Ready for initial creative consultation.'}

Transmitted via growment.studio`;

    const url = `https://wa.me/917907430743?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    setStatus('Drafted your inquiry. Opening WhatsApp...');
  };

  return (
    <footer
      id="contact"
      className="relative w-full bg-[#000000] text-white py-16 sm:py-24 px-4 sm:px-6 border-t border-white/10 overflow-hidden flex flex-col justify-center select-none"
    >
      {/* Pure Solid Black Surface */}
      <div className="absolute inset-0 bg-[#000000] pointer-events-none" />

      <div className="relative z-10 max-w-[1240px] w-full mx-auto">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start mb-8 sm:mb-12">
          
          {/* Left 6 Columns: Direct Studio Channels & Action Pills */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-6 flex flex-col justify-between h-full space-y-6 sm:space-y-8"
          >
            <div>
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-3 sm:mb-4">
                More Than Advertising. <br />
                <span className="text-[#D4962A]">A Partner in Growth.</span>
              </h2>
              <p className="text-xs sm:text-base text-white/70 max-w-md mb-6 sm:mb-8 leading-relaxed font-normal">
                We accept a selective number of brand commissions per cycle to guarantee direct senior creative leadership across every deliverable.
              </p>

              {/* Action Pills */}
              <div className="flex flex-col sm:flex-row flex-wrap gap-2.5 sm:gap-3">
                
                {/* WhatsApp & Call Pill */}
                <motion.a
                  href="https://wa.me/917907430743"
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ y: -3, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-4 sm:px-5 py-2.5 sm:py-3 rounded-full bg-white/[0.06] hover:bg-white hover:text-black text-white text-xs sm:text-sm font-semibold transition-all duration-300 inline-flex items-center gap-2 border border-white/15 shadow-xl select-none"
                >
                  <span>WhatsApp & Call: +91 790 743 0743</span>
                </motion.a>

                {/* Email Pill */}
                <motion.a
                  href="mailto:growmentads@gmail.com"
                  whileHover={{ y: -3, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-4 sm:px-5 py-2.5 sm:py-3 rounded-full bg-white/[0.06] hover:bg-white hover:text-black text-white text-xs sm:text-sm font-semibold transition-all duration-300 inline-flex items-center gap-2.5 border border-white/15 shadow-xl select-none"
                >
                  <span>Email: growmentads@gmail.com</span>
                </motion.a>

                {/* Instagram Pill */}
                <motion.a
                  href="https://instagram.com/growment_ads"
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ y: -3, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-4 sm:px-5 py-2.5 sm:py-3 rounded-full bg-white/[0.06] hover:bg-white hover:text-black text-white text-xs sm:text-sm font-semibold transition-all duration-300 inline-flex items-center gap-2.5 border border-white/15 shadow-xl select-none"
                >
                  <span>Instagram: @growment_ads</span>
                </motion.a>

              </div>
            </div>
          </motion.div>

          {/* Right 6 Columns: Clean Project Inquiry Form */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.75, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-6"
          >
            <TiltCard
              maxTilt={3}
              glare={true}
              className="rounded-[28px] sm:rounded-[36px] bg-white/[0.03] backdrop-blur-2xl p-5 sm:p-10 border border-white/15 shadow-2xl relative"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                <span className="text-xs uppercase tracking-wider text-[#D4962A] font-semibold">
                  Start a Project
                </span>
              </div>

              {status && (
                <div className="mb-5 p-3.5 rounded-2xl bg-[#D4962A]/15 border border-[#D4962A]/30 text-xs text-[#D4962A] font-medium">
                  {status}
                </div>
              )}

              <form onSubmit={handleWhatsApp} className="space-y-4 sm:space-y-5">
                
                {/* Your Name */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-white/60 mb-1.5 font-medium">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full rounded-2xl bg-black/60 border border-white/15 px-4 py-3 text-sm text-white placeholder-white/30 focus:border-white focus:bg-white/5 focus:outline-none transition-all duration-200"
                  />
                </div>

                {/* Brand / Business Name */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-white/60 mb-1.5 font-medium">
                    Brand / Business *
                  </label>
                  <input
                    type="text"
                    required
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    placeholder="e.g. Aura Fragrances"
                    className="w-full rounded-2xl bg-black/60 border border-white/15 px-4 py-3 text-sm text-white placeholder-white/30 focus:border-white focus:bg-white/5 focus:outline-none transition-all duration-200"
                  />
                </div>

                {/* Service Scope Selection Pills */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-white/60 mb-2 font-medium">
                    Service Scope
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {serviceOptions.map((service) => {
                      const isSelected = selectedService === service;
                      return (
                        <button
                          key={service}
                          type="button"
                          onClick={() => setSelectedService(service)}
                          className={`text-xs px-3.5 py-1.5 rounded-full font-medium transition-all duration-200 cursor-pointer ${
                            isSelected
                              ? 'bg-white text-black font-semibold shadow-md'
                              : 'bg-white/10 text-white/70 hover:bg-white/20 border border-white/10'
                          }`}
                        >
                          {service}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Project Brief */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-white/60 mb-1.5 font-medium">
                    Brief / Objectives (Optional)
                  </label>
                  <textarea
                    rows={2}
                    value={brief}
                    onChange={(e) => setBrief(e.target.value)}
                    placeholder="Tell us about your brand goals, scope, and timeline..."
                    className="w-full rounded-2xl bg-black/60 border border-white/15 p-3.5 text-sm text-white placeholder-white/30 focus:border-white focus:bg-white/5 focus:outline-none transition-all duration-200 resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-full bg-white text-black font-semibold text-sm hover:bg-[#D4962A] hover:text-white transition-all duration-300 shadow-xl group mt-2"
                >
                  <span>Send Inquiry via WhatsApp</span>
                  <span className="ml-2 font-mono transition-transform duration-200 group-hover:translate-x-1">→</span>
                </button>

              </form>
            </TiltCard>
          </motion.div>

        </div>

        {/* Bottom Bar with Privacy Policy */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-white/40 gap-3">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-white/70">GROWMENT</span>
            <span>—</span>
            <span>Advertising Studio</span>
          </div>
          
          <div className="flex items-center gap-6">
            <button
              onClick={onOpenPrivacy}
              className="text-white/50 hover:text-white transition-colors underline underline-offset-4"
            >
              Privacy Policy
            </button>
            <span>© {new Date().getFullYear()} GROWMENT. All rights reserved.</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
