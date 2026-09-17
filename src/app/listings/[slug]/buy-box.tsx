"use client";

import { useMemo, useState } from "react";
import { Heart, ShoppingCart } from "lucide-react";
import { useCart } from "@/components/cart-provider";
import { licensePrice, type License, type Product } from "@/lib/catalog";
import { formatPrice } from "@/lib/format";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function BuyBox({ product }: { product: Product }) {
  const { addToCart, inCart, inLibrary, inWishlist, toggleWishlist } = useCart();
  const [license, setLicense] = useState<License>("personal");
  const price = useMemo(() => licensePrice(product, license), [product, license]);
  const owned = inLibrary(product.slug);

  return (
    <aside className="rounded-xl border border-white/8 bg-[#161616] p-5">
      <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">License</p>
      <Select value={license} onValueChange={(value) => setLicense(value as License)}>
        <SelectTrigger className="mt-2 w-full">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="personal">Personal — {formatPrice(licensePrice(product, "personal"))}</SelectItem>
          <SelectItem value="professional">
            Professional — {formatPrice(licensePrice(product, "professional"))}
          </SelectItem>
        </SelectContent>
      </Select>
      <p className="mt-2 text-xs text-muted-foreground">
        {license === "professional"
          ? "Seats for studios, commercial shipping, and work-for-hire."
          : "For personal projects, education, and portfolios."}
      </p>

      <div className="mt-5 flex items-end justify-between">
        <div>
          {product.originalPrice && product.price > 0 ? (
            <p className="text-sm text-muted-foreground line-through">
              {formatPrice(license === "professional" ? product.originalPrice * 2.5 : product.originalPrice)}
            </p>
          ) : null}
          <p className={`text-3xl font-semibold ${price === 0 ? "text-[#c8ff4a]" : "text-white"}`}>
            {owned ? "Owned" : formatPrice(price)}
          </p>
        </div>
        <p className="text-xs text-muted-foreground">Prices shown don’t include taxes</p>
      </div>

      <div className="mt-5 grid gap-2">
        <Button
          size="lg"
          className="h-11 w-full bg-white text-black hover:bg-white/90"
          disabled={owned}
          onClick={() => addToCart(product.slug, license)}
        >
          {owned ? "In your library" : price === 0 ? "Get now" : inCart(product.slug) ? "Added to cart" : "Buy now"}
        </Button>
        {!owned && price > 0 ? (
          <Button
            size="lg"
            variant="outline"
            className="h-11 w-full"
            onClick={() => addToCart(product.slug, license)}
          >
            <ShoppingCart />
            {inCart(product.slug) ? "In cart" : "Add to cart"}
          </Button>
        ) : null}
        <Button size="lg" variant="ghost" className="h-11 w-full" onClick={() => toggleWishlist(product.slug)}>
          <Heart className={inWishlist(product.slug) ? "fill-current text-[#c8ff4a]" : undefined} />
          {inWishlist(product.slug) ? "On your wishlist" : "Add to wishlist"}
        </Button>
      </div>

      <div className="mt-6 border-t border-white/8 pt-4">
        <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">Included formats</p>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {product.formats.map((format) => (
            <span key={format} className="rounded-md bg-white/6 px-2 py-1 text-xs">
              {format}
            </span>
          ))}
        </div>
      </div>
    </aside>
  );
}
