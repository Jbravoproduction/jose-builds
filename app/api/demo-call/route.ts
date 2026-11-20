import { NextResponse } from "next/server";
import { dynamicVariables, getReceptionist } from "@/lib/receptionists";
import { createDemoCall } from "@/lib/retell";

export const dynamic = "force-dynamic";

/** Starts a browser call with a prospect's demo receptionist. Only known demo slugs are allowed. */
export async function POST(req: Request) {
  const { slug } = (await req.json().catch(() => ({}))) as { slug?: string };
  const r = slug ? getReceptionist(slug) : undefined;
  if (!r) return NextResponse.json({ error: "Unknown demo" }, { status: 404 });

  try {
    const call = await createDemoCall(dynamicVariables(r), r.slug);
    return NextResponse.json({
      callId: call.call_id,
      accessToken: call.access_token,
      transport: call.transport,
      iceServers: call.ice_servers,
    });
  } catch (e) {
    console.error("[demo-call]", e);
    return NextResponse.json({ error: "Could not start the call. Try again in a minute." }, { status: 502 });
  }
}
