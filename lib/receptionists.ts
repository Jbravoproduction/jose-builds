import fs from "node:fs";
import path from "node:path";

/** One AI receptionist demo made for a prospect. Added as data/receptionists/<slug>.json. */
export type Receptionist = {
  slug: string;
  business: string;
  trade: string;
  city: string;
  owner?: string;
  phone?: string;
  /** Name the AI uses for itself on the call. */
  receptionist: string;
  hours: string;
  services: string[];
  areas: string[];
  /** What it can say about price. Keep to real ranges or "free quote from a photo". */
  pricing: string;
  /** Anything else it should know (same-day, insured, payment types...). */
  notes: string;
  /** Example questions shown on the demo page. */
  tries?: string[];
  color: string;
  created: string;
};

const DIR = path.join(process.cwd(), "data", "receptionists");

export function allReceptionists(): Receptionist[] {
  if (!fs.existsSync(DIR)) return [];
  return fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith(".json"))
    .map((f) => JSON.parse(fs.readFileSync(path.join(DIR, f), "utf8")) as Receptionist);
}

export function getReceptionist(slug: string): Receptionist | undefined {
  return allReceptionists().find((r) => r.slug === slug);
}

/** Values injected into the shared demo agent's prompt for this business. */
export function dynamicVariables(r: Receptionist): Record<string, string> {
  return {
    business: r.business,
    trade: r.trade,
    city: r.city,
    owner: r.owner ?? "the owner",
    receptionist: r.receptionist,
    hours: r.hours,
    services: r.services.join("; "),
    areas: r.areas.join(", "),
    pricing: r.pricing,
    notes: r.notes,
  };
}
