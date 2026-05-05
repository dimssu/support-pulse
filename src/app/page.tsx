import { Filter, ListFilter, ArrowUpDown, Sparkles, ChevronDown } from "lucide-react";
import { tickets, type Lane } from "@/data/tickets";
import { LaneHeader } from "@/components/LaneHeader";
import { TicketRow } from "@/components/TicketRow";
import { RightRail } from "@/components/RightRail";

const LANES: Lane[] = ["fire", "high", "normal", "low", "auto"];

export default function InboxPage() {
  const grouped = LANES.map((lane) => ({
    lane,
    items: tickets.filter((t) => t.lane === lane),
  }));

  return (
    <div className="flex h-full">
      {/* Center column: ticket list */}
      <section className="flex flex-1 flex-col min-w-0 border-r border-[var(--border)] bg-[var(--bg-elev)]">
        {/* Section header */}
        <div className="flex items-center gap-3 border-b border-[var(--border)] px-5 py-3">
          <h1 className="font-display text-[15px] font-semibold tracking-tight">Live triage inbox</h1>
          <span className="rounded-full bg-[var(--bg)] px-2 py-0.5 font-mono text-[10.5px] text-[var(--text-mute)] ring-1 ring-inset ring-[var(--border)]">
            {tickets.length} tickets
          </span>
          <div className="ml-auto flex items-center gap-1.5">
            <button className="flex items-center gap-1 rounded-md border border-[var(--border)] bg-[var(--bg-elev)] px-2 py-1 text-[11.5px] text-[var(--text-mute)] hover:bg-[var(--bg)]">
              <Sparkles className="h-3 w-3 text-[var(--accent)]" />
              AI re-triage
            </button>
            <button className="flex items-center gap-1 rounded-md border border-[var(--border)] bg-[var(--bg-elev)] px-2 py-1 text-[11.5px] text-[var(--text-mute)] hover:bg-[var(--bg)]">
              <Filter className="h-3 w-3" />
              Plan
              <ChevronDown className="h-3 w-3" />
            </button>
            <button className="flex items-center gap-1 rounded-md border border-[var(--border)] bg-[var(--bg-elev)] px-2 py-1 text-[11.5px] text-[var(--text-mute)] hover:bg-[var(--bg)]">
              <ListFilter className="h-3 w-3" />
              Tags
              <ChevronDown className="h-3 w-3" />
            </button>
            <button className="flex items-center gap-1 rounded-md border border-[var(--border)] bg-[var(--bg-elev)] px-2 py-1 text-[11.5px] text-[var(--text-mute)] hover:bg-[var(--bg)]">
              <ArrowUpDown className="h-3 w-3" />
              Newest
            </button>
          </div>
        </div>

        {/* Lanes */}
        <div className="flex-1 overflow-y-auto scrollbar-thin">
          {grouped.map(({ lane, items }) =>
            items.length === 0 ? null : (
              <div key={lane}>
                <LaneHeader lane={lane} count={items.length} />
                <div>
                  {items.map((t, i) => (
                    <TicketRow key={t.id} ticket={t} index={i} />
                  ))}
                </div>
              </div>
            ),
          )}

          {/* footer marker */}
          <div className="px-5 py-6 text-center">
            <span className="font-mono text-[10.5px] uppercase tracking-wider text-[var(--text-subtle)]">
              · End of queue · synced 8s ago ·
            </span>
          </div>
        </div>
      </section>

      <RightRail />
    </div>
  );
}
