import type { Member } from "@/data/team";

function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("");
}

export default function TeamCard({ member }: { member: Member }) {
  return (
    <article className="group flex flex-col border border-line bg-bone transition-colors duration-500 ease-lux hover:border-bronze/40">
      <div className="relative aspect-[4/5] overflow-hidden bg-earth">
        {member.photo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={member.photo}
            alt={member.name}
            className="h-full w-full object-cover transition-transform duration-[1200ms] ease-lux group-hover:scale-[1.03]"
          />
        ) : (
          // Elegant monogram placeholder (boutique-firm convention) until a headshot is added.
          <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-b from-olive to-earth">
            <span className="font-display text-[5.5rem] font-light leading-none text-ivory/85">
              {initials(member.name)}
            </span>
            <span className="mt-4 h-px w-12 bg-bronze-light/60" />
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-8">
        <h3 className="font-display text-[1.7rem] font-light leading-tight text-ink">
          {member.name}
        </h3>
        <p className="eyebrow mt-2">{member.title}</p>
        <p className="mt-5 text-[15px] leading-relaxed text-ink-soft/80">{member.bio}</p>
        <div className="mt-6 flex flex-wrap gap-2 border-t border-line pt-5">
          {member.tags.map((t) => (
            <span
              key={t}
              className="border border-line px-3 py-1 text-[11px] uppercase tracking-wide text-ink-soft/70"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
