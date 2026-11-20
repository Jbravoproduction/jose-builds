"use client";

import { useState } from "react";

const TYPES = ["Website", "Web app", "Mobile app", "AI agent or automation", "Not sure yet"];
const FEATURES = ["Logins and accounts", "Payments", "Booking", "Texting", "AI chat or agents", "Dashboard"];
const BUDGETS = ["Under $3K", "$3K – $8K", "$8K – $15K", "$15K+"];

const field = "min-h-12 w-full rounded-xl border border-edge bg-void/70 px-4 text-ink outline-none focus:border-claude";

/** Project request: opens the visitor's email app with every answer filled in. */
export default function ProjectForm({ email }: { email: string }) {
  const [sent, setSent] = useState(false);

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const lines = [
      `Name: ${f.get("name")}`,
      `Email: ${f.get("email")}`,
      `Phone: ${f.get("phone") || "-"}`,
      `Business: ${f.get("business")}`,
      `Wants: ${f.get("type")}`,
      `Features: ${f.getAll("features").join(", ") || "-"}`,
      `Problem it solves: ${f.get("problem")}`,
      `Examples: ${f.get("examples") || "-"}`,
      `Timeline: ${f.get("timeline") || "-"}`,
      `Budget: ${f.get("budget")}`,
    ];
    const subject = `App project: ${f.get("business")}`;
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`;
    setSent(true);
  }

  return (
    <form onSubmit={submit} className="grid gap-3 sm:grid-cols-2">
      <input name="name" required placeholder="Your name" className={field} />
      <input name="email" type="email" required placeholder="Email" className={field} />
      <input name="phone" type="tel" placeholder="Phone (optional)" className={field} />
      <input name="business" required placeholder="Your business" className={field} />
      <select name="type" required defaultValue="" className={`${field} sm:col-span-2`}>
        <option value="" disabled>What do you want built?</option>
        {TYPES.map((t) => <option key={t}>{t}</option>)}
      </select>
      <fieldset className="flex flex-wrap gap-2 sm:col-span-2">
        <legend className="mb-2 text-sm text-dim">Must-have features</legend>
        {FEATURES.map((ft) => (
          <label key={ft} className="flex cursor-pointer items-center gap-2 rounded-full border border-edge px-3 py-1.5 text-sm has-[:checked]:border-claude has-[:checked]:text-claude">
            <input type="checkbox" name="features" value={ft} className="sr-only" />
            {ft}
          </label>
        ))}
      </fieldset>
      <textarea name="problem" required rows={3} placeholder="What problem should it solve, and who will use it?" className={`${field} py-3 sm:col-span-2`} />
      <input name="examples" placeholder="Apps or sites you like (links)" className={`${field} sm:col-span-2`} />
      <input name="timeline" placeholder="When do you need it?" className={field} />
      <select name="budget" required defaultValue="" className={field}>
        <option value="" disabled>Budget</option>
        {BUDGETS.map((b) => <option key={b}>{b}</option>)}
      </select>
      <button className="min-h-12 rounded-full bg-claude font-semibold text-void sm:col-span-2">Send project request</button>
      {sent && <p className="text-sm text-dim sm:col-span-2">Your email app should open with everything filled in. Hit send and I&apos;ll reply within a day.</p>}
    </form>
  );
}
