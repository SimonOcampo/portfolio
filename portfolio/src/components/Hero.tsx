"use client";

import { motion } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";
import TextScramble from "@/components/TextScramble";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
};

const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
};

export default function Hero() {
  return (
    <motion.section
      variants={container}
      initial="hidden"
      animate="show"
      className="flex min-h-screen flex-col justify-center px-6 md:px-20 max-w-7xl mx-auto"
    >
      <motion.h1
        variants={fadeIn}
        transition={{ duration: 0.4 }}
        className="text-5xl md:text-7xl font-bold text-white"
      >
        <TextScramble text="Simon Ocampo Millan" />
      </motion.h1>
      <motion.p
        variants={fadeIn}
        transition={{ duration: 0.4 }}
        className="mt-4 text-xl md:text-2xl text-text-muted"
      >
        Founder @ SimX AI · CS Student @ UCF
      </motion.p>
      <motion.div
        variants={fadeIn}
        transition={{ duration: 0.4 }}
        className="mt-10 flex gap-4"
      >
        <a
          href="#projects"
          className="flex items-center gap-2 bg-primary px-6 py-3 rounded-lg font-medium text-white transition-colors hover:bg-primary/90"
        >
          View Work <ArrowRight size={20} />
        </a>
        <a
          href="/Resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 border border-white/20 px-6 py-3 rounded-lg font-medium text-white transition-colors hover:bg-white/10"
        >
          Resume <Download size={20} />
        </a>
      </motion.div>
    </motion.section>
  );
}