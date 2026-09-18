"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  cloneObjects,
  createObject,
  findObject,
  isShape,
  resolveShading,
  starterScene,
} from "@/lib/editor/scene";
import type {
  SceneObject,
  SceneSnapshot,
  ShapeKind,
  TransformMode,
  TransformPatch,
  Vec3,
} from "@/lib/editor/types";

type EditorContextValue = {
  objects: SceneObject[];
  selectedId: string | null;
  selected: SceneObject | null;
  transformMode: TransformMode;
  showGrid: boolean;
  wireframe: boolean;
  canUndo: boolean;
  canRedo: boolean;
  setTransformMode: (mode: TransformMode) => void;
  select: (id: string | null) => void;
  addObject: (shape: ShapeKind, overrides?: Partial<SceneObject>) => string;
  updateObject: (
    id: string,
    patch: Partial<SceneObject>,
    options?: { history?: boolean },
  ) => void;
  applyTransform: (id: string, patch: TransformPatch) => void;
  deleteSelected: () => void;
  deleteObject: (idOrName: string) => boolean;
  duplicateSelected: () => void;
  newScene: () => void;
  undo: () => void;
  redo: () => void;
  setShowGrid: (value: boolean) => void;
  setWireframe: (value: boolean) => void;
  resetCamera: () => void;
  registerCameraReset: (fn: () => void) => void;
  exportScene: () => void;
  importScene: (file: File) => Promise<void>;
  snapshot: () => SceneSnapshot;
};

const EditorContext = createContext<EditorContextValue | null>(null);
const HISTORY_LIMIT = 50;

export function EditorProvider({ children }: { children: ReactNode }) {
  const [objects, setObjects] = useState<SceneObject[]>(starterScene);
  const [requestedId, setRequestedId] = useState<string | null | undefined>(
    undefined,
  );
  const [transformMode, setTransformMode] = useState<TransformMode>("translate");
  const [showGrid, setShowGrid] = useState(true);
  const [wireframe, setWireframe] = useState(false);
  const [past, setPast] = useState<SceneObject[][]>([]);
  const [future, setFuture] = useState<SceneObject[][]>([]);
  const cameraResetRef = useRef<(() => void) | null>(null);

  const selectedId =
    requestedId === null
      ? null
      : requestedId && objects.some((object) => object.id === requestedId)
        ? requestedId
        : (objects[0]?.id ?? null);

  const selected = useMemo(
    () => objects.find((object) => object.id === selectedId) ?? null,
    [objects, selectedId],
  );

  const remember = useCallback((current: SceneObject[]) => {
    setPast((value) => [...value, cloneObjects(current)].slice(-HISTORY_LIMIT));
    setFuture([]);
  }, []);

  const select = useCallback((id: string | null) => {
    setRequestedId(id);
  }, []);

  const addObject = useCallback(
    (shape: ShapeKind, overrides: Partial<SceneObject> = {}) => {
      const nextObject = createObject(shape, objects, overrides);
      remember(objects);
      setObjects([...objects, nextObject]);
      setRequestedId(nextObject.id);
      return nextObject.id;
    },
    [objects, remember],
  );

  const updateObject = useCallback(
    (
      id: string,
      patch: Partial<SceneObject>,
      options?: { history?: boolean },
    ) => {
      if (!objects.some((object) => object.id === id)) return;
      const clean = Object.fromEntries(
        Object.entries(patch).filter(([, value]) => value !== undefined),
      ) as Partial<SceneObject>;
      if (Object.keys(clean).length === 0) return;
      if (options?.history !== false) remember(objects);
      setObjects(
        objects.map((object) =>
          object.id === id ? { ...object, ...clean } : object,
        ),
      );
    },
    [objects, remember],
  );

  const applyTransform = useCallback(
    (id: string, patch: TransformPatch) => {
      const target = objects.find((object) => object.id === id);
      if (!target) return;
      const same =
        target.position.every((value, i) => value === patch.position[i]) &&
        target.rotation.every((value, i) => value === patch.rotation[i]) &&
        target.scale.every((value, i) => value === patch.scale[i]);
      if (same) return;
      remember(objects);
      setObjects(
        objects.map((object) =>
          object.id === id ? { ...object, ...patch } : object,
        ),
      );
    },
    [objects, remember],
  );

  const deleteObject = useCallback(
    (idOrName: string) => {
      const target = findObject(objects, idOrName);
      if (!target) return false;
      remember(objects);
      const next = objects.filter((object) => object.id !== target.id);
      setObjects(next);
      setRequestedId((id) => (id === target.id ? (next.at(-1)?.id ?? null) : id));
      return true;
    },
    [objects, remember],
  );

  const deleteSelected = useCallback(() => {
    if (selectedId) deleteObject(selectedId);
  }, [deleteObject, selectedId]);

  const duplicateSelected = useCallback(() => {
    const target = objects.find((object) => object.id === selectedId);
    if (!target) return;
    const copy = createObject(target.shape, objects, {
      ...target,
      id: undefined,
      name: `${target.name} copy`,
      position: [
        target.position[0] + 0.6,
        target.position[1],
        target.position[2] + 0.6,
      ] as Vec3,
    });
    remember(objects);
    setObjects([...objects, copy]);
    setRequestedId(copy.id);
  }, [objects, remember, selectedId]);

  const newScene = useCallback(() => {
    remember(objects);
    const next = starterScene();
    setObjects(next);
    setRequestedId(next[0]?.id ?? null);
  }, [objects, remember]);

  const undo = useCallback(() => {
    const previous = past.at(-1);
    if (!previous) return;
    setPast((value) => value.slice(0, -1));
    setFuture((value) => [cloneObjects(objects), ...value]);
    setObjects(previous);
    setRequestedId(previous.at(-1)?.id ?? null);
  }, [objects, past]);

  const redo = useCallback(() => {
    const next = future[0];
    if (!next) return;
    setFuture((value) => value.slice(1));
    setPast((value) => [...value, cloneObjects(objects)]);
    setObjects(next);
    setRequestedId(next.at(-1)?.id ?? null);
  }, [future, objects]);

  const resetCamera = useCallback(() => {
    cameraResetRef.current?.();
  }, []);

  const registerCameraReset = useCallback((fn: () => void) => {
    cameraResetRef.current = fn;
  }, []);

  const exportScene = useCallback(() => {
    const blob = new Blob([JSON.stringify({ objects }, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "ottedesign-scene.json";
    anchor.click();
    URL.revokeObjectURL(url);
  }, [objects]);

  const importScene = useCallback(
    async (file: File) => {
      const text = await file.text();
      const parsed = JSON.parse(text) as { objects?: SceneObject[] };
      if (!Array.isArray(parsed.objects)) {
        throw new Error("Invalid scene file.");
      }
      const next = parsed.objects
        .filter((object) => object && isShape(object.shape))
        .map((object) => ({ ...object, ...resolveShading(object) }));
      remember(objects);
      setObjects(next);
      setRequestedId(next[0]?.id ?? null);
    },
    [objects, remember],
  );

  const snapshot = useCallback(
    (): SceneSnapshot => ({
      objects: cloneObjects(objects),
      selectedId,
    }),
    [objects, selectedId],
  );

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      const target = event.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.tagName === "SELECT" ||
          target.isContentEditable)
      ) {
        return;
      }

      const meta = event.metaKey || event.ctrlKey;
      if (meta && event.key.toLowerCase() === "z") {
        event.preventDefault();
        if (event.shiftKey) redo();
        else undo();
        return;
      }
      if (meta && event.key.toLowerCase() === "d") {
        event.preventDefault();
        duplicateSelected();
        return;
      }
      if (event.key === "Delete" || event.key === "Backspace") {
        event.preventDefault();
        deleteSelected();
        return;
      }
      if (event.key === "Escape") {
        select(null);
        return;
      }
      if (event.key.toLowerCase() === "g") setTransformMode("translate");
      if (event.key.toLowerCase() === "r") setTransformMode("rotate");
      if (event.key.toLowerCase() === "s" && !meta) setTransformMode("scale");
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [deleteSelected, duplicateSelected, redo, select, undo]);

  const value = useMemo<EditorContextValue>(
    () => ({
      objects,
      selectedId,
      selected,
      transformMode,
      showGrid,
      wireframe,
      canUndo: past.length > 0,
      canRedo: future.length > 0,
      setTransformMode,
      select,
      addObject,
      updateObject,
      applyTransform,
      deleteSelected,
      deleteObject,
      duplicateSelected,
      newScene,
      undo,
      redo,
      setShowGrid,
      setWireframe,
      resetCamera,
      registerCameraReset,
      exportScene,
      importScene,
      snapshot,
    }),
    [
      addObject,
      applyTransform,
      deleteObject,
      deleteSelected,
      duplicateSelected,
      exportScene,
      future.length,
      importScene,
      newScene,
      objects,
      past.length,
      redo,
      registerCameraReset,
      resetCamera,
      select,
      selected,
      selectedId,
      showGrid,
      snapshot,
      transformMode,
      undo,
      updateObject,
      wireframe,
    ],
  );

  return (
    <EditorContext.Provider value={value}>{children}</EditorContext.Provider>
  );
}

export function useEditor() {
  const value = useContext(EditorContext);
  if (!value) {
    throw new Error("useEditor must be used within EditorProvider");
  }
  return value;
}
