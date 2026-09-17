"use client";

import Image from "next/image";
import Link from "next/link";
import { formatPrice, productHref } from "@/lib/format";
import type { Product } from "@/lib/catalog";
import { Button } from "@/components/ui/button";
import { useCart } from "@/components/cart-provider";

export function HeroFeatured({ products }: { products: Product[] }) {
  const { addToCart, inLibrary } = useCart();
  const [lead, ...rest] = products;

  if (!lead) return null;

  return (
    <div className="grid gap-3 lg:grid-cols-5">
      <FeaturedTile
        product={lead}
        className="lg:col-span-3"
        owned={inLibrary(lead.slug)}
        onGet={() => addToCart(lead.slug)}
      />
      <div className="grid h-full gap-3 lg:col-span-2">
        {rest.slice(0, 2).map((product) => (
          <FeaturedTile
            key={product.slug}
            product={product}
            compact
            owned={inLibrary(product.slug)}
            onGet={() => addToCart(product.slug)}
          />
        ))}
      </div>
    </div>
  );
}

function FeaturedTile({
  product,
  className,
  compact,
  owned,
  onGet,
}: {
  product: Product;
  className?: string;
  compact?: boolean;
  owned: boolean;
  onGet: () => void;
}) {
  return (
    <article className={`group relative overflow-hidden rounded-xl bg-muted ${className ?? ""}`}>
      <Link href={productHref(product)} className="block">
        <div className={compact ? "relative aspect-[16/8] lg:aspect-auto lg:h-full lg:min-h-[180px]" : "relative aspect-[16/9]"}>
          <Image
            src={product.image}
            alt={product.title}
            fill
            priority
            sizes="(min-width:1024px) 50vw, 100vw"
            className="object-cover transition duration-700 group-hover:scale-[1.03]"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4 sm:p-5">
          <div>
            <p className="text-[11px] font-medium tracking-wide text-white/70 uppercase">
              Featured · {product.publisher}
            </p>
            <h2 className="text-xl font-semibold tracking-tight text-white sm:text-2xl">
              {product.title}
            </h2>
            <p className="mt-1 line-clamp-1 text-sm text-white/75">{product.description}</p>
          </div>
        </div>
      </Link>
      <div className="absolute top-3 right-3 flex items-center gap-2">
        <span
          className={`rounded-md px-2 py-1 text-xs font-semibold ${
            product.price === 0 ? "bg-[#c8ff4a] text-black" : "bg-black/60 text-white backdrop-blur"
          }`}
        >
          {owned ? "In library" : formatPrice(product.price)}
        </span>
        <Button
          size="sm"
          className="bg-white text-black hover:bg-white/90"
          onClick={(event) => {
            event.preventDefault();
            onGet();
          }}
        >
          {owned ? "Owned" : product.price === 0 ? "Get" : "Add"}
        </Button>
      </div>
    </article>
  );
}
