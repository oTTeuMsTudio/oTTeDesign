import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { Game } from "@/lib/games";
import { formatPrice, gameHref } from "@/lib/format";

export function HeroFeatured({ game }: { game: Game }) {
  return (
    <section className="relative overflow-hidden rounded-2xl bg-muted">
      <div className="relative aspect-[16/10] sm:aspect-[21/9]">
        <Image
          src={game.image}
          alt={game.title}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/10" />
        <div className="absolute inset-x-0 bottom-0 space-y-3 p-5 sm:p-8">
          <p className="text-xs font-medium tracking-[0.18em] text-primary uppercase">Featured</p>
          <h1 className="max-w-2xl text-3xl font-semibold tracking-tight text-white sm:text-5xl">
            {game.title}
          </h1>
          <p className="max-w-xl text-sm text-white/80 sm:text-base">{game.description}</p>
          <div className="flex flex-wrap items-center gap-3">
            <Button asChild size="lg">
              <Link href={gameHref(game)}>View game</Link>
            </Button>
            <span className="text-lg font-semibold text-white">{formatPrice(game.price)}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
