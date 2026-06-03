import type { ComponentProps } from "react";
import { Counter as UICounter, BPCounter as UIBPCounter } from "@/components/ui/Counter";

/** Deck variants of the count-up: they start on mount (slides mount fresh)
 *  rather than waiting to scroll into view. Thin wrappers over the shared one. */
export function Counter(props: ComponentProps<typeof UICounter>) {
  return <UICounter startOnView={false} {...props} />;
}

export function BPCounter(props: ComponentProps<typeof UIBPCounter>) {
  return <UIBPCounter startOnView={false} {...props} />;
}
