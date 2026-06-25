import Reveal from "./Reveal";

export default function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "left",
  light = false,
  className = "",
}: {
  eyebrow?: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  align?: "left" | "center";
  light?: boolean;
  className?: string;
}) {
  const alignCls = align === "center" ? "text-center mx-auto items-center" : "text-left items-start";
  return (
    <Reveal className={`flex max-w-3xl flex-col ${alignCls} ${className}`}>
      {eyebrow && (
        <span className={light ? "eyebrow-light" : "eyebrow"}>{eyebrow}</span>
      )}
      <h2
        className={`mt-5 font-display text-[clamp(2rem,4.5vw,3.4rem)] font-light leading-[1.08] ${
          light ? "text-ivory" : "text-ink"
        }`}
      >
        {title}
      </h2>
      {lead && (
        <p
          className={`mt-6 max-w-2xl text-pretty text-[17px] leading-relaxed ${
            light ? "text-ivory/70" : "text-ink-soft/80"
          }`}
        >
          {lead}
        </p>
      )}
    </Reveal>
  );
}
