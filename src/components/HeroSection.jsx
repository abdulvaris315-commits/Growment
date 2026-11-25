import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import frameList from '../hero-frames-list.json';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const containerRef = useRef(null);
  const pinRef = useRef(null);
  const canvasRef = useRef(null);
  const bgDarkRef = useRef(null);
  const topTextRef = useRef(null);
  const bottomTextRef = useRef(null);

  const [scrubProgress, setScrubProgress] = useState(0);
  const imagesRef = useRef([]);
  const loadedCountRef = useRef(0);

  const scrollTo = (id) => (e) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const containerEl = containerRef.current;
    const pinEl = pinRef.current;
    const canvas = canvasRef.current;
    const bgDarkEl = bgDarkRef.current;
    const topTextEl = topTextRef.current;
    const bottomTextEl = bottomTextRef.current;

    if (!containerEl || !pinEl || !canvas) return;

    const ctx2d = canvas.getContext('2d');
    if (!ctx2d) return;
    const totalFrames = frameList.length;
    const currentFrame = { frame: 0 };

    // Preload image frames for instant seeking with zero latency
    const images = [];
    imagesRef.current = images;

    const renderFrame = (index) => {
      const idx = Math.max(0, Math.min(totalFrames - 1, Math.round(index)));
      const img = images[idx];
      if (!img || !img.complete) return;

      const dpr = window.devicePixelRatio || 1;
      const width = canvas.width / dpr;
      const height = canvas.height / dpr;

      ctx2d.clearRect(0, 0, canvas.width, canvas.height);

      // Compute aspect cover so the video fills the full screen in background at natural zoom
      const imgAspect = img.naturalWidth / img.naturalHeight;
      const canvasAspect = width / height;

      let drawW, drawH, drawX, drawY;
      if (imgAspect < canvasAspect) {
        drawW = width;
        drawH = width / imgAspect;
        drawX = 0;
        drawY = (height - drawH) / 2;
      } else {
        drawH = height;
        drawW = height * imgAspect;
        drawX = (width - drawW) / 2;
        drawY = 0;
      }

      ctx2d.drawImage(
        img,
        drawX * dpr,
        drawY * dpr,
        drawW * dpr,
        drawH * dpr
      );
    };

    const handleResize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      renderFrame(currentFrame ? currentFrame.frame : 0);
    };

    // Load first frame immediately to display without waiting
    const firstImg = new Image();
    firstImg.src = `/hero-frames/${frameList[0]}`;
    firstImg.onload = () => {
      images[0] = firstImg;
      handleResize();
      renderFrame(0);
    };

    // Preload remaining frames asynchronously
    for (let i = 0; i < totalFrames; i++) {
      const img = new Image();
      img.src = `/hero-frames/${frameList[i]}`;
      img.onload = () => {
        loadedCountRef.current += 1;
      };
      images[i] = img;
    }

    window.addEventListener('resize', handleResize);
    handleResize();

    const ctx = gsap.context(() => {
      // Extended scrub timeline for spacious, non-congested scroll journey
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerEl,
          start: 'top top',
          end: 'bottom bottom',
          pin: pinEl,
          scrub: 0.7,
          onUpdate: (self) => {
            const p = self.progress;
            setScrubProgress(p);

            // Reversing scroll seamlessly rewinds the animation frame by frame
            const targetIndex = p * (totalFrames - 1);
            currentFrame.frame = targetIndex;
            renderFrame(targetIndex);
          },
        },
      });

      // 1. Background color transformation: starts in #222830 / #171B20 and transforms into #000000 & #0B0D0F
      if (bgDarkEl) {
        tl.to(
          bgDarkEl,
          {
            opacity: 1,
            ease: 'power1.inOut',
            duration: 0.75,
          },
          0.05
        );
      }

      // 2. Top company name and slogan capsule ascend and scale down smoothly
      tl.to(
        topTextEl,
        {
          y: -110,
          scale: 0.82,
          opacity: 0,
          ease: 'power2.inOut',
          duration: 0.6,
        },
        0
      );

      // 3. Bottom subtitle and CTA gently fade and descend
      tl.to(
        bottomTextEl,
        {
          y: 60,
          opacity: 0,
          ease: 'power2.inOut',
          duration: 0.5,
        },
        0
      );

      // 4. Generous settle hold at the end for an airy, un-congested transition into Capabilities
      tl.to({}, { duration: 0.3 });
    }, containerEl);

    return () => {
      window.removeEventListener('resize', handleResize);
      ctx.revert();
    };
  }, []);

  return (
    <div
      id="hero"
      ref={containerRef}
      className="relative w-full h-[320vh] text-white overflow-hidden"
    >
      {/* Sticky Viewport locking hero stage during scroll */}
      <section
        ref={pinRef}
        className="sticky top-0 w-full h-screen overflow-hidden flex flex-col items-center justify-between pt-16 sm:pt-20 pb-6 sm:pb-12 px-4 sm:px-6 select-none"
      >
        {/* BASE BACKGROUND: Studio Slate Gradient (#222830 to #171B20 to #0B0D0F) */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(180deg, #222830 0%, #171B20 45%, #0B0D0F 100%)',
          }}
        />

        {/* OVERLAY BACKGROUND: Smoothly transforms into pure #000000 and deep #0B0D0F on scroll */}
        <div
          ref={bgDarkRef}
          className="absolute inset-0 pointer-events-none opacity-0 transition-opacity"
          style={{
            background: 'linear-gradient(180deg, #0B0D0F 0%, #000000 60%, #000000 100%)',
          }}
        />

        {/* FULLSCREEN BACKGROUND 3D VIDEO CANVAS (Fills the entire screen at natural zoom) */}
        <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
          <canvas
            ref={canvasRef}
            className="w-full h-full block object-cover"
          />

          {/* Top subtle vignette for crystal-clear typography readability */}
          <div className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-black/50 via-black/20 to-transparent pointer-events-none" />

          {/* Bottom smooth edge blend into deep #0B0D0F / #000000 so there is zero abrupt cut */}
          <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-[#000000] via-[#0B0D0F]/80 to-transparent pointer-events-none" />
        </div>

        {/* 1. TOP TYPOGRAPHY STACK: SLOGAN (CLEAN, NO CAPSULE) & GROWMENT IN SOLID TYPOGRAPHY */}
        <div
          ref={topTextRef}
          className="relative z-20 flex flex-col items-center text-center mt-2 px-4 sm:px-6 origin-center transition-transform"
        >
          {/* Slogan Text (Clean, no capsule frame) */}
          <div className="flex items-center justify-center mb-2 sm:mb-3">
            <span className="text-xs sm:text-base font-semibold tracking-wide text-white/90">
              We Grow Brands. <span className="text-[#D4962A]">You Grow Beyond.</span>
            </span>
          </div>

          {/* GROWMENT IN LARGE COMMANDING SOLID TYPOGRAPHY (NON-TRANSPARENT) */}
          <h1 className="text-[36px] xs:text-[46px] sm:text-7xl md:text-8xl lg:text-[104px] font-black tracking-tighter leading-none select-none drop-shadow-[0_12px_60px_rgba(0,0,0,0.95)] flex items-center justify-center whitespace-nowrap">
            <span className="text-white">GROW</span>
            <span className="text-[#D4962A] drop-shadow-[0_4px_35px_rgba(212,150,42,0.65)]">MENT</span>
            <span className="text-[#D4962A]">.</span>
          </h1>

          <span className="text-[10px] sm:text-sm font-semibold tracking-[0.25em] text-white/60 uppercase font-mono mt-1">
            ADVERTISING STUDIO
          </span>
        </div>

        {/* 2. BOTTOM HOVERING SUBTITLE & CTA BUTTONS (NO TIMELINE CAPSULE) */}
        <div
          ref={bottomTextRef}
          className="relative z-20 flex flex-col items-center text-center px-4 sm:px-6 mb-2 sm:mb-4 max-w-xl"
        >
          <p className="text-xs sm:text-base text-white/75 mb-3 sm:mb-6 font-normal leading-relaxed drop-shadow-md">
            A creative advertising studio dedicated to transforming ideas into powerful brand experiences that are impossible to ignore.
          </p>

          <div className="flex items-center justify-center gap-2.5 sm:gap-3">
            <a
              href="#capabilities"
              onClick={scrollTo('capabilities')}
              className="px-4 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold rounded-full bg-white/10 text-white backdrop-blur-xl border border-white/25 hover:bg-white/20 transition-all shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]"
            >
              Explore Capabilities
            </a>
            <a
              href="#contact"
              onClick={scrollTo('contact')}
              className="px-4 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold rounded-full bg-white text-black hover:bg-white/90 transition-all shadow-[0_0_24px_rgba(255,255,255,0.25)] hover:scale-105"
            >
              Start a Project →
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
