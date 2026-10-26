// ---------------------------------------------------------------------------
// Site copy: Hero, metadata, section titles, UI strings
// ---------------------------------------------------------------------------

export const hero = {
  name: "Simon Ocampo Millan",
  eyebrow: "Gym Leader // Full-stack + AI systems",
  ctaWork: "View Work",
  ctaResume: "Resume",
  ctaWorkHref: "#projects",
  ctaResumeHref: "/resumes/Simon-Ocampo-Software-Engineering.pdf",
} as const;

export const metadata = {
  title: "Neural Water Gym | Simon Ocampo Millan | Portfolio",
  description: "Simon Ocampo Millan builds full-stack applications and applied AI systems. Explore projects, engineering experience, and software and AI résumés.",
} as const;

export const sectionTitles = {
  projects: { title: "Trainer Gauntlet" },
  experience: { title: "Battle History" },
  involvement: { title: "Training Grounds" },
  education: { title: "Leader's Sanctum" },
} as const;

export const projectModal = {
  viewCode: "View Code",
  liveDemo: "Live Demo",
} as const;

export const linkLabels = {
  github: "GitHub",
  linkedin: "LinkedIn",
} as const;

export const typewriterWords = [
  "Gym Leader Simon wants to battle!",
  "Challenger approaches the Neural Water Gym!",
] as const;
