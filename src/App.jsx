import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import Preloader from './components/Preloader';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import CapabilitiesSection from './components/CapabilitiesSection';
import ProjectsSection from './components/ProjectsSection';
import ReviewsSection from './components/ReviewsSection';
import MissionVisionSection from './components/MissionVisionSection';
import ContactSection from './components/ContactSection';
import PrivacyPolicyModal from './components/PrivacyPolicyModal';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [selectedService, setSelectedService] = useState('Poster Design');
  const [preloaded, setPreloaded] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const lenisRef = useRef(null);
  const globalProgressRef = useRef(null);

  // Freeze Lenis smooth scrolling when Privacy Policy modal is open so only the modal scrolls
  useEffect(() => {
    if (lenisRef.current) {
      if (isPrivacyOpen) {
        lenisRef.current.stop();
      } else {
        lenisRef.current.start();
      }
    }
  }, [isPrivacyOpen]);

  useEffect(() => {
    // 1. Initialize Lenis Smooth Scrolling (90fps responsive interpolation)
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    // 2. Full-Site Scroll Progress Line (Tracks Entire Document Scroll & Reverses Cleanly)
    lenis.on('scroll', (e) => {
      ScrollTrigger.update();
      if (globalProgressRef.current) {
        globalProgressRef.current.style.transform = `scaleX(${e.progress})`;
      }
    });

    const tickerHandler = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerHandler);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tickerHandler);
      lenis.destroy();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  const handlePreloadComplete = () => {
    setPreloaded(true);
    ScrollTrigger.refresh();
  };

  return (
    <div className="min-h-screen bg-[#000000] text-white font-sans antialiased overflow-x-hidden selection:bg-[#D4962A] selection:text-black">
      {/* 1. Ultra-Smooth Entrance Curtain Preloader */}
      <Preloader onComplete={handlePreloadComplete} />

      {/* 2. Custom Liquid-Glass Featherweight Cursor */}
      <CustomCursor />

      {/* 3. Full-Site Scroll Progress Line (Enlarged, Sleek & Visibly Gliding Across Site) */}
      <div className="fixed top-0 left-0 right-0 h-[3.5px] bg-white/[0.08] z-[99] pointer-events-none">
        <div
          ref={globalProgressRef}
          className="h-full bg-gradient-to-r from-white via-white to-[#D4962A] w-full origin-left scale-x-0 shadow-[0_0_16px_rgba(255,255,255,0.7)]"
        />
      </div>

      {/* 4. Leonardo.ai Style Ultra-Transparent Flagship Navbar */}
      <Navbar onOpenPrivacy={() => setIsPrivacyOpen(true)} />

      {/* 5. Exact Section Order: Hero > Capabilities > Coming Soon (Projects & Reviews) > Vision & Mission > Contact */}
      <main className="w-full overflow-x-hidden">
        {/* 1. Hero Stage: 3D Studio Logo Canvas with Scroll-Only Scrubbing & Giant Typography */}
        <HeroSection />

        {/* 2. Capabilities Showcase: Stacked Video Depth, Auto-Skip, Horizontal Scroll & Wide Pills */}
        <CapabilitiesSection onSelectService={(s) => setSelectedService(s)} />

        {/* 3. Coming Soon: Our Projects (Expansive OriginOS 7 Showcase with Giant Typography) */}
        <ProjectsSection />

        {/* 4. Coming Soon: Client Reviews (Expansive OriginOS 7 Showcase with Giant Typography) */}
        <ReviewsSection />

        {/* 5. Vision & Mission: 3D Flipping Card with Layer Jump (Positioned Right Before Contact) */}
        <MissionVisionSection />

        {/* 6. Contact Page: Direct Inquiry, Verified Channels & Refined Spacing */}
        <ContactSection
          initialService={selectedService}
          onOpenPrivacy={() => setIsPrivacyOpen(true)}
        />
      </main>

      {/* 6. Dedicated Privacy Policy Page / Modal */}
      <PrivacyPolicyModal
        isOpen={isPrivacyOpen}
        onClose={() => setIsPrivacyOpen(false)}
      />
    </div>
  );
}
