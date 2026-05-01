"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

type BattleStage = "vs" | "field" | "outro";
type FieldPhase = "intro" | "attacking" | "fainted" | "defeated";

export interface BattleSceneProps {
  onComplete: () => void;
  trainerName: string;
  trainerSprite: string;
  pokemonId: number;
  pokemonName: string;
  moveName: string;
  moveType: "water" | "grass" | "fire";
}

const SWAMPERT_FRONT =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/260.gif";

function AttackEffect({ moveType, playerPokemonSrc }: { moveType: "water" | "grass" | "fire", playerPokemonSrc: string }) {
  if (moveType === "water") {
    return (
      <div className="absolute inset-0 pointer-events-none z-30">
        {/* Phase A: Glow */}
        <motion.div 
          className="absolute bottom-14 left-8 md:left-20 w-36 h-36 md:w-56 md:h-56 rounded-full"
          initial={{ boxShadow: "0 0 0px rgba(6, 182, 212, 0)" }}
          animate={{ boxShadow: ["0 0 0px rgba(6, 182, 212, 0)", "0 0 60px rgba(6, 182, 212, 1)", "0 0 0px rgba(6, 182, 212, 0)"] }}
          transition={{ duration: 0.3 }}
        />
        {/* Phase B: Vortex Beam */}
        <motion.div
           className="absolute bottom-[160px] left-[100px] md:bottom-[200px] md:left-[180px] w-[65%] md:w-[50%] origin-left"
           initial={{ scaleX: 0, opacity: 1, rotate: -28 }}
           animate={{ scaleX: 1, opacity: [1, 1, 0], rotate: -28 }}
           transition={{ delay: 0.3, duration: 0.4, times: [0, 0.8, 1] }}
        >
          <motion.div 
             className="absolute inset-0 h-6 md:h-12 bg-gradient-to-r from-cyan-400 to-blue-500 blur-sm rounded-full mix-blend-screen"
             animate={{ rotateX: 360 }}
             transition={{ repeat: Infinity, duration: 0.2, ease: "linear" }}
          />
          <motion.div 
             className="absolute inset-0 h-4 md:h-10 bg-gradient-to-r from-white to-cyan-300 blur-[2px] rounded-full mix-blend-screen"
             animate={{ rotateX: -360 }}
             transition={{ repeat: Infinity, duration: 0.25, ease: "linear" }}
          />
          {/* Particles */}
          {[...Array(8)].map((_, i) => (
             <motion.div
               key={i}
               className="absolute w-2 h-2 bg-white rounded-full blur-[1px]"
               initial={{ left: "0%", top: "50%", y: 0 }}
               animate={{ left: "100%", y: (i % 2 === 0 ? -20 : 20) }}
               transition={{ delay: 0.3 + i * 0.05, duration: 0.3 }}
             />
          ))}
        </motion.div>
        {/* Phase C: Splash Burst */}
        <motion.div
          className="absolute top-[80px] right-[40px] md:top-[120px] md:right-[100px] w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-cyan-400"
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 2, opacity: 0 }}
          transition={{ delay: 0.7, duration: 0.2, ease: "easeOut" }}
        />
        <motion.div
          className="absolute top-[80px] right-[40px] md:top-[120px] md:right-[100px] w-32 h-32 md:w-40 md:h-40 bg-cyan-300 blur-lg mix-blend-color-dodge"
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 2.5, opacity: 0 }}
          transition={{ delay: 0.7, duration: 0.25, ease: "easeOut" }}
        />
      </div>
    );
  }
  if (moveType === "grass") {
    return (
      <div className="absolute inset-0 pointer-events-none z-30">
        {/* Phase A: Ghost trail */}
        <motion.img 
          src={playerPokemonSrc}
          className="absolute bottom-14 left-8 md:left-20 w-36 h-36 md:w-56 md:h-56 object-contain"
          style={{ imageRendering: "pixelated", filter: "brightness(2) saturate(2)" }}
          initial={{ x: 0, opacity: 0.6, scale: 1.1 }}
          animate={{ x: 150, opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        />
        {/* Phase B: Slashes */}
        <svg className="absolute top-0 right-0 w-full h-full overflow-visible">
           {[0, 1, 2].map((i) => (
             <motion.path
               key={i}
               d={`M ${60 + i * 15}% ${25 - i * 5}% Q ${75 + i * 10}% ${35}% ${90}% ${45 - i * 10}%`}
               fill="transparent"
               stroke="#4ade80"
               strokeWidth="8"
               strokeLinecap="round"
               style={{ filter: "drop-shadow(0 0 8px rgba(74,222,128,0.8))" }}
               initial={{ pathLength: 0, opacity: 1 }}
               animate={{ pathLength: 1, opacity: [1, 1, 0] }}
               transition={{ delay: 0.25 + i * 0.15, duration: 0.2, times: [0, 0.7, 1] }}
             />
           ))}
        </svg>
        {/* Leaf particles */}
        {[...Array(6)].map((_, i) => (
           <motion.div
             key={i}
             className="absolute top-[20%] right-[20%] w-4 h-2 bg-green-400 rounded-full"
             initial={{ scale: 0, x: 0, y: 0, rotate: 0 }}
             animate={{ scale: [0, 1, 0], x: (i % 2 === 0 ? 60 : -60) * Math.random(), y: 60 + 60 * Math.random(), rotate: 360 }}
             transition={{ delay: 0.4 + (i * 0.05), duration: 0.3 }}
           />
        ))}
      </div>
    );
  }
  if (moveType === "fire") {
    return (
      <div className="absolute inset-0 pointer-events-none z-30">
        {/* Phase A: Inhale glow */}
        <motion.div 
          className="absolute bottom-10 left-10 md:left-24 w-32 h-10 md:w-44 md:h-12 bg-orange-500 rounded-full blur-xl mix-blend-screen"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [0, 1.5, 0], opacity: [0, 0.8, 0] }}
          transition={{ duration: 0.8 }}
        />
        {/* Phase B: Thick flame stream */}
        <motion.div
           className="absolute bottom-[120px] left-[100px] md:bottom-[150px] md:left-[180px] w-[65%] md:w-[50%] origin-left"
           initial={{ scaleX: 0, rotate: -20 }}
           animate={{ scaleX: 1, opacity: [0.8, 1, 0.8, 1, 0], rotate: -20 }}
           transition={{ delay: 0.35, duration: 0.5, times: [0, 0.2, 0.5, 0.8, 1] }}
        >
           <div className="absolute inset-0 h-10 md:h-16 bg-gradient-to-r from-red-600 via-orange-500 to-yellow-400 blur-md rounded-full mix-blend-screen" />
           <motion.div 
             className="absolute inset-0 h-8 md:h-12 mt-1 md:mt-2 bg-gradient-to-r from-white via-yellow-200 to-transparent blur-sm rounded-full mix-blend-screen"
             animate={{ height: ["100%", "80%", "100%"] }}
             transition={{ repeat: Infinity, duration: 0.1 }}
           />
           {/* Ember particles */}
           {[...Array(10)].map((_, i) => (
             <motion.div
               key={i}
               className="absolute w-2 h-2 bg-yellow-300 rounded-full blur-[1px]"
               initial={{ left: "0%", top: "50%", y: 0 }}
               animate={{ left: "100%", y: (i % 2 === 0 ? -20 : 20) + (Math.random() - 0.5) * 40 }}
               transition={{ delay: 0.35 + Math.random() * 0.2, duration: 0.4 }}
             />
           ))}
        </motion.div>
        {/* Phase C: Explosion */}
        <motion.div
          className="absolute top-[80px] right-[40px] md:top-[120px] md:right-[100px] w-32 h-32 md:w-40 md:h-40 bg-orange-500 blur-2xl mix-blend-screen"
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 3, opacity: 0 }}
          transition={{ delay: 0.85, duration: 0.2, ease: "easeOut" }}
        />
      </div>
    );
  }
  return null;
}

export default function BattleScene({ 
  onComplete,
  trainerName,
  trainerSprite,
  pokemonId,
  pokemonName,
  moveName,
  moveType
}: BattleSceneProps) {
  const [stage, setStage] = useState<BattleStage>("vs");
  const [fieldPhase, setFieldPhase] = useState<FieldPhase>("intro");
  const [swampertHp, setSwampertHp] = useState(100);
  const [dialogText, setDialogText] = useState(`Gym Leader Simon sent out Swampert!`);
  const [swampertHit, setSwampertHit] = useState(false);

  const PLAYER_POKEMON_BACK = `https://play.pokemonshowdown.com/sprites/gen5ani-back/${pokemonName.toLowerCase()}.gif`;

  useEffect(() => {
    const t = (ms: number, fn: () => void) => setTimeout(fn, ms);
    const attackStart = 3800;
    const hitImpact = 4650; // attackStart + 850
    const hpDrain = 4800;   // hitImpact + 150
    
    const timers = [
      t(2200, () => setStage("field")),
      t(attackStart, () => {
        setFieldPhase("attacking");
        setDialogText(`${pokemonName} used ${moveName}!`);
      }),
      t(hitImpact, () => {
        setDialogText("It's a critical hit!");
        setSwampertHit(true);
      }),
      t(hpDrain, () => {
        setSwampertHp(0);
        setSwampertHit(false); // remove screen shake
      }),
      t(hpDrain + 1400, () => {
        setFieldPhase("fainted");
        setDialogText("Swampert fainted!");
      }),
      t(hpDrain + 2800, () => {
        setFieldPhase("defeated");
        setDialogText("Gym Leader Simon is out of usable Pokémon! You win!");
      }),
      t(hpDrain + 4600, () => setStage("outro")),
      t(hpDrain + 5400, () => onComplete()),
    ];
    return () => timers.forEach(clearTimeout);
  }, [onComplete, pokemonName, moveName]);

  const swampertAnimate = (() => {
    if (swampertHit) {
      return { x: [0, -8, 8, -8, 8, 0] };
    }
    if (fieldPhase === "fainted" || fieldPhase === "defeated") {
      return { 
        y: [0, -12, 80], 
        rotate: [0, -8, 75], 
        opacity: [1, 1, 0]
      };
    }
    if (swampertHp === 0) {
      return { x: [0, -18, 18, -18, 18, 0] };
    }
    return { x: 0, y: 0, opacity: 1, rotate: 0 };
  })();

  const swampertTransition = (() => {
    if (swampertHit) return { duration: 0.15 };
    if (fieldPhase === "fainted" || fieldPhase === "defeated") return { duration: 0.8, ease: "easeIn" as const };
    if (swampertHp === 0) return { duration: 0.4 };
    return { duration: 0.5 };
  })();

  const playerPokemonAnimate = (() => {
    if (fieldPhase === "attacking") {
      if (moveType === "water") return { scale: [1, 1.1, 1], transition: { duration: 0.3 } };
      if (moveType === "grass") return { x: [0, 200, 200, 0], scale: [1, 1.1, 1.1, 1], transition: { times: [0, 0.25, 0.7, 0.9], duration: 1.0 } };
      if (moveType === "fire") return { scale: [1, 0.95, 1.08, 1], transition: { times: [0, 0.1, 0.35, 1], duration: 0.85 } };
    }
    return { x: 0, scale: 1 };
  })();

  const swampertFilterAnimate = (() => {
    if (fieldPhase === "attacking" && moveType === "grass") {
      return {
        filter: [
          "brightness(1)", "brightness(1)", "brightness(5)", "brightness(1)", 
          "brightness(1)", "brightness(5)", "brightness(1)",
          "brightness(1)", "brightness(5)", "brightness(1)"
        ],
        transition: {
          times: [0, 0.25, 0.28, 0.35, 0.4, 0.43, 0.5, 0.55, 0.58, 0.65],
          duration: 1
        }
      };
    }
    if (swampertHit) {
      return { filter: ["brightness(1)", "brightness(8)", "brightness(1)"], transition: { duration: 0.15 } };
    }
    return { filter: "brightness(1)" };
  })();

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-black overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
    >
      <AnimatePresence mode="wait">

        {/* ── VS SCREEN ── */}
        {stage === "vs" && (
          <motion.div
            key="vs"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: [1, 0, 1, 0, 1, 0], transition: { duration: 0.55 } }}
            className="absolute inset-0 flex items-center justify-between px-8 md:px-20 bg-black"
          >
            {/* Challenger side */}
            <motion.div
              initial={{ x: -260, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.25, type: "spring", stiffness: 75, damping: 18 }}
              className="flex flex-col items-center gap-5"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-red-500/20 shadow-[0_0_40px_rgba(220,38,38,0.4)] blur-xl rounded-full" />
                <img
                  src={trainerSprite}
                  alt={trainerName}
                  className="relative z-10 drop-shadow-[0_0_15px_rgba(220,38,38,0.6)] h-56 object-contain"
                  style={{ imageRendering: "pixelated" }}
                />
              </div>
              <p className="font-mono text-xs text-white/60 tracking-[0.25em] uppercase text-center leading-loose">
                Challenger<br />{trainerName}
              </p>
            </motion.div>

            {/* VS */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 1.5, 1], opacity: 1 }}
              transition={{ delay: 0.85, duration: 0.5 }}
              className="text-7xl md:text-9xl font-black select-none"
              style={{
                color: "#FFD700",
                textShadow:
                  "0 0 20px rgba(255,215,0,1), 0 0 50px rgba(255,165,0,0.9), 0 0 80px rgba(255,100,0,0.5)",
              }}
            >
              VS
            </motion.div>

            {/* Simon side */}
            <motion.div
              initial={{ x: 260, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.25, type: "spring", stiffness: 75, damping: 18 }}
              className="flex flex-col items-center gap-5"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-blue-400/25 blur-2xl rounded-full" />
                <Image
                  src="/simon-trainer.png"
                  alt="Gym Leader Simon"
                  width={160}
                  height={220}
                  className="relative z-10 drop-shadow-[0_0_24px_rgba(0,210,255,0.7)]"
                />
              </div>
              <p className="font-mono text-xs text-primary tracking-[0.25em] uppercase text-center leading-loose">
                Gym Leader<br />Simon
              </p>
            </motion.div>
          </motion.div>
        )}

        {/* ── BATTLE FIELD ── */}
        {stage === "field" && (
          <motion.div
            key="field"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45 }}
            className="absolute inset-0 flex flex-col"
          >
            {/* Arena wrapper with screen shake on hit impact */}
            <motion.div 
               className="flex-1 relative bg-gradient-to-b from-[#060e1c] via-[#0b1e38] to-[#0a3060] overflow-hidden"
               animate={swampertHit ? { x: [0, -4, 4, -4, 0] } : {}}
               transition={{ duration: 0.15 }}
            >
              {/* Enemy side — top right */}
              <div className="absolute top-6 right-8 md:right-20 flex flex-col items-end gap-2 z-10">
                {/* HP bar */}
                <div className="bg-[#0d1e30]/90 rounded-lg px-4 py-2 min-w-[190px] border border-white/10 backdrop-blur-sm">
                  <div className="flex justify-between text-xs font-mono mb-1.5">
                    <span className="text-white font-bold tracking-wide">SWAMPERT</span>
                    <span className="text-white/40">Lv50</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-white/40">HP</span>
                    <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        initial={{ width: "100%" }}
                        animate={{ width: `${swampertHp}%` }}
                        transition={{ duration: 1.1, ease: "easeOut" }}
                        style={{
                          backgroundColor:
                            swampertHp === 0
                              ? "#ef4444"
                              : swampertHp < 30
                              ? "#eab308"
                              : "#4ade80",
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Swampert sprite */}
                <div className="relative">
                  <motion.img
                    src={SWAMPERT_FRONT}
                    alt="Swampert"
                    className="w-32 h-32 md:w-40 md:h-40 object-contain relative z-20"
                    style={{ imageRendering: "pixelated" }}
                    animate={{ ...swampertAnimate, ...swampertFilterAnimate }}
                    transition={swampertTransition}
                  />

                  {/* Faint Sparkles */}
                  {fieldPhase === "fainted" && (
                     <motion.div 
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: [0, 1, 0], scale: [0, 1.5, 2] }}
                        transition={{ duration: 0.6 }}
                        className="absolute bottom-4 left-1/2 -translate-x-1/2 w-20 h-20 bg-white/20 blur-md rounded-full"
                     />
                  )}
                </div>
              </div>

              {/* Player side — bottom left */}
              <div className="absolute bottom-14 left-8 md:left-20 flex flex-col items-start gap-2 z-20">
                <motion.img
                  src={PLAYER_POKEMON_BACK}
                  alt={pokemonName}
                  className="w-36 h-36 md:w-56 md:h-56 object-contain relative z-10"
                  style={{ imageRendering: "pixelated" }}
                  animate={playerPokemonAnimate}
                />
                {/* HP bar */}
                <div className="bg-[#0d1e30]/90 rounded-lg px-4 py-2 min-w-[190px] border border-white/10 backdrop-blur-sm">
                  <div className="flex justify-between text-xs font-mono mb-1.5">
                    <span className="text-white font-bold tracking-wide uppercase">{pokemonName}</span>
                    <span className="text-white/40">Lv50</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-white/40">HP</span>
                    <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-green-400 w-full rounded-full" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Attacks Layer */}
              <AnimatePresence>
                {fieldPhase === "attacking" && (
                   <AttackEffect moveType={moveType} playerPokemonSrc={PLAYER_POKEMON_BACK} />
                )}
              </AnimatePresence>
            </motion.div>

            {/* Dialog box */}
            <div className="h-28 bg-[#0d1e30]/95 border-t-2 border-primary/30 flex items-center px-8 gap-4 z-40 relative">
              <motion.p
                key={dialogText}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="font-mono text-white text-sm md:text-base leading-relaxed flex-1"
              >
                {dialogText}
              </motion.p>
              <div className="w-3 h-3 border-r-2 border-b-2 border-white/40 rotate-45 flex-shrink-0" />
            </div>
          </motion.div>
        )}

        {/* ── OUTRO ── */}
        {stage === "outro" && (
          <motion.div
            key="outro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 bg-black"
          />
        )}

      </AnimatePresence>
    </motion.div>
  );
}
