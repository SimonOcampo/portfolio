export type ProjectMedia =
  | {
      type: "image";
      src: string;
      alt: string;
      position?: "left-top" | "center" | "top";
      fit?: "cover" | "contain";
    }
  | {
      type: "video";
      src: string;
      poster: string;
      alt: string;
    };

export interface Project {
  id: string;
  title: string;
  summary: string;
  highlight: string;
  caseStudy: {
    problem: string;
    approach: string;
    outcomes: string[];
  };
  technologies: string[];
  media: ProjectMedia[];
  githubUrl?: string;
  liveUrl?: string;
  devpostUrl?: string;
  featured?: boolean;
  trainerName: string;
  trainerClass: string;
}

export const projects: Project[] = [
  {
    id: "oddyssey",
    title: "ODDyssey",
    trainerClass: "Scientist",
    trainerName: "Colress",
    summary: "A public-data market screening and hypothetical fleet simulation platform for autonomous ride-hailing expansion.",
    highlight: "2nd Place — Waymo Sponsored Track, ShellHacks 2026",
    caseStudy: {
      problem: "Autonomous ride-hailing expansion requires comparing cities across market familiarity, charging infrastructure, and potential demand with clear evidence behind each recommendation.",
      approach: "Built a Next.js and FastAPI platform with shared Pydantic/OpenAPI contracts. A configurable ranking engine combines 15 features from Census ACS, TIGER/Line, NOAA, DOE AFDC, and Waymo public market data across Market Familiarity, Infrastructure Readiness, and Market Opportunity. Source provenance and deterministic backend scoring make rankings reproducible, while interactive maps and playback explain hypothetical fleet scenarios.",
      outcomes: [
        "Won 2nd Place in the Waymo Sponsored Track at ShellHacks 2026, built by a three-person team at FIU among 300+ submitted projects.",
        "Made city rankings traceable to documented public sources, configurable weights, and explicit assumptions.",
        "Simulates seven days of fleet operations with adjustable fleet size, demand, pricing, and operating assumptions, showing utilization, wait times, empty miles, charging, fares, and gross revenue.",
        "Reproduces ranking and simulation results for the same data release, configuration, assumptions, and seed; outputs support market screening rather than predict Waymo expansion.",
      ],
    },
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Python", "FastAPI", "Pydantic", "OpenAPI", "Recharts", "D3 Geo", "Mapbox", "Vercel"],
    media: [
      { type: "image", src: "/projects/oddyssey-overview.png", alt: "ODDyssey home page introducing public-data screening for autonomous mobility expansion", position: "center" },
    ],
    githubUrl: "https://github.com/SimonOcampo/ShellHacks2026",
    liveUrl: "https://odd-scout-web.vercel.app/",
    devpostUrl: "https://devpost.com/software/oddyssey",
  },
  {
    id: "procurement-decision-tool",
    title: "Procurement Decision Tool",
    trainerClass: "Devon Executive",
    trainerName: "Steven",
    summary: "An explainable intake and decision engine for enterprise purchasing workflows.",
    highlight: "Rules + semantic review + live market validation",
    caseStudy: {
      problem: "Purchase requests need consistent policy checks, clear justification review, and current market comparisons before a decision can be made.",
      approach: "Built a React, FastAPI, and PostgreSQL workflow that combines Pydantic rules with Gemini semantic analysis and asynchronous SerpApi shopping lookups.",
      outcomes: [
        "Unified request intake, rule evaluation, semantic review, and comparable-price research.",
        "Added an explainable admin dashboard for reviewing decisions and risk flags.",
        "Included fallback market data so the workflow remains usable when live search is unavailable.",
      ],
    },
    technologies: ["React", "FastAPI", "PostgreSQL", "Gemini API", "SerpApi", "Material UI", "Docker"],
    media: [
      { type: "image", src: "/projects/procurement-dashboard.png", alt: "Procurement decision dashboard", position: "top" },
      { type: "image", src: "/projects/procurement-form.png", alt: "Purchase request intake form", position: "top" },
    ],
    githubUrl: "https://github.com/SimonOcampo/procurement-decision-tool",
    featured: true,
  },
  {
    id: "learnworld",
    title: "LearnWorld",
    trainerClass: "Schoolkid",
    trainerName: "Cheren",
    summary: "A gamified, offline-first CS learning platform turning PDFs and text into interactive algorithm simulations with state-aware Gemini tutoring.",
    highlight: "32 CS skills powered by deterministic TypeScript engines",
    caseStudy: {
      problem: "Static slides and textbooks make it difficult to see how algorithms execute. Generic tutoring chatbots lack the exact inputs, variables, and execution state a student is exploring.",
      approach: "Built a playable CS1/CS2 curriculum with Next.js, React, and deterministic TypeScript engines. Students assemble learning quests, change inputs, and step through algorithms while inspecting variables, memory, and event history. Gemini receives structured simulation snapshots for contextual tutoring, while the custom workshop converts PDFs and notes into Zod-validated lesson data without generating executable code. IndexedDB stores progress and custom skills locally.",
      outcomes: [
        "Provides 32 interactive CS skills covering pointers, memory allocation, trees, graphs, dynamic programming, and backtracking.",
        "Grounds explanations, hints, summaries, and prediction challenges in the active simulation step and its variables.",
        "Keeps XP, levels, streaks, achievements, and lesson history available offline, with JSON import and export for backups.",
        "Turns PDFs and pasted notes into custom interactive lessons through schema-constrained Gemini output and Zod validation.",
        "Verifies simulation behavior with Vitest and learning flows with Playwright and automated accessibility checks.",
      ],
    },
    technologies: ["Next.js", "React", "TypeScript", "Gemini API", "IndexedDB", "Cytoscape.js", "Zod", "Tailwind CSS", "Vitest", "Playwright"],
    media: [
      { type: "image", src: "/projects/learnworld-curriculum.png", alt: "LearnWorld curriculum browser with CS skill selection and a learning quest queue", position: "center" },
      { type: "image", src: "/projects/learnworld-graph.png", alt: "Graph algorithm simulation with live variables, pseudocode, an event trail, and a state-aware Gemini tutor", position: "center" },
      { type: "image", src: "/projects/learnworld-bitwise.png", alt: "Bitwise operator simulation showing operand registers, step controls, and a prediction challenge", position: "center" },
      { type: "image", src: "/projects/learnworld-backtracking.png", alt: "Backtracking simulation stepping through queen placements on a chessboard", position: "center" },
      { type: "image", src: "/projects/learnworld-workshop.png", alt: "LearnWorld custom workshop turning uploaded PDFs and pasted material into interactive lessons", position: "center" },
    ],
    githubUrl: "https://github.com/SimonOcampo/learn_world",
    devpostUrl: "https://devpost.com/software/learnworld",
  },
  {
    id: "knightlife-events",
    title: "KnightLife",
    trainerClass: "Club Leader",
    trainerName: "Garrison",
    summary: "A campus event hub with automated flyer ingestion and social planning tools.",
    highlight: "Turns Instagram flyers into structured campus events",
    caseStudy: {
      problem: "Campus events are scattered across student-organization accounts, making them difficult to discover and organize around.",
      approach: "Created a personalized event feed, Google Calendar integration, and Squads RSVP flow backed by a FastAPI ingestion pipeline that uses Apify and Gemini structured extraction.",
      outcomes: [
        "Converts unstructured Instagram captions and flyers into searchable event records.",
        "Supports personalized discovery, calendar export, and group RSVP coordination.",
        "Uses asynchronous SQLAlchemy, PostgreSQL, Redis, and Docker for a production-oriented stack.",
      ],
    },
    technologies: ["React", "FastAPI", "PostgreSQL", "Gemini API", "Apify", "Redis", "Docker"],
    media: [
      { type: "image", src: "/projects/knightlife-home.png", alt: "KnightLife event discovery home page", position: "center" },
      { type: "image", src: "/projects/knightlife-events.png", alt: "KnightLife campus event listing", position: "center" },
      { type: "image", src: "/projects/knightlife-details.png", alt: "KnightLife event details", position: "center" },
    ],
    githubUrl: "https://github.com/SimonOcampo/knightlife",
  },
  {
    id: "aml-gnn-detection",
    title: "AML Detection via Graph Neural Networks",
    trainerClass: "Researcher",
    trainerName: "Aldrin",
    summary: "An inductive GraphSAGE pipeline for detecting laundering patterns in Bitcoin transaction graphs.",
    highlight: "67.2% recall · 51.0% precision on 200K+ transactions",
    caseStudy: {
      problem: "Rules-based monitoring views transactions in isolation and misses structuring and layering patterns that emerge across connected accounts.",
      approach: "Engineered a two-hop GraphSAGE pipeline over the Elliptic dataset and handled the 90/10 class imbalance with weighted cross-entropy loss.",
      outcomes: [
        "Reported 67.2% recall and 51.0% precision on the project evaluation over the Elliptic dataset.",
        "Analyzed topology across more than 200,000 transaction nodes.",
        "Produced network, embedding, and feature-importance views for model interpretation.",
      ],
    },
    technologies: ["PyTorch Geometric", "GraphSAGE", "NetworkX", "Python", "Matplotlib", "Pandas"],
    media: [
      { type: "image", src: "/projects/aml-network-graph.png", alt: "Bitcoin transaction network graph", position: "center" },
      { type: "image", src: "/projects/aml-tsne.png", alt: "t-SNE embedding visualization", position: "center" },
      { type: "image", src: "/projects/aml-feature-importance.png", alt: "AML model feature importance chart", position: "center" },
      { type: "video", src: "/projects/aml-demo.webm", poster: "/projects/aml-demo-poster.webp", alt: "AML detection application demo" },
    ],
    githubUrl: "https://github.com/SimonOcampo/bitcoin-laundering-gnn",
  },
  {
    id: "ai-document-assistant",
    title: "AI Document Assistant",
    trainerClass: "Ace Trainer",
    trainerName: "Sofia",
    summary: "A RAG application combining hybrid retrieval and reranking for grounded document Q&A.",
    highlight: "Hybrid vector + keyword retrieval with cited context",
    caseStudy: {
      problem: "Large PDFs are difficult to search reliably, and naive vector retrieval often misses exact terms or returns weakly grounded answers.",
      approach: "Combined dense embeddings, BM25 search, cross-encoder reranking, semantic chunking, alias-aware query expansion, and cached embeddings.",
      outcomes: [
        "Supports grounded Q&A over individual PDFs exceeding 2,000 pages.",
        "Added query expansion, context compression, and embedding caching to improve retrieval efficiency and relevance.",
        "Deployed with lazy model loading and secure secret management on Hugging Face Spaces.",
      ],
    },
    technologies: ["Python", "RAG", "Hugging Face", "Streamlit"],
    media: [
      { type: "image", src: "/projects/ai_rag.png", alt: "AI Document Assistant architecture diagram showing hybrid retrieval and answer generation", position: "center", fit: "cover" },
    ],
    liveUrl: "https://huggingface.co/spaces/SimonOcampoM/AIDocAssistant",
    githubUrl: "https://github.com/SimonOcampo/AIDocAssistant",
  },
  {
    id: "knighthaven-events",
    title: "KnightHaven",
    trainerClass: "Swimmer",
    trainerName: "Devon",
    summary: "A verified-student platform unifying campus events, marketplace listings, and local discovery.",
    highlight: "Verified UCF community with live discovery pipelines",
    caseStudy: {
      problem: "Students must jump between unrelated services to find campus events, peer listings, restaurants, and nearby services.",
      approach: "Built a React and Express platform with Auth0 student verification, SQLite, a cached Flask event scraper, and Yelp Fusion discovery.",
      outcomes: [
        "Restricts protected community features to verified @ucf.edu accounts.",
        "Refreshes campus events with caching and fallback behavior.",
        "Combines event, marketplace, restaurant, and service discovery in one student-focused experience.",
      ],
    },
    technologies: ["React", "Express", "SQLite", "Auth0", "Flask", "Yelp Fusion API"],
    media: [
      { type: "image", src: "/projects/khaven1.png", alt: "KnightHaven home page", position: "center" },
      { type: "image", src: "/projects/khaven2.png", alt: "KnightHaven event discovery", position: "center" },
      { type: "image", src: "/projects/khaven3.png", alt: "KnightHaven marketplace", position: "center" },
      { type: "image", src: "/projects/khaven4.png", alt: "KnightHaven local discovery", position: "center" },
    ],
    githubUrl: "https://github.com/SimonOcampo/KnightHaven",
  },
];
