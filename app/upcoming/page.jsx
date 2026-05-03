import DarkPageShell from "@/components/DarkPageShell";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { events } from "@/lib/data";
import Link from "next/link";
import { CalendarDays, MapPin } from "lucide-react";

export default function UpcomingPage() {
  const now = new Date();
  const upcoming = events
    .filter((e) => new Date(e.date) >= now)
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <DarkPageShell>
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-2 text-3xl font-bold md:text-4xl">Upcoming</h1>
        <p className="mb-10 text-slate-400">Events scheduled from today onward.</p>
        <div className="space-y-4">
          {upcoming.map((event) => (
            <Card
              key={event._id}
              className="border-white/10 bg-white/[0.03] backdrop-blur-xl transition-all hover:border-violet-400/20"
            >
              <CardContent className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center">
                <img src={event.bannerImage} alt={event.title} className="h-28 w-full rounded-xl object-cover sm:h-24 sm:w-40" />
                <div className="min-w-0 flex-1">
                  <h2 className="text-lg font-semibold">{event.title}</h2>
                  <div className="mt-2 flex flex-wrap gap-3 text-sm text-slate-400">
                    <span className="inline-flex items-center gap-1">
                      <CalendarDays className="h-4 w-4" />
                      {new Date(event.date).toLocaleDateString()} • {event.time}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {event.venue}
                    </span>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <Badge variant="secondary" className="border-white/10 bg-violet-500/20 text-violet-200">
                      {event.type}
                    </Badge>
                    <Badge variant="outline" className="border-white/20 text-slate-300">
                      {event.department}
                    </Badge>
                  </div>
                </div>
                <Button className="shrink-0 bg-violet-400 text-[#24085e] hover:bg-violet-300" asChild>
                  <Link href={`/events/${event._id}`}>Details</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DarkPageShell>
  );
}
