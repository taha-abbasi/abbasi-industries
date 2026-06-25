import { focusAreas } from "@/data/markets";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import { Icon } from "./Icons";

// Stylized Utah silhouette (rectangle with the characteristic NE notch).
function UtahMap() {
  return (
    <svg viewBox="0 0 220 260" className="h-auto w-full max-w-[360px]" role="img" aria-label="Map of Utah with our home base in Salt Lake City">
      <polygon
        points="6,6 140,6 140,76 214,76 214,254 6,254"
        fill="#9A7B4F"
        fillOpacity="0.08"
        stroke="#9A7B4F"
        strokeOpacity="0.55"
        strokeWidth="1.3"
      />
      {/* secondary focus dots */}
      {[
        [126, 180],
        [64, 150],
        [150, 215],
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="3" fill="#9A7B4F" fillOpacity="0.55" />
      ))}
      {/* Salt Lake City — home base */}
      <circle cx="84" cy="64" r="14" fill="#9A7B4F" fillOpacity="0.15" />
      <circle cx="84" cy="64" r="5" fill="#9A7B4F" />
      <text
        x="98"
        y="68"
        fill="#3A352D"
        fontSize="11"
        fontFamily="var(--font-jost), sans-serif"
        letterSpacing="0.5"
      >
        Salt Lake City
      </text>
    </svg>
  );
}

export default function Markets() {
  return (
    <section id="markets" className="bg-ivory">
      <div className="container-lux section-pad">
        <SectionHeading
          eyebrow="Markets"
          title={
            <>
              Rooted in Utah.
              <br />
              Built to expand.
            </>
          }
          lead="We operate from Salt Lake City and focus on Utah's outdoor-recreation corridors — then carry the same playbook into select high-growth markets nationwide."
        />

        <div className="mt-16 grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal className="flex justify-center rounded-sm border border-line bg-bone p-10">
            <UtahMap />
          </Reveal>

          <div className="grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-1">
            {focusAreas.map((f, i) => (
              <Reveal
                key={f.region}
                delay={i * 60}
                className="flex items-start gap-4 bg-ivory p-6"
              >
                <Icon name="pin" width={20} height={20} className="mt-1 shrink-0 text-bronze" />
                <div>
                  <h3 className="font-display text-[1.25rem] font-light text-ink">{f.region}</h3>
                  <p className="mt-1 text-[14px] leading-relaxed text-ink-soft/75">{f.note}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
