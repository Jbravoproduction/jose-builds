import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TalkButton } from "@/components/talk-button";
import { CRESCIA_BOOKING_URL } from "@/lib/site";
import { allSpas, getSpa } from "@/lib/spas";

export function generateStaticParams() {
  return allSpas().map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const s = getSpa((await params).slug);
  return {
    title: s ? `Meet ${s.business}'s AI front desk · Crescia` : "Crescia AI front desk demo",
    robots: { index: false, follow: false },
  };
}

const serif = { fontFamily: '"Cormorant Garamond", "Playfair Display", Georgia, "Times New Roman", serif' };

/** A med spa's personal AI front desk demo, made by Crescia. The owner taps and talks to it in the browser. */
export default async function SpaDemo({ params }: { params: Promise<{ slug: string }> }) {
  const s = getSpa((await params).slug);
  if (!s) notFound();

  const tries = s.tries ?? [`"How much is Botox?"`, `"Do you have anything Saturday?"`, `"Is the consultation free?"`];
  const system = [
    ["AI front desk", "Answers calls, Instagram DMs and website chat 24/7, and books straight into your calendar."],
    ["Missed-call text back", "Every caller you miss gets a friendly text within seconds, before they call the next spa."],
    ["Fewer no-shows", "Automatic confirmation and reminder texts before every consult and treatment."],
    ["Automatic rebooking", "Reaches out when it's time for their next Botox or facial, so clients come back on schedule."],
    ["Past-client reactivation", "Brings back clients who haven't visited in months with a personal text and offer."],
    ["More 5-star reviews", "Asks happy clients for a review right after their visit."],
  ];

  return (
    <div className="min-h-screen bg-[#faf7f2] font-sans text-[#2b2220]">
      <div className="bg-[#2b2220] px-4 py-2.5 text-center text-xs text-[#f3ebe1] sm:text-sm">
        Free demo made for {s.business} by Crescia. Not connected to your phone line yet.
      </div>

      <main className="mx-auto flex max-w-3xl flex-col items-center gap-12 px-5 py-14 text-center">
        <div className="flex flex-col gap-4">
          <p className="text-xs font-semibold uppercase tracking-[0.3em]" style={{ color: s.color }}>
            Med spa · {s.city}
          </p>
          <h1 className="text-4xl leading-tight sm:text-6xl" style={serif}>
            Meet {s.receptionist}, the front desk for {s.business}
          </h1>
          <p className="mx-auto max-w-xl text-lg text-[#6b5d55]">
            {s.receptionist} answers when your team is with clients or after hours. She answers questions about your
            treatments and books the consultation, then texts the confirmation. She already knows your treatments and
            hours. Call her the way a new client would.
          </p>
        </div>

        <TalkButton slug={s.slug} color={s.color} kind="spa" />

        <div className="flex flex-col gap-2 text-sm text-[#6b5d55]">
          <p className="font-semibold text-[#2b2220]">Try asking:</p>
          {tries.map((t) => (
            <p key={t}>{t}</p>
          ))}
        </div>

        <section className="w-full text-left">
          <h2 className="mb-5 text-center text-3xl" style={serif}>
            The full Crescia Booking System
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {system.map(([h, t]) => (
              <div key={h} className="rounded-2xl border border-[#ece3d8] bg-white p-5">
                <h3 className="font-semibold">{h}</h3>
                <p className="mt-1 text-sm text-[#6b5d55]">{t}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="w-full rounded-3xl p-8 text-white" style={{ background: `linear-gradient(135deg, ${s.color}, #2b2220)` }}>
          <h2 className="text-3xl" style={serif}>
            Want {s.receptionist} answering for {s.business}?
          </h2>
          <p className="mx-auto mt-3 max-w-md opacity-90">
            We set everything up for you and connect it to your current booking software and phone number. Live in about
            two weeks.
          </p>
          {CRESCIA_BOOKING_URL ? (
            <a
              href={CRESCIA_BOOKING_URL}
              className="mt-6 inline-block rounded-full bg-white px-8 py-3.5 font-semibold text-[#2b2220]"
            >
              Book a 15-minute call
            </a>
          ) : (
            <p className="mt-6 font-semibold">Just reply to our email and we&apos;ll show you how it works on your line.</p>
          )}
        </section>

        <p className="text-xs text-[#9a8b80]">Crescia · AI booking systems for med spas</p>
      </main>
    </div>
  );
}
