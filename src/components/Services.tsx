import { services } from "@/data/services";
import SectionHeading from "./SectionHeading";
import ServiceCard from "./ServiceCard";
import Reveal from "./Reveal";

export default function Services() {
  return (
    <section id="services" className="bg-ivory">
      <div className="container-lux section-pad">
        <SectionHeading
          eyebrow="Our business lines"
          title="What we operate"
          lead="A diversified portfolio across hospitality and real estate — unified by a single operating philosophy and one technology platform."
        />

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.key} delay={(i % 3) * 70} className={s.featured ? "md:col-span-2 lg:col-span-3" : ""}>
              <ServiceCard service={s} index={i} featured={s.featured} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
