"use client";

import { useEffect, useRef, useState } from "react";

type Status = "idle" | "connecting" | "live" | "ended" | "error";
const MAX_MS = 5 * 60 * 1000;

/** Big round button that starts a browser voice call with the prospect's demo receptionist. */
export function TalkButton({ slug, color }: { slug: string; color: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const client = useRef<{ stopCall: () => void } | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => () => stop(), []);

  function stop() {
    clearTimeout(timer.current);
    client.current?.stopCall();
    client.current = null;
  }

  async function start() {
    if (status === "connecting" || status === "live") return stop();
    setError("");
    setStatus("connecting");
    try {
      const res = await fetch("/api/demo-call", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Could not start the call.");

      const { RetellWebClient } = await import("retell-client-js-sdk");
      const c = new RetellWebClient();
      client.current = c;
      c.on("call_started", () => setStatus("live"));
      c.on("call_ended", () => {
        clearTimeout(timer.current);
        client.current = null;
        setStatus("ended");
      });
      c.on("error", () => {
        stop();
        setStatus("error");
        setError("The call dropped. Tap to try again.");
      });
      await c.startCall({
        accessToken: data.accessToken,
        callId: data.callId,
        transport: data.transport,
        iceServers: data.iceServers,
      } as unknown as Parameters<typeof c.startCall>[0]);
      setStatus("live");
      timer.current = setTimeout(stop, MAX_MS);
    } catch (e) {
      stop();
      setStatus("error");
      const msg = e instanceof Error ? e.message : "";
      setError(/permission|NotAllowed/i.test(msg) ? "Allow your microphone, then tap again." : msg || "Could not start the call.");
    }
  }

  const live = status === "live";
  const label =
    status === "connecting" ? "Connecting…" : live ? "Tap to hang up" : status === "ended" ? "Call again" : "Tap to talk";

  return (
    <div className="flex flex-col items-center gap-5">
      <button
        onClick={start}
        aria-label={label}
        className="relative grid h-44 w-44 place-items-center rounded-full text-white shadow-2xl transition active:scale-95 sm:h-52 sm:w-52"
        style={{ background: live ? "#dc2626" : color }}
      >
        {(live || status === "connecting") && (
          <>
            <span className="absolute inset-0 animate-ping rounded-full opacity-30" style={{ background: live ? "#dc2626" : color }} />
            <span className="absolute -inset-4 animate-pulse rounded-full border-4 opacity-40" style={{ borderColor: live ? "#dc2626" : color }} />
          </>
        )}
        <span className="relative flex flex-col items-center gap-2">
          <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {live ? (
              <path d="M10.7 13.3a16 16 0 0 0 3.4 2.6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.8.5 2.8.6a2 2 0 0 1 1.7 2v3a2 2 0 0 1-2.2 2A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .3 1.9.6 2.8a2 2 0 0 1-.5 2.1L7.9 9.9M22 2 2 22" />
            ) : (
              <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z" />
            )}
          </svg>
          <span className="text-base font-semibold">{label}</span>
        </span>
      </button>
      <p className="h-5 text-sm text-[#4b5563]">
        {live ? "You're live. Talk like a customer would." : error || "Uses your microphone. Free, about 2 minutes."}
      </p>
    </div>
  );
}
