import { motion, Variant } from "framer-motion";
import { cn } from "@/libs/utils";

const inputVariants: Record<string, Variant> = {
  focus: { scale: 1.01 },
  blur: { scale: 1 },
};

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string; // Message d'erreur
}

export const Input = ({
  className,
  type = "text",
  placeholder,
  value,
  onChange,
  disabled = false,
  error,
  ...props
}: InputProps) => (
  <div className="relative">
    <motion.div initial="blur" whileFocus="focus" variants={inputVariants}>
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
          error && "border-destructive",
          className
        )}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        {...props}
      />
    </motion.div>
    {error && <p className="text-xs text-destructive mt-1">{error}</p>}
  </div>
);
