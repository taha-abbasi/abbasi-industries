import { processSteps } from "@/data/services";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

export default function Process() {
  return (
    <section id="process" className="bg-ivory">
      <div className="container-lux section-pad">
        <SectionHeading
          eyebrow="Our approach"
          title="How we operate"
          lead="A repeatable playbook that turns properties into well-run, technology-driven hospitality businesses."
        />

        <div className="mt-16 border-t border-line">
          {processSteps.map((s, i) => (
            <Reveal
              key={s.n}
              delay={(i % 2) * 60}
              className="grid grid-cols-[auto_1fr] items-baseline gap-6 border-b border-line py-8 md:grid-cols-[120px_1fr_1.4fr] md:gap-10"
            >
              <span className="font-display text-[2.2rem] font-light text-bronze">{s.n}</span>
              <h3 className="font-display text-[1.5rem] font-light leading-snug text-ink md:text-[1.7rem]">
                {s.title}
              </h3>
              <p className="col-span-2 text-[15px] leading-relaxed text-ink-soft/80 md:col-span-1">
                {s.blurb}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
