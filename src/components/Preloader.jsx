import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    // Fill progress smoothly over 900ms
    const startTime = performance.now();
    const duration = 900;

    const frame = (now) => {
      const elapsed = now - startTime;
      const pct = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(pct);

      if (elapsed < duration) {
        requestAnimationFrame(frame);
      } else {
        setTimeout(() => {
          setIsDone(true);
          if (onComplete) onComplete();
        }, 100);
      }
    };

    const handle = requestAnimationFrame(frame);

    // Guaranteed safety fallback: dismiss under any circumstance after 1400ms
    const safetyTimer = setTimeout(() => {
      setIsDone(true);
      if (onComplete) onComplete();
    }, 1400);

    return () => {
      cancelAnimationFrame(handle);
      clearTimeout(safetyTimer);
    };
  }, [onComplete]);

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {!isDone && (
        <motion.div
          key="preloader-curtain"
          initial={{ y: '0%' }}
          exit={{
            y: '-100%',
            transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
          }}
          className="fixed inset-0 z-[100] bg-[#000000] flex flex-col items-center justify-center select-none cursor-wait pointer-events-none"
        >
          {/* Center Ambient Glass Vignette */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.03)_0%,rgba(0,0,0,1)_75%)] pointer-events-none" />

          {/* Logo Emblem Entrance */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 flex flex-col items-center"
          >
            <img
              src="/logo.png"
              alt="GROWMENT"
              className="h-10 sm:h-12 w-auto object-contain brightness-0 invert mb-8"
            />

            {/* Hairline Progress Track & Gold Bar */}
            <div className="w-48 sm:w-56 h-[2px] bg-white/10 rounded-full overflow-hidden relative">
              <motion.div
                className="h-full bg-[#D4962A] rounded-full"
                style={{ width: `${progress}%` }}
                transition={{ ease: 'linear' }}
              />
            </div>

            {/* Progress Counter */}
            <div className="flex items-center justify-between w-48 sm:w-56 mt-3 text-[11px] font-mono text-white/40 tracking-wider">
              <span>GROWMENT</span>
              <span>{progress}%</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
