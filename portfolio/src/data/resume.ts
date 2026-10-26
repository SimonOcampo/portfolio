// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface Education {
  university: string;
  degree: string;
  graduation: string;
  gpa: number;
  skills: string[];
}

export interface Experience {
  company: string;
  title: string;
  startDate: string;
  endDate: string;
  bullets: string[];
}

export interface ResumeProject {
  title: string;
  role: string;
  date: string;
  tech: string[];
  bullets: string[];
}

export interface Involvement {
  org: string;
  role?: string;
  startDate: string;
  endDate: string;
  bullets: string[];
}

// ---------------------------------------------------------------------------
// 1. Education
// ---------------------------------------------------------------------------

export const skillGroups = [
  { title: "Languages", skills: ["Python", "TypeScript", "JavaScript", "SQL", "Java", "C/C++"] },
  { title: "Full-stack & Data", skills: ["React", "Next.js", "FastAPI", "Pydantic", "PostgreSQL", "Supabase", "REST APIs", "Tailwind CSS"] },
  { title: "AI & ML", skills: ["PyTorch", "PyTorch Geometric", "Scikit-learn", "RAG", "LLM APIs (OpenAI, Gemini)", "Model evaluation", "Pandas", "ChromaDB", "BM25", "Azure AI Foundry"] },
  { title: "Delivery & Testing", skills: ["Docker", "GitHub Actions", "Git", "Vitest", "Playwright", "Vercel", "Render"] },
] as const;

export const education: Education = {
  university: "University of Central Florida",
  degree: "B.S. in Computer Science",
  graduation: "May 2027",
  gpa: 3.82,
  skills: skillGroups.flatMap((group) => [...group.skills]),
};

// ---------------------------------------------------------------------------
// 2. Experience
// ---------------------------------------------------------------------------

export const experience: Experience[] = [
  {
    company: "Dexter Global Business Solutions",
    title: "AI Solutions Developer",
    startDate: "June 2026",
    endDate: "Oct 2026",
    bullets: [
      "Independently built ContractIQ, a React, TypeScript, and Supabase demo for contract intake, review, reporting, and approvals.",
      "Secured PostgreSQL data with row-level security, four user roles, tenant isolation, and document-scoped permissions.",
      "Engineered duplicate-safe uploads, transactional document versioning, and recoverable workflows with automated tests and CI.",
      "Developed AI extraction and analysis with versioned prompts, source-citation checks, OCR support, human approvals, and 30-case synthetic evaluations.",
    ],
  },
  {
    company: "University of Central Florida",
    title: "Teaching Assistant",
    startDate: "Aug 2025",
    endDate: "Aug 2026",
    bullets: [
      "Guided students in programming labs covering recursion, graph algorithms, and data structures.",
      "Reviewed coding assignments for correctness and runtime efficiency, explaining improvements in accessible terms.",
    ],
  },
  {
    company: "SimX AI",
    title: "ML Engineer",
    startDate: "Jul 2025",
    endDate: "Dec 2025",
    bullets: [
      "Architected scalable automation pipelines integrating OpenAI models with CRM systems at production scale.",
      "Built context-aware conversational agents using prompt chaining to reduce hallucinations and improve accuracy.",
      "Increased lead-to-appointment conversion by 25% through optimized AI-driven customer interactions.",
      "Reduced manual processing latency by 70%+ via robust data orchestration and error-handling workflows.",
    ],
  },
  {
    company: "Vivint Smart Home",
    title: "Sales Representative",
    startDate: "May 2025",
    endDate: "Jul 2025",
    bullets: [
      "Generated $60,000+ in revenue within two months by pitching tailored smart home solutions to residential clients.",
      "Achieved a 40% close rate, consistently converting cold leads into signed contracts on the first interaction.",
      "Supported community service by funding meals for 250 children through Vivint Gives Back",
    ],
  },

  {
    company: "Pactemos",
    title: "Software Engineer",
    startDate: "Dec 2024",
    endDate: "Jan 2025",
    bullets: [
      "Built reusable contract templates with dynamic fields to simplify document preparation for legal operations teams.",
      "Standardized documentation workflows and supported internal tools for document approval and coordination.",
    ],
  },
];

// ---------------------------------------------------------------------------
// 3. Involvement
// ---------------------------------------------------------------------------

export const involvement: Involvement[] = [
  {
    org: "Theta Tau",
    startDate: "Nov 2025",
    endDate: "Present",
    bullets: [
      "Developed brother-to-brother support request web system, improving response times by 40%",
      "Built backend infrastructure to handle and organize requests, track progress, and manage brotherly support",
      "Organized and participated in community service events, including park cleanups and food drives.",
    ],
  },
  {
    org: "Tau Beta Pi",
    startDate: "Nov 2024",
    endDate: "Present",
    bullets: [
      "Initiated into Tau Beta Pi (top 12.5% of engineering students) for academic excellence.",
      "Recruit and onboard new members through engaging activities and outreach events, increasing chapter membership by 15%.",
    ],
  },
];
