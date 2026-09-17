"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import { useCart } from "@/components/cart-provider";
import { discountPercent, type Product } from "@/lib/catalog";
import { formatPrice, productHref } from "@/lib/format";
import { cn } from "@/lib/utils";

export function ProductCard({
  product,
  size = "default",
}: {
  product: Product;
  size?: "default" | "hero";
}) {
  const { inWishlist, toggleWishlist, inLibrary } = useCart();
  const off = discountPercent(product);
  const wished = inWishlist(product.slug);
  const owned = inLibrary(product.slug);

  return (
    <article className={cn("group relative", size === "hero" && "min-w-0")}>
      <Link href={productHref(product)} className="block">
        <div
          className={cn(
            "relative overflow-hidden rounded-lg bg-muted",
            size === "hero" ? "aspect-[16/10]" : "aspect-video",
          )}
        >
          <Image
            src={product.image}
            alt={product.title}
            fill
            sizes={size === "hero" ? "(min-width:1024px) 33vw, 100vw" : "(min-width:1024px) 20vw, 50vw"}
            className="object-cover transition duration-500 group-hover:scale-[1.04]"
          />
          {off > 0 ? (
            <span className="absolute top-2 left-2 rounded bg-[#e11d48] px-1.5 py-0.5 text-[11px] font-semibold text-white">
              -{off}%
            </span>
          ) : null}
          {product.price === 0 ? (
            <span className="absolute top-2 left-2 rounded bg-[#c8ff4a] px-1.5 py-0.5 text-[11px] font-semibold text-black">
              Free
            </span>
          ) : null}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 flex gap-1 p-2 opacity-0 transition group-hover:opacity-100">
            {product.formats.slice(0, 3).map((format) => (
              <span
                key={format}
                className="rounded bg-black/70 px-1.5 py-0.5 text-[10px] font-medium text-white backdrop-blur-sm"
              >
                {format}
              </span>
            ))}
          </div>
        </div>
        <div className="mt-2 flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="truncate text-[13px] font-medium tracking-tight text-foreground">
              {product.title}
            </h3>
            <p className="truncate text-xs text-muted-foreground">{product.publisher}</p>
          </div>
          <p
            className={cn(
              "shrink-0 text-[13px] font-semibold",
              product.price === 0 ? "text-[#c8ff4a]" : "text-foreground",
            )}
          >
            {owned ? "Owned" : formatPrice(product.price)}
          </p>
        </div>
      </Link>
      <button
        type="button"
        aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
        onClick={() => toggleWishlist(product.slug)}
        className={cn(
          "absolute top-2 right-2 flex size-8 items-center justify-center rounded-full bg-black/55 text-white opacity-0 backdrop-blur-sm transition group-hover:opacity-100 hover:bg-black/80",
          wished && "opacity-100 text-[#c8ff4a]",
        )}
      >
        <Heart className={cn("size-4", wished && "fill-current")} />
      </button>
    </article>
  );
}
