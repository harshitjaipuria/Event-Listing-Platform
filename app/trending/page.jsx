"use client";

import { useState } from "react";
import DarkPageShell from "@/components/DarkPageShell";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { events } from "@/lib/data";
import { CalendarDays, Clock, Flame, MapPin, User } from "lucide-react";

const trending = events.filter((e) => e.trending);

function getCountdown(dateString) {
  const target = new Date(dateString).getTime();
  const now = Date.now();
  const diff = Math.max(0, target - now);
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  return `${days}d ${hours}h left`;
}

export default function TrendingPage() {
  const [selectedEvent, setSelectedEvent] = useState(null);

  function handleOpenChange(open) {
    if (!open) setSelectedEvent(null);
  }

  return (
    <DarkPageShell>
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-2 text-3xl font-bold md:text-4xl">Trending</h1>
        <p className="mb-10 text-slate-400">Events getting the most attention on campus right now.</p>

        {/* Event Detail Dialog */}
        <Dialog open={!!selectedEvent} onOpenChange={handleOpenChange}>
          {selectedEvent ? (
            <DialogContent className="flex h-auto max-h-[92vh] min-h-[min(52vh,480px)] w-[calc(100%-2rem)] max-w-lg flex-col gap-0 overflow-hidden p-0 sm:min-h-[min(58vh,560px)] sm:max-w-xl md:max-w-2xl md:min-h-[min(62vh,620px)] lg:max-w-3xl lg:min-h-[min(65vh,680px)]">
              <div className="relative h-44 shrink-0 overflow-hidden sm:h-52 md:h-56 lg:h-64">
                <img
                  src={selectedEvent.bannerImage}
                  alt={selectedEvent.title}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#14151c] to-transparent" />
                <div className="absolute bottom-3 left-4 right-14 flex flex-wrap gap-2">
                  <Badge className="border-0 bg-black/55 text-white backdrop-blur-sm">{selectedEvent.type}</Badge>
                  <Badge className="border-orange-400/30 bg-orange-500/40 text-orange-100">
                    <Flame className="mr-1 h-3 w-3" /> Trending
                  </Badge>
                </div>
              </div>

              <div className="min-h-0 flex-1 overflow-y-auto px-6 pb-2 pt-2">
                <DialogHeader className="space-y-3 px-0 pb-0 pt-2 text-left">
                  <DialogTitle className="pr-8 text-xl text-white">{selectedEvent.title}</DialogTitle>
                  <DialogDescription asChild>
                    <div className="flex flex-wrap gap-2">
                      {selectedEvent.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-violet-400/25 bg-violet-500/15 px-2.5 py-0.5 text-xs font-medium text-violet-200"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </DialogDescription>
                </DialogHeader>

                <p className="mt-4 text-sm leading-relaxed text-slate-300">{selectedEvent.description}</p>

                <div className="mt-5 grid gap-3 text-sm text-slate-300 sm:grid-cols-2">
                  <div className="flex items-start gap-2">
                    <CalendarDays className="mt-0.5 h-4 w-4 shrink-0 text-violet-400" />
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Date</p>
                      <p>{new Date(selectedEvent.date).toLocaleDateString(undefined, { dateStyle: "long" })}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Clock className="mt-0.5 h-4 w-4 shrink-0 text-violet-400" />
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Time</p>
                      <p>{selectedEvent.time}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 sm:col-span-2">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-violet-400" />
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Venue</p>
                      <p>{selectedEvent.venue}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 sm:col-span-2">
                    <User className="mt-0.5 h-4 w-4 shrink-0 text-violet-400" />
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Organizer</p>
                      <p>{selectedEvent.organizer}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap items-center gap-2">
                  <Badge variant="outline" className="border-white/20 text-slate-300">
                    {selectedEvent.department}
                  </Badge>
                  <span className="text-xs text-slate-500">
                    {selectedEvent.interestedCount ?? 0} students interested
                  </span>
                  <span className="rounded-full bg-white/10 px-2.5 py-1 text-xs font-medium text-slate-200">
                    {getCountdown(selectedEvent.date)}
                  </span>
                </div>
              </div>
            </DialogContent>
          ) : null}
        </Dialog>

        {/* Event Cards Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {trending.map((event) => (
            <Card
              key={event._id}
              role="button"
              tabIndex={0}
              onClick={() => setSelectedEvent(event)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setSelectedEvent(event);
                }
              }}
              className="h-full cursor-pointer overflow-hidden border-white/10 bg-white/[0.03] backdrop-blur-xl outline-none transition-all duration-300 hover:-translate-y-1 hover:border-violet-400/25 hover:shadow-[0_0_25px_rgba(167,139,250,0.15)] focus-visible:ring-2 focus-visible:ring-violet-500/50"
            >
              <div className="relative h-48 overflow-hidden">
                <img src={event.bannerImage} alt={event.title} className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f1015] via-transparent to-transparent opacity-80" />
                <Badge className="absolute left-3 top-3 border-orange-300/20 bg-orange-500/20 text-orange-200">
                  <Flame className="mr-1 h-3 w-3" /> Trending
                </Badge>
              </div>
              <CardContent className="p-5">
                <h2 className="line-clamp-2 text-lg font-semibold text-white">{event.title}</h2>
                <p className="mt-2 line-clamp-2 text-sm text-slate-400">{event.description}</p>
                <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-xs">
                  <span className="inline-flex items-center gap-1 text-slate-400">
                    <CalendarDays className="h-3.5 w-3.5" />
                    {new Date(event.date).toLocaleDateString()}
                  </span>
                  <span className="inline-flex items-center gap-1 text-slate-400">
                    <MapPin className="h-3.5 w-3.5" />
                    <span className="line-clamp-1">{event.venue}</span>
                  </span>
                </div>
                <p className="mt-3 text-xs uppercase tracking-wide text-violet-300">{event.department}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DarkPageShell>
  );
}
