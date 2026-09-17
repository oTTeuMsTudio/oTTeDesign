import { cn } from "@/lib/utils";

export function OtteMark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex h-7 items-center rounded-md bg-current px-2.5",
        className,
      )}
    >
      <span className="text-[13px] leading-none font-semibold tracking-tight text-background">
        oTTeGames
      </span>
    </span>
  );
}
