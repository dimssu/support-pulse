export type Plan = "Free" | "Pro" | "Business" | "Enterprise";

export interface Customer {
  id: string;
  name: string;
  email: string;
  avatar: string;
  company: string;
  plan: Plan;
  mrr: number;
  accountAgeDays: number;
  ticketCount: number;
  region: string;
}

const av = (seed: string) =>
  `https://api.dicebear.com/7.x/notionists-neutral/svg?seed=${encodeURIComponent(seed)}&backgroundColor=eef2ff,f0fdfa,fef3c7,fce7f3,e0e7ff`;

export const customers: Customer[] = [
  { id: "c1", name: "Maya Chen", email: "maya@northwind.io", avatar: av("Maya"), company: "Northwind Cloud", plan: "Enterprise", mrr: 8400, accountAgeDays: 612, ticketCount: 47, region: "US-West" },
  { id: "c2", name: "Daniel Reyes", email: "d.reyes@figbase.app", avatar: av("Daniel"), company: "Figbase", plan: "Business", mrr: 1290, accountAgeDays: 198, ticketCount: 12, region: "EU" },
  { id: "c3", name: "Priya Iyer", email: "priya@helixlabs.dev", avatar: av("Priya"), company: "Helix Labs", plan: "Pro", mrr: 320, accountAgeDays: 84, ticketCount: 6, region: "APAC" },
  { id: "c4", name: "Tomás Alvaro", email: "tomas@quanto.mx", avatar: av("Tomas"), company: "Quanto Pay", plan: "Enterprise", mrr: 12800, accountAgeDays: 891, ticketCount: 63, region: "LATAM" },
  { id: "c5", name: "Hana Suzuki", email: "hana@kineticfm.jp", avatar: av("Hana"), company: "Kinetic FM", plan: "Business", mrr: 940, accountAgeDays: 142, ticketCount: 9, region: "APAC" },
  { id: "c6", name: "Olu Adesanya", email: "olu@flatridge.co", avatar: av("Olu"), company: "Flatridge", plan: "Pro", mrr: 280, accountAgeDays: 51, ticketCount: 3, region: "EU" },
  { id: "c7", name: "Greta Linde", email: "greta@piperooms.de", avatar: av("Greta"), company: "Piperooms", plan: "Pro", mrr: 240, accountAgeDays: 122, ticketCount: 11, region: "EU" },
  { id: "c8", name: "Noah Kettering", email: "noah@stagebridge.io", avatar: av("Noah"), company: "Stagebridge", plan: "Free", mrr: 0, accountAgeDays: 22, ticketCount: 2, region: "US-East" },
  { id: "c9", name: "Aiyana Whitehorse", email: "aiyana@brightwatt.energy", avatar: av("Aiyana"), company: "Brightwatt", plan: "Enterprise", mrr: 6200, accountAgeDays: 410, ticketCount: 38, region: "US-West" },
  { id: "c10", name: "Lukas Berghoff", email: "lukas@kerntech.de", avatar: av("Lukas"), company: "Kerntech", plan: "Business", mrr: 1640, accountAgeDays: 305, ticketCount: 21, region: "EU" },
  { id: "c11", name: "Saanvi Rao", email: "saanvi@mintroute.in", avatar: av("Saanvi"), company: "Mintroute", plan: "Pro", mrr: 360, accountAgeDays: 73, ticketCount: 5, region: "APAC" },
  { id: "c12", name: "Marco Bellini", email: "marco@oryxgrid.it", avatar: av("Marco"), company: "Oryx Grid", plan: "Enterprise", mrr: 9450, accountAgeDays: 712, ticketCount: 54, region: "EU" },
  { id: "c13", name: "Esme Caldwell", email: "esme@palindrome.fm", avatar: av("Esme"), company: "Palindrome", plan: "Pro", mrr: 410, accountAgeDays: 161, ticketCount: 14, region: "US-East" },
  { id: "c14", name: "Yusuf Ozdemir", email: "yusuf@kavakroad.app", avatar: av("Yusuf"), company: "Kavakroad", plan: "Business", mrr: 1180, accountAgeDays: 244, ticketCount: 18, region: "EU" },
  { id: "c15", name: "Naledi Khoza", email: "naledi@jubaclick.za", avatar: av("Naledi"), company: "Jubaclick", plan: "Pro", mrr: 290, accountAgeDays: 48, ticketCount: 4, region: "EMEA" },
  { id: "c16", name: "Felix Hartmann", email: "felix@orbital-supply.co", avatar: av("Felix"), company: "Orbital Supply", plan: "Free", mrr: 0, accountAgeDays: 11, ticketCount: 1, region: "US-East" },
  { id: "c17", name: "Camille Roux", email: "camille@fableship.fr", avatar: av("Camille"), company: "Fableship", plan: "Business", mrr: 880, accountAgeDays: 188, ticketCount: 13, region: "EU" },
  { id: "c18", name: "Kenji Mori", email: "kenji@drylane.io", avatar: av("Kenji"), company: "Drylane", plan: "Enterprise", mrr: 7700, accountAgeDays: 522, ticketCount: 41, region: "APAC" },
  { id: "c19", name: "Sasha Petrova", email: "sasha@plinthhq.com", avatar: av("Sasha"), company: "Plinth HQ", plan: "Pro", mrr: 380, accountAgeDays: 96, ticketCount: 7, region: "EU" },
  { id: "c20", name: "Bryn Williams", email: "bryn@hollowoak.co.uk", avatar: av("Bryn"), company: "Hollow Oak", plan: "Business", mrr: 1320, accountAgeDays: 277, ticketCount: 16, region: "EU" },
  { id: "c21", name: "Theo Ainsworth", email: "theo@bracketlabs.dev", avatar: av("Theo"), company: "Bracket Labs", plan: "Pro", mrr: 350, accountAgeDays: 102, ticketCount: 8, region: "US-West" },
  { id: "c22", name: "Imani Okafor", email: "imani@sablebay.org", avatar: av("Imani"), company: "Sablebay", plan: "Enterprise", mrr: 11200, accountAgeDays: 845, ticketCount: 59, region: "EMEA" },
  { id: "c23", name: "Leah Brennan", email: "leah@mintbrook.io", avatar: av("Leah"), company: "Mintbrook", plan: "Free", mrr: 0, accountAgeDays: 7, ticketCount: 1, region: "US-East" },
  { id: "c24", name: "Akira Tanaka", email: "akira@vellumstack.jp", avatar: av("Akira"), company: "Vellumstack", plan: "Business", mrr: 1530, accountAgeDays: 332, ticketCount: 22, region: "APAC" },
  { id: "c25", name: "Rivka Stein", email: "rivka@argonglass.co", avatar: av("Rivka"), company: "Argon Glass", plan: "Pro", mrr: 420, accountAgeDays: 117, ticketCount: 9, region: "US-East" },
  { id: "c26", name: "Adriana Costa", email: "adriana@vorant.br", avatar: av("Adriana"), company: "Vorant", plan: "Business", mrr: 1010, accountAgeDays: 213, ticketCount: 15, region: "LATAM" },
];

export const getCustomer = (id: string) =>
  customers.find((c) => c.id === id) ?? customers[0];
