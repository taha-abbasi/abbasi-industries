import { positioning } from "@/data/markets";
import Reveal from "./Reveal";

export default function Positioning() {
  return (
    <section className="bg-earth text-ivory">
      <div className="container-lux section-pad">
        <Reveal>
          <p className="eyebrow-light">What we are</p>
          <p className="mt-6 max-w-4xl font-display text-[clamp(1.5rem,3vw,2.4rem)] font-light leading-snug text-ivory/95">
            One company across real estate, hospitality, and technology — operating every
            property like a product, with the discipline of an institution and the warmth of a
            true host.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-px overflow-hidden border border-ivory/10 bg-ivory/10 sm:grid-cols-2 lg:grid-cols-4">
          {positioning.map((p, i) => (
            <Reveal
              key={p.title}
              delay={i * 80}
              className="bg-earth p-8"
            >
              <span className="font-display text-[2.2rem] font-light text-bronze-light">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 font-display text-[1.3rem] font-light text-ivory">
                {p.title}
              </h3>
              <p className="mt-2 text-[14px] leading-relaxed text-ivory/60">{p.blurb}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
