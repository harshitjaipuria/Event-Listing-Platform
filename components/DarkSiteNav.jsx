"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/AuthProvider";

const navItems = [
  {
    href: "/explore",
    label: "Explore",
    isActive: (p) => p === "/explore" || /^\/events\/[^/]+$/.test(p),
  },
  { href: "/trending", label: "Trending", isActive: (p) => p === "/trending" },
  { href: "/clubs", label: "Clubs", isActive: (p) => p === "/clubs" },
  { href: "/upcoming", label: "Upcoming", isActive: (p) => p === "/upcoming" },
];

export default function DarkSiteNav() {
  const pathname = usePathname();
  const { openSignIn, openSignUp } = useAuth();

  return (
    <nav className="sticky top-6 z-40 mx-auto mb-12 flex max-w-6xl items-center justify-between rounded-2xl border border-white/10 bg-[#12131b]/70 px-6 py-4 backdrop-blur-xl">
      <Link href="/" className="text-lg font-black tracking-tight">
        GLA EVENTS
      </Link>
      <div className="hidden items-center gap-8 md:flex">
        {navItems.map((item) => {
          const active = item.isActive(pathname);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm font-semibold transition hover:text-white ${
                active ? "border-b-2 border-violet-400 pb-1 text-violet-300" : "text-slate-400"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
      <div className="flex items-center gap-3">
        <Button
          type="button"
          variant="ghost"
          className="hidden text-slate-300 hover:bg-white/10 hover:text-white sm:inline-flex"
          onClick={openSignIn}
        >
          Sign In
        </Button>
        <Button type="button" className="bg-violet-400 text-[#24085e] hover:bg-violet-300" onClick={openSignUp}>
          Sign Up
        </Button>
      </div>
    </nav>
  );
}
