import type { Metadata } from "next";
import { site, addressOneLine } from "@/data/site";
import { Icon } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${site.name} (${site.legalName}) — ${addressOneLine}. Email ${site.email} or call ${site.phone}.`,
  alternates: { canonical: "/contact/" },
};

const audiences = [
  { title: "Owners", note: "Explore management for your property or portfolio." },
  { title: "Partners", note: "Bring us land, a development, or a joint venture." },
  { title: "Investors", note: "Learn about opportunities across our asset classes." },
  { title: "Guests", note: "Questions about a stay or a booking." },
];

const mapSrc =
  "https://www.google.com/maps?q=159+West+Broadway,+Salt+Lake+City,+UT+84101&output=embed";

export default function ContactPage() {
  return (
    <>
      {/* Header */}
      <section className="bg-earth text-ivory">
        <div className="container-lux pb-20 pt-36 md:pb-24 md:pt-44">
          <span className="eyebrow-light">Contact</span>
          <h1 className="mt-5 max-w-3xl font-display text-[clamp(2.4rem,5.5vw,4rem)] font-light leading-[1.06]">
            Let&apos;s start a conversation.
          </h1>
          <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-ivory/75">
            We work with owners, partners, investors, and guests across our hospitality and
            real-estate portfolio. Reach out and we&apos;ll get back to you promptly.
          </p>
        </div>
      </section>

      {/* Details + map */}
      <section className="bg-ivory">
        <div className="container-lux section-pad">
          <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
            <div>
              <h2 className="font-display text-[1.9rem] font-light text-ink">Get in touch</h2>

              <div className="mt-8 space-y-7">
                <div className="flex items-start gap-4">
                  <Icon name="mail" width={22} height={22} className="mt-1 shrink-0 text-bronze" />
                  <div>
                    <p className="eyebrow">Email</p>
                    <a
                      href={`mailto:${site.email}`}
                      className="mt-1 block text-[17px] text-ink hover:text-bronze"
                    >
                      {site.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Icon name="phone" width={22} height={22} className="mt-1 shrink-0 text-bronze" />
                  <div>
                    <p className="eyebrow">Phone</p>
                    <a
                      href={site.phoneHref}
                      className="mt-1 block text-[17px] text-ink hover:text-bronze"
                    >
                      {site.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Icon name="pin" width={22} height={22} className="mt-1 shrink-0 text-bronze" />
                  <div>
                    <p className="eyebrow">Office</p>
                    <p className="mt-1 text-[17px] leading-relaxed text-ink">
                      {site.address.line1}, {site.address.line2}
                      <br />
                      {site.address.city}, {site.address.regionLong} {site.address.postal}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-10 border-t border-line pt-8">
                <p className="eyebrow">Business hours</p>
                <p className="mt-2 text-[15px] text-ink-soft/80">
                  Monday – Friday, 9:00 AM – 6:00 PM MT
                  <br />
                  Guest support available daily.
                </p>
              </div>

              <div className="mt-10 border-t border-line pt-8 text-[14px] leading-relaxed text-ink-soft/70">
                <p className="text-ink">{site.dba}</p>
                <p className="mt-1">A vertically integrated real estate, hospitality &amp; technology company.</p>
              </div>
            </div>

            {/* Map */}
            <div>
              <div className="overflow-hidden border border-line">
                <iframe
                  title={`Map of ${addressOneLine}`}
                  src={mapSrc}
                  className="h-[420px] w-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              <div className="mt-8 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2">
                {audiences.map((a) => (
                  <div key={a.title} className="bg-bone p-6">
                    <h3 className="font-display text-[1.25rem] font-light text-ink">{a.title}</h3>
                    <p className="mt-1 text-[14px] leading-relaxed text-ink-soft/75">{a.note}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
