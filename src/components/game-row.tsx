import Link from "next/link";
import { GameCard } from "@/components/game-card";
import type { Game } from "@/lib/games";

export function GameRow({
  title,
  href,
  games,
}: {
  title: string;
  href?: string;
  games: Game[];
}) {
  if (games.length === 0) return null;

  return (
    <section>
      <div className="mb-3 flex items-end justify-between gap-4">
        <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
        {href ? (
          <Link href={href} className="text-sm text-muted-foreground hover:text-foreground">
            See all
          </Link>
        ) : null}
      </div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
        {games.map((game) => (
          <GameCard key={game.slug} game={game} />
        ))}
      </div>
    </section>
  );
}
