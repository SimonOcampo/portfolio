"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { experience } from "@/data/resume";
import { sectionTitles } from "@/data/site";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Experience() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selected = experience[selectedIndex];

  return (
    <section id="experience" className={`${inter.className} px-6 py-24 max-w-7xl mx-auto`}>
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-12 text-3xl font-bold text-white flex items-center gap-3"
      >
        <span className="text-secondary">{sectionTitles.experience.num}.</span> {sectionTitles.experience.title}
      </motion.h2>

      <div className="flex flex-col sm:flex-row gap-8 sm:gap-12">
        {/* Left: company tabs */}
        <nav
          className="flex sm:flex-col gap-0 border-b border-slate-700/80 sm:border-b-0 sm:border-l border-slate-700/80 sm:pl-0 overflow-x-auto pb-4 sm:pb-0 sm:min-w-[200px]"
          aria-label="Experience"
        >
          {experience.map((item, i) => (
            <button
              key={item.company}
              onClick={() => setSelectedIndex(i)}
              className={`
                text-left px-4 py-3 sm:py-2.5 whitespace-nowrap
                font-medium transition-colors
                border-l-2 -mb-px sm:mb-0 sm:-ml-px
                ${
                  i === selectedIndex
                    ? "border-secondary text-secondary bg-secondary/5"
                    : "border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                }
              `}
            >
              {item.company}
            </button>
          ))}
        </nav>

        {/* Right: detail view */}
        <div className="flex-1 min-w-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={selected.company}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="space-y-4"
            >
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-white">
                  {selected.title}
                </h3>
                <p className="text-text-muted mt-1">
                  {selected.startDate} – {selected.endDate}
                </p>
              </div>

              <ul className="space-y-3">
                {selected.bullets.map((bullet, i) => (
                  <li
                    key={i}
                    className="flex gap-3 text-slate-300 leading-relaxed"
                  >
                    <span className="flex-shrink-0 mt-1.5 text-secondary">
                      <ArrowRight size={14} strokeWidth={2.5} />
                    </span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
