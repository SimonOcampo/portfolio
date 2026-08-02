"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import SpotlightCard from "@/components/SpotlightCard";
import ProjectModal from "@/components/ProjectModal";
import CinematicImage from "@/components/CinematicImage";
import { projects } from "@/data/projects";
import { sectionTitles } from "@/data/site";

export default function Projects() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selectedProject = projects.find((project) => project.id === selectedId);

  return (
    <section id="projects" aria-labelledby="projects-heading" className="mx-auto w-full min-w-0 max-w-7xl px-5 py-14 sm:px-8 md:py-20 lg:px-12">
      <motion.div initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-8 sm:mb-12">
        <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.28em] text-secondary sm:text-xs">01 / Projects</p>
        <h2 id="projects-heading" className="text-3xl font-black tracking-tight text-primary sm:text-4xl">{sectionTitles.projects.title}</h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-400 sm:text-base">
          Five systems built where AI, full-stack engineering, and real-world workflows collide.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6">
        {projects.map((project, index) => {
          const cover = project.media[0];
          const coverSrc = cover.type === "image" ? cover.src : cover.poster;
          const coverPosition = cover.type === "image" ? cover.position : "center";
          return (
            <motion.button
              key={project.id}
              type="button"
              aria-haspopup="dialog"
              aria-label={`View case study: ${project.title}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06 }}
              onClick={() => setSelectedId(project.id)}
              className={`${project.featured ? "md:col-span-2" : "md:col-span-1"} group flex min-w-0 flex-col gap-2 text-left focus-visible:outline-none`}
            >
              <div className="px-2 font-mono text-[10px] text-secondary sm:text-xs">
                <span className="font-bold text-slate-300">[{project.trainerClass}] {project.trainerName}</span>{" "}
                wants to battle
              </div>

              <SpotlightCard className="h-full flex-grow rounded-2xl p-5 transition-all duration-300 group-hover:-translate-y-1 group-focus-visible:border-primary group-focus-visible:ring-2 group-focus-visible:ring-primary sm:p-7">
                <CinematicImage src={coverSrc} alt={cover.alt} imagePosition={coverPosition} eager={project.featured} className="h-52 rounded-xl sm:h-60" />
                <div className="mt-5 flex h-[calc(100%-15rem)] flex-col">
                  <div className="mb-3 flex items-start justify-between gap-4">
                    <h3 className="text-balance text-xl font-black leading-tight text-white sm:text-2xl">{project.title}</h3>
                    <ArrowUpRight className="mt-1 shrink-0 text-primary/50 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary" size={19} />
                  </div>
                  <p className="text-sm leading-relaxed text-slate-400 sm:text-base">{project.summary}</p>
                  <p className="mt-4 border-l-2 border-secondary/60 pl-3 font-mono text-[10px] leading-relaxed text-secondary sm:text-xs">{project.highlight}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.technologies.slice(0, project.featured ? 7 : 5).map((tag) => (
                      <span key={tag} className="rounded-md border border-white/[0.06] bg-white/[0.035] px-2 py-1 font-mono text-[10px] text-slate-300 sm:text-xs">{tag}</span>
                    ))}
                  </div>
                  <span className="mt-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-primary">View case study <ArrowUpRight size={14} /></span>
                </div>
              </SpotlightCard>
            </motion.button>
          );
        })}
      </div>

      <AnimatePresence>
        {selectedProject && <ProjectModal key={selectedProject.id} selectedProject={selectedProject} onClose={() => setSelectedId(null)} />}
      </AnimatePresence>
    </section>
  );
}
