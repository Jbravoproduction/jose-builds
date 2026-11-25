import fs from "node:fs";
import path from "node:path";

/** One med spa demo front desk made by Crescia for a prospect. Added as data/spas/<slug>.json. Public facts only. */
export type Spa = {
  slug: string;
  business: string;
  city: string;
  /** Lead provider or owner, only if clearly stated on their own pages. */
  owner?: string;
  /** Name the AI uses for itself on the call. */
  receptionist: string;
  hours: string;
  treatments: string[];
  /** Only their real published prices; otherwise a "pricing at consultation" line. */
  pricing: string;
  notes: string;
  /** Example questions shown on the page. */
  tries?: string[];
  color: string;
  created: string;
};

const DIR = path.join(process.cwd(), "data", "spas");

export function allSpas(): Spa[] {
  if (!fs.existsSync(DIR)) return [];
  return fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith(".json"))
    .map((f) => JSON.parse(fs.readFileSync(path.join(DIR, f), "utf8")) as Spa);
}

export function getSpa(slug: string): Spa | undefined {
  return allSpas().find((s) => s.slug === slug);
}

export function spaVariables(s: Spa): Record<string, string> {
  return {
    business: s.business,
    city: s.city,
    owner: s.owner ?? "our provider",
    receptionist: s.receptionist,
    hours: s.hours,
    services: s.treatments.join("; "),
    pricing: s.pricing,
    notes: s.notes,
  };
}
