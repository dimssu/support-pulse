"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Send,
  Pencil,
  Calendar,
  ChevronDown,
  ChevronRight,
  BookOpen,
  TicketIcon,
  Wand2,
} from "lucide-react";
import type { DraftReply, Citation, Tone } from "@/data/draft";
import { cn } from "@/lib/utils";

const toneCopy: Record<Tone, { label: string; meta: string }> = {
  friendly: { label: "Friendly", meta: "warm · solution-first" },
  direct: { label: "Direct", meta: "concise · numbered" },
  apologetic: { label: "Apologetic", meta: "empathetic · accountable" },
};

export function DraftReplyCard({
  drafts,
  citations,
}: {
  drafts: DraftReply[];
  citations: Citation[];
}) {
  const [tone, setTone] = useState<Tone>("friendly");
  const [whyOpen, setWhyOpen] = useState(true);
  const current = drafts.find((d) => d.tone === tone) ?? drafts[0];

  return (
    <div className="rounded-lg border border-[var(--border)] bg-[var(--bg-elev)]">
      {/* Header */}
      <div className="flex items-center gap-2 border-b border-[var(--border)] px-4 py-2.5">
        <span className="flex h-6 w-6 items-center justify-center rounded-md bg-[var(--accent-soft)]">
          <Sparkles className="h-3.5 w-3.5 text-[var(--accent)]" />
        </span>
        <div className="leading-tight">
          <div className="text-[13px] font-semibold">AI-drafted reply</div>
          <div className="text-[10.5px] text-[var(--text-subtle)]">
            grounded in 3 KB articles · 2 prior tickets · confidence 0.92
          </div>
        </div>
        <div className="ml-auto flex items-center gap-1.5">
          <button className="flex items-center gap-1 rounded-md border border-[var(--border)] bg-[var(--bg)] px-2 py-1 text-[11px] text-[var(--text-mute)] hover:bg-[var(--bg-elev)]">
            <Wand2 className="h-3 w-3" />
            Regenerate
          </button>
        </div>
      </div>

      {/* Tone presets */}
      <div className="flex items-center gap-1.5 border-b border-[var(--border)] px-4 py-2">
        <span className="text-[10.5px] uppercase tracking-wider text-[var(--text-subtle)] font-semibold">
          Tone
        </span>
        <div className="flex items-center gap-1">
          {(["friendly", "direct", "apologetic"] as Tone[]).map((t) => (
            <button
              key={t}
              onClick={() => setTone(t)}
              className={cn(
                "rounded-md px-2 py-1 text-[11.5px] font-medium transition-colors",
                tone === t
                  ? "bg-[var(--accent-soft)] text-[var(--accent-strong)] ring-1 ring-inset ring-[#c7d2fe]"
                  : "text-[var(--text-mute)] hover:bg-[var(--bg)]",
              )}
            >
              {toneCopy[t].label}
            </button>
          ))}
        </div>
        <span className="ml-auto text-[10.5px] text-[var(--text-subtle)]">
          {toneCopy[tone].meta} · ~{current.estimatedReadMin} min read
        </span>
      </div>

      {/* Body */}
      <AnimatePresence mode="wait">
        <motion.div
          key={tone}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.18 }}
          className="px-4 py-3.5"
        >
          <div className="whitespace-pre-wrap text-[13px] leading-[1.65] text-[var(--text)]">
            {current.body}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Why this reply */}
      <div className="border-t border-[var(--border)]">
        <button
          onClick={() => setWhyOpen((v) => !v)}
          className="flex w-full items-center gap-2 px-4 py-2.5 text-left text-[12px] font-semibold text-[var(--text)] hover:bg-[var(--bg)]"
        >
          {whyOpen ? <ChevronDown className="h-3.5 w-3.5" /> : <ChevronRight className="h-3.5 w-3.5" />}
          Why this reply
          <span className="font-mono text-[10.5px] font-normal text-[var(--text-subtle)]">
            {citations.length} sources
          </span>
        </button>
        <AnimatePresence>
          {whyOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
              className="overflow-hidden"
            >
              <ul className="space-y-1.5 px-4 pb-3">
                {citations.map((c, i) => {
                  const Icon = c.type === "kb" ? BookOpen : TicketIcon;
                  return (
                    <li
                      key={c.id}
                      className="flex gap-2.5 rounded-md border border-[var(--border)] bg-[var(--bg)] p-2.5"
                    >
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-[var(--bg-elev)] ring-1 ring-[var(--border)]">
                        <Icon className="h-3 w-3 text-[var(--accent)]" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--text-subtle)]">
                            [{i + 1}]
                          </span>
                          <span className="text-[12px] font-medium text-[var(--text)] truncate">
                            {c.title}
                          </span>
                        </div>
                        <p className="mt-0.5 text-[11.5px] leading-snug text-[var(--text-mute)]">
                          {c.excerpt}
                        </p>
                        <div className="mt-1 text-[10.5px] text-[var(--text-subtle)]">{c.meta}</div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 border-t border-[var(--border)] bg-[var(--bg)] px-4 py-2.5">
        <button className="flex items-center gap-1.5 rounded-md bg-[var(--accent)] px-3 py-1.5 text-[12px] font-semibold text-white hover:bg-[var(--accent-strong)]">
          <Send className="h-3.5 w-3.5" />
          Send reply
        </button>
        <button className="flex items-center gap-1.5 rounded-md border border-[var(--border)] bg-[var(--bg-elev)] px-3 py-1.5 text-[12px] font-medium text-[var(--text-mute)] hover:bg-[var(--bg)]">
          <Pencil className="h-3.5 w-3.5" />
          Edit before send
        </button>
        <button className="flex items-center gap-1.5 rounded-md border border-[var(--border)] bg-[var(--bg-elev)] px-3 py-1.5 text-[12px] font-medium text-[var(--text-mute)] hover:bg-[var(--bg)]">
          <Calendar className="h-3.5 w-3.5" />
          Schedule
        </button>
        <span className="ml-auto text-[10.5px] text-[var(--text-subtle)]">
          Will sign as <span className="font-medium text-[var(--text-mute)]">Mira Lindqvist · L2 Billing</span>
        </span>
      </div>
    </div>
  );
}
