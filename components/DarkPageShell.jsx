import DarkSiteNav from "@/components/DarkSiteNav";

export default function DarkPageShell({ children }) {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#0f1015] text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-violet-600/20 blur-[110px]" />
        <div className="absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-cyan-500/10 blur-[120px]" />
      </div>
      <div className="relative z-10 container-padded py-8">
        <DarkSiteNav />
        {children}
      </div>
    </div>
  );
}
