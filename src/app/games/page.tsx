import { EmptyState } from "@/components/empty-state";
import { GameCard } from "@/components/game-card";
import { GenreNav } from "@/components/genre-nav";
import { filterGames, isGenre } from "@/lib/games";

export const metadata = {
  title: "Browse games",
  description: "Browse the oTTe game catalog by genre or search.",
};

export default async function GamesPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; genre?: string }>;
}) {
  const { q, genre } = await searchParams;
  const activeGenre = isGenre(genre) ? genre : undefined;
  const results = filterGames({ q, genre: activeGenre });

  return (
    <main className="mx-auto w-full max-w-[1400px] flex-1 px-4 py-6 lg:px-6">
      <h1 className="text-2xl font-semibold tracking-tight">Browse</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        {results.length} {results.length === 1 ? "game" : "games"}
        {q ? ` for “${q}”` : ""}
      </p>
      <div className="mt-5">
        <GenreNav active={activeGenre} q={q} />
      </div>
      {results.length === 0 ? (
        <EmptyState title="No games match that search" href="/games" action="Clear filters" />
      ) : (
        <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {results.map((game) => (
            <GameCard key={game.slug} game={game} />
          ))}
        </div>
      )}
    </main>
  );
}
