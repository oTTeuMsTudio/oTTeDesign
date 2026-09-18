"use client";

import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useEditor } from "@/components/editor/editor-provider";
import type { ShapeKind, TransformMode } from "@/lib/editor/types";
import {
  Box,
  Circle,
  Cone,
  Cylinder,
  Move3d,
  RotateCcw,
  Scaling,
  Square,
  Torus,
} from "lucide-react";

const TOOLS: { mode: TransformMode; label: string; shortcut: string; icon: typeof Move3d }[] = [
  { mode: "translate", label: "Move", shortcut: "G", icon: Move3d },
  { mode: "rotate", label: "Rotate", shortcut: "R", icon: RotateCcw },
  { mode: "scale", label: "Scale", shortcut: "S", icon: Scaling },
];

const SHAPE_TOOLS: { shape: ShapeKind; label: string; icon: typeof Box }[] = [
  { shape: "box", label: "Cube", icon: Box },
  { shape: "sphere", label: "Sphere", icon: Circle },
  { shape: "cylinder", label: "Cylinder", icon: Cylinder },
  { shape: "cone", label: "Cone", icon: Cone },
  { shape: "torus", label: "Torus", icon: Torus },
  { shape: "plane", label: "Plane", icon: Square },
];

export function ToolRail() {
  const { transformMode, setTransformMode, addObject } = useEditor();

  return (
    <div className="pointer-events-none absolute top-3 left-3 z-10 flex flex-col gap-2">
      <div className="pointer-events-auto flex flex-col gap-1 rounded-xl border border-zinc-200 bg-white/95 p-1 shadow-sm backdrop-blur">
        {TOOLS.map((tool) => (
          <RailButton
            key={tool.mode}
            label={`${tool.label} (${tool.shortcut})`}
            pressed={transformMode === tool.mode}
            onClick={() => setTransformMode(tool.mode)}
          >
            <tool.icon />
          </RailButton>
        ))}
      </div>
      <div className="pointer-events-auto flex flex-col gap-1 rounded-xl border border-zinc-200 bg-white/95 p-1 shadow-sm backdrop-blur">
        {SHAPE_TOOLS.map((tool) => (
          <RailButton
            key={tool.shape}
            label={`Add ${tool.label}`}
            onClick={() => addObject(tool.shape)}
          >
            <tool.icon />
          </RailButton>
        ))}
      </div>
    </div>
  );
}

function RailButton({
  label,
  pressed,
  onClick,
  children,
}: {
  label: string;
  pressed?: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          type="button"
          size="icon-sm"
          variant={pressed ? "secondary" : "ghost"}
          aria-label={label}
          aria-pressed={pressed}
          onClick={onClick}
        >
          {children}
        </Button>
      </TooltipTrigger>
      <TooltipContent side="right">{label}</TooltipContent>
    </Tooltip>
  );
}
