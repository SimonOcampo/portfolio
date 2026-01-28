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
    "Python",
    "Java",
    "C",
    "C++",
    "JavaScript",
    "SQL",
    "PyTorch",
    "NumPy",
    "Pandas",
    "Seaborn",
    "PuLP",
    "matplotlib",
    "React",
    "Node.js",
    "Express",
    "Flask",
    "Git/GitHub",
    "AWS",
    "Docker",
    "REST APIs",
    "OpenAI APIs",
    "GoHighLevel",
    "Make",
    "Odoo",
  ],
};

// ---------------------------------------------------------------------------
// 2. Experience
// ---------------------------------------------------------------------------

export const experience: Experience[] = [
  {
    company: "UCF CECS",
    title: "Teaching Assistant for Dr. Mahfuz Rahman",
    startDate: "Aug 2025",
    endDate: "Present",
    bullets: [
      "Guided 100+ students weekly in labs, reinforcing recursion, graph algorithms, and data structure implementation.",
      "Debugged and explained complex Java programs during office hours, improving assignment completion and exam performance.",
      "Graded 1000+ coding submissions for correctness, runtime optimization, and adherence to documentation standards.",
    ],
  },
  {
    company: "SimX AI",
    title: "Founder",
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
    title: "Software Intern",
    startDate: "Dec 2024",
    endDate: "Jan 2025",
    bullets: [
      "Automated legal compliance by building reusable contract templates with dynamic placeholders in Odoo ERP.",
      "Standardized documentation workflows across 30+ branches, reducing processing delays and compliance errors.",
      "upported daily operations for 100+ staff by improving reliability of internal document and approval systems.",
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
