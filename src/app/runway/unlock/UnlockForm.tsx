"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function UnlockForm() {
  const router = useRouter();
  const [pin, setPin] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (busy || !pin) return;
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/runway/unlock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pin }),
      });
      if (res.ok) {
        router.replace("/runway");
        router.refresh();
        return;
      }
      const data = await res.json().catch(() => ({}));
      if (data.error === "locked-out") {
        setError(`Too many attempts. Try again in ${data.minutes} minutes.`);
      } else if (data.error === "not-configured") {
        setError("No PIN has been set for this site yet.");
      } else {
        const left = typeof data.remaining === "number" ? data.remaining : null;
        setError(left === null ? "That PIN is not right." : `That PIN is not right. ${left} ${left === 1 ? "try" : "tries"} left.`);
      }
      setPin("");
    } catch {
      setError("Could not reach the server. Check your connection.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={submit} className="flex flex-col gap-4">
      <label htmlFor="pin" className="sr-only">PIN</label>
      <input
        id="pin"
        type="password"
        inputMode="numeric"
        autoComplete="off"
        autoFocus
        value={pin}
        onChange={(e) => setPin(e.target.value.replace(/\D/g, "").slice(0, 12))}
        placeholder="••••"
        className="w-full rounded-md border border-line bg-bone px-4 py-3 text-center font-mono text-2xl tracking-[0.4em] text-ink outline-none transition focus:border-bronze"
      />
      <button
        type="submit"
        disabled={busy || !pin}
        className="rounded-md bg-bronze px-4 py-3 text-sm font-medium text-ivory transition hover:bg-bronze-light disabled:cursor-not-allowed disabled:opacity-40"
      >
        {busy ? "Checking…" : "Unlock"}
      </button>
      {error && (
        <p role="alert" className="text-sm text-[#9B3A2E]">{error}</p>
      )}
    </form>
  );
}
