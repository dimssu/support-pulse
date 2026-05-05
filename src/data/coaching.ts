export type CoachingType = "slow-response" | "missed-signal" | "escalation-pattern" | "tone" | "knowledge-gap";

export interface CoachingMoment {
  id: string;
  agentId: string;
  ticketId: string;
  type: CoachingType;
  label: string;
  detail: string;
  ticketSubject: string;
  customerName: string;
  customerCompany: string;
  flaggedAtMinutesAgo: number;
  severity: "low" | "med" | "high";
  suggestion: string;
}

export const coachingMoments: CoachingMoment[] = [
  {
    id: "cm-1",
    agentId: "a8",
    ticketId: "t-1028",
    type: "slow-response",
    label: "First response 3.5h above target",
    detail: "Two-factor auth bug on a Pro account sat in the queue for 3h 32m before first response. Median for this lane is 12m.",
    ticketSubject: "Two-factor auth: backup codes not regenerating",
    customerName: "Saanvi Rao",
    customerCompany: "Mintroute",
    flaggedAtMinutesAgo: 28,
    severity: "high",
    suggestion: "Saoirse — try filtering your queue by lane=normal and SLA<2h before working low-priority items.",
  },
  {
    id: "cm-2",
    agentId: "a8",
    ticketId: "t-1041",
    type: "missed-signal",
    label: "Missed Sev1 signal in initial classification",
    detail: "Customer wrote 'site is down' and 'sustained 502s' — auto-tagger surfaced as Fire, but agent re-classified to Normal before re-escalation.",
    ticketSubject: "5xx errors on /v2/jobs since 09:14 UTC — site is down",
    customerName: "Marco Bellini",
    customerCompany: "Oryx Grid",
    flaggedAtMinutesAgo: 11,
    severity: "high",
    suggestion: "Trust the Fire classifier when confidence > 0.9 and escalate first, investigate second.",
  },
  {
    id: "cm-3",
    agentId: "a8",
    ticketId: "t-1040",
    type: "escalation-pattern",
    label: "Churn signal not flagged to Lead",
    detail: "Enterprise customer ($11.2k MRR) mentioned 'switching to a competitor' in the first message. Conversation went 4 turns before Lead was looped in.",
    ticketSubject: "Cancel: switching to competitor (with feedback)",
    customerName: "Imani Okafor",
    customerCompany: "Sablebay",
    flaggedAtMinutesAgo: 22,
    severity: "high",
    suggestion: "Any churn keyword from an Enterprise account should auto-loop the Lead in turn 1.",
  },
  {
    id: "cm-4",
    agentId: "a8",
    ticketId: "t-1036",
    type: "knowledge-gap",
    label: "Used outdated rate-limit numbers",
    detail: "Quoted 100rps from a deprecated docs page. Customer is contractually entitled to 200rps burst. Caused a second escalation message.",
    ticketSubject: "Rate limited at 10rps but our plan says 200rps",
    customerName: "Kenji Mori",
    customerCompany: "Drylane",
    flaggedAtMinutesAgo: 78,
    severity: "med",
    suggestion: "Always cross-check rate limits against the contract addendum, not the public pricing page.",
  },
  {
    id: "cm-5",
    agentId: "a8",
    ticketId: "t-1023",
    type: "tone",
    label: "Tone flagged as too direct for a friendly inbound",
    detail: "Customer sent a casual typo report; reply landed clinical. Sentiment delta from inbound to outbound dropped 0.42.",
    ticketSubject: "Typo on the pricing page",
    customerName: "Naledi Khoza",
    customerCompany: "Jubaclick",
    flaggedAtMinutesAgo: 348,
    severity: "low",
    suggestion: "For praise/typo/feedback inbound, mirror the customer's tone — keep it warm.",
  },
];
