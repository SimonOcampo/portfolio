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
  gpa: 3.8,
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
    company: "UCF CECS",
    title: "Teaching Assistant for Dr. Mahfuz Rahman",
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
    title: "Software Engineering Intern",
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
    role: "Web Dev Committee · Community Service, Academic, and Athletic Boards",
    startDate: "Nov 2025",
    endDate: "Present",
    bullets: [
      "Developed brother-to-brother support request web system, improving response times by 40%",
      "Built backend infrastructure to handle and organize requests, track progress, and manage brotherly support",
      "Organized and participated in community service events, including park cleanups and food drives."
    ],
  },
  {
    org: "Tau Beta Pi",
    role: "Recruitment Chair",
    startDate: "Nov 2024",
    endDate: "Present",
    bullets: [
      "Initiated into Tau Beta Pi (top 12.5% of engineering students) for academic excellence.",
      "Recruit and onboard new members through engaging activities and outreach events, increasing chapter membership by 15%.",
    ],
  },
];
