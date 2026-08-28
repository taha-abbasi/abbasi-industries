"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { RunwayModel } from "@/lib/runway/types";
import { SEED, clone, compute, normalise } from "@/lib/runway/model";
import { money } from "@/lib/runway/format";
import Tiles from "./parts/Tiles";
import Chart from "./parts/Chart";
import Levers from "./parts/Levers";
import Ledger from "./parts/Ledger";

const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const HIST_MAX = 60;

const btn = "rounded-md border border-line bg-bone px-3 py-1.5 text-[12.5px] font-medium text-ink-soft transition hover:border-stone hover:bg-[#EFE7D8] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-line disabled:hover:bg-bone";
const btnStrong = "rounded-md border border-bronze bg-bone px-3 py-1.5 text-[12.5px] font-semibold text-[#856437] transition hover:bg-[#F0E7D6]";

export default function RunwayApp() {
  const [model, setModel] = useState<RunwayModel | null>(null);
  const [status, setStatus] = useState("");
  const [persisted, setPersisted] = useState(true);

  const history = useRef<string[]>([]);
  const hIndex = useRef(-1);
  const restoring = useRef(false);
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const histTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [, forceTick] = useState(0);

  /* ---------------------------------------------------------------- load */
  useEffect(() => {
    let live = true;
    fetch("/api/runway/model")
      .then((r) => r.json())
      .then((d) => {
        if (!live) return;
        const m = normalise(d.model);
        setModel(m);
        setPersisted(Boolean(d.persisted));
        history.current = [JSON.stringify(m)];
        hIndex.current = 0;
      })
      .catch(() => { if (live) setStatus("Could not load the model."); });
    return () => { live = false; };
  }, []);

  /* -------------------------------------------------------------- saving */
  const persist = useCallback((next: RunwayModel) => {
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {
      fetch("/api/runway/model", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model: next }),
      })
        .then((r) => setStatus(r.ok ? "Saved" : "Save failed"))
        .catch(() => setStatus("Save failed"));
    }, 600);
  }, []);

  const pushHistory = useCallback((next: RunwayModel) => {
    if (restoring.current) return;
    if (histTimer.current) clearTimeout(histTimer.current);
    histTimer.current = setTimeout(() => {
      const snap = JSON.stringify(next);
      if (snap === history.current[hIndex.current]) return;
      history.current = history.current.slice(0, hIndex.current + 1);
      history.current.push(snap);
      if (history.current.length > HIST_MAX) history.current.shift();
      hIndex.current = history.current.length - 1;
      forceTick((t) => t + 1);
    }, 400);
  }, []);

  /** Every mutation goes through here: set state, remember it, save it. */
  const apply = useCallback((fn: (draft: RunwayModel) => void) => {
    setModel((cur) => {
      if (!cur) return cur;
      const next = clone(cur);
      fn(next);
      pushHistory(next);
      persist(next);
      return next;
    });
  }, [persist, pushHistory]);

  const restore = useCallback((i: number) => {
    const snap = history.current[i];
    if (!snap) return;
    restoring.current = true;
    hIndex.current = i;
    const next = normalise(JSON.parse(snap));
    setModel(next);
    persist(next);
    restoring.current = false;
    forceTick((t) => t + 1);
  }, [persist]);

  const undo = useCallback(() => { if (hIndex.current > 0) restore(hIndex.current - 1); }, [restore]);
  const redo = useCallback(() => { if (hIndex.current < history.current.length - 1) restore(hIndex.current + 1); }, [restore]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!(e.metaKey || e.ctrlKey)) return;
      const k = e.key.toLowerCase();
      if (k === "y" || (k === "z" && e.shiftKey)) { e.preventDefault(); redo(); }
      else if (k === "z") { e.preventDefault(); undo(); }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [undo, redo]);

  useEffect(() => {
    if (!status) return;
    const t = setTimeout(() => setStatus(""), 2200);
    return () => clearTimeout(t);
  }, [status]);

  const c = useMemo(() => (model ? compute(model) : null), [model]);

  if (!model || !c) {
    return <p className="px-6 py-24 text-center text-sm text-stone">Loading the model…</p>;
  }

  const n = model.months.length;
  const canUndo = hIndex.current > 0;
  const canRedo = hIndex.current < history.current.length - 1;

  /* ------------------------------------------------------------- actions */
  const addMonth = () => apply((m) => {
    const last = m.months[m.months.length - 1] ?? "Jan 2026";
    const [mon, yr] = last.split(" ");
    let i = MONTHS.indexOf(mon), y = parseInt(yr, 10);
    if (i < 0 || !Number.isFinite(y)) m.months.push(`Month ${m.months.length + 1}`);
    else { i++; if (i > 11) { i = 0; y++; } m.months.push(`${MONTHS[i]} ${y}`); }
    m.groups.forEach((g) => g.rows.forEach((r) => r.v.push(0)));
  });

  const dropMonth = () => {
    if (n <= 1) return;
    const last = n - 1;
    const hasFigures = model.groups.some((g) => g.rows.some((r) => r.v[last]));
    if (hasFigures && !confirm(`Remove ${model.months[last]}?\n\nEvery figure in that column will be discarded. This cannot be undone.`)) return;
    apply((m) => {
      m.months.pop();
      m.groups.forEach((g) => g.rows.forEach((r) => r.v.pop()));
      if (m.levers.stop > m.months.length) m.levers.stop = 0;
    });
  };

  const exportCsv = () => {
    const q = (s: string) => `"${String(s).replace(/"/g, '""')}"`;
    const lines = [[q("Section"), q("Line item"), q("Note"), ...model.months.map(q)].join(",")];
    model.groups.forEach((g) => g.rows.forEach((r) => {
      const sign = g.kind === "income" ? 1 : -1;
      lines.push([q(g.name), q(r.name), q(r.note), ...r.v.map((v) => (v * sign).toFixed(2))].join(","));
    }));
    lines.push("");
    lines.push([q(""), q("Total in"), q(""), ...c.income.map((v) => v.toFixed(2))].join(","));
    lines.push([q(""), q("Total out"), q(""), ...c.spend.map((v) => (-v).toFixed(2))].join(","));
    lines.push([q(""), q("Net for the month"), q(""), ...c.net.map((v) => v.toFixed(2))].join(","));
    lines.push([q(""), q("Cash on hand, end of month"), q(""), ...c.bal.map((v) => v.toFixed(2))].join(","));
    download("ale-cash-runway.csv", lines.join("\n"), "text/csv");
    setStatus("CSV downloaded");
  };

  const resetBaseline = () => {
    if (!confirm("Discard the current figures and restore the agreed baseline?\n\nThat is the Aug 26 sheet plus: IVF $25,000 in January, all payoffs slid one month, opening cash $4,000, Buffer $5,000.")) return;
    const next = normalise(clone(SEED));
    setModel(next);
    history.current = [JSON.stringify(next)];
    hIndex.current = 0;
    persist(next);
    setStatus("Baseline restored");
  };

  return (
    <div className="mx-auto flex max-w-container flex-col gap-7 px-6 pb-16 pt-28">
      {!persisted && (
        <p className="rounded-md border border-line border-l-[3px] border-l-bronze bg-[#F0E7D6] px-4 py-3 text-[13px] text-ink-soft">
          No database is configured, so changes will not be kept. The figures below are the baseline.
        </p>
      )}

      <header className="flex flex-wrap items-end justify-between gap-4 border-b border-line pb-5">
        <div>
          <p className="mb-3 text-[11px] font-medium uppercase tracking-label text-bronze">
            Abbasi Logue Estates
          </p>
          <h1 className="font-display text-5xl font-light text-ink">Cash Runway</h1>
          <p className="mt-2 max-w-[58ch] text-[13.5px] text-stone">
            Every figure is editable and recalculates on the spot. Shared — Taha and Asad see the same numbers.
          </p>
        </div>
        <div className="flex flex-col items-start gap-2">
          <p className="font-mono text-[12.5px] text-ink-soft">
            <b>{model.months[0]}</b> → <b>{model.months[n - 1]}</b> · {n} {n === 1 ? "month" : "months"}
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <button className={btn} onClick={undo} disabled={!canUndo} title="Undo (⌘Z)">↶ Undo</button>
            <button className={btn} onClick={redo} disabled={!canRedo} title="Redo (⌘⇧Z)">↷ Redo</button>
            <span className="mx-0.5 h-5 w-px bg-line" aria-hidden />
            <button className={btn} onClick={addMonth}>+ Add month</button>
            <button className={btn} onClick={dropMonth} disabled={n <= 1}>− Remove {model.months[n - 1]}</button>
            <button className={btn} onClick={exportCsv}>Export CSV</button>
            <button className={btnStrong} onClick={resetBaseline}>Reset to baseline</button>
          </div>
          <p className="h-4 font-mono text-[11.5px] text-stone">{status}</p>
        </div>
      </header>

      <Tiles model={model} c={c} />

      <section className="rounded-lg border border-line bg-bone">
        <div className="flex flex-wrap items-baseline justify-between gap-2.5 border-b border-line px-6 py-3.5">
          <h2 className="font-display text-xl font-normal">Cash on hand, end of month</h2>
          <span className="text-xs text-stone">Dashed line marks zero. The red ring marks the low point.</span>
        </div>
        <div className="px-6 py-4"><Chart model={model} c={c} /></div>
      </section>

      <section className="rounded-lg border border-line bg-bone">
        <div className="flex flex-wrap items-baseline justify-between gap-2.5 border-b border-line px-6 py-3.5">
          <h2 className="font-display text-xl font-normal">What-if levers</h2>
          <span className="text-xs text-stone">Applied on top of the ledger — the underlying figures stay untouched.</span>
        </div>
        <Levers
          model={model} c={c}
          onStartCash={(v) => apply((m) => { m.startCash = v; })}
          onLever={(patch) => apply((m) => { Object.assign(m.levers, patch); })}
        />
      </section>

      <section className="rounded-lg border border-line bg-bone">
        <div className="flex flex-wrap items-baseline justify-between gap-2.5 border-b border-line px-6 py-3.5">
          <h2 className="font-display text-xl font-normal">The ledger</h2>
          <span className="text-xs text-stone">Expenses are entered as positive amounts — they are subtracted from cash.</span>
        </div>
        <Ledger
          model={model} c={c}
          onCell={(g, r, m, v) => apply((d) => { d.groups[g].rows[r].v[m] = v; })}
          onRowField={(g, r, f, v) => apply((d) => {
            const row = d.groups[g].rows[r];
            if (f === "name") row.name = v; else row.note = v;
          })}
          onAddRow={(g) => apply((d) => { d.groups[g].rows.push({ name: "New line", note: "", v: new Array(d.months.length).fill(0) }); })}
          onDeleteRow={(g, r) => apply((d) => { d.groups[g].rows.splice(r, 1); })}
          onDeleteGroup={(g) => {
            if (!confirm(`Delete the "${model.groups[g].name}" section and all its lines?`)) return;
            apply((d) => { d.groups.splice(g, 1); });
          }}
        />
        <div className="border-t border-line px-6 py-3 text-xs text-stone">
          Ending cash = opening cash + income − expenses, carried into the next month.
          Lowest point so far: {money(Math.min(...c.bal))}.
        </div>
      </section>
    </div>
  );
}

function download(name: string, text: string, mime: string) {
  const url = URL.createObjectURL(new Blob([text], { type: mime }));
  const a = document.createElement("a");
  a.href = url; a.download = name;
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
