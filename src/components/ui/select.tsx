import { motion, Variant } from "framer-motion";
import { ChevronDown, Search, Check } from "lucide-react";
import { cn } from "@/libs/utils"; // Assurez-vous que cette fonction utilitaire existe
import { useState, useEffect, useRef } from "react";

const selectVariants: Record<string, Variant> = {
  hover: { scale: 1.02 },
  open: { opacity: 1, y: 0 },
  closed: { opacity: 0, y: -10 },
};

interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  options: Option[];
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  searchable?: boolean;
  className?: string;
  disabled?: boolean;
}

export const Select = ({
  options,
  value = "",
  onChange,
  placeholder = "Select an option...",
  searchable = false,
  className,
  disabled = false,
}: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredOptions = searchable
    ? options.filter((option) =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : options;

  const selectedOption =
    options.find((option) => option.value === value)?.label || placeholder;

  const handleSelect = (selectedValue: string) => {
    onChange(selectedValue === value ? "" : selectedValue);
    setIsOpen(false);
    setSearchTerm("");
  };

  return (
    <div ref={wrapperRef} className="relative w-[200px]">
      <motion.div
        variants={selectVariants}
        whileHover={!disabled ? "hover" : undefined}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={cn(
          "flex h-10 items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm cursor-pointer",
          disabled && "opacity-50 cursor-not-allowed",
          className
        )}
      >
        <span className={value ? "text-foreground" : "text-muted-foreground"}>
          {selectedOption}
        </span>
        <ChevronDown
          className={cn(
            "h-4 w-4 text-muted-foreground transition-transform",
            isOpen && "rotate-180"
          )}
        />
      </motion.div>

      {isOpen && (
        <motion.div
          initial="closed"
          animate="open"
          exit="closed"
          variants={selectVariants}
          className="absolute z-10 mt-1 w-full rounded-md border border-input bg-background shadow-lg"
        >
          {searchable && (
            <div className="flex items-center border-b border-input px-3 py-2">
              <Search className="h-4 w-4 text-muted-foreground mr-2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onClick={(e) => e.stopPropagation()}
                placeholder="Search..."
                className="w-full bg-transparent outline-none text-sm text-foreground placeholder:text-muted-foreground"
              />
            </div>
          )}
          <div className="max-h-[200px] overflow-y-auto">
            {filteredOptions.length === 0 ? (
              <div className="px-3 py-2 text-sm text-muted-foreground">
                No options found.
              </div>
            ) : (
              filteredOptions.map((option) => (
                <motion.div
                  key={option.value}
                  whileHover={{ backgroundColor: "#f5f5f5" }}
                  onClick={() => handleSelect(option.value)}
                  className="flex items-center justify-between px-3 py-2 text-sm cursor-pointer"
                >
                  {option.label}
                  <Check
                    className={cn(
                      "h-4 w-4",
                      value === option.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </motion.div>
              ))
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
};

Select.displayName = "Select";