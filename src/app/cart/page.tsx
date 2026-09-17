"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import { EmptyState } from "@/components/empty-state";
import { useCart } from "@/components/cart-provider";
import { Button } from "@/components/ui/button";
import { getGame } from "@/lib/games";
import { formatPrice, gameHref } from "@/lib/format";

export default function CartPage() {
  const { cart, removeFromCart, checkout } = useCart();
  const lines = cart
    .map((slug) => getGame(slug))
    .filter((game) => game !== undefined);

  const total = useMemo(() => lines.reduce((sum, game) => sum + game.price, 0), [lines]);

  return (
    <main id="main" className="mx-auto w-full max-w-5xl flex-1 px-4 py-8 lg:px-6">
      <h1 className="text-2xl font-semibold tracking-tight">Cart</h1>
      {lines.length === 0 ? (
        <EmptyState title="Your cart is empty" href="/games" action="Browse games" />
      ) : (
        <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
          <ul className="divide-y divide-border rounded-xl border border-border">
            {lines.map((game) => (
              <li key={game.slug} className="flex gap-4 p-4">
                <Link href={gameHref(game)} className="relative h-20 w-32 shrink-0 overflow-hidden rounded-md">
                  <Image
                    src={game.image}
                    alt={game.title}
                    fill
                    sizes="128px"
                    className="object-cover"
                  />
                </Link>
                <div className="min-w-0 flex-1">
                  <Link href={gameHref(game)} className="font-medium hover:underline">
                    {game.title}
                  </Link>
                  <p className="text-xs text-muted-foreground">{game.studio}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">{formatPrice(game.price)}</p>
                  <button
                    type="button"
                    className="mt-2 text-xs text-muted-foreground hover:text-foreground"
                    onClick={() => removeFromCart(game.slug)}
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <aside className="h-fit rounded-xl border border-border bg-card p-5">
            <p className="text-sm text-muted-foreground">Subtotal</p>
            <p className="mt-1 text-3xl font-semibold">{formatPrice(total)}</p>
            <Button size="lg" className="mt-5 h-11 w-full" onClick={checkout}>
              Checkout
            </Button>
            <p className="mt-3 text-xs text-muted-foreground">
              Demo checkout adds these games to your library. No payment is collected.
            </p>
          </aside>
        </div>
      )}
    </main>
  );
}
