import { SHAPES, type SceneObject, type ShapeKind, type Vec3 } from "@/lib/editor/types";

const PALETTE = [
  "#18181b",
  "#3f3f46",
  "#0ea5e9",
  "#f59e0b",
  "#ef4444",
  "#22c55e",
  "#8b5cf6",
];

export const DEFAULT_ROUGHNESS = 0.42;
export const DEFAULT_METALNESS = 0.06;

export const SHADING_PRESETS = [
  { id: "matte", label: "Matte", roughness: 0.92, metalness: 0 },
  { id: "plastic", label: "Plastic", roughness: 0.42, metalness: 0.06 },
  { id: "rubber", label: "Rubber", roughness: 0.78, metalness: 0 },
  { id: "metal", label: "Metal", roughness: 0.25, metalness: 0.88 },
  { id: "chrome", label: "Chrome", roughness: 0.05, metalness: 1 },
] as const;

export type ShadingPresetId = (typeof SHADING_PRESETS)[number]["id"];

export const ROUGHNESS_OPTIONS = [
  { id: "rough", label: "Rough", value: 0.9 },
  { id: "medium", label: "Medium", value: 0.45 },
  { id: "smooth", label: "Smooth", value: 0.08 },
] as const;

export const METALNESS_OPTIONS = [
  { id: "off", label: "Off", value: 0 },
  { id: "mixed", label: "Mixed", value: 0.5 },
  { id: "full", label: "Full", value: 1 },
] as const;

export function clamp01(value: number) {
  if (!Number.isFinite(value)) return 0;
  return Math.min(1, Math.max(0, value));
}

export function resolveShading(object: Partial<Pick<SceneObject, "roughness" | "metalness">>) {
  return {
    roughness: clamp01(
      typeof object.roughness === "number" ? object.roughness : DEFAULT_ROUGHNESS,
    ),
    metalness: clamp01(
      typeof object.metalness === "number" ? object.metalness : DEFAULT_METALNESS,
    ),
  };
}

export function findShadingPreset(roughness: number, metalness: number) {
  return (
    SHADING_PRESETS.find(
      (preset) =>
        Math.abs(preset.roughness - roughness) < 0.03 &&
        Math.abs(preset.metalness - metalness) < 0.03,
    ) ?? null
  );
}

export function findShadingPresetById(id: string) {
  return SHADING_PRESETS.find((preset) => preset.id === id) ?? null;
}

export function isShape(value: string): value is ShapeKind {
  return (SHAPES as readonly string[]).includes(value);
}

export function roundVec(vec: Vec3, digits = 3): Vec3 {
  const f = 10 ** digits;
  return [
    Math.round(vec[0] * f) / f,
    Math.round(vec[1] * f) / f,
    Math.round(vec[2] * f) / f,
  ];
}

export function createId() {
  return crypto.randomUUID();
}

export function defaultName(shape: ShapeKind, objects: SceneObject[]) {
  const count = objects.filter((object) => object.shape === shape).length + 1;
  return `${shape[0].toUpperCase()}${shape.slice(1)} ${count}`;
}

export function createObject(
  shape: ShapeKind,
  objects: SceneObject[],
  overrides: Partial<SceneObject> = {},
): SceneObject {
  const index = objects.length;
  const y = shape === "plane" ? 0 : 0.5;
  return {
    id: overrides.id ?? createId(),
    name: overrides.name ?? defaultName(shape, objects),
    shape,
    position: overrides.position ?? [index * 0.2, y, index * 0.2],
    rotation: overrides.rotation ?? (shape === "plane" ? [-Math.PI / 2, 0, 0] : [0, 0, 0]),
    scale: overrides.scale ?? (shape === "plane" ? [4, 4, 1] : [1, 1, 1]),
    color: overrides.color ?? PALETTE[index % PALETTE.length],
    ...resolveShading(overrides),
  };
}

export function starterScene(): SceneObject[] {
  return [
    createObject("box", [], {
      name: "Cube",
      position: [0, 0.5, 0],
      color: "#18181b",
    }),
  ];
}

export function cloneObjects(objects: SceneObject[]): SceneObject[] {
  return objects.map((object) => ({
    ...object,
    position: [...object.position] as Vec3,
    rotation: [...object.rotation] as Vec3,
    scale: [...object.scale] as Vec3,
  }));
}

export function findObject(objects: SceneObject[], idOrName: string) {
  const needle = idOrName.trim().toLowerCase();
  return (
    objects.find((object) => object.id === idOrName) ??
    objects.find((object) => object.name.toLowerCase() === needle)
  );
}
