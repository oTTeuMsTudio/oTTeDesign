"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { Bot } from "lucide-react";
import { EditorProvider } from "@/components/editor/editor-provider";
import { EditorMenubar } from "@/components/editor/editor-menubar";
import { ToolRail } from "@/components/editor/tool-rail";
import { PropertiesPanel } from "@/components/editor/properties-panel";
import { AiBot } from "@/components/editor/ai-bot";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";

const Viewport = dynamic(
  () => import("@/components/editor/viewport").then((mod) => mod.Viewport),
  {
    ssr: false,
    loading: () => (
      <div className="absolute inset-0 flex items-center justify-center bg-white text-sm text-zinc-500">
        Loading viewport…
      </div>
    ),
  },
);

export function EditorShell() {
  const [aiOpen, setAiOpen] = useState(false);

  return (
    <EditorProvider>
      <div
        id="main"
        className="flex h-dvh min-h-0 flex-col bg-white text-black"
      >
        <EditorMenubar />
        <div className="flex min-h-0 flex-1">
          <div className="relative min-w-0 flex-1">
            <Viewport />
            <ToolRail />
            <PropertiesPanel />
            <div className="pointer-events-none absolute inset-0 z-20 lg:hidden">
              <button
                type="button"
                className="pointer-events-auto absolute top-3 right-3 flex size-11 items-center justify-center rounded-full bg-zinc-950 text-white shadow-lg"
                onClick={() => setAiOpen(true)}
                aria-label="Open AI assistant"
              >
                <Bot className="size-5" />
              </button>
            </div>
          </div>
          <aside className="hidden w-[340px] shrink-0 border-l border-zinc-200 lg:block">
            <AiBot />
          </aside>
        </div>
        <Sheet open={aiOpen} onOpenChange={setAiOpen}>
          <SheetContent side="right" className="w-full p-0 sm:max-w-sm">
            <SheetHeader className="sr-only">
              <SheetTitle>AI assistant</SheetTitle>
            </SheetHeader>
            {aiOpen ? <AiBot /> : null}
          </SheetContent>
        </Sheet>
      </div>
    </EditorProvider>
  );
}
