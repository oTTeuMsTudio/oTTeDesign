import type { Game } from "@/lib/games";

export function formatPrice(value: number) {
  if (value === 0) return "Free";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

export function formatRatingCount(count: number) {
  return new Intl.NumberFormat("en-US").format(count);
}

export function gameHref(game: Pick<Game, "slug">) {
  return `/games/${game.slug}`;
}

export function discountPercent(game: Game) {
  if (!game.originalPrice || game.originalPrice <= game.price) return 0;
  return Math.round((1 - game.price / game.originalPrice) * 100);
}
