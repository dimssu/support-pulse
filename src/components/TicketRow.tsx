"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, MessageSquare, Hash, AtSign, AlertTriangle } from "lucide-react";
import type { Ticket } from "@/data/tickets";
import { getCustomer } from "@/data/customers";
import { PlanRibbon } from "./PlanRibbon";
import { TagChip, ActionChip } from "./Chip";
import { formatRelativeTime } from "@/lib/utils";

const channelIcon = {
  email: Mail,
  "in-app": MessageSquare,
  slack: Hash,
  twitter: AtSign,
} as const;

export function TicketRow({ ticket, index }: { ticket: Ticket; index: number }) {
  const customer = getCustomer(ticket.customerId);
  const Channel = channelIcon[ticket.channel];

  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1], delay: Math.min(index * 0.012, 0.18) }}
    >
      <Link
        href={`/ticket/${ticket.id}`}
        className="group relative flex items-start gap-3 border-b border-[var(--border)] px-5 py-2.5 hover:bg-[var(--bg)] transition-colors"
      >
        {/* Avatar */}
        <div className="relative shrink-0 pt-0.5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={customer.avatar}
            alt={customer.name}
            className="h-8 w-8 rounded-full bg-[var(--bg)] ring-1 ring-[var(--border)]"
          />
          {ticket.slaAtRisk && (
            <span className="absolute -right-0.5 -top-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[var(--lane-fire)] ring-2 ring-[var(--bg-elev)]">
              <AlertTriangle className="h-2 w-2 text-white" strokeWidth={3} />
            </span>
          )}
        </div>

        {/* Body */}
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <div className="flex items-center gap-2 text-[13px]">
            <span className="font-medium text-[var(--text)] truncate max-w-[120px]">{customer.name}</span>
            <span className="text-[var(--text-subtle)] truncate hidden md:inline max-w-[140px]">{customer.company}</span>
            <PlanRibbon plan={customer.plan} />
            <Channel className="h-3 w-3 text-[var(--text-subtle)]" />
            <span className="ml-auto font-mono text-[11px] text-[var(--text-subtle)] tabular-nums">
              {formatRelativeTime(ticket.minutesAgo)}
            </span>
          </div>

          <div className="flex items-baseline gap-2 min-w-0">
            <span className="text-[13.5px] font-semibold text-[var(--text)] truncate">
              {ticket.subject}
            </span>
            <span className="text-[12.5px] text-[var(--text-mute)] truncate min-w-0">
              — {ticket.snippet}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
            {ticket.aiTags.map((t) => (
              <TagChip key={t} label={t} />
            ))}
            <span className="mx-1 h-3 w-px bg-[var(--border)]" />
            <ActionChip label={ticket.suggestedAction} />
            <span className="ml-auto hidden lg:inline font-mono text-[10.5px] text-[var(--text-subtle)]">
              {ticket.id} · conf {Math.round(ticket.confidence * 100)}%
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
