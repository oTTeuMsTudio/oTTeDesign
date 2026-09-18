"use client";

import { useEffect, useRef, useState } from "react";
import { useChat } from "@ai-sdk/react";
import {
  DefaultChatTransport,
  lastAssistantMessageIsCompleteWithToolCalls,
} from "ai";
import { Bot, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEditor } from "@/components/editor/editor-provider";
import { findObject, findShadingPresetById, isShape } from "@/lib/editor/scene";
import type { SceneSnapshot, ShapeKind, Vec3 } from "@/lib/editor/types";

const sceneAccess = {
  getSnapshot: (): SceneSnapshot => ({ objects: [], selectedId: null }),
};

const SUGGESTIONS = [
  "Add a red cube next to the existing one",
  "Make a small stack of three boxes",
  "Recolor the selected object black",
];

type VecInput = { x: number; y: number; z: number };

export function AiBot() {
  const editor = useEditor();
  const appliedRef = useRef(new Set<string>());
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    sceneAccess.getSnapshot = editor.snapshot;
  }, [editor.snapshot]);

  const [transport] = useState(
    () =>
      new DefaultChatTransport({
        api: "/api/chat",
        prepareSendMessagesRequest: ({ messages, id }) => ({
          body: {
            id,
            messages,
            scene: sceneAccess.getSnapshot(),
          },
        }),
      }),
  );

  const { messages, sendMessage, status, error, clearError } = useChat({
    transport,
    sendAutomaticallyWhen: lastAssistantMessageIsCompleteWithToolCalls,
  });

  useEffect(() => {
    for (const message of messages) {
      if (message.role !== "assistant") continue;
      for (const part of message.parts) {
        if (!("toolCallId" in part) || !part.toolCallId) continue;
        if (!("state" in part) || part.state !== "output-available") continue;
        if (appliedRef.current.has(part.toolCallId)) continue;
        appliedRef.current.add(part.toolCallId);
        applyToolPart(part, editor);
      }
    }
  }, [editor, messages]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, status]);

  const busy = status === "submitted" || status === "streaming";

  function submit(text: string) {
    const trimmed = text.trim();
    if (!trimmed || busy) return;
    clearError();
    sendMessage({ text: trimmed });
    setInput("");
  }

  return (
    <div className="flex h-full min-h-0 flex-col bg-white">
      <div className="flex items-center gap-2 border-b border-zinc-200 px-4 py-3">
        <span className="flex size-7 items-center justify-center rounded-full bg-zinc-950 text-white">
          <Bot className="size-4" />
        </span>
        <div>
          <p className="text-sm font-medium text-zinc-950">AI</p>
          <p className="text-xs text-zinc-500">Scene assistant</p>
        </div>
      </div>
      <ScrollArea className="min-h-0 flex-1">
        <div className="space-y-3 p-4 text-sm">
          {messages.length === 0 ? (
            <div className="space-y-3">
              <p className="text-zinc-600">
                Ask me to add shapes, move objects, or restyle the scene.
              </p>
              <div className="flex flex-col gap-2">
                {SUGGESTIONS.map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    className="rounded-lg border border-zinc-200 px-3 py-2 text-left text-xs text-zinc-700 hover:bg-zinc-50"
                    onClick={() => submit(suggestion)}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          ) : null}
          {messages.map((message) => (
            <article
              key={message.id}
              className={
                message.role === "user"
                  ? "ml-6 rounded-lg bg-zinc-950 px-3 py-2 text-white"
                  : "mr-4 text-zinc-800"
              }
            >
              {message.parts.map((part, index) => (
                <MessagePart key={`${message.id}-${index}`} part={part} />
              ))}
            </article>
          ))}
          {busy ? (
            <p className="text-xs text-zinc-500">Working on the scene…</p>
          ) : null}
          {error ? (
            <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">
              {error.message}
            </p>
          ) : null}
          <div ref={bottomRef} />
        </div>
      </ScrollArea>
      <form
        className="flex gap-2 border-t border-zinc-200 p-3"
        onSubmit={(event) => {
          event.preventDefault();
          submit(input);
        }}
      >
        <Input
          value={input}
          placeholder="Describe a change…"
          onChange={(event) => setInput(event.target.value)}
          disabled={busy}
        />
        <Button type="submit" size="icon" disabled={busy || !input.trim()} aria-label="Send">
          <Send />
        </Button>
      </form>
    </div>
  );
}

function MessagePart({ part }: { part: { type: string; [key: string]: unknown } }) {
  if (part.type === "text" && typeof part.text === "string") {
    return <p className="whitespace-pre-wrap">{part.text}</p>;
  }
  if (part.type === "step-start") return null;
  if (typeof part.type === "string" && part.type.startsWith("tool-")) {
    const name = part.type.replace("tool-", "");
    const state = typeof part.state === "string" ? part.state : "";
    if (state === "output-available") {
      return (
        <p className="mt-1 text-xs text-zinc-500">Applied {prettyTool(name)}</p>
      );
    }
    if (state === "input-available" || state === "input-streaming") {
      return (
        <p className="mt-1 text-xs text-zinc-400">Using {prettyTool(name)}…</p>
      );
    }
  }
  return null;
}

function prettyTool(name: string) {
  return name.replace(/([A-Z])/g, " $1").toLowerCase();
}

function toVec(value?: VecInput): Vec3 | undefined {
  if (!value) return undefined;
  return [value.x, value.y, value.z];
}

function shadingPatch(input: Record<string, unknown>) {
  const preset =
    typeof input.shading === "string"
      ? findShadingPresetById(input.shading)
      : null;
  return {
    roughness:
      typeof input.roughness === "number"
        ? input.roughness
        : preset?.roughness,
    metalness:
      typeof input.metalness === "number"
        ? input.metalness
        : preset?.metalness,
  };
}

function applyToolPart(
  part: { type: string; input?: unknown; output?: unknown },
  editor: ReturnType<typeof useEditor>,
) {
  const input = (part.input ?? {}) as Record<string, unknown>;
  if (part.type === "tool-addObject") {
    const shape = typeof input.shape === "string" ? input.shape : "box";
    if (!isShape(shape)) return;
    editor.addObject(shape as ShapeKind, {
      name: typeof input.name === "string" ? input.name : undefined,
      color: typeof input.color === "string" ? input.color : undefined,
      position: toVec(input.position as VecInput | undefined),
      rotation: toVec(input.rotation as VecInput | undefined),
      scale: toVec(input.scale as VecInput | undefined),
      ...shadingPatch(input),
    });
    return;
  }
  if (part.type === "tool-updateObject") {
    const idOrName =
      (typeof input.id === "string" && input.id) ||
      (typeof input.name === "string" && input.name) ||
      editor.selectedId;
    if (!idOrName) return;
    const target = findObject(editor.objects, idOrName);
    if (!target) return;
    editor.updateObject(target.id, {
      name: typeof input.newName === "string" ? input.newName : undefined,
      color: typeof input.color === "string" ? input.color : undefined,
      position: toVec(input.position as VecInput | undefined),
      rotation: toVec(input.rotation as VecInput | undefined),
      scale: toVec(input.scale as VecInput | undefined),
      ...shadingPatch(input),
    });
    editor.select(target.id);
    return;
  }
  if (part.type === "tool-deleteObject") {
    const idOrName =
      (typeof input.id === "string" && input.id) ||
      (typeof input.name === "string" && input.name);
    if (idOrName) editor.deleteObject(idOrName);
    return;
  }
  if (part.type === "tool-clearScene") {
    editor.newScene();
    return;
  }
  if (part.type === "tool-selectObject") {
    const idOrName =
      (typeof input.id === "string" && input.id) ||
      (typeof input.name === "string" && input.name);
    if (!idOrName) return;
    const target = findObject(editor.objects, idOrName);
    if (target) editor.select(target.id);
  }
}
