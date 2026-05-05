"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Clock,
  Timer,
  Heart,
  Inbox,
  TrendingUp,
  AlertOctagon,
  Sparkles,
  ChevronRight,
  Activity,
  Zap,
  EyeOff,
  MessageCircleWarning,
  GraduationCap,
} from "lucide-react";
import { agents, agentMetrics, type Agent } from "@/data/agents";
import { coachingMoments, type CoachingMoment, type CoachingType } from "@/data/coaching";
import { getCustomer } from "@/data/customers";
import { TrendChart } from "@/components/TrendChart";
import { cn, formatRelativeTime } from "@/lib/utils";

const coachingIcon: Record<CoachingType, typeof Activity> = {
  "slow-response": Clock,
  "missed-signal": EyeOff,
  "escalation-pattern": AlertOctagon,
  tone: MessageCircleWarning,
  "knowledge-gap": GraduationCap,
};

export default function TeamPage() {
  const [activeId, setActiveId] = useState<string>("a8"); // Saoirse — has coaching moments
  const active: Agent = agents.find((a) => a.id === activeId) ?? agents[0];
  const metrics = agentMetrics[active.id];
  const moments: CoachingMoment[] = coachingMoments.filter((m) => m.agentId === active.id);

  return (
    <div className="h-full overflow-y-auto scrollbar-thin">
      <div className="mx-auto max-w-[1280px] px-6 py-6">
        {/* Header */}
        <div className="flex items-end justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-display text-[22px] font-semibold tracking-tight">Team scorecard</h1>
              <span className="rounded-full bg-[var(--bg-elev)] px-2 py-0.5 text-[11px] text-[var(--text-mute)] ring-1 ring-inset ring-[var(--border)]">
                Q3 2026 · 12 weeks
              </span>
            </div>
            <p className="mt-1 text-[12.5px] text-[var(--text-mute)]">
              First-response, resolution, CSAT, volume and escalation per agent — with AI-flagged coaching
              moments grounded in real tickets.
            </p>
          </div>
          <button className="flex items-center gap-1.5 rounded-md border border-[var(--border)] bg-[var(--bg-elev)] px-3 py-1.5 text-[12px] text-[var(--text-mute)] hover:bg-[var(--bg)]">
            <TrendingUp className="h-3.5 w-3.5 text-[var(--accent)]" />
            Compare period
          </button>
        </div>

        {/* Agent picker */}
        <div className="mt-5 rounded-lg border border-[var(--border)] bg-[var(--bg-elev)] p-3">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--text-subtle)]">
              Agents · 8
            </span>
            <span className="font-mono text-[10.5px] text-[var(--text-subtle)]">
              click to focus · queue badges show active load
            </span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {agents.map((a) => {
              const m = agentMetrics[a.id];
              const isActive = a.id === activeId;
              return (
                <button
                  key={a.id}
                  onClick={() => setActiveId(a.id)}
                  className={cn(
                    "group flex items-center gap-2 rounded-full border py-1 pl-1 pr-3 text-[12px] transition-colors",
                    isActive
                      ? "border-[#c7d2fe] bg-[var(--accent-soft)] text-[var(--accent-strong)]"
                      : "border-[var(--border)] bg-[var(--bg-elev)] text-[var(--text-mute)] hover:bg-[var(--bg)]",
                  )}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={a.avatar}
                    alt={a.name}
                    className="h-6 w-6 rounded-full bg-[var(--bg)] ring-1 ring-[var(--border)]"
                  />
                  <span className="font-medium">{a.name}</span>
                  <span className={cn(
                    "rounded px-1.5 py-0.5 text-[10px] font-semibold",
                    isActive ? "bg-white/70 text-[var(--accent-strong)]" : "bg-[var(--bg)] text-[var(--text-subtle)]"
                  )}>
                    {a.role}
                  </span>
                  <span className={cn(
                    "rounded-full px-1.5 py-0.5 font-mono text-[10px] tabular-nums",
                    a.queueCount > 18
                      ? "bg-[var(--lane-fire-soft)] text-[var(--lane-fire)]"
                      : a.queueCount > 12
                        ? "bg-[var(--lane-high-soft)] text-[var(--lane-high)]"
                        : "bg-[var(--bg)] text-[var(--text-subtle)]",
                  )}>
                    {m.ticketVolume}/q
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active agent header */}
        <motion.section
          key={active.id}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.22 }}
          className="mt-5 rounded-lg border border-[var(--border)] bg-[var(--bg-elev)] p-4"
        >
          <div className="flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={active.avatar}
              alt={active.name}
              className="h-12 w-12 rounded-full bg-[var(--bg)] ring-1 ring-[var(--border)]"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display text-[16px] font-semibold tracking-tight">{active.name}</span>
                <span className="rounded bg-[var(--accent-soft)] px-1.5 py-0.5 text-[10px] font-semibold text-[var(--accent-strong)]">
                  {active.role}
                </span>
                <span className="rounded bg-[var(--bg)] px-1.5 py-0.5 text-[10px] font-medium text-[var(--text-mute)] ring-1 ring-inset ring-[var(--border)]">
                  {active.team}
                </span>
              </div>
              <div className="mt-0.5 text-[11.5px] text-[var(--text-subtle)]">
                {active.tenureMonths} months tenure · CSAT lifetime {active.csat} · {active.queueCount} active
              </div>
            </div>
            <div className="ml-auto hidden md:flex items-center gap-1.5">
              <button className="rounded-md border border-[var(--border)] bg-[var(--bg-elev)] px-2.5 py-1 text-[11.5px] text-[var(--text-mute)] hover:bg-[var(--bg)]">
                Send 1:1 invite
              </button>
              <button className="rounded-md border border-[var(--border)] bg-[var(--bg-elev)] px-2.5 py-1 text-[11.5px] text-[var(--text-mute)] hover:bg-[var(--bg)]">
                Export PDF
              </button>
            </div>
          </div>

          {/* Metric tiles */}
          <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-5">
            <MetricTile
              icon={Clock}
              label="Avg first response"
              value={`${metrics.avgFirstResponseMin}m`}
              delta="-2m wow"
              trend="up"
            />
            <MetricTile
              icon={Timer}
              label="Avg resolution"
              value={`${metrics.avgResolutionHours}h`}
              delta="+0.4h wow"
              trend="down"
            />
            <MetricTile
              icon={Heart}
              label="CSAT"
              value={`${metrics.csat}%`}
              delta={metrics.csat < 85 ? "-3 wow" : "+1 wow"}
              trend={metrics.csat < 85 ? "down" : "up"}
            />
            <MetricTile
              icon={Inbox}
              label="Tickets · 12w"
              value={metrics.ticketVolume.toString()}
              delta="vs 198 team avg"
              trend="flat"
            />
            <MetricTile
              icon={Zap}
              label="Escalation rate"
              value={`${metrics.escalationRate}%`}
              delta={metrics.escalationRate > 10 ? "above target" : "within target"}
              trend={metrics.escalationRate > 10 ? "down" : "up"}
            />
          </div>
        </motion.section>

        {/* Trend chart */}
        <div className="mt-5">
          <TrendChart metrics={metrics} />
        </div>

        {/* Coaching moments */}
        <section className="mt-6">
          <div className="mb-2 flex items-end justify-between">
            <div>
              <h2 className="font-display text-[16px] font-semibold tracking-tight">Coaching moments</h2>
              <p className="mt-0.5 text-[11.5px] text-[var(--text-subtle)]">
                Specific tickets the AI flagged for review · grounded in audit log + sentiment delta
              </p>
            </div>
            <span className="rounded-full bg-[var(--bg-elev)] px-2 py-0.5 text-[11px] text-[var(--text-mute)] ring-1 ring-inset ring-[var(--border)]">
              {moments.length} flagged · 5 reviewed this week
            </span>
          </div>

          <div className="space-y-2">
            {moments.length === 0 ? (
              <div className="rounded-lg border border-dashed border-[var(--border)] bg-[var(--bg-elev)] p-6 text-center text-[12.5px] text-[var(--text-subtle)]">
                <Sparkles className="mx-auto mb-1.5 h-4 w-4 text-[var(--accent)]" />
                No coaching moments flagged for {active.name.split(" ")[0]} this period — strong week.
              </div>
            ) : (
              moments.map((m, i) => {
                const Icon = coachingIcon[m.type];
                const customer = getCustomer(
                  // map by name search; fallback to first
                  ({ a4: "c11", a8: "c11" } as Record<string, string>)[active.id] ?? "c1",
                );
                void customer;
                return (
                  <motion.div
                    key={m.id}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.22 }}
                    className="rounded-lg border border-[var(--border)] bg-[var(--bg-elev)] p-3"
                  >
                    <div className="flex items-start gap-3">
                      <span
                        className={cn(
                          "flex h-7 w-7 shrink-0 items-center justify-center rounded-md",
                          m.severity === "high"
                            ? "bg-[var(--lane-fire-soft)] text-[var(--lane-fire)]"
                            : m.severity === "med"
                              ? "bg-[var(--lane-high-soft)] text-[var(--lane-high)]"
                              : "bg-[var(--bg)] text-[var(--text-mute)]",
                        )}
                      >
                        <Icon className="h-3.5 w-3.5" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[13px] font-semibold">{m.label}</span>
                          <span
                            className={cn(
                              "rounded px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider",
                              m.severity === "high"
                                ? "bg-[var(--lane-fire-soft)] text-[var(--lane-fire)]"
                                : m.severity === "med"
                                  ? "bg-[var(--lane-high-soft)] text-[var(--lane-high)]"
                                  : "bg-[var(--bg)] text-[var(--text-subtle)] ring-1 ring-inset ring-[var(--border)]",
                            )}
                          >
                            {m.severity}
                          </span>
                          <span className="ml-auto font-mono text-[10.5px] text-[var(--text-subtle)]">
                            flagged {formatRelativeTime(m.flaggedAtMinutesAgo)} ago
                          </span>
                        </div>
                        <p className="mt-1 text-[12px] leading-relaxed text-[var(--text-mute)]">{m.detail}</p>

                        <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-2">
                          <div className="rounded-md border border-[var(--border)] bg-[var(--bg)] p-2">
                            <div className="text-[10px] font-semibold uppercase tracking-wider text-[var(--text-subtle)]">
                              Ticket
                            </div>
                            <div className="mt-0.5 text-[12px] font-medium text-[var(--text)] truncate">
                              {m.ticketSubject}
                            </div>
                            <div className="mt-0.5 text-[10.5px] text-[var(--text-subtle)] truncate">
                              {m.customerName} · {m.customerCompany} · {m.ticketId}
                            </div>
                          </div>
                          <div className="rounded-md border border-[var(--border)] bg-[var(--accent-soft)]/40 p-2">
                            <div className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-[var(--accent-strong)]">
                              <Sparkles className="h-3 w-3" />
                              Suggestion
                            </div>
                            <div className="mt-0.5 text-[12px] leading-snug text-[var(--text)]">
                              {m.suggestion}
                            </div>
                          </div>
                        </div>

                        <div className="mt-2 flex items-center gap-1.5">
                          <a
                            href={`/ticket/${m.ticketId}`}
                            className="flex items-center gap-1 rounded-md bg-[var(--accent)] px-2.5 py-1 text-[11.5px] font-semibold text-white hover:bg-[var(--accent-strong)]"
                          >
                            Review ticket
                            <ChevronRight className="h-3 w-3" />
                          </a>
                          <button className="rounded-md border border-[var(--border)] bg-[var(--bg-elev)] px-2.5 py-1 text-[11.5px] text-[var(--text-mute)] hover:bg-[var(--bg)]">
                            Add to 1:1
                          </button>
                          <button className="rounded-md border border-[var(--border)] bg-[var(--bg-elev)] px-2.5 py-1 text-[11.5px] text-[var(--text-mute)] hover:bg-[var(--bg)]">
                            Dismiss
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })
            )}
          </div>
        </section>

        <div className="py-8 text-center font-mono text-[10.5px] uppercase tracking-wider text-[var(--text-subtle)]">
          · Scorecard updated 12 minutes ago · next refresh at top of hour ·
        </div>
      </div>
    </div>
  );
}

function MetricTile({
  icon: Icon,
  label,
  value,
  delta,
  trend,
}: {
  icon: typeof Clock;
  label: string;
  value: string;
  delta: string;
  trend: "up" | "down" | "flat";
}) {
  const deltaColor =
    trend === "up" ? "text-emerald-700" : trend === "down" ? "text-[var(--lane-fire)]" : "text-[var(--text-subtle)]";
  return (
    <div className="rounded-md border border-[var(--border)] bg-[var(--bg)] p-3">
      <div className="flex items-center gap-1.5 text-[10.5px] font-semibold uppercase tracking-wider text-[var(--text-subtle)]">
        <Icon className="h-3 w-3" />
        {label}
      </div>
      <div className="mt-1 font-display text-[22px] font-semibold tabular-nums text-[var(--text)]">{value}</div>
      <div className={cn("mt-0.5 text-[11px]", deltaColor)}>{delta}</div>
    </div>
  );
}
