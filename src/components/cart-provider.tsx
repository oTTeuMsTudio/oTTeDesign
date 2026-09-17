"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
} from "react";

type Store = {
  cart: string[];
  library: string[];
};

const empty: Store = { cart: [], library: [] };
const KEY = "otte-games";
let memory = empty;
const listeners = new Set<() => void>();

function read(): Store {
  if (typeof window === "undefined") return empty;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return memory;
    const parsed = JSON.parse(raw) as Partial<Store>;
    memory = {
      cart: parsed.cart ?? [],
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
  return () => {
    listeners.delete(listener);
  };
}

function useStore() {
  return useSyncExternalStore(subscribe, read, () => empty);
}

type CartContextValue = Store & {
  addToCart: (slug: string) => void;
  removeFromCart: (slug: string) => void;
  checkout: () => void;
  inCart: (slug: string) => boolean;
  inLibrary: (slug: string) => boolean;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const store = useStore();

  const addToCart = useCallback((slug: string) => {
    const current = read();
    if (current.library.includes(slug) || current.cart.includes(slug)) return;
    write({ ...current, cart: [...current.cart, slug] });
  }, []);

  const removeFromCart = useCallback((slug: string) => {
    const current = read();
    write({ ...current, cart: current.cart.filter((item) => item !== slug) });
  }, []);

  const checkout = useCallback(() => {
    const current = read();
    write({
      cart: [],
      library: Array.from(new Set([...current.library, ...current.cart])),
    });
  }, []);

  const value = useMemo<CartContextValue>(
    () => ({
      ...store,
      addToCart,
      removeFromCart,
      checkout,
      inCart: (slug) => store.cart.includes(slug),
      inLibrary: (slug) => store.library.includes(slug),
    }),
    [store, addToCart, removeFromCart, checkout],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
