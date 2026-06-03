import { motion, useMotionValue } from "framer-motion";
import { useEffect } from "react";

interface EcgPulseDotProps {
  pathRef: React.RefObject<SVGPathElement>;
  color: string;
  duration: number;
  delay?: number;
}

/** A glowing dot that travels along an SVG path (sampled via getPointAtLength).
 *  Must be rendered inside the same <svg> as the referenced path. */
export function EcgPulseDot({ pathRef, color, duration, delay = 0 }: EcgPulseDotProps) {
  const cx = useMotionValue(-100);
  const cy = useMotionValue(-100);
  const visible = useMotionValue(0);

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;
    let len = 0;
    try {
      len = path.getTotalLength();
    } catch {
      return;
    }
    let raf = 0;
    let start: number | undefined;
    const loop = (t: number) => {
      if (start === undefined) start = t + delay * 1000;
      const elapsed = t - start;
      if (elapsed >= 0) {
        visible.set(1);
        const p = (elapsed % (duration * 1000)) / (duration * 1000);
        const pt = path.getPointAtLength(p * len);
        cx.set(pt.x);
        cy.set(pt.y);
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [pathRef, cx, cy, visible, duration, delay]);

  return (
    <>
      <motion.circle cx={cx} cy={cy} r={9} fill={color} style={{ opacity: visible }} className="opacity-20 blur-[2px]" />
      <motion.circle cx={cx} cy={cy} r={3.4} fill={color} style={{ opacity: visible }} />
    </>
  );
}
