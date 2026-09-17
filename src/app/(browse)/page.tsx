import { HeroFeatured } from "@/components/hero-featured";
import { ProductRow } from "@/components/product-row";
import { products } from "@/lib/catalog";

export default function DiscoverPage() {
  const hero = products.filter((product) => product.hero);
  const featured = products.filter((product) => product.featured);
  const free = products.filter((product) => product.freeThisMonth || product.price === 0);
  const fresh = products.filter((product) => product.isNew);
  const sale = products.filter((product) => product.originalPrice);
  const environments = products.filter((product) => product.type === "environments");
  const characters = products.filter((product) => product.type === "characters" || product.type === "vehicles");

  return (
    <div className="space-y-10 pb-8">
      <HeroFeatured products={hero} />
      <ProductRow title="Featured" href="/search?sort=rating" products={featured} />
      <ProductRow title="Free this month" href="/search?offer=free" products={free} />
      <ProductRow title="New this week" href="/search?sort=newest" products={fresh} />
      <ProductRow title="On sale" href="/search?offer=sale" products={sale} />
      <ProductRow title="Environments" href="/search?type=environments" products={environments} />
      <ProductRow title="Characters & vehicles" href="/search?type=characters" products={characters} />
    </div>
  );
}
