import { HUBS, type Agent, type Status } from "@/lib/agents";

const S = 640;
const C = S / 2;
const HUB_R = 150;

/** Same "random" layout on every render, so the map doesn't jump around. */
function seeded(seed: number) {
  let t = seed;
  return () => {
    t = (t * 1664525 + 1013904223) % 4294967296;
    return t / 4294967296;
  };
}

const CORE_COLORS = ["#d97757", "#f2b38f", "#a78bfa", "#60a5fa", "#2dd4bf", "#fbbf24", "#e6e9f2"];

function coreDots() {
  const r = seeded(7);
  return Array.from({ length: 260 }, (_, i) => {
    const angle = r() * Math.PI * 2;
    const dist = Math.pow(r(), 0.6) * 74;
    return {
      x: C + Math.cos(angle) * dist,
      y: C + Math.sin(angle) * dist,
      size: 0.7 + r() * 1.5,
      color: CORE_COLORS[i % CORE_COLORS.length],
      delay: (r() * 3).toFixed(2),
      twinkle: r() > 0.55,
    };
  });
}

function agentColor(status: Status, hubColor: string) {
  if (status === "working") return "#34d399";
  if (status === "waiting") return "#fbbf24";
  if (status === "planned") return "#4b5368";
  return hubColor;
}

/** Claude's particle core in the middle, numbered hubs around it, each bursting out into its agents. */
export default function Network({ agents }: { agents: Agent[] }) {
  const dots = coreDots();
  const sparks = seeded(42);

  return (
    <div className="relative mx-auto aspect-[1040/720] w-full max-w-[980px]">
      <svg viewBox="-200 -40 1040 720" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <defs>
          <radialGradient id="core-glow">
            <stop offset="0%" stopColor="#d97757" stopOpacity="0.35" />
            <stop offset="60%" stopColor="#8b5cf6" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#000" stopOpacity="0" />
          </radialGradient>
        </defs>

        <circle cx={C} cy={C} r={250} fill="none" stroke="#1c2233" strokeDasharray="1 7" />
        <circle cx={C} cy={C} r={HUB_R} fill="none" stroke="#1c2233" strokeDasharray="2 8" />

        {HUBS.map((hub, h) => {
          const angle = -Math.PI / 2 + (h / HUBS.length) * Math.PI * 2;
          const hx = C + Math.cos(angle) * HUB_R;
          const hy = C + Math.sin(angle) * HUB_R;
          const members = agents.filter((a) => a.hub === hub.id);
          const planned = hub.company === "Crescia";
          const busy = members.some((a) => a.status === "working");
          const labelR = 335;
          const lx = C + Math.cos(angle) * labelR;
          const ly = C + Math.sin(angle) * labelR;
          const anchor = Math.abs(Math.cos(angle)) < 0.3 ? "middle" : Math.cos(angle) > 0 ? "start" : "end";

          return (
            <g key={hub.id}>
              {/* link from the hub into Claude */}
              <line
                x1={hx}
                y1={hy}
                x2={C + Math.cos(angle) * 82}
                y2={C + Math.sin(angle) * 82}
                stroke={hub.color}
                strokeOpacity={planned ? 0.18 : busy ? 0.9 : 0.4}
                strokeWidth={busy ? 1.6 : 1}
                className={busy ? "flow" : undefined}
                strokeDasharray={planned ? "1 6" : undefined}
              />

              {/* the agents bursting out of the hub */}
              {members.map((a, i) => {
                const fan = Math.min(1.7, 0.55 * (members.length - 1));
                const spread = members.length === 1 ? 0 : (i / (members.length - 1) - 0.5) * fan;
                const aa = angle + spread;
                const dist = 82 + (i % 2) * 30;
                const ax = hx + Math.cos(aa) * dist;
                const ay = hy + Math.sin(aa) * dist;
                const color = agentColor(a.status, hub.color);
                return (
                  <g key={a.name}>
                    <line
                      x1={hx}
                      y1={hy}
                      x2={ax}
                      y2={ay}
                      stroke={color}
                      strokeOpacity={a.status === "planned" ? 0.3 : 0.6}
                      className={a.status === "working" ? "flow" : undefined}
                    />
                    {/* little sparks along each branch, like the agent is thinking */}
                    {Array.from({ length: 4 }, (_, k) => {
                      const t = 0.25 + sparks() * 0.7;
                      const jx = (sparks() - 0.5) * 16;
                      const jy = (sparks() - 0.5) * 16;
                      return (
                        <circle
                          key={k}
                          cx={hx + (ax - hx) * t + jx}
                          cy={hy + (ay - hy) * t + jy}
                          r={1 + sparks() * 1.4}
                          fill={color}
                          opacity={a.status === "planned" ? 0.25 : 0.55}
                        />
                      );
                    })}
                    {Array.from({ length: 5 }, (_, k) => {
                      const ta = aa + (sparks() - 0.5) * 1.8;
                      const tl = 10 + sparks() * 16;
                      const tx = ax + Math.cos(ta) * tl;
                      const ty = ay + Math.sin(ta) * tl;
                      return (
                        <g key={`t${k}`} opacity={a.status === "planned" ? 0.25 : 0.7}>
                          <line x1={ax} y1={ay} x2={tx} y2={ty} stroke={color} strokeOpacity={0.45} strokeWidth={0.8} />
                          <circle cx={tx} cy={ty} r={1.2 + sparks() * 1.3} fill={k % 2 ? "#e6e9f2" : color} />
                        </g>
                      );
                    })}
                    {a.status === "working" && (
                      <circle cx={ax} cy={ay} r={8} fill={color} opacity={0.25}>
                        <animate attributeName="r" values="6;13;6" dur="1.8s" repeatCount="indefinite" />
                        <animate attributeName="opacity" values="0.35;0;0.35" dur="1.8s" repeatCount="indefinite" />
                      </circle>
                    )}
                    <circle cx={ax} cy={ay} r={4.5} fill={color} opacity={a.status === "planned" ? 0.5 : 1} />
                    <text
                      className="hidden sm:inline"
                      x={ax + Math.cos(aa) * 30}
                      y={ay + Math.sin(aa) * 30}
                      dy="0.35em"
                      textAnchor={Math.cos(aa) > 0.2 ? "start" : Math.cos(aa) < -0.2 ? "end" : "middle"}
                      fontSize="11.5"
                      fontFamily="var(--font-mono)"
                      fill={a.status === "planned" ? "#5d667d" : "#aeb6c8"}
                    >
                      {a.short}
                    </text>
                  </g>
                );
              })}

              {/* numbered hub */}
              <circle cx={hx} cy={hy} r={25} fill="#0c0f17" stroke={hub.color} strokeWidth={2} strokeOpacity={planned ? 0.45 : 1} />
              <text x={hx} y={hy} dy="0.36em" textAnchor="middle" fontSize="16" fontWeight="700" fontFamily="var(--font-mono)" fill={planned ? "#7b8499" : hub.color}>
                {String(h + 1).padStart(2, "0")}
              </text>

              {/* area name, spaced out like a map label */}
              <text
                x={lx}
                y={ly}
                dy="0.35em"
                textAnchor={anchor}
                fontSize="22"
                letterSpacing="6"
                fontFamily="var(--font-sans)"
                fill={planned ? "#5d667d" : "#e6e9f2"}
                opacity={planned ? 0.7 : 0.95}
              >
                {hub.label}
              </text>
            </g>
          );
        })}

        {/* Claude: a particle core, generating outward */}
        <circle cx={C} cy={C} r={120} fill="url(#core-glow)" />
        <g className="core-spin">
          {dots.map((d, i) => (
            <circle
              key={i}
              cx={d.x}
              cy={d.y}
              r={d.size}
              fill={d.color}
              className={d.twinkle ? "twinkle" : undefined}
              style={d.twinkle ? { animationDelay: `${d.delay}s` } : undefined}
              opacity={0.85}
            />
          ))}
        </g>
        {[0, 1.2, 2.4].map((delay) => (
          <circle key={delay} cx={C} cy={C} r={70} fill="none" stroke="#d97757" strokeWidth={1.2} className="core-ring" style={{ animationDelay: `${delay}s` }} />
        ))}
        <text x={C} y={C} dy="0.35em" textAnchor="middle" fontSize="13" fontWeight="700" letterSpacing="6" fontFamily="var(--font-mono)" fill="#fff">
          CLAUDE
        </text>
      </svg>
    </div>
  );
}
