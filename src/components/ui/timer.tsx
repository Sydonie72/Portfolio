"use client";

import { HTMLAttributes, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Clock } from "lucide-react";
import { cn } from "@/libs/utils";

interface TimerProps extends HTMLAttributes<HTMLDivElement> {
  initialTime: number;
  onTimeUp?: () => void;
}

const Timer = ({ initialTime, onTimeUp, className, ...props }: TimerProps) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeUp?.();
      return;
    }
    const interval = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(interval);
  }, [timeLeft, onTimeUp]);

  const percentage = (timeLeft / initialTime) * 100;

  return (
    <div
      className={cn("flex items-center gap-2 w-full max-w-xs", className)}
      {...props}
    >
      <Clock className="h-5 w-5 text-muted-foreground" />
      <div className="flex-1">
        <motion.div
          className="h-2 bg-muted rounded-full overflow-hidden"
          initial={{ width: "100%" }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: "linear" }}
        >
          <div className="h-full bg-primary" />
        </motion.div>
        <div className="text-sm text-foreground mt-1">
          {Math.floor(timeLeft / 60)}:
          {(timeLeft % 60).toString().padStart(2, "0")}
        </div>
      </div>
    </div>
  );
};

Timer.displayName = "Timer";
export { Timer };
