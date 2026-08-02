"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, FileText, Github, Linkedin, Mail } from "lucide-react";
import SequentialTypewriter from "@/components/SequentialTypewriter";
import { hero, typewriterWords } from "@/data/site";
import {
  EMAIL_ADDRESS,
  GITHUB_URL,
  LINKEDIN_URL,
  RESUME_URL,
} from "@/data/links";
import { useHydratedReducedMotion } from "@/hooks/useHydratedReducedMotion";

interface HeroProps {
  onNext?: () => void;
}

export default function Hero({ onNext }: HeroProps) {
  const [step, setStep] = useState(0);
  const shouldReduceMotion = useHydratedReducedMotion();
  const visibleStep = shouldReduceMotion ? 5 : step;
  const [firstName, ...lastNameParts] = hero.name.split(" ");

  useEffect(() => {
    if (shouldReduceMotion) return;
    const timers = [
      window.setTimeout(() => setStep(1), 100),
      window.setTimeout(() => setStep(2), 380),
      window.setTimeout(() => setStep(3), 650),
      window.setTimeout(() => setStep(4), 900),
      window.setTimeout(() => setStep(5), 1250),
    ];
    return () => timers.forEach(window.clearTimeout);
  }, [shouldReduceMotion]);

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      aria-labelledby="home-heading"
      className="relative mx-auto flex min-h-full w-full max-w-[90rem] items-center px-5 pb-8 pt-10 text-center sm:px-8 sm:pt-20 lg:px-14 lg:text-left xl:px-20"
    >
      <div className="grid w-full min-w-0 items-center gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(24rem,1.1fr)] lg:gap-10 xl:gap-16">
        <div className="relative z-10 flex min-w-0 flex-col items-center lg:items-start">
          <AnimatePresence>
            {visibleStep >= 5 && (
              <motion.div
                initial={shouldReduceMotion ? false : { opacity: 0, x: -28 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: shouldReduceMotion ? 0 : 0.6 }}
                className="flex w-full min-w-0 flex-col items-center lg:items-start"
              >
                <p className="mb-4 font-mono text-[10px] font-bold uppercase tracking-[0.32em] text-primary/75 sm:text-xs">
                  {hero.eyebrow}
                </p>
                <motion.h1
                  id="home-heading"
                  animate={shouldReduceMotion ? undefined : { y: [0, -5, 0] }}
                  transition={shouldReduceMotion ? undefined : { repeat: Infinity, duration: 6, ease: "easeInOut" }}
                  className="text-balance bg-gradient-to-br from-[#dff8ff] via-primary to-secondary bg-clip-text pb-2 text-[clamp(3rem,14vw,5rem)] font-black leading-[0.9] tracking-[-0.055em] text-transparent drop-shadow-[0_0_16px_rgba(0,210,255,0.22)] lg:text-[clamp(4.25rem,6vw,5.75rem)]"
                >
                  <span className="block">{firstName}</span>
                  <span className="block">{lastNameParts.join(" ")}</span>
                </motion.h1>

                <p className="mt-5 max-w-xl text-balance text-base font-semibold leading-relaxed text-slate-200 sm:text-lg">
                  {hero.subheadline}
                </p>
                <div className="mt-5 min-h-[5.25rem] w-full max-w-xl">
                  <SequentialTypewriter lines={typewriterWords} className="text-center lg:items-start lg:text-left" />
                </div>

                <div className="mt-7 flex w-full max-w-xl flex-col gap-3 sm:flex-row">
                  {onNext && (
                    <button
                      type="button"
                      onClick={onNext}
                      className="group inline-flex min-h-14 flex-1 items-center justify-center gap-3 rounded-xl border-2 border-primary/75 bg-primary/12 px-6 py-4 text-sm font-black uppercase tracking-[0.16em] text-primary shadow-[0_0_24px_rgba(0,210,255,0.18)] backdrop-blur-md transition-all hover:border-primary hover:bg-primary hover:text-background hover:shadow-[0_0_36px_rgba(0,210,255,0.38)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                    >
                      Enter gym
                      <ArrowRight className="transition-transform group-hover:translate-x-1" size={19} />
                    </button>
                  )}
                  <a
                    href={RESUME_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-14 items-center justify-center gap-3 rounded-xl border border-white/15 bg-white/[0.04] px-6 py-4 text-sm font-bold uppercase tracking-[0.14em] text-white transition-colors hover:border-white/30 hover:bg-white/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    <FileText size={18} />
                    Résumé
                  </a>
                </div>

                <div className="mt-5 flex items-center gap-2" aria-label="Contact links">
                  <a className="hero-social" href={GITHUB_URL} target="_blank" rel="noopener noreferrer" aria-label="GitHub"><Github size={18} /></a>
                  <a className="hero-social" href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><Linkedin size={18} /></a>
                  <a className="hero-social" href={`mailto:${EMAIL_ADDRESS}`} aria-label="Email Simon"><Mail size={18} /></a>
                  <span className="ml-2 hidden font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500 sm:inline">
                    Open to building strange, useful things
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="relative mx-auto min-h-[19rem] w-full max-w-[36rem] overflow-hidden rounded-[2rem] border border-primary/10 bg-[radial-gradient(circle_at_55%_70%,rgba(0,210,255,0.12),transparent_48%)] sm:min-h-[24rem] lg:min-h-[31rem] lg:overflow-visible">
          <div aria-hidden className="absolute inset-x-[8%] bottom-[9%] h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent shadow-[0_0_24px_rgba(0,210,255,0.5)]" />
          <div aria-hidden className="absolute inset-x-[16%] bottom-[5%] h-16 rounded-[50%] border border-primary/15 bg-primary/[0.025] [transform:perspective(220px)_rotateX(65deg)]" />

          <div className="absolute inset-x-4 top-5 flex min-h-14 items-start justify-center sm:top-8 lg:justify-end">
            <AnimatePresence>
              {visibleStep >= 1 && visibleStep < 5 && (
                <motion.p
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  className="max-w-sm rounded-xl border border-white/15 bg-black/65 px-4 py-3 text-center font-mono text-[10px] uppercase tracking-[0.18em] text-white shadow-[0_0_18px_rgba(0,210,255,0.18)] backdrop-blur-md sm:text-xs"
                >
                  Gym Leader <span className="font-bold text-primary">Simon</span> challenges you
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          <div className="absolute inset-x-3 bottom-6 grid grid-cols-[0.92fr_1.08fr] items-end sm:inset-x-8 lg:bottom-8">
            <AnimatePresence>
              {visibleStep === 3 && (
                <motion.div
                  initial={{ scale: 0, opacity: 1 }} animate={{ scale: 6, opacity: 0 }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                  className="absolute bottom-16 left-1/4 z-20 size-10 rounded-full bg-cyan-300 shadow-[0_0_70px_rgba(34,211,238,1)]"
                />
              )}
              {visibleStep >= 4 && (
                <motion.div
                  initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.5, y: 30, rotate: -12 }}
                  animate={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 260, damping: 15 }}
                  className="relative z-10 flex items-end justify-center"
                >
                  <Image
                    src="/pokemon/swampert-front.gif"
                    alt="Swampert"
                    width={240}
                    height={240}
                    unoptimized
                    className="h-auto w-full max-w-[clamp(9rem,32vw,15rem)] object-contain drop-shadow-[0_0_18px_rgba(0,210,255,0.45)]"
                    style={{ imageRendering: "pixelated" }}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {visibleStep >= 2 && (
                <motion.div
                  initial={shouldReduceMotion ? false : { opacity: 0, x: 80, rotate: 6 }}
                  animate={{ opacity: 1, x: 0, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 210, damping: 20 }}
                  className="relative aspect-[4/5] w-full max-w-[clamp(10rem,35vw,17rem)] justify-self-end drop-shadow-[0_0_24px_rgba(0,210,255,0.22)]"
                >
                  <motion.div
                    className="absolute inset-0"
                    animate={shouldReduceMotion ? undefined : { scale: [1, 1.015, 1], y: [0, -3, 0] }}
                    transition={shouldReduceMotion ? undefined : { repeat: Infinity, duration: 3.2, ease: "easeInOut" }}
                  >
                    <Image
                      src="/simon-trainer.png" alt="Gym Leader Simon" fill priority
                      sizes="(max-width: 1024px) 45vw, 270px" className="object-contain"
                      style={{ imageRendering: "pixelated" }}
                    />
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
