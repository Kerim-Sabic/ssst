import type { Variants } from "framer-motion";

/** Signature easing for the keynote. */
export const ease = [0.22, 1, 0.36, 1] as const;

/** Shared springs for tactile, premium interactions. */
export const springSoft = { type: "spring", stiffness: 220, damping: 30, mass: 0.9 } as const;
export const springSnappy = { type: "spring", stiffness: 420, damping: 32 } as const;

/** Direction-aware global slide transition: the incoming slide rises (or
 *  descends) into place as blur clears; the outgoing slide drifts away and
 *  blurs out. `custom` is the navigation direction (+1 next, -1 prev). */
export const slideVariants: Variants = {
  initial: (dir: number = 1) => ({
    opacity: 0,
    y: dir >= 0 ? 34 : -34,
    scale: 0.985,
    filter: "blur(10px)",
  }),
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.62, ease, opacity: { duration: 0.5 } },
  },
  exit: (dir: number = 1) => ({
    opacity: 0,
    y: dir >= 0 ? -26 : 26,
    scale: 0.985,
    filter: "blur(10px)",
    transition: { duration: 0.4, ease },
  }),
};

/** Orchestrates child reveals inside a slide. */
export const staggerParent: Variants = {
  initial: {},
  animate: {
    transition: { staggerChildren: 0.08, delayChildren: 0.12 },
  },
};

export const staggerTight: Variants = {
  initial: {},
  animate: { transition: { staggerChildren: 0.05, delayChildren: 0.08 } },
};

/** Standard supporting-content reveal. */
export const revealUp: Variants = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.55, ease } },
};

export const revealLeft: Variants = {
  initial: { opacity: 0, x: -22 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.55, ease } },
};

export const revealRight: Variants = {
  initial: { opacity: 0, x: 22 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.55, ease } },
};

/** Premium card entrance. */
export const premiumCard: Variants = {
  initial: { opacity: 0, y: 24, scale: 0.96 },
  animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease } },
};

/** Self-drawing signal path. */
export const signalDraw: Variants = {
  initial: { pathLength: 0, opacity: 0 },
  animate: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 1.2, ease: "easeInOut" },
  },
};

/** Risk card reveal with soft glow handled in the component. */
export const riskReveal: Variants = {
  initial: { scale: 0.92, opacity: 0 },
  animate: { scale: 1, opacity: 1, transition: { duration: 0.7, ease } },
};

/** Word-by-word headline reveal helpers. */
export const wordParent: Variants = {
  initial: {},
  animate: { transition: { staggerChildren: 0.085, delayChildren: 0.1 } },
};

export const wordChild: Variants = {
  initial: { opacity: 0, y: "0.5em", filter: "blur(6px)" },
  animate: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease },
  },
};
