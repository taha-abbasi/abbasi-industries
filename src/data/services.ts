export type Service = {
  key: string;
  title: string;
  blurb: string;
  icon: string; // key into Icons map
  image: string; // swap-ready
  featured?: boolean;
};

export const services: Service[] = [
  {
    key: "glamping",
    title: "Glamping Resorts & Experiential Hospitality",
    blurb:
      "Design-led outdoor stays — safari tents, cabins, and geodesic domes — engineered for unforgettable guest experiences in extraordinary places.",
    icon: "tent",
    image: "/images/glamping.jpg", // swap-ready
    featured: true,
  },
  {
    key: "str",
    title: "Short-Term Rental Management",
    blurb:
      "End-to-end STR operations — listings, dynamic pricing, guest communication, housekeeping, and maintenance — run on our own automation stack.",
    icon: "home",
    image: "/images/str.jpg", // swap-ready
  },
  {
    key: "portfolio",
    title: "Property & Portfolio Management",
    blurb:
      "Institutional-grade management for owners who want professional operations and transparent performance without the overhead.",
    icon: "building",
    image: "/images/property.jpg", // swap-ready
  },
  {
    key: "land",
    title: "Land Development & Commercial Real Estate",
    blurb:
      "Acquiring and developing land and commercial assets in high-growth corridors, from entitlement through stabilized operation.",
    icon: "blueprint",
    image: "/images/land.jpg", // swap-ready
  },
  {
    key: "rv",
    title: "RV Parks & RV Resorts",
    blurb:
      "Modern RV destinations with the amenities, design, and technology today's travelers actually expect.",
    icon: "rv",
    image: "/images/rv.jpg", // swap-ready
  },
  {
    key: "storage",
    title: "Self Storage — incl. RV & Boat",
    blurb:
      "Secure, well-located storage — including oversized RV and boat bays — operated on automated access, billing, and monitoring.",
    icon: "lock",
    image: "/images/storage.jpg", // swap-ready
  },
  {
    key: "hotels",
    title: "Hotels & Luxury Boutique Hotels",
    blurb:
      "Boutique hospitality with a distinct sense of place and a tech-enabled guest journey, from booking to checkout.",
    icon: "star",
    image: "/images/hotel.jpg", // swap-ready
  },
  {
    key: "technology",
    title: "Technology & Software Consultation",
    blurb:
      "We license and consult on the property-management, real-estate, and STR automation we built to run our own portfolio.",
    icon: "code",
    image: "/images/technology.jpg", // swap-ready
  },
];

export const techCapabilities = [
  {
    icon: "automation",
    title: "Property-Management Automation",
    blurb:
      "Operations, housekeeping, and maintenance orchestrated automatically across every property and asset class.",
  },
  {
    icon: "pricing",
    title: "Dynamic Pricing & Revenue Management",
    blurb:
      "Data-driven nightly rates and occupancy strategy that respond to demand, seasonality, and local events in real time.",
  },
  {
    icon: "guest",
    title: "Guest Experience Platform",
    blurb:
      "A seamless booking-to-checkout journey — messaging, access, and concierge — automated end to end.",
  },
  {
    icon: "analytics",
    title: "Real-Estate Operations & Analytics",
    blurb:
      "Portfolio, deal, and performance tooling that turns scattered property data into clear, actionable insight.",
  },
];

export const processSteps = [
  {
    n: "01",
    title: "Acquire & develop",
    blurb:
      "We identify, underwrite, and develop properties in markets with real demand and room to grow.",
  },
  {
    n: "02",
    title: "Instrument with our software",
    blurb:
      "Every property runs on our automation stack from day one — pricing, operations, and the guest journey.",
  },
  {
    n: "03",
    title: "Operate with hospitality",
    blurb:
      "Five-star guest experience, backed by on-the-ground teams and meticulous standards.",
  },
  {
    n: "04",
    title: "Optimize continuously",
    blurb:
      "Dynamic pricing and live data drive occupancy, revenue, and margin across the portfolio.",
  },
  {
    n: "05",
    title: "Scale the playbook",
    blurb:
      "We repeat the model across asset classes and into new strategic markets.",
  },
];
