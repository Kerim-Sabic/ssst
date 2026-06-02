import { motion, useMotionValue, useReducedMotion } from "framer-motion";
import { useEffect, useId, useRef } from "react";
import { signalDraw } from "@/lib/pitchMotion";
import { cn } from "@/lib/cn";

interface SignalLineProps {
  className?: string;
  /** "draw" self-draws once; "drift" slowly scrolls for ambient backdrops. */
  mode?: "draw" | "drift";
  color?: string;
  strokeWidth?: number;
  opacity?: number;
  /** render a glowing pulse dot travelling along the line */
  pulse?: boolean;
  pulseColor?: string;
  pulseDuration?: number;
  pulseDelay?: number;
}

const WAVE =
  "M0 60 H120 l14 -34 l9 64 l11 -84 l15 96 l9 -54 H320 l14 -26 l9 46 l11 -66 l15 82 l9 -42 H640 l14 -30 l9 52 l11 -72 l15 90 l9 -46 H960";

/** A calm clinical signal/ECG line — the deck's recurring visual motif.
 *  Optionally carries a glowing pulse that travels along the trace. */
export function SignalLine({
  className,
  mode = "draw",
  color = "#14B8A6",
  strokeWidth = 1.6,
  opacity = 1,
  pulse = false,
  pulseColor = "#2DD4BF",
  pulseDuration = 3.2,
  pulseDelay = 0,
}: SignalLineProps) {
  const reduce = useReducedMotion();
  const uid = useId().replace(/:/g, "");
  const pathRef = useRef<SVGPathElement>(null);

  if (mode === "drift") {
    return (
      <svg
        className={cn("w-[200%]", className)}
        viewBox="0 0 960 120"
        fill="none"
        preserveAspectRatio="none"
        aria-hidden
      >
        <motion.path
          d={WAVE}
          stroke={`url(#sl-${uid})`}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          initial={{ x: 0 }}
          animate={reduce ? undefined : { x: [-480, 0] }}
          transition={{ duration: 30, ease: "linear", repeat: Infinity }}
          style={{ opacity }}
        />
        <defs>
          <linearGradient id={`sl-${uid}`} x1="0" y1="0" x2="960" y2="0" gradientUnits="userSpaceOnUse">
            <stop stopColor={color} stopOpacity="0" />
            <stop offset="0.5" stopColor={color} stopOpacity="0.55" />
            <stop offset="1" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    );
  }

  return (
    <svg
      className={cn("w-full", className)}
      viewBox="0 0 960 120"
      fill="none"
      preserveAspectRatio="none"
      aria-hidden
    >
      <motion.path
        ref={pathRef}
        d={WAVE}
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={signalDraw}
        style={{ opacity }}
      />
      {pulse && !reduce && (
        <TravelingDot
          pathRef={pathRef}
          color={pulseColor}
          duration={pulseDuration}
          delay={pulseDelay}
        />
      )}
    </svg>
  );
}

function TravelingDot({
  pathRef,
  color,
  duration,
  delay,
}: {
  pathRef: React.RefObject<SVGPathElement>;
  color: string;
  duration: number;
  delay: number;
}) {
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
