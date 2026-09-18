import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main
      id="main"
      className="flex h-full flex-col items-center justify-center bg-white px-4 text-center text-black"
    >
      <p className="text-sm text-zinc-500">404</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight">
        We couldn’t find that page.
      </h1>
      <Button asChild className="mt-6">
        <Link href="/">Back to the editor</Link>
      </Button>
    </main>
  );
}
