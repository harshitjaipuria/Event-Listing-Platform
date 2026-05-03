"use client";

export default function FilterChips({ label, options, selected, onChange }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-xs font-medium uppercase tracking-wide text-neutral-500">{label}</span>
      {options.map((option) => {
        const active = selected === option.value;
        return (
          <button
            key={option.value}
            onClick={() => onChange(option.value)}
            className={`rounded-full border px-3 py-1.5 text-sm transition ${
              active
                ? "border-brand bg-brand text-white"
                : "border-brand-100 bg-white text-brand hover:bg-brand-50"
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
