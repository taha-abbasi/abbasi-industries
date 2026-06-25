import type { ReactNode } from "react";

export default function LegalShell({
  title,
  lastUpdated,
  children,
}: {
  title: string;
  lastUpdated: string;
  children: ReactNode;
}) {
  return (
    <>
      <section className="bg-earth text-ivory">
        <div className="container-lux pb-16 pt-36 md:pt-44">
          <span className="eyebrow-light">Legal</span>
          <h1 className="mt-5 font-display text-[clamp(2.2rem,5vw,3.6rem)] font-light leading-[1.06]">
            {title}
          </h1>
          <p className="mt-4 text-[13px] uppercase tracking-wide text-ivory/55">
            Last updated: {lastUpdated}
          </p>
        </div>
      </section>

      <section className="bg-ivory">
        <div className="container-lux section-pad">
          <article
            className="prose prose-neutral max-w-prose
              prose-headings:font-display prose-headings:font-light prose-headings:text-ink
              prose-h2:mt-12 prose-h2:text-[1.6rem]
              prose-p:text-ink-soft/85 prose-p:leading-relaxed
              prose-a:text-bronze prose-a:no-underline hover:prose-a:underline
              prose-strong:text-ink prose-li:text-ink-soft/85"
          >
            {children}
          </article>
        </div>
      </section>
    </>
  );
}
