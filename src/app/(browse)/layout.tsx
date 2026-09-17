import { Suspense } from "react";
import { DiscoverSidebar } from "@/components/discover-sidebar";

export default function BrowseLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto flex w-full max-w-[1500px] flex-1">
      <aside className="sticky top-14 hidden h-[calc(100vh-3.5rem)] w-[220px] shrink-0 overflow-y-auto border-r border-white/8 px-3 py-5 lg:block">
        <Suspense>
          <DiscoverSidebar />
        </Suspense>
      </aside>
      <div className="min-w-0 flex-1 px-4 py-5 lg:px-6">{children}</div>
    </div>
  );
}
