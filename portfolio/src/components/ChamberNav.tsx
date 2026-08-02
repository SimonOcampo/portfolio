"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";

interface ChamberNavProps {
  onPrevious?: () => void;
  onNext?: () => void;
  previousLabel?: string;
  nextLabel?: string;
}

export default function ChamberNav({
  onPrevious,
  onNext,
  previousLabel = "Retreat",
  nextLabel = "Proceed deeper",
}: ChamberNavProps) {
  return (
    <nav
      aria-label="Chamber navigation"
      className="mx-auto mt-10 flex w-full max-w-xl flex-col-reverse gap-3 px-5 pb-8 sm:flex-row sm:items-center sm:justify-center sm:gap-5"
    >
      {onPrevious && (
        <button
          type="button"
          onClick={onPrevious}
          className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-5 py-3 font-mono text-xs uppercase tracking-[0.16em] text-slate-300 transition-colors hover:border-white/25 hover:bg-white/[0.06] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:w-auto"
        >
          <ArrowLeft size={16} />
          {previousLabel}
        </button>
      )}
      {onNext && (
        <button
          type="button"
          onClick={onNext}
          className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl border border-primary/60 bg-primary/12 px-6 py-3 text-sm font-bold uppercase tracking-[0.14em] text-white shadow-[0_0_24px_rgba(0,210,255,0.12)] transition-all hover:border-primary hover:bg-primary hover:text-background hover:shadow-[0_0_30px_rgba(0,210,255,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:w-auto"
        >
          {nextLabel}
          <ArrowRight size={17} />
        </button>
      )}
    </nav>
  );
}
