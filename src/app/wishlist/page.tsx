"use client";

import { ProductCard } from "@/components/product-card";
import { useCart } from "@/components/cart-provider";
import { getProduct } from "@/lib/catalog";
import { EmptyState } from "@/components/empty-state";

export default function WishlistPage() {
  const { wishlist } = useCart();
  const products = wishlist.map((slug) => getProduct(slug)).filter((product) => product !== undefined);

  return (
    <main className="mx-auto w-full max-w-[1400px] flex-1 px-4 py-8 lg:px-6">
      <h1 className="text-2xl font-semibold tracking-tight">Wishlist</h1>
      {products.length === 0 ? (
        <EmptyState title="Nothing saved yet" href="/" action="Browse Discover" />
      ) : (
        <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      )}
    </main>
  );
}
