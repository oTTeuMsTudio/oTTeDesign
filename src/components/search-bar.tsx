"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { useState } from "react";

export function SearchBar() {
  const router = useRouter();
  const params = useSearchParams();
  const [value, setValue] = useState(params.get("q") ?? "");

  return (
    <form
      className="relative w-full"
      action="/search"
      onSubmit={(event) => {
        event.preventDefault();
        const next = new URLSearchParams();
        if (value.trim()) next.set("q", value.trim());
        router.push(`/search${next.toString() ? `?${next}` : ""}`);
      }}
    >
      <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
      <input
        name="q"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="Search assets, publishers, tags…"
        className="h-9 w-full rounded-full border border-white/10 bg-white/5 pr-4 pl-9 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-white/25 focus:bg-white/8"
      />
    </form>
  );
}
