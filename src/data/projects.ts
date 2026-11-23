export type ProjectStatus = "deployed" | "concept" | "in-progress";

export const statusLabels: Record<ProjectStatus, string> = {
  deployed: "Developed & deployed",
  concept: "Concept / in design",
  "in-progress": "In progress",
};

export type CoverVariant = "learnsphere" | "city" | "ai";

export interface Project {
  id: string;
  name: string;
  summary: string;
  problem: string;
  contribution: string;
  features: string[];
  /** Short list of things that were genuinely hard or deliberate. Leave empty to hide the block. */
  engineeringNotes: string[];
  tech: string[];
  /** Label for the tech block. Use "Intended architecture" for anything not built yet. */
  techLabel: string;
  status: ProjectStatus;
  cover: CoverVariant;
  /** Card accent: any CSS color or token, e.g. "var(--accent)", "var(--c-sky)", "var(--c-violet)", "var(--c-amber)". */
  color: string;
  /** null = not published yet. Never invent a URL. */
  github: string | null;
  live: string | null;
  api: string | null;
  /** Optional note shown under the project (for example what is planned vs built). */
  note?: string;
  /**
   * Real screenshots. Put files in /public/projects/<project-id>/ and list their
   * paths here, for example "/projects/oromia-learnsphere/home.webp".
   * The first image is the card cover; all of them appear in the details view.
   * While this is empty, the abstract cover art is shown instead.
   */
  images: { src: string; alt: string }[];
}

/**
 * Add new projects by appending to this array. No UI code needs to change.
 * Do not add a project, link, user count or result you cannot back up.
 */
export const projects: Project[] = [
  {
    id: "oromia-learnsphere",
    name: "Oromia LearnSphere",
    summary:
      "A digital educational platform designed to improve access to structured learning materials and examination preparation resources for students in Oromia.",
    problem:
      "Students need structured, grade-appropriate learning material and exam practice that works on low-end phones and slow connections, in their own languages.",
    // REVIEW: written from what you have told me about the build. Edit to match your role exactly.
    contribution:
      "Built end to end as a full-stack project: requirements and information architecture, the React and TypeScript front end, the Express API, the PostgreSQL schema, and deployment.",
    features: [
      "Grade-based learning resources",
      "Subject, chapter and lesson organization",
      "Learning materials and examination preparation",
      "Separate student and administrator interfaces",
      "Multilingual direction: Afaan Oromoo, English and Amharic",
      "Backend API with PostgreSQL integration",
    ],
    engineeringNotes: [
      "Subscription access is decided only on the server. The front end can display state but can never activate it.",
      "Exam previews are enforced by the API, which withholds answers rather than hiding them in the interface.",
      "Payments use a manual receipt flow with an admin review queue and an audit trail, because no live payment gateway is available.",
      "Designed for low-end phones and weak connections, including an in-app reader that can work offline.",
      "Authentication uses refresh-token rotation with reuse detection and server-side role checks.",
    ],
    tech: ["React", "TypeScript", "Node.js", "Express.js", "PostgreSQL", "Cloudflare", "Render"],
    techLabel: "Technologies",
    status: "deployed",
    cover: "learnsphere",
    color: "var(--accent)",
    github: null,
    live: "https://oromia-learnsphere.pages.dev/",
    api: "https://oromia-learnsphere-api.onrender.com",
    note: "The API runs on a free hosting tier, so the first request after a quiet period can be slow.",
    // Add screenshots here, e.g. { src: "/projects/oromia-learnsphere/dashboard.webp", alt: "Student dashboard" }
    images: [],
  },
  {
    id: "ethio-cse-ai",
    name: "Ethio CSE AI",
    summary:
      "An AI-powered learning assistant designed to support Ethiopian Computer Science and Engineering students in their academic and professional journeys.",
    problem:
      "Quality learning support for technical subjects is hard to access. Students need help simplifying complex concepts, getting unstuck on code, and preparing for exams.",
    // PLACEHOLDER: replace with what you personally designed or built.
    contribution: "[Add: what you personally designed or built on this project]",
    // These are the project's stated goals, not confirmed shipped features.
    features: [
      "Simplifies complex technical concepts",
      "Programming assistance",
      "Exam preparation support",
      "Guidance for building practical technology skills",
    ],
    engineeringNotes: [],
    // PLACEHOLDER: list the real stack once confirmed.
    tech: ["[Add your tech stack]"],
    techLabel: "Technologies",
    // REVIEW: set to "in-progress" or "deployed" if that is the truth.
    status: "concept",
    cover: "ai",
    color: "var(--c-violet)",
    github: null,
    live: null,
    api: null,
    note: "The features above are the project's goals. Implemented functionality will be marked here once confirmed.",
    images: [],
  },
  {
    id: "adama-city-digital-platform",
    name: "Adama City Digital Platform",
    summary:
      "A digital platform concept focused on improving access to city-related digital services and information through an integrated software system.",
    problem:
      "City services and information are spread across different channels, which makes them harder for residents to find and use.",
    // PLACEHOLDER: replace with what you personally designed or built.
    contribution: "[Add: what you personally designed or built on this project]",
    features: [],
    engineeringNotes: [],
    // Intended architecture. Remove anything you did not actually use before publishing.
    tech: [
      "React",
      "TypeScript",
      "Node.js",
      "Backend API architecture",
      "PostgreSQL",
      "Prisma",
      "Authentication & authorization",
      "Docker",
    ],
    techLabel: "Intended architecture",
    status: "concept",
    cover: "city",
    color: "var(--c-sky)",
    github: null,
    live: null,
    api: null,
    note: "Presented as a concept. Implemented parts and prototypes will be listed here once confirmed.",
    images: [],
  },
];
