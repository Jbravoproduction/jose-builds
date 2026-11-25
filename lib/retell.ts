/** Server-only helpers for the Retell voice API. The key lives in RETELL_API_KEY (Vercel, secret). */
const API = "https://api.retellai.com";
export type DemoKind = "home" | "spa";

const HOME_PROMPT = `You are {{receptionist}}, the friendly front-desk receptionist for {{business}}, a {{trade}} company in {{city}}. You answer the phone when the team is busy on a job.

What you know:
- Services: {{services}}
- Service area: {{areas}}
- Hours: {{hours}}
- Pricing: {{pricing}}
- Other details: {{notes}}
- The owner is {{owner}}.

How you talk:
- Warm, upbeat and brief. One or two short sentences at a time, like a real person on the phone. Never read lists out.
- Answer questions using only what you know above. If you are not sure, say {{owner}} will confirm it, never make up prices or promises.

Your goal on every call: book the job.
1. Find out what they need done.
2. Get their first name, the address or part of town, and the best day and time.
3. Get the best phone number for a text confirmation.
4. Repeat the details back, then tell them {{owner}} will text to confirm the time shortly.

If they ask whether you are a real person, say you are the AI receptionist for {{business}} and you can still get them booked.`;

const SPA_PROMPT = `You are {{receptionist}}, the warm, polished front desk for {{business}}, a med spa in {{city}}. You answer calls when the team is with clients or after hours.

What you know:
- Treatments: {{services}}
- Hours: {{hours}}
- Pricing: {{pricing}}
- Other details: {{notes}}
- Lead provider: {{owner}}.

How you talk:
- Calm, friendly and brief, like a great spa front desk. One or two short sentences at a time. Never read lists out.
- Answer only from what you know above. Never make up prices, results or promotions.
- Never give medical advice. If they ask whether a treatment is right for them, about side effects, medications, pregnancy or health conditions, say the provider will go over that personally at their consultation.

Your goal on every call: book a consultation or appointment.
1. Ask what treatment they are interested in, and if they have been in before.
2. Offer a day and time, then get their first and last name.
3. Get the best phone number and email for the confirmation text.
4. Repeat the details back, then say they will get a text confirmation and a reminder before the visit.

If they ask whether you are a real person, say you are the AI front desk for {{business}} and you can still get them booked.`;

const AGENTS: Record<DemoKind, { name: string; prompt: string; begin: string }> = {
  home: {
    name: "Jose Builds Demo Receptionist v1",
    prompt: HOME_PROMPT,
    begin: "Thanks for calling {{business}}, this is {{receptionist}}. How can I help you today?",
  },
  spa: {
    name: "Crescia Med Spa Demo Front Desk v1",
    prompt: SPA_PROMPT,
    begin: "Thank you for calling {{business}}, this is {{receptionist}}. How can I help you today?",
  },
};

function headers() {
  const key = process.env.RETELL_API_KEY;
  if (!key) throw new Error("RETELL_API_KEY is not set");
  return { Authorization: `Bearer ${key}`, "Content-Type": "application/json" };
}

async function call<T>(method: string, route: string, body?: unknown): Promise<T> {
  const res = await fetch(`${API}${route}`, {
    method,
    headers: headers(),
    body: body ? JSON.stringify(body) : undefined,
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Retell ${route} ${res.status}: ${(await res.text()).slice(0, 300)}`);
  return (await res.json()) as T;
}

type Agent = { agent_id: string; agent_name?: string | null };

const cachedAgentIds: Partial<Record<DemoKind, string>> = {};

/** One shared demo agent per kind. Each prospect's details are passed in per call as dynamic variables. */
async function demoAgentId(kind: DemoKind): Promise<string> {
  if (kind === "home" && process.env.RETELL_AGENT_ID) return process.env.RETELL_AGENT_ID;
  const cached = cachedAgentIds[kind];
  if (cached) return cached;
  const spec = AGENTS[kind];

  try {
    const list = await call<unknown>("GET", "/list-agents");
    const agents: Agent[] = Array.isArray(list)
      ? (list as Agent[])
      : (((list as { agents?: Agent[]; items?: Agent[] }).agents ?? (list as { items?: Agent[] }).items) ?? []);
    const found = agents.find((a) => a.agent_name === spec.name);
    if (found) return (cachedAgentIds[kind] = found.agent_id);
  } catch {
    // Fall through and create one.
  }

  const llm = await call<{ llm_id: string }>("POST", "/create-retell-llm", {
    start_speaker: "agent",
    begin_message: spec.begin,
    general_prompt: spec.prompt,
  });
  const agent = await call<Agent>("POST", "/create-agent", {
    agent_name: spec.name,
    response_engine: { type: "retell-llm", llm_id: llm.llm_id },
    voice_id: "retell-Cimo",
  });
  return (cachedAgentIds[kind] = agent.agent_id);
}

export type WebCall = {
  call_id: string;
  access_token: string;
  transport?: string;
  ice_servers?: { urls: string | string[]; username?: string; credential?: string }[];
};

export async function createDemoCall(vars: Record<string, string>, slug: string, kind: DemoKind = "home"): Promise<WebCall> {
  const agent_id = await demoAgentId(kind);
  return call<WebCall>("POST", "/v3/create-web-call", {
    agent_id,
    retell_llm_dynamic_variables: vars,
    metadata: { demo: slug, kind },
  });
}
