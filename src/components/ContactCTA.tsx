import { site, addressOneLine } from "@/data/site";
import Reveal from "./Reveal";
import { Icon } from "./Icons";

export default function ContactCTA() {
  return (
    <section id="contact" className="bg-earth text-ivory">
      <div className="container-lux section-pad">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <span className="eyebrow-light">Get in touch</span>
            <h2 className="mt-5 font-display text-[clamp(2rem,4.2vw,3.2rem)] font-light leading-[1.08]">
              Let&apos;s talk.
            </h2>
            <p className="mt-6 max-w-lg text-[17px] leading-relaxed text-ivory/75">
              Whether you&apos;re an owner exploring management, a partner with land or a deal,
              an investor, or a guest planning a stay — we&apos;d love to hear from you.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <a href={`mailto:${site.email}`} className="btn-light">
                Email us
              </a>
              <a href="/contact/" className="link-underline text-ivory">
                Contact details
                <Icon name="arrow" width={16} height={16} />
              </a>
            </div>
          </Reveal>

          <Reveal delay={100} className="flex flex-col justify-center gap-6 border-t border-ivory/15 pt-10 lg:border-l lg:border-t-0 lg:pl-16 lg:pt-0">
            <div>
              <p className="eyebrow-light">Entity</p>
              <p className="mt-2 text-[15px] text-ivory/85">{site.dba}</p>
            </div>
            <div className="flex items-start gap-3">
              <Icon name="pin" width={20} height={20} className="mt-0.5 shrink-0 text-bronze-light" />
              <p className="text-[15px] text-ivory/85">{addressOneLine}</p>
            </div>
            <div className="flex items-center gap-3">
              <Icon name="mail" width={20} height={20} className="shrink-0 text-bronze-light" />
              <a href={`mailto:${site.email}`} className="text-[15px] text-ivory/85 hover:text-ivory">
                {site.email}
              </a>
            </div>
            <div className="flex items-center gap-3">
              <Icon name="phone" width={20} height={20} className="shrink-0 text-bronze-light" />
              <a href={site.phoneHref} className="text-[15px] text-ivory/85 hover:text-ivory">
                {site.phone}
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
