"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TiltCard from "@/components/TiltCard";
import SpotlightCard from "@/components/SpotlightCard";
import ProjectModal from "@/components/ProjectModal";
import CinematicImage from "@/components/CinematicImage";
import { projects } from "@/data/projects";
import { sectionTitles } from "@/data/site";

const BENTO_SIZE = ["md:col-span-2", "md:col-span-1", "md:col-span-1", "md:col-span-2"] as const;

export default function Projects() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selectedProject = projects.find((p) => p.id === selectedId);

  return (
    <section id="projects" className="px-6 py-24 max-w-7xl mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-12 text-3xl font-bold text-white flex items-center gap-3"
      >
        <span className="text-primary">{sectionTitles.projects.num}.</span> {sectionTitles.projects.title}
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {projects.map((project, i) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className={`${BENTO_SIZE[i] ?? "md:col-span-1"} cursor-pointer`}
            onClick={() => setSelectedId(project.id)}
          >
            <TiltCard className="h-full">
              <SpotlightCard className="h-full p-8 rounded-2xl">
              <div className="w-full overflow-hidden rounded-lg bg-white/5 relative mb-4">
                {project.images?.[0] ? (
                  <CinematicImage
                    src={project.images[0]}
                    alt={project.title}
                    alignLeft={project.isWide}
                    className="rounded-none h-64"
                  />
                ) : (
                  <div className="h-64 bg-slate-600" />
                )}
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">
                {project.title}
              </h3>
              <p className="text-text-muted mb-6">{project.shortDesc}</p>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-mono bg-white/5 text-white/80 px-2 py-1 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </SpotlightCard>
            </TiltCard>
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