import { animate, motion, useMotionValue, useReducedMotion, useTransform } from "framer-motion";
import { useEffect } from "react";
import { ease } from "@/lib/pitchMotion";

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

/** A premium count-up number. Eases into the target value on mount. */
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
  const mv = useMotionValue(reduce ? to : from);
  const text = useTransform(mv, (v) => `${prefix}${v.toFixed(decimals)}${suffix}`);

  useEffect(() => {
    if (reduce) {
      mv.set(to);
      return;
    }
    const controls = animate(mv, to, { duration, delay, ease });
    return controls.stop;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [to]);

  return <motion.span className={className}>{text}</motion.span>;
}

/** Blood-pressure style "sys/dia" pair, both counting up together. */
export function BPCounter({
  sys,
  dia,
  delay = 0,
  duration = 1.1,
  className,
}: {
  sys: number;
  dia: number;
  delay?: number;
  duration?: number;
  className?: string;
}) {
  return (
    <span className={className}>
      <Counter to={sys} delay={delay} duration={duration} />
      <span className="mx-[1px]">/</span>
      <Counter to={dia} delay={delay} duration={duration} />
    </span>
  );
}
