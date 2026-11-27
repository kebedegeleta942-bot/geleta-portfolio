import { Icon } from "./Icon";
import { CoverArt } from "./CoverArt";
import { Reveal } from "./Reveal";
import { statusLabels, type Project } from "../data/projects";

interface Props {
  project: Project;
  index: number;
  onOpen: (project: Project) => void;
}

export function ProjectCard({ project, index, onOpen }: Props) {
  const deployed = project.status === "deployed";
  const c = project.color;
  return (
    <Reveal delay={index * 80} className="h-full">
      <article
        className="group flex h-full flex-col overflow-hidden rounded-2xl border bg-surface transition-transform duration-300 hover:-translate-y-1"
        style={{
          borderColor: `color-mix(in srgb, ${c} 45%, var(--line))`,
          borderTop: `4px solid ${c}`,
          boxShadow: `0 0 0 5px color-mix(in srgb, ${c} 6%, transparent), 0 24px 48px -28px rgba(0,0,0,0.55)`,
        }}
      >
        <div className="aspect-[2/1] overflow-hidden border-b" style={{ borderColor: `color-mix(in srgb, ${c} 30%, var(--line))` }}>
          <div className="h-full w-full transition-transform duration-500 group-hover:scale-[1.03]">
            {project.images[0] ? (
              <img
                src={project.images[0].src}
                alt={project.images[0].alt}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover object-top"
              />
            ) : (
              <CoverArt variant={project.cover} />
            )}
          </div>
        </div>

        <div className="flex flex-1 flex-col p-6">
          <p
            className="mb-3 inline-flex w-fit items-center gap-2 rounded-full px-3 py-1 font-mono text-xs"
            style={{
              color: c,
              background: `color-mix(in srgb, ${c} 12%, transparent)`,
              border: `1px solid color-mix(in srgb, ${c} 45%, transparent)`,
            }}
          >
            <span
              className={`h-2 w-2 rounded-full ${deployed ? "pulse-dot" : ""}`}
              style={deployed ? { background: c } : { border: `1px solid ${c}` }}
              aria-hidden="true"
            />
            {statusLabels[project.status]}
          </p>
          <h3 className="font-display text-xl font-bold">{project.name}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">{project.summary}</p>

          <ul className="mt-4 flex flex-wrap gap-1.5" aria-label={project.techLabel}>
            {project.tech.slice(0, 6).map((t) => (
              <li
                key={t}
                className="rounded-full px-2.5 py-0.5 font-mono text-[0.72rem]"
                style={{
                  color: c,
                  background: `color-mix(in srgb, ${c} 10%, transparent)`,
                  border: `1px solid color-mix(in srgb, ${c} 35%, transparent)`,
                }}
              >
                {t}
              </li>
            ))}
            {project.tech.length > 6 && <li className="chip">+{project.tech.length - 6}</li>}
          </ul>

          <div className="mt-auto flex flex-wrap items-center gap-3 pt-6">
            <button
              type="button"
              className="btn"
              style={{ background: c, color: "var(--bg)" }}
              onClick={() => onOpen(project)}
            >
              View details <Icon name="arrow-right" size={16} />
            </button>
            {project.live && (
              <a href={project.live} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                Live site <Icon name="arrow-up-right" size={16} />
              </a>
            )}
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                <Icon name="github" size={16} /> Code
              </a>
            )}
          </div>
        </div>
      </article>
    </Reveal>
  );
}
