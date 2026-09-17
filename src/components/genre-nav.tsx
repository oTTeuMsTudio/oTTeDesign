import Link from "next/link";
import { GENRES } from "@/lib/games";
import { cn } from "@/lib/utils";

export function GenreNav({ active, q }: { active?: string; q?: string }) {
  const query = q ? `&q=${encodeURIComponent(q)}` : "";

  return (
    <nav className="flex flex-wrap gap-2">
      <Link
        href={q ? `/games?q=${encodeURIComponent(q)}` : "/games"}
        className={cn(
          "rounded-full border border-border px-3 py-1 text-sm text-muted-foreground transition hover:text-foreground",
          !active && "border-transparent bg-primary text-primary-foreground hover:text-primary-foreground",
        )}
      >
        All
      </Link>
      {GENRES.map((genre) => (
        <Link
          key={genre.slug}
          href={`/games?genre=${genre.slug}${query}`}
          className={cn(
            "rounded-full border border-border px-3 py-1 text-sm text-muted-foreground transition hover:text-foreground",
            active === genre.slug &&
              "border-transparent bg-primary text-primary-foreground hover:text-primary-foreground",
          )}
        >
          {genre.label}
        </Link>
      ))}
    </nav>
  );
}
