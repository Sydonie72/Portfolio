import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/libs/utils";
import { forwardRef } from "react";

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, className, disabled = false, ...props }, ref) => (
    <label className={cn("flex items-center gap-2", className)}>
      <motion.div
        className={cn(
          "relative h-5 w-5 rounded-md border border-input bg-background",
          disabled && "opacity-50 cursor-not-allowed"
        )}
        whileHover={{ scale: disabled ? 1 : 1.05 }}
      >
        <input
          ref={ref}
          type="checkbox"
          className="absolute inset-0 opacity-0 cursor-pointer disabled:cursor-not-allowed"
          disabled={disabled}
          {...props}
        />
        <Check
          className={cn(
            "h-4 w-4 text-primary absolute top-0.5 left-0.5",
            props.checked ? "opacity-100" : "opacity-0"
          )}
        />
      </motion.div>
      {label && <span className="text-sm">{label}</span>}
    </label>
  )
);
Checkbox.displayName = "Checkbox";
