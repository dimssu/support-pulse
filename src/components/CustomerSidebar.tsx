"use client";

import { motion } from "framer-motion";
import { Calendar, DollarSign, Hash, Globe, ShieldCheck, ChevronRight } from "lucide-react";
import type { Customer } from "@/data/customers";
import { tickets, type Ticket } from "@/data/tickets";
import { PlanBadge } from "./PlanRibbon";
import { formatCurrency, formatRelativeTime } from "@/lib/utils";

export function CustomerSidebar({
  customer,
  currentTicketId,
}: {
  customer: Customer;
  currentTicketId: string;
}) {
  const recent: Ticket[] = tickets
    .filter((t) => t.id !== currentTicketId)
    .slice(0, 5);

  return (
    <aside className="w-[320px] shrink-0 border-l border-[var(--border)] bg-[var(--bg-elev)] overflow-y-auto scrollbar-thin">
      <div className="p-4">
        <div className="flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={customer.avatar}
            alt={customer.name}
            className="h-12 w-12 rounded-full bg-[var(--bg)] ring-1 ring-[var(--border)]"
          />
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-display text-[15px] font-semibold tracking-tight truncate">
                {customer.name}
              </span>
            </div>
            <div className="text-[11.5px] text-[var(--text-subtle)] truncate">{customer.email}</div>
          </div>
        </div>

        <div className="mt-3 flex items-center gap-2">
          <PlanBadge plan={customer.plan} />
          <span className="rounded-md bg-[var(--bg)] px-1.5 py-0.5 text-[10.5px] font-medium text-[var(--text-mute)] ring-1 ring-inset ring-[var(--border)]">
            {customer.company}
          </span>
        </div>

        <dl className="mt-4 grid grid-cols-2 gap-2">
          <Fact icon={DollarSign} label="MRR" value={formatCurrency(customer.mrr) + "/mo"} />
          <Fact icon={Calendar} label="Account age" value={`${customer.accountAgeDays}d`} />
          <Fact icon={Hash} label="Lifetime tix" value={String(customer.ticketCount)} />
          <Fact icon={Globe} label="Region" value={customer.region} />
        </dl>

        <div className="mt-4 rounded-md border border-[var(--border)] bg-[var(--bg)] p-3">
          <div className="flex items-center gap-1.5 text-[11.5px] font-medium text-[var(--text)]">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
            Health: <span className="text-emerald-700">Strong</span>
          </div>
          <div className="mt-1 text-[10.5px] leading-snug text-[var(--text-mute)]">
            CSAT 92 · NPS +48 · last incident 31d ago. Renews in 47 days. Owner: Wren Halverson.
          </div>
        </div>
      </div>

      <div className="border-t border-[var(--border)] p-4">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--text-subtle)]">
            Recent tickets
          </span>
          <span className="font-mono text-[10.5px] text-[var(--text-subtle)]">last 5</span>
        </div>
        <ul className="mt-2 space-y-1">
          {recent.map((t, i) => (
            <motion.li
              key={t.id}
              initial={{ opacity: 0, y: 3 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04, duration: 0.2 }}
              className="flex items-start gap-2 rounded-md border border-[var(--border)] bg-[var(--bg)] p-2 hover:bg-[var(--bg-elev)]"
            >
              <span
                className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full"
                style={{
                  backgroundColor:
                    t.lane === "fire"
                      ? "var(--lane-fire)"
                      : t.lane === "high"
                        ? "var(--lane-high)"
                        : t.lane === "auto"
                          ? "var(--lane-auto)"
                          : "var(--lane-normal)",
                }}
              />
              <div className="min-w-0 flex-1">
                <div className="text-[12px] font-medium text-[var(--text)] truncate">{t.subject}</div>
                <div className="text-[10.5px] text-[var(--text-subtle)] truncate">
                  {t.id} · {formatRelativeTime(t.minutesAgo)} · {t.aiTags[0]}
                </div>
              </div>
              <ChevronRight className="mt-1 h-3 w-3 text-[var(--text-subtle)]" />
            </motion.li>
          ))}
        </ul>
      </div>
    </aside>
  );
}

function Fact({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Calendar;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-md border border-[var(--border)] bg-[var(--bg)] p-2.5">
      <div className="flex items-center gap-1 text-[10px] font-medium uppercase tracking-wider text-[var(--text-subtle)]">
        <Icon className="h-3 w-3" />
        {label}
      </div>
      <div className="mt-0.5 font-display text-[14px] font-semibold tabular-nums text-[var(--text)]">
        {value}
      </div>
    </div>
  );
}
