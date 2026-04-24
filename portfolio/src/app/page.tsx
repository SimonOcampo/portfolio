"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Hero from "@/components/Hero";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Education from "@/components/Education";
import Involvement from "@/components/Involvement";
import GraphBackground from "@/components/GraphBackground";

const pageVariants = {
  initial: { opacity: 0, x: 50, scale: 0.95 },
  in: { opacity: 1, x: 0, scale: 1 },
  out: { opacity: 0, x: -50, scale: 0.95 },
};

const pageTransition = {
  type: "tween" as const,
  duration: 0.8,
};

export default function Home() {
  const [chamber, setChamber] = useState(0);

  const nextChamber = () => setChamber((prev) => Math.min(prev + 1, 3));
  const prevChamber = () => setChamber((prev) => Math.max(prev - 1, 0));

  return (
    <main className="relative h-screen w-screen overflow-hidden selection:bg-primary selection:text-white bg-background">
      {/* Persistent HD-2D Background */}
      <div aria-hidden className="fixed inset-0 z-[0] bg-grid-pattern opacity-60" />
      <GraphBackground />

      {/* Cinematic Chamber Transition Engine */}
      <div className="relative z-10 w-full h-full">
        <AnimatePresence mode="wait">
          {chamber === 0 && (
            <motion.div
              key="chamber-0"
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
              className="absolute inset-0 w-full h-full overflow-y-auto overflow-x-hidden"
            >
              <Hero onNext={nextChamber} />
            </motion.div>
          )}

          {chamber === 1 && (
            <motion.div
              key="chamber-1"
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
              className="absolute inset-0 w-full h-full overflow-y-auto overflow-x-hidden pt-12 pb-24"
            >
              <div className="w-full flex flex-col items-center">
                <Projects />
                <div className="mt-8 flex gap-6 pb-12">
                  <button onClick={prevChamber} className="px-6 py-3 font-mono text-sm text-text-muted hover:text-white transition-colors">
                    [◀ RETREAT]
                  </button>
                  <button onClick={nextChamber} className="px-8 py-3 bg-primary/20 border-2 border-primary/50 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(0,210,255,0.2)] hover:bg-primary hover:text-background hover:shadow-[0_0_30px_rgba(0,210,255,0.7)] backdrop-blur-md transition-all uppercase tracking-widest">
                    Proceed Deeper ▶
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {chamber === 2 && (
            <motion.div
              key="chamber-2"
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
              className="absolute inset-0 w-full h-full overflow-y-auto overflow-x-hidden pt-12 pb-24"
            >
              <div className="w-full flex flex-col items-center">
                <Experience />
                <Involvement />
                
                {/* Chamber Proceed Button */}
                <div className="mt-16 flex gap-6">
                  <button onClick={prevChamber} className="px-6 py-3 font-mono text-sm text-text-muted hover:text-white transition-colors">
                    [◀ RETREAT]
                  </button>
                  <button onClick={nextChamber} className="px-8 py-3 bg-primary/20 border-2 border-primary/50 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(0,210,255,0.2)] hover:bg-primary hover:text-background hover:shadow-[0_0_30px_rgba(0,210,255,0.7)] backdrop-blur-md transition-all uppercase tracking-widest">
                    ▶ Proceed to Final Stage
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {chamber === 3 && (
            <motion.div
              key="chamber-3"
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
              className="absolute inset-0 w-full h-full overflow-y-auto overflow-x-hidden flex flex-col pt-12 pb-24"
            >
              <Education />
              <div className="mt-12 flex justify-center w-full">
                <button onClick={prevChamber} className="px-6 py-3 font-mono text-sm text-text-muted hover:text-white transition-colors">
                  [◀ RETURN to Shallow Waters]
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
