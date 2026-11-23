export interface Principle {
  title: string;
  text: string;
  color: string;
}

export const principles: Principle[] = [
  {
    title: "Understand the Problem",
    text: "Good engineering starts with understanding the actual problem rather than immediately writing code. I believe in asking questions, identifying root causes, and understanding the people affected by a problem.",
    color: "var(--accent)",
  },
  {
    title: "Build Meaningful Solutions",
    text: "Technology should be useful, accessible, and capable of creating real value. I focus on building solutions that address genuine needs rather than creating software simply for the sake of writing code.",
    color: "var(--c-sky)",
  },
  {
    title: "Learn, Build, Improve",
    text: "Continuous learning, experimentation, and improvement are essential to engineering. Every project, challenge, and mistake is an opportunity to develop better skills and understanding.",
    color: "var(--c-amber)",
  },
  {
    title: "Think Beyond the Code",
    text: "Great software is not just about making things work. It also requires considering performance, security, scalability, maintainability, and the people who depend on it.",
    color: "var(--c-violet)",
  },
  {
    title: "Build for Impact",
    text: "I believe technology should solve meaningful problems, create opportunities, and contribute positively to society. My ambition is to use engineering knowledge to develop solutions that make a difference.",
    color: "var(--c-rose)",
  },
];
