import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function MissionVisionSection() {
  const containerRef = useRef(null);
  const pinRef = useRef(null);
  const cardRef = useRef(null);

  useEffect(() => {
    const containerEl = containerRef.current;
    const pinEl = pinRef.current;
    const cardEl = cardRef.current;
    if (!containerEl || !pinEl || !cardEl) return;

    const ctx = gsap.context(() => {
      // Pinned scroll section where the card jumps forward by layer and flips on scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerEl,
          start: 'top top',
          end: 'bottom bottom',
          pin: pinEl,
          scrub: 1,
        },
      });

      // 1. Layer Jump: Card jumps forward along Z-axis toward user
      tl.fromTo(
        cardEl,
        {
          scale: 0.86,
          y: 60,
          z: -120,
        },
        {
          scale: 1.04,
          y: 0,
          z: 60,
          ease: 'power2.out',
          duration: 0.45,
        },
        0
      );

      // 2. 3D Flip: Card smoothly flips 180 degrees from Mission to Vision
      tl.fromTo(
        cardEl,
        {
          rotateY: 0,
        },
        {
          rotateY: 180,
          ease: 'power1.inOut',
          duration: 0.8,
        },
        0.2
      );

      // Settle hold
      tl.to({}, { duration: 0.2 });
    }, containerEl);

    return () => ctx.revert();
  }, []);

  return (
    <div
      id="mission-vision"
      ref={containerRef}
      className="relative w-full h-[160vh] bg-[#000000] text-white select-none"
    >
      <section
        ref={pinRef}
        className="sticky top-0 w-full h-screen overflow-hidden flex flex-col items-center justify-center px-4 sm:px-6"
        style={{ perspective: 1600 }}
      >
        {/* Pure Solid Black Surface */}
        <div className="absolute inset-0 bg-[#000000] pointer-events-none" />

        {/* 3D Flipping Card Container - Noticeably Smaller, Refined & Compact */}
        <div
          className="relative w-full max-w-[560px] sm:max-w-[600px] min-h-[260px] sm:min-h-[300px] max-h-[360px] aspect-[16/10]"
          style={{ transformStyle: 'preserve-3d', WebkitTransformStyle: 'preserve-3d' }}
        >
          <div
            ref={cardRef}
            className="w-full h-full relative cursor-default"
            style={{
              transformStyle: 'preserve-3d',
              WebkitTransformStyle: 'preserve-3d',
              willChange: 'transform',
            }}
          >
            {/* FRONT FACE: MISSION (Tinted Obsidian & Warm Gold Glassmorphism) */}
            <div
              className="absolute inset-0 w-full h-full rounded-[24px] sm:rounded-[30px] p-5 sm:p-9 md:p-10 flex flex-col justify-between backdrop-blur-3xl shadow-[0_25px_70px_rgba(0,0,0,0.9),inset_0_1px_1px_rgba(255,255,255,0.2)] border border-[#D4962A]/35"
              style={{
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                background: 'radial-gradient(ellipse at 50% 0%, rgba(212, 150, 42, 0.16) 0%, rgba(15, 12, 8, 0.92) 80%)',
              }}
            >
              {/* Specular Top Sheen */}
              <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-[#D4962A]/60 to-transparent pointer-events-none" />

              <div>
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.25em] text-[#D4962A] uppercase font-mono">
                    OUR MISSION
                  </span>
                </div>

                <blockquote className="text-base sm:text-2xl md:text-[26px] font-semibold text-white leading-[1.3] tracking-tight drop-shadow-md">
                  “Every business has a story worth telling. Our mission is to make that story <span className="text-[#D4962A]">impossible to ignore</span>.”
                </blockquote>
              </div>

              <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-white/10 text-[10px] sm:text-[11px] text-white/50 font-mono">
                <span>GROWMENT ADVERTISING STUDIO</span>
              </div>
            </div>

            {/* BACK FACE: VISION (Tinted Platinum Ice-White Glassmorphism) */}
            <div
              className="absolute inset-0 w-full h-full rounded-[24px] sm:rounded-[30px] p-5 sm:p-9 md:p-10 flex flex-col justify-between backdrop-blur-3xl shadow-[0_25px_70px_rgba(0,0,0,0.9),inset_0_1px_1px_rgba(255,255,255,0.3)] border border-white/35"
              style={{
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)',
                background: 'radial-gradient(ellipse at 50% 0%, rgba(255, 255, 255, 0.14) 0%, rgba(10, 11, 14, 0.95) 80%)',
              }}
            >
              {/* Specular Top Sheen */}
              <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-white/70 to-transparent pointer-events-none" />

              <div>
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.25em] text-white/90 uppercase font-mono">
                    OUR VISION
                  </span>
                </div>

                <blockquote className="text-base sm:text-2xl md:text-[26px] font-semibold text-white leading-[1.3] tracking-tight drop-shadow-md">
                  “To become a creative force that helps businesses turn their potential into <span className="text-[#D4962A]">powerful and recognizable brands</span>.”
                </blockquote>
              </div>

              <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-white/10 text-[10px] sm:text-[11px] text-white/50 font-mono">
                <span>GROWMENT ADVERTISING STUDIO</span>
              </div>
            </div>
          </div>
        </div>

      </section>
    </div>
  );
}
