"use client";

import { Suspense, useEffect, useRef, useState, type ComponentRef } from "react";
import { Canvas } from "@react-three/fiber";
import {
  ContactShadows,
  Environment,
  GizmoHelper,
  GizmoViewport,
  Grid,
  OrbitControls,
  TransformControls,
} from "@react-three/drei";
import type { ThreeEvent } from "@react-three/fiber";
import type { Mesh } from "three";
import { useEditor } from "@/components/editor/editor-provider";
import { resolveShading, roundVec } from "@/lib/editor/scene";
import type { SceneObject, ShapeKind, TransformMode } from "@/lib/editor/types";

export function Viewport() {
  const {
    objects,
    selectedId,
    select,
    transformMode,
    showGrid,
    wireframe,
    applyTransform,
    registerCameraReset,
  } = useEditor();
  const [dragging, setDragging] = useState(false);
  const controlsRef = useRef<ComponentRef<typeof OrbitControls>>(null);

  useEffect(() => {
    registerCameraReset(() => {
      controlsRef.current?.reset();
    });
  }, [registerCameraReset]);

  return (
    <div className="absolute inset-0 bg-white">
      <Canvas
        shadows
        camera={{ position: [5, 3.6, 6.5], fov: 42, near: 0.1, far: 80 }}
        onPointerMissed={(event) => {
          if (event.type === "click") select(null);
        }}
        gl={{ antialias: true, alpha: false }}
      >
        <color attach="background" args={["#ffffff"]} />
        <ambientLight intensity={0.42} />
        <hemisphereLight args={["#ffffff", "#d4d4d8", 0.28]} />
        <directionalLight
          position={[6, 9, 4]}
          intensity={1.15}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <Suspense fallback={null}>
          <Environment preset="studio" environmentIntensity={0.65} />
        </Suspense>
        {showGrid ? (
          <Grid
            args={[20, 20]}
            cellSize={0.5}
            cellThickness={0.6}
            cellColor="#ececef"
            sectionSize={2}
            sectionThickness={1.1}
            sectionColor="#e4e4e7"
            fadeDistance={28}
            fadeStrength={1.2}
            infiniteGrid
            position={[0, 0, 0]}
          />
        ) : null}
        {objects.map((object) => (
          <SceneMesh
            key={object.id}
            object={object}
            selected={object.id === selectedId}
            mode={transformMode}
            wireframe={wireframe}
            onSelect={select}
            onDragChange={setDragging}
            onCommit={(patch) => applyTransform(object.id, patch)}
          />
        ))}
        <ContactShadows
          opacity={0.28}
          scale={24}
          blur={2.2}
          far={10}
          resolution={512}
          color="#09090b"
        />
        <OrbitControls
          ref={controlsRef}
          makeDefault
          enabled={!dragging}
          enableDamping
          dampingFactor={0.08}
          minDistance={2}
          maxDistance={30}
        />
        <GizmoHelper alignment="bottom-right" margin={[72, 72]}>
          <GizmoViewport
            axisColors={["#ef4444", "#22c55e", "#3b82f6"]}
            labelColor="#18181b"
          />
        </GizmoHelper>
      </Canvas>
      <p className="pointer-events-none absolute bottom-3 left-1/2 z-10 -translate-x-1/2 rounded-full border border-zinc-200 bg-white/90 px-3 py-1 text-[11px] text-zinc-500 shadow-sm">
        Drag gizmo to transform · orbit to look around · G move · R rotate · S scale
      </p>
    </div>
  );
}

function SceneMesh({
  object,
  selected,
  mode,
  wireframe,
  onSelect,
  onDragChange,
  onCommit,
}: {
  object: SceneObject;
  selected: boolean;
  mode: TransformMode;
  wireframe: boolean;
  onSelect: (id: string) => void;
  onDragChange: (dragging: boolean) => void;
  onCommit: (patch: {
    position: SceneObject["position"];
    rotation: SceneObject["rotation"];
    scale: SceneObject["scale"];
  }) => void;
}) {
  const [mesh, setMesh] = useState<Mesh | null>(null);

  function handleClick(event: ThreeEvent<MouseEvent>) {
    event.stopPropagation();
    onSelect(object.id);
  }

  return (
    <>
      <mesh
        ref={setMesh}
        name={object.id}
        position={object.position}
        rotation={object.rotation}
        scale={object.scale}
        castShadow
        receiveShadow
        onClick={handleClick}
      >
        <ShapeGeometry shape={object.shape} />
        <MeshShading object={object} wireframe={wireframe} />
      </mesh>
      {selected && mesh ? (
        <TransformControls
          object={mesh}
          mode={mode}
          size={0.85}
          onMouseDown={() => onDragChange(true)}
          onMouseUp={() => {
            onDragChange(false);
            onCommit({
              position: roundVec([mesh.position.x, mesh.position.y, mesh.position.z]),
              rotation: roundVec([mesh.rotation.x, mesh.rotation.y, mesh.rotation.z]),
              scale: roundVec([mesh.scale.x, mesh.scale.y, mesh.scale.z]),
            });
          }}
        />
      ) : null}
    </>
  );
}

function MeshShading({
  object,
  wireframe,
}: {
  object: SceneObject;
  wireframe: boolean;
}) {
  const { roughness, metalness } = resolveShading(object);
  return (
    <meshStandardMaterial
      color={object.color}
      wireframe={wireframe}
      roughness={roughness}
      metalness={metalness}
      envMapIntensity={1.05}
    />
  );
}

function ShapeGeometry({ shape }: { shape: ShapeKind }) {
  switch (shape) {
    case "sphere":
      return <sphereGeometry args={[0.5, 32, 32]} />;
    case "cylinder":
      return <cylinderGeometry args={[0.45, 0.45, 1, 32]} />;
    case "cone":
      return <coneGeometry args={[0.5, 1, 32]} />;
    case "torus":
      return <torusGeometry args={[0.38, 0.16, 16, 48]} />;
    case "plane":
      return <planeGeometry args={[1, 1]} />;
    case "capsule":
      return <capsuleGeometry args={[0.32, 0.55, 8, 16]} />;
    default:
      return <boxGeometry args={[1, 1, 1]} />;
  }
}
