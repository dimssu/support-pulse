export type Tone = "friendly" | "direct" | "apologetic";

export interface DraftReply {
  tone: Tone;
  label: string;
  body: string;
  estimatedReadMin: number;
}

export interface Citation {
  id: string;
  type: "kb" | "ticket";
  title: string;
  excerpt: string;
  href: string;
  meta: string;
}

export const draftsByTicket: Record<string, DraftReply[]> = {
  "t-1039": [
    {
      tone: "friendly",
      label: "Friendly",
      estimatedReadMin: 1,
      body: `Hi Maya — really sorry for the surprise charge on your Aug invoice.

I dug into the ledger: INV-88412 and INV-88419 came from the same provisioning event — a webhook retry briefly fired a duplicate. Your seat count is correct at 18 (not 24), so next month's billing will land at the expected $4,200, not double.

I've queued a refund of $4,200 against INV-88419 — it'll show in 3–5 business days under the original card. Sending an updated PDF that supersedes the duplicate, plus a credit memo for your records.

Anything else from your finance team and I'll get on it right away. Thanks for catching it.`,
    },
    {
      tone: "direct",
      label: "Direct",
      estimatedReadMin: 1,
      body: `Confirmed: INV-88412 and INV-88419 are duplicates from a webhook retry. Seat count is correct at 18.

Actions taken:
1. Refund of $4,200 issued against INV-88419 (3–5 business days, original card).
2. Credit memo CM-22118 attached.
3. Webhook retry rule for provisioning events tightened on our side.

Next month's bill will be the standard $4,200. Reply if you need supporting docs for finance.`,
    },
    {
      tone: "apologetic",
      label: "Apologetic",
      estimatedReadMin: 1,
      body: `Hi Maya — I'm really sorry this happened. A duplicate charge is exactly the kind of thing finance teams shouldn't have to chase, and I appreciate you flagging it quickly.

The root cause was a webhook retry on our provisioning service that fired a duplicate billing event. Your actual seat count is unchanged at 18 — only the invoice was duplicated.

I've fully refunded the $4,200 on INV-88419 (3–5 business days), and I'm sending a credit memo so your finance team has a clean paper trail. We've also patched the retry logic on our end so this can't recur.

If your team needs anything else — a call, a written postmortem — please tell me and we'll get it done.`,
    },
  ],
};

export const citationsByTicket: Record<string, Citation[]> = {
  "t-1039": [
    {
      id: "kb-101",
      type: "kb",
      title: "How duplicate charges occur and how we resolve them",
      excerpt: "Duplicate provisioning events most commonly occur when a webhook is retried after a transient 5xx. Refunds against the duplicate invoice are processed within 3–5 business days against the original payment method.",
      href: "#",
      meta: "KB · Billing · updated 6 days ago",
    },
    {
      id: "kb-204",
      type: "kb",
      title: "Issuing a refund or credit memo via the dashboard",
      excerpt: "Refunds can be issued line-by-line or against a full invoice. Credit memos are auto-generated for refunds over $1,000 and emailed to the billing contact.",
      href: "#",
      meta: "KB · Billing · updated 19 days ago",
    },
    {
      id: "kb-318",
      type: "kb",
      title: "Webhook retry behavior for provisioning events",
      excerpt: "Provisioning events use exponential backoff with a 24-hour ceiling. A known issue (RFC-1182) caused duplicate retries between Aug 2 and Aug 4 and was patched on Aug 5.",
      href: "#",
      meta: "KB · Engineering · updated 4 hours ago",
    },
    {
      id: "tk-892",
      type: "ticket",
      title: "T-892 · Northwind — duplicate seat charge in May",
      excerpt: "Same customer reported a duplicate seat charge in May. Resolved by refund + credit memo. No recurrence until now.",
      href: "#",
      meta: "Ticket · resolved · CSAT 5/5",
    },
    {
      id: "tk-741",
      type: "ticket",
      title: "T-741 · Acme Cloud — webhook retry duplicate",
      excerpt: "Different customer, same root cause class. Engineering patched in RFC-1182. Closed with apology + refund.",
      href: "#",
      meta: "Ticket · resolved · CSAT 4/5",
    },
  ],
};

export const getDrafts = (ticketId: string): DraftReply[] =>
  draftsByTicket[ticketId] ?? draftsByTicket["t-1039"];

export const getCitations = (ticketId: string): Citation[] =>
  citationsByTicket[ticketId] ?? citationsByTicket["t-1039"];
