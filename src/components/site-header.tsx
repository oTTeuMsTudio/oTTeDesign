"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Library, Menu, Search, ShoppingCart } from "lucide-react";
import { OtteMark } from "@/components/otte-mark";
import { useCart } from "@/components/cart-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Store" },
  { href: "/games", label: "Browse" },
  { href: "/library", label: "Library" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const { cart } = useCart();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex h-14 w-full max-w-[1400px] items-center gap-3 px-4 lg:px-6">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon-sm" className="md:hidden" aria-label="Open menu">
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72 pt-8">
            <SheetHeader>
              <SheetTitle className="text-left">oTTe</SheetTitle>
            </SheetHeader>
            <nav className="mt-6 flex flex-col gap-1">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-md px-3 py-2 text-sm hover:bg-muted"
                >
                  {link.label}
                </Link>
              ))}
              <Link href="/cart" className="rounded-md px-3 py-2 text-sm hover:bg-muted">
                Cart {cart.length > 0 ? `(${cart.length})` : ""}
              </Link>
            </nav>
          </SheetContent>
        </Sheet>

        <Link href="/" className="flex items-center gap-2 text-foreground">
          <OtteMark />
          <span className="text-[17px] font-semibold tracking-tight">oTTe</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-md px-3 py-1.5 text-sm text-muted-foreground transition hover:bg-muted hover:text-foreground",
                  active && "bg-muted font-medium text-foreground",
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <form action="/games" className="relative mx-auto hidden min-w-0 max-w-md flex-1 md:block">
          <Search className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input name="q" placeholder="Search games" className="pl-8" />
        </form>

        <div className="ml-auto flex items-center gap-1">
          <Button variant="ghost" size="icon" asChild aria-label="Library" className="md:hidden">
            <Link href="/library">
              <Library />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild aria-label="Cart">
            <Link href="/cart" className="relative">
              <ShoppingCart />
              {cart.length > 0 ? (
                <span className="absolute -top-0.5 -right-0.5 flex size-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                  {cart.length}
                </span>
              ) : null}
            </Link>
          </Button>
        </div>
      </div>
      <form action="/games" className="border-t border-border px-4 py-2 md:hidden">
        <div className="relative">
          <Search className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input name="q" placeholder="Search games" className="pl-8" />
        </div>
      </form>
    </header>
  );
}
