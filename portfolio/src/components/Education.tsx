"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, Droplet, RotateCcw, Swords } from "lucide-react";
import BattleScene from "@/components/BattleScene";
import SelectionScreen from "@/components/SelectionScreen";
import { education } from "@/data/resume";
import { sectionTitles } from "@/data/site";
import { useHydratedReducedMotion } from "@/hooks/useHydratedReducedMotion";
import {
  BATTLE_VICTORY_STORAGE_KEY,
  restoreBattleVictory,
  type Pokemon,
  type StoredBattleVictory,
  type Trainer,
} from "@/data/battle";

type SkillCategory = "Languages" | "Frameworks" | "Tools";
type BattleState = "restoring" | "idle" | "selecting" | "battling" | "defeated";

const SKILL_CATEGORIES: Record<string, SkillCategory> = {
  Python: "Languages", Java: "Languages", C: "Languages", "C++": "Languages",
  JavaScript: "Languages", TypeScript: "Languages", SQL: "Languages", "HTML/CSS": "Languages",
  React: "Frameworks", "Next.js": "Frameworks", FastAPI: "Frameworks", "Node.js": "Frameworks",
  Express: "Frameworks", Flask: "Frameworks", PyTorch: "Frameworks", "PyTorch Geometric": "Frameworks",
  Pandas: "Frameworks", NumPy: "Frameworks", matplotlib: "Frameworks", Seaborn: "Frameworks",
  Streamlit: "Frameworks", TailwindCSS: "Frameworks", "Material UI": "Frameworks", SQLAlchemy: "Frameworks",
  PuLP: "Frameworks", "Git/GitHub": "Tools", AWS: "Tools", Docker: "Tools", PostgreSQL: "Tools",
  Redis: "Tools", SQLite: "Tools", "Gemini API": "Tools", "OpenAI APIs": "Tools", "Hugging Face": "Tools",
  Auth0: "Tools", Apify: "Tools", SerpApi: "Tools", "Yelp Fusion API": "Tools", BeautifulSoup: "Tools",
  "REST APIs": "Tools", GoHighLevel: "Tools", Make: "Tools", Odoo: "Tools",
};

const CATEGORY_ORDER: SkillCategory[] = ["Languages", "Frameworks", "Tools"];
const DEFAULT_SKILLS_PER_CATEGORY = 8;

function groupSkills(skills: string[]): Record<SkillCategory, string[]> {
  const groups: Record<SkillCategory, string[]> = { Languages: [], Frameworks: [], Tools: [] };
  skills.forEach((skill) => groups[SKILL_CATEGORIES[skill] ?? "Tools"].push(skill));
  return groups;
}

export default function Education() {
  const [battleState, setBattleState] = useState<BattleState>("restoring");
  const [selectedTrainer, setSelectedTrainer] = useState<Trainer | null>(null);
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
  const [showAllSkills, setShowAllSkills] = useState(false);
  const rewardRef = useRef<HTMLDivElement>(null);
  const challengeRef = useRef<HTMLButtonElement>(null);
  const shouldReduceMotion = useHydratedReducedMotion();
  const skillsByCategory = useMemo(() => groupSkills(education.skills), []);

  useEffect(() => {
    let restored: ReturnType<typeof restoreBattleVictory> = null;
    try {
      restored = restoreBattleVictory(window.sessionStorage.getItem(BATTLE_VICTORY_STORAGE_KEY));
    } catch {
      // Storage can be unavailable in hardened browsing modes.
    }
    if (!restored) {
      try {
        window.sessionStorage.removeItem(BATTLE_VICTORY_STORAGE_KEY);
      } catch {
        // Storage can be unavailable in hardened browsing modes.
      }
    }

    const restoreTimer = window.setTimeout(() => {
      if (restored) {
        setSelectedTrainer(restored.trainer);
        setSelectedPokemon(restored.pokemon);
        setBattleState("defeated");
      } else {
        setBattleState("idle");
      }
    }, 0);

    return () => window.clearTimeout(restoreTimer);
  }, []);

  useEffect(() => {
    if (battleState !== "defeated") return;
    const timer = window.setTimeout(
      () => {
        rewardRef.current?.scrollIntoView({ behavior: shouldReduceMotion ? "auto" : "smooth", block: "start" });
        rewardRef.current?.focus({ preventScroll: true });
      },
      shouldReduceMotion ? 0 : 220
    );
    return () => window.clearTimeout(timer);
  }, [battleState, shouldReduceMotion]);

  const handleBattleStart = (trainer: Trainer, pokemon: Pokemon) => {
    setSelectedTrainer(trainer);
    setSelectedPokemon(pokemon);
    setBattleState("battling");
  };

  const handleBadgeEarned = (trainer: Trainer, pokemon: Pokemon) => {
    setSelectedTrainer(trainer);
    setSelectedPokemon(pokemon);
    const storedVictory: StoredBattleVictory = {
      version: 2,
      trainerName: trainer.name,
      pokemonId: pokemon.id,
    };
    try {
      window.sessionStorage.setItem(BATTLE_VICTORY_STORAGE_KEY, JSON.stringify(storedVictory));
    } catch {
      // The reward still works when storage is unavailable.
    }
    setBattleState("defeated");
  };

  const replayBattle = () => {
    try {
      window.sessionStorage.removeItem(BATTLE_VICTORY_STORAGE_KEY);
    } catch {
      // Session persistence is an enhancement, not a prerequisite.
    }
    setSelectedTrainer(null);
    setSelectedPokemon(null);
    setBattleState("selecting");
  };

  const returnToChallenge = () => {
    setBattleState("idle");
    window.requestAnimationFrame(() => challengeRef.current?.focus({ preventScroll: true }));
  };

  return (
    <section aria-labelledby="education-heading" className="relative mx-auto w-full min-w-0 max-w-7xl px-5 py-14 sm:px-8 md:py-20 lg:px-12">
      {battleState === "selecting" && <SelectionScreen onCancel={returnToChallenge} onStart={handleBattleStart} />}
      {battleState === "battling" && selectedTrainer && selectedPokemon && (
        <BattleScene
          onEarnBadge={handleBadgeEarned}
          onCancel={returnToChallenge}
          onReplay={replayBattle}
          trainer={selectedTrainer}
          pokemon={selectedPokemon}
        />
      )}

      <motion.div initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-8 sm:mb-12">
        <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.28em] text-secondary sm:text-xs">04 / Education + Skills</p>
        <h2 id="education-heading" className="text-3xl font-black tracking-tight text-primary sm:text-4xl">{sectionTitles.education.title}</h2>
      </motion.div>

      <div className="grid min-w-0 grid-cols-1 gap-10 md:grid-cols-[0.78fr_1.22fr] md:gap-14">
        <motion.div initial={{ opacity: 0, x: -14 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="rounded-2xl border border-white/[0.07] bg-[#071526]/72 p-5 sm:p-7">
          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-secondary">Education</p>
          <p className="mt-4 text-xl font-black leading-tight text-white">{education.university}</p>
          <p className="mt-2 text-base text-slate-300 sm:text-lg">{education.degree}</p>
          <div className="mt-6 grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-primary/15 bg-primary/[0.045] p-4">
              <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-slate-500">GPA</p>
              <p className="mt-1 text-xl font-black text-secondary">{education.gpa}</p>
            </div>
            <div className="rounded-xl border border-primary/15 bg-primary/[0.045] p-4">
              <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-slate-500">Graduation</p>
              <p className="mt-1 text-sm font-bold text-text-main">{education.graduation}</p>
            </div>
          </div>
          <p className="mt-6 text-sm leading-relaxed text-slate-400">
            Coursework and independent projects converge around applied AI, graph systems, and reliable full-stack products.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 14 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="min-w-0 space-y-7">
          {CATEGORY_ORDER.map((category) => {
            const categorySkills = skillsByCategory[category];
            const visibleSkills = showAllSkills ? categorySkills : categorySkills.slice(0, DEFAULT_SKILLS_PER_CATEGORY);
            return (
              <div key={category}>
                <h3 className="mb-3 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-text-muted sm:text-xs">{category}</h3>
                <div className="flex flex-wrap gap-2">
                  {visibleSkills.map((skill) => (
                    <span key={skill} className="rounded-full border border-white/10 bg-white/[0.025] px-3 py-1.5 text-xs text-slate-200 transition-colors hover:border-primary/35 hover:bg-primary/[0.06] sm:text-sm">{skill}</span>
                  ))}
                </div>
              </div>
            );
          })}
          <button type="button" onClick={() => setShowAllSkills((visible) => !visible)} aria-expanded={showAllSkills} className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 font-mono text-[10px] uppercase tracking-[0.16em] text-slate-300 transition-colors hover:border-primary/30 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
            {showAllSkills ? "Show curated set" : `Show all ${education.skills.length} skills`}
            <ChevronDown className={`transition-transform ${showAllSkills ? "rotate-180" : ""}`} size={15} />
          </button>
        </motion.div>
      </div>

      {battleState === "idle" && (
        <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-16 rounded-2xl border border-red-400/20 bg-[radial-gradient(circle_at_50%_120%,rgba(239,68,68,0.16),transparent_55%)] p-5 text-center sm:mt-20 sm:p-8">
          <p className="font-mono text-[10px] uppercase tracking-[0.26em] text-red-300/70">Optional final encounter</p>
          <h3 className="mt-2 text-xl font-black text-white sm:text-2xl">Think you have what it takes?</h3>
          <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-slate-400">Choose a trainer and partner for a short, fully optional battle. All portfolio links remain available without it.</p>
          <button ref={challengeRef} type="button" onClick={() => setBattleState("selecting")} className="mt-6 inline-flex min-h-14 w-full max-w-2xl items-center justify-center gap-3 rounded-xl border-2 border-red-400/70 bg-red-500/15 px-6 text-sm font-black uppercase tracking-[0.15em] text-white shadow-[0_0_24px_rgba(239,68,68,0.18)] transition-all hover:bg-red-500 hover:shadow-[0_0_38px_rgba(239,68,68,0.38)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400">
            <Swords size={20} /> Challenge the leader
          </button>
        </motion.div>
      )}

      {battleState === "defeated" && selectedTrainer && selectedPokemon && (
        <motion.div
          ref={rewardRef}
          tabIndex={-1}
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 24 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-20 scroll-mt-24 outline-none"
        >
          <div className="flex flex-col gap-5 rounded-2xl border border-primary/35 bg-[radial-gradient(circle_at_10%_50%,rgba(0,210,255,0.12),transparent_34%),#071526] p-5 shadow-[0_0_28px_rgba(0,210,255,0.1)] sm:flex-row sm:items-center sm:justify-between sm:p-6">
            <div className="flex min-w-0 items-center gap-4">
              <div className="grid size-16 shrink-0 place-items-center rounded-full border-2 border-white/70 bg-gradient-to-br from-cyan-100 via-primary to-blue-600 shadow-[0_0_24px_rgba(0,210,255,0.4)]">
                <Droplet className="size-8 fill-white/30 text-white" strokeWidth={2.3} />
              </div>
              <div className="min-w-0">
                <p className="font-mono text-[9px] font-bold uppercase tracking-[0.22em] text-primary">Neural Water Gym // Complete</p>
                <h3 className="mt-1 text-xl font-black text-white">Tensor Badge earned</h3>
                <p className="mt-1 break-words text-sm text-slate-400">{selectedTrainer.name} + {selectedPokemon.name} · {selectedPokemon.move}</p>
              </div>
            </div>
            <button type="button" onClick={replayBattle} className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/[0.04] px-5 text-sm font-bold text-white transition-colors hover:border-primary/35 hover:bg-primary/10 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"><RotateCcw size={17} /> Battle again</button>
          </div>
        </motion.div>
      )}
    </section>
  );
}
