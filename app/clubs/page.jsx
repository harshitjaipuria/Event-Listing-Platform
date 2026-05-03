import DarkPageShell from "@/components/DarkPageShell";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { clubs } from "@/lib/data";

export default function ClubsPage() {
  return (
    <DarkPageShell>
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-2 text-3xl font-bold md:text-4xl">Clubs</h1>
        <p className="mb-10 text-slate-400">Discover communities and the events they host at GLA.</p>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {clubs.map((club) => (
            <Card
              key={club._id}
              className="border-white/10 bg-white/[0.03] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-violet-400/30 hover:shadow-[0_0_25px_rgba(167,139,250,0.12)]"
            >
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold text-white">{club.name}</h2>
                <p className="mt-2 text-sm text-slate-400">{club.description}</p>
                <div className="mt-4 flex items-center justify-between">
                  <Badge variant="secondary" className="border-white/10 bg-violet-500/20 text-violet-200">
                    {club.department}
                  </Badge>
                  <span className="text-sm text-slate-500">{club.hostedEvents} events hosted</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DarkPageShell>
  );
}
