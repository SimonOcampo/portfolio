"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Hero from "@/components/Hero";
import GraphBackground from "@/components/GraphBackground";
import GymMap from "@/components/GymMap";
import { CHAMBERS, getChamberIndex, type ChamberId } from "@/data/navigation";
import { useHydratedReducedMotion } from "@/hooks/useHydratedReducedMotion";

function SectionLoading() {
  return <div role="status" className="mx-auto min-h-80 w-full max-w-7xl px-5 py-20 text-center text-sm text-slate-300">Loading section…</div>;
}

const PortfolioSection = dynamic(() => import("@/components/PortfolioSection"), { loading: SectionLoading });

export default function Home() {
  const [chamber, setChamber] = useState(0);
  const [homeEntrance, setHomeEntrance] = useState(true);
  const chamberPanelRef = useRef<HTMLDivElement>(null);
  const hasNavigated = useRef(false);
  const shouldReduceMotion = useHydratedReducedMotion();

  useEffect(() => {
    const syncFromLocation = () => {
      const index = getChamberIndex(window.location.hash);
      setChamber(index);
      if (index !== 0) setHomeEntrance(false);
    };
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
    if (nextIndex !== 0) setHomeEntrance(false);
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

  return (
    <main className="portfolio-shell relative w-full overflow-hidden bg-background selection:bg-primary selection:text-background">
      <div aria-hidden className="fixed inset-0 z-0 bg-grid-pattern opacity-60" />
      <GraphBackground />
      <GymMap activeId={CHAMBERS[chamber].id} onNavigate={navigateTo} />
      <p className="sr-only" aria-live="polite" aria-atomic="true">
        {CHAMBERS[chamber].label}: {CHAMBERS[chamber].themedLabel}
      </p>

      <div className="relative z-10 h-full w-full">
          <div
            key={CHAMBERS[chamber].id}
            ref={chamberPanelRef}
            data-chamber-scroll
            data-active="true"
            tabIndex={-1}
            className={`absolute inset-0 h-full w-full overflow-y-auto overflow-x-clip pb-[calc(6.5rem+env(safe-area-inset-bottom))] pt-2 outline-none md:pb-16 md:pt-20 ${chamber !== 0 ? "chamber-enter" : ""}`}
          >
            {chamber === 0 && <Hero onNext={nextChamber} animateEntrance={homeEntrance} />}

            {chamber !== 0 && (
              <PortfolioSection
                chamber={CHAMBERS[chamber].id as Exclude<ChamberId, "home">}
                onPrevious={previousChamber}
                onNext={nextChamber}
              />
            )}
          </div>
      </div>
    </main>
  );
}
