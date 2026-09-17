"use client";

import { useRouter } from "next/navigation";
import type { SearchFilters as Filters } from "@/lib/catalog";

export function SearchFilters({ filters }: { filters: Filters }) {
  const router = useRouter();

  function update(patch: Partial<Filters>) {
    const next = new URLSearchParams();
    const merged = { ...filters, ...patch };
    for (const [key, value] of Object.entries(merged)) {
      if (value) next.set(key, value);
    }
    router.push(`/search?${next.toString()}`);
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Select
        label="Sort"
        value={filters.sort ?? "popular"}
        onChange={(value) => update({ sort: value === "popular" ? undefined : value })}
        options={[
          { value: "popular", label: "Popular" },
          { value: "newest", label: "Newest" },
          { value: "rating", label: "Rating" },
          { value: "price-asc", label: "Price: low" },
          { value: "price-desc", label: "Price: high" },
        ]}
      />
      <Select
        label="Style"
        value={filters.style ?? ""}
        onChange={(value) => update({ style: value || undefined })}
        options={[
          { value: "", label: "Any style" },
          { value: "realistic", label: "Realistic" },
          { value: "stylized", label: "Stylized" },
          { value: "lowpoly", label: "Low poly" },
        ]}
      />
    </div>
  );
}

function Select({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <label className="flex items-center gap-2 text-xs text-muted-foreground">
      {label}
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-8 rounded-md border border-white/10 bg-[#161616] px-2 text-sm text-foreground"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
