import { GenreNav } from "@/components/genre-nav";
import { GameRow } from "@/components/game-row";
import { HeroFeatured } from "@/components/hero-featured";
import { games } from "@/lib/games";

export default function StorePage() {
  const hero = games.find((game) => game.hero) ?? games[0];
  const featured = games.filter((game) => game.featured);
  const sale = games.filter((game) => game.originalPrice);
  const fresh = games.filter((game) => game.isNew);

  return (
    <main className="mx-auto w-full max-w-[1400px] flex-1 space-y-10 px-4 py-6 lg:px-6">
      <HeroFeatured game={hero} />
      <GenreNav />
      <GameRow title="Featured" href="/games" games={featured} />
      <GameRow title="On sale" href="/games" games={sale} />
      <GameRow title="New this week" href="/games" games={fresh} />
    </main>
  );
}
