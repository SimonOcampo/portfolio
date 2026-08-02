"use client";

import { motion } from "framer-motion";
import SpotlightCard from "@/components/SpotlightCard";
import { involvement } from "@/data/resume";
import { sectionTitles } from "@/data/site";

export default function Involvement() {
  return (
    <section aria-labelledby="involvement-heading" className="mx-auto w-full min-w-0 max-w-7xl px-5 py-14 sm:px-8 md:py-20 lg:px-12">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-8 sm:mb-12"
      >
        <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.28em] text-secondary sm:text-xs">03 / Involvement</p>
        <h2 id="involvement-heading" className="text-3xl font-black tracking-tight text-primary sm:text-4xl">{sectionTitles.involvement.title}</h2>
      </motion.div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-7">
        {involvement.map((item, i) => (
          <motion.div
            key={item.org}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <SpotlightCard className="h-full rounded-2xl p-5 sm:p-7 lg:p-8">
              <h3 className="text-xl font-bold text-secondary">{item.org}</h3>
              <p className="mt-1 text-lg font-medium text-white">{item.role}</p>
              <p className="mt-1 text-sm text-text-muted">
                {item.startDate} – {item.endDate}
              </p>
              <ul className="mt-4 space-y-2">
                {item.bullets.map((bullet, j) => (
                  <li
                    key={j}
                    className="text-text-muted text-sm leading-relaxed list-disc list-inside"
                  >
                    {bullet}
                  </li>
                ))}
              </ul>
            </SpotlightCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
