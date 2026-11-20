import fs from "node:fs";
import path from "node:path";

/** One free concept site made for a prospect. Added by the $1,000 Mission agents as data/demos/<slug>.json. */
export type Demo = {
  slug: string;
  business: string;
  trade: string;
  city: string;
  phone?: string;
  tagline: string;
  intro: string;
  services: { name: string; text: string }[];
  why: string[];
  areas: string[];
  color: string;
  created: string;
};

const DIR = path.join(process.cwd(), "data", "demos");

export function allDemos(): Demo[] {
  if (!fs.existsSync(DIR)) return [];
  return fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith(".json"))
    .map((f) => JSON.parse(fs.readFileSync(path.join(DIR, f), "utf8")) as Demo);
}

export function getDemo(slug: string): Demo | undefined {
  return allDemos().find((d) => d.slug === slug);
}
