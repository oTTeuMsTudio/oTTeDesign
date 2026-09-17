"use client";

import Link from "next/link";
import { useCart } from "@/components/cart-provider";
import { Button } from "@/components/ui/button";
import type { Game } from "@/lib/games";
import { discountPercent, formatPrice } from "@/lib/format";

export function BuyBox({ game }: { game: Game }) {
  const { addToCart, inCart, inLibrary } = useCart();
  const owned = inLibrary(game.slug);
  const queued = inCart(game.slug);
  const off = discountPercent(game);

  return (
    <aside className="h-fit rounded-xl border border-border bg-card p-5">
      <div className="flex items-end gap-2">
        <p className="text-3xl font-semibold">{formatPrice(game.price)}</p>
        {game.originalPrice ? (
          <p className="pb-1 text-sm text-muted-foreground line-through">
            {formatPrice(game.originalPrice)}
          </p>
        ) : null}
        {off > 0 ? (
          <span className="mb-1 rounded-md bg-rose-600 px-1.5 py-0.5 text-xs font-semibold text-white">
            -{off}%
          </span>
        ) : null}
      </div>
      <p className="mt-2 text-sm text-muted-foreground">{game.studio}</p>
      {owned ? (
        <Button asChild size="lg" className="mt-5 h-11 w-full">
          <Link href="/library">In your library</Link>
        </Button>
      ) : queued ? (
        <Button asChild size="lg" className="mt-5 h-11 w-full">
          <Link href="/cart">In cart</Link>
        </Button>
      ) : (
        <Button size="lg" className="mt-5 h-11 w-full" onClick={() => addToCart(game.slug)}>
          Add to cart
        </Button>
      )}
    </aside>
  );
}
