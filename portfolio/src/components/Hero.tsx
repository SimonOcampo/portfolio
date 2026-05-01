"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import SequentialTypewriter from "@/components/SequentialTypewriter";
import { hero, typewriterWords } from "@/data/site";

const floating: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: [0, -10, 0],
    transition: {
      opacity: { duration: 0.8 },
      y: { repeat: Infinity, duration: 6 },
    },
  },
};

const breathing: Variants = {
  animate: {
    scale: [1, 1.02, 1],
    y: [0, -3, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

interface HeroProps {
  onNext?: () => void;
}

export default function Hero({ onNext }: HeroProps) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const sequence = async () => {
      // Step 0: Initial slight delay
      await new Promise((r) => setTimeout(r, 100));
      // Step 1: Text box appears
      setStep(1);
      await new Promise((r) => setTimeout(r, 500));
      // Step 2: Simon slides in
      setStep(2);
      await new Promise((r) => setTimeout(r, 400));
      // Step 3: Flash / Swampert summoned
      setStep(3);
      await new Promise((r) => setTimeout(r, 300));
      // Step 4: Swampert fully revealed
      setStep(4);
      await new Promise((r) => setTimeout(r, 600));
      // Step 5: Main UI (Enter Gym) appears
      setStep(5);
    };
    sequence();
  }, []);

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative mx-auto flex min-h-screen w-full max-w-7xl items-center justify-center overflow-hidden px-6 py-12 text-center md:px-12 md:text-left lg:px-20"
    >
      <div className="grid w-full items-center gap-12 md:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
        
        {/* Left Side: Title & Enter Gym */}
        <div className="flex flex-col items-center md:items-start min-h-[300px]">
          <AnimatePresence>
            {step >= 5 && (
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="flex flex-col items-center md:items-start w-full"
              >
                <motion.h1
                  variants={floating}
                  initial="hidden"
                  animate="show"
                  className="bg-gradient-to-r from-primary to-secondary bg-clip-text pb-2 text-5xl font-bold text-transparent drop-shadow-[0_0_10px_rgba(0,210,255,0.3)] md:text-7xl"
                >
                  {hero.name}
                </motion.h1>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  className="mt-6 flex min-h-[4rem] w-full justify-center md:justify-start"
                >
                  <SequentialTypewriter
                    lines={typewriterWords}
                    className="text-center md:items-start md:text-left"
                  />
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                  className="mt-12 w-full max-w-md"
                >
                  {onNext && (
                    <button
                      onClick={onNext}
                      className="group flex w-full flex-col items-center justify-center rounded-xl border-2 border-primary/80 bg-primary/10 px-6 py-5 font-bold uppercase tracking-widest text-white shadow-[0_0_20px_rgba(0,210,255,0.4)] backdrop-blur-md transition-all hover:bg-primary hover:shadow-[0_0_30px_rgba(0,210,255,0.8)]"
                    >
                      <span className="flex items-center text-xl text-primary group-hover:text-[#030B14] transition-colors">
                        ENTER GYM ▶
                      </span>
                    </button>
                  )}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right Side: Character Showcase */}
        <div className="flex flex-col items-center gap-6 md:items-end min-h-[400px] justify-center relative">
          
          {/* RPG Style Battle Text */}
          <div className="h-12 w-full flex items-center justify-center md:justify-end">
            <AnimatePresence>
              {step >= 1 && step < 5 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="rounded-xl border-2 border-white/20 bg-black/60 px-6 py-3 backdrop-blur-md shadow-[0_0_15px_rgba(0,210,255,0.4)]"
                >
                  <p className="font-mono text-sm uppercase tracking-widest text-white">
                    Gym Leader <span className="text-primary font-bold">Simon</span> challenges you!
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="relative flex w-full max-w-2xl flex-col items-end gap-6 sm:flex-row sm:justify-center sm:gap-8 md:justify-end min-h-[350px] mt-4">
            
            {/* Swampert Container (Left of Trainer) */}
            <div className="relative flex flex-col items-center justify-end w-auto px-2 h-full">
              <AnimatePresence>
                {step === 3 && (
                  <motion.div
                    initial={{ scale: 0, opacity: 1 }}
                    animate={{ scale: 6, opacity: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="absolute bottom-12 rounded-full bg-cyan-400 shadow-[0_0_80px_rgba(34,211,238,1)] w-12 h-12 z-20"
                  />
                )}
                {step >= 4 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0, y: 50, rotate: -20 }}
                    animate={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 12, mass: 0.8 }}
                    className="relative flex flex-col items-center gap-3 z-10"
                  >
                    <img
                      src="https://play.pokemonshowdown.com/sprites/gen5ani/swampert.gif"
                      alt="Swampert"
                      className="h-56 w-56 object-contain sm:h-72 sm:w-72 drop-shadow-[0_0_15px_rgba(0,210,255,0.5)]"
                      style={{ imageRendering: "pixelated" }}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Simon Trainer Container (Right of Swampert) */}
            <div className="relative flex flex-col items-center justify-end w-auto px-2 h-full">
              <AnimatePresence>
                {step >= 2 && (
                  <motion.div
                    initial={{ opacity: 0, x: 200, rotate: 10 }}
                    animate={{ opacity: 1, x: 0, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 250, damping: 18 }}
                    className="relative flex flex-col items-center gap-3"
                  >
                    <motion.div 
                      variants={breathing}
                      animate="animate"
                      className="relative h-64 w-64 sm:h-80 sm:w-80 drop-shadow-[0_0_20px_rgba(0,210,255,0.3)]"
                    >
                      <Image
                        src="/simon-trainer.png"
                        alt="Gym Leader Simon"
                        fill
                        priority
                        className="object-contain"
                        style={{ imageRendering: "pixelated" }}
                      />
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>
        </div>

      </div>
    </motion.section>
  );
}
