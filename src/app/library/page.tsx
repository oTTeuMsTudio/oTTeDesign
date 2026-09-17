"use client";

import { EmptyState } from "@/components/empty-state";
import { GameCard } from "@/components/game-card";
import { useCart } from "@/components/cart-provider";
import { getGame } from "@/lib/games";

export default function LibraryPage() {
  const { library } = useCart();
  const owned = library.map((slug) => getGame(slug)).filter((game) => game !== undefined);

  return (
    <main className="mx-auto w-full max-w-[1400px] flex-1 px-4 py-8 lg:px-6">
      <h1 className="text-2xl font-semibold tracking-tight">Library</h1>
      <p className="mt-1 text-sm text-muted-foreground">Games you’ve checked out live here.</p>
      {owned.length === 0 ? (
        <EmptyState title="Your library is empty" href="/games" action="Find a game" />
      ) : (
        <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
          {owned.map((game) => (
            <GameCard key={game.slug} game={game} />
          ))}
        </div>
      )}
    </main>
  );
}
