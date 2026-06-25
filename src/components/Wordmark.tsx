import Link from "next/link";
import BrandMark from "./BrandMark";

export default function Wordmark({
  className = "",
  showMicroline = true,
}: {
  className?: string;
  showMicroline?: boolean;
}) {
  return (
    <Link
      href="/"
      className={`group inline-flex items-center gap-3 ${className}`}
      aria-label="Abbasi Industries — home"
    >
      <BrandMark size={32} className="shrink-0" />
      <span className="flex flex-col leading-none">
        <span className="font-display text-[19px] font-medium tracking-[0.16em]">
          ABBASI INDUSTRIES
        </span>
        {showMicroline && (
          <span className="mt-1 font-sans text-[9px] font-medium uppercase tracking-[0.28em] opacity-60">
            Real Estate · Hospitality · Technology
          </span>
        )}
      </span>
    </Link>
  );
}
