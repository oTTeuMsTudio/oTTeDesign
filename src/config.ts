import { canIndex, resolveSiteUrl } from "@/lib/site-url.mjs";

export const siteName = process.env.NEXT_PUBLIC_SITE_NAME || "oTTeGames";
export const title = process.env.NEXT_PUBLIC_TITLE || "Game marketplace";
export const description =
  process.env.NEXT_PUBLIC_DESCRIPTION ||
  "A simple marketplace for games. Browse the catalog, add titles to your cart, and keep a library of what you own.";
export const baseURL = resolveSiteUrl(process.env);
export const indexable = canIndex(process.env);
