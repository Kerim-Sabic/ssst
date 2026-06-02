import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { buttonHover, buttonTap, pressSpring } from "@/lib/motion";

type Variant = "primary" | "secondary" | "ghost" | "danger" | "subtle";
type Size = "sm" | "md" | "lg";

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: Variant;
  size?: Size;
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  full?: boolean;
  "aria-label"?: string;
}

const variants: Record<Variant, string> = {
  primary:
    "bg-navy text-white shadow-soft hover:bg-navy-600 disabled:opacity-50",
  secondary:
    "bg-surface text-ink border border-line/90 shadow-soft hover:border-slate-300 hover:bg-white",
  ghost: "text-ink hover:bg-soft",
  subtle: "bg-soft text-ink hover:bg-slate-200/70",
  danger: "bg-concern text-white shadow-soft hover:bg-red-500",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-3.5 text-[13px] gap-1.5 rounded-xl",
  md: "h-11 px-5 text-sm gap-2 rounded-2xl",
  lg: "h-[52px] px-7 text-[15px] gap-2.5 rounded-2xl",
};

export function Button({
  children,
  onClick,
  variant = "primary",
  size = "md",
  className,
  type = "button",
  disabled,
  iconLeft,
  iconRight,
  full,
  ...rest
}: ButtonProps) {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileHover={disabled ? undefined : buttonHover}
      whileTap={disabled ? undefined : buttonTap}
      transition={pressSpring}
      aria-label={rest["aria-label"]}
      className={cn(
        "inline-flex select-none items-center justify-center font-semibold tracking-tightish transition-colors",
        "focus-visible:outline-none disabled:cursor-not-allowed",
        sizes[size],
        variants[variant],
        full && "w-full",
        className
      )}
    >
      {iconLeft}
      {children}
      {iconRight}
    </motion.button>
  );
}
