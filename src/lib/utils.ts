export function cn(...args: Array<string | false | null | undefined>) {
  return args.filter(Boolean).join(" ");
}

export function formatRelativeTime(minutesAgo: number): string {
  if (minutesAgo < 1) return "just now";
  if (minutesAgo < 60) return `${minutesAgo}m`;
  const hours = Math.floor(minutesAgo / 60);
  if (hours < 24) return `${hours}h`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d`;
  const weeks = Math.floor(days / 7);
  return `${weeks}w`;
}

export function formatCurrency(value: number): string {
  if (value >= 1000) return `$${(value / 1000).toFixed(1)}k`;
  return `$${value}`;
}

export function planColor(plan: string): { fg: string; bg: string; ring: string } {
  switch (plan) {
    case "Enterprise":
      return { fg: "#4f46e5", bg: "#eef2ff", ring: "#c7d2fe" };
    case "Business":
      return { fg: "#0e7490", bg: "#ecfeff", ring: "#a5f3fc" };
    case "Pro":
      return { fg: "#0f766e", bg: "#f0fdfa", ring: "#99f6e4" };
    default:
      return { fg: "#57534e", bg: "#f5f5f4", ring: "#e7e5e4" };
  }
}

export function laneMeta(lane: string) {
  switch (lane) {
    case "fire":
      return { label: "Fire", color: "var(--lane-fire)", soft: "var(--lane-fire-soft)", icon: "flame" };
    case "high":
      return { label: "High", color: "var(--lane-high)", soft: "var(--lane-high-soft)", icon: "zap" };
    case "normal":
      return { label: "Normal", color: "var(--lane-normal)", soft: "var(--lane-normal-soft)", icon: "circle" };
    case "low":
      return { label: "Low", color: "var(--lane-low)", soft: "var(--lane-low-soft)", icon: "minus" };
    case "auto":
      return { label: "Auto-resolved", color: "var(--lane-auto)", soft: "var(--lane-auto-soft)", icon: "check" };
    default:
      return { label: lane, color: "var(--text-mute)", soft: "var(--bg)", icon: "circle" };
  }
}
