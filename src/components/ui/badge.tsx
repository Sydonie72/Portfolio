import { cva, VariantProps } from "class-variance-authority";
import { motion } from "framer-motion";
import { HTMLAttributes } from "react";
import { cn } from "@/libs/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground",
        secondary: "border-transparent bg-secondary text-secondary-foreground",
        destructive: "border-transparent bg-destructive text-white",
        outline: "text-foreground border-border",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

interface BadgeProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

const Badge = ({ className, variant, ...props }: BadgeProps) => (
  <motion.div
    className={cn(badgeVariants({ variant }), className)}
    whileHover={{ scale: 1.1 }}
    transition={{ type: "spring", stiffness: 400 }}
    {...props}
  />
);

Badge.displayName = "Badge";
export { Badge, badgeVariants };
