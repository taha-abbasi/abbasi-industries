import type { Service } from "@/data/services";
import { Icon, type IconName } from "./Icons";

export default function ServiceCard({
  service,
  index,
  featured = false,
}: {
  service: Service;
  index: number;
  featured?: boolean;
}) {
  return (
    <article
      className={`group relative flex h-full flex-col overflow-hidden border border-line bg-bone transition-all duration-500 ease-lux hover:border-bronze/50 ${
        featured ? "md:flex-row" : ""
      }`}
    >
      <div
        className={`relative overflow-hidden ${
          featured ? "md:w-1/2" : "aspect-[16/10]"
        }`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={service.image}
          alt={service.title}
          className={`h-full w-full object-cover transition-transform duration-[1200ms] ease-lux group-hover:scale-[1.04] ${
            featured ? "min-h-[280px]" : ""
          }`}
        />
        <span className="absolute left-4 top-4 font-sans text-[11px] uppercase tracking-label text-ivory/90 [text-shadow:0_1px_3px_rgba(0,0,0,0.5)]">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <div className={`flex flex-1 flex-col p-7 ${featured ? "md:justify-center md:p-10" : ""}`}>
        <Icon name={service.icon as IconName} width={26} height={26} className="text-bronze" />
        <h3
          className={`mt-5 font-display font-light leading-snug text-ink ${
            featured ? "text-[clamp(1.6rem,2.6vw,2.2rem)]" : "text-[1.35rem]"
          }`}
        >
          {service.title}
        </h3>
        <p className="mt-3 text-[15px] leading-relaxed text-ink-soft/80">
          {service.blurb}
        </p>
        {featured && (
          <span className="eyebrow mt-7">Our lead offering</span>
        )}
      </div>
    </article>
  );
}
