"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { motion, HTMLMotionProps } from "framer-motion";

export interface ButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  variant?: "default" | "outline" | "secondary" | "ghost" | "destructive" | "gradient";
  size?: "sm" | "md" | "lg" | "icon";
  children?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "md", children, disabled, ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none rounded-xl shadow-sm cursor-pointer";

    const variants = {
      default: "bg-primary text-primary-foreground hover:bg-primary/90",
      outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
      secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
      ghost: "hover:bg-accent hover:text-accent-foreground shadow-none",
      destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
      gradient:
        "bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 shadow-md shadow-indigo-500/25",
    };

    const sizes = {
      sm: "h-9 px-3 text-xs",
      md: "h-11 px-5 text-sm",
      lg: "h-13 px-7 text-base font-semibold",
      icon: "h-10 w-10 p-0",
    };

    return (
      <motion.button
        ref={ref}
        whileTap={{ scale: disabled ? 1 : 0.96 }}
        whileHover={{ scale: disabled ? 1 : 1.02 }}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        disabled={disabled}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);

Button.displayName = "Button";
