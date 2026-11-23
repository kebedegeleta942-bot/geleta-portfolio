import type { CSSProperties } from "react";
import { Icon } from "./Icon";
import type { Interest, InterestStage } from "../data/interests";

/** Dot style encodes the stage: filled = building, ring = practicing, dashed = exploring. */
const dot: Record<InterestStage, string> = {
  Building: "bg-current",
  Practicing: "border border-current",
  Exploring: "border border-dashed border-current",
};

export function InterestCard({ item, index, className = "" }: { item: Interest; index: number; className?: string }) {
  const c = item.color;
  return (
    <article
      className={`interest-card flex h-full flex-col rounded-2xl border bg-surface p-6 ${className}`}
      style={
        {
          "--c": c,
          borderColor: `color-mix(in srgb, ${c} 38%, var(--line))`,
        } as CSSProperties
      }
    >
      <div className="flex items-start justify-between">
        <span
          className="flex h-11 w-11 items-center justify-center rounded-xl"
          style={{
            color: c,
            background: `color-mix(in srgb, ${c} 14%, transparent)`,
            border: `1px solid color-mix(in srgb, ${c} 40%, transparent)`,
          }}
        >
          <Icon name={item.icon} size={22} />
        </span>
        <span className="font-mono text-sm" style={{ color: c }}>
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <h3 className="mt-5 font-display text-lg font-bold">{item.title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{item.description}</p>

      <p className="mt-5 flex items-center gap-2 border-t border-line pt-4 text-xs text-muted">
        <span className={`h-2 w-2 rounded-full ${dot[item.stage]}`} style={{ color: c }} aria-hidden="true" />
        <span className="sr-only">Status: </span>
        {item.stage}
      </p>
    </article>
  );
}
