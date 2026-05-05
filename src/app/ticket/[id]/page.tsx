import Link from "next/link";
import { ArrowLeft, ChevronRight, AlertTriangle, Sparkles } from "lucide-react";
import { tickets, getTicket, focalTicketId } from "@/data/tickets";
import { getCustomer } from "@/data/customers";
import { getAgent } from "@/data/agents";
import { getThread } from "@/data/threads";
import { getDrafts, getCitations } from "@/data/draft";
import { ThreadView } from "@/components/ThreadView";
import { CustomerSidebar } from "@/components/CustomerSidebar";
import { DraftReplyCard } from "@/components/DraftReplyCard";
import { TagChip } from "@/components/Chip";

export function generateStaticParams() {
  return tickets.map((t) => ({ id: t.id }));
}

export default async function TicketDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const ticket = getTicket(id);
  const customer = getCustomer(ticket.customerId);
  const agent = getAgent(ticket.assignedAgentId);
  const messages = getThread(ticket.threadId);
  // Always show drafts/citations for the focal ticket as the canonical demo.
  const drafts = getDrafts(focalTicketId);
  const citations = getCitations(focalTicketId);

  // If thread has no messages, fabricate one from ticket body so any ticket renders nicely.
  const finalMessages =
    messages.length > 0
      ? messages
      : [
          {
            id: "fallback-1",
            threadId: ticket.threadId,
            sender: "customer" as const,
            senderName: customer.name,
            timestamp: "today",
            minutesAgo: ticket.minutesAgo,
            body: ticket.body,
          },
          {
            id: "fallback-2",
            threadId: ticket.threadId,
            sender: "system" as const,
            senderName: "Support Pulse",
            timestamp: "today",
            minutesAgo: ticket.minutesAgo,
            body: `Auto-classified · lane=${ticket.lane} · tags=[${ticket.aiTags.join(", ")}] · suggested=${ticket.suggestedAction} · confidence ${Math.round(ticket.confidence * 100)}%`,
          },
        ];

  return (
    <div className="flex h-full">
      {/* Center column */}
      <section className="flex flex-1 flex-col min-w-0 border-r border-[var(--border)] bg-[var(--bg-elev)] overflow-hidden">
        {/* Breadcrumb header */}
        <div className="flex items-center gap-2 border-b border-[var(--border)] px-5 py-2.5">
          <Link
            href="/"
            className="flex items-center gap-1 rounded-md px-1.5 py-1 text-[11.5px] text-[var(--text-mute)] hover:bg-[var(--bg)]"
          >
            <ArrowLeft className="h-3 w-3" />
            Inbox
          </Link>
          <ChevronRight className="h-3 w-3 text-[var(--text-subtle)]" />
          <span className="font-mono text-[11.5px] text-[var(--text-subtle)]">{ticket.id}</span>
          <ChevronRight className="h-3 w-3 text-[var(--text-subtle)]" />
          <span className="text-[11.5px] text-[var(--text)] truncate">{ticket.subject}</span>
          {ticket.slaAtRisk && (
            <span className="ml-auto flex items-center gap-1 rounded-full bg-[var(--lane-fire-soft)] px-2 py-0.5 text-[10.5px] font-semibold text-[var(--lane-fire)] ring-1 ring-inset ring-[#fecaca]">
              <AlertTriangle className="h-3 w-3" />
              SLA at risk
            </span>
          )}
        </div>

        {/* Subject + meta */}
        <div className="border-b border-[var(--border)] px-5 py-4">
          <div className="flex items-start gap-3">
            <div className="flex-1 min-w-0">
              <h1 className="font-display text-[20px] font-semibold tracking-tight text-[var(--text)]">
                {ticket.subject}
              </h1>
              <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
                {ticket.aiTags.map((t) => (
                  <TagChip key={t} label={t} />
                ))}
                <span className="mx-1 h-3 w-px bg-[var(--border)]" />
                <span className="text-[11.5px] text-[var(--text-subtle)]">
                  Assigned to <span className="font-medium text-[var(--text-mute)]">{agent.name}</span> · {customer.region}
                </span>
              </div>
            </div>
            <div className="hidden md:flex flex-col items-end gap-0.5 text-right">
              <span className="font-mono text-[10.5px] text-[var(--text-subtle)]">channel</span>
              <span className="text-[12px] font-medium capitalize">{ticket.channel}</span>
            </div>
          </div>
        </div>

        {/* Scrolling content */}
        <div className="flex-1 overflow-y-auto scrollbar-thin">
          <div className="mx-auto max-w-3xl px-5 py-5 space-y-5">
            {/* Triage summary */}
            <div className="rounded-lg border border-[var(--border)] bg-[var(--bg)] p-3">
              <div className="flex items-center gap-2">
                <Sparkles className="h-3.5 w-3.5 text-[var(--accent)]" />
                <span className="text-[12px] font-semibold">AI triage summary</span>
                <span className="ml-auto font-mono text-[10.5px] text-[var(--text-subtle)]">
                  classified 38m ago
                </span>
              </div>
              <p className="mt-1.5 text-[12.5px] leading-relaxed text-[var(--text-mute)]">
                Enterprise customer reports a <span className="font-medium text-[var(--text)]">duplicate seat-upgrade charge</span>. Ledger
                confirms two invoices fired ~18s apart from the same provisioning event — root cause matches the
                webhook-retry class patched in <span className="font-mono">RFC-1182</span>. Recommended path:
                refund INV-88419, send credit memo, confirm seat count unchanged.
              </p>
            </div>

            {/* Thread */}
            <ThreadView messages={finalMessages} customer={customer} />

            {/* Drafted reply */}
            <DraftReplyCard drafts={drafts} citations={citations} />

            <div className="pb-2 text-center text-[10.5px] uppercase tracking-wider text-[var(--text-subtle)] font-mono">
              · Thread synced · {finalMessages.length} messages ·
            </div>
          </div>
        </div>
      </section>

      <CustomerSidebar customer={customer} currentTicketId={ticket.id} />
    </div>
  );
}
