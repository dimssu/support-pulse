"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Inbox,
  Clock,
  MoonStar,
  CheckCircle2,
  Users,
  Search,
  Command,
  Activity,
  Settings,
  Bell,
  BarChart3,
  LifeBuoy,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { tickets } from "@/data/tickets";
import { agents } from "@/data/agents";

const queueGroups = [
  {
    label: "Inbox",
    items: [
      { id: "open", label: "Open", icon: Inbox, href: "/", count: 28 },
      { id: "awaiting", label: "Awaiting customer", icon: Clock, href: "/", count: 8 },
      { id: "snoozed", label: "Snoozed", icon: MoonStar, href: "/", count: 4 },
      { id: "closed", label: "Closed", icon: CheckCircle2, href: "/", count: 142 },
    ],
  },
  {
    label: "Team queues",
    items: [
      { id: "billing", label: "Billing", icon: BarChart3, href: "/", count: 6 },
      { id: "platform", label: "Platform", icon: Activity, href: "/", count: 11 },
      { id: "onboarding", label: "Onboarding", icon: LifeBuoy, href: "/", count: 5 },
      { id: "churn", label: "Churn risk", icon: Sparkles, href: "/", count: 3 },
    ],
  },
];

export function Shell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const fireCount = tickets.filter((t) => t.lane === "fire").length;
  const me = agents[0];

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[var(--bg)] text-[var(--text)]">
      {/* Sidebar */}
      <aside className="hidden lg:flex w-60 shrink-0 flex-col border-r border-[var(--border)] bg-[var(--bg-elev)]">
        <div className="flex h-14 items-center gap-2 border-b border-[var(--border)] px-4">
          <div className="relative h-7 w-7 rounded-[8px] bg-[var(--accent)] flex items-center justify-center">
            <Activity className="h-4 w-4 text-white" strokeWidth={2.5} />
            <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-emerald-400 ring-2 ring-[var(--bg-elev)] pulse-dot" />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="font-display text-[15px] font-semibold tracking-tight">
              Support Pulse
            </span>
            <span className="text-[11px] text-[var(--text-subtle)]">
              Acme Cloud · 4 teams
            </span>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4 scrollbar-thin">
          {queueGroups.map((group) => (
            <div key={group.label} className="mb-5">
              <div className="px-2 pb-1.5 text-[10px] font-semibold uppercase tracking-wider text-[var(--text-subtle)]">
                {group.label}
              </div>
              <div className="space-y-0.5">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = item.id === "open" && pathname === "/";
                  return (
                    <Link
                      key={item.id}
                      href={item.href}
                      className={cn(
                        "group flex items-center justify-between rounded-md px-2 py-1.5 text-[13px] transition-colors",
                        isActive
                          ? "bg-[var(--accent-soft)] text-[var(--accent-strong)]"
                          : "text-[var(--text-mute)] hover:bg-[var(--bg)] hover:text-[var(--text)]",
                      )}
                    >
                      <span className="flex items-center gap-2">
                        <Icon
                          className={cn(
                            "h-3.5 w-3.5",
                            isActive ? "text-[var(--accent-strong)]" : "text-[var(--text-subtle)]",
                          )}
                        />
                        {item.label}
                      </span>
                      <span
                        className={cn(
                          "text-[11px] font-medium tabular-nums",
                          isActive ? "text-[var(--accent-strong)]" : "text-[var(--text-subtle)]",
                        )}
                      >
                        {item.count}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}

          <div className="mb-3">
            <div className="px-2 pb-1.5 text-[10px] font-semibold uppercase tracking-wider text-[var(--text-subtle)]">
              Workspace
            </div>
            <Link
              href="/team"
              className={cn(
                "flex items-center justify-between rounded-md px-2 py-1.5 text-[13px] transition-colors",
                pathname === "/team"
                  ? "bg-[var(--accent-soft)] text-[var(--accent-strong)]"
                  : "text-[var(--text-mute)] hover:bg-[var(--bg)] hover:text-[var(--text)]",
              )}
            >
              <span className="flex items-center gap-2">
                <Users
                  className={cn(
                    "h-3.5 w-3.5",
                    pathname === "/team" ? "text-[var(--accent-strong)]" : "text-[var(--text-subtle)]",
                  )}
                />
                Team scorecard
              </span>
              <span className="text-[11px] text-[var(--text-subtle)]">8</span>
            </Link>
          </div>
        </nav>

        <div className="border-t border-[var(--border)] p-3">
          <div className="rounded-lg border border-[var(--border)] bg-[var(--bg)] p-3">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--lane-fire)] pulse-dot" />
              <span className="text-[11px] font-semibold text-[var(--text)]">
                {fireCount} Fire-lane open
              </span>
            </div>
            <p className="mt-1 text-[11px] leading-snug text-[var(--text-mute)]">
              Auto-routing to Lead on-call · escalation in 18 min
            </p>
          </div>
        </div>
      </aside>

      {/* Main column */}
      <div className="flex flex-1 flex-col min-w-0">
        {/* Top bar */}
        <header className="flex h-14 shrink-0 items-center gap-3 border-b border-[var(--border)] bg-[var(--bg-elev)] px-4 lg:px-6">
          <div className="flex items-center gap-2 text-[13px] text-[var(--text-mute)]">
            <Link
              href="/"
              className={cn(
                "rounded-md px-2 py-1 transition-colors",
                pathname === "/" && "text-[var(--text)] font-medium",
              )}
            >
              Triage
            </Link>
            <span className="text-[var(--border-strong)]">/</span>
            <span className="text-[var(--text)]">
              {pathname === "/" && "Live inbox"}
              {pathname.startsWith("/ticket") && "Ticket"}
              {pathname === "/team" && "Team scorecard"}
            </span>
          </div>

          <div className="ml-4 hidden flex-1 max-w-md md:flex">
            <div className="flex w-full items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--bg)] px-3 py-1.5 text-[13px] text-[var(--text-subtle)]">
              <Search className="h-3.5 w-3.5" />
              <span>Search tickets, customers, KB articles</span>
              <span className="ml-auto flex items-center gap-0.5 rounded border border-[var(--border)] bg-[var(--bg-elev)] px-1.5 py-0.5 font-mono text-[10px]">
                <Command className="h-2.5 w-2.5" />K
              </span>
            </div>
          </div>

          <div className="ml-auto flex items-center gap-2">
            <button className="hidden md:flex items-center gap-1.5 rounded-md border border-[var(--border)] bg-[var(--bg-elev)] px-2.5 py-1.5 text-[12px] text-[var(--text-mute)] hover:bg-[var(--bg)]">
              <Sparkles className="h-3.5 w-3.5 text-[var(--accent)]" />
              Triage now
            </button>
            <button className="flex h-8 w-8 items-center justify-center rounded-md text-[var(--text-mute)] hover:bg-[var(--bg)]">
              <Bell className="h-4 w-4" />
            </button>
            <button className="flex h-8 w-8 items-center justify-center rounded-md text-[var(--text-mute)] hover:bg-[var(--bg)]">
              <Settings className="h-4 w-4" />
            </button>
            <div className="ml-1 flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--bg-elev)] py-1 pl-1 pr-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={me.avatar}
                alt={me.name}
                className="h-6 w-6 rounded-full bg-[var(--bg)]"
              />
              <span className="text-[12px] font-medium leading-none">{me.name.split(" ")[0]}</span>
              <span className="rounded bg-[var(--accent-soft)] px-1.5 py-0.5 text-[10px] font-medium text-[var(--accent-strong)]">
                {me.role}
              </span>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-hidden bg-[var(--bg)]">{children}</main>
      </div>
    </div>
  );
}
