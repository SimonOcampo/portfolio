export type ProjectMedia =
  | {
      type: "image";
      src: string;
      alt: string;
      position?: "left-top" | "center" | "top";
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
  featured?: boolean;
  trainerName: string;
  trainerClass: string;
}

export const projects: Project[] = [
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
    highlight: "67.2% recall across a graph with 200k+ nodes",
    caseStudy: {
      problem: "Rules-based monitoring views transactions in isolation and misses structuring and layering patterns that emerge across connected accounts.",
      approach: "Engineered a two-hop GraphSAGE pipeline over the Elliptic dataset and handled the 90/10 class imbalance with weighted cross-entropy loss.",
      outcomes: [
        "Reached 67.2% recall, flagging roughly two-thirds of hidden illicit flows.",
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
    summary: "A production RAG system for grounded Q&A over documents with thousands of pages.",
    highlight: "Hybrid retrieval with 35% lower latency",
    caseStudy: {
      problem: "Large PDFs are difficult to search reliably, and naive vector retrieval often misses exact terms or returns weakly grounded answers.",
      approach: "Combined dense embeddings, BM25 search, cross-encoder reranking, semantic chunking, alias-aware query expansion, and cached embeddings.",
      outcomes: [
        "Supports grounded Q&A over individual PDFs exceeding 2,000 pages.",
        "Reduced retrieval latency by 35% through embedding caching.",
        "Deployed with lazy model loading and secure secret management on Hugging Face Spaces.",
      ],
    },
    technologies: ["Python", "RAG", "Hugging Face", "Streamlit"],
    media: [
      { type: "image", src: "/projects/ai_rag.png", alt: "AI document assistant interface", position: "left-top" },
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
