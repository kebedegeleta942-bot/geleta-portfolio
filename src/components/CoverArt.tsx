import type { CoverVariant } from "../data/projects";

/**
 * Abstract, original cover compositions (not fake screenshots).
 * Replace with real screenshots later by adding an `image` field to a project.
 */
export function CoverArt({ variant }: { variant: CoverVariant }) {
  if (variant === "learnsphere") {
    const rows = ["Grade", "Subject", "Chapter", "Lesson"];
    return (
      <svg viewBox="0 0 400 220" className="h-full w-full" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Learning content hierarchy: grade, subject, chapter, lesson">
        <rect width="400" height="220" fill="var(--surface-2)" />
        {rows.map((label, i) => (
          <g key={label} transform={`translate(${28 + i * 22} ${26 + i * 44})`}>
            <rect width={300 - i * 22} height="32" rx="8" fill="var(--surface)" stroke="var(--line)" />
            <rect x="10" y="10" width="12" height="12" rx="3" fill="var(--accent)" opacity={1 - i * 0.18} />
            <text x="32" y="21" fontSize="12" fontFamily="var(--font-mono)" fill="var(--fg)">
              {label}
            </text>
          </g>
        ))}
        <path d="M18 42v132" stroke="var(--line)" strokeWidth="1.5" strokeDasharray="3 4" />
      </svg>
    );
  }

  if (variant === "ai") {
    return (
      <svg viewBox="0 0 400 220" className="h-full w-full" preserveAspectRatio="xMidYMid slice" role="img" aria-label="A student question and an AI answer in a chat">
        <rect width="400" height="220" fill="var(--surface-2)" />
        <rect x="150" y="26" width="222" height="40" rx="12" fill="var(--c-violet)" opacity="0.9" />
        <rect x="168" y="42" width="150" height="7" rx="3.5" fill="var(--bg)" opacity="0.7" />
        <rect x="28" y="84" width="260" height="62" rx="12" fill="var(--surface)" stroke="var(--c-violet)" />
        <rect x="46" y="100" width="190" height="7" rx="3.5" fill="var(--muted)" opacity="0.7" />
        <rect x="46" y="116" width="150" height="7" rx="3.5" fill="var(--muted)" opacity="0.5" />
        <rect x="46" y="130" width="100" height="7" rx="3.5" fill="var(--muted)" opacity="0.35" />
        <rect x="28" y="164" width="180" height="30" rx="10" fill="var(--surface)" stroke="var(--line)" />
        <text x="44" y="183" fontSize="12" fontFamily="var(--font-mono)" fill="var(--c-violet)">{"{ explain() }"}</text>
      </svg>
    );
  }

  const nodes = [
    [70, 60], [150, 110], [230, 55], [310, 105], [120, 170], [260, 165],
  ] as const;
  const edges = [[0, 1], [1, 2], [2, 3], [1, 4], [3, 5], [4, 5], [1, 5]] as const;
  return (
    <svg viewBox="0 0 400 220" className="h-full w-full" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Network of connected city services">
      <rect width="400" height="220" fill="var(--surface-2)" />
      {edges.map(([a, b]) => (
        <line key={`${a}-${b}`} x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]} stroke="var(--line)" strokeWidth="1.5" />
      ))}
      {nodes.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={i === 1 ? 11 : 7} fill={i === 1 ? "var(--accent)" : "var(--surface)"} stroke="var(--accent)" strokeWidth="1.5" />
      ))}
    </svg>
  );
}
