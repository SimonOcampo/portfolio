"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Hero from "@/components/Hero";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Education from "@/components/Education";
import Involvement from "@/components/Involvement";
import GraphBackground from "@/components/GraphBackground";
import GymMap from "@/components/GymMap";
import ChamberNav from "@/components/ChamberNav";
import { CHAMBERS, getChamberIndex, type ChamberId } from "@/data/navigation";
import { useHydratedReducedMotion } from "@/hooks/useHydratedReducedMotion";

export default function Home() {
  const [chamber, setChamber] = useState(0);
  const chamberPanelRef = useRef<HTMLDivElement>(null);
  const hasNavigated = useRef(false);
  const shouldReduceMotion = useHydratedReducedMotion();

  useEffect(() => {
    const syncFromLocation = () => setChamber(getChamberIndex(window.location.hash));
    syncFromLocation();
    window.addEventListener("popstate", syncFromLocation);
    window.addEventListener("hashchange", syncFromLocation);
    return () => {
      window.removeEventListener("popstate", syncFromLocation);
      window.removeEventListener("hashchange", syncFromLocation);
    };
  }, []);

  useEffect(() => {
    const panel = chamberPanelRef.current;
    if (!panel) return;

    panel.scrollTop = 0;
    if (!hasNavigated.current) {
      hasNavigated.current = true;
      return;
    }

    const focusTimer = window.setTimeout(
      () => chamberPanelRef.current?.focus({ preventScroll: true }),
      shouldReduceMotion ? 0 : 380
    );
    return () => window.clearTimeout(focusTimer);
  }, [chamber, shouldReduceMotion]);

  const navigateTo = useCallback((id: ChamberId) => {
    const nextIndex = CHAMBERS.findIndex((item) => item.id === id);
    if (nextIndex < 0) return;
    setChamber(nextIndex);
    if (window.location.hash !== `#${id}`) {
      window.history.pushState(null, "", `#${id}`);
    }
  }, []);

  const nextChamber = () => {
    const next = CHAMBERS[Math.min(chamber + 1, CHAMBERS.length - 1)];
    navigateTo(next.id);
  };

  const previousChamber = () => {
    const previous = CHAMBERS[Math.max(chamber - 1, 0)];
    navigateTo(previous.id);
  };

  const transition = shouldReduceMotion
    ? { duration: 0 }
    : { type: "tween" as const, duration: 0.34, ease: "easeOut" as const };

  const variants = shouldReduceMotion
    ? { initial: { opacity: 1 }, in: { opacity: 1 }, out: { opacity: 1 } }
    : {
        initial: { opacity: 0, x: 28 },
        in: { opacity: 1, x: 0 },
        out: { opacity: 0, x: -24 },
      };

  return (
    <main className="portfolio-shell relative w-full overflow-hidden bg-background selection:bg-primary selection:text-background">
      <div aria-hidden className="fixed inset-0 z-0 bg-grid-pattern opacity-60" />
      <GraphBackground />
      <GymMap activeId={CHAMBERS[chamber].id} onNavigate={navigateTo} />
      <p className="sr-only" aria-live="polite" aria-atomic="true">
        {CHAMBERS[chamber].label}: {CHAMBERS[chamber].themedLabel}
      </p>

      <div className="relative z-10 h-full w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={CHAMBERS[chamber].id}
            ref={chamberPanelRef}
            data-chamber-scroll
            data-active="true"
            tabIndex={-1}
            initial="initial"
            animate="in"
            exit="out"
            variants={variants}
            transition={transition}
            className="absolute inset-0 h-full w-full overflow-y-auto overflow-x-clip pb-[calc(6.5rem+env(safe-area-inset-bottom))] pt-2 outline-none md:pb-16 md:pt-20"
          >
            {chamber === 0 && <Hero onNext={nextChamber} />}

            {chamber === 1 && (
              <div className="flex w-full min-w-0 flex-col items-center">
                <Projects />
                <ChamberNav
                  onPrevious={previousChamber}
                  onNext={nextChamber}
                  nextLabel="Proceed to battle history"
                />
              </div>
            )}

            {chamber === 2 && (
              <div className="flex w-full min-w-0 flex-col items-center">
                <Experience />
                <Involvement />
                <ChamberNav
                  onPrevious={previousChamber}
                  onNext={nextChamber}
                  nextLabel="Proceed to final stage"
                />
              </div>
            )}

            {chamber === 3 && (
              <div className="flex w-full min-w-0 flex-col items-center">
                <Education />
                <ChamberNav
                  onPrevious={previousChamber}
                  previousLabel="Return to battle history"
                />
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </main>
  );
}
