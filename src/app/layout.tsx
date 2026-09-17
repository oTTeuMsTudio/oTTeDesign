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
    default: "oTTe — Game marketplace",
    template: "%s · oTTe",
  },
  description: "A simple marketplace for games. Browse the catalog, add titles to your cart, and keep a library of what you own.",
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
            <Suspense fallback={<div className="h-14 border-b border-border bg-background" />}>
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
