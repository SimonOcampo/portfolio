"use client";

import {
  BriefcaseBusiness,
  Compass,
  GraduationCap,
  History,
} from "lucide-react";
import { CHAMBERS, type ChamberId } from "@/data/navigation";
const MOBILE_ICONS = [Compass, BriefcaseBusiness, History, GraduationCap] as const;

interface GymMapProps {
  activeId: ChamberId;
  onNavigate: (id: ChamberId) => void;
}

export default function GymMap({ activeId, onNavigate }: GymMapProps) {
  return (
    <>
      <nav
        aria-label="Gym map"
        className="fixed left-1/2 top-4 z-40 hidden w-fit max-w-[94vw] -translate-x-1/2 items-center gap-2 rounded-2xl border border-primary/20 bg-[#06111f]/90 px-3 py-2 shadow-[0_16px_60px_rgba(0,0,0,0.45),0_0_30px_rgba(0,210,255,0.08)] backdrop-blur-xl md:flex"
      >
        <div className="flex items-center gap-1">
          {CHAMBERS.map((item, index) => {
            const active = item.id === activeId;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onNavigate(item.id)}
                aria-current={active ? "page" : undefined}
                className={`relative inline-flex min-h-11 items-center rounded-xl px-3 py-2 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background lg:px-4 ${
                  active
                    ? "bg-primary/12 text-white"
                    : "text-slate-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                <span className="mr-2 font-mono text-[10px] text-primary/70">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {item.label}
                {active && (
                  <span className="absolute inset-x-3 -bottom-0.5 h-px bg-primary shadow-[0_0_8px_rgba(0,210,255,0.9)]" />
                )}
              </button>
            );
          })}
        </div>

      </nav>

      <nav
        aria-label="Gym map"
        className="fixed inset-x-3 bottom-[max(0.75rem,env(safe-area-inset-bottom))] z-40 grid grid-cols-4 rounded-2xl border border-primary/25 bg-[#06111f]/94 p-1.5 shadow-[0_18px_70px_rgba(0,0,0,0.65),0_0_24px_rgba(0,210,255,0.12)] backdrop-blur-xl md:hidden"
      >
        {CHAMBERS.map((item, index) => {
          const Icon = MOBILE_ICONS[index];
          const active = item.id === activeId;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onNavigate(item.id)}
              aria-current={active ? "page" : undefined}
              className={`flex min-h-12 flex-col items-center justify-center gap-1 rounded-xl px-1 py-1.5 font-mono text-[9px] uppercase tracking-[0.12em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                active ? "bg-primary/14 text-primary" : "text-slate-400"
              }`}
            >
              <Icon size={17} strokeWidth={active ? 2.4 : 1.8} />
              {item.shortLabel}
            </button>
          );
        })}
      </nav>
    </>
  );
}
