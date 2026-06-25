import type { Metadata } from "next";
import LegalShell from "@/components/LegalShell";
import { site, addressOneLine } from "@/data/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy Policy for ${site.name} (${site.legalName}).`,
  alternates: { canonical: "/privacy/" },
};

// Boilerplate — accurate to a static marketing site. Recommend founder/legal review before launch.
export default function PrivacyPage() {
  return (
    <LegalShell title="Privacy Policy" lastUpdated="June 24, 2026">
      <p>
        This Privacy Policy describes how {site.legalName}, doing business as {site.name}{" "}
        (&ldquo;{site.name},&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;),
        handles information in connection with this website and our services.
      </p>

      <h2>Information we collect</h2>
      <p>
        This website is primarily informational. We do not require you to create an account or
        provide personal information to browse it. We collect personal information only when you
        choose to provide it to us — for example, when you contact us by email or telephone. That
        information may include your name, email address, phone number, and the contents of your
        message.
      </p>

      <h2>How we use information</h2>
      <p>We use the information you provide to:</p>
      <ul>
        <li>respond to your inquiries and communicate with you;</li>
        <li>provide, operate, and improve our services; and</li>
        <li>comply with our legal obligations.</li>
      </ul>

      <h2>How we share information</h2>
      <p>
        We do not sell your personal information. We may share information with service providers
        who perform services on our behalf (such as email and hosting providers), and as required
        by law or to protect our rights.
      </p>

      <h2>Cookies and analytics</h2>
      <p>
        This site may use basic, privacy-respecting analytics to understand aggregate traffic. We
        do not use this information to identify individual visitors. You can control cookies
        through your browser settings.
      </p>

      <h2>Data security and retention</h2>
      <p>
        We use reasonable administrative, technical, and physical safeguards to protect the
        information we hold, and we retain it only for as long as necessary for the purposes
        described above or as required by law.
      </p>

      <h2>Your choices</h2>
      <p>
        You may request access to, correction of, or deletion of the personal information you have
        provided to us by contacting us using the details below. We will respond consistent with
        applicable law.
      </p>

      <h2>Children&apos;s privacy</h2>
      <p>
        Our website and services are not directed to children under 13, and we do not knowingly
        collect personal information from children.
      </p>

      <h2>Changes to this policy</h2>
      <p>
        We may update this Privacy Policy from time to time. Updates will be posted on this page
        with a revised &ldquo;Last updated&rdquo; date.
      </p>

      <h2>Contact us</h2>
      <p>
        {site.dba}
        <br />
        {addressOneLine}
        <br />
        Email: <a href={`mailto:${site.email}`}>{site.email}</a>
        <br />
        Phone: <a href={site.phoneHref}>{site.phone}</a>
      </p>
    </LegalShell>
  );
}
