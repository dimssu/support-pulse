"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import type { ThreadMessage } from "@/data/threads";
import type { Customer } from "@/data/customers";
import { agents } from "@/data/agents";
import { cn } from "@/lib/utils";

export function ThreadView({
  messages,
  customer,
}: {
  messages: ThreadMessage[];
  customer: Customer;
}) {
  return (
    <div className="space-y-3">
      {messages.map((m, i) => {
        if (m.sender === "system") {
          return (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: i * 0.03 }}
              className="flex items-center justify-center gap-2 rounded-md border border-dashed border-[var(--border)] bg-[var(--bg)]/60 px-3 py-1.5 text-[11px] text-[var(--text-subtle)]"
            >
              <Sparkles className="h-3 w-3 text-[var(--accent)]" />
              <span className="font-mono">{m.body}</span>
              <span className="ml-auto font-mono text-[10.5px]">{m.timestamp}</span>
            </motion.div>
          );
        }
        const isCustomer = m.sender === "customer";
        const agentMatch = !isCustomer
          ? agents.find((a) => a.name === m.senderName)
          : null;

        return (
          <motion.article
            key={m.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.22, delay: i * 0.04 }}
            className={cn(
              "rounded-lg border bg-[var(--bg-elev)]",
              isCustomer ? "border-[var(--border)]" : "border-[#c7d2fe] bg-[var(--accent-soft)]/30",
            )}
          >
            <header className="flex items-center gap-2.5 border-b border-[var(--border)]/70 px-4 py-2.5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={isCustomer ? customer.avatar : agentMatch?.avatar ?? customer.avatar}
                alt=""
                className="h-7 w-7 rounded-full bg-[var(--bg)] ring-1 ring-[var(--border)]"
              />
              <div className="leading-tight">
                <div className="text-[13px] font-semibold text-[var(--text)]">{m.senderName}</div>
                <div className="text-[10.5px] text-[var(--text-subtle)]">
                  {isCustomer
                    ? `${customer.email} · ${customer.region}`
                    : `${agentMatch?.role ?? "L2"} · Acme Cloud Support`}
                </div>
              </div>
              <span
                className={cn(
                  "ml-auto rounded-full px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider",
                  isCustomer
                    ? "bg-[var(--bg)] text-[var(--text-mute)] ring-1 ring-inset ring-[var(--border)]"
                    : "bg-[var(--accent-soft)] text-[var(--accent-strong)] ring-1 ring-inset ring-[#c7d2fe]",
                )}
              >
                {isCustomer ? "Customer" : "Agent"}
              </span>
              <span className="font-mono text-[10.5px] text-[var(--text-subtle)]">{m.timestamp}</span>
            </header>
            <div className="whitespace-pre-wrap px-4 py-3 text-[13px] leading-[1.65] text-[var(--text)]">
              {m.body}
            </div>
          </motion.article>
        );
      })}
    </div>
  );
}
