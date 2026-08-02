"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Droplet, Feather, RotateCcw, SkipForward, Sparkles, X } from "lucide-react";
import FullscreenDialog from "@/components/FullscreenDialog";
import type { BattleEffectsMode, Pokemon, Trainer } from "@/data/battle";

export type BattlePhase = "vs" | "deploy" | "attack" | "impact" | "faint" | "badge";

export const BATTLE_TIMELINE = {
  deploy: 1_100,
  attack: 2_200,
  impact: 3_450,
  faint: 4_350,
  badge: 5_250,
  ready: 7_000,
} as const;

export interface BattleSceneProps {
  onEarnBadge: (trainer: Trainer, pokemon: Pokemon) => void;
  onCancel: () => void;
  onReplay: () => void;
  trainer: Trainer;
  pokemon: Pokemon;
}

const SWAMPERT_ANIMATED = "/pokemon/swampert-front.gif";
const SWAMPERT_STILL = "/pokemon/swampert-front-still.png";
const GRASS_KNOT_ROOTS = [
  "M 18 100 C 25 76, 48 88, 58 62 S 68 38, 76 31",
  "M 42 100 C 38 78, 58 78, 63 58 S 70 40, 78 29",
  "M 70 100 C 61 80, 73 69, 70 53 S 75 38, 80 31",
  "M 100 78 C 84 73, 89 56, 81 48 S 77 37, 76 30",
] as const;
const MotionImage = motion.create(Image);

function DeploymentEffects({ cinematic }: { cinematic: boolean }) {
  return (
    <div className="pointer-events-none absolute inset-0 z-30 overflow-hidden" aria-hidden>
      {[{ left: "18%", top: "68%", color: "border-cyan-300" }, { left: "79%", top: "26%", color: "border-blue-300" }].map((ring, index) => (
        <motion.div
          key={ring.left}
          className={`absolute size-24 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 ${ring.color}`}
          style={{ left: ring.left, top: ring.top }}
          initial={{ opacity: 0, scale: cinematic ? 0.15 : 0.85 }}
          animate={{ opacity: [0, 0.85, 0], scale: cinematic ? [0.15, 1.4, 2.1] : 1 }}
          transition={{ duration: cinematic ? 0.9 : 0.65, delay: index * 0.08, ease: "easeOut" }}
        />
      ))}
      <motion.div
        className="absolute inset-0 bg-[radial-gradient(circle_at_18%_68%,rgba(103,232,249,0.2),transparent_24%),radial-gradient(circle_at_79%_26%,rgba(96,165,250,0.2),transparent_24%)]"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0.35] }}
        transition={{ duration: 0.9 }}
      />
    </div>
  );
}

function WaterAttack() {
  return (
    <div data-attack-effect="hydro-pump" className="pointer-events-none absolute inset-0 z-40 overflow-hidden" aria-hidden>
      <motion.div
        className="absolute bottom-[18%] left-[13%] size-[clamp(5rem,20vmin,10rem)] rounded-full border-2 border-cyan-200/80 bg-cyan-300/15 shadow-[0_0_50px_rgba(34,211,238,0.65)]"
        initial={{ opacity: 0, scale: 0.3 }}
        animate={{ opacity: [0, 1, 0], scale: [0.3, 1, 1.35] }}
        transition={{ duration: 0.55 }}
      />
      <svg className="absolute inset-0 size-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <motion.path
          d="M 23 73 C 38 71, 48 53, 76 29"
          fill="none"
          stroke="rgba(34,211,238,0.72)"
          strokeWidth="8"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: [0, 1, 0] }}
          transition={{ delay: 0.25, duration: 0.72, ease: "easeOut" }}
        />
        <motion.path
          d="M 23 73 C 40 65, 52 49, 76 29"
          fill="none"
          stroke="rgba(224,252,255,0.95)"
          strokeWidth="2.4"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: [0, 1, 0] }}
          transition={{ delay: 0.3, duration: 0.65, ease: "easeOut" }}
        />
      </svg>
      {[0, 1, 2].map((index) => (
        <motion.div
          key={index}
          className="absolute left-[46%] top-[47%] h-4 w-24 rounded-[50%] border border-cyan-100/75"
          initial={{ opacity: 0, rotate: -34, scaleY: 0.2 }}
          animate={{ opacity: [0, 0.9, 0], rotate: -34 + index * 10, scaleY: [0.2, 1, 0.35] }}
          transition={{ delay: 0.35 + index * 0.08, duration: 0.55 }}
        />
      ))}
      <motion.div
        className="absolute right-[13%] top-[18%] size-[clamp(5rem,19vmin,9rem)] rounded-full border-4 border-cyan-200 shadow-[0_0_40px_rgba(103,232,249,0.85)]"
        initial={{ opacity: 0, scale: 0.1 }}
        animate={{ opacity: [0, 1, 0], scale: [0.1, 1.2, 1.85] }}
        transition={{ delay: 0.78, duration: 0.42 }}
      />
    </div>
  );
}

function GrassAttack({ sprite }: { sprite: string }) {
  return (
    <div data-attack-effect="leaf-blade" className="pointer-events-none absolute inset-0 z-40 overflow-hidden" aria-hidden>
      {[0, 1].map((index) => (
        <MotionImage
          key={index}
          src={sprite}
          alt=""
          width={180}
          height={180}
          unoptimized
          className="absolute bottom-[7%] left-[8%] size-[clamp(6rem,22vmin,11rem)] object-contain opacity-40"
          style={{ imageRendering: "pixelated", filter: "brightness(2) saturate(1.6) hue-rotate(55deg)" }}
          initial={{ x: 0, y: 0, opacity: 0.45 }}
          animate={{ x: [0, "44vw"], y: [0, "-34vh"], opacity: [0.45, 0] }}
          transition={{ delay: index * 0.11, duration: 0.42, ease: "easeOut" }}
        />
      ))}
      <svg className="absolute inset-0 size-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        {[
          "M 58 20 Q 76 36 90 49",
          "M 90 18 Q 76 38 57 50",
          "M 63 16 Q 79 32 93 43",
        ].map((path, index) => (
          <motion.path
            key={path}
            d={path}
            fill="none"
            stroke={index === 1 ? "rgba(220,252,231,0.95)" : "rgba(74,222,128,0.9)"}
            strokeWidth={index === 1 ? 2 : 4}
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: [0, 1, 0] }}
            transition={{ delay: 0.32 + index * 0.08, duration: 0.35 }}
          />
        ))}
      </svg>
      {[0, 1, 2, 3, 4, 5].map((index) => (
        <motion.span
          key={index}
          className="absolute right-[18%] top-[28%] h-2 w-4 rounded-[80%_0] bg-green-300 shadow-[0_0_8px_rgba(74,222,128,0.8)]"
          initial={{ opacity: 0, x: 0, y: 0, rotate: index * 24 }}
          animate={{ opacity: [0, 1, 0], x: (index % 2 ? -1 : 1) * (28 + index * 8), y: 30 + index * 9, rotate: 180 + index * 35 }}
          transition={{ delay: 0.55 + index * 0.04, duration: 0.48 }}
        />
      ))}
    </div>
  );
}

function GrassKnotAttack() {
  return (
    <div data-attack-effect="grass-knot" className="pointer-events-none absolute inset-0 z-40 overflow-hidden" aria-hidden>
      <motion.div
        className="absolute inset-x-[8%] bottom-[4%] h-[18%] rounded-[50%] bg-emerald-400/20 blur-2xl"
        initial={{ opacity: 0, scaleX: 0.2 }}
        animate={{ opacity: [0, 0.9, 0.2], scaleX: [0.2, 1.1, 1] }}
        transition={{ duration: 0.72, ease: "easeOut" }}
      />
      <svg className="absolute inset-0 size-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <linearGradient id="battle-roots" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0" stopColor="#14532d" />
            <stop offset="0.55" stopColor="#4ade80" />
            <stop offset="1" stopColor="#dcfce7" />
          </linearGradient>
          <filter id="battle-root-glow"><feGaussianBlur stdDeviation="0.7" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
        </defs>
        {GRASS_KNOT_ROOTS.map((path, index) => (
          <motion.path
            key={path}
            d={path}
            fill="none"
            stroke="url(#battle-roots)"
            strokeWidth={index === 1 ? 2.2 : 1.35}
            strokeLinecap="round"
            filter="url(#battle-root-glow)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: [0, 1, 0.9] }}
            transition={{ delay: index * 0.06, duration: 0.72, ease: "easeOut" }}
          />
        ))}
        {[0, 1, 2].map((index) => (
          <motion.ellipse
            key={index}
            cx="77"
            cy={30 + index * 4}
            rx={7 + index * 2}
            ry={3.2 + index}
            fill="none"
            stroke={index === 1 ? "#dcfce7" : "#4ade80"}
            strokeWidth={index === 1 ? 1.2 : 1.8}
            filter="url(#battle-root-glow)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: [0, 1, 0] }}
            transition={{ delay: 0.42 + index * 0.08, duration: 0.5 }}
          />
        ))}
      </svg>
      {[0, 1, 2, 3, 4, 5].map((index) => (
        <motion.span
          key={index}
          className="absolute right-[18%] top-[25%] size-2 rotate-45 rounded-sm bg-emerald-100 shadow-[0_0_10px_rgba(74,222,128,0.95)]"
          initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
          animate={{ opacity: [0, 1, 0], scale: [0, 1, 0.4], x: (index % 2 ? -1 : 1) * (18 + index * 5), y: 14 + index * 7 }}
          transition={{ delay: 0.5 + index * 0.05, duration: 0.48 }}
        />
      ))}
      <motion.div
        className="absolute right-[12%] top-[17%] size-[clamp(5rem,20vmin,10rem)] rounded-full border-2 border-emerald-200/80 shadow-[inset_0_0_24px_rgba(74,222,128,0.45),0_0_36px_rgba(74,222,128,0.65)]"
        initial={{ opacity: 0, scale: 1.4, rotate: -20 }}
        animate={{ opacity: [0, 1, 0], scale: [1.4, 0.72, 0.3], rotate: [-20, 12, 28] }}
        transition={{ delay: 0.65, duration: 0.46, ease: "easeIn" }}
      />
    </div>
  );
}

function ReducedAttack({ pokemon }: { pokemon: Pokemon }) {
  const color = pokemon.moveType === "water" ? "bg-cyan-300/20 text-cyan-100" : "bg-green-300/20 text-green-100";
  return (
    <motion.div data-attack-effect={`reduced-${pokemon.moveEffect}`} className={`pointer-events-none absolute inset-0 z-40 grid place-items-center ${color}`} initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 0.28] }} transition={{ duration: 0.9 }} aria-hidden>
      <span className="rounded-xl border border-white/20 bg-black/70 px-6 py-3 font-mono text-sm font-black uppercase tracking-[0.18em]">{pokemon.move}</span>
    </motion.div>
  );
}

function PixelDissolve() {
  return (
    <div className="pointer-events-none absolute right-[14%] top-[18%] z-50 size-[clamp(6rem,22vmin,11rem)]" aria-hidden>
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((index) => (
        <motion.span
          key={index}
          className="absolute size-2 bg-cyan-100 shadow-[0_0_8px_rgba(103,232,249,0.8)]"
          style={{ left: `${18 + ((index * 29) % 66)}%`, top: `${12 + ((index * 37) % 72)}%` }}
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: [0, 1, 0], y: 28 + (index % 4) * 9 }}
          transition={{ delay: index * 0.035, duration: 0.58 }}
        />
      ))}
    </div>
  );
}

interface BadgeCeremonyProps {
  trainer: Trainer;
  pokemon: Pokemon;
  cinematic: boolean;
  ready: boolean;
  returnButtonRef: React.RefObject<HTMLButtonElement | null>;
  onReturn: () => void;
  onReplay: () => void;
}

function BadgeCeremony({ trainer, pokemon, cinematic, ready, returnButtonRef, onReturn, onReplay }: BadgeCeremonyProps) {
  return (
    <motion.div className="battle-badge-ceremony absolute inset-0 z-[90] flex items-center justify-center overflow-y-auto bg-[#02070d]/96 px-4 py-16 text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.35 }}>
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,210,255,0.17),transparent_48%)]" />
      {cinematic && [0, 1, 2].map((index) => (
        <motion.div key={index} aria-hidden className="absolute left-1/2 top-1/2 aspect-square w-[min(72vw,34rem)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/35" initial={{ opacity: 0, scale: 0.2 }} animate={{ opacity: [0, 0.65, 0], scale: [0.2, 1.15, 1.5] }} transition={{ delay: index * 0.24, duration: 1.35, ease: "easeOut" }} />
      ))}
      <motion.div className="relative mx-auto flex w-full max-w-2xl flex-col items-center" initial={{ opacity: 0, y: cinematic ? 18 : 0 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18, duration: 0.5 }}>
        <p className="font-mono text-[9px] font-bold uppercase tracking-[0.28em] text-primary sm:text-xs">Neural Water Gym // Challenge complete</p>
        <motion.div
          className="battle-badge-emblem relative mt-6 grid size-28 place-items-center rounded-full border-4 border-white/85 bg-gradient-to-br from-cyan-100 via-primary to-blue-600 shadow-[0_0_46px_rgba(0,210,255,0.62)] sm:size-36"
          initial={{ opacity: 0, scale: cinematic ? 0.25 : 1, rotate: 0 }}
          animate={{ opacity: 1, scale: 1, rotate: cinematic ? [0, -6, 4, 0] : 0 }}
          transition={{
            opacity: { delay: 0.28, duration: 0.25 },
            scale: { delay: 0.28, type: "spring", stiffness: 180, damping: 14 },
            rotate: { delay: 0.28, duration: 0.6, ease: "easeOut" },
          }}
        >
          <Droplet className="size-14 fill-white/30 text-white sm:size-16" strokeWidth={2.4} />
          {cinematic && <motion.span aria-hidden className="absolute right-3 top-4 size-5 rounded-full bg-white blur-sm" initial={{ opacity: 0, scale: 0 }} animate={{ opacity: [0, 1, 0], scale: [0, 1, 1.8] }} transition={{ delay: 0.8, duration: 0.45 }} />}
        </motion.div>
        <h2 className="battle-badge-title mt-6 text-3xl font-black tracking-tight text-white sm:text-5xl">You earned the Tensor Badge.</h2>
        <p className="battle-badge-quote mt-5 max-w-xl text-sm leading-relaxed text-slate-300 sm:text-lg"><span className="font-mono font-bold text-primary">Gym Leader Simon:</span> &ldquo;You read the current, picked your moment, and landed the winning move. The Tensor Badge is yours.&rdquo;</p>
        <p className="battle-badge-team mt-5 rounded-full border border-primary/25 bg-primary/[0.07] px-4 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-cyan-100 sm:text-xs">{trainer.name} + {pokemon.name} · {pokemon.move}</p>
        <motion.div className="battle-badge-actions mt-7 flex w-full max-w-md flex-col gap-3 sm:flex-row" initial={{ opacity: 0 }} animate={{ opacity: ready ? 1 : 0 }} transition={{ duration: 0.3 }} aria-hidden={!ready}>
          <button ref={returnButtonRef} type="button" onClick={onReturn} disabled={!ready} className="inline-flex min-h-12 flex-1 items-center justify-center rounded-xl border border-primary/70 bg-primary/15 px-5 text-sm font-black uppercase tracking-[0.12em] text-primary transition-colors hover:bg-primary hover:text-background disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">Return to the gym</button>
          <button type="button" onClick={onReplay} disabled={!ready} className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/[0.04] px-5 text-sm font-bold text-white transition-colors hover:border-white/30 hover:bg-white/[0.08] disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"><RotateCcw size={17} /> Battle again</button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default function BattleScene({ onEarnBadge, onCancel, onReplay, trainer, pokemon }: BattleSceneProps) {
  const [phase, setPhase] = useState<BattlePhase>("vs");
  const [swampertHp, setSwampertHp] = useState(100);
  const [badgeReady, setBadgeReady] = useState(false);
  const [skipped, setSkipped] = useState(false);
  const [effectsMode, setEffectsMode] = useState<BattleEffectsMode>("cinematic");
  const returnButtonRef = useRef<HTMLButtonElement>(null);
  const cinematic = effectsMode === "cinematic";

  useEffect(() => {
    if (skipped) {
      const readyTimer = window.setTimeout(() => setBadgeReady(true), 650);
      return () => window.clearTimeout(readyTimer);
    }

    const timers = [
      window.setTimeout(() => setPhase("deploy"), BATTLE_TIMELINE.deploy),
      window.setTimeout(() => setPhase("attack"), BATTLE_TIMELINE.attack),
      window.setTimeout(() => { setPhase("impact"); setSwampertHp(0); }, BATTLE_TIMELINE.impact),
      window.setTimeout(() => setPhase("faint"), BATTLE_TIMELINE.faint),
      window.setTimeout(() => setPhase("badge"), BATTLE_TIMELINE.badge),
      window.setTimeout(() => setBadgeReady(true), BATTLE_TIMELINE.ready),
    ];
    return () => timers.forEach(window.clearTimeout);
  }, [skipped]);

  useEffect(() => {
    if (phase !== "badge" || !badgeReady) return;
    returnButtonRef.current?.focus({ preventScroll: true });
  }, [badgeReady, phase]);

  const skipToBadge = () => {
    setSkipped(true);
    setSwampertHp(0);
    setPhase("badge");
  };

  const toggleEffects = () => {
    setEffectsMode((current) => current === "cinematic" ? "reduced" : "cinematic");
  };

  const impactMessage = pokemon.moveType === "grass" ? "It's super effective!" : "A critical hit!";

  const dialogText = phase === "deploy"
    ? `Gym Leader Simon sent out Swampert! Go, ${pokemon.name}!`
    : phase === "attack"
      ? `${pokemon.name} used ${pokemon.move}!`
      : phase === "impact"
        ? impactMessage
        : phase === "faint"
          ? "Swampert fainted!"
          : "The final current is gathering…";

  const playerSource = cinematic ? pokemon.backSprite : pokemon.backStill;
  const enemySource = cinematic ? SWAMPERT_ANIMATED : SWAMPERT_STILL;

  const playerAnimation = !cinematic || phase !== "attack"
    ? { opacity: 1, x: 0, y: 0, scale: 1 }
    : pokemon.type === "grass"
      ? { x: [0, "32vw", "32vw", 0], y: [0, "-24vh", "-24vh", 0], scale: [1, 1.08, 1.08, 1] }
      : pokemon.type === "fire"
        ? { x: [0, -8, 4, 0], scale: [1, 0.92, 1.08, 1] }
        : { x: [0, -12, 0], scale: [1, 1.09, 1] };

  const enemyAnimation = phase === "faint"
    ? cinematic ? { opacity: [1, 0.75, 0], y: [0, 10, 84], rotate: [0, -5, 18] } : { opacity: 0 }
    : phase === "impact"
      ? cinematic ? { x: [0, -8, 8, -6, 5, 0], scale: 1, filter: ["brightness(1)", "brightness(5)", "brightness(1)"] } : { opacity: [1, 0.35, 1], scale: 1 }
      : { opacity: 1, x: 0, y: 0, scale: 1, rotate: 0, filter: "brightness(1)" };

  return (
    <FullscreenDialog onClose={onCancel} ariaLabel="Gym Leader battle" showBackdrop={false} className="bg-black" contentClassName="h-full w-full overflow-hidden">
      <div className="relative h-full w-full overflow-hidden bg-black" data-battle-phase={phase} data-effects-mode={effectsMode} data-badge-ready={badgeReady ? "true" : "false"}>
        {phase !== "badge" && <>
          <button type="button" onClick={onCancel} className="absolute left-[max(0.75rem,env(safe-area-inset-left))] top-[max(0.75rem,env(safe-area-inset-top))] z-[120] grid size-11 place-items-center rounded-full border border-white/15 bg-black/65 text-white/75 backdrop-blur transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" aria-label="Exit battle"><X size={20} /></button>
          <div className="absolute right-[max(0.75rem,env(safe-area-inset-right))] top-[max(0.75rem,env(safe-area-inset-top))] z-[120] flex items-center gap-2">
            <button
              type="button"
              onClick={toggleEffects}
              aria-pressed={!cinematic}
              aria-label={cinematic ? "Reduce battle effects" : "Use full battle effects"}
              title={cinematic ? "Reduce battle effects" : "Use full battle effects"}
              className="inline-flex min-h-11 items-center gap-1.5 rounded-full border border-white/10 bg-black/55 px-3 font-mono text-[9px] font-bold uppercase tracking-[0.1em] text-white/55 backdrop-blur transition-colors hover:border-primary/35 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:gap-2 sm:px-4 sm:text-[10px]"
            >
              {cinematic ? <Feather size={14} /> : <Sparkles size={14} />}
              <span className="hidden min-[380px]:inline">{cinematic ? "Reduce effects" : "Full effects"}</span>
              <span className="min-[380px]:hidden">{cinematic ? "Reduce" : "Full"}</span>
            </button>
            <button type="button" onClick={skipToBadge} className="inline-flex min-h-11 items-center gap-1.5 rounded-full border border-white/15 bg-black/65 px-3 font-mono text-[9px] font-bold uppercase tracking-[0.12em] text-white/75 backdrop-blur transition-colors hover:border-primary/45 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:gap-2 sm:px-4 sm:text-[10px]" aria-label="Skip to badge">
              <span className="hidden min-[380px]:inline">Skip to badge</span><span className="min-[380px]:hidden">Skip</span> <SkipForward size={15} />
            </button>
          </div>
        </>}

        <AnimatePresence mode="wait">
          {phase === "vs" && (
            <motion.div key="vs" className="absolute inset-0 grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-1 overflow-hidden bg-black px-3 sm:gap-5 sm:px-8 md:px-14" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div aria-hidden className="absolute inset-0 opacity-30 [background-image:repeating-linear-gradient(112deg,transparent_0,transparent_18px,rgba(255,255,255,0.12)_19px,transparent_21px)]" />
              <motion.div aria-hidden className="absolute -left-[20%] top-0 h-full w-[70%] -skew-x-12 bg-gradient-to-r from-red-950 via-red-700/45 to-transparent" initial={{ x: cinematic ? "-70%" : 0, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.45 }} />
              <motion.div aria-hidden className="absolute -right-[20%] top-0 h-full w-[70%] skew-x-12 bg-gradient-to-l from-cyan-950 via-cyan-700/45 to-transparent" initial={{ x: cinematic ? "70%" : 0, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.45 }} />
              <motion.div className="relative z-10 flex min-w-0 flex-col items-center gap-3" initial={{ x: cinematic ? -220 : 0, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.12, type: "spring", stiffness: 85, damping: 18 }}>
                <Image src={cinematic ? trainer.animatedSprite : trainer.stillSprite} alt={trainer.name} width={176} height={176} unoptimized className="size-[clamp(8.5rem,29vw,12rem)] object-contain drop-shadow-[0_0_18px_rgba(248,113,113,0.5)]" style={{ imageRendering: "pixelated" }} />
                <p className="text-center font-mono text-[9px] uppercase leading-loose tracking-[0.18em] text-white/70 sm:text-xs">Challenger<br /><span className="font-bold text-white">{trainer.name}</span></p>
              </motion.div>
              <motion.div className="relative z-10 select-none text-[clamp(2.6rem,13vw,7rem)] font-black text-yellow-300 [text-shadow:0_0_20px_rgba(255,215,0,1),0_0_50px_rgba(255,100,0,0.65)]" initial={{ opacity: 0, scale: cinematic ? 0.2 : 1 }} animate={{ opacity: 1, scale: cinematic ? [0.2, 1.45, 1] : 1 }} transition={{ delay: 0.38, duration: 0.42 }}>VS</motion.div>
              <motion.div className="relative z-10 flex min-w-0 flex-col items-center gap-3" initial={{ x: cinematic ? 220 : 0, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.12, type: "spring", stiffness: 85, damping: 18 }}>
                <Image src="/simon-trainer.png" alt="Gym Leader Simon" width={160} height={220} className="h-[clamp(8.5rem,27vw,12rem)] w-auto max-w-full object-contain drop-shadow-[0_0_20px_rgba(0,210,255,0.55)]" />
                <p className="text-center font-mono text-[9px] uppercase leading-loose tracking-[0.18em] text-primary sm:text-xs">Gym Leader<br /><span className="font-bold">Simon</span></p>
              </motion.div>
              {cinematic && <motion.div aria-hidden className="absolute inset-0 z-20 bg-white" initial={{ opacity: 0 }} animate={{ opacity: [0, 0.72, 0] }} transition={{ delay: 0.82, duration: 0.16 }} />}
            </motion.div>
          )}

          {phase !== "vs" && phase !== "badge" && (
            <motion.div key="arena" className="absolute inset-0 flex flex-col" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.28 }}>
              <motion.div className="battle-arena relative flex-1 overflow-hidden bg-[radial-gradient(circle_at_50%_120%,rgba(14,116,144,0.42),transparent_45%),linear-gradient(to_bottom,#050d19,#0a2038_58%,#07355b)]" animate={cinematic && phase === "impact" ? { x: [0, -8, 7, -5, 4, 0] } : { x: 0 }} transition={{ duration: 0.16 }}>
                <div aria-hidden className="absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(103,232,249,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(103,232,249,0.08)_1px,transparent_1px)] [background-size:32px_32px]" />
                <div aria-hidden className="absolute inset-x-[8%] bottom-[10%] h-px bg-gradient-to-r from-transparent via-cyan-200/50 to-transparent shadow-[0_0_24px_rgba(34,211,238,0.55)]" />

                <div className="battle-enemy absolute right-3 top-16 z-20 flex flex-col items-end gap-1.5 sm:right-8 md:right-14">
                  <div className="battle-hp w-[clamp(9rem,46vw,12rem)] rounded-lg border border-white/10 bg-[#0d1e30]/94 px-3 py-2 backdrop-blur-sm sm:px-4">
                    <div className="mb-1.5 flex justify-between font-mono text-xs"><span className="font-bold tracking-wide text-white">SWAMPERT</span><span className="text-white/60">Lv50</span></div>
                    <div className="flex items-center gap-2"><span className="font-mono text-[10px] text-white/60">HP</span><div role="progressbar" aria-label="Swampert HP" aria-valuemin={0} aria-valuemax={100} aria-valuenow={swampertHp} className="h-2 flex-1 overflow-hidden rounded-full bg-white/10"><motion.div className="h-full rounded-full" initial={{ width: "100%", backgroundColor: "#4ade80" }} animate={{ width: `${swampertHp}%`, backgroundColor: swampertHp === 0 ? ["#4ade80", "#facc15", "#ef4444"] : "#4ade80" }} transition={{ duration: cinematic ? 0.9 : 0.35, ease: "easeOut" }} /></div></div>
                  </div>
                  <MotionImage src={enemySource} alt="Swampert" width={176} height={176} unoptimized className="battle-sprite relative z-20 size-[clamp(6rem,24vmin,11rem)] object-contain" style={{ imageRendering: "pixelated" }} initial={phase === "deploy" ? { opacity: 0, scale: cinematic ? 0.25 : 1 } : false} animate={enemyAnimation} transition={{ duration: phase === "faint" ? 0.72 : 0.18 }} />
                </div>

                <div className="battle-player absolute bottom-3 left-3 z-30 flex flex-col items-start gap-1.5 sm:bottom-5 sm:left-8 md:left-14">
                  <MotionImage src={playerSource} alt={pokemon.name} width={208} height={208} unoptimized className="battle-sprite relative z-20 size-[clamp(6.5rem,26vmin,13rem)] object-contain" style={{ imageRendering: "pixelated" }} initial={phase === "deploy" ? { opacity: 0, scale: cinematic ? 0.25 : 1 } : false} animate={playerAnimation} transition={{ duration: phase === "attack" ? 0.95 : 0.45, ease: "easeOut" }} />
                  <div className="battle-hp w-[clamp(9rem,46vw,12rem)] rounded-lg border border-white/10 bg-[#0d1e30]/94 px-3 py-2 backdrop-blur-sm sm:px-4"><div className="mb-1.5 flex justify-between font-mono text-xs"><span className="font-bold uppercase tracking-wide text-white">{pokemon.name}</span><span className="text-white/60">Lv50</span></div><div className="flex items-center gap-2"><span className="font-mono text-[10px] text-white/60">HP</span><div className="h-2 flex-1 overflow-hidden rounded-full bg-white/10"><div className="h-full w-full rounded-full bg-green-400" /></div></div></div>
                </div>

                {phase === "deploy" && <DeploymentEffects cinematic={cinematic} />}
                {phase === "attack" && (cinematic
                  ? pokemon.moveEffect === "hydro-pump"
                    ? <WaterAttack />
                    : pokemon.moveEffect === "leaf-blade"
                      ? <GrassAttack sprite={pokemon.backSprite} />
                      : <GrassKnotAttack />
                  : <ReducedAttack pokemon={pokemon} />)}
                {phase === "impact" && <motion.div aria-hidden className="pointer-events-none absolute inset-0 z-50 bg-white" initial={{ opacity: 0 }} animate={{ opacity: [0, cinematic ? 0.68 : 0.22, 0] }} transition={{ duration: 0.16 }} />}
                {phase === "faint" && cinematic && <PixelDissolve />}
              </motion.div>
              <div className="relative z-60 flex min-h-[4.75rem] max-h-28 items-center gap-3 border-t-2 border-primary/30 bg-[#0d1e30]/97 px-4 py-3 sm:px-7"><motion.p key={dialogText} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-1 font-mono text-xs leading-relaxed text-white sm:text-sm md:text-base">{dialogText}</motion.p><div aria-hidden className="size-3 shrink-0 rotate-45 border-b-2 border-r-2 border-white/40" /></div>
            </motion.div>
          )}
        </AnimatePresence>

        {phase === "badge" && <BadgeCeremony trainer={trainer} pokemon={pokemon} cinematic={cinematic} ready={badgeReady} returnButtonRef={returnButtonRef} onReturn={() => onEarnBadge(trainer, pokemon)} onReplay={onReplay} />}
      </div>
    </FullscreenDialog>
  );
}
