import React from 'react';
import { motion } from 'framer-motion';

const projectPreviews = [
  { title: 'Festival Campaign', category: 'Poster Design', color: 'from-[#D4962A]/25 via-white/[0.05] to-transparent' },
  { title: 'Automotive Motion', category: 'Video Creation', color: 'from-white/20 via-white/[0.05] to-transparent' },
  { title: 'Brand Identity', category: 'Graphic Design', color: 'from-[#D4962A]/20 via-white/[0.05] to-transparent' },
  { title: 'Cinematic Commercial', category: 'Video Production', color: 'from-white/25 via-white/[0.05] to-transparent' },
  { title: 'AI Retail Launch', category: 'Video Creation', color: 'from-[#D4962A]/30 via-white/[0.05] to-transparent' },
  { title: 'Hospitality System', category: 'Graphic Design', color: 'from-white/20 via-white/[0.05] to-transparent' },
];

export default function ProjectsSection() {
  return (
    <section
      id="projects"
      className="relative w-full min-h-[90vh] bg-[#000000] text-white py-16 sm:py-32 px-4 sm:px-6 overflow-hidden border-t border-white/10 flex flex-col justify-center select-none"
    >
      <div className="max-w-[1340px] w-full mx-auto space-y-10 sm:space-y-16">
        
        {/* Header with OriginOS Typographic Architecture */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-4 sm:space-y-6"
        >
          {/* Section Title */}
          <h2 className="text-2xl sm:text-5xl font-bold tracking-tight text-white">
            Our Projects
          </h2>

          {/* GIANT ORIGINOS 7 COMING SOON DISPLAY TYPOGRAPHY */}
          <div className="pt-2 sm:pt-4 pb-1 sm:pb-2">
            <h3 className="text-4xl xs:text-5xl sm:text-7xl md:text-8xl lg:text-[110px] font-black tracking-tighter leading-none bg-gradient-to-r from-white via-white/90 to-[#D4962A] bg-clip-text text-transparent drop-shadow-[0_10px_40px_rgba(212,150,42,0.2)]">
              COMING SOON
            </h3>
          </div>

          <p className="text-sm sm:text-base lg:text-lg text-white/70 max-w-2xl font-normal leading-relaxed">
            A comprehensive retrospective of cinematic commercials, brand identity systems, and viral social suites is undergoing final master grading.
          </p>
        </motion.div>

        {/* Panoramic Pill Capsule Preview Strip */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full rounded-[32px] sm:rounded-full border border-white/20 bg-black/60 p-2.5 sm:p-5 backdrop-blur-2xl shadow-[0_25px_80px_rgba(0,0,0,0.85),inset_0_1px_1px_rgba(255,255,255,0.25)] overflow-hidden"
        >
          {/* Inner Specular Rim */}
          <div className="absolute inset-0 rounded-[32px] sm:rounded-full border border-white/10 pointer-events-none" />

          {/* Infinite Marquee Strip */}
          <div className="flex items-center gap-3 sm:gap-6 overflow-hidden py-1 sm:py-2">
            <div className="flex items-center gap-3 sm:gap-6 animate-marquee whitespace-nowrap min-w-full">
              {projectPreviews.concat(projectPreviews).map((proj, idx) => (
                <div
                  key={idx}
                  className="relative shrink-0 w-[150px] sm:w-[240px] h-[105px] sm:h-[150px] rounded-[22px] sm:rounded-[36px] overflow-hidden border border-white/15 bg-white/[0.04] p-3.5 sm:p-5 flex flex-col justify-end group hover:border-[#D4962A]/50 transition-colors shadow-lg"
                >
                  <div className={`absolute inset-0 bg-gradient-to-t ${proj.color} pointer-events-none`} />
                  <span className="relative z-10 text-[11px] font-bold text-[#D4962A] uppercase tracking-wider block font-mono">
                    {proj.category}
                  </span>
                  <span className="relative z-10 text-sm sm:text-base font-bold text-white tracking-tight truncate block">
                    {proj.title}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
