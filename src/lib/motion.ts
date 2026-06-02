import type { Variants, Transition } from "framer-motion";

/** Signature CareSignal easing — calm, confident settle. */
export const ease = [0.22, 1, 0.36, 1] as const;

export const pageTransition: Transition = { duration: 0.45, ease };

/** Major screen transition — gentle rise with a soft blur clear. */
export const pageVariants: Variants = {
  initial: { opacity: 0, y: 18, filter: "blur(6px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)", transition: pageTransition },
  exit: { opacity: 0, y: -10, filter: "blur(6px)", transition: { duration: 0.3, ease } },
};

/** Staggered container for card grids and lists. */
export const stagger: Variants = {
  initial: {},
  animate: {
    transition: { staggerChildren: 0.06, delayChildren: 0.04 },
  },
};

export const staggerFast: Variants = {
  initial: {},
  animate: {
    transition: { staggerChildren: 0.045 },
  },
};

/** Child item that rises gently into place. */
export const rise: Variants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
};

export const riseSm: Variants = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease } },
};

export const fade: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5, ease } },
};

/** Shared spring for interactive buttons. */
export const pressSpring: Transition = {
  type: "spring",
  stiffness: 400,
  damping: 30,
};

export const buttonHover = { scale: 1.015 };
export const buttonTap = { scale: 0.985 };
