"use client";

export default function SearchBar({ value, onChange, placeholder = "Search events, clubs, topics..." }) {
  return (
    <div className="w-full rounded-2xl border border-brand-100 bg-white p-2 shadow-sm">
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border-0 px-3 py-2 text-sm text-neutral-800 outline-none ring-0 placeholder:text-neutral-400"
      />
    </div>
  );
}
