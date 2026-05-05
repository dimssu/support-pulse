export type AgentRole = "L1" | "L2" | "Lead";

export interface Agent {
  id: string;
  name: string;
  avatar: string;
  role: AgentRole;
  tenureMonths: number;
  csat: number;
  queueCount: number;
  team: "Billing" | "Platform" | "Onboarding" | "Churn";
}

const av = (seed: string) =>
  `https://api.dicebear.com/7.x/notionists-neutral/svg?seed=${encodeURIComponent(seed)}&backgroundColor=fee2e2,fef3c7,dbeafe,dcfce7,ede9fe,fce7f3`;

export const agents: Agent[] = [
  { id: "a1", name: "Wren Halverson", avatar: av("Wren"), role: "Lead", tenureMonths: 38, csat: 96, queueCount: 9, team: "Platform" },
  { id: "a2", name: "Devon Park", avatar: av("Devon"), role: "L2", tenureMonths: 22, csat: 93, queueCount: 14, team: "Platform" },
  { id: "a3", name: "Mira Lindqvist", avatar: av("Mira"), role: "L2", tenureMonths: 19, csat: 91, queueCount: 11, team: "Billing" },
  { id: "a4", name: "Jules Otieno", avatar: av("Jules"), role: "L1", tenureMonths: 8, csat: 88, queueCount: 17, team: "Onboarding" },
  { id: "a5", name: "Niko Vasquez", avatar: av("Niko"), role: "L1", tenureMonths: 5, csat: 84, queueCount: 22, team: "Onboarding" },
  { id: "a6", name: "Anya Pereira", avatar: av("Anya"), role: "Lead", tenureMonths: 44, csat: 95, queueCount: 6, team: "Churn" },
  { id: "a7", name: "Caleb Wu", avatar: av("Caleb"), role: "L2", tenureMonths: 14, csat: 90, queueCount: 13, team: "Billing" },
  { id: "a8", name: "Saoirse Doyle", avatar: av("Saoirse"), role: "L1", tenureMonths: 3, csat: 79, queueCount: 19, team: "Platform" },
];

export interface AgentMetrics {
  agentId: string;
  avgFirstResponseMin: number;
  avgResolutionHours: number;
  csat: number;
  ticketVolume: number;
  escalationRate: number; // percent
  // 12-week trend (3 series): firstResponse(min), resolution(hours), csat(0-100)
  trend: {
    week: string;
    firstResponse: number;
    resolution: number;
    csat: number;
  }[];
}

const baseWeeks = [
  "W-12","W-11","W-10","W-9","W-8","W-7","W-6","W-5","W-4","W-3","W-2","W-1",
];

function makeTrend(seed: number): AgentMetrics["trend"] {
  return baseWeeks.map((w, i) => {
    const wave = Math.sin((i + seed) * 0.7) * 4;
    return {
      week: w,
      firstResponse: Math.max(4, Math.round(14 + wave + (seed % 5))),
      resolution: +(6.5 + Math.cos((i + seed) * 0.5) * 1.6 + (seed % 3) * 0.3).toFixed(1),
      csat: Math.min(99, Math.round(86 + Math.sin((i + seed) * 0.4) * 5 + (seed % 4))),
    };
  });
}

export const agentMetrics: Record<string, AgentMetrics> = {
  a1: { agentId: "a1", avgFirstResponseMin: 6, avgResolutionHours: 4.2, csat: 96, ticketVolume: 184, escalationRate: 4.1, trend: makeTrend(1) },
  a2: { agentId: "a2", avgFirstResponseMin: 9, avgResolutionHours: 5.6, csat: 93, ticketVolume: 221, escalationRate: 6.3, trend: makeTrend(2) },
  a3: { agentId: "a3", avgFirstResponseMin: 11, avgResolutionHours: 6.8, csat: 91, ticketVolume: 198, escalationRate: 5.9, trend: makeTrend(3) },
  a4: { agentId: "a4", avgFirstResponseMin: 14, avgResolutionHours: 7.4, csat: 88, ticketVolume: 247, escalationRate: 9.2, trend: makeTrend(4) },
  a5: { agentId: "a5", avgFirstResponseMin: 18, avgResolutionHours: 9.1, csat: 84, ticketVolume: 268, escalationRate: 12.4, trend: makeTrend(5) },
  a6: { agentId: "a6", avgFirstResponseMin: 7, avgResolutionHours: 4.8, csat: 95, ticketVolume: 142, escalationRate: 3.8, trend: makeTrend(6) },
  a7: { agentId: "a7", avgFirstResponseMin: 10, avgResolutionHours: 6.1, csat: 90, ticketVolume: 211, escalationRate: 6.7, trend: makeTrend(7) },
  a8: { agentId: "a8", avgFirstResponseMin: 22, avgResolutionHours: 11.3, csat: 79, ticketVolume: 289, escalationRate: 14.6, trend: makeTrend(8) },
};

export const getAgent = (id: string) => agents.find((a) => a.id === id) ?? agents[0];
