import React, { useState, useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

const capabilitiesData = [
  {
    id: 'poster-design',
    serviceName: 'Poster Design',
    title: 'Poster Design',
    isVideo: true,
    mediaSrc: '/poster.mp4',
    summary:
      'High-impact print and digital posters engineered with disciplined typography and bold hierarchy to instantly capture attention across physical spaces and digital feeds.',
    deliverables: ['Festival Posters', 'Offer Posters', 'Product Posters', 'Hiring & Info Posters'],
  },
  {
    id: 'video-creation',
    serviceName: 'Video Creation',
    title: 'Video Creation',
    isVideo: true,
    mediaSrc: '/video.mp4',
    summary:
      'High-retention vertical reels and AI-synthesized motion assets formulated for algorithmic reach and measurable consumer engagement across social platforms.',
    deliverables: ['Offer Reels', 'Festival Reels', 'Product Videos', 'AI Generated Videos'],
  },
  {
    id: 'video-production',
    serviceName: 'Video Production',
    title: 'Video Production',
    isVideo: false,
    mediaSrc: '/video-production.gif',
    fallbackSrc: '/video-production.gif',
    summary:
      'Full-scale cinematic production and meticulous studio lighting that articulate brand value with narrative weight, broadcast-grade cameras, and precision color grading.',
    deliverables: ['High Quality Videos', 'Product Shoots', 'Brand Story Videos', 'Editing & Post Production'],
  },
  {
    id: 'graphic-design',
    serviceName: 'Graphic Design',
    title: 'Graphic Design',
    isVideo: false,
    mediaSrc: '/graphic-designs.gif',
    fallbackSrc: '/graphic-designs.gif',
    summary:
      'Comprehensive identity systems, brand guidelines, and print collateral that project uncompromising authority, timeless visual consistency, and category leadership.',
    deliverables: ['Logo & Branding', 'Social Media Creatives', 'Brochures & Flyers', 'Business Cards & More'],
  },
];

export default function CapabilitiesSection({ onSelectService }) {
  const [activeTab, setActiveTab] = useState(0);
  const containerRef = useRef(null);
  const pinRef = useRef(null);
  const timelineBarRef = useRef(null);
  const activeVideoRef = useRef(null);
  const isSectionInViewRef = useRef(false);
  const lastScrollProgressRef = useRef(0);
  const isUserScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef(null);
  const touchStartXRef = useRef(0);
  const [isMobile, setIsMobile] = useState(false);

  const activeCapability = capabilitiesData[activeTab];
  const isVerticalActive = activeCapability.id === 'video-creation';

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleRequestService = (serviceName) => (e) => {
    e.preventDefault();
    if (onSelectService) {
      onSelectService(serviceName);
    }
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const advanceToNext = useCallback(() => {
    setActiveTab((prev) => (prev + 1) % capabilitiesData.length);
  }, []);

  // 1. Precise Real-Time Media Progress Tracking (Zero Drift, Direct Frame Sync)
  useEffect(() => {
    // Reset progress bar on tab switch
    if (timelineBarRef.current) {
      timelineBarRef.current.style.width = '8%';
    }

    let animId;
    const isVideo = activeCapability.isVideo;

    if (isVideo) {
      // For Video: Track actual video element currentTime / duration
      const checkVideo = () => {
        const v = activeVideoRef.current;
        if (v) {
          if (v.paused && !isUserScrollingRef.current) {
            v.play().catch(() => {});
          }
          if (v.duration && v.duration > 0) {
            const p = Math.min(1, Math.max(0, v.currentTime / v.duration));
            if (timelineBarRef.current) {
              timelineBarRef.current.style.width = `${Math.min(100, Math.max(8, p * 100))}%`;
            }
            if (v.ended || (v.duration - v.currentTime <= 0.12 && v.currentTime > 0.5)) {
              if (isSectionInViewRef.current) {
                advanceToNext();
                return;
              }
            }
          }
        }
        animId = requestAnimationFrame(checkVideo);
      };
      animId = requestAnimationFrame(checkVideo);
    } else {
      // For GIF / Graphic: Smooth 5.5s progress timer
      const startTime = performance.now();
      const duration = 5500;

      const checkTimer = (now) => {
        const elapsed = now - startTime;
        const p = Math.min(1, elapsed / duration);
        if (timelineBarRef.current) {
          timelineBarRef.current.style.width = `${Math.min(100, Math.max(8, p * 100))}%`;
        }
        if (p >= 1) {
          if (isSectionInViewRef.current) {
            advanceToNext();
            return;
          }
        } else {
          animId = requestAnimationFrame(checkTimer);
        }
      };
      animId = requestAnimationFrame(checkTimer);
    }

    return () => {
      if (animId) cancelAnimationFrame(animId);
    };
  }, [activeTab, activeCapability.isVideo, advanceToNext]);

  // 2. Scroll-Scrubbed Mapping with Forward/Reverse Sync (No Snapping Conflict)
  useEffect(() => {
    const containerEl = containerRef.current;
    const pinEl = pinRef.current;
    if (!containerEl || !pinEl) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerEl,
        start: 'top top',
        end: 'bottom bottom',
        pin: pinEl,
        scrub: 0.8,
        onToggle: (self) => {
          isSectionInViewRef.current = self.isActive;
        },
        onUpdate: (self) => {
          isSectionInViewRef.current = self.isActive;
          if (!self.isActive) return;

          // Flag active scrolling
          isUserScrollingRef.current = true;
          if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
          scrollTimeoutRef.current = setTimeout(() => {
            isUserScrollingRef.current = false;
          }, 800);

          const progress = self.progress;
          // Determine tab based on scroll progress (0.0 to 1.0 mapped to 4 items)
          const newIndex = Math.min(3, Math.floor(progress * 4));

          // Only switch if the scroll delta exceeds threshold to prevent micro-snap jitter
          if (Math.abs(progress - lastScrollProgressRef.current) > 0.02) {
            lastScrollProgressRef.current = progress;
            setActiveTab((prev) => (prev !== newIndex ? newIndex : prev));
          }
        },
      });
    }, containerEl);

    return () => {
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      ctx.revert();
    };
  }, []);

  // 3. Tab Button Click with Seamless Pinned Viewport Alignment
  const handleTabSelect = (idx) => {
    setActiveTab(idx);
    const containerEl = containerRef.current;
    if (containerEl) {
      const startY = containerEl.offsetTop;
      const totalDist = containerEl.offsetHeight - window.innerHeight;
      if (totalDist > 0) {
        const targetProgress = idx / 4 + 0.02;
        lastScrollProgressRef.current = targetProgress;
        const targetY = startY + targetProgress * totalDist;
        window.scrollTo({ top: targetY, behavior: 'smooth' });
      }
    }
  };

  // 4. Horizontal / Side-Scrolling Gestures
  const handleWheel = (e) => {
    if (Math.abs(e.deltaX) > 25) {
      if (e.deltaX > 0) {
        setActiveTab((prev) => (prev + 1) % capabilitiesData.length);
      } else {
        setActiveTab((prev) => (prev - 1 + capabilitiesData.length) % capabilitiesData.length);
      }
    }
  };

  const handleTouchStart = (e) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const diff = touchStartXRef.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        setActiveTab((prev) => (prev + 1) % capabilitiesData.length);
      } else {
        setActiveTab((prev) => (prev - 1 + capabilitiesData.length) % capabilitiesData.length);
      }
    }
  };

  return (
    <div
      id="capabilities"
      ref={containerRef}
      onWheel={handleWheel}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="relative w-full h-[460vh] bg-[#000000] text-white select-none"
    >
      {/* Sticky 100vh Viewport with Generous Breathing Room */}
      <section
        ref={pinRef}
        className="sticky top-0 w-full h-screen overflow-hidden flex flex-col justify-center pt-16 pb-4 sm:py-8 lg:py-12 px-4 sm:px-6 lg:px-16 select-none"
      >
        <div className="max-w-[1400px] w-full mx-auto">
          
          {/* Flat Horizontal Capsule Bar (Spans Full Width, Perfectly Distributed) */}
          <div className="w-full rounded-2xl sm:rounded-full bg-white/[0.04] border border-white/10 p-1 sm:p-2 mb-3 sm:mb-6 lg:mb-10 backdrop-blur-2xl shadow-[0_10px_40px_rgba(0,0,0,0.5)] overflow-x-auto no-scrollbar">
            <div className="flex md:grid md:grid-cols-4 items-center gap-1.5 sm:gap-2.5 min-w-max md:min-w-0 w-full">
              {capabilitiesData.map((cap, idx) => {
                const isSelected = activeTab === idx;
                return (
                  <button
                    key={cap.id}
                    onClick={() => handleTabSelect(idx)}
                    className={`py-2 sm:py-3.5 px-3.5 sm:px-4 rounded-full text-[11px] sm:text-xs md:text-sm font-semibold tracking-wide transition-all duration-300 text-center flex items-center justify-center select-none whitespace-nowrap shrink-0 md:shrink md:w-full ${
                      isSelected
                        ? 'bg-white text-black shadow-[0_4px_24px_rgba(255,255,255,0.25)] scale-[1.01]'
                        : 'bg-transparent text-white/70 hover:text-white hover:bg-white/[0.06] hover:shadow-[0_0_16px_rgba(255,255,255,0.12)]'
                    }`}
                  >
                    <span>{cap.serviceName}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Two-Column Stage: STACKED VIDEO DEPTH ON LEFT, SERVICE DETAILS ON RIGHT */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 sm:gap-8 lg:gap-16 items-center">
            
            {/* LEFT COLUMN: Scroll-Arranging Dynamic Stack with 9:16 Vertical Reel Mode for Video Creation */}
            <div className="lg:col-span-7 w-full flex justify-center lg:justify-start lg:pl-4">
              <motion.div
                layout
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className={`relative w-full flex items-center justify-center transition-all duration-500 ${
                  isVerticalActive
                    ? 'max-w-[190px] xs:max-w-[210px] sm:max-w-[290px] lg:max-w-[320px] aspect-[9/16] h-[290px] xs:h-[320px] sm:h-[460px] lg:h-[510px]'
                    : 'max-w-[320px] xs:max-w-[380px] sm:max-w-[620px] lg:max-w-[710px] aspect-video'
                }`}
              >
                {/* Dynamically Arranged Stack Cards Moving Above Each Other on Scroll */}
                {capabilitiesData.map((cap, idx) => {
                  const diff = (idx - activeTab + capabilitiesData.length) % capabilitiesData.length;
                  const isCurrent = diff === 0;
                  const isUpcoming = diff === 1;
                  const isDeep = diff === 2;
                  const isPast = diff === 3;

                  let zIndex = 10;
                  let x = 0;
                  let y = 0;
                  let scale = 1;
                  let opacity = 1;
                  let pointerEvents = 'none';

                  if (isCurrent) {
                    zIndex = 30;
                    x = 0;
                    y = 0;
                    scale = 1;
                    opacity = 1;
                    pointerEvents = 'auto';
                  } else if (isUpcoming) {
                    zIndex = 20;
                    x = isVerticalActive ? (isMobile ? 18 : 34) : (isMobile ? 22 : 46);
                    y = isMobile ? 6 : 10;
                    scale = 0.95;
                    opacity = 0.78;
                    pointerEvents = 'auto';
                  } else if (isDeep) {
                    zIndex = 10;
                    x = isVerticalActive ? (isMobile ? -18 : -34) : (isMobile ? -22 : -46);
                    y = isMobile ? 12 : 18;
                    scale = 0.90;
                    opacity = 0.52;
                    pointerEvents = 'auto';
                  } else {
                    zIndex = 5;
                    x = isVerticalActive ? (isMobile ? -32 : -55) : (isMobile ? -38 : -74);
                    y = isMobile ? 16 : 26;
                    scale = 0.85;
                    opacity = 0.22;
                  }

                  return (
                    <motion.div
                      key={cap.id}
                      layout
                      initial={false}
                      animate={{
                        x,
                        y,
                        scale,
                        opacity,
                        zIndex,
                      }}
                      transition={{
                        duration: 0.55,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      onClick={() => {
                        if (!isCurrent) {
                          handleTabSelect(idx);
                        }
                      }}
                      className={`absolute inset-0 w-full h-full rounded-[20px] xs:rounded-[24px] sm:rounded-[32px] overflow-hidden border transition-shadow ${
                        isCurrent
                          ? 'border-white/25 shadow-[0_30px_90px_rgba(0,0,0,0.98)] cursor-default'
                          : 'border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.92)] cursor-pointer'
                      } bg-black`}
                      style={{ zIndex, pointerEvents }}
                    >
                      {/* Media (Video or Image) Full in Box */}
                      {cap.isVideo ? (
                        <video
                          ref={(el) => {
                            if (isCurrent) activeVideoRef.current = el;
                          }}
                          src={cap.mediaSrc}
                          autoPlay={isCurrent}
                          loop={false}
                          muted
                          playsInline
                          preload="auto"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <img
                          src={cap.mediaSrc}
                          alt={cap.title}
                          onError={(e) => {
                            if (cap.fallbackSrc) {
                              e.currentTarget.src = cap.fallbackSrc;
                            }
                          }}
                          className="w-full h-full object-cover"
                        />
                      )}

                      {/* Dim Scrim for Background Stack Cards */}
                      {!isCurrent && (
                        <div className="absolute inset-0 bg-black/35 hover:bg-black/10 transition-colors" />
                      )}

                      {/* For Active Top Card: Sleek Interactive Timeline Capsule */}
                      {isCurrent && (
                        <>
                          <div className="absolute inset-x-0 bottom-0 h-16 sm:h-20 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none z-10" />
                          <div className="absolute bottom-2.5 sm:bottom-3.5 left-0 right-0 z-20 flex items-center justify-center">
                            <div
                              onClick={(e) => {
                                e.stopPropagation();
                                const barTrack = e.currentTarget.querySelector('.timeline-progress-track');
                                if (!barTrack) return;
                                const rect = barTrack.getBoundingClientRect();
                                const clickX = e.clientX - rect.left;
                                const pct = Math.max(0, Math.min(1, clickX / rect.width));
                                const v = activeVideoRef.current;
                                if (v && v.duration) {
                                  v.currentTime = pct * v.duration;
                                }
                                if (timelineBarRef.current) {
                                  timelineBarRef.current.style.width = `${Math.min(100, Math.max(8, pct * 100))}%`;
                                }
                              }}
                              className="flex items-center px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-black/75 hover:bg-black/90 backdrop-blur-xl border border-white/25 hover:border-white/40 shadow-xl pointer-events-auto cursor-pointer transition-all hover:scale-105 select-none"
                              title="Click timeline to seek"
                            >
                              <div className="timeline-progress-track w-16 sm:w-24 h-1.5 bg-white/20 rounded-full overflow-hidden relative">
                                <div
                                  ref={timelineBarRef}
                                  className="h-full bg-white rounded-full transition-all duration-75 ease-linear"
                                  style={{ width: '8%' }}
                                />
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>

            {/* RIGHT COLUMN: Service Details & Request Action (Clean, No Meta Labels) */}
            <div className="lg:col-span-5 w-full flex flex-col justify-center space-y-2.5 sm:space-y-5 lg:space-y-6 text-center lg:text-left items-center lg:items-start">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCapability.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="space-y-2.5 sm:space-y-5 lg:space-y-6 w-full flex flex-col items-center lg:items-start"
                >
                  <h2 className="text-xl sm:text-3xl lg:text-5xl font-bold tracking-tight text-white">
                    {activeCapability.title}
                  </h2>

                  <p className="text-xs sm:text-sm lg:text-base text-white/70 leading-relaxed max-w-lg font-normal line-clamp-2 sm:line-clamp-none">
                    {activeCapability.summary}
                  </p>

                  <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-1 sm:pt-2 justify-center lg:justify-start">
                    {activeCapability.deliverables.map((deliv, i) => (
                      <span
                        key={i}
                        className="px-2.5 sm:px-4 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-medium bg-white/[0.06] text-white/80 border border-white/15 backdrop-blur-md"
                      >
                        {deliv}
                      </span>
                    ))}
                  </div>

                  <div className="pt-1.5 sm:pt-4">
                    <button
                      onClick={handleRequestService(activeCapability.serviceName)}
                      className="inline-flex items-center gap-2 px-6 sm:px-8 py-2.5 sm:py-3.5 text-xs sm:text-sm font-semibold rounded-full bg-white text-black hover:bg-white/90 transition-all shadow-[0_4px_20px_rgba(255,255,255,0.2)] hover:scale-105"
                    >
                      <span>Request This Service</span>
                      <span className="text-sm sm:text-base">→</span>
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

          </div>

        </div>
      </section>
    </div>
  );
}
