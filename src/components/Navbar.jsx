import React, { useState } from 'react';

export default function Navbar({ onOpenPrivacy }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollTo = (id) => (e) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* OriginOS Ultra-Transparent Header Bar */}
      <header className="fixed top-0 left-0 right-0 z-50 h-[64px] bg-black/15 backdrop-blur-2xl border-b border-white/[0.05] transition-all">
        <div className="max-w-[1340px] h-full mx-auto px-6 sm:px-8 flex items-center justify-between">
          
          {/* Left: Brand Logo & Title */}
          <a
            href="#"
            onClick={scrollTo('hero')}
            className="flex items-center gap-3 group select-none"
            aria-label="GROWMENT Home"
          >
            {/* Crisp Emblem without background */}
            <div className="w-9 h-9 flex items-center justify-center shrink-0">
              <img
                src="/logo.png"
                alt="GROWMENT Emblem"
                className="w-full h-full object-contain filter drop-shadow-[0_2px_8px_rgba(212,150,42,0.3)] select-none"
                style={{ imageRendering: '-webkit-optimize-contrast' }}
              />
            </div>

            {/* Brand Title: Bold, tight-tracking with Solid Non-Transparent MENT */}
            <span className="text-[19px] font-bold tracking-tight select-none flex items-center">
              <span className="text-white">GROW</span>
              <span className="text-[#D4962A] drop-shadow-[0_2px_12px_rgba(212,150,42,0.5)]">MENT</span>
              <span className="text-[#D4962A] text-[20px] leading-none">.</span>
            </span>
          </a>

          {/* Center: Navigation Links with OriginOS Ultra-Transparent Hover */}
          <nav className="hidden md:flex items-center gap-6">
            <a
              href="#capabilities"
              onClick={scrollTo('capabilities')}
              className="px-3 py-1.5 rounded-full text-[14px] font-medium text-white/75 hover:text-white hover:bg-white/[0.05] transition-all flex items-center gap-1.5"
            >
              <span>Capabilities</span>
              <span className="text-[11px] text-white/40">▾</span>
            </a>

            <a
              href="#projects"
              onClick={scrollTo('projects')}
              className="px-3 py-1.5 rounded-full text-[14px] font-medium text-white/75 hover:text-white hover:bg-white/[0.05] transition-all flex items-center gap-1.5"
            >
              <span>Our Projects</span>
            </a>

            <a
              href="#reviews"
              onClick={scrollTo('reviews')}
              className="px-3 py-1.5 rounded-full text-[14px] font-medium text-white/75 hover:text-white hover:bg-white/[0.05] transition-all flex items-center gap-1.5"
            >
              <span>Reviews</span>
            </a>

            <a
              href="#contact"
              onClick={scrollTo('contact')}
              className="px-3 py-1.5 rounded-full text-[14px] font-medium text-white/75 hover:text-white hover:bg-white/[0.05] transition-all"
            >
              Contact
            </a>

            <button
              onClick={onOpenPrivacy}
              className="px-3 py-1.5 rounded-full text-[14px] font-medium text-white/50 hover:text-white hover:bg-white/[0.05] transition-all"
            >
              Privacy
            </button>
          </nav>

          {/* Right Action Buttons with Maximum Transparent Hover */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href="#capabilities"
              onClick={scrollTo('capabilities')}
              className="px-4 py-2 text-xs font-semibold rounded-full bg-white/[0.04] text-white/80 border border-white/15 hover:bg-white/[0.08] hover:border-white/30 transition-all select-none"
            >
              Explore
            </a>

            <a
              href="#contact"
              onClick={scrollTo('contact')}
              className="px-5 py-2 text-xs sm:text-sm font-semibold rounded-full bg-white text-black hover:bg-white/90 transition-all shadow-[0_0_24px_rgba(255,255,255,0.25)] select-none hover:scale-[1.02]"
            >
              Start a Project
            </a>
          </div>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-white/80 hover:text-white focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-black/95 backdrop-blur-2xl pt-24 px-8 flex flex-col justify-between pb-12">
          <div className="flex flex-col space-y-6 text-xl font-medium">
            <a
              href="#capabilities"
              onClick={scrollTo('capabilities')}
              className="text-white/80 hover:text-white py-2 border-b border-white/10 flex justify-between items-center"
            >
              <span>Capabilities</span>
              <span className="text-sm text-white/40">→</span>
            </a>
            <a
              href="#projects"
              onClick={scrollTo('projects')}
              className="text-white/80 hover:text-white py-2 border-b border-white/10 flex justify-between items-center"
            >
              <span>Our Projects</span>
              <span className="text-sm text-white/40">→</span>
            </a>
            <a
              href="#reviews"
              onClick={scrollTo('reviews')}
              className="text-white/80 hover:text-white py-2 border-b border-white/10 flex justify-between items-center"
            >
              <span>Client Reviews</span>
              <span className="text-sm text-white/40">→</span>
            </a>
            <a
              href="#contact"
              onClick={scrollTo('contact')}
              className="text-white/80 hover:text-white py-2 border-b border-white/10 flex justify-between items-center"
            >
              <span>Contact</span>
              <span className="text-sm text-white/40">→</span>
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenPrivacy) onOpenPrivacy();
              }}
              className="text-left text-white/60 hover:text-white py-2 flex justify-between items-center"
            >
              <span>Privacy Policy</span>
              <span className="text-sm text-white/40">→</span>
            </button>
          </div>

          <a
            href="#contact"
            onClick={scrollTo('contact')}
            className="w-full py-3.5 text-center font-semibold rounded-full bg-white text-black text-sm"
          >
            Start a Project
          </a>
        </div>
      )}
    </>
  );
}
