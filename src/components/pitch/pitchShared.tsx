import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { ease, revealUp, wordChild, wordParent } from "@/lib/pitchMotion";
import { ECG_ICON_PATH, ECG_ICON_VIEWBOX } from "@/lib/ecg";
import { cn } from "@/lib/cn";

/** Large CareSignal signal mark — the hero logo of the deck. */
export function SignalMark({ size = 96, className }: { size?: number; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <div
      className={cn("relative grid place-items-center rounded-[28%] bg-navy shadow-lift", className)}
      style={{ width: size, height: size }}
    >
      <svg viewBox={ECG_ICON_VIEWBOX} fill="none" style={{ width: size * 0.66, height: size * 0.66 * 0.75 }} aria-hidden>
        <motion.path
          d={ECG_ICON_PATH}
          stroke="#2DD4BF"
          strokeWidth={1.9}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={reduce ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeInOut", delay: 0.15 }}
        />
      </svg>
      <motion.span
        className="absolute h-2.5 w-2.5 rounded-full bg-signal"
        style={{ top: "20%", right: "20%" }}
        animate={reduce ? undefined : { boxShadow: ["0 0 0 0 rgba(20,184,166,0.5)", "0 0 0 8px rgba(20,184,166,0)"] }}
        transition={{ duration: 2.4, ease: "easeOut", repeat: Infinity }}
      />
    </div>
  );
}

/** Word-by-word blur-rise headline reveal. */
export function WordReveal({
  text,
  className,
  highlight,
}: {
  text: string;
  className?: string;
  /** word(s) to render in teal */
  highlight?: string[];
}) {
  const words = text.split(" ");
  return (
    <motion.h1 variants={wordParent} className={className}>
      {words.map((w, i) => {
        const isHi = highlight?.includes(w.replace(/[.,]/g, ""));
        return (
          <span key={i} className="inline-block overflow-hidden align-bottom">
            <motion.span
              variants={wordChild}
              className={cn("inline-block", isHi && "text-signal-deep")}
            >
              {w}
              {i < words.length - 1 ? " " : ""}
            </motion.span>
          </span>
        );
      })}
    </motion.h1>
  );
}

/** Small eyebrow / kicker label with a signal dot. */
export function Kicker({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div variants={revealUp} className={cn("flex items-center gap-2", className)}>
      <span className="h-1.5 w-1.5 rounded-full bg-signal" />
      <span className="text-[12px] font-semibold uppercase tracking-[0.18em] text-muted">{children}</span>
    </motion.div>
  );
}

/** Animated underline that draws itself beneath a punchline. */
export function UnderlineDraw({ className, delay = 0.6 }: { className?: string; delay?: number }) {
  return (
    <motion.span
      className={cn("block h-[3px] origin-left rounded-full bg-gradient-to-r from-signal to-signal-deep", className)}
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      transition={{ duration: 0.7, ease, delay }}
    />
  );
}
