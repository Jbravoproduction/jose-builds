export type Status = "working" | "ready" | "waiting" | "planned" | "offline";

export type Agent = { name: string; short: string; hub: HubId; status: Status; caption: string };

export type HubId = "leads" | "matching" | "customers" | "money" | "prospecting" | "outreach";

export const HUBS: { id: HubId; label: string; company: "FirstIn" | "Crescia"; color: string }[] = [
  { id: "leads", label: "LEADS", company: "FirstIn", color: "#fb923c" },
  { id: "matching", label: "MATCHING", company: "FirstIn", color: "#f87171" },
  { id: "customers", label: "CUSTOMERS", company: "FirstIn", color: "#a78bfa" },
  { id: "money", label: "MONEY", company: "FirstIn", color: "#2dd4bf" },
  { id: "prospecting", label: "PROSPECTING", company: "Crescia", color: "#fbbf24" },
  { id: "outreach", label: "OUTREACH", company: "Crescia", color: "#38bdf8" },
];


/** Demo snapshot of the agent system for the public site. */
export const DEMO_AGENTS: Agent[] = [
  { name: "Lead Responder", short: "Responder", hub: "leads", status: "working", caption: "Texts every new lead back in seconds with a reply, a price range and open times." },
  { name: "Missed-Call Catcher", short: "Missed Calls", hub: "leads", status: "ready", caption: "Texts callers right away when a call is missed." },
  { name: "Lead Email Reader", short: "Email Reader", hub: "leads", status: "working", caption: "Reads Thumbtack and Angi lead emails and starts the reply." },
  { name: "Photo Quoter", short: "Photo Quoter", hub: "leads", status: "ready", caption: "Estimates a price range from customer photos." },
  { name: "Smart Match", short: "Smart Match", hub: "matching", status: "working", caption: "Routes homeowner jobs to the right pros by ZIP code." },
  { name: "Review Requester", short: "Reviews", hub: "customers", status: "ready", caption: "Asks happy customers for Google reviews." },
  { name: "Fin", short: "Fin", hub: "customers", status: "ready", caption: "In-app assistant that answers users' questions." },
  { name: "Billing & Signups", short: "Billing", hub: "money", status: "working", caption: "Runs subscriptions, codes and partner payouts with Stripe." },
  { name: "Leaderboard Judge", short: "Leaderboard", hub: "money", status: "ready", caption: "Ranks top users monthly and hands out rewards." },
  { name: "Lead Finder", short: "Lead Finder", hub: "prospecting", status: "planned", caption: "Finds target businesses with their contact info." },
  { name: "Missed-Call Checker", short: "Call Checker", hub: "prospecting", status: "planned", caption: "Checks which businesses miss calls after hours." },
  { name: "Demo Builder", short: "Demo Builder", hub: "outreach", status: "planned", caption: "Builds a custom AI receptionist demo per business." },
  { name: "Email Writer", short: "Email Writer", hub: "outreach", status: "planned", caption: "Writes a personal outreach email for each business." },
  { name: "Reply Handler", short: "Replies", hub: "outreach", status: "planned", caption: "Sorts replies and books calls." },
];
