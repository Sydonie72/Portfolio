"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/libs/utils"; // Assurez-vous que ce fichier existe

interface AvatarProps {
  src: string;
  alt: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeClasses = {
  sm: "w-8 h-8",
  md: "w-12 h-12",
  lg: "w-16 h-16",
};

export default function Avatar({ src, alt, size = "md", className }: AvatarProp
s) {
  return (
    <motion.div
      className={cn(
        "relative flex items-center justify-center rounded-full bg-muted overflow-hidden",
        sizeClasses[size],
        className,
      )}
      whileHover={{ scale: 1.1 }} // Animation au survol
      whileTap={{ scale: 0.9 }} // Animation au clic
      // Supprimé onDrag ou autres props incompatibles
    >
      <Image
        src={src} // Exemple : "/images/avatar.jpg" ou prop dynamique
        alt={alt}
        width={size === "sm" ? 32 : size === "lg" ? 64 : 48}
        height={size === "sm" ? 32 : size === "lg" ? 64 : 48}
        className="rounded-full object-cover"
      />
    </motion.div>
  );
}