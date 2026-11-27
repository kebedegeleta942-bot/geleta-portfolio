import { useEffect, useRef, useState, type ReactNode } from "react";
import { Icon } from "./Icon";
import { Lightbox } from "./Lightbox";
import { statusLabels, type Project, type ProjectImage } from "../data/projects";

interface Props {
  project: Project | null;
  onClose: () => void;
}

type Group = "desktop" | "mobile";

function Strip({
  title,
  items,
  tall,
  onOpen,
}: {
  title: string;
  items: ProjectImage[];
  tall?: boolean;
  onOpen: (index: number) => void;
}) {
  if (items.length === 0) return null;
  return (
    <section className="mt-6">
      <h4 className="eyebrow mb-3">
        {title} <span className="text-muted">({items.length})</span>
      </h4>
      <div className="flex snap-x gap-3 overflow-x-auto pb-3" role="group" aria-label={title}>
        {items.map((img, i) => (
          <figure key={img.src} className="shrink-0 snap-start">
            <button
              type="button"
              onClick={() => onOpen(i)}
              aria-label={`Enlarge: ${img.caption ?? img.alt}`}
              className="block overflow-hidden rounded-lg border border-line transition-colors hover:border-accent"
            >
              <img
                src={img.src}
                alt={img.alt}
                width={img.width}
                height={img.height}
                loading="lazy"
                decoding="async"
                className={`${tall ? "h-72" : "h-36"} w-auto max-w-none`}
              />
            </button>
            <figcaption className="mt-1.5 w-0 min-w-full truncate text-xs text-muted">{img.caption ?? img.alt}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

/** Uses the native <dialog> element: built-in focus trapping, Escape to close, and backdrop. */
export function ProjectModal({ project, onClose }: Props) {
  const ref = useRef<HTMLDialogElement>(null);
  const [viewer, setViewer] = useState<{ group: Group; index: number } | null>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (project && !dialog.open) dialog.showModal();
    if (!project && dialog.open) dialog.close();
    if (!project) setViewer(null);
  }, [project]);

  const desktop = project?.images.filter((i) => i.device !== "mobile") ?? [];
  const mobile = project?.images.filter((i) => i.device === "mobile") ?? [];
  const viewerImages = viewer?.group === "mobile" ? mobile : desktop;

  const block = (title: string, children: ReactNode) => (
    <section className="mt-6">
      <h4 className="eyebrow mb-2">{title}</h4>
      {children}
    </section>
  );

  return (
    <>
      <dialog
        ref={ref}
        className="modal"
        aria-labelledby="project-modal-title"
        onClose={onClose}
        onClick={(e) => e.target === ref.current && onClose()}
      >
        {project && (
          <div className="flex max-h-[calc(100vh-3rem)] flex-col" style={{ borderTop: `4px solid ${project.color}` }}>
            <div className="flex items-start justify-between gap-4 border-b border-line p-6">
              <div>
                <p className="font-mono text-xs" style={{ color: project.color }}>
                  {statusLabels[project.status]}
                </p>
                <h3 id="project-modal-title" className="mt-1 font-display text-2xl font-bold">
                  {project.name}
                </h3>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close project details"
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-line hover:border-accent"
              >
                <Icon name="x" />
              </button>
            </div>

            <div className="overflow-y-auto p-6 pt-0">
              <Strip title="Web app (desktop)" items={desktop} onOpen={(i) => setViewer({ group: "desktop", index: i })} />
              <Strip title="Mobile app" items={mobile} tall onOpen={(i) => setViewer({ group: "mobile", index: i })} />

              {block("Overview", <p className="text-sm leading-relaxed text-muted">{project.summary}</p>)}
              {block("Problem", <p className="text-sm leading-relaxed text-muted">{project.problem}</p>)}
              {block("My contribution", <p className="text-sm leading-relaxed text-muted">{project.contribution}</p>)}

              {project.features.length > 0 &&
                block(
                  "Key features",
                  <ul className="space-y-2 text-sm text-muted">
                    {project.features.map((f) => (
                      <li key={f} className="flex gap-2">
                        <Icon name="check" size={16} className="mt-0.5 shrink-0 text-accent" />
                        {f}
                      </li>
                    ))}
                  </ul>,
                )}

              {project.engineeringNotes.length > 0 &&
                block(
                  "Engineering decisions",
                  <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted marker:text-accent">
                    {project.engineeringNotes.map((n) => (
                      <li key={n}>{n}</li>
                    ))}
                  </ul>,
                )}

              {block(
                project.techLabel,
                <ul className="flex flex-wrap gap-1.5">
                  {project.tech.map((t) => (
                    <li key={t} className="chip">
                      {t}
                    </li>
                  ))}
                </ul>,
              )}

              {project.note && <p className="mt-6 rounded-lg bg-surface-2 p-3 text-xs text-muted">{project.note}</p>}

              <div className="mt-6 flex flex-wrap gap-3">
                {project.live && (
                  <a href={project.live} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                    Open live site <Icon name="arrow-up-right" size={16} />
                  </a>
                )}
                {project.api && (
                  <a href={project.api} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                    API endpoint <Icon name="arrow-up-right" size={16} />
                  </a>
                )}
                {project.github && (
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                    <Icon name="github" size={16} /> Source code
                  </a>
                )}
              </div>
            </div>
          </div>
        )}
      </dialog>

      <Lightbox
        images={viewerImages}
        index={viewer ? viewer.index : null}
        onIndex={(i) => setViewer((v) => (v ? { ...v, index: i } : v))}
        onClose={() => setViewer(null)}
      />
    </>
  );
}
