import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { allDemos, getDemo } from "@/lib/demos";

export function generateStaticParams() {
  return allDemos().map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const demo = getDemo((await params).slug);
  return {
    title: demo ? `Website concept for ${demo.business}` : "Website concept",
    robots: { index: false, follow: false },
  };
}

/** A free concept homepage for a prospect. Clearly labeled as a demo, never their official site. */
export default async function DemoSite({ params }: { params: Promise<{ slug: string }> }) {
  const demo = getDemo((await params).slug);
  if (!demo) notFound();
  const tel = demo.phone?.replace(/[^\d+]/g, "");

  return (
    <div className="min-h-screen bg-white font-sans text-[#111827]" style={{ ["--brand" as string]: demo.color }}>
      <div className="bg-[#111827] px-4 py-2.5 text-center text-xs text-white sm:text-sm">
        Free website concept made for {demo.business} by Jose Bravo. This is a demo, not their official website.{" "}
        <a href="/#start" className="font-semibold underline">Want yours live?</a>
      </div>

      <header className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5">
        <span className="text-xl font-bold tracking-tight">{demo.business}</span>
        {tel && (
          <a href={`tel:${tel}`} className="rounded-full px-5 py-2.5 text-sm font-semibold text-white" style={{ background: "var(--brand)" }}>
            Call {demo.phone}
          </a>
        )}
      </header>

      <section className="mx-auto grid max-w-6xl gap-10 px-5 pb-16 pt-8 md:grid-cols-[1.2fr_1fr] md:items-center">
        <div className="flex flex-col gap-5">
          <p className="text-sm font-semibold uppercase tracking-widest" style={{ color: "var(--brand)" }}>
            {demo.trade} · {demo.city}
          </p>
          <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-6xl">{demo.tagline}</h1>
          <p className="max-w-xl text-lg text-[#4b5563]">{demo.intro}</p>
          <div className="flex flex-wrap gap-3">
            <a href="#quote" className="rounded-full px-7 py-3.5 font-semibold text-white" style={{ background: "var(--brand)" }}>
              Get a free quote
            </a>
            {tel && (
              <a href={`tel:${tel}`} className="rounded-full border-2 border-[#111827] px-7 py-3.5 font-semibold">
                Call now
              </a>
            )}
          </div>
        </div>
        <div className="rounded-3xl p-8 text-white shadow-xl" style={{ background: "linear-gradient(135deg, var(--brand), #111827)" }}>
          <p className="text-sm uppercase tracking-widest opacity-80">Why customers call</p>
          <ul className="mt-4 flex flex-col gap-3">
            {demo.why.map((w) => (
              <li key={w} className="flex gap-3 text-lg font-medium">
                <span>✓</span>
                {w}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-[#f6f7f9] py-16">
        <div className="mx-auto max-w-6xl px-5">
          <h2 className="text-3xl font-bold tracking-tight">Services</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {demo.services.map((s) => (
              <div key={s.name} className="rounded-2xl bg-white p-6 shadow-sm">
                <h3 className="text-lg font-semibold">{s.name}</h3>
                <p className="mt-2 text-sm text-[#4b5563]">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16">
        <h2 className="text-3xl font-bold tracking-tight">Proudly serving</h2>
        <div className="mt-6 flex flex-wrap gap-2">
          {demo.areas.map((a) => (
            <span key={a} className="rounded-full border border-[#e5e7eb] px-4 py-2 text-sm">{a}</span>
          ))}
        </div>
      </section>

      <section id="quote" className="py-16 text-white" style={{ background: "var(--brand)" }}>
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 px-5 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Get your free quote today</h2>
          <p className="opacity-90">On the live site, this form sends quote requests straight to your phone.</p>
          <div className="mt-2 grid w-full gap-3 sm:grid-cols-2">
            {["Your name", "Phone", "Address or ZIP", "What do you need?"].map((p) => (
              <div key={p} className="rounded-xl bg-white/15 px-4 py-3 text-left text-sm opacity-90">{p}</div>
            ))}
          </div>
          <span className="mt-2 rounded-full bg-white px-7 py-3.5 font-semibold" style={{ color: "var(--brand)" }}>Request quote (demo)</span>
        </div>
      </section>

      <footer className="px-5 py-8 text-center text-xs text-[#6b7280]">
        Concept by Jose Bravo · Not the official website of {demo.business}
      </footer>
    </div>
  );
}
