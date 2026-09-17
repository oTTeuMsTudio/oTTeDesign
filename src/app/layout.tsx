import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Suspense } from "react";
import { CartProvider } from "@/components/cart-provider";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "oTTe — The creator-first marketplace",
    template: "%s · oTTe",
  },
  description:
    "Discover, buy, and share digital assets for Unreal, Unity, Blender, and every other tool. oTTe is a creator-first marketplace for environments, characters, materials, and VFX.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`dark ${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <TooltipProvider>
          <CartProvider>
            <Suspense fallback={<div className="h-14 border-b border-white/8 bg-[#0c0c0c]" />}>
              <SiteHeader />
            </Suspense>
            {children}
            <SiteFooter />
          </CartProvider>
        </TooltipProvider>
      </body>
    </html>
  );
}
