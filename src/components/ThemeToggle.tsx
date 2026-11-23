import { Icon } from "./Icon";
import type { Theme } from "../hooks/useTheme";

interface Props {
  theme: Theme;
  onToggle: () => void;
}

export function ThemeToggle({ theme, onToggle }: Props) {
  const next = theme === "dark" ? "light" : "dark";
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={`Switch to ${next} theme`}
      title={`Switch to ${next} theme`}
      className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-line text-fg transition-colors hover:border-accent hover:bg-accent-soft"
    >
      <Icon name={theme === "dark" ? "sun" : "moon"} />
    </button>
  );
}
