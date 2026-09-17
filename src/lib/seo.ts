import type { Metadata } from "next";
import {
  baseURL,
  description as defaultDescription,
  indexable,
  siteName,
} from "@/config";
import type { Game } from "@/lib/games";

export function absoluteUrl(path: string) {
  return new URL(path, baseURL).href;
}

export function ogImageUrl(pageTitle: string, subtitle?: string) {
  const params = new URLSearchParams({ title: pageTitle });
  if (subtitle) params.set("subtitle", subtitle);
  return absoluteUrl(`/api/og?${params.toString()}`);
}

export function pageMetadata(
  pageTitle: string,
  path: string,
  description = defaultDescription,
  options: {
    index?: boolean;
    images?: string[];
    keywords?: string[];
  } = {},
): Metadata {
  const url = absoluteUrl(path);
  const shouldIndex = options.index ?? indexable;
  const image = ogImageUrl(pageTitle);
  const images = (options.images ?? [image]).map((src) => ({
    url: src.startsWith("http") ? src : absoluteUrl(src),
    width: 1200,
    height: 630,
    alt: pageTitle,
  }));

  return {
    title: { absolute: `${pageTitle} | ${siteName}` },
    description,
    keywords: options.keywords,
    alternates: { canonical: url },
    robots: { index: shouldIndex, follow: true },
    openGraph: {
      title: pageTitle,
      description,
      url,
      siteName,
      type: "website",
      locale: "en_US",
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description,
      images: images.map((item) => item.url),
    },
  };
}

export function breadcrumbs(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteName,
    url: baseURL,
    description: defaultDescription,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${baseURL}/games?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteName,
    url: baseURL,
    logo: absoluteUrl("/icon.svg"),
    description: defaultDescription,
  };
}

export function itemListJsonLd(
  name: string,
  path: string,
  items: { name: string; path: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    url: absoluteUrl(path),
    numberOfItems: items.length,
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      url: absoluteUrl(item.path),
    })),
  };
}

export function videoGameJsonLd(game: Game) {
  const url = absoluteUrl(`/games/${game.slug}`);
  return {
    "@context": "https://schema.org",
    "@type": ["VideoGame", "Product"],
    name: game.title,
    description: game.description,
    image: absoluteUrl(game.image),
    url,
    sku: game.slug,
    genre: game.genre,
    keywords: game.tags.join(", "),
    gamePlatform: game.platforms,
    author: { "@type": "Organization", name: game.studio },
    brand: { "@type": "Organization", name: game.studio },
    offers: {
      "@type": "Offer",
      url,
      price: game.price.toFixed(2),
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: game.rating,
      ratingCount: game.ratingCount,
      bestRating: 5,
      worstRating: 1,
    },
  };
}
