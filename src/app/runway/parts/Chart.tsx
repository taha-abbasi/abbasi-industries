"use client";
import type { Computed, RunwayModel } from "@/lib/runway/types";
import { fmt0, money } from "@/lib/runway/format";

export default function Chart({ model, c }: { model: RunwayModel; c: Computed }) {
  const W = 900, H = 260, L = 64, R = 22, T = 22, B = 34;
  const vals = c.bal;
  const cnt = vals.length;
  if (!cnt) return null;

  const hi = Math.max(0, ...vals), lo = Math.min(0, ...vals);
  const pad = Math.max((hi - lo) * 0.12, 1);
  const top = hi + pad, bot = lo - pad;
  const x = (i: number) => (cnt === 1 ? L + (W - L - R) / 2 : L + (i * (W - L - R)) / (cnt - 1));
  const y = (v: number) => T + ((top - v) * (H - T - B)) / (top - bot || 1);

  let minI = 0;
  vals.forEach((v, i) => { if (v < vals[minI]) minI = i; });

  const ticks = 4;
  const grid = Array.from({ length: ticks + 1 }, (_, k) => {
    const v = bot + ((top - bot) * k) / ticks;
    return { v, y: y(v) };
  });

  const pts = vals.map((v, i) => [x(i), y(v)] as const);
  const d = pts.map((p, i) => `${i ? "L" : "M"}${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(" ");
  const base = y(Math.max(bot, Math.min(0, top)));
  const area = `${d} L ${pts[cnt - 1][0].toFixed(1)} ${base.toFixed(1)} L ${pts[0][0].toFixed(1)} ${base.toFixed(1)} Z`;

  const axis = (v: number) =>
    Math.abs(v) >= 1000 ? `${v < 0 ? "−" : ""}$${fmt0.format(Math.abs(Math.round(v / 1000)))}k` : money(v);

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="block w-full overflow-visible" role="img"
         aria-label="Ending cash balance by month">
      <defs>
        <linearGradient id="runwayFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#9A7B4F" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#9A7B4F" stopOpacity="0.02" />
        </linearGradient>
      </defs>

      {grid.map((g, i) => (
        <g key={i}>
          <line x1={L} y1={g.y} x2={W - R} y2={g.y} stroke="#E3DCCE" strokeWidth={1} />
          <text x={L - 10} y={g.y + 3.5} textAnchor="end" className="font-mono" fontSize={10.5} fill="#8C8378">
            {axis(g.v)}
          </text>
        </g>
      ))}
      {bot < 0 && top > 0 && (
        <line x1={L} y1={y(0)} x2={W - R} y2={y(0)} stroke="#9B3A2E" strokeWidth={1} strokeDasharray="3 3" opacity={0.7} />
      )}

      <path d={area} fill="url(#runwayFill)" />
      <path d={d} fill="none" stroke="#9A7B4F" strokeWidth={2.25} strokeLinejoin="round" strokeLinecap="round" />

      {pts.map((p, i) => {
        const isEnd = i === cnt - 1;
        const isMin = i === minI && cnt > 1 && minI !== cnt - 1;
        const above = vals[i] >= 0;
        return (
          <g key={i}>
            <circle cx={p[0]} cy={p[1]} r={isEnd ? 5 : 4}
                    fill={isEnd ? "#9A7B4F" : "#FBF8F2"}
                    stroke={isMin ? "#9B3A2E" : "#9A7B4F"} strokeWidth={isMin ? 2.4 : 2} />
            <text x={p[0]} y={p[1] + (above ? -12 : 18)} textAnchor="middle" className="font-mono"
                  fontSize={10.5} fontWeight={isEnd ? 600 : 500} fill={isEnd ? "#9A7B4F" : "#3A352D"}>
              {money(vals[i])}
            </text>
            <text x={p[0]} y={H - 10} textAnchor="middle" className="font-mono" fontSize={10.5} fill="#8C8378">
              {model.months[i]?.replace(" 20", "’")}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
