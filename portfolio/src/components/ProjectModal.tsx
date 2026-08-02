"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { X, Github, ExternalLink, ChevronLeft, ChevronRight, CheckCircle2 } from "lucide-react";
import FullscreenDialog from "@/components/FullscreenDialog";
import type { Project, ProjectMedia } from "@/data/projects";
import { projectModal } from "@/data/site";

function MediaViewer({ media, title }: { media: ProjectMedia[]; title: string }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const current = media[currentIndex];
  const showNav = media.length > 1;

  return (
    <div className="relative overflow-hidden border-b border-white/10 bg-[#02070d]">
      <div className="relative flex h-60 items-center justify-center sm:h-[clamp(18rem,42dvh,24rem)]">
        {current.type === "video" ? (
          <video controls preload="metadata" poster={current.poster} aria-label={current.alt} className="max-h-full max-w-full">
            <source src={current.src} type="video/webm" />
          </video>
        ) : (
          <Image
            src={current.src}
            alt={current.alt}
            fill
            sizes="(max-width: 768px) 100vw, 896px"
            quality={84}
            unoptimized={current.src.endsWith(".gif")}
            className={`object-contain ${current.position === "left-top" ? "object-left-top" : current.position === "top" ? "object-top" : "object-center"}`}
          />
        )}
      </div>

      {showNav && (
        <>
          <button type="button" onClick={() => setCurrentIndex((index) => (index - 1 + media.length) % media.length)} className="absolute left-2 top-1/2 z-20 grid size-11 -translate-y-1/2 place-items-center rounded-full border border-white/10 bg-black/65 text-white backdrop-blur transition-colors hover:bg-black/85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" aria-label="Previous media">
            <ChevronLeft size={23} />
          </button>
          <button type="button" onClick={() => setCurrentIndex((index) => (index + 1) % media.length)} className="absolute right-2 top-1/2 z-20 grid size-11 -translate-y-1/2 place-items-center rounded-full border border-white/10 bg-black/65 text-white backdrop-blur transition-colors hover:bg-black/85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" aria-label="Next media">
            <ChevronRight size={23} />
          </button>
          <div className="absolute inset-x-0 bottom-3 z-20 flex justify-center gap-1.5" aria-label={`${title} media ${currentIndex + 1} of ${media.length}`}>
            {media.map((item, index) => (
              <button key={item.src} type="button" onClick={() => setCurrentIndex(index)} aria-label={`Show media ${index + 1}`} aria-current={index === currentIndex ? "true" : undefined} className={`h-2 rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${index === currentIndex ? "w-6 bg-primary" : "w-2 bg-white/35 hover:bg-white/60"}`} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

interface ProjectModalProps {
  selectedProject: Project;
  onClose: () => void;
}

export default function ProjectModal({ selectedProject, onClose }: ProjectModalProps) {
  const headingId = `project-${selectedProject.id}-title`;

  return (
    <FullscreenDialog
      onClose={onClose}
      labelledBy={headingId}
      contentClassName="flex h-full items-center justify-center p-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-[max(0.5rem,env(safe-area-inset-top))] sm:p-5"
    >
      <motion.article
        initial={{ opacity: 0, scale: 0.975, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.98, y: 8 }}
        transition={{ duration: 0.2 }}
        className="relative max-h-full w-full max-w-4xl overflow-y-auto overscroll-contain rounded-2xl border border-white/12 bg-[#091a2e]/98 shadow-[0_24px_90px_rgba(0,0,0,0.7),0_0_40px_rgba(0,210,255,0.1)]"
      >
        <button type="button" onClick={onClose} className="absolute right-3 top-3 z-30 grid size-11 place-items-center rounded-full border border-white/10 bg-black/65 text-white/75 backdrop-blur transition-colors hover:bg-black hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" aria-label="Close project case study">
          <X size={21} />
        </button>

        <MediaViewer media={selectedProject.media} title={selectedProject.title} />

        <div className="p-5 sm:p-8 lg:p-10">
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-primary/70">Case study // {selectedProject.trainerClass}</p>
          <h2 id={headingId} className="mt-2 text-balance text-2xl font-black leading-tight text-white sm:text-3xl">{selectedProject.title}</h2>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-text-muted sm:text-lg">{selectedProject.summary}</p>

          <div className="mt-6 flex flex-wrap gap-2">
            {selectedProject.technologies.map((tag) => (
              <span key={tag} className="rounded-md border border-white/[0.07] bg-white/[0.045] px-2.5 py-1.5 font-mono text-[10px] text-slate-300 sm:text-xs">{tag}</span>
            ))}
          </div>

          <div className="mt-9 grid gap-7 lg:grid-cols-2 lg:gap-10">
            <div className="space-y-7">
              <section>
                <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-secondary">Problem</p>
                <p className="mt-2 text-sm leading-relaxed text-slate-300 sm:text-base">{selectedProject.caseStudy.problem}</p>
              </section>
              <section>
                <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-secondary">Approach</p>
                <p className="mt-2 text-sm leading-relaxed text-slate-300 sm:text-base">{selectedProject.caseStudy.approach}</p>
              </section>
            </div>

            <section className="rounded-2xl border border-primary/15 bg-primary/[0.045] p-5 sm:p-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-primary">Outcomes</p>
              <ul className="mt-4 space-y-3">
                {selectedProject.caseStudy.outcomes.map((outcome) => (
                  <li key={outcome} className="flex gap-3 text-sm leading-relaxed text-slate-200">
                    <CheckCircle2 className="mt-0.5 shrink-0 text-primary" size={17} />
                    {outcome}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <div className="mt-9 flex flex-col gap-3 border-t border-white/10 pt-6 sm:flex-row">
            {selectedProject.githubUrl && (
              <a href={selectedProject.githubUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/[0.04] px-5 text-sm font-bold text-white transition-colors hover:bg-white/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                <Github size={18} /> {projectModal.viewCode}
              </a>
            )}
            {selectedProject.liveUrl && (
              <a href={selectedProject.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-primary/40 bg-primary/10 px-5 text-sm font-bold text-primary transition-colors hover:bg-primary hover:text-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                <ExternalLink size={18} /> {projectModal.liveDemo}
              </a>
            )}
          </div>
        </div>
      </motion.article>
    </FullscreenDialog>
  );
}
