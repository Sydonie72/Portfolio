import { cn } from "@/libs/utils";
import { ReactNode } from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export const Card = ({ className, children, ...props }: CardProps) => (
  <div
    className={cn(
      "rounded-xl border bg-card text-card-foreground shadow-sm",
      className
    )}
    {...props}
  >
    {children}
  </div>
);

export const CardHeader = ({ className, children, ...props }: CardProps) => (
  <div className={cn("p-4 border-b", className)} {...props}>
    {children}
  </div>
);

export const CardContent = ({ className, children, ...props }: CardProps) => (
  <div className={cn("p-4", className)} {...props}>
    {children}
  </div>
);

export const CardFooter = ({ className, children, ...props }: CardProps) => (
  <div className={cn("p-4 border-t", className)} {...props}>
    {children}
  </div>
);
