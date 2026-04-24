// ---------------------------------------------------------------------------
// Site copy: Hero, metadata, section titles, UI strings
// ---------------------------------------------------------------------------

export const hero = {
  name: "Simon Ocampo Millan",
  subheadline: "Teaching Assistant @  UCF CECS · Computer Science @ UCF",
  ctaWork: "View Work",
  ctaResume: "Resume",
  ctaWorkHref: "#projects",
  ctaResumeHref: "/Resume.pdf",
} as const;

export const metadata = {
  title: "Simon Ocampo Millan | Portfolio",
  description: "Teaching Assistant @  UCF CECS · Computer Science @ UCF",
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
