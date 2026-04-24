"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { education } from "@/data/resume";
import { sectionTitles } from "@/data/site";
import { GITHUB_URL, LINKEDIN_URL } from "@/data/links";
import BattleScene from "@/components/BattleScene";
import SelectionScreen from "@/components/SelectionScreen";
import { Linkedin, Github, FileText, Mail } from "lucide-react";

type SkillCategory = "Languages" | "Frameworks" | "Tools";

const SKILL_CATEGORIES: Record<string, SkillCategory> = {
  Python: "Languages",
  Java: "Languages",
  C: "Languages",
  "C++": "Languages",
  JavaScript: "Languages",
  SQL: "Languages",
  PyTorch: "Frameworks",
  NumPy: "Frameworks",
  Pandas: "Frameworks",
  Seaborn: "Frameworks",
  PuLP: "Frameworks",
  matplotlib: "Frameworks",
  React: "Frameworks",
  "Node.js": "Frameworks",
  Express: "Frameworks",
  Flask: "Frameworks",
  "Git/GitHub": "Tools",
  AWS: "Tools",
  Docker: "Tools",
  "REST APIs": "Tools",
  "OpenAI APIs": "Tools",
  GoHighLevel: "Tools",
  Make: "Tools",
  Odoo: "Tools",
};

const CATEGORY_ORDER: SkillCategory[] = ["Languages", "Frameworks", "Tools"];

function groupSkillsByCategory(skills: string[]): Record<SkillCategory, string[]> {
  const grouped: Record<SkillCategory, string[]> = {
    Languages: [],
    Frameworks: [],
    Tools: [],
  };
  for (const skill of skills) {
    const cat = SKILL_CATEGORIES[skill] ?? "Tools";
    grouped[cat].push(skill);
  }
  return grouped;
}

export default function Education() {
  const [battleState, setBattleState] = useState<"idle" | "selecting" | "battling" | "defeated">("idle");
  const [selectedTrainer, setSelectedTrainer] = useState<{name: string, sprite: string} | null>(null);
  const [selectedPokemon, setSelectedPokemon] = useState<{id: number, name: string, move: string, type: "water" | "grass" | "fire"} | null>(null);
  const [emailCopied, setEmailCopied] = useState(false);

  const skillsByCategory = useMemo(() => groupSkillsByCategory(education.skills), []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("simonomillan15@gmail.com");
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
  };

  return (
    <section className="px-6 py-24 max-w-7xl mx-auto relative">

      {/* Full-screen selection overlay */}
      <AnimatePresence>
        {battleState === "selecting" && (
          <SelectionScreen 
            onCancel={() => setBattleState("idle")}
            onStart={(trainer: {name: string, sprite: string}, pokemon: {id: number, name: string, move: string, type: "water" | "grass" | "fire"}) => {
              setSelectedTrainer(trainer);
              setSelectedPokemon(pokemon);
              setBattleState("battling");
            }}
          />
        )}
      </AnimatePresence>

      {/* Full-screen battle overlay */}
      <AnimatePresence>
        {battleState === "battling" && selectedTrainer && selectedPokemon && (
          <BattleScene 
            onComplete={() => setBattleState("defeated")}
            trainerName={selectedTrainer.name}
            trainerSprite={selectedTrainer.sprite}
            pokemonId={selectedPokemon.id}
            pokemonName={selectedPokemon.name}
            moveName={selectedPokemon.move}
            moveType={selectedPokemon.type}
          />
        )}
      </AnimatePresence>

      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-12 text-3xl font-bold text-primary flex items-center gap-3"
      >
        {sectionTitles.education.title}
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
        {/* Left: Education */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-4"
        >
          <p className="text-xl font-semibold text-text-main">{education.university}</p>
          <p className="text-lg text-white">{education.degree}</p>
          <p>
            <span className="text-secondary font-bold">GPA {education.gpa}</span>
          </p>
          <p className="text-sm text-text-muted">
            Expected Graduation: {education.graduation}
          </p>
        </motion.div>

        {/* Right: Skills */}
        <motion.div
          initial={{ opacity: 0, x: 16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          {CATEGORY_ORDER.map((category) => {
            const skills = skillsByCategory[category];
            if (skills.length === 0) return null;
            return (
              <div key={category}>
                <h3 className="text-sm font-medium text-text-muted uppercase tracking-wider mb-3">
                  {category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 text-sm border border-white/10 rounded-full text-text-main transition-all duration-200 hover:border-primary/40 hover:shadow-[0_0_12px_rgba(59,130,246,0.35)]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>

      {/* Challenge button */}
      {battleState === "idle" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-20 flex justify-center w-full"
        >
          <button
            onClick={() => setBattleState("selecting")}
            className="px-12 py-5 bg-red-500/20 border-2 border-red-500/80 text-white text-xl md:text-2xl font-bold rounded-xl shadow-[0_0_20px_rgba(239,68,68,0.3)] hover:bg-red-500 hover:shadow-[0_0_40px_rgba(239,68,68,0.9)] backdrop-blur-md transition-all uppercase tracking-widest w-full max-w-4xl"
          >
            ⚔ Challenge the Leader
          </button>
        </motion.div>
      )}

      {/* Post-battle reveal */}
      {battleState === "defeated" && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mt-32 p-8 rounded-xl bg-surface/80 border-2 border-primary/50 shadow-[0_0_30px_rgba(0,210,255,0.15)] max-w-4xl mx-auto backdrop-blur-md relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />

          <p className="text-xl md:text-2xl font-mono text-white leading-relaxed">
            <span className="text-primary font-bold">Gym Leader Simon:</span>{" "}
            "You've successfully navigated the currents of my portfolio. Your skills are sharp,
            and your problem-solving flows like water. For proving your technical prowess,
            I present to you..."
          </p>

          <div className="mt-12 flex flex-col items-center justify-center">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 10, delay: 0.4 }}
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 20 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="w-32 h-32 rounded-full bg-gradient-to-br from-primary to-secondary shadow-[0_0_40px_rgba(0,210,255,0.6)] flex items-center justify-center border-4 border-white/80 cursor-pointer"
              >
                <span className="text-6xl drop-shadow-[0_0_10px_rgba(255,255,255,1)]">💧</span>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="mt-4 text-center w-full"
            >
              <p className="text-2xl font-bold text-white tracking-widest uppercase drop-shadow-[0_0_8px_rgba(0,210,255,0.8)]">
                The Tensor Badge
              </p>
              <p className="text-text-muted mt-2 font-mono">
                Proof of conquering the Neural Water Gym
              </p>

              <div className="mt-12 grid grid-cols-2 gap-4 max-w-lg mx-auto">
                <a
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 rounded-lg border border-white/20 bg-surface/40 p-4 text-left transition-all hover:bg-primary/10 hover:border-primary/50 hover:shadow-[0_0_20px_rgba(0,210,255,0.6)] backdrop-blur-md"
                >
                  <Linkedin className="w-5 h-5 text-white/50 group-hover:text-primary transition-colors" />
                  <span className="font-bold text-white uppercase tracking-wider">LinkedIn</span>
                </a>
                <a
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 rounded-lg border border-white/20 bg-surface/40 p-4 text-left transition-all hover:bg-primary/10 hover:border-primary/50 hover:shadow-[0_0_20px_rgba(0,210,255,0.6)] backdrop-blur-md"
                >
                  <Github className="w-5 h-5 text-white/50 group-hover:text-primary transition-colors" />
                  <span className="font-bold text-white uppercase tracking-wider">GitHub</span>
                </a>
                <a
                  href="/Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 rounded-lg border border-white/20 bg-surface/40 p-4 text-left transition-all hover:bg-primary/10 hover:border-primary/50 hover:shadow-[0_0_20px_rgba(0,210,255,0.6)] backdrop-blur-md"
                >
                  <FileText className="w-5 h-5 text-white/50 group-hover:text-primary transition-colors" />
                  <span className="font-bold text-white uppercase tracking-wider">Resume</span>
                </a>
                <button
                  onClick={handleCopyEmail}
                  className="group flex items-center gap-3 relative rounded-lg border border-white/20 bg-surface/40 p-4 text-left transition-all hover:bg-primary/10 hover:border-primary/50 hover:shadow-[0_0_20px_rgba(0,210,255,0.6)] backdrop-blur-md"
                >
                  <Mail className="w-5 h-5 text-white/50 group-hover:text-primary transition-colors" />
                  <span className="font-bold text-white uppercase tracking-wider">
                    {emailCopied ? "Copied!" : "Email"}
                  </span>
                  <AnimatePresence>
                    {emailCopied && (
                      <motion.span
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="absolute -top-7 left-1/2 -translate-x-1/2 text-xs font-mono text-green-400 whitespace-nowrap"
                      >
                        simonomillan15@gmail.com
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </section>
  );
}
