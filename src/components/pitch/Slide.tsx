import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { staggerParent } from "@/lib/pitchMotion";
import { cn } from "@/lib/cn";

/** Consistent keynote content frame: centered, generous whitespace,
 *  and a stagger parent so slide pieces reveal in sequence. */
export function Slide({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      variants={staggerParent}
      initial="initial"
      animate="animate"
      className={cn(
        "mx-auto flex min-h-[78vh] w-full max-w-6xl flex-col justify-center px-6 py-10 sm:px-10 lg:px-16",
        className
      )}
    >
      {children}
    </motion.div>
  );
}
