"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "./button";
import { useCallback, useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const toggleTheme = useCallback(
    () => setTheme(theme === "light" ? "dark" : "light"),
    [theme, setTheme]
  );

  if (!mounted) return null;

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
    >
      <Sun
        className={`h-5 w-5 ${
          theme === "light" ? "opacity-100" : "opacity-0 absolute"
        }`}
      />
      <Moon
        className={`h-5 w-5 ${
          theme === "light" ? "opacity-0 absolute" : "opacity-100"
        }`}
      />
    </Button>
  );
}
