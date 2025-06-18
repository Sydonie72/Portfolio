import { motion } from "framer-motion";
import { User } from "lucide-react";
import { HTMLAttributes } from "react";
import { cn } from "@/libs/utils";

interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  size?: "sm" | "md" | "lg";
  initials?: string; // Initiales si pas d'image
  status?: "online" | "offline"; // Statut visuel
}

const Avatar = ({
  src,
  alt,
  size = "md",
  initials,
  status,
  className,
  ...props
}: AvatarProps) => {
  const sizeClasses = {
    sm: "h-8 w-8 min-h-[32px] min-w-[32px] text-sm",
    md: "h-10 w-10 min-h-[40px] min-w-[40px] md:h-12 md:w-12 text-base",
    lg: "h-12 w-12 min-h-[48px] min-w-[48px] md:h-16 md:w-16 text-lg",
  };

  const statusClasses = {
    online: "bg-green-500",
    offline: "bg-gray-500",
  };

  return (
    <motion.div
      className={cn(
        "relative flex items-center justify-center rounded-full bg-muted overflow-hidden",
        sizeClasses[size],
        className
      )}
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 400 }}
      {...props}
    >
      {src ? (
        <img src={src} alt={alt} className="h-full w-full object-cover" />
      ) : initials ? (
        <span className="font-medium text-muted-foreground">{initials}</span>
      ) : (
        <User className="h-1/2 w-1/2 text-muted-foreground" />
      )}
      {status && (
        <span
          className={cn(
            "absolute bottom-0 right-0 h-2 w-2 rounded-full border-2 border-background",
            statusClasses[status]
          )}
        />
      )}
    </motion.div>
  );
};

Avatar.displayName = "Avatar";
export { Avatar };
