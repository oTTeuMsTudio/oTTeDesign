import type { Product } from "@/lib/catalog";

export function formatPrice(value: number) {
  if (value === 0) return "Free";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatRatingCount(count: number) {
  return new Intl.NumberFormat("en-US").format(count);
}

export function productHref(product: Product) {
  return `/listings/${product.slug}`;
}
