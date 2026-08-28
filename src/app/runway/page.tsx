import type { Metadata } from "next";
import RunwayApp from "./RunwayApp";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Runway",
  robots: { index: false, follow: false, nocache: true },
};

export default function RunwayPage() {
  return <RunwayApp />;
}
