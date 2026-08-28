import type { Metadata } from "next";
import UnlockForm from "./UnlockForm";

export const metadata: Metadata = {
  title: "Runway",
  robots: { index: false, follow: false, nocache: true },
};

export default function UnlockPage() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center px-6 pb-24 pt-36">
      <div className="w-full max-w-sm">
        <p className="mb-3 text-[11px] font-medium uppercase tracking-label text-bronze">
          Abbasi Logue Estates
        </p>
        <h1 className="mb-2 font-display text-4xl font-light text-ink">Cash Runway</h1>
        <p className="mb-8 text-sm text-stone">
          This page is private. Enter the PIN to continue.
        </p>
        <UnlockForm />
      </div>
    </main>
  );
}
