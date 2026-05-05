import { Flame, Zap, Circle, Minus, CheckCircle2 } from "lucide-react";
import type { Lane } from "@/data/tickets";

const config: Record<Lane, { label: string; icon: typeof Flame; color: string; bg: string; description: string }> = {
  fire: { label: "Fire", icon: Flame, color: "var(--lane-fire)", bg: "var(--lane-fire-soft)", description: "Outages, churn risk, security" },
  high: { label: "High", icon: Zap, color: "var(--lane-high)", bg: "var(--lane-high-soft)", description: "Bugs, billing, blocked enterprise" },
  normal: { label: "Normal", icon: Circle, color: "var(--lane-normal)", bg: "var(--lane-normal-soft)", description: "How-tos, integrations, perms" },
  low: { label: "Low", icon: Minus, color: "var(--lane-low)", bg: "var(--lane-low-soft)", description: "Feature requests, typos, praise" },
  auto: { label: "Auto-resolved", icon: CheckCircle2, color: "var(--lane-auto)", bg: "var(--lane-auto-soft)", description: "Closed by AI within SLA" },
};

export function LaneHeader({ lane, count }: { lane: Lane; count: number }) {
  const c = config[lane];
  const Icon = c.icon;
  return (
    <div className="sticky top-0 z-10 flex items-center gap-2 border-b border-[var(--border)] bg-[var(--bg-elev)]/95 backdrop-blur px-5 py-2">
      <span
        className="flex h-5 w-5 items-center justify-center rounded-md"
        style={{ backgroundColor: c.bg }}
      >
        <Icon className="h-3 w-3" style={{ color: c.color }} strokeWidth={2.5} />
      </span>
      <span className="text-[12px] font-semibold tracking-tight" style={{ color: c.color }}>
        {c.label}
      </span>
      <span className="rounded-full bg-[var(--bg)] px-1.5 py-0.5 font-mono text-[10.5px] tabular-nums text-[var(--text-mute)] ring-1 ring-inset ring-[var(--border)]">
        {count}
      </span>
      <span className="hidden md:inline text-[11.5px] text-[var(--text-subtle)]">
        · {c.description}
      </span>
    </div>
  );
}
