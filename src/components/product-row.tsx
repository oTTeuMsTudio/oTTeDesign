"use client";

import { useRef } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ProductCard } from "@/components/product-card";
import type { Product } from "@/lib/catalog";
import { Button } from "@/components/ui/button";

export function ProductRow({
  title,
  href,
  products,
}: {
  title: string;
  href: string;
  products: Product[];
}) {
  const scroller = useRef<HTMLDivElement>(null);

  if (products.length === 0) return null;

  function scroll(dir: number) {
    scroller.current?.scrollBy({ left: dir * 320, behavior: "smooth" });
  }

  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between gap-3">
        <Link href={href} className="text-lg font-semibold tracking-tight hover:underline">
          {title}
        </Link>
        <div className="flex items-center gap-1">
          <Link
            href={href}
            className="mr-2 text-xs text-muted-foreground hover:text-foreground"
          >
            See all
          </Link>
          <Button
            type="button"
            size="icon-sm"
            variant="outline"
            aria-label="Scroll left"
            onClick={() => scroll(-1)}
          >
            <ChevronLeft />
          </Button>
          <Button
            type="button"
            size="icon-sm"
            variant="outline"
            aria-label="Scroll right"
            onClick={() => scroll(1)}
          >
            <ChevronRight />
          </Button>
        </div>
      </div>
      <div
        ref={scroller}
        className="flex gap-3 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {products.map((product) => (
          <div key={product.slug} className="w-[240px] shrink-0 sm:w-[260px]">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
}
