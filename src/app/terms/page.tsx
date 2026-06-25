import type { Metadata } from "next";
import LegalShell from "@/components/LegalShell";
import { site, addressOneLine } from "@/data/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `Terms of Service for ${site.name} (${site.legalName}).`,
  alternates: { canonical: "/terms/" },
};

// Boilerplate — accurate to a static marketing site. Recommend founder/legal review before launch.
export default function TermsPage() {
  return (
    <LegalShell title="Terms of Service" lastUpdated="June 24, 2026">
      <p>
        These Terms of Service (&ldquo;Terms&rdquo;) govern your access to and use of the website
        operated by {site.legalName}, doing business as {site.name} (&ldquo;{site.name},&rdquo;
        &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;). By accessing or using this
        website, you agree to these Terms.
      </p>

      <h2>Use of the website</h2>
      <p>
        You may use this website for lawful purposes only. You agree not to use it in any way that
        could damage, disable, or impair the site, or interfere with any other party&apos;s use of
        it.
      </p>

      <h2>Services and information</h2>
      <p>
        The content on this website is provided for general informational purposes about our real
        estate, hospitality, and technology services. It does not constitute an offer, a binding
        commitment, or professional, financial, or investment advice. Specific engagements are
        governed by separate written agreements.
      </p>

      <h2>Intellectual property</h2>
      <p>
        All content on this website — including text, graphics, logos, and images — is the property
        of {site.legalName} or its licensors and is protected by applicable intellectual-property
        laws. You may not reproduce or distribute it without our prior written permission.
      </p>

      <h2>Third-party links</h2>
      <p>
        This website may contain links to third-party websites or services that we do not control.
        We are not responsible for the content or practices of those third parties.
      </p>

      <h2>Disclaimer of warranties</h2>
      <p>
        This website is provided &ldquo;as is&rdquo; and &ldquo;as available,&rdquo; without
        warranties of any kind, whether express or implied, including warranties of
        merchantability, fitness for a particular purpose, and non-infringement.
      </p>

      <h2>Limitation of liability</h2>
      <p>
        To the fullest extent permitted by law, {site.legalName} will not be liable for any
        indirect, incidental, special, consequential, or punitive damages arising out of or
        related to your use of this website.
      </p>

      <h2>Governing law</h2>
      <p>
        These Terms are governed by the laws of the State of Utah, without regard to its conflict
        of laws principles. Any disputes will be subject to the exclusive jurisdiction of the
        state and federal courts located in Salt Lake County, Utah.
      </p>

      <h2>Changes to these Terms</h2>
      <p>
        We may revise these Terms from time to time. The most current version will always be posted
        on this page with a revised &ldquo;Last updated&rdquo; date.
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
