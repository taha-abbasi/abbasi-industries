"use client";
import type { Computed, RunwayModel } from "@/lib/runway/types";
import { avgOf, dollarsToPct, fmt0, fmt2, pctToDollars } from "@/lib/runway/format";
import { num } from "@/lib/runway/model";
import MoneyInput from "./MoneyInput";

type Props = {
  model: RunwayModel;
  c: Computed;
  onStartCash: (v: number) => void;
  onLever: (patch: Partial<RunwayModel["levers"]>) => void;
};

const label = "text-[10.5px] font-semibold uppercase tracking-wide text-stone";
const box = "w-full rounded-md border border-line bg-ivory px-3 py-2 font-mono text-sm tabular-nums text-ink outline-none focus:border-bronze";

export default function Levers({ model, c, onStartCash, onLever }: Props) {
  const L = model.levers;

  const setScale = (id: "inc" | "exp", v: number) =>
    onLever(id === "inc" ? { inc: v } : { exp: v });

  const incAvg = avgOf(c.rawIncome);
  const expAvg = avgOf(c.rawSpend);

  const note = (word: string, pct: number) =>
    Math.round(pct) === 100
      ? `Every ${word} as booked.`
      : `Every ${word} ${pct < 100 ? "cut" : "raised"} to ${Math.round(pct)}%.`;

  const dollars = (pct: number, avg: number) => {
    const d = Math.round(pctToDollars(pct, avg));
    return (d > 0 ? "+" : "") + fmt0.format(d);
  };

  const scaleRow = (
    id: "inc" | "exp",
    title: string,
    avg: number,
    word: string
  ) => (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className={label}>{title}</label>
      <div className="flex items-center gap-2">
        <input id={id} type="range" min={0} max={300} step={1} value={L[id]}
               onChange={(e) => setScale(id, Number(e.target.value))}
               className="min-w-0 flex-1 accent-bronze" />
        <span className="w-14 text-right font-mono text-sm font-semibold tabular-nums">
          {Math.round(L[id])}%
        </span>
      </div>
      <div className="flex items-center gap-1.5">
        <span className="text-[11.5px] text-stone">$</span>
        <MoneyInput
          ariaLabel={`${title} change in dollars per month`}
          display={dollars(L[id], avg)}
          onCommit={(raw) =>
            setScale(id, Math.min(300, Math.max(0, dollarsToPct(num(raw), avg))))
          }
          className={`${box} flex-1 text-right`}
        />
        <span className="text-[11.5px] text-stone">a month</span>
      </div>
      <p className="text-[11.5px] text-stone">{note(word, L[id])}</p>
    </div>
  );

  return (
    <div className="grid gap-5 p-5 sm:grid-cols-2 lg:grid-cols-4">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="startCash" className={label}>Cash on hand at start</label>
        <MoneyInput
          ariaLabel="Cash on hand at start"
          display={fmt2.format(model.startCash)}
          onCommit={(raw) => onStartCash(num(raw))}
          className={`${box} text-base font-semibold`}
        />
        <p className="text-[11.5px] text-stone">Opening balance for the first month.</p>
      </div>

      {scaleRow("inc", "Income", incAvg, "inflow")}
      {scaleRow("exp", "Expenses", expAvg, "outflow")}

      <div className="flex flex-col gap-1.5">
        <label htmlFor="stop" className={label}>Income stops after</label>
        <div className="flex items-center gap-2">
          <input id="stop" type="range" min={0} max={model.months.length} step={1} value={L.stop}
                 onChange={(e) => onLever({ stop: Number(e.target.value) })}
                 className="min-w-0 flex-1 accent-bronze" />
          <span className="w-14 text-right font-mono text-sm font-semibold">
            {L.stop === 0 ? "never" : model.months[L.stop - 1]?.split(" ")[0]}
          </span>
        </div>
        <p className="text-[11.5px] text-stone">Stress test: zero out income from that month on.</p>
      </div>
    </div>
  );
}
