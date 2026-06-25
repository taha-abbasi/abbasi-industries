import { techCapabilities } from "@/data/services";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import { Icon, type IconName } from "./Icons";

export default function Technology() {
  return (
    <section id="technology" className="relative overflow-hidden bg-olive text-ivory">
      {/* subtle accent image */}
      <div className="absolute inset-0 -z-10 opacity-[0.12]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/technology.jpg"
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-olive/80" />
      </div>

      <div className="container-lux section-pad">
        <SectionHeading
          light
          eyebrow="Technology"
          title="Our edge is the software underneath."
          lead="Abbasi Industries runs on proprietary technology infrastructure built in-house. It is the reason our properties operate consistently, price intelligently, and delight guests at scale."
        />

        <div className="mt-16 grid gap-px overflow-hidden border border-ivory/10 bg-ivory/10 sm:grid-cols-2 lg:grid-cols-4">
          {techCapabilities.map((c, i) => (
            <Reveal key={c.title} delay={i * 80} className="flex flex-col bg-olive p-8">
              <Icon name={c.icon as IconName} width={28} height={28} className="text-bronze-light" />
              <h3 className="mt-6 font-display text-[1.3rem] font-light leading-snug text-ivory">
                {c.title}
              </h3>
              <p className="mt-3 text-[14px] leading-relaxed text-ivory/65">{c.blurb}</p>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-14 max-w-3xl border-l-2 border-bronze-light/60 pl-6">
          <p className="text-[16px] leading-relaxed text-ivory/80">
            Led by founder <span className="text-ivory">Taha Abbasi</span>, who brings two
            decades of software engineering and CTO leadership — including work with NASA JPL,
            Apple, National Geographic, and Turkish Airlines — to real estate and hospitality.
            The same rigor that ships mission-grade software now runs our portfolio.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
