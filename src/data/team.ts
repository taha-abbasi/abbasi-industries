export type Member = {
  name: string;
  title: string;
  // Drop a professional headshot at the given path and set `photo` to restore a real
  // portrait. Left empty for now → TeamCard renders an elegant monogram placeholder.
  photo?: string;
  bio: string;
  tags: string[];
};

export const team: Member[] = [
  {
    name: "Taha Abbasi",
    title: "Founder & Principal — Technology",
    photo: "/team/taha.jpg",
    bio: "Taha brings two decades of software engineering and CTO leadership to real estate and hospitality. He has built and scaled technology for NASA JPL, Apple, National Geographic, and Turkish Airlines, founded the health-technology company AskFlorence, and served as CTO of Ferrum Network. At Abbasi Industries he leads the proprietary automation infrastructure that runs every property — the company's core operating advantage.",
    tags: ["Technology", "Automation", "Real-estate operations"],
  },
  {
    name: "Nichell Logue",
    title: "Principal — Operations & Hospitality",
    photo: "/team/nichell.jpg",
    bio: "Nichell brings 23 years of operations and people leadership across global teams, M&A integrations, and scalable process design. She served as Operations & Human Resources Lead at Ferrum Network and spent nearly a decade at CSC leading enterprise operations and cross-border integrations across the United States, Singapore, and the United Kingdom. At Abbasi Industries she leads operations and guest experience — building the systems, standards, and on-the-ground hospitality that make every stay effortless.",
    tags: ["Operations", "People & Talent", "Guest experience"],
  },
];
