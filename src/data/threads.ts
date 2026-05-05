export type SenderRole = "customer" | "agent" | "system";

export interface ThreadMessage {
  id: string;
  threadId: string;
  sender: SenderRole;
  senderName: string;
  senderAvatar?: string;
  timestamp: string; // ISO-ish display string
  minutesAgo: number;
  body: string;
  attachments?: { name: string; size: string }[];
}

export const threads: Record<string, ThreadMessage[]> = {
  "th-1039": [
    {
      id: "m1",
      threadId: "th-1039",
      sender: "customer",
      senderName: "Maya Chen",
      timestamp: "Aug 3, 14:02",
      minutesAgo: 38,
      body: "Hey — we just noticed two charges of $4,200 on Aug 3 for what should have been a single seat upgrade. Invoices INV-88412 and INV-88419 reference the same line item (12 → 18 seats on the Enterprise plan).\n\nFinance flagged it this morning. Could you take a look and process a refund for the duplicate? Account is acct_northwind_01.",
    },
    {
      id: "m2",
      threadId: "th-1039",
      sender: "system",
      senderName: "Support Pulse",
      timestamp: "Aug 3, 14:02",
      minutesAgo: 38,
      body: "Triaged to Billing queue · classified as 'Duplicate charge' · prior tickets from this customer found: 3 (T-892, T-741, T-688) · KB matches: 2",
    },
    {
      id: "m3",
      threadId: "th-1039",
      sender: "agent",
      senderName: "Mira Lindqvist",
      timestamp: "Aug 3, 14:18",
      minutesAgo: 22,
      body: "Hi Maya — thanks for flagging. I can see both INV-88412 (14:01:33 UTC) and INV-88419 (14:01:51 UTC) in our ledger. Looks like a webhook retry kicked off a duplicate provisioning event. Pulling the full audit trail and getting a refund queued — back to you in a few.",
    },
    {
      id: "m4",
      threadId: "th-1039",
      sender: "customer",
      senderName: "Maya Chen",
      timestamp: "Aug 3, 14:24",
      minutesAgo: 16,
      body: "Thanks Mira. One thing — can you also confirm whether seat counts on our side were doubled? We don't want to be double-billed next month either.",
    },
  ],
  "th-1042": [
    {
      id: "m1",
      threadId: "th-1042",
      sender: "customer",
      senderName: "Tomás Alvaro",
      timestamp: "today, 09:18",
      minutesAgo: 47,
      body: "Production webhooks for charge.succeeded and payout.created have been silent for 47 minutes. Queue at 2.1k events. Status page is green but we're definitely not receiving anything. Account acct_x4f9a.",
    },
  ],
};

export const getThread = (id: string): ThreadMessage[] => threads[id] ?? [];
