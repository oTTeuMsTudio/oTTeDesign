"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
} from "react";
import type { License } from "@/lib/catalog";

export type CartLine = {
  slug: string;
  license: License;
};

type Store = {
  cart: CartLine[];
  wishlist: string[];
  library: string[];
};

const empty: Store = { cart: [], wishlist: [], library: [] };
const KEY = "otte-store";
let memory = empty;
const listeners = new Set<() => void>();

function read(): Store {
  if (typeof window === "undefined") return empty;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return memory;
    const parsed = JSON.parse(raw) as Store;
    memory = {
      cart: parsed.cart ?? [],
      wishlist: parsed.wishlist ?? [],
      library: parsed.library ?? [],
    };
    return memory;
  } catch {
    return memory;
  }
}

function write(next: Store) {
  memory = next;
  if (typeof window !== "undefined") {
    window.localStorage.setItem(KEY, JSON.stringify(next));
  }
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function useStore() {
  return useSyncExternalStore(subscribe, read, () => empty);
}

type CartContextValue = Store & {
  addToCart: (slug: string, license?: License) => void;
  removeFromCart: (slug: string) => void;
  toggleWishlist: (slug: string) => void;
  checkout: () => void;
  inCart: (slug: string) => boolean;
  inWishlist: (slug: string) => boolean;
  inLibrary: (slug: string) => boolean;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const store = useStore();

  const addToCart = useCallback((slug: string, license: License = "personal") => {
    const current = read();
    if (current.library.includes(slug)) return;
    const cart = current.cart.some((line) => line.slug === slug)
      ? current.cart.map((line) => (line.slug === slug ? { slug, license } : line))
      : [...current.cart, { slug, license }];
    write({ ...current, cart });
  }, []);

  const removeFromCart = useCallback((slug: string) => {
    const current = read();
    write({ ...current, cart: current.cart.filter((line) => line.slug !== slug) });
  }, []);

  const toggleWishlist = useCallback((slug: string) => {
    const current = read();
    const wishlist = current.wishlist.includes(slug)
      ? current.wishlist.filter((item) => item !== slug)
      : [...current.wishlist, slug];
    write({ ...current, wishlist });
  }, []);

  const checkout = useCallback(() => {
    const current = read();
    const library = Array.from(
      new Set([...current.library, ...current.cart.map((line) => line.slug)]),
    );
    write({ ...current, cart: [], library });
  }, []);

  const value = useMemo<CartContextValue>(
    () => ({
      ...store,
      addToCart,
      removeFromCart,
      toggleWishlist,
      checkout,
      inCart: (slug) => store.cart.some((line) => line.slug === slug),
      inWishlist: (slug) => store.wishlist.includes(slug),
      inLibrary: (slug) => store.library.includes(slug),
    }),
    [store, addToCart, removeFromCart, toggleWishlist, checkout],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
