import type { MetadataRoute } from "next";
import { baseURL, indexable } from "@/config";
import { GENRES, games } from "@/lib/games";

export default function sitemap(): MetadataRoute.Sitemap {
  if (!indexable) return [];

  const staticRoutes: MetadataRoute.Sitemap = ["/", "/games"].map((path) => ({
    url: new URL(path, baseURL).href,
    changeFrequency: "weekly",
    priority: path === "/" ? 1 : 0.9,
  }));

  const genreRoutes: MetadataRoute.Sitemap = GENRES.map((genre) => ({
    url: new URL(`/games?genre=${genre.slug}`, baseURL).href,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const gameRoutes: MetadataRoute.Sitemap = games.map((game) => ({
    url: new URL(`/games/${game.slug}`, baseURL).href,
    changeFrequency: "monthly",
    priority: game.featured || game.hero ? 0.8 : 0.6,
    images: [new URL(game.image, baseURL).href],
  }));

  return [...staticRoutes, ...genreRoutes, ...gameRoutes];
}
