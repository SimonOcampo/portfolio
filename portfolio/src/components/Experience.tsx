"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { experience, type Experience as ExperienceItem } from "@/data/resume";
import { sectionTitles } from "@/data/site";

function ExperienceDetails({ item }: { item: ExperienceItem }) {
  return (
    <div className="min-w-0 space-y-5">
      <div>
        <h3 className="text-balance text-xl font-bold leading-tight text-white sm:text-2xl md:text-3xl">
          {item.title}
        </h3>
        <p className="mt-2 font-mono text-xs uppercase tracking-[0.14em] text-text-muted sm:text-sm">
          {item.startDate} – {item.endDate}
        </p>
      </div>
      <ul className="space-y-3.5">
        {item.bullets.map((bullet) => (
          <li key={bullet} className="flex min-w-0 gap-3 text-sm leading-relaxed text-slate-300 sm:text-base">
            <ArrowRight className="mt-1 shrink-0 text-secondary" size={15} strokeWidth={2.4} />
            <span className="min-w-0">{bullet}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Experience() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selected = experience[selectedIndex];

  return (
    <section
      aria-labelledby="experience-heading"
      className="mx-auto w-full min-w-0 max-w-7xl px-5 py-14 sm:px-8 md:py-20 lg:px-12"
    >
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-8 sm:mb-12"
      >
        <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.28em] text-secondary sm:text-xs">
          02 / Experience
        </p>
        <h2 id="experience-heading" className="text-3xl font-black tracking-tight text-primary sm:text-4xl">
          {sectionTitles.experience.title}
        </h2>
      </motion.div>

      <div className="space-y-3 md:hidden">
        {experience.map((item, index) => {
          const open = index === selectedIndex;
          const panelId = `experience-mobile-panel-${index}`;
          return (
            <div key={item.company} className="overflow-hidden rounded-2xl border border-white/10 bg-surface/72">
              <button
                type="button"
                onClick={() => setSelectedIndex(index)}
                aria-expanded={open}
                aria-controls={panelId}
                className="flex min-h-14 w-full items-center justify-between gap-4 px-5 py-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary"
              >
                <span>
                  <span className={`block text-sm font-bold ${open ? "text-primary" : "text-slate-200"}`}>
                    {item.company}
                  </span>
                  <span className="mt-1 block text-xs text-slate-500">{item.startDate} – {item.endDate}</span>
                </span>
                <ChevronDown className={`shrink-0 transition-transform ${open ? "rotate-180 text-primary" : "text-slate-500"}`} size={19} />
              </button>
              <AnimatePresence initial={false}>
                {open && (
                  <motion.div
                    id={panelId}
                    role="region"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="border-t border-white/8 px-5 py-5">
                      <ExperienceDetails item={item} />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      <div className="hidden min-w-0 grid-cols-[13rem_minmax(0,1fr)] gap-10 md:grid lg:gap-14">
        <div role="tablist" aria-label="Experience" className="flex flex-col border-l border-slate-700/80">
          {experience.map((item, index) => {
            const active = index === selectedIndex;
            return (
              <button
                key={item.company}
                id={`experience-tab-${index}`}
                role="tab"
                type="button"
                aria-selected={active}
                aria-controls={`experience-panel-${index}`}
                onClick={() => setSelectedIndex(index)}
                className={`-ml-px min-h-12 border-l-2 px-4 py-3 text-left text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                  active
                    ? "border-secondary bg-secondary/[0.07] text-secondary"
                    : "border-transparent text-slate-400 hover:bg-white/[0.035] hover:text-white"
                }`}
              >
                {item.company}
              </button>
            );
          })}
        </div>

        <div className="min-w-0 rounded-2xl border border-white/[0.07] bg-[#071526]/72 p-7 lg:p-9">
          <AnimatePresence mode="wait">
            <motion.div
              key={selected.company}
              id={`experience-panel-${selectedIndex}`}
              role="tabpanel"
              aria-labelledby={`experience-tab-${selectedIndex}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <ExperienceDetails item={selected} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
