import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-brand-purple text-white hover:bg-brand-purple-dark",
        secondary: "bg-brand-blue text-white hover:bg-brand-blue/90",
        // text-slate-900 (not white) on the orange accent — white-on-accent
        // measured 2.8:1 contrast (Lighthouse), below the 4.5:1 WCAG AA
        // minimum for normal-size text; dark text clears it comfortably.
        accent: "bg-brand-accent text-slate-900 hover:bg-brand-accent/90",
        outline:
          "border border-brand-purple bg-transparent text-brand-purple hover:bg-brand-lavender",
        ghost: "hover:bg-brand-lavender text-brand-purple",
      },
      size: {
        default: "h-11 px-5 py-2",
        sm: "h-9 px-3",
        lg: "h-12 px-8 text-base",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
