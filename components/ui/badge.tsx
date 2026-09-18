import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// shadcn's Badge, customized with glass/translucent variants for the dark
// theme instead of the stock solid-color badge.
const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold transition-colors",
  {
    variants: {
      variant: {
        glass: "border border-white/15 bg-white/10 text-blue-100 backdrop-blur",
        gradient:
          "border border-white/10 bg-gradient-to-r from-brand-purple/80 to-brand-blue/80 text-white shadow-sm",
        accent: "border border-brand-accent/30 bg-brand-accent/15 text-orange-200",
        outline: "border border-brand-purple/30 text-brand-purple",
      },
    },
    defaultVariants: {
      variant: "glass",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant, className }))} {...props} />;
}

export { Badge, badgeVariants };
