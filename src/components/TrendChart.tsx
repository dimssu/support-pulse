"use client";

import { useState } from "react";
import type { AgentMetrics } from "@/data/agents";

type Series = "firstResponse" | "resolution" | "csat";

const seriesMeta: Record<Series, { label: string; color: string; unit: string; scale: (v: number) => number }> = {
  firstResponse: { label: "First response (min)", color: "#6366f1", unit: "min", scale: (v) => v }, // 4-22
  resolution: { label: "Resolution (hours)", color: "#0ea5e9", unit: "h", scale: (v) => v * 2 }, // ~6-12 -> 12-24
  csat: { label: "CSAT", color: "#10b981", unit: "%", scale: (v) => v - 70 }, // 79-99 -> 9-29
};

export function TrendChart({ metrics }: { metrics: AgentMetrics }) {
  const [hovered, setHovered] = useState<number | null>(null);
  const [hidden, setHidden] = useState<Record<Series, boolean>>({ firstResponse: false, resolution: false, csat: false });

  const W = 720;
  const H = 220;
  const PAD = { top: 16, right: 16, bottom: 28, left: 36 };
  const innerW = W - PAD.left - PAD.right;
  const innerH = H - PAD.top - PAD.bottom;

  const xs = metrics.trend.map((_, i) => PAD.left + (i / (metrics.trend.length - 1)) * innerW);

  // Normalize each series independently to its own min/max for visibility
  function buildPath(values: number[]) {
    const min = Math.min(...values);
    const max = Math.max(...values);
    const range = max - min || 1;
    const points = values.map((v, i) => {
      const y = PAD.top + innerH - ((v - min) / range) * innerH;
      return [xs[i], y] as const;
    });
    const d = points
      .map((p, i) => (i === 0 ? `M ${p[0]} ${p[1]}` : `L ${p[0]} ${p[1]}`))
      .join(" ");
    return { d, points };
  }

  const paths: Record<Series, ReturnType<typeof buildPath>> = {
    firstResponse: buildPath(metrics.trend.map((t) => t.firstResponse)),
    resolution: buildPath(metrics.trend.map((t) => t.resolution)),
    csat: buildPath(metrics.trend.map((t) => t.csat)),
  };

  return (
    <div className="rounded-lg border border-[var(--border)] bg-[var(--bg-elev)]">
      <div className="flex items-center gap-2 border-b border-[var(--border)] px-4 py-2.5">
        <div className="text-[13px] font-semibold">12-week trend</div>
        <div className="ml-auto flex items-center gap-2">
          {(Object.keys(seriesMeta) as Series[]).map((s) => (
            <button
              key={s}
              onClick={() => setHidden((h) => ({ ...h, [s]: !h[s] }))}
              className="flex items-center gap-1.5 rounded-md px-1.5 py-0.5 text-[11px] hover:bg-[var(--bg)]"
              style={{ opacity: hidden[s] ? 0.4 : 1 }}
            >
              <span className="h-2 w-2 rounded-full" style={{ backgroundColor: seriesMeta[s].color }} />
              <span className="text-[var(--text-mute)]">{seriesMeta[s].label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="p-3">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-[220px]">
          {/* horizontal grid */}
          {[0, 0.25, 0.5, 0.75, 1].map((g) => {
            const y = PAD.top + innerH * g;
            return (
              <line
                key={g}
                x1={PAD.left}
                x2={W - PAD.right}
                y1={y}
                y2={y}
                stroke="#e7e5e4"
                strokeDasharray="2 4"
              />
            );
          })}
          {/* x-axis labels */}
          {metrics.trend.map((t, i) =>
            i % 2 === 0 ? (
              <text
                key={t.week}
                x={xs[i]}
                y={H - PAD.bottom + 16}
                textAnchor="middle"
                className="fill-[#78716c]"
                style={{ fontSize: 10, fontFamily: "var(--font-jetbrains-mono)" }}
              >
                {t.week}
              </text>
            ) : null,
          )}

          {/* lines */}
          {(Object.keys(seriesMeta) as Series[]).map((s) =>
            hidden[s] ? null : (
              <g key={s}>
                <path
                  d={paths[s].d}
                  fill="none"
                  stroke={seriesMeta[s].color}
                  strokeWidth={1.75}
                  strokeLinejoin="round"
                  strokeLinecap="round"
                />
                {paths[s].points.map(([x, y], i) => (
                  <circle
                    key={i}
                    cx={x}
                    cy={y}
                    r={hovered === i ? 3.5 : 2}
                    fill={seriesMeta[s].color}
                    stroke="#fff"
                    strokeWidth={1}
                  />
                ))}
              </g>
            ),
          )}

          {/* hover overlay */}
          {metrics.trend.map((t, i) => (
            <rect
              key={i}
              x={xs[i] - innerW / metrics.trend.length / 2}
              y={PAD.top}
              width={innerW / metrics.trend.length}
              height={innerH}
              fill="transparent"
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            />
          ))}

          {hovered !== null && (
            <g>
              <line
                x1={xs[hovered]}
                x2={xs[hovered]}
                y1={PAD.top}
                y2={H - PAD.bottom}
                stroke="#a8a29e"
                strokeDasharray="3 3"
              />
            </g>
          )}
        </svg>

        {/* readout */}
        <div className="mt-2 grid grid-cols-3 gap-2">
          {(Object.keys(seriesMeta) as Series[]).map((s) => {
            const value = metrics.trend[hovered ?? metrics.trend.length - 1][s];
            return (
              <div
                key={s}
                className="rounded-md border border-[var(--border)] bg-[var(--bg)] px-2.5 py-1.5"
              >
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full" style={{ backgroundColor: seriesMeta[s].color }} />
                  <span className="text-[10.5px] uppercase tracking-wider text-[var(--text-subtle)] font-semibold">
                    {seriesMeta[s].label}
                  </span>
                </div>
                <div className="mt-0.5 flex items-baseline gap-1">
                  <span className="font-display text-[16px] font-semibold tabular-nums">{value}</span>
                  <span className="text-[11px] text-[var(--text-subtle)]">{seriesMeta[s].unit}</span>
                  <span className="ml-auto font-mono text-[10.5px] text-[var(--text-subtle)]">
                    {hovered !== null ? metrics.trend[hovered].week : "W-1"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
