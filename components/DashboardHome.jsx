import { events, clubs } from "@/lib/data";
import DarkPageShell from "@/components/DarkPageShell";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowRight,
  Bolt,
  Bookmark,
  CircleDot,
  Flame,
  Music2,
  Palette,
  Rocket,
  Search,
  Terminal,
  Users,
} from "lucide-react";
import Link from "next/link";

const trendEvents = events.filter((event) => event.trending).slice(0, 3);
const smartEvents = events.slice(0, 3);
const clubIcons = [Terminal, Palette, Music2, Rocket];

function GlassCard({ children, className = "" }) {
  return (
    <Card className={`border-white/10 bg-white/[0.03] backdrop-blur-xl ${className}`}>
      <CardContent className="p-0">{children}</CardContent>
    </Card>
  );
}

export default function DashboardHome() {
  return (
    <DarkPageShell>
      <section className="mx-auto mb-20 max-w-5xl text-center">
        <Badge className="mb-6 border-violet-300/30 bg-violet-500/10 text-cyan-300">Live Campus Pulse</Badge>
        <h1 className="mx-auto max-w-4xl text-4xl font-bold leading-tight text-white md:text-6xl">
          Explore the Pulse of Campus Life
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-base text-slate-300 md:text-lg">
          Join creators, coders, and communities. Discover the most exciting events happening across GLA.
        </p>
        <GlassCard className="mx-auto mt-8 max-w-2xl">
          <div className="flex items-center gap-2 p-2">
            <Search className="ml-3 h-5 w-5 text-slate-400" />
            <input
              placeholder="Find your next vibe..."
              className="h-12 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
            />
            <Button className="bg-cyan-300 text-slate-950 hover:bg-cyan-200" asChild>
              <Link href="/explore">Search</Link>
            </Button>
          </div>
        </GlassCard>
      </section>

      <GlassCard className="mb-16">
        <div className="grid gap-6 p-6 md:grid-cols-3">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-lime-300/10 p-3 text-lime-300">
              <Bolt className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.16em] text-slate-400">What&apos;s happening now</p>
              <p className="text-lg font-semibold">4.2k Students Active</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-violet-300/10 p-3 text-violet-300">
              <Users className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.16em] text-slate-400">Live registrations</p>
              <p className="text-lg font-semibold">Glow Fest &apos;24</p>
            </div>
          </div>
          <div>
            <div className="mb-2 flex justify-between text-xs uppercase tracking-[0.16em] text-slate-400">
              <span>Capacity</span>
              <span className="text-cyan-300">88%</span>
            </div>
            <div className="h-2 rounded-full bg-white/10">
              <div className="h-full w-[88%] rounded-full bg-gradient-to-r from-cyan-300 to-violet-400" />
            </div>
          </div>
        </div>
      </GlassCard>

      <section id="trending" className="mb-16 scroll-mt-24">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-semibold">Trending Vibes</h2>
            <p className="text-slate-400">Most anticipated events on campus this week.</p>
          </div>
          <Button variant="ghost" className="text-violet-300 hover:bg-white/10" asChild>
            <Link href="/trending">
              View All <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="flex gap-5 overflow-x-auto pb-2">
          {trendEvents.map((event) => (
            <GlassCard
              key={event._id}
              className="min-w-[330px] overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(167,139,250,0.15)]"
            >
              <div className="relative h-52">
                <img src={event.bannerImage} alt={event.title} className="h-full w-full object-cover" />
                <Badge className="absolute left-3 top-3 border-orange-300/20 bg-orange-500/20 text-orange-200">
                  <Flame className="mr-1 h-3 w-3" /> Trending
                </Badge>
              </div>
              <div className="p-5">
                <h3 className="text-xl font-semibold">{event.title}</h3>
                <p className="mt-1 text-xs uppercase tracking-wide text-violet-300">
                  {event.venue} • {event.time}
                </p>
                <Button className="mt-4 w-full bg-white/5 text-violet-200 hover:bg-violet-500/20" asChild>
                  <Link href={`/events/${event._id}`}>Secure Spot</Link>
                </Button>
              </div>
            </GlassCard>
          ))}
        </div>
      </section>

      <section id="upcoming" className="mb-16 scroll-mt-24">
        <div className="mb-6 flex items-end justify-between">
          <h2 className="text-3xl font-semibold">Upcoming</h2>
          <Button variant="ghost" className="text-violet-300 hover:bg-white/10" asChild>
            <Link href="/upcoming">
              View All <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <p className="mb-6 text-slate-400">Featured highlights and what&apos;s next on campus.</p>
        <div className="grid gap-6 md:grid-cols-3">
          <GlassCard className="relative overflow-hidden md:col-span-2 md:min-h-[420px]">
            <img src={smartEvents[0].bannerImage} alt={smartEvents[0].title} className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
            <div className="relative flex h-full flex-col justify-end p-8">
              <Badge className="mb-4 w-fit bg-cyan-300 text-cyan-950">Featured Highlight</Badge>
              <h3 className="text-3xl font-bold">{smartEvents[0].title}</h3>
              <p className="mt-3 max-w-xl text-slate-300">{smartEvents[0].description}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button className="bg-violet-400 text-[#2e0d72] hover:bg-violet-300" asChild>
                  <Link href={`/events/${smartEvents[0]._id}`}>Join the Challenge</Link>
                </Button>
                <Button variant="outline" className="border-white/30 bg-white/5 text-white hover:bg-white/10" asChild>
                  <Link href={`/events/${smartEvents[0]._id}`}>Learn More</Link>
                </Button>
              </div>
            </div>
          </GlassCard>

          {smartEvents.slice(1).map((event) => (
            <GlassCard key={event._id} className="overflow-hidden">
              <div className="h-44">
                <img src={event.bannerImage} alt={event.title} className="h-full w-full object-cover" />
              </div>
              <div className="p-5">
                <h4 className="text-xl font-semibold">{event.title}</h4>
                <p className="mt-2 text-sm text-slate-300">{event.description}</p>
                <div className="mt-4 flex items-center justify-between text-xs uppercase tracking-[0.12em]">
                  <span className="text-cyan-300">{event.type}</span>
                  <Bookmark className="h-4 w-4 text-violet-300" />
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </section>

      <section className="mb-20">
        <div className="mb-8 flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
          <div>
            <h2 className="text-3xl font-semibold">Elite Guilds & Clubs</h2>
            <p className="text-slate-400">Fuel your passion with like-minded creators.</p>
          </div>
          <Button variant="ghost" className="text-violet-300 hover:bg-white/10" asChild>
            <Link href="/clubs">
              View all clubs <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {clubs.map((club, index) => {
            const Icon = clubIcons[index % clubIcons.length];
            return (
              <Link key={club._id} href="/clubs">
                <GlassCard className="border-white/5 p-6 text-center transition-all duration-300 hover:border-violet-400/30 hover:bg-violet-500/10">
                  <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-300/10 text-violet-300">
                    <Icon className="h-7 w-7" />
                  </div>
                  <p className="font-semibold">{club.name}</p>
                  <p className="mt-1 text-xs uppercase tracking-wide text-slate-400">
                    {300 + index * 120} Members
                  </p>
                </GlassCard>
              </Link>
            );
          })}
        </div>
      </section>

      <footer className="border-t border-white/10 py-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-lg font-bold">GLA EVENTS</p>
            <p className="text-sm text-slate-400">© 2026 GLA Events. Built for the electric academic.</p>
          </div>
          <div className="flex gap-6 text-sm text-slate-400">
            <a href="#" className="transition hover:text-violet-300">
              Privacy Policy
            </a>
            <a href="#" className="transition hover:text-violet-300">
              Terms
            </a>
            <a href="#" className="transition hover:text-violet-300">
              Support
            </a>
          </div>
          <div className="flex gap-2">
            <button type="button" className="rounded-full border border-white/10 p-2 text-slate-300 transition hover:bg-white/10">
              <CircleDot className="h-4 w-4" />
            </button>
            <button type="button" className="rounded-full border border-white/10 p-2 text-slate-300 transition hover:bg-white/10">
              <CircleDot className="h-4 w-4" />
            </button>
          </div>
        </div>
      </footer>
    </DarkPageShell>
  );
}
