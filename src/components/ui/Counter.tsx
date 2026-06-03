import { animate, motion, useInView, useMotionValue, useReducedMotion, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import { ease } from "@/lib/motion";

interface CounterProps {
  to: number;
  from?: number;
  duration?: number;
  delay?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  /** when true (default) the count-up starts when scrolled into view;
   *  when false it starts on mount (used inside slides that mount fresh) */
  startOnView?: boolean;
}

/** A premium count-up number. Tweens from its current value to the target. */
export function Counter({
  to,
  from = 0,
  duration = 1.1,
  delay = 0,
  decimals = 0,
  prefix = "",
  suffix = "",
  className,
  startOnView = true,
}: CounterProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const ready = startOnView ? inView : true;
  const mv = useMotionValue(reduce ? to : from);
  const text = useTransform(mv, (v) => `${prefix}${v.toFixed(decimals)}${suffix}`);

  useEffect(() => {
    if (reduce) {
      mv.set(to);
      return;
    }
    if (!ready) return;
    const controls = animate(mv, to, { duration, delay, ease });
    return controls.stop;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready, to]);

  return (
    <motion.span ref={ref} className={className}>
      {text}
    </motion.span>
  );
}

/** "sys/dia" pair counting up together. */
export function BPCounter({
  sys,
  dia,
  delay = 0,
  duration = 1.1,
  className,
  startOnView = true,
}: {
  sys: number;
  dia: number;
  delay?: number;
  duration?: number;
  className?: string;
  startOnView?: boolean;
}) {
  return (
    <span className={className}>
      <Counter to={sys} delay={delay} duration={duration} startOnView={startOnView} />
      <span className="mx-[1px]">/</span>
      <Counter to={dia} delay={delay} duration={duration} startOnView={startOnView} />
    </span>
  );
}
