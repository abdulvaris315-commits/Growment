import React, { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef(null);

  useEffect(() => {
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (!isFinePointer) return;

    const cursor = cursorRef.current;
    if (!cursor) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let cursorX = mouseX;
    let cursorY = mouseY;
    let isVisible = false;
    let animId = null;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isVisible) {
        isVisible = true;
        cursor.style.opacity = '1';
      }
    };

    const handleMouseLeave = () => {
      isVisible = false;
      cursor.style.opacity = '0';
    };

    const handleMouseEnter = () => {
      isVisible = true;
      cursor.style.opacity = '1';
    };

    // Smooth follow + velocity stretch physics loop
    const animate = () => {
      // Lerp (linear interpolation) for fluid liquid lag
      const dx = mouseX - cursorX;
      const dy = mouseY - cursorY;
      cursorX += dx * 0.18;
      cursorY += dy * 0.18;

      // Calculate velocity for organic droplet stretch
      const velocity = Math.min(Math.hypot(dx, dy) * 0.015, 0.35);
      const angle = Math.atan2(dy, dx) * (180 / Math.PI);

      // Center the cursor and apply liquid velocity stretch
      cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0) translate(-50%, -50%) rotate(${angle}deg) scale(${1 + velocity}, ${1 - velocity * 0.5})`;

      animId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    animId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      if (animId) cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="liquid-cursor hidden lg:block opacity-0"
      aria-hidden="true"
    />
  );
}
