"use client"; // Required for Framer Motion

import { motion } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";

export default function Hero() {
  return (
    <section className="h-screen flex flex-col justify-center px-6 md:px-20 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <span className="text-secondary font-mono tracking-wide">
          Hi, my name is
        </span>
        <h1 className="text-5xl md:text-7xl font-bold mt-4 mb-2 text-white">
          Simon Ocampo Millan.
        </h1>
        <h2 className="text-4xl md:text-6xl font-bold text-text-muted">
          I build intelligent systems.
        </h2>
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="mt-6 max-w-xl text-lg text-text-muted leading-relaxed"
      >
        Undergraduate CS at UCF specializing in 
        <span className="text-primary"> AI & Machine Learning</span>. 
        Currently building scalable RAG pipelines and teaching Graph Algorithms.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="flex gap-4 mt-10"
      >
        <a href="#projects" className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-600 transition-all">
          View Work <ArrowRight size={20} />
        </a>
        <a href="/resume.pdf" className="flex items-center gap-2 border border-white/20 text-white px-6 py-3 rounded-lg font-medium hover:bg-white/10 transition-all">
          Resume <Download size={20} />
        </a>
      </motion.div>
    </section>
  );
}