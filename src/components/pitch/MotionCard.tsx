import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { premiumCard } from "@/lib/pitchMotion";
import { cn } from "@/lib/cn";

interface MotionCardProps {
  children: ReactNode;
  className?: string;
  /** subtle hover lift; off by default for static keynote cards */
  interactive?: boolean;
  as?: "div" | "li";
}

/** The deck's standard premium surface: rounded-3xl, hairline border, soft shadow. */
export function MotionCard({ children, className, interactive, as = "div" }: MotionCardProps) {
  const Comp = as === "li" ? motion.li : motion.div;
  return (
    <Comp
      variants={premiumCard}
      whileHover={interactive ? { y: -4 } : undefined}
      transition={interactive ? { type: "spring", stiffness: 300, damping: 24 } : undefined}
      className={cn(
        "rounded-3xl border border-line/80 bg-surface/90 shadow-card backdrop-blur-sm",
        className
      )}
    >
      {children}
    </Comp>
  );
}
