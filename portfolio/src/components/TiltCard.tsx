"use client";

import { useRef, useCallback } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const MAX_TILT = 15;

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
}

export default function TiltCard({ children, className = "" }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 300, damping: 30 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [MAX_TILT, -MAX_TILT]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-MAX_TILT, MAX_TILT]), springConfig);

  const glareX = useSpring(
    useTransform(mouseX, (v) => `${-200 * v}px`),
    springConfig
  );
  const glareY = useSpring(
    useTransform(mouseY, (v) => `${-200 * v}px`),
    springConfig
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const x = (e.clientX - centerX) / (rect.width / 2);
      const y = (e.clientY - centerY) / (rect.height / 2);
      mouseX.set(Math.max(-1, Math.min(1, x)));
      mouseY.set(Math.max(-1, Math.min(1, y)));
    },
    [mouseX, mouseY]
  );

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  return (
    <div
      ref={ref}
      className={`relative w-full ${className}`}
      style={{ perspective: 1000 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="relative w-full h-full"
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
      >
        <div className="relative" style={{ transform: "translateZ(0)" }}>
          {children}
        </div>
        {/* Glare / sheen overlay — moves opposite to tilt */}
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-2xl overflow-hidden"
          style={{
            transform: "translateZ(1px)",
            background: `radial-gradient(
              ellipse 80% 80% at 50% 50%,
              rgba(255, 255, 255, 0.15) 0%,
              transparent 60%
            )`,
            backgroundPositionX: glareX,
            backgroundPositionY: glareY,
            mixBlendMode: "overlay",
          }}
          aria-hidden
        />
      </motion.div>
    </div>
  );
}
