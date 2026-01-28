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
  role: string;
  startDate: string;
  endDate: string;
  bullets: string[];
}

// ---------------------------------------------------------------------------
// 1. Education
// ---------------------------------------------------------------------------

export const education: Education = {
  university: "University of Central Florida",
  degree: "B.S. in Computer Science",
  graduation: "May 2027",
  gpa: 3.9,
  skills: [
    "Java",
    "Python",
    "JavaScript",
    "React",
    "Express",
    "Flask",
    "SQLite",
    "Auth0",
    "Yelp Fusion API",
    "RAG",
    "Hugging Face",
    "Streamlit",
  ],
};

// ---------------------------------------------------------------------------
// 2. Experience
// ---------------------------------------------------------------------------

export const experience: Experience[] = [
  {
    company: "SimX AI",
    title: "Founder",
    startDate: "Jul 2025",
    endDate: "Present",
    bullets: [
      "Architected scalable automation pipelines to streamline operations and reduce manual overhead.",
      "Built context-aware conversational agents that improve customer engagement and support workflows.",
      "Increased lead-to-appointment conversion by 25% through targeted automation and outreach.",
      "Reduced manual processing latency by 70%+ with parallelized pipelines and intelligent routing.",
    ],
  },
  {
    company: "UCF",
    title: "Teaching Assistant",
    startDate: "Aug 2025",
    endDate: "Present",
    bullets: [
      "Guided 100+ students through course material, labs, and assignments.",
      "Debugged and explained complex Java programs during office hours and lab sessions.",
      "Graded 100+ coding submissions with detailed feedback to support learning outcomes.",
    ],
  },
  {
    company: "Pactemos",
    title: "Software Intern",
    startDate: "Dec 2024",
    endDate: "Jan 2025",
    bullets: [
      "Automated legal compliance and contract review workflows to accelerate processing.",
      "Standardized documentation workflows and improved clarity for internal and external use.",
      "Supported daily operations and ad-hoc engineering tasks across the product stack.",
    ],
  },
];

// ---------------------------------------------------------------------------
// 3. Projects
// ---------------------------------------------------------------------------

export const resumeProjects: ResumeProject[] = [
  {
    title: "KnightHaven",
    role: "Full-Stack Developer",
    date: "Oct 2025",
    tech: ["React", "Express", "SQLite", "Auth0", "Yelp Fusion API"],
    bullets: [
      "Built a full-stack platform for event discovery and management for the UCF community.",
      "Implemented Auth0 verification and role-based access for secure user flows.",
      "Developed Flask scraper to ingest and normalize events from multiple campus sources.",
      "Integrated Yelp Fusion API to enrich event and venue data with ratings and details.",
    ],
  },
  {
    title: "AI Document Assistant",
    role: "ML Engineer",
    date: "Dec 2025",
    tech: ["RAG", "Python", "Hugging Face", "Streamlit"],
    bullets: [
      "Built a production-grade RAG system for technical documentation Q&A and knowledge discovery.",
      "Implemented hybrid retrieval with dense embeddings and BM25 for improved recall and precision.",
      "Added semantic chunking and metadata filters to improve context quality for the LLM.",
      "Deployed on Hugging Face Spaces with a Streamlit UI for easy experimentation and demos.",
    ],
  },
];

// ---------------------------------------------------------------------------
// 4. Involvement
// ---------------------------------------------------------------------------

export const involvement: Involvement[] = [
  {
    org: "Theta Tau",
    role: "Academic, Athletics, Community Service Boards Member",
    startDate: "Nov 2025",
    endDate: "Present",
    bullets: [
      "Contributed to service initiatives and community engagement projects.",
      "Participated in networking sessions and professional development events.",
    ],
  },
  {
    org: "Tau Beta Pi",
    role: "Recruitment Chair",
    startDate: "Nov 2024",
    endDate: "Present",
    bullets: [
      "Initiated into Tau Beta Pi (top 12.5% of engineering students) for academic excellence.",
      "Guided candidates through initiation and helped grow the chapter's membership.",
    ],
  },
];
