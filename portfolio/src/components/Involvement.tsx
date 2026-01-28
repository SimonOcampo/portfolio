"use client";

import { motion } from "framer-motion";
import SpotlightCard from "@/components/SpotlightCard";
import { involvement } from "@/data/resume";

export default function Involvement() {
  return (
    <section className="px-6 py-24 max-w-7xl mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-12 text-3xl font-bold text-white flex items-center gap-3"
      >
        <span className="text-secondary">03.</span> Leadership & Involvement
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {involvement.map((item, i) => (
          <motion.div
            key={item.org}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <SpotlightCard className="h-full p-8 rounded-2xl">
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
