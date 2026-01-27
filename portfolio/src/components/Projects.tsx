"use client";
import { motion } from "framer-motion";

const projects = [
  {
    title: "AI Document Assistant",
    desc: "RAG pipeline processing technical docs with vector embeddings.",
    tags: ["Python", "OpenAI", "Pinecone"],
    size: "col-span-1 md:col-span-2", // Wide card
    gradient: "from-blue-900/50 to-slate-900",
  },
  {
    title: "KnightHaven Events",
    desc: "Full-stack event management platform for UCF students.",
    tags: ["LAMP Stack", "PHP", "MySQL"],
    size: "col-span-1", // Square card
    gradient: "from-yellow-900/20 to-slate-900",
  },
  {
    title: "Autonomous Robot",
    desc: "ESP32-CAM based chassis with obstacle avoidance algorithms.",
    tags: ["C++", "IoT", "Hardware"],
    size: "col-span-1",
    gradient: "from-purple-900/50 to-slate-900",
  },
  {
    title: "Graph Algo Visualizer", // Placeholder for your TA work
    desc: "Interactive tool for visualizing Dijkstra & A* search.",
    tags: ["React", "D3.js"],
    size: "col-span-1 md:col-span-2",
    gradient: "from-emerald-900/50 to-slate-900",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-20 px-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-10 text-white flex items-center gap-3">
        <span className="text-primary">01.</span> Selected Projects
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {projects.map((project, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className={`${project.size} group relative overflow-hidden rounded-2xl bg-surface border border-white/10 p-8 hover:border-white/20 transition-colors`}
          >
            {/* Background Gradient Effect */}
            <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
            
            <div className="relative z-10">
              <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
              <p className="text-text-muted mb-6">{project.desc}</p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map(tag => (
                  <span key={tag} className="text-xs font-mono bg-white/5 text-white/80 px-2 py-1 rounded">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}