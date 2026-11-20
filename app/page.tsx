import Network from "@/components/network";
import ProjectForm from "@/components/project-form";
import { DEMO_AGENTS } from "@/lib/agents";
import { CONTACT_EMAIL } from "@/lib/site";

const FIRSTIN_BUILT = [
  "AI that texts every new lead back in seconds",
  "Reads Thumbtack and Angi lead emails automatically",
  "Photo quotes using AI vision",
  "A lead marketplace with ZIP-code matching",
  "Stripe subscriptions, coupons and a partner program",
  "Invoices, card payments and review requests",
  "Admin tools, analytics and an in-app AI assistant",
];

const SERVICES = [
  ["Web apps and SaaS", "Full products with accounts, dashboards and subscriptions, ready for real customers."],
  ["AI agents and automations", "Agents that answer leads, write replies, read emails and handle busywork around the clock."],
  ["Booking, payments and texting", "Stripe checkout, invoices, scheduling and two-way texting, wired together."],
  ["Websites that convert", "Fast, clean landing pages built to turn visitors into calls and sign-ups."],
];

const STACK = ["Claude", "Next.js", "React", "TypeScript", "Tailwind", "Supabase", "Stripe", "Twilio", "Postmark", "GitHub", "Vercel"];

const STEPS = [
  ["Free call", "We talk through your business and what the app needs to do."],
  ["Fixed quote", "A clear scope and one price in writing. No surprise bills."],
  ["Build and demos", "You see working progress as it's built and give feedback."],
  ["Launch and care", "It goes live, and an optional care plan keeps it running."],
];

function Kicker({ children }: { children: React.ReactNode }) {
  return <p className="font-mono text-xs tracking-[0.3em] text-claude">{children}</p>;
}

export default function Home() {
  return (
    <main className="mx-auto flex max-w-6xl flex-col gap-24 px-5 pb-16 pt-6 sm:px-8">
      <header className="flex items-center justify-between">
        <span className="flex items-center gap-2.5 font-mono text-sm font-bold tracking-[0.3em]">
          <span className="led-live h-2.5 w-2.5 rounded-full bg-claude text-claude" />
          JOSE BRAVO
        </span>
        <a href="#start" className="rounded-full border border-edge px-4 py-2 text-sm hover:border-claude hover:text-claude">
          Start a project
        </a>
      </header>

      {/* Hero */}
      <section className="rise flex flex-col gap-6 pt-6 text-center sm:pt-12">
        <Kicker>FOUNDER OF FIRSTIN · APP BUILDER</Kicker>
        <h1 className="mx-auto max-w-4xl text-5xl font-semibold leading-[1.02] tracking-tight sm:text-7xl">
          I build apps that <span className="text-claude">run businesses.</span>
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-dim">
          Full web apps with logins, payments, texting and AI agents, designed, built and launched fast. Here&apos;s the agent
          system behind one of them, running right now.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <a href="#start" className="inline-flex min-h-12 items-center rounded-full bg-claude px-7 font-semibold text-void">
            Start a project
          </a>
          <a
            href="https://www.getfirstin.com"
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-12 items-center rounded-full border border-edge px-7 font-semibold hover:border-ink"
          >
            See FirstIn ↗
          </a>
        </div>
      </section>

      {/* Agent demo */}
      <section className="flex flex-col gap-4">
        <Network agents={DEMO_AGENTS} />
        <p className="mx-auto max-w-2xl text-center text-sm text-dim">
          <span className="font-mono text-xs tracking-[0.2em] text-claude">AGENT DEMO · </span>
          The AI agents inside FirstIn answer leads, read lead emails, match jobs, run billing and ask for reviews, with Claude
          coordinating in the middle. Each numbered hub is one part of the business.
        </p>
      </section>

      {/* Proof */}
      <section className="grid gap-8 rounded-3xl border border-edge bg-panel/80 p-6 sm:p-10 lg:grid-cols-[1fr_1.1fr]">
        <div className="flex flex-col gap-4">
          <Kicker>PROOF · FIRSTIN</Kicker>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">I built my own SaaS from scratch.</h2>
          <p className="text-dim">
            FirstIn helps home service pros win more jobs by answering every lead in seconds. I designed, built and launched it
            myself, and it&apos;s live today.
          </p>
          <a href="https://www.getfirstin.com" target="_blank" rel="noreferrer" className="font-mono text-sm text-claude">
            getfirstin.com ↗
          </a>
        </div>
        <ul className="flex flex-col gap-2.5">
          {FIRSTIN_BUILT.map((f) => (
            <li key={f} className="flex gap-3 rounded-xl border border-edge bg-void/50 px-4 py-3 text-sm">
              <span className="text-live">✓</span>
              {f}
            </li>
          ))}
        </ul>
      </section>

      {/* Services */}
      <section className="flex flex-col gap-8">
        <div className="flex flex-col gap-3">
          <Kicker>WHAT I BUILD</Kicker>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Software that does real work.</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {SERVICES.map(([t, d], i) => (
            <div key={t} className="flex flex-col gap-2 rounded-2xl border border-edge bg-panel/80 p-6">
              <span className="font-mono text-xs text-dim">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="text-xl font-semibold">{t}</h3>
              <p className="text-sm text-dim">{d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How I build */}
      <section className="flex flex-col gap-6">
        <Kicker>HOW I BUILD</Kicker>
        <h2 className="max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl">
          AI-powered engineering. <span className="text-dim">Weeks, not months.</span>
        </h2>
        <p className="max-w-3xl text-dim">
          I architect every app and build it alongside Claude, so code gets written, checked and shipped fast. Everything lives
          on GitHub and deploys on Vercel, so your app is backed up, versioned and live the moment it&apos;s ready.
        </p>
        <ul className="flex flex-wrap gap-2">
          {STACK.map((s) => (
            <li key={s} className="rounded-full border border-edge bg-panel px-4 py-2 font-mono text-sm">
              {s}
            </li>
          ))}
        </ul>
      </section>

      {/* Process */}
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STEPS.map(([t, d], i) => (
          <div key={t} className="flex flex-col gap-2 rounded-2xl border border-edge bg-panel/80 p-5">
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-claude font-mono text-sm text-claude">
              {i + 1}
            </span>
            <h3 className="font-semibold">{t}</h3>
            <p className="text-sm text-dim">{d}</p>
          </div>
        ))}
      </section>

      {/* Start a project */}
      <section id="start" className="flex scroll-mt-8 flex-col gap-6 rounded-3xl border border-claude/40 bg-panel/90 p-6 sm:p-10">
        <div className="flex flex-col gap-3">
          <Kicker>START A PROJECT</Kicker>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Tell me what you want built.</h2>
          <p className="text-dim">Every app is quoted to fit the project. Answer a few questions and I&apos;ll reply within a day.</p>
        </div>
        {CONTACT_EMAIL ? (
          <ProjectForm email={CONTACT_EMAIL} />
        ) : (
          <p className="text-sm text-dim">Project requests open soon.</p>
        )}
      </section>

      <footer className="text-center font-mono text-xs text-dim">© {new Date().getFullYear()} Jose Bravo · built with Claude, GitHub and Vercel</footer>
    </main>
  );
}
