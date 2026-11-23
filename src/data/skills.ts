import type { TechIconKey } from "./techIcons";

export type SkillLevel = "hands-on" | "familiar" | "learning";

export const levelLabels: Record<SkillLevel, string> = {
  "hands-on": "Hands-on Experience",
  familiar: "Familiar With",
  learning: "Currently Learning",
};

/** Short label shown inside each row. The full label is in the legend and for screen readers. */
export const levelShort: Record<SkillLevel, string> = {
  "hands-on": "Hands-on",
  familiar: "Familiar",
  learning: "Learning",
};

export interface Skill {
  name: string;
  /** Brand logo key from techIcons.ts. Omit when no recognizable logo exists. */
  icon?: TechIconKey;
  /** Omit for topics where I do not claim a level (CS foundations, AI exploration). */
  level?: SkillLevel;
}

export interface SkillGroup {
  id: string;
  title: string;
  description: string;
  /** Category accent color token (defined in styles/index.css). */
  color: string;
  skills: Skill[];
}

/**
 * Single source of truth for the Skills section.
 * Levels are only used where you confirmed them. Topics without a level are shown as
 * plain topics: nothing here claims proficiency that has not been verified.
 */
export const skillGroups: SkillGroup[] = [
  {
    id: "frontend",
    title: "Frontend Development",
    description: "Building responsive, accessible, and maintainable user interfaces.",
    color: "var(--c-sky)",
    skills: [
      { name: "HTML", icon: "html", level: "hands-on" },
      { name: "CSS", icon: "css", level: "hands-on" },
      { name: "JavaScript", icon: "javascript", level: "hands-on" },
      { name: "TypeScript", icon: "typescript", level: "hands-on" },
      { name: "React", icon: "react", level: "hands-on" },
      { name: "Vite", icon: "vite", level: "familiar" },
      { name: "Tailwind CSS", icon: "tailwind", level: "familiar" },
      { name: "Responsive Web Design", level: "hands-on" },
    ],
  },
  {
    id: "backend",
    title: "Backend Development",
    description: "Developing server-side applications, APIs, and application logic.",
    color: "var(--accent)",
    skills: [
      { name: "Node.js", icon: "node", level: "hands-on" },
      { name: "Express.js", icon: "express", level: "hands-on" },
      { name: "REST API Development", level: "hands-on" },
      { name: "Authentication & Authorization", level: "familiar" },
      { name: "API Integration", level: "hands-on" },
      { name: "Middleware & Error Handling", level: "familiar" },
    ],
  },
  {
    id: "databases",
    title: "Databases",
    description: "Designing, querying, and managing structured data.",
    color: "var(--c-amber)",
    skills: [
      { name: "PostgreSQL", icon: "postgresql", level: "hands-on" },
      { name: "SQL", level: "hands-on" },
      { name: "Database Design & Normalization", level: "familiar" },
      { name: "Prisma ORM", icon: "prisma", level: "familiar" },
      { name: "Database Relationships & Constraints", level: "familiar" },
    ],
  },
  {
    id: "tools",
    title: "Tools & Platforms",
    description: "Managing development workflows, version control, and deployment.",
    color: "var(--c-violet)",
    skills: [
      { name: "Git", icon: "git", level: "hands-on" },
      { name: "GitHub", icon: "github", level: "hands-on" },
      { name: "Visual Studio Code", level: "hands-on" },
      { name: "Cloudflare", icon: "cloudflare", level: "hands-on" },
      { name: "Render", icon: "render", level: "hands-on" },
      { name: "npm", icon: "npm", level: "hands-on" },
      { name: "Docker", icon: "docker", level: "familiar" },
      { name: "Postman", icon: "postman", level: "familiar" },
      { name: "Linux", icon: "linux", level: "familiar" },
    ],
  },
  {
    id: "foundations",
    title: "Computer Science Foundations",
    description: "Understanding the fundamental principles behind modern computing systems.",
    color: "var(--c-rose)",
    skills: [
      { name: "Data Structures & Algorithms" },
      { name: "Object-Oriented Programming" },
      { name: "Database Management Systems" },
      { name: "Operating Systems" },
      { name: "Computer Networks" },
      { name: "Computer Systems & Architecture" },
      { name: "Software Engineering" },
      { name: "Computer Systems Security" },
      { name: "Formal Languages & Automata Theory" },
      { name: "Data Mining" },
    ],
  },
  {
    id: "ai",
    title: "AI & Emerging Technologies",
    description: "Exploring artificial intelligence and modern intelligent systems.",
    color: "var(--c-cyan)",
    skills: [
      { name: "Artificial Intelligence" },
      { name: "Generative AI" },
      { name: "Large Language Models (LLMs)" },
      { name: "AI API Integration" },
      { name: "Prompt Engineering" },
      { name: "Data Analysis" },
    ],
  },
];
