"use client";

import { useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";

const RANGE = 80;
const STRENGTH = 0.2;

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
}

export default function MagneticButton({ children, className = "" }: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < RANGE) {
        const pull = (1 - distance / RANGE) * STRENGTH;
        setOffset({
          x: dx * pull,
          y: dy * pull,
        });
      } else {
        setOffset({ x: 0, y: 0 });
      }
    },
    []
  );

  const handleMouseLeave = useCallback(() => {
    setOffset({ x: 0, y: 0 });
  }, []);

  return (
    <motion.div
      ref={ref}
      className={`inline-block ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: offset.x, y: offset.y }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
      }}
    >
      {children}
    </motion.div>
  );
}
