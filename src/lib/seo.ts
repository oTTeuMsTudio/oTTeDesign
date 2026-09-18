import type { Metadata } from "next";
import {
  baseURL,
  description as defaultDescription,
  indexable,
  siteName,
} from "@/config";

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

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["WebSite", "WebApplication"],
    name: siteName,
    url: baseURL,
    description: defaultDescription,
    applicationCategory: "DesignApplication",
    operatingSystem: "Web",
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
