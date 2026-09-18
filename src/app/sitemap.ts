import type { MetadataRoute } from "next";
import { baseURL, indexable } from "@/config";

export default function sitemap(): MetadataRoute.Sitemap {
  if (!indexable) return [];

  return [
    {
      url: new URL("/", baseURL).href,
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
