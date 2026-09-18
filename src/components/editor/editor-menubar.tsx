"use client";

import { useRef, type ReactNode } from "react";
import { OtteMark } from "@/components/otte-mark";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  findShadingPreset,
  METALNESS_OPTIONS,
  resolveShading,
  ROUGHNESS_OPTIONS,
  SHADING_PRESETS,
} from "@/lib/editor/scene";
import { SHAPES, type ShapeKind } from "@/lib/editor/types";
import { useEditor } from "@/components/editor/editor-provider";

const SHAPE_LABELS: Record<ShapeKind, string> = {
  box: "Cube",
  sphere: "Sphere",
  cylinder: "Cylinder",
  cone: "Cone",
  torus: "Torus",
  plane: "Plane",
  capsule: "Capsule",
};

export function EditorMenubar() {
  const {
    addObject,
    newScene,
    undo,
    redo,
    canUndo,
    canRedo,
    duplicateSelected,
    deleteSelected,
    selected,
    updateObject,
    exportScene,
    importScene,
    showGrid,
    setShowGrid,
    wireframe,
    setWireframe,
    resetCamera,
  } = useEditor();
  const fileRef = useRef<HTMLInputElement>(null);
  const shading = selected ? resolveShading(selected) : null;
  const activePreset = shading
    ? findShadingPreset(shading.roughness, shading.metalness)
    : null;
  const roughnessOption =
    shading &&
    ROUGHNESS_OPTIONS.find(
      (option) => Math.abs(option.value - shading.roughness) < 0.03,
    );
  const metalnessOption =
    shading &&
    METALNESS_OPTIONS.find(
      (option) => Math.abs(option.value - shading.metalness) < 0.03,
    );

  return (
    <header className="flex h-12 shrink-0 items-center gap-2 border-b border-zinc-200 bg-white px-3">
      <h1 className="flex shrink-0 items-center">
        <OtteMark />
        <span className="sr-only">3D design editor</span>
      </h1>
      <nav className="flex min-w-0 flex-1 items-center gap-0.5 overflow-x-auto" aria-label="Editor menus">
        <Menu label="File">
          <DropdownMenuItem onSelect={() => newScene()}>New scene</DropdownMenuItem>
          <DropdownMenuItem onSelect={() => fileRef.current?.click()}>
            Import JSON…
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => exportScene()}>Export JSON</DropdownMenuItem>
        </Menu>
        <Menu label="Edit">
          <DropdownMenuItem disabled={!canUndo} onSelect={() => undo()}>
            Undo
            <DropdownMenuShortcut>Ctrl+Z</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem disabled={!canRedo} onSelect={() => redo()}>
            Redo
            <DropdownMenuShortcut>Ctrl+Shift+Z</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem disabled={!selected} onSelect={() => duplicateSelected()}>
            Duplicate
            <DropdownMenuShortcut>Ctrl+D</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem
            disabled={!selected}
            variant="destructive"
            onSelect={() => deleteSelected()}
          >
            Delete
            <DropdownMenuShortcut>Del</DropdownMenuShortcut>
          </DropdownMenuItem>
        </Menu>
        <Menu label="Object">
          {SHAPES.map((shape) => (
            <DropdownMenuItem key={shape} onSelect={() => addObject(shape)}>
              Add {SHAPE_LABELS[shape]}
            </DropdownMenuItem>
          ))}
        </Menu>
        <Menu label="Shading">
          <DropdownMenuLabel>Look</DropdownMenuLabel>
          <DropdownMenuRadioGroup
            value={activePreset?.id ?? ""}
            onValueChange={(id) => {
              const preset = SHADING_PRESETS.find((item) => item.id === id);
              if (!selected || !preset) return;
              updateObject(selected.id, {
                roughness: preset.roughness,
                metalness: preset.metalness,
              });
            }}
          >
            {SHADING_PRESETS.map((preset) => (
              <DropdownMenuRadioItem
                key={preset.id}
                value={preset.id}
                disabled={!selected}
              >
                {preset.label}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
          <DropdownMenuSeparator />
          <DropdownMenuSub>
            <DropdownMenuSubTrigger disabled={!selected}>
              Roughness
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuRadioGroup
                value={roughnessOption ? roughnessOption.id : ""}
                onValueChange={(id) => {
                  const option = ROUGHNESS_OPTIONS.find((item) => item.id === id);
                  if (!selected || !option) return;
                  updateObject(selected.id, { roughness: option.value });
                }}
              >
                {ROUGHNESS_OPTIONS.map((option) => (
                  <DropdownMenuRadioItem key={option.id} value={option.id}>
                    {option.label}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger disabled={!selected}>
              Metallic
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuRadioGroup
                value={metalnessOption ? metalnessOption.id : ""}
                onValueChange={(id) => {
                  const option = METALNESS_OPTIONS.find((item) => item.id === id);
                  if (!selected || !option) return;
                  updateObject(selected.id, { metalness: option.value });
                }}
              >
                {METALNESS_OPTIONS.map((option) => (
                  <DropdownMenuRadioItem key={option.id} value={option.id}>
                    {option.label}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        </Menu>
        <Menu label="View">
          <DropdownMenuItem onSelect={() => resetCamera()}>Reset camera</DropdownMenuItem>
          <DropdownMenuItem onSelect={() => setShowGrid(!showGrid)}>
            {showGrid ? "Hide grid" : "Show grid"}
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => setWireframe(!wireframe)}>
            {wireframe ? "Shaded" : "Wireframe"}
          </DropdownMenuItem>
        </Menu>
      </nav>
      <input
        ref={fileRef}
        type="file"
        accept="application/json,.json"
        className="hidden"
        onChange={(event) => {
          const file = event.target.files?.[0];
          if (file) void importScene(file);
          event.target.value = "";
        }}
      />
    </header>
  );
}

function Menu({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="rounded-md px-2 py-1 text-sm text-zinc-700 hover:bg-zinc-100 focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:outline-none"
      >
        {label}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="min-w-48">
        {children}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
