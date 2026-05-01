"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SpotlightCard from "@/components/SpotlightCard";
import ProjectModal from "@/components/ProjectModal";
import CinematicImage from "@/components/CinematicImage";
import { projects } from "@/data/projects";
import { sectionTitles } from "@/data/site";

const BENTO_SIZE = [
  "md:col-span-2",
  "md:col-span-1",
  "md:col-span-1",
  "md:col-span-2",
] as const;

export default function Projects() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selectedProject = projects.find((project) => project.id === selectedId);

  return (
    <section id="projects" className="mx-auto max-w-7xl px-6 py-24">
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-12 flex items-center gap-3 text-3xl font-bold text-primary"
      >
        {sectionTitles.projects.title}
      </motion.h2>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className={`${BENTO_SIZE[index] ?? "md:col-span-1"} flex cursor-pointer flex-col gap-2`}
            onClick={() => setSelectedId(project.id)}
          >
            <div className="px-2 font-mono text-xs text-secondary md:text-sm">
              <span className="font-bold text-white">
                [{project.trainerClass}] {project.trainerName}
              </span>{" "}
              wants to battle!
            </div>

            <SpotlightCard className="h-full flex-grow rounded-2xl p-8 transition-transform duration-300 hover:-translate-y-1">
              <div className="relative mb-4 w-full overflow-hidden rounded-lg bg-white/5">
                {project.images?.[0] ? (
                  <CinematicImage
                    src={project.images[0]}
                    alt={project.title}
                    alignLeft={project.isWide}
                    imagePosition={project.imagePosition}
                    className="h-64 rounded-none"
                  />
                ) : (
                  <div className="h-64 bg-slate-600" />
                )}
              </div>

              <h3 className="mb-2 text-2xl font-bold text-white">
                {project.title}
              </h3>
              <p className="mb-6 text-text-muted">{project.shortDesc}</p>

              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tag) => (
                  <span
                    key={tag}
                    className="rounded bg-white/5 px-2 py-1 font-mono text-xs text-white/80"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </SpotlightCard>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            key={selectedProject.id}
            selectedProject={selectedProject}
            onClose={() => setSelectedId(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
