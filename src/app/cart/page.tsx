"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import { useCart } from "@/components/cart-provider";
import { getProduct, licensePrice } from "@/lib/catalog";
import { formatPrice, productHref } from "@/lib/format";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/empty-state";

export default function CartPage() {
  const { cart, removeFromCart, checkout } = useCart();
  const lines = cart
    .map((line) => {
      const product = getProduct(line.slug);
      if (!product) return null;
      return { ...line, product, price: licensePrice(product, line.license) };
    })
    .filter((line) => line !== null);

  const total = useMemo(() => lines.reduce((sum, line) => sum + line.price, 0), [lines]);

  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8 lg:px-6">
      <h1 className="text-2xl font-semibold tracking-tight">Cart</h1>
      {lines.length === 0 ? (
        <EmptyState title="Your cart is empty" href="/" action="Discover assets" />
      ) : (
        <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
          <ul className="divide-y divide-white/8 rounded-xl border border-white/8">
            {lines.map((line) => (
              <li key={line.slug} className="flex gap-4 p-4">
                <Link href={productHref(line.product)} className="relative h-20 w-32 shrink-0 overflow-hidden rounded-md">
                  <Image src={line.product.image} alt="" fill className="object-cover" />
                </Link>
                <div className="min-w-0 flex-1">
                  <Link href={productHref(line.product)} className="font-medium hover:underline">
                    {line.product.title}
                  </Link>
                  <p className="text-xs text-muted-foreground">{line.product.publisher}</p>
                  <p className="mt-1 text-xs capitalize text-muted-foreground">{line.license} license</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">{formatPrice(line.price)}</p>
                  <button
                    type="button"
                    className="mt-2 text-xs text-muted-foreground hover:text-foreground"
                    onClick={() => removeFromCart(line.slug)}
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <aside className="h-fit rounded-xl border border-white/8 bg-[#161616] p-5">
            <p className="text-sm text-muted-foreground">Subtotal</p>
            <p className="mt-1 text-3xl font-semibold">{formatPrice(total)}</p>
            <Button size="lg" className="mt-5 h-11 w-full bg-white text-black hover:bg-white/90" onClick={checkout}>
              Place order
            </Button>
            <p className="mt-3 text-xs text-muted-foreground">
              Demo checkout adds these listings to your library. No payment is collected.
            </p>
          </aside>
        </div>
      )}
    </main>
  );
}


