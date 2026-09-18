"use client";

import type { ReactNode } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEditor } from "@/components/editor/editor-provider";
import type { Vec3 } from "@/lib/editor/types";

export function PropertiesPanel() {
  const { objects, selected, select, updateObject } = useEditor();

  return (
    <aside className="pointer-events-none absolute top-3 bottom-12 left-16 z-10 hidden w-52 flex-col gap-2 sm:flex">
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
