"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Heart, Menu, ShoppingCart, User } from "lucide-react";
import { OtteMark } from "@/components/otte-mark";
import { SearchBar } from "@/components/search-bar";
import { DiscoverSidebar } from "@/components/discover-sidebar";
import { useCart } from "@/components/cart-provider";
import { Button } from "@/components/ui/button";
import { CHANNELS, PRODUCT_TYPES } from "@/lib/catalog";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

export function SiteHeader() {
  const pathname = usePathname();
  const { cart, wishlist } = useCart();
  const discoverActive = pathname === "/" || pathname.startsWith("/search");

  return (
    <header className="sticky top-0 z-50 border-b border-white/8 bg-[#0c0c0c]/90 backdrop-blur-md">
      <div className="flex h-14 items-center gap-3 px-3 sm:px-4 lg:px-6">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon-sm" className="lg:hidden" aria-label="Open menu">
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72 bg-[#111] pt-8">
            <SheetHeader>
              <SheetTitle className="text-left">Discover</SheetTitle>
            </SheetHeader>
            <div className="mt-4">
              <DiscoverSidebar />
            </div>
          </SheetContent>
        </Sheet>

        <Link href="/" className="flex items-center gap-2 pr-2 text-foreground">
          <OtteMark />
          <span className="text-[17px] font-semibold tracking-tight">oTTe</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className={cn(
                  "rounded-md px-3 py-1.5 text-sm text-muted-foreground transition hover:bg-white/5 hover:text-foreground",
                  discoverActive && "bg-white/8 font-medium text-foreground",
                )}
              >
                Discover
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-64">
              <DropdownMenuLabel>Product types</DropdownMenuLabel>
              {PRODUCT_TYPES.map((type) => (
                <DropdownMenuItem key={type.slug} asChild>
                  <Link href={`/search?type=${type.slug}`}>{type.label}</Link>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuLabel>Channels</DropdownMenuLabel>
              {CHANNELS.map((channel) => (
                <DropdownMenuItem key={channel.slug} asChild>
                  <Link href={`/search?channel=${channel.slug}`}>{channel.label}</Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Link
            href="/library"
            className={cn(
              "rounded-md px-3 py-1.5 text-sm text-muted-foreground transition hover:bg-white/5 hover:text-foreground",
              pathname === "/library" && "bg-white/8 font-medium text-foreground",
            )}
          >
            Library
          </Link>
          <Link
            href="/sell"
            className={cn(
              "rounded-md px-3 py-1.5 text-sm text-muted-foreground transition hover:bg-white/5 hover:text-foreground",
              pathname === "/sell" && "bg-white/8 font-medium text-foreground",
            )}
          >
            Sell
          </Link>
        </nav>

        <div className="mx-auto hidden min-w-0 max-w-xl flex-1 md:block">
          <SearchBar />
        </div>

        <div className="ml-auto flex items-center gap-1">
          <Button variant="ghost" size="icon" asChild aria-label="Wishlist">
            <Link href="/wishlist" className="relative">
              <Heart className={pathname === "/wishlist" ? "fill-current" : undefined} />
              {wishlist.length > 0 ? (
                <Count>{wishlist.length}</Count>
              ) : null}
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild aria-label="Cart">
            <Link href="/cart" className="relative">
              <ShoppingCart />
              {cart.length > 0 ? <Count>{cart.length}</Count> : null}
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild aria-label="Account">
            <Link href="/library">
              <User />
            </Link>
          </Button>
        </div>
      </div>
      <div className="border-t border-white/8 px-3 py-2 md:hidden">
        <SearchBar />
      </div>
    </header>
  );
}

function Count({ children }: { children: number }) {
  return (
    <span className="absolute -top-0.5 -right-0.5 flex size-4 items-center justify-center rounded-full bg-[#c8ff4a] text-[10px] font-bold text-black">
      {children}
    </span>
  );
}
