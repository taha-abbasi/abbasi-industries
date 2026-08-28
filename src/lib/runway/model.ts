import type { Computed, RunwayModel } from "./types";
import { SEED, SEED_VERSION } from "./seed";

export const clone = <T,>(o: T): T => JSON.parse(JSON.stringify(o)) as T;

export function num(x: unknown): number {
  if (typeof x === "number") return Number.isFinite(x) ? x : 0;
  const n = parseFloat(String(x ?? "").replace(/[^0-9.\-]/g, ""));
  return Number.isFinite(n) ? n : 0;
}

/** Coerce anything that came off the wire into a model we can safely compute on. */
export function normalise(input: Partial<RunwayModel> | null | undefined): RunwayModel {
  const base = clone(SEED);
  if (!input || !Array.isArray(input.months) || !Array.isArray(input.groups)) return base;

  const months = input.months.map((m) => String(m)).filter(Boolean);
  if (!months.length) return base;
  const n = months.length;

  const groups = input.groups
    .filter((g) => g && Array.isArray(g.rows))
    .map((g) => ({
      name: String(g.name ?? "Section"),
      kind: g.kind === "income" ? ("income" as const) : ("expense" as const),
      rows: g.rows.map((r) => {
        const v = (Array.isArray(r.v) ? r.v : []).slice(0, n).map(num);
        while (v.length < n) v.push(0);
        return { name: String(r.name ?? ""), note: String(r.note ?? ""), v };
      }),
    }));

  const lv: Partial<RunwayModel["levers"]> = input.levers ?? {};
  const hidden = Array.isArray(input.hiddenMonths)
    ? input.hiddenMonths.map(String).filter((m) => months.includes(m))
    : [];
  // never archive the whole model away
  const hiddenMonths = hidden.length >= months.length ? hidden.slice(0, months.length - 1) : hidden;

  return {
    seedVersion: String(input.seedVersion ?? ""),
    startCash: num(input.startCash),
    months,
    hiddenMonths,
    groups,
    levers: {
      inc: clampPct(num(lv.inc ?? 100)),
      exp: clampPct(num(lv.exp ?? 100)),
      stop: Math.max(0, Math.min(n, Math.round(num(lv.stop ?? 0)))),
    },
  };
}

const clampPct = (p: number) => Math.min(300, Math.max(0, p));

/** Ending cash = opening + income − expenses, carried forward month to month. */
export function compute(model: RunwayModel): Computed {
  const n = model.months.length;
  const { inc, exp, stop } = model.levers;
  const rawIncome = new Array(n).fill(0);
  const rawSpend = new Array(n).fill(0);

  for (const g of model.groups) {
    for (const r of g.rows) {
      for (let m = 0; m < n; m++) {
        if (g.kind === "income") rawIncome[m] += r.v[m];
        else rawSpend[m] += r.v[m];
      }
    }
  }

  const income = rawIncome.map((x, m) => (stop > 0 && m >= stop - 1 ? 0 : (x * inc) / 100));
  const spend = rawSpend.map((x) => (x * exp) / 100);
  const net = income.map((x, m) => x - spend[m]);

  const bal: number[] = [];
  let run = model.startCash;
  for (let m = 0; m < n; m++) {
    run += net[m];
    bal.push(run);
  }
  return { income, spend, net, bal, rawIncome, rawSpend };
}

export { SEED, SEED_VERSION };

/**
 * What the screen shows. Archived months stay in `compute()` — the running
 * balance is unbroken — but the view starts at the first visible month and
 * carries the cash from everything before it as an opening figure.
 */
export type View = {
  idx: number[];
  months: string[];
  opening: number;
  income: number[];
  spend: number[];
  net: number[];
  bal: number[];
};

export function project(model: RunwayModel, c: Computed, revealAll = false): View {
  const hidden = new Set(revealAll ? [] : model.hiddenMonths);
  let idx = model.months.map((_, i) => i).filter((i) => !hidden.has(model.months[i]));
  if (!idx.length) idx = model.months.map((_, i) => i);
  const first = idx[0];
  return {
    idx,
    months: idx.map((i) => model.months[i]),
    opening: first === 0 ? model.startCash : c.bal[first - 1],
    income: idx.map((i) => c.income[i]),
    spend: idx.map((i) => c.spend[i]),
    net: idx.map((i) => c.net[i]),
    bal: idx.map((i) => c.bal[i]),
  };
}
