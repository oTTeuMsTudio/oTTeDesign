import Link from "next/link";
import { OtteMark } from "@/components/otte-mark";

const columns = [
  {
    title: "Marketplace",
    links: [
      { href: "/search", label: "Discover" },
      { href: "/search?offer=free", label: "Free assets" },
      { href: "/search?offer=sale", label: "On sale" },
      { href: "/sell", label: "Sell on oTTe" },
    ],
  },
  {
    title: "Channels",
    links: [
      { href: "/search?channel=unreal", label: "Unreal Engine" },
      { href: "/search?channel=unity", label: "Unity" },
      { href: "/search?channel=blender", label: "Blender" },
      { href: "/search?channel=universal", label: "Universal formats" },
    ],
  },
  {
    title: "Product types",
    links: [
      { href: "/search?type=environments", label: "Environments" },
      { href: "/search?type=characters", label: "Characters" },
      { href: "/search?type=materials", label: "Materials" },
      { href: "/search?type=vfx", label: "VFX" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-white/8 bg-[#0a0a0a]">
      <div className="mx-auto grid max-w-[1400px] gap-8 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4 lg:px-6">
        <div>
          <Link href="/" className="flex items-center gap-2">
            <OtteMark />
            <span className="text-lg font-semibold tracking-tight">oTTe</span>
          </Link>
          <p className="mt-3 max-w-xs text-sm text-muted-foreground">
            A creator-first marketplace for environments, characters, materials, and tools — built for every engine.
          </p>
        </div>
        {columns.map((column) => (
          <div key={column.title}>
            <p className="text-xs font-semibold tracking-[0.14em] text-muted-foreground uppercase">
              {column.title}
            </p>
            <ul className="mt-3 space-y-2">
              {column.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-foreground/80 hover:text-foreground">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-white/8 px-4 py-4 text-xs text-muted-foreground lg:px-6">
        © {new Date().getFullYear()} oTTe Design. All listings are original catalog content.
      </div>
    </footer>
  );
}
