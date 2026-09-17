import Link from "next/link";
import { Button } from "@/components/ui/button";

const points = [
  {
    title: "88% revenue share",
    body: "Keep more of what you earn. oTTe is built around a creator-first split on every paid listing.",
  },
  {
    title: "Every engine, one listing",
    body: "Ship Unreal, Unity, Blender, and universal formats from a single product page — buyers filter by the tool they use.",
  },
  {
    title: "A real-time 3D gallery",
    body: "Show work the way it will be used. Listings open with a cinematic still, inspector-ready previews, and format chips on hover.",
  },
];

export const metadata = {
  title: "Sell on oTTe",
};

export default function SellPage() {
  return (
    <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-16 lg:px-6">
      <p className="text-xs font-semibold tracking-[0.16em] text-[#c8ff4a] uppercase">For publishers</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
        The creator-first marketplace.
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
        oTTe is an open, tool-agnostic store for digital assets. Publish environments, characters, materials, and
        tools — then reach Unreal, Unity, and DCC artists from one catalog.
      </p>
      <div className="mt-8 flex gap-3">
        <Button asChild size="lg" className="bg-white text-black hover:bg-white/90">
          <Link href="/search">Explore the catalog</Link>
        </Button>
        <Button asChild size="lg" variant="outline">
          <Link href="/library">Open library</Link>
        </Button>
      </div>
      <div className="mt-16 grid gap-4 sm:grid-cols-3">
        {points.map((point) => (
          <article key={point.title} className="rounded-xl border border-white/8 bg-[#141414] p-5">
            <h2 className="font-semibold tracking-tight">{point.title}</h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">{point.body}</p>
          </article>
        ))}
      </div>
    </main>
  );
}
