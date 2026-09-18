import { canIndex, resolveSiteUrl } from "@/lib/site-url.mjs";

export const siteName = process.env.NEXT_PUBLIC_SITE_NAME || "oTTeDesign";
export const title = process.env.NEXT_PUBLIC_TITLE || "3D design editor";
export const description =
  process.env.NEXT_PUBLIC_DESCRIPTION ||
  "A browser 3D design editor. Build scenes from primitives, transform objects, and ask the AI assistant to help.";
export const baseURL = resolveSiteUrl(process.env);
export const indexable = canIndex(process.env);
