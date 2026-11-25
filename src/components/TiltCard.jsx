import React, { useRef, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

export default function TiltCard({
  children,
  className = '',
  maxTilt = 6,
  glare = true,
  onClick,
  ...rest
}) {
  const cardRef = useRef(null);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });

  const springConfig = { stiffness: 400, damping: 30 };
  const rotateX = useSpring(0, springConfig);
  const rotateY = useSpring(0, springConfig);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rX = -((y - centerY) / centerY) * maxTilt;
    const rY = ((x - centerX) / centerX) * maxTilt;

    rotateX.set(rX);
    rotateY.set(rY);

    if (glare) {
      setGlarePos({
        x: (x / rect.width) * 100,
        y: (y / rect.height) * 100,
        opacity: 0.16,
      });
    }
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    if (glare) {
      setGlarePos((prev) => ({ ...prev, opacity: 0 }));
    }
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        perspective: 1000,
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      whileHover={{ y: -5, scale: 1.015 }}
      whileTap={{ scale: 0.98 }}
      className={`relative overflow-hidden ${className}`}
      {...rest}
    >
      {children}

      {/* Dynamic Specular Sheen Following Cursor */}
      {glare && (
        <div
          className="absolute inset-0 pointer-events-none rounded-[inherit] transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle 240px at ${glarePos.x}% ${glarePos.y}%, rgba(255, 255, 255, ${glarePos.opacity}) 0%, transparent 80%)`,
          }}
        />
      )}
    </motion.div>
  );
}
