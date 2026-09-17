import Image from "next/image";
import Link from "next/link";
import type { Game } from "@/lib/games";
import { discountPercent, formatPrice, gameHref } from "@/lib/format";
import { cn } from "@/lib/utils";

export function GameCard({ game }: { game: Game }) {
  const off = discountPercent(game);

  return (
    <article className="group">
      <Link href={gameHref(game)} className="block">
        <div className="relative aspect-video overflow-hidden rounded-xl bg-muted">
          <Image
            src={game.image}
            alt={game.title}
            fill
            sizes="(min-width:1024px) 20vw, 50vw"
            className="object-cover transition duration-500 group-hover:scale-[1.04]"
          />
          {off > 0 ? (
            <span className="absolute top-2 left-2 rounded-md bg-rose-600 px-1.5 py-0.5 text-[11px] font-semibold text-white">
              -{off}%
            </span>
          ) : null}
          {game.isNew ? (
            <span className="absolute top-2 right-2 rounded-md bg-primary px-1.5 py-0.5 text-[11px] font-semibold text-primary-foreground">
              New
            </span>
          ) : null}
        </div>
        <div className="mt-2 flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="truncate text-sm font-medium tracking-tight">{game.title}</h3>
            <p className="truncate text-xs text-muted-foreground">{game.studio}</p>
          </div>
          <div className="shrink-0 text-right">
            {game.originalPrice ? (
              <p className="text-[11px] text-muted-foreground line-through">
                {formatPrice(game.originalPrice)}
              </p>
            ) : null}
            <p className={cn("text-sm font-semibold", off > 0 && "text-primary")}>
              {formatPrice(game.price)}
            </p>
          </div>
        </div>
      </Link>
    </article>
  );
}
