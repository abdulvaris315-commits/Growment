import React, { useRef } from 'react';
import { motion, useSpring } from 'framer-motion';

export default function MagneticButton({
  children,
  className = '',
  maxDistance = 8,
  onClick,
  href,
  ...rest
}) {
  const ref = useRef(null);

  const springConfig = { stiffness: 350, damping: 25 };
  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = (e.clientX - centerX) / (rect.width / 2);
    const deltaY = (e.clientY - centerY) / (rect.height / 2);

    x.set(deltaX * maxDistance);
    y.set(deltaY * maxDistance);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const Component = href ? motion.a : motion.button;

  return (
    <Component
      ref={ref}
      href={href}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x, y }}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      className={`inline-flex items-center justify-center cursor-pointer select-none ${className}`}
      {...rest}
    >
      {children}
    </Component>
  );
}
