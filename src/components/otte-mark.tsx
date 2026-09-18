import { cn } from "@/lib/utils";

export function OtteMark({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2 text-black", className)}>
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="size-5"
        fill="none"
      >
        <path
          d="M12 3.2 20 7.4v9.2L12 20.8 4 16.6V7.4L12 3.2Z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <path
          d="M12 3.2v17.6M4 7.4l8 4.2 8-4.2"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
      </svg>
      <span className="text-[15px] leading-none font-semibold tracking-tight">
        oTTeDesign
      </span>
    </span>
  );
}
