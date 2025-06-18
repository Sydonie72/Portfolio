import { motion, Variant } from "framer-motion";
import { cn } from "@/libs/utils";

const textareaVariants: Record<string, Variant> = {
  focus: { scale: 1.01 },
  blur: { scale: 1 },
};

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
}

export const Textarea = ({
  className,
  placeholder,
  value,
  onChange,
  disabled = false,
  rows = 4,
  error,
  ...props
}: TextareaProps) => (
  <div className="relative">
    <motion.div initial="blur" whileFocus="focus" variants={textareaVariants}>
      <textarea
        className={cn(
          "flex w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled.opacity-50",
          error && "border-destructive",
          className
        )}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        rows={rows}
        {...props}
      />
    </motion.div>
    {error && <p className="text-xs text-destructive mt-1">{error}</p>}
  </div>
);
