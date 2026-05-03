export default function SectionHeader({ title, subtitle, action }) {
  return (
    <div className="mb-5 flex items-end justify-between gap-4">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight text-neutral-900">{title}</h2>
        {subtitle ? <p className="mt-1 text-sm text-neutral-600">{subtitle}</p> : null}
      </div>
      {action}
    </div>
  );
}
