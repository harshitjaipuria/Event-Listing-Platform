import Link from "next/link";

export default function EventCard({ event }) {
  return (
    <Link
      href={`/events/${event._id}`}
      className="group overflow-hidden rounded-2xl border border-brand-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-soft"
    >
      <div className="h-40 w-full bg-brand-50">
        <img src={event.bannerImage} alt={event.title} className="h-full w-full object-cover" />
      </div>
      <div className="space-y-3 p-4">
        <div className="flex flex-wrap gap-2">
          <span className="rounded-full bg-brand-50 px-2.5 py-1 text-xs font-medium text-brand">{event.type}</span>
          <span className="rounded-full bg-neutral-100 px-2.5 py-1 text-xs text-neutral-700">{event.department}</span>
        </div>
        <div>
          <h3 className="line-clamp-1 text-base font-semibold text-neutral-900">{event.title}</h3>
          <p className="mt-1 line-clamp-2 text-sm text-neutral-600">{event.description}</p>
        </div>
        <div className="text-sm text-neutral-500">
          <p>{new Date(event.date).toLocaleDateString()} • {event.time}</p>
          <p className="line-clamp-1">{event.venue}</p>
        </div>
      </div>
    </Link>
  );
}
