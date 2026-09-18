import { cn } from "@/lib/utils";

/**
 * Shared "elegant gradient border" treatment used across the redesign
 * (Hero visual frame, service/experience cards, About/Executive card).
 * Implemented as padding + gradient background around an inner surface,
 * since a true CSS gradient border needs this wrapper trick.
 */
export function GradientBorder({
  children,
  className,
  innerClassName,
}: {
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl bg-gradient-to-br from-brand-purple/70 via-blue-500/50 to-brand-accent/40 p-[1.5px]",
        className,
      )}
    >
      <div className={cn("h-full rounded-[calc(1rem-1.5px)]", innerClassName)}>{children}</div>
    </div>
  );
}
