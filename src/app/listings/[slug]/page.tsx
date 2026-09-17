import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Star } from "lucide-react";
import { BuyBox } from "@/app/listings/[slug]/buy-box";
import { ProductCard } from "@/components/product-card";
import { getProduct, getPublisherProducts, products } from "@/lib/catalog";
import { formatRatingCount } from "@/lib/format";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "Listing · oTTe" };
  return {
    title: `${product.title} · oTTe`,
    description: product.description,
  };
}

export default async function ListingPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const more = getPublisherProducts(product.publisherSlug).filter((item) => item.slug !== product.slug);

  return (
    <main className="mx-auto w-full max-w-[1400px] px-4 py-6 lg:px-6">
      <p className="text-xs text-muted-foreground">
        <Link href="/" className="hover:text-foreground">
          Discover
        </Link>
        <span className="mx-1.5">/</span>
        <Link href={`/search?type=${product.type}`} className="capitalize hover:text-foreground">
          {product.type}
        </Link>
        <span className="mx-1.5">/</span>
        <span className="text-foreground">{product.title}</span>
      </p>

      <div className="mt-4 grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_380px]">
        <div>
          <div className="relative aspect-video overflow-hidden rounded-xl bg-muted">
            <Image
              src={product.image}
              alt={product.title}
              fill
              priority
              sizes="(min-width:1024px) 60vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="mt-3 flex gap-2">
            <div className="relative h-16 w-28 overflow-hidden rounded-md ring-2 ring-white">
              <Image src={product.image} alt="" fill className="object-cover" />
            </div>
          </div>
        </div>
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">{product.title}</h1>
          <div className="mt-2 flex flex-wrap items-center gap-3 text-sm">
            <Link
              href={`/publishers/${product.publisherSlug}`}
              className="font-medium hover:underline"
            >
              {product.publisher}
            </Link>
            <span className="flex items-center gap-1 text-muted-foreground">
              <Star className="size-3.5 fill-amber-400 text-amber-400" />
              {product.rating} ({formatRatingCount(product.ratingCount)})
            </span>
            {product.isNew ? <Badge>New</Badge> : null}
          </div>
          <p className="mt-4 text-sm leading-6 text-muted-foreground">{product.description}</p>
          <div className="mt-5">
            <BuyBox product={product} />
          </div>
        </div>
      </div>

      <Tabs defaultValue="overview" className="mt-10">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="details">Details</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="mt-6 max-w-3xl text-sm leading-7 text-foreground/85">
          <p>{product.details}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {product.tags.map((tag) => (
              <Link key={tag} href={`/search?q=${encodeURIComponent(tag)}`}>
                <Badge variant="secondary" className="capitalize">
                  {tag}
                </Badge>
              </Link>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="details" className="mt-6">
          <dl className="grid max-w-xl grid-cols-2 gap-x-6 gap-y-3 text-sm">
            <Row label="Type" value={product.type} />
            <Row label="Style" value={product.style} />
            <Row label="Triangles" value={product.triangles} />
            <Row label="Channels" value={product.channels.join(", ")} />
            <Row label="Generated with AI" value="No" />
            <Row label="Age rating" value="Everyone" />
          </dl>
        </TabsContent>
      </Tabs>

      {more.length > 0 ? (
        <>
          <Separator className="my-10" />
          <section>
            <h2 className="text-lg font-semibold tracking-tight">More from {product.publisher}</h2>
            <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
              {more.map((item) => (
                <ProductCard key={item.slug} product={item} />
              ))}
            </div>
          </section>
        </>
      ) : null}
    </main>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <>
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="capitalize">{value}</dd>
    </>
  );
}
