import type { IconName } from "../components/Icon";

export type InterestStage = "Building" | "Practicing" | "Exploring";

export interface Interest {
  title: string;
  description: string;
  /** Honest stage: how far along I actually am. Never use expert-level wording. */
  stage: InterestStage;
  icon: IconName;
  /** Card accent: a color token from styles/index.css. */
  color: string;
}

export const interests: Interest[] = [
  {
    title: "Full-Stack Development",
    description:
      "Owning a feature from the database schema to the user interface, building complete applications, and deploying solutions that work in the real world.",
    stage: "Building",
    icon: "stack",
    color: "var(--accent)",
  },
  {
    title: "Software Engineering",
    description:
      "Exploring software architecture, requirements engineering, design principles, maintainability, and the decisions that make software reliable beyond its first release.",
    stage: "Practicing",
    icon: "workflow",
    color: "var(--c-sky)",
  },
  {
    title: "Artificial Intelligence",
    description:
      "Understanding how artificial intelligence can become a practical assistant inside real products, from intelligent tutoring systems to personalized learning experiences.",
    stage: "Exploring",
    icon: "bot",
    color: "var(--c-violet)",
  },
  {
    title: "Machine Learning",
    description:
      "Understanding how machines learn from data, how models identify patterns, and how to evaluate their reliability and practical applications.",
    stage: "Exploring",
    icon: "network",
    color: "var(--c-cyan)",
  },
  {
    title: "Data Science",
    description:
      "Transforming raw data into meaningful insights through data analysis, visualization, and techniques that support better decision-making.",
    stage: "Exploring",
    icon: "chart",
    color: "var(--c-amber)",
  },
  {
    title: "Digital Transformation",
    description:
      "Exploring how technology can modernize everyday services, improve access to information, and make essential digital solutions available to more people.",
    stage: "Exploring",
    icon: "globe",
    color: "var(--c-rose)",
  },
  {
    title: "Technology Innovation",
    description:
      "Discovering practical ways to apply technology to real-world challenges and create opportunities within my community.",
    stage: "Exploring",
    icon: "bulb",
    color: "var(--accent)",
  },
  {
    title: "Cybersecurity",
    description:
      "Understanding how to protect applications, systems, and information through secure development practices and fundamental security principles.",
    stage: "Exploring",
    icon: "shield",
    color: "var(--c-rose)",
  },
  {
    title: "Cloud Computing & DevOps",
    description:
      "Learning how modern applications are deployed, managed, monitored, and scaled using cloud infrastructure and automation.",
    stage: "Exploring",
    icon: "cloud",
    color: "var(--c-sky)",
  },
  {
    title: "Open-Source Development",
    description:
      "Learning through collaboration, contributing to shared projects, exchanging ideas, and becoming part of the wider developer community.",
    stage: "Exploring",
    icon: "branch",
    color: "var(--c-violet)",
  },
];
