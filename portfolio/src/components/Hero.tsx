"use client";

import { motion } from "framer-motion";
import { ArrowRight, Download, Github, Linkedin } from "lucide-react";
import SequentialTypewriter from "@/components/SequentialTypewriter";
import { hero, typewriterWords } from "@/data/site";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
};

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const floating = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: [0, -10, 0],
    transition: {
      opacity: { duration: 0.8 },
      y: { repeat: Infinity, duration: 6 },
    },
  },
};

interface HeroProps {
  onNext?: () => void;
}

export default function Hero({ onNext }: HeroProps) {
  return (
    <motion.section
      variants={container}
      initial="hidden"
      animate="show"
      className="relative flex min-h-screen h-[100vh] flex-col items-center justify-center px-6 md:px-20 max-w-7xl mx-auto overflow-hidden text-center"
    >
      {/* Interactive graph canvas behind Hero content was moved to page.tsx */}
      <motion.h1 
        variants={floating}
        className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary drop-shadow-[0_0_10px_rgba(0,210,255,0.3)] pb-2"
      >
        {hero.name}
      </motion.h1>
      <motion.div
        variants={floating}
        className="mt-6 flex flex-col items-center min-h-[4rem]"
      >
        <SequentialTypewriter lines={typewriterWords} />
      </motion.div>
      <motion.div
        variants={floating}
        className="mt-16 w-full max-w-md mx-auto"
      >
        {onNext && (
          <button
            onClick={onNext}
            className="group flex flex-col items-center justify-center bg-primary/10 border-2 border-primary/80 text-white w-full px-6 py-5 rounded-xl font-bold uppercase tracking-widest transition-all hover:bg-primary shadow-[0_0_20px_rgba(0,210,255,0.4)] hover:shadow-[0_0_30px_rgba(0,210,255,0.8)] backdrop-blur-md"
          >
            <span className="flex items-center text-xl text-primary group-hover:text-[#030B14]">ENTER GYM ▶</span>
          </button>
        )}
      </motion.div>
    </motion.section>
  );
}