"use client";
import type { RunwayModel } from "@/lib/runway/types";
import type { View } from "@/lib/runway/model";
import { avgOf, money } from "@/lib/runway/format";

type Tone = "pos" | "warn" | "crit" | "";

export default function Tiles({ model, view }: { model: RunwayModel; view: View }) {
  const n = view.months.length;
  const end = view.bal[n - 1] ?? 0;
  let minI = 0;
  view.bal.forEach((b, i) => { if (b < view.bal[minI]) minI = i; });
  const avgNet = avgOf(view.net);
  const avgSpend = avgOf(view.spend);
  const negI = view.bal.findIndex((b) => b < 0);
  const dry = avgSpend > 0 ? view.opening / avgSpend : Infinity;
  const archived = model.hiddenMonths.length;

  const tiles: { label: string; value: string; tone: Tone; foot: string }[] = [
    {
      label: `Ending cash · ${view.months[n - 1] ?? ""}`,
      value: money(end),
      tone: end < 0 ? "crit" : "pos",
      foot: `From ${money(view.opening)} carried into ${view.months[0]}.`,
    },
    {
      label: "Low point",
      value: money(view.bal[minI] ?? 0),
      tone: (view.bal[minI] ?? 0) < 0 ? "crit" : (view.bal[minI] ?? 0) < avgSpend ? "warn" : "",
      foot:
        view.months[minI] +
        ((view.bal[minI] ?? 0) < 0
          ? " — the deepest point of the hole."
          : (view.bal[minI] ?? 0) < avgSpend
          ? " — under one month of spend."
          : " — the tightest month."),
    },
    negI === -1
      ? { label: "Runway", value: `${n}+ mo`, tone: "pos", foot: `Cash never goes negative through ${view.months[n - 1]}.` }
      : { label: "Runway", value: `${negI} mo`, tone: "crit", foot: `Cash first goes negative in ${view.months[negI]}.` },
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
      foot:
        `${avgNet < 0 ? "Burning " : "Building "}${money(Math.abs(avgNet))} a month` +
        (archived ? ` across the ${n} months on screen.` : " on average."),
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
