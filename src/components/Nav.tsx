"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navLinks } from "@/data/site";
import Wordmark from "./Wordmark";
import { Icon } from "./Icons";

export default function Nav() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll + Escape-to-close for the mobile drawer
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Solid (ivory) when scrolled or on any non-home page; transparent over the hero on home.
  const solid = scrolled || !isHome;

  return (
    <>
      <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-lux ${
        solid
          ? "border-b border-line/80 bg-ivory/95 backdrop-blur-sm py-3"
          : "border-b border-transparent bg-transparent py-5"
      }`}
    >
      <nav className="container-lux flex items-center justify-between">
        <div className={solid ? "text-ink" : "text-ivory"}>
          <Wordmark showMicroline={false} />
        </div>

        <div
          className={`hidden items-center gap-9 lg:flex ${
            solid ? "text-ink" : "text-ivory"
          }`}
        >
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="link-underline opacity-85 hover:opacity-100"
            >
              {l.label}
            </Link>
          ))}
          <a
            href="/contact/"
            className={solid ? "btn" : "btn-light"}
          >
            Get in touch
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          className={`lg:hidden ${solid ? "text-ink" : "text-ivory"}`}
        >
          <Icon name="menu" width={26} height={26} />
        </button>
      </nav>
      </header>

      {/* Mobile drawer — rendered as a sibling of <header>, not a child: the
          header's backdrop-blur creates a containing block that would otherwise
          break this position:fixed overlay (it stopped covering the viewport
          when scrolled, leaving the menu unreadable past the hero). */}
      <div
        className={`fixed inset-0 z-[60] bg-earth text-ivory transition-opacity duration-500 ease-lux lg:hidden ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div className="container-lux flex items-center justify-between py-5">
          <div className="text-ivory">
            <Wordmark showMicroline={false} />
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="text-ivory"
          >
            <Icon name="close" width={26} height={26} />
          </button>
        </div>
        <div className="container-lux mt-10 flex flex-col gap-2">
          {navLinks.map((l, i) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="border-b border-ivory/10 py-5 font-display text-3xl font-light"
              style={{ transitionDelay: `${i * 40}ms` }}
            >
              {l.label}
            </Link>
          ))}
          <a
            href="/contact/"
            onClick={() => setOpen(false)}
            className="btn-light mt-8 self-start"
          >
            Get in touch
          </a>
        </div>
      </div>
    </>
  );
}
