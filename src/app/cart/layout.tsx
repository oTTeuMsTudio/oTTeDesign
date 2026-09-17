import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "Cart",
  "/cart",
  "Your oTTeGames cart. Demo checkout adds titles to your library — no payment is collected.",
  { index: false },
);

export default function CartLayout({ children }: { children: React.ReactNode }) {
  return children;
}
