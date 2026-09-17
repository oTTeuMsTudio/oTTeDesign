import { GenreNav } from "@/components/genre-nav";
import { GameRow } from "@/components/game-row";
import { HeroFeatured } from "@/components/hero-featured";
import { JsonLd } from "@/components/json-ld";
import { games } from "@/lib/games";
import {
  itemListJsonLd,
  organizationJsonLd,
  pageMetadata,
  websiteJsonLd,
} from "@/lib/seo";
import { title } from "@/config";

export const metadata = pageMetadata(title, "/");

export default function StorePage() {
  const hero = games.find((game) => game.hero) ?? games[0];
  const featured = games.filter((game) => game.featured);
  const sale = games.filter((game) => game.originalPrice);
  const fresh = games.filter((game) => game.isNew);

  return (
    <main id="main" className="mx-auto w-full max-w-[1400px] flex-1 space-y-10 px-4 py-6 lg:px-6">
      <JsonLd data={websiteJsonLd()} />
      <JsonLd data={organizationJsonLd()} />
      <JsonLd
        data={itemListJsonLd(
          "Featured games",
          "/",
          featured.map((game) => ({ name: game.title, path: `/games/${game.slug}` })),
        )}
      />
      <HeroFeatured game={hero} />
      <GenreNav />
      <GameRow title="Featured" href="/games" games={featured} />
      <GameRow title="On sale" href="/games" games={sale} />
      <GameRow title="New this week" href="/games" games={fresh} />
    </main>
  );
}
