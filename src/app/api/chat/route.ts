import {
  convertToModelMessages,
  createUIMessageStreamResponse,
  isStepCount,
  streamText,
  toUIMessageStream,
  tool,
  type UIMessage,
} from "ai";
import { xai } from "@ai-sdk/xai";
import { z } from "zod";
import type { SceneSnapshot } from "@/lib/editor/types";

const shading = z.enum(["matte", "plastic", "rubber", "metal", "chrome"]);

export const maxDuration = 30;

const vec3 = z.object({
  x: z.number(),
  y: z.number(),
  z: z.number(),
});

const shape = z.enum([
  "box",
  "sphere",
  "cylinder",
  "cone",
  "torus",
  "plane",
  "capsule",
]);

export async function POST(req: Request) {
  if (!process.env.XAI_API_KEY) {
    return Response.json(
      {
        error:
          "Missing XAI_API_KEY. Add it to .env.local to enable the AI assistant.",
      },
      { status: 500 },
    );
  }

  const { messages, scene }: { messages: UIMessage[]; scene?: SceneSnapshot } =
    await req.json();

  const sceneSummary = JSON.stringify(scene ?? { objects: [], selectedId: null });

  const result = streamText({
    model: xai("grok-4.6"),
    system: `You are the oTTeDesign 3D editor assistant. Help the user build and edit a scene of primitive meshes.
Use tools to change the scene. Prefer concise replies after tools run.
Coordinates: Y is up. The ground is y=0. Sit solid objects at y=0.5 unless told otherwise.
Colors should be hex like #ef4444.
Shading uses roughness 0-1 and metalness 0-1, or presets matte, plastic, rubber, metal, chrome.
Current scene JSON: ${sceneSummary}`,
    messages: await convertToModelMessages(messages),
    stopWhen: isStepCount(6),
    tools: {
      addObject: tool({
        description: "Add a primitive mesh to the 3D scene.",
        inputSchema: z.object({
          shape,
          name: z.string().optional(),
          color: z.string().optional(),
          position: vec3.optional(),
          rotation: vec3.optional(),
          scale: vec3.optional(),
          roughness: z.number().min(0).max(1).optional(),
          metalness: z.number().min(0).max(1).optional(),
          shading: shading.optional(),
        }),
        execute: async (input) => ({ ok: true, action: "addObject", ...input }),
      }),
      updateObject: tool({
        description: "Update an existing object by id or name.",
        inputSchema: z.object({
          id: z.string().optional(),
          name: z.string().optional(),
          newName: z.string().optional(),
          color: z.string().optional(),
          position: vec3.optional(),
          rotation: vec3.optional(),
          scale: vec3.optional(),
          roughness: z.number().min(0).max(1).optional(),
          metalness: z.number().min(0).max(1).optional(),
          shading: shading.optional(),
        }),
        execute: async (input) => ({ ok: true, action: "updateObject", ...input }),
      }),
      deleteObject: tool({
        description: "Delete an object by id or name.",
        inputSchema: z.object({
          id: z.string().optional(),
          name: z.string().optional(),
        }),
        execute: async (input) => ({ ok: true, action: "deleteObject", ...input }),
      }),
      selectObject: tool({
        description: "Select an object by id or name.",
        inputSchema: z.object({
          id: z.string().optional(),
          name: z.string().optional(),
        }),
        execute: async (input) => ({ ok: true, action: "selectObject", ...input }),
      }),
      clearScene: tool({
        description: "Reset the scene to a single default cube.",
        inputSchema: z.object({}),
        execute: async () => ({ ok: true, action: "clearScene" }),
      }),
    },
  });

  return createUIMessageStreamResponse({
    stream: toUIMessageStream({ stream: result.stream }),
  });
}
