import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-4 py-24 text-center">
      <p className="text-sm text-muted-foreground">404</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight">We couldn’t find that page.</h1>
      <Button asChild className="mt-6">
        <Link href="/">Back to the store</Link>
      </Button>
    </main>
  );
}
