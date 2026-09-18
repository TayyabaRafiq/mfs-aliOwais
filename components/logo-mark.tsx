import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Header/footer brand mark: the real logo's circular "no bugs" emblem
 * (public/logo/mahrukh-icon.png — cropped, unaltered artwork) on a white/90
 * backing card for legibility against the dark navy header/footer, plus
 * "MFS" as a short typed monogram in the site's restrained accent color.
 *
 * This is a monogram treatment (icon + initials), not a redesign of the
 * real logo — the emblem itself is untouched. It replaces the full
 * photographed wordmark (public/logo/mahrukh-logo.png), which isn't legible
 * at header/footer sizes; that file stays in the project unaltered in case
 * a higher-resolution source becomes available later.
 *
 * Used identically at every breakpoint (mobile/tablet/desktop) — no
 * breakpoint-based swapping between variants.
 */
const ICON_SRC = "/logo/mahrukh-icon.png";
const ICON_INTRINSIC_SIZE = 375;

export interface LogoMarkProps {
  size?: "header" | "footer";
  className?: string;
}

export function LogoMark({ size = "header", className }: LogoMarkProps) {
  const isHeader = size === "header";

  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <span
        className={cn(
          "inline-flex items-center justify-center rounded-lg bg-white/90 shadow-[0_0_20px_rgba(255,255,255,0.15)]",
          isHeader ? "h-9 w-9 sm:h-10 sm:w-10" : "h-8 w-8",
        )}
      >
        <Image
          src={ICON_SRC}
          alt="Mahrukh Fumigation Services"
          width={ICON_INTRINSIC_SIZE}
          height={ICON_INTRINSIC_SIZE}
          priority={isHeader}
          className={cn("object-contain", isHeader ? "h-7 w-7 sm:h-8 sm:w-8" : "h-6 w-6")}
        />
      </span>
      <span
        className={cn(
          "font-serif italic tracking-wide text-brand-accent",
          isHeader ? "text-lg sm:text-xl" : "text-lg",
        )}
      >
        MFS
      </span>
    </span>
  );
}
