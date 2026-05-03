import { Inter } from "next/font/google";
import "./globals.css";
import AppShell from "@/components/AppShell";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata = {
  title: "GLA Events Platform",
  description: "Discover and engage with events at GLA University",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-white text-neutral-900 antialiased`}>
        <AppShell>
          <main className="min-h-screen">{children}</main>
        </AppShell>
      </body>
    </html>
  );
}
