import Link from "next/link";
import { OtteMark } from "@/components/otte-mark";
import { GENRES } from "@/lib/games";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border bg-background">
      <div className="mx-auto grid w-full max-w-[1400px] gap-8 px-4 py-12 sm:grid-cols-2 lg:grid-cols-3 lg:px-6">
        <div>
          <Link href="/" className="flex items-center gap-2">
            <OtteMark />
            <span className="text-lg font-semibold tracking-tight">oTTe</span>
          </Link>
          <p className="mt-3 max-w-xs text-sm text-muted-foreground">
            A simple marketplace for games — browse, buy, and keep a library of what you own.
          </p>
        </div>
        <div>
          <p className="text-xs font-semibold tracking-[0.14em] text-muted-foreground uppercase">
            Store
          </p>
          <ul className="mt-3 space-y-2">
            <li>
              <Link href="/games" className="text-sm hover:text-foreground">
                Browse games
              </Link>
            </li>
            <li>
              <Link href="/library" className="text-sm hover:text-foreground">
                Library
              </Link>
            </li>
            <li>
              <Link href="/cart" className="text-sm hover:text-foreground">
                Cart
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold tracking-[0.14em] text-muted-foreground uppercase">
            Genres
          </p>
          <ul className="mt-3 space-y-2">
            {GENRES.slice(0, 5).map((genre) => (
              <li key={genre.slug}>
                <Link href={`/games?genre=${genre.slug}`} className="text-sm hover:text-foreground">
                  {genre.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-border px-4 py-4 text-xs text-muted-foreground lg:px-6">
        © {new Date().getFullYear()} oTTe. Demo storefront — no real payments.
      </div>
    </footer>
  );
}
