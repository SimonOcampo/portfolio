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
  projects: { num: "01", title: "Selected Projects" },
  experience: { num: "02", title: "Experience" },
  involvement: { num: "03", title: "Leadership & Involvement" },
  education: { num: "04", title: "Education" },
} as const;

export const projectModal = {
  viewCode: "View Code",
  liveDemo: "Live Demo",
} as const;

export const linkLabels = {
  github: "GitHub",
  linkedin: "LinkedIn",
} as const;
