import Button from "@/components/Button";
import { events } from "@/lib/data";

function getCountdown(dateString) {
  const target = new Date(dateString).getTime();
  const now = Date.now();
  const diff = Math.max(0, target - now);
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  return `${days}d ${hours}h left`;
}

export default async function EventDetailsPage({ params }) {
  const { id } = await params;
  const event = events.find((item) => item._id === id);

  if (!event) {
    return (
      <div className="container-padded py-20">
        <p className="text-lg text-neutral-700">Event not found.</p>
      </div>
    );
  }

  return (
    <div className="container-padded py-10">
      <article className="overflow-hidden rounded-3xl border border-brand-100 bg-white shadow-soft">
        <div className="h-64 w-full md:h-96">
          <img src={event.bannerImage} alt={event.title} className="h-full w-full object-cover" />
        </div>

        <div className="space-y-6 p-6 md:p-8">
          <div className="flex flex-wrap gap-2">
            {event.tags.map((tag) => (
              <span key={tag} className="rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-brand">
                {tag}
              </span>
            ))}
          </div>

          <div>
            <h1 className="text-3xl font-semibold text-neutral-900 md:text-4xl">{event.title}</h1>
            <p className="mt-2 text-neutral-600">{event.description}</p>
          </div>

          <div className="grid grid-cols-1 gap-4 text-sm text-neutral-700 md:grid-cols-2">
            <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
            <p><strong>Time:</strong> {event.time}</p>
            <p><strong>Venue:</strong> {event.venue}</p>
            <p><strong>Organizer:</strong> {event.organizer}</p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button>Register</Button>
            <Button variant="subtle">Interested</Button>
            <span className="text-sm text-neutral-500">{event.interestedCount} students interested</span>
            <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-700">
              {getCountdown(event.date)}
            </span>
          </div>
        </div>
      </article>
    </div>
  );
}
