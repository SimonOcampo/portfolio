"use client";

import Image from "next/image";
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react";
import ResumeMenu from "@/components/ResumeMenu";
import { hero } from "@/data/site";
import { EMAIL_ADDRESS, GITHUB_URL, LINKEDIN_URL } from "@/data/links";

interface HeroProps {
  onNext?: () => void;
  animateEntrance?: boolean;
}

export default function Hero({ onNext, animateEntrance = true }: HeroProps) {
  const entrance = animateEntrance;
  const [firstName, ...lastNameParts] = hero.name.split(" ");

  return (
    <section
      aria-labelledby="home-heading"
      className="relative mx-auto flex min-h-full w-full max-w-[90rem] items-center px-5 pb-8 pt-7 text-center sm:px-8 sm:pt-10 lg:px-14 lg:text-left xl:px-20"
    >
      <div className="grid w-full min-w-0 items-center gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-8 xl:gap-12">
        <div className="relative z-10 flex min-w-0 flex-col items-center lg:items-start">
          <p className="mb-4 font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-primary sm:text-xs">
            {hero.eyebrow}
          </p>
          <h1
            id="home-heading"
            className="text-balance bg-gradient-to-br from-[#dff8ff] via-primary to-secondary bg-clip-text pb-2 text-[clamp(2.65rem,11.5vw,4.75rem)] font-black leading-[0.96] tracking-[-0.05em] text-transparent lg:text-[clamp(3.6rem,5.8vw,5.5rem)]"
          >
            <span className="block">{firstName}</span>
            <span className="block">{lastNameParts.join(" ")}</span>
          </h1>
          <p className="mt-5 max-w-md text-balance text-base leading-relaxed text-slate-200 sm:text-xl">
            I build full-stack applications and applied AI systems.
          </p>
          <div className="mt-6 flex w-full max-w-xl flex-col gap-3 sm:flex-row">
            {onNext && (
              <button type="button" onClick={onNext} className="group inline-flex min-h-14 flex-1 items-center justify-center gap-3 rounded-xl border border-primary/65 bg-primary/10 px-5 py-4 text-sm font-bold uppercase tracking-[0.12em] text-primary transition-colors hover:bg-primary hover:text-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background">
                Explore projects
                <ArrowRight className="motion-safe:transition-transform motion-safe:group-hover:translate-x-1" size={19} aria-hidden="true" />
              </button>
            )}
            <ResumeMenu />
          </div>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-2 lg:justify-start" aria-label="Contact links">
            <a className="hero-social" href={GITHUB_URL} target="_blank" rel="noopener noreferrer" aria-label="GitHub"><Github size={18} aria-hidden="true" /></a>
            <a className="hero-social" href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><Linkedin size={18} aria-hidden="true" /></a>
            <a className="hero-social" href={`mailto:${EMAIL_ADDRESS}`} aria-label="Email Simon"><Mail size={18} aria-hidden="true" /></a>
            <span className="ml-2 hidden max-w-48 text-left font-mono text-[10px] uppercase leading-relaxed tracking-[0.12em] text-slate-400 xl:inline">Open to building strange, useful things</span>
          </div>
        </div>
        <div
          data-expressive-motion
          onPointerMove={(event) => {
            if (event.pointerType !== "mouse") return;
            const bounds = event.currentTarget.getBoundingClientRect();
            event.currentTarget.style.setProperty("--trainer-x", `${((event.clientX - bounds.left) / bounds.width - 0.5) * 12}px`);
            event.currentTarget.style.setProperty("--trainer-y", `${((event.clientY - bounds.top) / bounds.height - 0.5) * 8}px`);
          }}
          onPointerLeave={(event) => {
            event.currentTarget.style.setProperty("--trainer-x", "0px");
            event.currentTarget.style.setProperty("--trainer-y", "0px");
          }}
          className="hero-stage relative mx-auto aspect-[1.35] w-full max-w-[34rem] overflow-hidden rounded-[1.75rem] border border-primary/15 bg-[radial-gradient(ellipse_at_50%_85%,rgba(0,210,255,0.14),transparent_65%)] lg:aspect-[1.05]">
          <p className="absolute inset-x-4 top-5 text-center font-mono text-[9px] uppercase tracking-[0.2em] text-primary/80 sm:text-[10px]">Neural Water Gym <span className="text-slate-400">{"// Challenger welcome"}</span></p>
          <div aria-hidden="true" className="absolute inset-x-[10%] bottom-[8%] h-12 rounded-[50%] border border-primary/25 bg-primary/5 [transform:perspective(240px)_rotateX(65deg)]" />
          <div className="absolute inset-x-3 bottom-[9%] grid grid-cols-[1fr_1.05fr] items-end sm:inset-x-6">
            <div className={`relative z-10 ${entrance ? "hero-partner-enter" : ""}`}>
              <Image src="/pokemon/swampert-front.gif" alt="Swampert, Simon's water-type partner" width={240} height={240} unoptimized loading="lazy" fetchPriority="low" className="h-auto w-full object-contain" style={{ imageRendering: "pixelated" }} />
            </div>
            <div className={`relative aspect-[4/5] w-full ${entrance ? "hero-trainer-enter" : ""}`}>
              <div className="hero-trainer-follow absolute inset-0">
                <div className="hero-trainer-idle absolute inset-0">
                  <Image src="/simon-trainer.png" alt="Simon as the Neural Water Gym leader" fill loading="lazy" fetchPriority="low" sizes="(max-width: 639px) 45vw, (max-width: 1023px) 250px, 270px" className="object-contain" style={{ imageRendering: "pixelated" }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
