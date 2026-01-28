export interface Project {
  id: string;
  title: string;
  shortDesc: string;
  longDesc: string;
  technologies: string[];
  image: string;
  githubUrl?: string;
  liveUrl?: string;
}

export const projects: Project[] = [
  {
    id: "ai-document-assistant",
    title: "AI Document Assistant",
    shortDesc: "RAG pipeline for technical docs with vector embeddings.",
    longDesc:
      "A retrieval-augmented generation system that ingests technical documentation, creates vector embeddings, and answers questions using semantic search. Built to improve developer onboarding and knowledge discovery in large codebases.",
    technologies: ["Python", "OpenAI"],
    image: "https://placehold.co/600x400",
  },
  {
    id: "knighthaven-events",
    title: "KnightHaven Events",
    shortDesc: "Full-stack event platform for UCF students.",
    longDesc:
      "An event management and discovery platform for the University of Central Florida community. Students can create, browse, and RSVP to campus events, with features for filtering, notifications, and organizer dashboards.",
    technologies: ["LAMP", "PHP"],
    image: "https://placehold.co/600x400",
  },
  {
    id: "autonomous-robot",
    title: "Autonomous Robot",
    shortDesc: "ESP32-CAM chassis with obstacle avoidance.",
    longDesc:
      "An autonomous mobile robot built on an ESP32-CAM microcontroller. Implements ultrasonic and IR sensors for obstacle detection and uses custom pathfinding logic to navigate and avoid collisions in real time.",
    technologies: ["C++", "IoT", "Hardware"],
    image: "https://placehold.co/600x400",
  },
  {
    id: "teaching-assistant",
    title: "Teaching Assistant",
    shortDesc: "Graph Algorithms & Systems Software mentorship.",
    longDesc:
      "Served as a teaching assistant for Graph Algorithms and Systems Software courses. Led lab sessions, held office hours, graded assignments, and helped students with topics including graph traversals, shortest paths, and C systems programming.",
    technologies: ["Teaching", "Mentorship", "C"],
    image: "https://placehold.co/600x400",
  },
];
