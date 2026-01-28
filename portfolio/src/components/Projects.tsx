"use client";

import { motion } from "framer-motion";
import SpotlightCard from "@/components/SpotlightCard";

const projects = [
  {
    title: "AI Document Assistant",
    desc: "RAG pipeline for technical docs with vector embeddings.",
    tags: ["Python", "OpenAI"],
    size: "md:col-span-2",
  },
  {
    title: "KnightHaven Events",
    desc: "Full-stack event platform for UCF students.",
    tags: ["LAMP", "PHP"],
    size: "md:col-span-1",
  },
  {
    title: "Autonomous Robot",
    desc: "ESP32-CAM chassis with obstacle avoidance.",
    tags: ["C++", "IoT", "Hardware"],
    size: "md:col-span-1",
  },
  {
    title: "Teaching Assistant",
    desc: "Graph Algorithms & Systems Software mentorship.",
    tags: ["Teaching", "Mentorship", "C"],
    size: "md:col-span-2",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="px-6 py-24 max-w-7xl mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-12 text-3xl font-bold text-white flex items-center gap-3"
      >
        <span className="text-primary">01.</span> Selected Projects
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {projects.map((project, i) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className={project.size}
          >
            <SpotlightCard className="h-full p-8 rounded-2xl">
              <h3 className="text-2xl font-bold text-white mb-2">
                {project.title}
              </h3>
              <p className="text-text-muted mb-6">{project.desc}</p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-mono bg-white/5 text-white/80 px-2 py-1 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </SpotlightCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
}