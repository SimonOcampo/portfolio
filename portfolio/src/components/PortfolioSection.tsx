"use client";

import dynamic from "next/dynamic";
import { MotionConfig } from "framer-motion";
import ChamberNav from "@/components/ChamberNav";
import type { ChamberId } from "@/data/navigation";

function Loading() {
  return <div role="status" className="min-h-80 px-5 py-20 text-center text-sm text-slate-300">Loading section…</div>;
}

const Projects = dynamic(() => import("@/components/Projects"), { loading: Loading });
const Experience = dynamic(() => import("@/components/Experience"), { loading: Loading });
const Education = dynamic(() => import("@/components/Education"), { loading: Loading });
const Involvement = dynamic(() => import("@/components/Involvement"));

interface PortfolioSectionProps {
  chamber: Exclude<ChamberId, "home">;
  onPrevious: () => void;
  onNext: () => void;
}

export default function PortfolioSection({ chamber, onPrevious, onNext }: PortfolioSectionProps) {
  return (
    <MotionConfig reducedMotion="user">
      <div className="flex w-full min-w-0 flex-col items-center">
        {chamber === "projects" && <Projects />}
        {chamber === "experience" && <><Experience /><Involvement /></>}
        {chamber === "skills" && <Education />}
        <ChamberNav
          onPrevious={onPrevious}
          onNext={chamber === "skills" ? undefined : onNext}
          previousLabel={chamber === "skills" ? "Return to battle history" : undefined}
          nextLabel={chamber === "projects" ? "Proceed to battle history" : "Proceed to final stage"}
        />
      </div>
    </MotionConfig>
  );
}
