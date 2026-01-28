"use client";

import { motion } from "framer-motion";
import { ArrowRight, Download, Github, Linkedin } from "lucide-react";
import TextScramble from "@/components/TextScramble";
import MagneticButton from "@/components/MagneticButton";
import { hero, linkLabels } from "@/data/site";
import { GITHUB_URL, LINKEDIN_URL } from "@/data/links";

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
      <h1 className="text-5xl md:text-7xl font-bold text-white">
        <TextScramble text={hero.name} />
      </h1>
      <motion.h2
        variants={fadeIn}
        transition={{ duration: 0.4 }}
        className="mt-4 text-xl md:text-2xl text-text-muted"
      >
        {hero.subheadline}
      </motion.h2>
      <motion.div
        variants={fadeIn}
        transition={{ duration: 0.4 }}
        className="mt-10 flex flex-wrap gap-4"
      >
        <a
          href={hero.ctaWorkHref}
          className="flex items-center gap-2 bg-primary px-6 py-3 rounded-lg font-medium text-white transition-colors hover:bg-primary/90"
        >
          {hero.ctaWork} <ArrowRight size={20} />
        </a>
        <MagneticButton>
          <a
            href={hero.ctaResumeHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 border border-white/20 px-6 py-3 rounded-lg font-medium text-white transition-colors hover:bg-white/10"
          >
            {hero.ctaResume} <Download size={20} />
          </a>
        </MagneticButton>
        <a
          href={GITHUB_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 border border-white/20 px-6 py-3 rounded-lg font-medium text-white transition-colors hover:bg-white/10"
        >
          GitHub <Github size={20} />
        </a>
        <a
          href={LINKEDIN_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 border border-white/20 px-6 py-3 rounded-lg font-medium text-white transition-colors hover:bg-white/10"
        >
          {linkLabels.linkedin} <Linkedin size={20} />
        </a>
      </motion.div>
    </motion.section>
  );
}