import { cn } from "@/lib/utils";

/** Pulsing green availability indicator. */
export function StatusDot({ className }: { className?: string }) {
  return (
    <span className={cn("relative inline-flex h-2.5 w-2.5", className)}>
      <span className="absolute inline-flex h-full w-full animate-ping2 rounded-full bg-teal" />
      <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-teal" />
    </span>
  );
}
