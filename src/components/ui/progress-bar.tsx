import { HTMLAttributes } from "react";
import { motion } from "framer-motion";
import { cn } from "@/libs/utils";

interface ProgressBarProps extends HTMLAttributes<HTMLDivElement> {
  value: number; // Entre 0 et 100
}

const ProgressBar = ({ value, className, ...props }: ProgressBarProps) => (
  <div
    className={cn(
      "w-full h-2 bg-muted rounded-full overflow-hidden",
      className
    )}
    {...props}
  >
    <motion.div
      className="h-full bg-primary"
      initial={{ width: 0 }}
      animate={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    />
  </div>
);

ProgressBar.displayName = "ProgressBar";
export { ProgressBar };
