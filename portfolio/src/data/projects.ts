export interface Project {
  id: string;
  title: string;
  shortDesc: string;
  longDesc: string;
  technologies: string[];
  images: string[];
  githubUrl?: string;
  liveUrl?: string;
  isWide?: boolean;
  imagePosition?: "left-top" | "center" | "top";
  demoGif?: string;
  trainerName: string;
  trainerClass: string;
}

export const projects: Project[] = [
  {
    id: "procurement-decision-tool",
    title: "Procurement Decision Tool",
    trainerClass: "Devon Executive",
    trainerName: "Steven",
    shortDesc: "Full-stack intake and decision engine automating enterprise purchasing via Pydantic rules and Gemini AI.",
    longDesc: "Built an enterprise procurement-support system with React, FastAPI, and PostgreSQL. It streamlines purchase requests by feeding them through an explainable decision engine that integrates heuristic checks and Gemini-based semantic analysis for justification quality. Real-time market validation is handled asynchronously using SerpApi Google Shopping (with a local DummyJSON fallback) to calculate price deviations and source comparable alternatives, all monitored through an MUI admin dashboard.",
    technologies: ["React", "FastAPI", "PostgreSQL", "Gemini API", "SerpApi", "Material UI", "Docker"],
    images: ["/projects/procurement-dashboard.png", "/projects/procurement-form.png"],
    githubUrl: "https://github.com/SimonOcampo/procurement-decision-tool",
    isWide: true,
    imagePosition: "left-top",
  },
  {
    id: "knightlife-events",
    title: "KnightLife",
    trainerClass: "Club Leader",
    trainerName: "Garrison",
    shortDesc: "Full-stack campus event aggregator automating club event discovery through Apify Instagram scraping and Gemini-powered structured extraction.",
    longDesc: "A central hub for campus events featuring a personalized feed, Google Calendar integration, and a social 'Squads' RSVP system. The platform features an automated ingestion pipeline that scrapes student organizations' Instagram flyers using Apify, extracts structured event details (dates, locations, titles) from unstructured captions using Google Gemini 2.0 Flash via native Pydantic schemas, and stores them in PostgreSQL using asynchronous SQLAlchemy.",
    technologies: ["React", "FastAPI", "PostgreSQL", "Gemini API", "Apify", "Redis", "Docker"],
    images: ["/projects/knightlife-home.png", "/projects/knightlife-events.png", "/projects/knightlife-details.png"],
    githubUrl: "https://github.com/SimonOcampo/knightlife",
    isWide: true,
    imagePosition: "left-top",
  },
  {
    id: "aml-gnn-detection",
    title: "AML Detection via Graph Neural Networks",
    trainerClass: "Researcher",
    trainerName: "Aldrin",
    shortDesc:
      "Inductive GraphSAGE pipeline to detect Bitcoin money laundering rings by analyzing 2-hop transaction topology on 200k+ nodes.",
    longDesc:
      "An inductive GraphSAGE pipeline engineered to detect Bitcoin money laundering rings by analyzing 2-hop transaction topology. Unlike traditional rules-based engines that view transactions in isolation, this model identifies 'structuring' and 'layering' patterns across 200k+ nodes in the Elliptic dataset. It handles extreme class imbalance (90% licit / 10% illicit) via Weighted Cross-Entropy Loss, achieving 67.2% Recall—effectively flagging 2/3rds of hidden illicit flows that standard models miss.",
    technologies: [
      "PyTorch Geometric",
      "GraphSAGE",
      "NetworkX",
      "Python",
      "Matplotlib",
      "Pandas",
    ],
    images: [
      "/projects/aml-network-graph.png",
      "/projects/aml-tsne.png",
      "/projects/aml-feature-importance.png",
    ],
    githubUrl: "https://github.com/SimonOcampo/bitcoin-laundering-gnn",
    isWide: true,
    imagePosition: "center",
    demoGif: "/projects/aml-demo.gif",
  },
  {
    id: "ai-document-assistant",
    title: "AI Document Assistant",
    trainerClass: "Ace Trainer",
    trainerName: "Sofia",
    shortDesc: "Production RAG system for grounded Q&A over PDFs up to 2000+ pages with hybrid retrieval.",
    longDesc:
      "Built a production-grade RAG system enabling grounded Q&A over PDF documents up to 2000+ pages each. Implemented hybrid retrieval with dense embeddings, BM25 sparse search, and cross-encoder reranking. Added semantic chunking, alias-aware query expansion, and embedding caching to reduce latency by 35%. Deployed on Hugging Face Spaces using Streamlit with lazy model loading and secure secret management.",
    technologies: ["Python", "RAG", "Hugging Face", "Streamlit"],
    images: ["/projects/ai_rag.png"],
    liveUrl: "https://huggingface.co/spaces/SimonOcampoM/AIDocAssistant",
    githubUrl: "https://github.com/SimonOcampo/AIDocAssistant",
    isWide: true,
    imagePosition: "left-top",
  },
  {
    id: "knighthaven-events",
    title: "KnightHaven",
    trainerClass: "Swimmer",
    trainerName: "Devon",
    shortDesc: "Full-stack React + Express platform unifying UCF events, marketplace, and local discovery.",
    longDesc:
      "Built a full-stack platform with React, Express, and SQLite to unify events, marketplace listings, and local discovery. Implemented Auth0 verification to restrict protected features to users with verified @ucf.edu accounts. Developed a Flask scraper with BeautifulSoup to update campus events in real time with caching and fallback logic. Integrated the Yelp Fusion API for nearby spots, enabling restaurant and service discovery with student-focused context.",
    technologies: ["React", "Express", "SQLite", "Auth0", "Flask", "Yelp Fusion API"],
    images: ["/projects/khaven1.png", "/projects/khaven2.png", "/projects/khaven3.png", "/projects/khaven4.png"],
    githubUrl: "https://github.com/SimonOcampo/KnightHaven"
  }
];
