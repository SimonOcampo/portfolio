"use client";

import { motion } from "framer-motion";

const BORDER_WIDTH = 2;
const DURATION = 4.5;

export default function BorderBeam() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 rounded-2xl overflow-hidden"
      aria-hidden
    >
      <motion.div
        className="absolute inset-0 rounded-2xl"
        style={{
          background: `conic-gradient(from 0deg, transparent 0deg, rgba(59, 130, 246, 0.6) 30deg, rgb(59, 130, 246) 60deg, rgba(59, 130, 246, 0.6) 90deg, transparent 120deg)`,
          maskImage: `linear-gradient(#fff, #fff), linear-gradient(#fff, #fff)`,
          maskSize: `100% 100%, calc(100% - ${BORDER_WIDTH * 2}px) calc(100% - ${BORDER_WIDTH * 2}px)`,
          maskPosition: `0 0, ${BORDER_WIDTH}px ${BORDER_WIDTH}px`,
          maskComposite: "exclude",
          WebkitMaskComposite: "xor",
        }}
        animate={{ rotate: 360 }}
        transition={{
          duration: DURATION,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
}
