export const SHAPES = [
  "box",
  "sphere",
  "cylinder",
  "cone",
  "torus",
  "plane",
  "capsule",
] as const;

export type ShapeKind = (typeof SHAPES)[number];
export type TransformMode = "translate" | "rotate" | "scale";
export type Vec3 = [number, number, number];

export type SceneObject = {
  id: string;
  name: string;
  shape: ShapeKind;
  position: Vec3;
  rotation: Vec3;
  scale: Vec3;
  color: string;
  roughness: number;
  metalness: number;
};

export type SceneSnapshot = {
  objects: SceneObject[];
  selectedId: string | null;
};

export type TransformPatch = {
  position: Vec3;
  rotation: Vec3;
  scale: Vec3;
};
