import Link from "next/link";
import { site } from "@/data/site";
import Wordmark from "./Wordmark";

const companyLinks = [
  { label: "Services", href: "/#services" },
  { label: "Technology", href: "/#technology" },
  { label: "Markets", href: "/#markets" },
  { label: "Leadership", href: "/#leadership" },
];

const legalLinks = [
  { label: "Contact", href: "/contact/" },
  { label: "Privacy Policy", href: "/privacy/" },
  { label: "Terms of Service", href: "/terms/" },
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-earth text-ivory">
      <div className="container-lux py-20">
        <div className="grid gap-14 md:grid-cols-[1.4fr_1fr_1fr]">
          {/* Brand + identity */}
          <div className="text-ivory">
            <Wordmark showMicroline={false} />
            <p className="mt-6 max-w-sm text-[15px] leading-relaxed text-ivory/65">
              A vertically integrated real estate, hospitality, and technology operating
              company. Short-term rentals, glamping, and real-estate ventures — run on
              proprietary automation.
            </p>
            <div className="mt-8 space-y-1 text-[14px] leading-relaxed text-ivory/70">
              <p className="text-ivory/90">{site.legalName}, dba {site.name}</p>
              <p>
                {site.address.line1}, {site.address.line2}
              </p>
              <p>
                {site.address.city}, {site.address.region} {site.address.postal}
              </p>
            </div>
          </div>

          {/* Company */}
          <div>
            <h3 className="eyebrow-light">Company</h3>
            <ul className="mt-6 space-y-3 text-[15px]">
              {companyLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-ivory/70 transition-colors duration-300 hover:text-ivory"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal + contact */}
          <div>
            <h3 className="eyebrow-light">Legal &amp; Contact</h3>
            <ul className="mt-6 space-y-3 text-[15px]">
              {legalLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-ivory/70 transition-colors duration-300 hover:text-ivory"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6 space-y-2 text-[15px]">
              <a
                href={`mailto:${site.email}`}
                className="block text-ivory/70 transition-colors duration-300 hover:text-ivory"
              >
                {site.email}
              </a>
              <a
                href={site.phoneHref}
                className="block text-ivory/70 transition-colors duration-300 hover:text-ivory"
              >
                {site.phone}
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-ivory/10 pt-8 text-[12px] uppercase tracking-wide text-ivory/45 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.legalName}. All rights reserved.
          </p>
          <p>Salt Lake City, Utah · Serving the United States</p>
        </div>
      </div>
    </footer>
  );
}
