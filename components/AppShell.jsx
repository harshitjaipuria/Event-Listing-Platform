"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import { AuthProvider } from "@/components/AuthProvider";

const DARK_LAYOUT_PATHS = new Set(["/", "/explore", "/trending", "/upcoming", "/clubs", "/signup", "/login"]);

export default function AppShell({ children }) {
  const pathname = usePathname();
  const hideGlobalNav = DARK_LAYOUT_PATHS.has(pathname);

  return (
    <AuthProvider>
      {!hideGlobalNav ? <Navbar /> : null}
      {children}
    </AuthProvider>
  );
}
