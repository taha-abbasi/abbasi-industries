"use client";
import type { Computed, RunwayModel } from "@/lib/runway/types";
import { avgOf, money } from "@/lib/runway/format";

type Tone = "pos" | "warn" | "crit" | "";

export default function Tiles({ model, c }: { model: RunwayModel; c: Computed }) {
  const n = model.months.length;
  const end = c.bal[n - 1] ?? 0;
  let minI = 0;
  c.bal.forEach((b, i) => { if (b < c.bal[minI]) minI = i; });
  const avgNet = avgOf(c.net);
  const avgSpend = avgOf(c.spend);
  const negI = c.bal.findIndex((b) => b < 0);
  const dry = avgSpend > 0 ? model.startCash / avgSpend : Infinity;

  const tiles: { label: string; value: string; tone: Tone; foot: string }[] = [
    {
      label: `Ending cash · ${model.months[n - 1] ?? ""}`,
      value: money(end),
      tone: end < 0 ? "crit" : "pos",
      foot: `From ${money(model.startCash)} opening.`,
    },
    {
      label: "Low point",
      value: money(c.bal[minI] ?? 0),
      tone: (c.bal[minI] ?? 0) < 0 ? "crit" : (c.bal[minI] ?? 0) < avgSpend ? "warn" : "",
      foot:
        model.months[minI] +
        ((c.bal[minI] ?? 0) < 0
          ? " — the deepest point of the hole."
          : (c.bal[minI] ?? 0) < avgSpend
          ? " — under one month of spend."
          : " — the tightest month."),
    },
    negI === -1
      ? { label: "Runway", value: `${n}+ mo`, tone: "pos", foot: `Cash never goes negative through ${model.months[n - 1]}.` }
      : { label: "Runway", value: `${negI} mo`, tone: "crit", foot: `Cash first goes negative in ${model.months[negI]}.` },
    {
      label: "Runway without income",
      value: Number.isFinite(dry) ? `${Math.max(0, dry).toFixed(1)} mo` : "—",
      tone: dry < 3 ? "crit" : dry < 6 ? "warn" : "",
      foot: `Opening cash ÷ ${money(avgSpend)} avg monthly spend.`,
    },
    {
      label: "Average monthly net",
      value: money(avgNet),
      tone: avgNet < 0 ? "crit" : "pos",
      foot: `${avgNet < 0 ? "Burning " : "Building "}${money(Math.abs(avgNet))} a month on average.`,
    },
  ];

  const rail: Record<string, string> = {
    pos: "bg-[#4A6340]", warn: "bg-bronze", crit: "bg-[#9B3A2E]", "": "bg-line",
  };
  const text: Record<string, string> = {
    pos: "text-[#4A6340]", crit: "text-[#9B3A2E]", warn: "text-ink", "": "text-ink",
  };

  return (
    <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
      {tiles.map((t) => (
        <div key={t.label} className="relative overflow-hidden rounded-lg border border-line bg-bone p-4">
          <span className={`absolute inset-y-0 left-0 w-[3px] ${rail[t.tone]}`} aria-hidden />
          <p className="text-[10.5px] font-semibold uppercase tracking-wide text-stone">{t.label}</p>
          <p className={`font-mono text-2xl font-semibold tabular-nums ${text[t.tone]}`}>{t.value}</p>
          <p className="mt-0.5 text-xs text-stone">{t.foot}</p>
        </div>
      ))}
    </section>
  );
}
