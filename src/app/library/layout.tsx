import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "Library",
  "/library",
  "Games you’ve checked out on oTTeGames live in your library.",
  { index: false },
);

export default function LibraryLayout({ children }: { children: React.ReactNode }) {
  return children;
}
