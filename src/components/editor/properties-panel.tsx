"use client";

import type { ReactNode } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEditor } from "@/components/editor/editor-provider";
import {
  findShadingPreset,
  METALNESS_OPTIONS,
  resolveShading,
  ROUGHNESS_OPTIONS,
  SHADING_PRESETS,
} from "@/lib/editor/scene";
import type { Vec3 } from "@/lib/editor/types";

export function PropertiesPanel() {
  const { objects, selected, select, updateObject } = useEditor();
  const shading = selected ? resolveShading(selected) : null;
  const activePreset = shading
    ? findShadingPreset(shading.roughness, shading.metalness)
    : null;

  return (
    <aside className="pointer-events-none absolute top-3 bottom-12 left-16 z-10 hidden w-52 flex-col gap-2 overflow-y-auto sm:flex">
      <section className="pointer-events-auto overflow-hidden rounded-xl border border-zinc-200 bg-white/95 shadow-sm backdrop-blur">
        <h2 className="border-b border-zinc-200 px-3 py-2 text-xs font-medium tracking-wide text-zinc-500 uppercase">
          Objects
        </h2>
        <ul className="max-h-36 overflow-auto p-1">
          {objects.length === 0 ? (
            <li className="px-2 py-2 text-xs text-zinc-500">Empty scene</li>
          ) : (
            objects.map((object) => (
              <li key={object.id}>
                <button
                  type="button"
                  onClick={() => select(object.id)}
                  className={`flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm ${
                    selected?.id === object.id
                      ? "bg-zinc-100 text-zinc-950"
                      : "text-zinc-700 hover:bg-zinc-50"
                  }`}
                >
                  <span
                    className="size-2.5 shrink-0 rounded-sm border border-zinc-300"
                    style={{ backgroundColor: object.color }}
                  />
                  <span className="truncate">{object.name}</span>
                </button>
              </li>
            ))
          )}
        </ul>
      </section>
      {selected && shading ? (
        <section className="pointer-events-auto rounded-xl border border-zinc-200 bg-white/95 shadow-sm backdrop-blur">
          <h2 className="border-b border-zinc-200 px-3 py-2 text-xs font-medium tracking-wide text-zinc-500 uppercase">
            Shading
          </h2>
          <div className="space-y-2 p-2 pb-3">
            <OptionGroup label="Look">
              {SHADING_PRESETS.map((preset) => (
                <OptionButton
                  key={preset.id}
                  label={preset.label}
                  pressed={activePreset?.id === preset.id}
                  onClick={() =>
                    updateObject(selected.id, {
                      roughness: preset.roughness,
                      metalness: preset.metalness,
                    })
                  }
                />
              ))}
            </OptionGroup>
            <OptionGroup label="Roughness" columns={3}>
              {ROUGHNESS_OPTIONS.map((option) => (
                <OptionButton
                  key={option.id}
                  label={option.label}
                  pressed={Math.abs(shading.roughness - option.value) < 0.03}
                  onClick={() =>
                    updateObject(selected.id, { roughness: option.value })
                  }
                />
              ))}
            </OptionGroup>
            <SliderField
              label="Roughness"
              value={shading.roughness}
              onPreview={(roughness) =>
                updateObject(selected.id, { roughness }, { history: false })
              }
              onCheckpoint={() =>
                updateObject(
                  selected.id,
                  { roughness: shading.roughness },
                  { history: true },
                )
              }
            />
            <OptionGroup label="Metallic" columns={3}>
              {METALNESS_OPTIONS.map((option) => (
                <OptionButton
                  key={option.id}
                  label={option.label}
                  pressed={Math.abs(shading.metalness - option.value) < 0.03}
                  onClick={() =>
                    updateObject(selected.id, { metalness: option.value })
                  }
                />
              ))}
            </OptionGroup>
            <SliderField
              label="Metallic"
              value={shading.metalness}
              onPreview={(metalness) =>
                updateObject(selected.id, { metalness }, { history: false })
              }
              onCheckpoint={() =>
                updateObject(
                  selected.id,
                  { metalness: shading.metalness },
                  { history: true },
                )
              }
            />
          </div>
        </section>
      ) : null}
      {selected ? (
        <section className="pointer-events-auto overflow-hidden rounded-xl border border-zinc-200 bg-white/95 shadow-sm backdrop-blur">
          <h2 className="border-b border-zinc-200 px-3 py-2 text-xs font-medium tracking-wide text-zinc-500 uppercase">
            Properties
          </h2>
          <div className="space-y-3 p-3">
            <Field label="Name">
              <Input
                value={selected.name}
                onChange={(event) =>
                  updateObject(selected.id, { name: event.target.value })
                }
              />
            </Field>
            <Field label="Color">
              <Input
                type="color"
                value={normalizeHex(selected.color)}
                className="h-8 cursor-pointer p-1"
                onChange={(event) =>
                  updateObject(selected.id, { color: event.target.value })
                }
              />
            </Field>
            <VecField
              label="Position"
              value={selected.position}
              onChange={(position) => updateObject(selected.id, { position })}
            />
            <VecField
              label="Rotation"
              value={selected.rotation}
              step={0.1}
              onChange={(rotation) => updateObject(selected.id, { rotation })}
            />
            <VecField
              label="Scale"
              value={selected.scale}
              onChange={(scale) => updateObject(selected.id, { scale })}
            />
          </div>
        </section>
      ) : null}
    </aside>
  );
}

function OptionGroup({
  label,
  columns = 1,
  children,
}: {
  label: string;
  columns?: 1 | 3;
  children: ReactNode;
}) {
  return (
    <div className="space-y-1">
      <Label className="px-1 text-[11px] text-zinc-500">{label}</Label>
      <div
        className={
          columns === 3 ? "grid grid-cols-3 gap-0.5" : "flex flex-col gap-px"
        }
      >
        {children}
      </div>
    </div>
  );
}

function OptionButton({
  label,
  pressed,
  onClick,
}: {
  label: string;
  pressed: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={onClick}
      className={`w-full rounded-md px-1.5 py-1 text-left text-xs leading-tight ${
        pressed
          ? "bg-zinc-100 font-medium text-zinc-950"
          : "text-zinc-700 hover:bg-zinc-50"
      }`}
    >
      {label}
    </button>
  );
}

function SliderField({
  label,
  value,
  onPreview,
  onCheckpoint,
}: {
  label: string;
  value: number;
  onPreview: (value: number) => void;
  onCheckpoint: () => void;
}) {
  return (
    <div className="space-y-1 px-1">
      <div className="flex items-center justify-between">
        <Label className="text-[11px] text-zinc-500">{label}</Label>
        <span className="text-[11px] tabular-nums text-zinc-500">
          {value.toFixed(2)}
        </span>
      </div>
      <input
        type="range"
        min={0}
        max={1}
        step={0.01}
        value={value}
        aria-label={label}
        className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-zinc-200 accent-zinc-950"
        onPointerDown={onCheckpoint}
        onKeyDown={(event) => {
          if (
            event.key === "ArrowLeft" ||
            event.key === "ArrowRight" ||
            event.key === "Home" ||
            event.key === "End"
          ) {
            onCheckpoint();
          }
        }}
        onChange={(event) => onPreview(Number(event.currentTarget.value))}
      />
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="space-y-1">
      <Label className="text-[11px] text-zinc-500">{label}</Label>
      {children}
    </div>
  );
}

function VecField({
  label,
  value,
  step = 0.1,
  onChange,
}: {
  label: string;
  value: Vec3;
  step?: number;
  onChange: (value: Vec3) => void;
}) {
  const axes = ["X", "Y", "Z"] as const;
  return (
    <div className="space-y-1">
      <Label className="text-[11px] text-zinc-500">{label}</Label>
      <div className="grid grid-cols-3 gap-1">
        {axes.map((axis, index) => (
          <Input
            key={axis}
            aria-label={`${label} ${axis}`}
            type="number"
            step={step}
            value={Number.isFinite(value[index]) ? value[index] : 0}
            className="px-1.5 text-xs"
            onChange={(event) => {
              const next = [...value] as Vec3;
              next[index] = Number(event.target.value);
              onChange(next);
            }}
          />
        ))}
      </div>
    </div>
  );
}

function normalizeHex(color: string) {
  if (/^#[0-9a-fA-F]{6}$/.test(color)) return color;
  return "#18181b";
}
