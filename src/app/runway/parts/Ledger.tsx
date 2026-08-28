"use client";
import type { Computed, Group, RunwayModel } from "@/lib/runway/types";
import { cell, fmt0, money } from "@/lib/runway/format";
import { num } from "@/lib/runway/model";
import MoneyInput from "./MoneyInput";

type Props = {
  model: RunwayModel;
  c: Computed;
  onCell: (g: number, r: number, m: number, v: number) => void;
  onRowField: (g: number, r: number, field: "name" | "note", v: string) => void;
  onAddRow: (g: number) => void;
  onDeleteRow: (g: number, r: number) => void;
  onDeleteGroup: (g: number) => void;
};

const groupTotals = (g: Group, n: number) => {
  const t = new Array(n).fill(0);
  g.rows.forEach((r) => { for (let m = 0; m < n; m++) t[m] += r.v[m]; });
  return t;
};

const headCell = "sticky top-0 z-30 bg-bone px-3 py-3 text-[10.5px] font-semibold uppercase tracking-wide text-stone border-b border-line";
const numCell = "w-full min-w-[92px] rounded border border-transparent bg-transparent px-3 py-1.5 text-right font-mono text-[13.5px] tabular-nums text-ink outline-none hover:border-line focus:border-bronze focus:bg-ivory";

export default function Ledger(p: Props) {
  const { model, c } = p;
  const n = model.months.length;

  return (
    <div className="max-h-[74vh] overflow-auto overscroll-contain">
      <table className="w-full min-w-[820px] border-separate border-spacing-0 text-[13.5px]">
        <thead>
          <tr>
            <th className={`${headCell} sticky left-0 z-40 min-w-[390px] border-r border-line text-left`}>
              Line item
            </th>
            {model.months.map((m) => (
              <th key={m} className={`${headCell} text-right`}>{m}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {model.groups.map((g, gi) => (
            <FragmentGroup key={gi} gi={gi} g={g} n={n} {...p} />
          ))}
        </tbody>

        <tfoot>
          <FootRow label="Total in" cells={c.income.map((v) => fmt0.format(Math.round(v)))} tone="pos" top />
          <FootRow label="Total out" cells={c.spend.map((v) => `(${fmt0.format(Math.round(v))})`)} tone="neg" />
          <FootRow label="Net for the month" cells={c.net.map(money)} tones={c.net.map((v) => (v < 0 ? "neg" : "pos"))} />
          <FootRow label="Cash on hand, end of month" cells={c.bal.map(money)}
                   tones={c.bal.map((v) => (v < 0 ? "neg" : "pos"))} strong />
        </tfoot>
      </table>
    </div>
  );
}

function FragmentGroup({ g, gi, n, model, onCell, onRowField, onAddRow, onDeleteRow, onDeleteGroup }: Props & { g: Group; gi: number; n: number }) {
  const totals = groupTotals(g, n);
  return (
    <>
      <tr>
        <td className="sticky left-0 z-20 border-y border-line bg-[#EFE7D8] px-3 py-2 pl-8">
          <div className="flex items-center gap-2.5">
            <span className="flex-1 text-[11px] font-bold uppercase tracking-wide text-ink-soft">{g.name}</span>
            <button onClick={() => onAddRow(gi)}
                    className="rounded border border-line bg-bone px-2 py-0.5 text-[10.5px] hover:border-stone">
              + line
            </button>
            <button onClick={() => onDeleteGroup(gi)} title="Delete section"
                    className="rounded px-1 text-stone hover:bg-[#F4E4DE] hover:text-[#9B3A2E]">×</button>
          </div>
        </td>
        {model.months.map((m) => <td key={m} className="border-y border-line bg-[#EFE7D8]" />)}
      </tr>

      {g.rows.map((r, ri) => (
        <tr key={ri} className="group">
          <td className="sticky left-0 z-20 border-r border-line bg-bone pl-8 pr-3">
            <div className="flex min-h-[34px] items-center gap-2">
              <input value={r.name} title={r.name} aria-label="Line item name"
                     onChange={(e) => onRowField(gi, ri, "name", e.target.value)}
                     className="min-w-0 flex-1 rounded border border-transparent bg-transparent px-1.5 py-1 text-[13.5px] outline-none hover:border-line focus:border-bronze focus:bg-ivory" />
              <input value={r.note} title={r.note} placeholder="note" aria-label="Note"
                     onChange={(e) => onRowField(gi, ri, "note", e.target.value)}
                     className="w-[158px] flex-none rounded border border-transparent bg-transparent px-1.5 py-1 text-right text-[11px] italic text-stone outline-none hover:border-line focus:border-bronze focus:bg-ivory focus:not-italic focus:text-ink" />
              <button onClick={() => onDeleteRow(gi, ri)} title="Delete line"
                      className="flex-none rounded px-1 text-stone opacity-0 transition group-hover:opacity-100 hover:bg-[#F4E4DE] hover:text-[#9B3A2E]">×</button>
            </div>
          </td>
          {r.v.map((v, m) => (
            <td key={m}>
              <MoneyInput
                ariaLabel={`${r.name} ${model.months[m]}`}
                display={cell(v)}
                onCommit={(raw) => onCell(gi, ri, m, num(raw))}
                className={`${numCell} ${v === 0 ? "text-stone" : ""}`}
              />
            </td>
          ))}
        </tr>
      ))}

      <tr>
        <td className="sticky left-0 z-20 border-t border-line bg-bone px-3 py-2 pl-8 text-xs font-semibold text-stone">
          {g.name} subtotal
        </td>
        {totals.map((v, m) => (
          <td key={m} className="border-t border-line px-3 py-2 text-right font-mono text-[13px] font-semibold tabular-nums text-ink-soft">
            {g.kind === "income" ? fmt0.format(Math.round(v)) : `(${fmt0.format(Math.round(v))})`}
          </td>
        ))}
      </tr>
    </>
  );
}

function FootRow({ label, cells, tone, tones, strong, top }: {
  label: string; cells: string[]; tone?: "pos" | "neg"; tones?: ("pos" | "neg")[];
  strong?: boolean; top?: boolean;
}) {
  const colour = (i: number) => {
    const t = tones ? tones[i] : tone;
    return t === "neg" ? "text-[#9B3A2E]" : t === "pos" ? "text-[#4A6340]" : "text-ink-soft";
  };
  const rowCls = strong
    ? "sticky bottom-0 z-30 bg-bone border-t-2 border-ink"
    : `bg-bone ${top ? "border-t border-line" : ""}`;
  return (
    <tr>
      <td className={`sticky left-0 z-40 ${rowCls} border-r border-line px-3 py-2.5 pl-8 text-left text-[12.5px] font-semibold`}>
        {label}
      </td>
      {cells.map((v, i) => (
        <td key={i} className={`${rowCls} px-3 py-2.5 text-right font-mono tabular-nums ${strong ? "text-[15px] font-semibold" : "text-[13.5px]"} ${colour(i)}`}>
          {v}
        </td>
      ))}
    </tr>
  );
}
