import { site } from "@/data/site";
import { Icon } from "./Icons";

const trust = [
  "Short-Term Rentals",
  "Glamping & RV Resorts",
  "Self Storage",
  "Hospitality",
  "Real-Estate Technology",
];

export default function Hero() {
  return (
    <section className="relative flex min-h-[100svh] items-end overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/hero.jpg"
          alt="A luxury glamping resort in the Utah high desert at golden hour"
          className="h-full w-full animate-slow-zoom object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-earth/90 via-earth/40 to-earth/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-earth/70 to-transparent" />
      </div>

      <div className="container-lux pb-20 pt-36 text-ivory md:pb-28">
        <div className="max-w-4xl">
          <span className="eyebrow-light animate-fade-in">
            {site.name} · Salt Lake City, Utah
          </span>
          <h1 className="mt-7 animate-fade-up font-display text-[clamp(2.6rem,6.5vw,5.3rem)] font-light leading-[1.04] text-balance">
            Real estate, hospitality, and the technology that runs them.
          </h1>
          <p
            className="mt-7 max-w-2xl animate-fade-up text-pretty text-[18px] leading-relaxed text-ivory/80"
            style={{ animationDelay: "120ms" }}
          >
            A vertically integrated operating company building and managing short-term
            rentals, glamping resorts, and real-estate ventures on proprietary automation
            infrastructure — rooted in Utah, expanding to strategic markets nationwide.
          </p>

          <div
            className="mt-10 flex animate-fade-up flex-wrap items-center gap-4"
            style={{ animationDelay: "220ms" }}
          >
            <a href="/#services" className="btn-light">
              Explore what we do
            </a>
            <a href="/contact/" className="link-underline text-ivory">
              Talk to our team
              <Icon name="arrow" width={16} height={16} />
            </a>
          </div>

          <div
            className="mt-14 flex animate-fade-in flex-wrap gap-x-6 gap-y-2 border-t border-ivory/15 pt-6 text-[11px] uppercase tracking-wide text-ivory/55"
            style={{ animationDelay: "320ms" }}
          >
            {trust.map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
