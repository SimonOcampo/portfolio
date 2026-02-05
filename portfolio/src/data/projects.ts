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
  demoGif?: string;
}

export const projects: Project[] = [
  {
    id: "aml-gnn-detection",
    title: "AML Detection via Graph Neural Networks",
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
    demoGif: "/projects/aml-demo.gif",
  },
  {
    id: "ai-document-assistant",
    title: "AI Document Assistant",
    shortDesc: "Production RAG system for grounded Q&A over PDFs up to 2000+ pages with hybrid retrieval.",
    longDesc:
      "Built a production-grade RAG system enabling grounded Q&A over PDF documents up to 2000+ pages each. Implemented hybrid retrieval with dense embeddings, BM25 sparse search, and cross-encoder reranking. Added semantic chunking, alias-aware query expansion, and embedding caching to reduce latency by 35%. Deployed on Hugging Face Spaces using Streamlit with lazy model loading and secure secret management.",
    technologies: ["Python", "RAG", "Hugging Face", "Streamlit"],
    images: ["/projects/ai_rag.png"],
    liveUrl: "https://huggingface.co/spaces/SimonOcampoM/AIDocAssistant",
    githubUrl: "https://github.com/SimonOcampo/AIDocAssistant",
    isWide: true,
  },
  {
    id: "knighthaven-events",
    title: "KnightHaven",
    shortDesc: "Full-stack React + Express platform unifying UCF events, marketplace, and local discovery.",
    longDesc:
      "Built a full-stack platform with React, Express, and SQLite to unify events, marketplace listings, and local discovery. Implemented Auth0 verification to restrict protected features to users with verified @ucf.edu accounts. Developed a Flask scraper with BeautifulSoup to update campus events in real time with caching and fallback logic. Integrated the Yelp Fusion API for nearby spots, enabling restaurant and service discovery with student-focused context.",
    technologies: ["React", "Express", "SQLite", "Auth0", "Flask", "Yelp Fusion API"],
    images: ["/projects/khaven1.png", "/projects/khaven2.png", "/projects/khaven3.png", "/projects/khaven4.png"],
    githubUrl: "https://github.com/SimonOcampo/KnightHaven"
  },
  
];
