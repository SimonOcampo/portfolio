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

export const education: Education = {
  university: "University of Central Florida",
  degree: "B.S. in Computer Science",
  graduation: "May 2027",
  gpa: 3.84,
  skills: [
    "Python",
    "Java",
    "C",
    "C++",
    "JavaScript",
    "TypeScript",
    "SQL",
    "HTML/CSS",
    "React",
    "Next.js",
    "FastAPI",
    "Node.js",
    "Express",
    "Flask",
    "PyTorch",
    "PyTorch Geometric",
    "Pandas",
    "NumPy",
    "matplotlib",
    "Seaborn",
    "Streamlit",
    "TailwindCSS",
    "Material UI",
    "SQLAlchemy",
    "Git/GitHub",
    "Docker",
    "PostgreSQL",
    "Supabase",
    "Redis",
    "SQLite",
    "AWS",
    "Gemini API",
    "OpenAI APIs",
    "Hugging Face",
    "Auth0",
    "Apify",
    "SerpApi",
    "Yelp Fusion API",
    "BeautifulSoup",
    "REST APIs",
    "GoHighLevel",
    "Make",
    "Odoo",
    "PuLP",
  ],
};

// ---------------------------------------------------------------------------
// 2. Experience
// ---------------------------------------------------------------------------

export const experience: Experience[] = [
  {
    company: "Dexter",
    title: "Junior AI Solutions Developer",
    startDate: "June 2026",
    endDate: "Present",
    bullets: [
      "Developed full-stack web applications using React and Supabase, cutting manual data entry by 45%.",
      "Built secure asynchronous extraction pipelines with Edge Functions, reducing document latency by 60%.",
      "Implemented PostgreSQL RLS and RBAC policies, securing multi-tenant data with 100% isolation.",
    ],
  },
  {
    company: "University of Central Florida",
    title: "Teaching Assistant",
    startDate: "Aug 2025",
    endDate: "Aug 2026",
    bullets: [
      "Guided 100+ students weekly in labs, reinforcing recursion, graph algorithms, and data structure implementation.",
      "Debugged and explained complex Java programs during office hours, improving assignment completion and exam performance.",
      "Graded 1000+ coding submissions for correctness, runtime optimization, and adherence to documentation standards.",
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
    company: "Pactemos",
    title: "Software Engineer",
    startDate: "Dec 2024",
    endDate: "Jan 2025",
    bullets: [
      "Automated legal compliance by building reusable contract templates with dynamic placeholders in Odoo ERP.",
      "Standardized documentation workflows across 30+ branches, reducing processing delays and compliance errors.",
      "Supported daily operations for 100+ staff by improving reliability of internal document and approval systems.",
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
      "Contributed to service initiatives including campus cleanups and volunteer drives that reinforce leadership and teamwork.",
      "Participated in networking sessions with industry professionals to explore career paths across multiple engineering disciplines.",
    ],
  },
  {
    org: "Tau Beta Pi",
    startDate: "Nov 2024",
    endDate: "Present",
    bullets: [
      "Initiated into Tau Beta Pi, the nation’s oldest engineering honor society, recognizing the top 12.5% of engineering students.",
      "Guided candidates through initiation requirements, mentorship events, and professional development opportunities.",
    ],
  },
];
