import { EmptyState } from "@/components/empty-state";
import { GameCard } from "@/components/game-card";
import { GenreNav } from "@/components/genre-nav";
import { JsonLd } from "@/components/json-ld";
import { filterGames, GENRES, isGenre } from "@/lib/games";
import { breadcrumbs, itemListJsonLd, pageMetadata } from "@/lib/seo";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; genre?: string }>;
}) {
  const { q, genre } = await searchParams;
  const query = q?.trim();
  const activeGenre = isGenre(genre) ? genre : undefined;
  const genreLabel = GENRES.find((item) => item.slug === activeGenre)?.label;

  if (query) {
    return pageMetadata(
      `Search “${query}”`,
      `/games?q=${encodeURIComponent(query)}`,
      `Search results for “${query}” in the oTTeGames catalog.`,
      { index: false },
    );
  }

  if (activeGenre && genreLabel) {
    return pageMetadata(
      `${genreLabel} games`,
      `/games?genre=${activeGenre}`,
      `Browse ${genreLabel} games on oTTeGames.`,
    );
  }

  return pageMetadata(
    "Browse games",
    "/games",
    "Browse the oTTeGames catalog by genre or search.",
  );
}

export default async function GamesPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; genre?: string }>;
}) {
  const { q, genre } = await searchParams;
  const activeGenre = isGenre(genre) ? genre : undefined;
  const genreLabel = GENRES.find((item) => item.slug === activeGenre)?.label;
  const results = filterGames({ q, genre: activeGenre });
  const listPath = activeGenre ? `/games?genre=${activeGenre}` : "/games";
  const listName = genreLabel ? `${genreLabel} games` : "Browse games";

  return (
    <main id="main" className="mx-auto w-full max-w-[1400px] flex-1 px-4 py-6 lg:px-6">
      <JsonLd
        data={breadcrumbs([
          { name: "Store", path: "/" },
          { name: listName, path: listPath },
        ])}
      />
      <JsonLd
        data={itemListJsonLd(
          listName,
          listPath,
          results.map((game) => ({ name: game.title, path: `/games/${game.slug}` })),
        )}
      />
      <h1 className="text-2xl font-semibold tracking-tight">
        {genreLabel ? genreLabel : "Browse"}
      </h1>
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
