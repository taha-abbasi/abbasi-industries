import { team } from "@/data/team";
import SectionHeading from "./SectionHeading";
import TeamCard from "./TeamCard";
import Reveal from "./Reveal";

export default function Leadership() {
  return (
    <section id="leadership" className="bg-bone">
      <div className="container-lux section-pad">
        <SectionHeading
          eyebrow="The people behind Abbasi Industries"
          title="Leadership"
          lead="A partnership of technology and hospitality — building a company that operates with both precision and warmth."
        />

        <div className="mt-16 grid gap-6 sm:grid-cols-2">
          {team.map((m, i) => (
            <Reveal key={m.name} delay={i * 90}>
              <TeamCard member={m} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
