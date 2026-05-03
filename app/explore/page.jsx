"use client";

import { useEffect, useMemo, useState } from "react";
import DarkPageShell from "@/components/DarkPageShell";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { events } from "@/lib/data";
import { useAuth } from "@/components/AuthProvider";
import { CalendarDays, Clock, MapPin, Search, SlidersHorizontal, Sparkles, User } from "lucide-react";

const departments = ["All", "Technology", "Management", "Science", "General"];
const eventTypes = [
  { value: "All", label: "All types" },
  { value: "workshop", label: "Workshop" },
  { value: "fest", label: "Fest" },
  { value: "hackathon", label: "Hackathon" },
  { value: "seminar", label: "Seminar" },
];
const dateFilters = [
  { value: "upcoming", label: "Upcoming" },
  { value: "past", label: "Past" },
  { value: "all", label: "All dates" },
];

function getCountdown(dateString) {
  const target = new Date(dateString).getTime();
  const now = Date.now();
  const diff = Math.max(0, target - now);
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  return `${days}d ${hours}h left`;
}

function DarkChipRow({ label, children }) {
  return (
    <div className="space-y-2">
      <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-500">{label}</span>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

function DarkChip({ active, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition-all active:scale-[0.98] ${
        active
          ? "bg-violet-500/35 text-violet-100 shadow-[0_0_20px_rgba(139,92,246,0.2)] ring-1 ring-violet-400/40"
          : "border border-white/10 bg-white/[0.04] text-slate-400 hover:border-white/20 hover:text-white"
      }`}
    >
      {children}
    </button>
  );
}

function countActiveFilters(department, type, dateFilter) {
  let n = 0;
  if (department !== "All") n += 1;
  if (type !== "All") n += 1;
  if (dateFilter !== "upcoming") n += 1;
  return n;
}

export default function ExplorePage() {
  const { openSignIn, openSignUp } = useAuth();
  const [query, setQuery] = useState("");
  const [department, setDepartment] = useState("All");
  const [type, setType] = useState("All");
  const [dateFilter, setDateFilter] = useState("upcoming");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [registerState, setRegisterState] = useState({ status: "idle", message: "" });

  const activeFilterCount = countActiveFilters(department, type, dateFilter);

  useEffect(() => {
    if (!selectedEvent) {
      setRegisterState({ status: "idle", message: "" });
    }
  }, [selectedEvent]);

  const filteredEvents = useMemo(() => {
    const now = new Date();
    return events.filter((event) => {
      const date = new Date(event.date);
      const normalized = query.toLowerCase();
      const matchesSearch =
        !query ||
        event.title.toLowerCase().includes(normalized) ||
        event.description.toLowerCase().includes(normalized) ||
        event.tags.join(" ").toLowerCase().includes(normalized);
      const matchesDepartment = department === "All" || event.department === department;
      const matchesType = type === "All" || event.type === type;
      const matchesDate =
        dateFilter === "all" ||
        (dateFilter === "upcoming" && date >= now) ||
        (dateFilter === "past" && date < now);

      return matchesSearch && matchesDepartment && matchesType && matchesDate;
    });
  }, [query, department, type, dateFilter]);

  const resetFilters = () => {
    setDepartment("All");
    setType("All");
    setDateFilter("upcoming");
  };

  async function handleRegister() {
    if (!selectedEvent) return;
    setRegisterState({ status: "loading", message: "" });
    try {
      const base = typeof window !== "undefined" ? window.location.origin : "";
      const res = await fetch(`${base}/api/register`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ eventId: selectedEvent._id, status: "registered" }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.status === 401) {
        setRegisterState({
          status: "error",
          message: "Sign in to register for this event.",
        });
        return;
      }
      if (!res.ok) {
        setRegisterState({
          status: "error",
          message: data.message || data.error || "Registration failed. Try again.",
        });
        return;
      }
      setRegisterState({ status: "success", message: "You’re registered for this event." });
    } catch {
      setRegisterState({ status: "error", message: "Network error. Try again." });
    }
  }

  return (
    <DarkPageShell>
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <Badge className="mb-4 border-violet-400/30 bg-violet-500/15 text-cyan-300">
              <Sparkles className="mr-1 h-3 w-3" /> Discover
            </Badge>
            <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl">Explore every event on campus</h1>
            <p className="mt-2 max-w-xl text-slate-400">
              Tap an event to see full details and register without leaving this page.
            </p>
          </div>
          <p className="text-sm text-slate-500">
            <span className="font-semibold text-violet-300">{filteredEvents.length}</span> events match
          </p>
        </div>

        <Card className="mb-10 border-white/10 bg-white/[0.03] backdrop-blur-xl">
          <CardContent className="p-3 sm:p-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-3">
              <div className="flex min-w-0 flex-1 items-center gap-2 rounded-xl border border-white/5 bg-white/[0.02] px-2 sm:border-0 sm:bg-transparent sm:px-0">
                <Search className="ml-1 h-5 w-5 shrink-0 text-slate-500 sm:ml-2" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search by title, tags, or description..."
                  className="h-11 min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-slate-500 sm:h-12"
                />
                {query ? (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="shrink-0 text-slate-400 hover:bg-white/10 hover:text-white"
                    onClick={() => setQuery("")}
                  >
                    Clear
                  </Button>
                ) : null}
              </div>

              <div className="flex shrink-0 items-center justify-end border-t border-white/10 pt-3 sm:border-t-0 sm:border-l sm:pl-3 sm:pt-0">
                <Popover open={filtersOpen} onOpenChange={setFiltersOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full gap-2 border-white/15 bg-white/5 text-white hover:bg-white/10 sm:w-auto"
                    >
                      <SlidersHorizontal className="h-4 w-4 text-violet-300" />
                      Filters
                      {activeFilterCount > 0 ? (
                        <Badge className="border-0 bg-violet-500/40 px-2 text-[10px] text-violet-100">{activeFilterCount}</Badge>
                      ) : null}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent align="end" className="max-h-[min(70vh,520px)] overflow-y-auto">
                    <div className="mb-3 flex items-center justify-between border-b border-white/10 pb-3">
                      <span className="text-sm font-semibold text-white">Filter events</span>
                      {activeFilterCount > 0 ? (
                        <button
                          type="button"
                          onClick={resetFilters}
                          className="text-xs font-medium text-violet-300 hover:underline"
                        >
                          Reset
                        </button>
                      ) : null}
                    </div>
                    <div className="space-y-5">
                      <DarkChipRow label="Department">
                        {departments.map((d) => (
                          <DarkChip key={d} active={department === d} onClick={() => setDepartment(d)}>
                            {d}
                          </DarkChip>
                        ))}
                      </DarkChipRow>
                      <DarkChipRow label="Type">
                        {eventTypes.map((opt) => (
                          <DarkChip key={opt.value} active={type === opt.value} onClick={() => setType(opt.value)}>
                            {opt.label}
                          </DarkChip>
                        ))}
                      </DarkChipRow>
                      <DarkChipRow label="When">
                        {dateFilters.map((opt) => (
                          <DarkChip key={opt.value} active={dateFilter === opt.value} onClick={() => setDateFilter(opt.value)}>
                            {opt.label}
                          </DarkChip>
                        ))}
                      </DarkChipRow>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </CardContent>
        </Card>

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

                {registerState.message ? (
                  <p
                    className={`mt-4 text-sm ${
                      registerState.status === "success"
                        ? "text-emerald-400"
                        : registerState.status === "error"
                          ? "text-amber-300"
                          : "text-slate-400"
                    }`}
                  >
                    {registerState.message}
                    {registerState.status === "error" && registerState.message.includes("Sign in") ? (
                      <span className="mt-2 flex flex-wrap gap-4">
                        <button
                          type="button"
                          className="font-semibold text-violet-300 underline"
                          onClick={() => {
                            setSelectedEvent(null);
                            openSignIn();
                          }}
                        >
                          Sign in
                        </button>
                        <button
                          type="button"
                          className="font-semibold text-violet-300 underline"
                          onClick={() => {
                            setSelectedEvent(null);
                            openSignUp();
                          }}
                        >
                          Sign up
                        </button>
                      </span>
                    ) : null}
                  </p>
                ) : null}
              </div>

              <DialogFooter className="mt-0 flex-col sm:flex-row">
                <Button
                  type="button"
                  className="w-full bg-violet-400 text-[#24085e] hover:bg-violet-300"
                  disabled={registerState.status === "loading" || registerState.status === "success"}
                  onClick={handleRegister}
                >
                  {registerState.status === "loading"
                    ? "Registering…"
                    : registerState.status === "success"
                      ? "Registered"
                      : "Register"}
                </Button>
              </DialogFooter>
            </DialogContent>
          ) : null}
        </Dialog>

        {filteredEvents.length === 0 ? (
          <Card className="border-dashed border-white/15 bg-white/[0.02]">
            <CardContent className="py-16 text-center">
              <p className="text-lg font-medium text-white">No events match</p>
              <p className="mt-2 text-sm text-slate-500">Try clearing search or widening your filters.</p>
              <Button
                className="mt-6 bg-violet-400 text-[#24085e] hover:bg-violet-300"
                onClick={() => {
                  setQuery("");
                  resetFilters();
                }}
              >
                Reset all
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredEvents.map((event) => (
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
                className="h-full cursor-pointer overflow-hidden border-white/10 bg-white/[0.03] backdrop-blur-xl outline-none transition-all duration-300 hover:-translate-y-1 hover:border-violet-400/25 hover:shadow-[0_0_28px_rgba(139,92,246,0.15)] focus-visible:ring-2 focus-visible:ring-violet-500/50"
              >
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={event.bannerImage}
                    alt={event.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f1015] via-transparent to-transparent opacity-80" />
                  <div className="absolute left-3 top-3 flex flex-wrap gap-2">
                    <Badge className="border-0 bg-black/50 text-xs text-white backdrop-blur-sm">{event.type}</Badge>
                    {event.trending ? (
                      <Badge className="border-orange-400/30 bg-orange-500/30 text-orange-100">Trending</Badge>
                    ) : null}
                  </div>
                </div>
                <CardContent className="p-5">
                  <h2 className="line-clamp-2 text-lg font-semibold text-white">{event.title}</h2>
                  <p className="mt-2 line-clamp-2 text-sm text-slate-400">{event.description}</p>
                  <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500">
                    <span className="inline-flex items-center gap-1 text-slate-400">
                      <CalendarDays className="h-3.5 w-3.5" />
                      {new Date(event.date).toLocaleDateString()}
                    </span>
                    <span className="inline-flex items-center gap-1 text-slate-400">
                      <MapPin className="h-3.5 w-3.5" />
                      <span className="line-clamp-1">{event.venue}</span>
                    </span>
                  </div>
                  <Badge variant="outline" className="mt-3 border-white/15 text-slate-400">
                    {event.department}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </DarkPageShell>
  );
}
