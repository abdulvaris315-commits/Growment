import React from 'react';
import { motion } from 'framer-motion';

export default function ReviewsSection() {
  const scrollToContact = (e) => {
    e.preventDefault();
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="reviews"
      className="relative w-full min-h-[90vh] bg-[#000000] text-white py-16 sm:py-32 px-4 sm:px-6 overflow-hidden border-t border-white/10 flex flex-col justify-center select-none"
    >
      <div className="max-w-[1340px] w-full mx-auto space-y-10 sm:space-y-16">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-4 sm:space-y-6"
        >
          {/* Section Title */}
          <h2 className="text-2xl sm:text-5xl font-bold tracking-tight text-white">
            Client Reviews
          </h2>

          {/* GIANT ORIGINOS 7 COMING SOON DISPLAY TYPOGRAPHY */}
          <div className="pt-2 sm:pt-4 pb-1 sm:pb-2">
            <h3 className="text-4xl xs:text-5xl sm:text-7xl md:text-8xl lg:text-[110px] font-black tracking-tighter leading-none bg-gradient-to-r from-white via-white/90 to-[#D4962A] bg-clip-text text-transparent drop-shadow-[0_10px_40px_rgba(212,150,42,0.2)]">
              COMING SOON
            </h3>
          </div>

          <p className="text-sm sm:text-base lg:text-lg text-white/70 max-w-2xl font-normal leading-relaxed">
            Independent client audits, video performance metrics, and verified feedback are currently being aggregated for prospective partners.
          </p>
        </motion.div>

        {/* OriginOS Interactive Liquid-Glass Review Teaser Card */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.85, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full rounded-[28px] sm:rounded-[40px] border border-white/15 bg-white/[0.03] backdrop-blur-3xl p-6 sm:p-14 md:p-16 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-10"
          style={{
            boxShadow: 'inset 0 1px 1px rgba(255, 255, 255, 0.2), 0 35px 80px -20px rgba(0, 0, 0, 0.85)',
          }}
        >
          {/* Specular Top Sheen */}
          <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />

          {/* Left Review Highlight */}
          <div className="space-y-4 sm:space-y-5 max-w-xl text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-1.5 text-[#D4962A]">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-4 sm:w-5 h-4 sm:h-5 fill-current filter drop-shadow-[0_2px_8px_rgba(212,150,42,0.5)]" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>

            <h4 className="text-xl sm:text-3xl font-bold text-white tracking-tight">
              Client Feedback & Ratings
            </h4>

            <p className="text-xs sm:text-base text-white/70 leading-relaxed font-normal">
              We operate with complete creative accountability. Full client evaluations, brand engagement lifts, and campaign ROI data will be published in this live ratings module.
            </p>
          </div>

          {/* Right Action: Leave a Review */}
          <div className="shrink-0 flex flex-col items-center w-full sm:w-auto">
            <a
              href="#contact"
              onClick={scrollToContact}
              className="w-full sm:w-auto text-center px-7 sm:px-9 py-3 sm:py-4 text-xs sm:text-sm font-semibold rounded-full bg-white text-black hover:bg-white/90 transition-all shadow-[0_4px_30px_rgba(255,255,255,0.25)] hover:scale-105"
            >
              Leave a Client Review →
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
