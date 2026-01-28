"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { X, Github, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import type { Project } from "@/data/projects";
import { projectModal } from "@/data/site";
import CinematicImage from "@/components/CinematicImage";

interface ImageCarouselProps {
  images: string[];
  altPrefix: string;
}

function ImageCarousel({ images, altPrefix }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goNext = () => {
    setCurrentIndex((i) => (i + 1) % images.length);
  };
  const goPrev = () => {
    setCurrentIndex((i) => (i - 1 + images.length) % images.length);
  };

  if (!images.length) {
    return (
      <div className="aspect-video w-full bg-slate-600 rounded-t-2xl flex items-center justify-center">
        <span className="text-white/50 text-sm">No image</span>
      </div>
    );
  }

  const showNav = images.length > 1;

  return (
    <div className="relative overflow-hidden rounded-t-2xl bg-white/5">
      <CinematicImage
        src={images[currentIndex]}
        alt={`${altPrefix} — image ${currentIndex + 1} of ${images.length}`}
        className="rounded-none h-56 md:h-72"
      />
      {showNav && (
        <>
          <button
            type="button"
            onClick={goPrev}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-20 rounded-full p-2 bg-black/50 hover:bg-black/70 text-white transition-colors"
            aria-label="Previous image"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            type="button"
            onClick={goNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-20 rounded-full p-2 bg-black/50 hover:bg-black/70 text-white transition-colors"
            aria-label="Next image"
          >
            <ChevronRight size={24} />
          </button>
          <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 z-20">
            {images.map((_, i) => (
              <span
                key={i}
                className={`h-2 w-2 rounded-full transition-colors ${
                  i === currentIndex ? "bg-white" : "bg-white/40"
                }`}
                aria-hidden
              />
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
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      <div
        role="presentation"
        className="absolute inset-0 bg-black/70"
        onClick={onClose}
      />
      <motion.article
        initial={{ scale: 0.96 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.2 }}
        className="relative z-10 w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl border border-white/10 bg-surface/95 shadow-2xl backdrop-blur-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 rounded-full p-2 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
          aria-label="Close"
        >
          <X size={22} />
        </button>

        {/* Image area: wide diagram = horizontal scroll; else carousel */}
        {selectedProject.isWide && selectedProject.images?.[0] ? (
          <div className="w-full h-[400px] overflow-x-auto overflow-y-hidden rounded-xl border border-white/10 bg-neutral-900 flex items-center bg-grid-white/[0.05]">
            <img
              src={selectedProject.images[0]}
              alt={selectedProject.title}
              className="h-full w-auto max-w-none object-contain"
            />
          </div>
        ) : (
          <ImageCarousel
            key={selectedProject.id}
            images={selectedProject.images ?? []}
            altPrefix={selectedProject.title}
          />
        )}

        <div className="p-8">
          <h2 className="text-2xl font-bold text-white">{selectedProject.title}</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {selectedProject.technologies.map((tag) => (
              <span
                key={tag}
                className="text-xs font-mono rounded bg-white/10 px-2 py-1 text-white/80"
              >
                {tag}
              </span>
            ))}
          </div>
          <p className="mt-6 leading-relaxed text-text-muted">
            {selectedProject.longDesc}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {selectedProject.githubUrl && (
              <a
                href={selectedProject.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/5 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/10"
              >
                <Github size={18} />
                {projectModal.viewCode}
              </a>
            )}
            {selectedProject.liveUrl && (
              <a
                href={selectedProject.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/5 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/10"
              >
                <ExternalLink size={18} />
                {projectModal.liveDemo}
              </a>
            )}
          </div>
        </div>
      </motion.article>
    </motion.div>
  );
}
