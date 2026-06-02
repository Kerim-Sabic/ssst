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
}

/** A count-up number that runs when it scrolls into view. */
export function Counter({
  to,
  from = 0,
  duration = 1.1,
  delay = 0,
  decimals = 0,
  prefix = "",
  suffix = "",
  className,
}: CounterProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const mv = useMotionValue(reduce ? to : from);
  const text = useTransform(mv, (v) => `${prefix}${v.toFixed(decimals)}${suffix}`);

  useEffect(() => {
    if (reduce || !inView) return;
    const controls = animate(mv, to, { duration, delay, ease });
    return controls.stop;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, to]);

  return <motion.span ref={ref} className={className}>{text}</motion.span>;
}

/** "sys/dia" pair counting up together. */
export function BPCounter({
  sys,
  dia,
  delay = 0,
  className,
}: {
  sys: number;
  dia: number;
  delay?: number;
  className?: string;
}) {
  return (
    <span className={className}>
      <Counter to={sys} delay={delay} />
      <span className="mx-[1px]">/</span>
      <Counter to={dia} delay={delay} />
    </span>
  );
}
