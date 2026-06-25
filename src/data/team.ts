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
    // TODO: add a professional headshot at public/team/taha.jpg and set photo here.
    photo: "",
    bio: "Taha brings two decades of software engineering and CTO leadership to real estate and hospitality. He has built and scaled technology for NASA JPL, Apple, National Geographic, and Turkish Airlines, founded the health-technology company AskFlorence, and served as CTO of Ferrum Network. At Abbasi Industries he leads the proprietary automation infrastructure that runs every property — the company's core operating advantage.",
    tags: ["Technology", "Automation", "Real-estate operations"],
  },
  {
    name: "Nichell Logue",
    title: "Principal — Operations & Hospitality",
    // TODO: add a professional headshot at public/team/nichell.jpg and set photo here.
    photo: "",
    // TODO: confirm / expand bio with Nichell's full LinkedIn background
    // (linkedin.com/in/nichelllogue). Kept neutral & role-focused until confirmed.
    bio: "Nichell leads operations and guest experience at Abbasi Industries, setting the hospitality standards that define every stay. Based in Salt Lake City, she oversees on-the-ground operations, property performance, and the service culture across the portfolio — pairing meticulous execution with a genuine sense of welcome.",
    tags: ["Operations", "Guest experience", "Hospitality"],
  },
];
