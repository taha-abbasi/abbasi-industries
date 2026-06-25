// Single source of truth for the business identity. Update here, it flows everywhere.

export const site = {
  name: "Abbasi Industries",
  legalName: "Abbasi Logue Estates, LLC",
  dba: "Abbasi Logue Estates, LLC, doing business as Abbasi Industries",
  tagline: "Real estate, hospitality, and the technology that runs them.",
  description:
    "Abbasi Industries is a vertically integrated operating company building and managing short-term rentals, glamping resorts, and real-estate ventures on proprietary automation infrastructure. Headquartered in Salt Lake City, Utah, expanding to strategic markets nationwide.",
  email: "ops@abbasiindustries.com",
  phone: "+1 (302) 219-4858",
  phoneHref: "tel:+13022194858",
  address: {
    line1: "159 West Broadway",
    line2: "Suite 200",
    city: "Salt Lake City",
    region: "UT",
    regionLong: "Utah",
    postal: "84101",
    country: "US",
  },
  // TODO: domain — confirmed apex once the user attaches it in Vercel.
  url: "https://abbasiindustries.com",
  foundingYear: 2024,
} as const;

export const addressOneLine = `${site.address.line1}, ${site.address.line2}, ${site.address.city}, ${site.address.regionLong} ${site.address.postal}`;

export const navLinks = [
  { label: "Services", href: "/#services" },
  { label: "Technology", href: "/#technology" },
  { label: "Markets", href: "/#markets" },
  { label: "Leadership", href: "/#leadership" },
  { label: "Contact", href: "/contact/" },
] as const;
