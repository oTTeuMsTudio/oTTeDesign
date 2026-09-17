import { ProductCard } from "@/components/product-card";
import { CHANNELS, PRODUCT_TYPES, searchProducts } from "@/lib/catalog";
import { SearchFilters } from "@/app/(browse)/search/search-filters";

export const metadata = {
  title: "Search",
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const raw = await searchParams;
  const filters = {
    q: str(raw.q),
    type: str(raw.type),
    channel: str(raw.channel),
    offer: str(raw.offer),
    style: str(raw.style),
    sort: str(raw.sort),
  };
  const results = searchProducts(filters);
  const heading = headingFor(filters);

  return (
    <div className="pb-10">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-medium tracking-[0.14em] text-muted-foreground uppercase">Search</p>
          <h1 className="text-2xl font-semibold tracking-tight">{heading}</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {results.length} listing{results.length === 1 ? "" : "s"}
          </p>
        </div>
        <SearchFilters filters={filters} />
      </div>

      {results.length === 0 ? (
        <div className="mt-16 rounded-xl border border-white/8 bg-[#141414] p-10 text-center">
          <p className="text-lg font-medium">No listings match those filters.</p>
          <p className="mt-1 text-sm text-muted-foreground">Try a broader search or clear a product type.</p>
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-6 md:grid-cols-3 xl:grid-cols-4">
          {results.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

function str(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function headingFor(filters: {
  q?: string;
  type?: string;
  channel?: string;
  offer?: string;
}) {
  if (filters.q) return `Results for “${filters.q}”`;
  if (filters.offer === "free") return "Free";
  if (filters.offer === "sale") return "On sale";
  const type = PRODUCT_TYPES.find((item) => item.slug === filters.type);
  if (type) return type.label;
  const channel = CHANNELS.find((item) => item.slug === filters.channel);
  if (channel) return channel.label;
  return "All listings";
}
