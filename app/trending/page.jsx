import DarkPageShell from "@/components/DarkPageShell";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { events } from "@/lib/data";
import Link from "next/link";
import { Flame } from "lucide-react";

const trending = events.filter((e) => e.trending);

export default function TrendingPage() {
  return (
    <DarkPageShell>
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-2 text-3xl font-bold md:text-4xl">Trending</h1>
        <p className="mb-10 text-slate-400">Events getting the most attention on campus right now.</p>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {trending.map((event) => (
            <Card
              key={event._id}
              className="overflow-hidden border-white/10 bg-white/[0.03] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(167,139,250,0.15)]"
            >
              <div className="relative h-48">
                <img src={event.bannerImage} alt={event.title} className="h-full w-full object-cover" />
                <Badge className="absolute left-3 top-3 border-orange-300/20 bg-orange-500/20 text-orange-200">
                  <Flame className="mr-1 h-3 w-3" /> Trending
                </Badge>
              </div>
              <CardContent className="p-5">
                <h2 className="text-lg font-semibold">{event.title}</h2>
                <p className="mt-1 text-xs uppercase tracking-wide text-violet-300">
                  {event.venue} • {event.time}
                </p>
                <Button className="mt-4 w-full bg-white/5 text-violet-200 hover:bg-violet-500/20" asChild>
                  <Link href={`/events/${event._id}`}>View event</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DarkPageShell>
  );
}
