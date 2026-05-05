"use client";

import { motion } from "framer-motion";
import { TrendingUp, AlertTriangle, Clock, CheckCircle2, Inbox, Sparkles, ChevronRight } from "lucide-react";
import { tickets } from "@/data/tickets";
import { getCustomer } from "@/data/customers";
import { agents } from "@/data/agents";
import { formatRelativeTime } from "@/lib/utils";

export function RightRail() {
  const slaAtRisk = tickets.filter((t) => t.slaAtRisk);
  const today = {
    closed: 14,
    awaiting: 8,
    avgFirstResponseMin: 12,
    autoResolved: 23,
  };
  const wren = agents[0];

  return (
    <aside className="hidden xl:flex w-[320px] shrink-0 flex-col border-l border-[var(--border)] bg-[var(--bg-elev)] overflow-y-auto scrollbar-thin">
      {/* SLA at risk */}
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="border-b border-[var(--border)] p-4"
      >
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--text-subtle)]">
            SLA at risk
          </span>
          <span className="rounded-full bg-[var(--lane-fire-soft)] px-2 py-0.5 text-[11px] font-bold text-[var(--lane-fire)] ring-1 ring-inset ring-[#fecaca]">
            {slaAtRisk.length} tickets
          </span>
        </div>
        <ul className="mt-3 space-y-2">
          {slaAtRisk.slice(0, 4).map((t) => {
            const c = getCustomer(t.customerId);
            return (
              <li
                key={t.id}
                className="flex items-start gap-2 rounded-md border border-[var(--border)] bg-[var(--bg)] p-2"
              >
                <AlertTriangle className="h-3.5 w-3.5 shrink-0 text-[var(--lane-fire)] mt-0.5" />
                <div className="min-w-0">
                  <div className="text-[12px] font-medium text-[var(--text)] truncate">{t.subject}</div>
                  <div className="text-[10.5px] text-[var(--text-subtle)] truncate">
                    {c.company} · {formatRelativeTime(t.minutesAgo)} old
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </motion.div>

      {/* Today's load */}
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, delay: 0.05 }}
        className="border-b border-[var(--border)] p-4"
      >
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--text-subtle)]">
            Today's load
          </span>
          <span className="font-mono text-[10.5px] text-[var(--text-subtle)]">live</span>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2">
          <Stat icon={CheckCircle2} label="Closed" value={today.closed} accent="var(--lane-auto)" />
          <Stat icon={Inbox} label="Awaiting" value={today.awaiting} accent="var(--lane-high)" />
          <Stat icon={Clock} label="Avg first resp" value={`${today.avgFirstResponseMin}m`} accent="var(--accent)" />
          <Stat icon={Sparkles} label="Auto-resolved" value={today.autoResolved} accent="var(--lane-auto)" />
        </div>
        <div className="mt-3 rounded-md border border-[var(--border)] bg-[var(--bg)] p-2.5">
          <div className="flex items-center gap-1.5 text-[11.5px]">
            <TrendingUp className="h-3 w-3 text-emerald-600" />
            <span className="text-[var(--text)]">First response down 19% wow</span>
          </div>
          <div className="mt-1 text-[10.5px] text-[var(--text-subtle)]">
            14m → 12m median across 3 teams
          </div>
        </div>
      </motion.div>

      {/* On-call */}
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, delay: 0.1 }}
        className="border-b border-[var(--border)] p-4"
      >
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--text-subtle)]">
            On-call rotation
          </span>
          <span className="font-mono text-[10.5px] text-[var(--text-subtle)]">UTC+05:30</span>
        </div>
        <div className="mt-2 flex items-center gap-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={wren.avatar} alt={wren.name} className="h-7 w-7 rounded-full bg-[var(--bg)] ring-1 ring-[var(--border)]" />
          <div className="min-w-0 flex-1">
            <div className="text-[12.5px] font-medium text-[var(--text)]">{wren.name}</div>
            <div className="text-[10.5px] text-[var(--text-subtle)]">Lead · Platform · CSAT {wren.csat}</div>
          </div>
          <span className="rounded-full bg-emerald-50 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-700 ring-1 ring-inset ring-emerald-200">
            Active
          </span>
        </div>
        <ul className="mt-3 space-y-1 text-[11.5px]">
          {agents.slice(1, 4).map((a) => (
            <li key={a.id} className="flex items-center justify-between text-[var(--text-mute)]">
              <span className="flex items-center gap-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={a.avatar} alt={a.name} className="h-5 w-5 rounded-full bg-[var(--bg)] ring-1 ring-[var(--border)]" />
                {a.name}
              </span>
              <span className="font-mono text-[10.5px]">{a.queueCount}</span>
            </li>
          ))}
        </ul>
      </motion.div>

      {/* AI digest */}
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, delay: 0.15 }}
        className="p-4"
      >
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--text-subtle)]">
            AI digest · last 24h
          </span>
        </div>
        <ul className="mt-2 space-y-2 text-[11.5px] text-[var(--text-mute)]">
          <li className="flex items-start gap-2">
            <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-[var(--accent)]" />
            <span>3 webhook-related tickets clustered — likely linked to RFC-1182 patch</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-[var(--accent)]" />
            <span>Sablebay (Imani) CSAT trend down 0.6 — escalate to CS Lead</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-[var(--accent)]" />
            <span>23 tickets auto-closed via KB · saved ~6.4h of L1 time</span>
          </li>
        </ul>
        <button className="mt-3 flex w-full items-center justify-between rounded-md border border-[var(--border)] bg-[var(--bg)] px-2.5 py-1.5 text-[11.5px] text-[var(--text-mute)] hover:bg-[var(--bg-elev)]">
          Open full digest
          <ChevronRight className="h-3 w-3" />
        </button>
      </motion.div>
    </aside>
  );
}

function Stat({
  icon: Icon,
  label,
  value,
  accent,
}: {
  icon: typeof TrendingUp;
  label: string;
  value: string | number;
  accent: string;
}) {
  return (
    <div className="rounded-md border border-[var(--border)] bg-[var(--bg)] p-2.5">
      <div className="flex items-center gap-1.5">
        <Icon className="h-3 w-3" style={{ color: accent }} />
        <span className="text-[10px] font-medium uppercase tracking-wider text-[var(--text-subtle)]">{label}</span>
      </div>
      <div className="mt-0.5 font-display text-[18px] font-semibold tabular-nums text-[var(--text)]">{value}</div>
    </div>
  );
}
