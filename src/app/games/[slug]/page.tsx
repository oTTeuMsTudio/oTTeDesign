import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Star } from "lucide-react";
import { BuyBox } from "@/app/games/[slug]/buy-box";
import { GameCard } from "@/components/game-card";
import { Badge } from "@/components/ui/badge";
import { games, getGame, relatedGames } from "@/lib/games";
import { formatRatingCount } from "@/lib/format";

export function generateStaticParams() {
  return games.map((game) => ({ slug: game.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const game = getGame(slug);
  if (!game) return { title: "Game" };
  return {
    title: game.title,
    description: game.description,
  };
}

export default async function GamePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const game = getGame(slug);
  if (!game) notFound();

  const more = relatedGames(game);

  return (
    <main className="mx-auto w-full max-w-[1400px] flex-1 px-4 py-6 lg:px-6">
      <p className="text-xs text-muted-foreground">
        <Link href="/" className="hover:text-foreground">
          Store
        </Link>
        <span className="mx-1.5">/</span>
        <Link href={`/games?genre=${game.genre}`} className="capitalize hover:text-foreground">
          {game.genre}
        </Link>
        <span className="mx-1.5">/</span>
        <span className="text-foreground">{game.title}</span>
      </p>

      <div className="mt-4 grid gap-6 lg:grid-cols-[minmax(0,1.5fr)_340px]">
        <div>
          <div className="relative aspect-video overflow-hidden rounded-xl bg-muted">
            <Image
              src={game.image}
              alt={game.title}
              fill
              priority
              sizes="(min-width:1024px) 60vw, 100vw"
              className="object-cover"
            />
          </div>
          <h1 className="mt-5 text-3xl font-semibold tracking-tight">{game.title}</h1>
          <div className="mt-2 flex flex-wrap items-center gap-3 text-sm">
            <span>{game.studio}</span>
            <span className="flex items-center gap-1 text-muted-foreground">
              <Star className="size-3.5 fill-amber-400 text-amber-400" />
              {game.rating} ({formatRatingCount(game.ratingCount)})
            </span>
            {game.isNew ? <Badge>New</Badge> : null}
          </div>
          <p className="mt-4 max-w-2xl text-muted-foreground">{game.description}</p>
          <p className="mt-3 max-w-2xl text-sm leading-6">{game.details}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {game.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
            {game.platforms.map((platform) => (
              <Badge key={platform} variant="outline" className="capitalize">
                {platform}
              </Badge>
            ))}
          </div>
        </div>
        <BuyBox game={game} />
      </div>

      {more.length > 0 ? (
        <section className="mt-12">
          <h2 className="text-lg font-semibold tracking-tight">More {game.genre}</h2>
          <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {more.map((item) => (
              <GameCard key={item.slug} game={item} />
            ))}
          </div>
        </section>
      ) : null}
    </main>
  );
}
