export interface LearningArea {
  title: string;
  text: string;
  color: string;
}

/** Add, remove or reorder items as your studies change. No progress values are used on purpose. */
export const learningAreas: LearningArea[] = [
  {
    title: "Operating Systems & Computer Architecture",
    text: "Understanding processes, threads, memory management, scheduling, and how computer systems work internally.",
    color: "var(--c-sky)",
  },
  {
    title: "Data Structures & Algorithms",
    text: "Strengthening problem-solving skills through algorithmic thinking, efficient data structures, and computational complexity.",
    color: "var(--accent)",
  },
  {
    title: "Computer Systems Security",
    text: "Learning security principles, common vulnerabilities, cryptographic concepts, and techniques for protecting systems.",
    color: "var(--c-rose)",
  },
  {
    title: "Data Mining & Data Analysis",
    text: "Exploring data preprocessing, data transformation, pattern discovery, and extracting useful information from datasets.",
    color: "var(--c-amber)",
  },
  {
    title: "Artificial Intelligence & Machine Learning",
    text: "Developing a deeper understanding of intelligent systems, machine learning fundamentals, and practical AI applications.",
    color: "var(--c-violet)",
  },
  {
    title: "Advanced Software Engineering",
    text: "Improving knowledge of software architecture, clean code, testing, system design, and maintainable application development.",
    color: "var(--c-cyan)",
  },
];
