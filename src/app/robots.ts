import type { MetadataRoute } from "next";
import { baseURL, indexable } from "@/config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    host: new URL(baseURL).host,
    ...(indexable ? { sitemap: `${baseURL}/sitemap.xml` } : {}),
  };
}
