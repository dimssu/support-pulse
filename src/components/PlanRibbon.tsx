import { planColor } from "@/lib/utils";
import type { Plan } from "@/data/customers";

export function PlanRibbon({ plan }: { plan: Plan }) {
  const c = planColor(plan);
  return (
    <span
      className="inline-flex items-center gap-1 rounded-[5px] px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider"
      style={{ color: c.fg, backgroundColor: c.bg, boxShadow: `inset 0 0 0 1px ${c.ring}` }}
    >
      {plan}
    </span>
  );
}

export function PlanBadge({ plan }: { plan: Plan }) {
  const c = planColor(plan);
  return (
    <span
      className="inline-flex items-center rounded-md px-2 py-0.5 text-[11px] font-medium"
      style={{ color: c.fg, backgroundColor: c.bg, boxShadow: `inset 0 0 0 1px ${c.ring}` }}
    >
      {plan}
    </span>
  );
}
