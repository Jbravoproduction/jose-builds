import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TalkButton } from "@/components/talk-button";
import { allReceptionists, getReceptionist } from "@/lib/receptionists";
import { CONTACT_EMAIL } from "@/lib/site";

export function generateStaticParams() {
  return allReceptionists().map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const r = getReceptionist((await params).slug);
  return {
    title: r ? `Talk to ${r.business}'s AI receptionist` : "AI receptionist demo",
    robots: { index: false, follow: false },
  };
}

/** A prospect's personal AI receptionist demo. They tap and talk to it in the browser. */
export default async function TryReceptionist({ params }: { params: Promise<{ slug: string }> }) {
  const r = getReceptionist((await params).slug);
  if (!r) notFound();
  const mail = CONTACT_EMAIL
    ? `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(`AI receptionist for ${r.business}`)}`
    : "/#start";

  const tries = r.tries ?? [
    `"How much does it usually cost?"`,
    `"Do you come out to ${r.areas[1] ?? r.areas[0] ?? r.city}?"`,
    `"Can someone come out Saturday morning?"`,
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-[#111827]">
      <div className="bg-[#111827] px-4 py-2.5 text-center text-xs text-white sm:text-sm">
        Free demo made for {r.business} by Jose Bravo. Not connected to your real phone line yet.
      </div>

      <main className="mx-auto flex max-w-3xl flex-col items-center gap-10 px-5 py-14 text-center">
        <div className="flex flex-col gap-4">
          <p className="text-sm font-semibold uppercase tracking-widest" style={{ color: r.color }}>
            {r.trade} · {r.city}
          </p>
          <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
            Meet {r.receptionist}, the receptionist for {r.business}
          </h1>
          <p className="mx-auto max-w-xl text-lg text-[#4b5563]">
            {r.receptionist} answers every call you miss while you&apos;re on a job: answers questions, quotes, and gets the
            customer booked, then texts you the details. Already trained on your services. Call it like a customer would.
          </p>
        </div>

        <TalkButton slug={r.slug} color={r.color} />

        <div className="flex flex-col gap-2 text-sm text-[#4b5563]">
          <p className="font-semibold text-[#111827]">Try asking:</p>
          {tries.map((t) => (
            <p key={t}>{t}</p>
          ))}
        </div>

        <section className="grid w-full gap-4 text-left sm:grid-cols-3">
          {[
            ["Never miss a call", "Answers 24/7, nights and weekends, even when you're on a job."],
            ["Books the job", "Gets the name, address, job details and a time, then texts it all to you."],
            ["Sounds like you", "Knows your services, area, hours and pricing. Keep your same number."],
          ].map(([h, t]) => (
            <div key={h} className="rounded-2xl bg-[#f6f7f9] p-5">
              <h2 className="font-semibold">{h}</h2>
              <p className="mt-1 text-sm text-[#4b5563]">{t}</p>
            </div>
          ))}
        </section>

        <section className="w-full rounded-3xl p-8 text-white" style={{ background: `linear-gradient(135deg, ${r.color}, #111827)` }}>
          <p className="text-sm uppercase tracking-widest opacity-80">Put {r.receptionist} on your phone line</p>
          <p className="mt-3 text-4xl font-bold">
            $497 setup <span className="text-2xl font-semibold opacity-80">+ $97/mo</span>
          </p>
          <p className="mx-auto mt-3 max-w-md opacity-90">
            Live in 3 days. Cancel the monthly anytime. One booked job usually pays for the whole month.
          </p>
          <a href={mail} className="mt-6 inline-block rounded-full bg-white px-8 py-3.5 font-semibold text-[#111827]">
            I want this for my business
          </a>
        </section>
      </main>
    </div>
  );
}
