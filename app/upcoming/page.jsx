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
import { CalendarDays, Clock, MapPin, User } from "lucide-react";

function getCountdown(dateString) {
  const target = new Date(dateString).getTime();
  const now = Date.now();
  const diff = Math.max(0, target - now);
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  return `${days}d ${hours}h left`;
}

export default function UpcomingPage() {
  const [selectedEvent, setSelectedEvent] = useState(null);

  const now = new Date();
  const upcoming = events
    .filter((e) => new Date(e.date) >= now)
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <DarkPageShell>
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-2 text-3xl font-bold md:text-4xl">Upcoming</h1>
        <p className="mb-10 text-slate-400">Events scheduled from today onward.</p>

        {/* Event Detail Dialog */}
        <Dialog open={!!selectedEvent} onOpenChange={(open) => !open && setSelectedEvent(null)}>
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
                  {selectedEvent.trending ? (
                    <Badge className="border-orange-400/30 bg-orange-500/40 text-orange-100">Trending</Badge>
                  ) : null}
                </div>
              </div>

              <div className="min-h-0 flex-1 overflow-y-auto px-6 pb-6 pt-2">
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

        {/* Event List */}
        <div className="space-y-4">
          {upcoming.map((event) => (
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
              className="cursor-pointer border-white/10 bg-white/[0.03] backdrop-blur-xl outline-none transition-all hover:border-violet-400/20 hover:shadow-[0_0_20px_rgba(139,92,246,0.12)] focus-visible:ring-2 focus-visible:ring-violet-500/50"
            >
              <CardContent className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center">
                <img
                  src={event.bannerImage}
                  alt={event.title}
                  className="h-28 w-full rounded-xl object-cover sm:h-24 sm:w-40"
                />
                <div className="min-w-0 flex-1">
                  <h2 className="text-lg font-semibold text-white">{event.title}</h2>
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
                <span className="shrink-0 rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium text-slate-300">
                  {getCountdown(event.date)}
                </span>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DarkPageShell>
  );
}
