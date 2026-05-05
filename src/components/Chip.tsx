import { cn } from "@/lib/utils";

export function TagChip({ label, tone = "neutral" }: { label: string; tone?: "neutral" | "alert" | "warn" | "info" }) {
  const tones = {
    neutral: "bg-[var(--bg)] text-[var(--text-mute)] ring-[var(--border)]",
    alert: "bg-[var(--lane-fire-soft)] text-[var(--lane-fire)] ring-[#fecaca]",
    warn: "bg-[var(--lane-high-soft)] text-[var(--lane-high)] ring-[#fed7aa]",
    info: "bg-[var(--accent-soft)] text-[var(--accent-strong)] ring-[#c7d2fe]",
  } as const;
  // Heuristic: bug/outage/sev1 -> alert; churn/security -> warn; bill -> info
  const auto =
    /sev|outage|bug/i.test(label) ? tones.alert :
    /churn|security|gdpr|compliance/i.test(label) ? tones.warn :
    /bill|how-to|reporting|integrations|sso|auth|webhook|sandbox/i.test(label) ? tones.info :
    tones[tone];
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md px-1.5 py-0.5 text-[10.5px] font-medium ring-1 ring-inset",
        auto,
      )}
    >
      {label}
    </span>
  );
}

export function ActionChip({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-md bg-[var(--accent-soft)] px-1.5 py-0.5 text-[10.5px] font-semibold text-[var(--accent-strong)] ring-1 ring-inset ring-[#c7d2fe]">
      <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
      {label}
    </span>
  );
}
