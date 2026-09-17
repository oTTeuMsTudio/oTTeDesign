import { notFound } from "next/navigation";
import { ProductCard } from "@/components/product-card";
import { getPublisherProducts, products } from "@/lib/catalog";

export function generateStaticParams() {
  const slugs = Array.from(new Set(products.map((product) => product.publisherSlug)));
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const listings = getPublisherProducts(slug);
  if (listings.length === 0) return { title: "Publisher · oTTe" };
  return { title: listings[0].publisher };
}

export default async function PublisherPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const listings = getPublisherProducts(slug);
  if (listings.length === 0) notFound();
  const name = listings[0].publisher;

  return (
    <main className="mx-auto w-full max-w-[1400px] flex-1 px-4 py-8 lg:px-6">
      <p className="text-xs font-medium tracking-[0.14em] text-muted-foreground uppercase">Publisher</p>
      <h1 className="mt-1 text-3xl font-semibold tracking-tight">{name}</h1>
      <p className="mt-2 text-sm text-muted-foreground">{listings.length} listings on oTTe</p>
      <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
        {listings.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
    </main>
  );
}
