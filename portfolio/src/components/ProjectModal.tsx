"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { X, Github, ExternalLink } from "lucide-react";
import type { Project } from "@/data/projects";
import { projectModal } from "@/data/site";

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
        className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-hidden rounded-2xl border border-white/10 bg-surface/95 shadow-2xl backdrop-blur-xl"
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

        {/* Cover image */}
        <div className="aspect-video w-full overflow-hidden bg-white/5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={selectedProject.image}
            alt=""
            className="h-full w-full object-cover"
          />
        </div>

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
