"use client";

import { useEffect, useId, useRef, useState } from "react";
import { ArrowUpRight, ChevronDown, FileText } from "lucide-react";
import { RESUMES } from "@/data/links";

export default function ResumeMenu() {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;
    const frame = window.requestAnimationFrame(() => panelRef.current?.scrollIntoView({ block: "nearest", behavior: "instant" }));

    const closeOutside = (event: PointerEvent) => {
      if (event.target instanceof Node && !containerRef.current?.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("pointerdown", closeOutside);
    return () => {
      window.cancelAnimationFrame(frame);
      document.removeEventListener("pointerdown", closeOutside);
    };
  }, [open]);

  return (
    <div
      ref={containerRef}
      className="relative"
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
      }}
      onKeyDown={(event) => {
        if (event.key === "Escape" && open) {
          event.preventDefault();
          setOpen(false);
          buttonRef.current?.focus();
        }
      }}
    >
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
        className="inline-flex min-h-14 w-full items-center justify-center gap-3 rounded-xl border border-white/15 bg-white/[0.04] px-6 py-4 text-sm font-bold uppercase tracking-[0.14em] text-white transition-colors hover:border-white/30 hover:bg-white/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      >
        <FileText size={18} aria-hidden="true" />
        Résumé
        <ChevronDown size={15} aria-hidden="true" className={`transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      <div
        ref={panelRef}
        id={panelId}
        hidden={!open}
        className="absolute inset-x-0 top-full z-30 mt-2 scroll-mb-28 rounded-2xl border border-primary/25 bg-[#091a2e] p-2 text-left shadow-[0_16px_48px_rgba(0,0,0,0.5)] sm:left-auto sm:w-80 md:scroll-mb-4"
      >
        <p className="px-3 pb-2 pt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-primary/75">Choose your focus</p>
        {RESUMES.map((resume) => (
          <a
            key={resume.href}
            href={resume.href}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              setOpen(false);
              buttonRef.current?.focus({ preventScroll: true });
            }}
            className="group flex items-start gap-3 rounded-xl px-3 py-3 text-white transition-colors hover:bg-primary/10 focus-visible:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <span className="min-w-0 flex-1">
              <span className="block text-sm font-semibold group-hover:text-primary">{resume.title}</span>
              <span className="mt-1 block text-xs leading-relaxed text-slate-400">{resume.description}</span>
              <span className="sr-only"> (PDF, opens in a new tab)</span>
            </span>
            <ArrowUpRight size={16} className="mt-0.5 shrink-0 text-primary/70" aria-hidden="true" />
          </a>
        ))}
      </div>
    </div>
  );
}
