export interface Project {
  id: string;
  title: string;
  shortDesc: string;
  longDesc: string;
  technologies: string[];
  images: string[];
  githubUrl?: string;
  liveUrl?: string;
}

export const projects: Project[] = [
  {
    id: "ai-document-assistant",
    title: "AI Document Assistant",
    shortDesc: "Production RAG system for grounded Q&A over PDFs up to 2000+ pages with hybrid retrieval.",
    longDesc:
      "Built a production-grade RAG system enabling grounded Q&A over PDF documents up to 2000+ pages each. Implemented hybrid retrieval with dense embeddings, BM25 sparse search, and cross-encoder reranking. Added semantic chunking, alias-aware query expansion, and embedding caching to reduce latency by 35%. Deployed on Hugging Face Spaces using Streamlit with lazy model loading and secure secret management.",
    technologies: ["Python", "RAG", "Hugging Face", "Streamlit"],
    images: ["/projects/ai_rag.png"],
  },
  {
    id: "knighthaven-events",
    title: "KnightHaven",
    shortDesc: "Full-stack React + Express platform unifying UCF events, marketplace, and local discovery.",
    longDesc:
      "Built a full-stack platform with React, Express, and SQLite to unify events, marketplace listings, and local discovery. Implemented Auth0 verification to restrict protected features to users with verified @ucf.edu accounts. Developed a Flask scraper with BeautifulSoup to update campus events in real time with caching and fallback logic. Integrated the Yelp Fusion API for nearby spots, enabling restaurant and service discovery with student-focused context.",
    technologies: ["React", "Express", "SQLite", "Auth0", "Flask", "Yelp Fusion API"],
    images: ["/projects/khaven1.png", "/projects/khaven2.png", "/projects/khaven3.png", "/projects/khaven4.png"],
  },
  
];
