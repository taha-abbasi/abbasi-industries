import Reveal from "./Reveal";
import { Icon } from "./Icons";

const points = [
  "Design-led, experiential properties",
  "Automated, five-star guest journey",
  "Dynamic, data-driven revenue management",
  "Meticulous on-the-ground operations",
];

export default function Spotlight() {
  return (
    <section id="glamping" className="bg-bone">
      <div className="container-lux section-pad">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal className="relative order-2 lg:order-1">
            <div className="overflow-hidden border border-line">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/glamping.jpg"
                alt="A luxury glamping dome suite at dusk overlooking a desert valley"
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 hidden border border-bronze/40 bg-ivory px-7 py-5 sm:block">
              <p className="font-display text-[1.4rem] font-light text-ink">Lead offering</p>
              <p className="eyebrow mt-1">Glamping & STR</p>
            </div>
          </Reveal>

          <div className="order-1 lg:order-2">
            <Reveal>
              <span className="eyebrow">Glamping &amp; short-term rentals</span>
              <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3rem)] font-light leading-[1.1] text-ink">
                Unforgettable stays, run like software.
              </h2>
              <p className="mt-6 text-[17px] leading-relaxed text-ink-soft/80">
                Glamping is where our two strengths meet: design-driven hospitality and
                relentless operational technology. Our resorts and short-term rentals share a
                single operating engine — dynamic pricing, an automated guest experience, and
                disciplined on-site teams — so every stay feels effortless and every property
                performs.
              </p>
            </Reveal>

            <ul className="mt-9 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2">
              {points.map((p, i) => (
                <Reveal as="li" key={p} delay={i * 70} className="flex items-start gap-3 bg-bone p-5">
                  <Icon name="arrow" width={16} height={16} className="mt-1 shrink-0 text-bronze" />
                  <span className="text-[15px] leading-snug text-ink-soft">{p}</span>
                </Reveal>
              ))}
            </ul>

            <Reveal delay={120}>
              <a href="/#technology" className="link-underline mt-9 text-ink">
                See the technology behind it
                <Icon name="arrow" width={16} height={16} />
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
