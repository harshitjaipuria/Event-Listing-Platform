"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";

const links = [
  { href: "/", label: "Home" },
  { href: "/explore", label: "Explore" },
  { href: "/trending", label: "Trending" },
  { href: "/clubs", label: "Clubs" },
  { href: "/upcoming", label: "Upcoming" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { openSignIn, openSignUp } = useAuth();

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-100 bg-white/90 backdrop-blur">
      <nav className="container-padded grid h-16 grid-cols-[1fr_auto_1fr] items-center">
        <Link href="/" className="text-lg font-semibold text-brand">
          GLA Events
        </Link>

        <div className="hidden items-center gap-1 justify-self-center rounded-2xl border border-neutral-100 bg-white p-1 shadow-sm md:flex">
          {links.map((link) => {
            let active = false;
            if (link.href === "/") {
              active = pathname === "/";
            } else if (link.href === "/explore") {
              active = pathname === "/explore" || /^\/events\/[^/]+$/.test(pathname);
            } else {
              active = pathname === link.href || pathname.startsWith(`${link.href}/`);
            }
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-xl px-3 py-1.5 text-sm transition ${
                  active ? "bg-brand text-white" : "text-neutral-700 hover:bg-brand-50 hover:text-brand"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center justify-self-end gap-2">
          <button
            type="button"
            className="rounded-xl px-4 py-2 text-sm font-semibold text-brand transition hover:bg-brand-50"
            onClick={openSignIn}
          >
            Login
          </button>
          <button
            type="button"
            className="rounded-xl bg-brand px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-600"
            onClick={openSignUp}
          >
            Sign Up
          </button>
        </div>
      </nav>
    </header>
  );
}
