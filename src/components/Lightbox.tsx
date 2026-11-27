import { useEffect, useRef } from "react";
import { Icon } from "./Icon";
import type { ProjectImage } from "../data/projects";

interface Props {
  images: ProjectImage[];
  /** null = closed */
  index: number | null;
  onIndex: (i: number) => void;
  onClose: () => void;
}

/** Full-size screenshot viewer. Native <dialog>: Esc closes, focus is trapped. Arrow keys move between images. */
export function Lightbox({ images, index, onIndex, onClose }: Props) {
  const ref = useRef<HTMLDialogElement>(null);
  const open = index !== null;

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") onIndex((index + 1) % images.length);
      if (e.key === "ArrowLeft") onIndex((index - 1 + images.length) % images.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, images.length, onIndex]);

  const img = index !== null ? images[index] : null;

  return (
    <dialog
      ref={ref}
      className="lightbox"
      aria-label="Screenshot viewer"
      onClose={onClose}
      onClick={(e) => e.target === ref.current && onClose()}
    >
      {img && index !== null && (
        <div className="flex max-h-[calc(100vh-2rem)] flex-col">
          <div className="flex items-center justify-between gap-4 border-b border-line px-5 py-3">
            <p className="min-w-0 truncate text-sm font-medium">{img.caption ?? img.alt}</p>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close viewer"
              className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-line hover:border-accent"
            >
              <Icon name="x" size={16} />
            </button>
          </div>

          <div className="flex min-h-0 flex-1 items-center justify-center overflow-auto bg-surface-2 p-3">
            <img
              key={img.src}
              src={img.src}
              alt={img.alt}
              width={img.width}
              height={img.height}
              decoding="async"
              className="max-h-[70vh] w-auto max-w-full rounded-lg object-contain"
            />
          </div>

          <div className="flex items-center justify-between gap-3 border-t border-line px-5 py-3">
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => onIndex((index - 1 + images.length) % images.length)}
              aria-label="Previous screenshot"
            >
              <Icon name="arrow-right" size={16} className="rotate-180" /> Prev
            </button>
            <span className="font-mono text-xs text-muted" aria-live="polite">
              {index + 1} / {images.length}
            </span>
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => onIndex((index + 1) % images.length)}
              aria-label="Next screenshot"
            >
              Next <Icon name="arrow-right" size={16} />
            </button>
          </div>
        </div>
      )}
    </dialog>
  );
}
