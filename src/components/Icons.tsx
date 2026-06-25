// Thin hairline line-icons (1.2 stroke) to match the restrained luxury aesthetic.
import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = (props: IconProps) => ({
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  ...props,
});

const Tent = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 3 3 20h18L12 3Z" />
    <path d="M12 3v17" />
    <path d="m12 12 5 8M12 12l-5 8" />
  </svg>
);
const Home = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M4 10.5 12 4l8 6.5" />
    <path d="M5 9.5V20h14V9.5" />
    <path d="M10 20v-6h4v6" />
  </svg>
);
const Building = (p: IconProps) => (
  <svg {...base(p)}>
    <rect x="5" y="3" width="14" height="18" />
    <path d="M9 7h2M13 7h2M9 11h2M13 11h2M9 15h2M13 15h2" />
    <path d="M10 21v-3h4v3" />
  </svg>
);
const Blueprint = (p: IconProps) => (
  <svg {...base(p)}>
    <rect x="3" y="4" width="18" height="16" rx="1" />
    <path d="M3 9h6v11M9 4v5M21 13h-6M15 9v11" />
  </svg>
);
const Rv = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M2 7h13v8H2z" />
    <path d="M15 9h4l3 3v3h-7z" />
    <circle cx="7" cy="17" r="2" />
    <circle cx="18" cy="17" r="2" />
    <path d="M5 7v-.5M9 11h2" />
  </svg>
);
const Lock = (p: IconProps) => (
  <svg {...base(p)}>
    <rect x="5" y="10" width="14" height="10" rx="1.5" />
    <path d="M8 10V7a4 4 0 0 1 8 0v3" />
    <path d="M12 14v2" />
  </svg>
);
const Star = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 3.5 14.6 9l6 .6-4.5 4 1.3 5.9L12 16.6 6.6 19.5l1.3-5.9-4.5-4 6-.6L12 3.5Z" />
  </svg>
);
const Code = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="m8 8-4 4 4 4M16 8l4 4-4 4M13.5 6l-3 12" />
  </svg>
);
const Automation = (p: IconProps) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="3" />
    <path d="M12 4v2M12 18v2M4 12h2M18 12h2M6.3 6.3l1.4 1.4M16.3 16.3l1.4 1.4M17.7 6.3l-1.4 1.4M7.7 16.3l-1.4 1.4" />
  </svg>
);
const Pricing = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M4 19V5M4 19h16" />
    <path d="m7 14 3-3 3 2 4-5" />
  </svg>
);
const Guest = (p: IconProps) => (
  <svg {...base(p)}>
    <circle cx="12" cy="8" r="3.2" />
    <path d="M5.5 20a6.5 6.5 0 0 1 13 0" />
  </svg>
);
const Analytics = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M4 4v16h16" />
    <path d="M8 16v-4M12 16V8M16 16v-7" />
  </svg>
);
const Arrow = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);
const Mail = (p: IconProps) => (
  <svg {...base(p)}>
    <rect x="3" y="5" width="18" height="14" rx="1.5" />
    <path d="m4 7 8 6 8-6" />
  </svg>
);
const Phone = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M5 4h3l1.5 4-2 1.5a11 11 0 0 0 5 5l1.5-2 4 1.5v3a2 2 0 0 1-2 2A15 15 0 0 1 3 6a2 2 0 0 1 2-2Z" />
  </svg>
);
const Pin = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11Z" />
    <circle cx="12" cy="10" r="2.5" />
  </svg>
);
const Menu = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </svg>
);
const Close = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);

export const ICONS = {
  tent: Tent,
  home: Home,
  building: Building,
  blueprint: Blueprint,
  rv: Rv,
  lock: Lock,
  star: Star,
  code: Code,
  automation: Automation,
  pricing: Pricing,
  guest: Guest,
  analytics: Analytics,
  arrow: Arrow,
  mail: Mail,
  phone: Phone,
  pin: Pin,
  menu: Menu,
  close: Close,
} as const;

export type IconName = keyof typeof ICONS;

export function Icon({ name, ...props }: { name: IconName } & IconProps) {
  const Cmp = ICONS[name];
  return <Cmp {...props} />;
}
