"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import {
  Box,
  Trees,
  Sparkles,
  UserRound,
  Wind,
  Leaf,
  Car,
  Tag,
  Gift,
} from "lucide-react";
import { CHANNELS, PRODUCT_TYPES } from "@/lib/catalog";
import { cn } from "@/lib/utils";

const typeIcons = {
  "3d": Box,
  environments: Trees,
  materials: Sparkles,
  characters: UserRound,
  vfx: Wind,
  vegetation: Leaf,
  vehicles: Car,
};

export function DiscoverSidebar() {
  const pathname = usePathname();
  const params = useSearchParams();
  const activeType = params.get("type");
  const activeChannel = params.get("channel");
  const activeOffer = params.get("offer");

  return (
    <nav className="space-y-6 text-sm">
      <SidebarGroup label="Offers">
        <Item href="/search?offer=free" active={activeOffer === "free"} icon={Gift}>
          Free
        </Item>
        <Item href="/search?offer=sale" active={activeOffer === "sale"} icon={Tag}>
          On sale
        </Item>
      </SidebarGroup>

      <SidebarGroup label="Channels">
        {CHANNELS.map((channel) => (
          <Item
            key={channel.slug}
            href={`/search?channel=${channel.slug}`}
            active={pathname.startsWith("/search") && activeChannel === channel.slug}
          >
            {channel.label}
          </Item>
        ))}
      </SidebarGroup>

      <SidebarGroup label="Product types">
        {PRODUCT_TYPES.map((type) => {
          const Icon = typeIcons[type.slug];
          return (
            <Item
              key={type.slug}
              href={`/search?type=${type.slug}`}
              active={activeType === type.slug}
              icon={Icon}
            >
              {type.label}
            </Item>
          );
        })}
      </SidebarGroup>
    </nav>
  );
}

function SidebarGroup({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="mb-2 px-2 text-[11px] font-semibold tracking-[0.14em] text-muted-foreground uppercase">
        {label}
      </p>
      <div className="space-y-0.5">{children}</div>
    </div>
  );
}

function Item({
  href,
  active,
  icon: Icon,
  children,
}: {
  href: string;
  active?: boolean;
  icon?: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-2 rounded-md px-2 py-1.5 text-[13px] text-muted-foreground transition hover:bg-white/5 hover:text-foreground",
        active && "bg-white/8 font-medium text-foreground",
      )}
    >
      {Icon ? <Icon className="size-4 opacity-80" /> : null}
      {children}
    </Link>
  );
}
