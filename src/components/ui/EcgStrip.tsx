import { motion, useMotionValue, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useRef } from "react";
import { ecgPath, type EcgVariant } from "@/lib/ecg";
import { cn } from "@/lib/cn";

interface EcgStripProps {
  variant?: EcgVariant;
  beats?: number;
  /** trace color */
  color?: string;
  /** ECG-paper grid color (rgba string) */
  gridColor?: string;
  surface?: "navy" | "light" | "none";
  className?: string;
  /** css height of the strip */
  height?: number;
  grid?: boolean;
  glow?: boolean;
  /** self-draw the trace on mount */
  draw?: boolean;
  drawDelay?: number;
  /** glowing pulse dot travelling along the trace */
  pulse?: boolean;
  pulseDuration?: number;
  pulseDelay?: number;
  strokeWidth?: number;
}

const VB_H = 120;

/** An ECG strip on calibration paper — the medically-credible heartbeat motif. */
export function EcgStrip({
  variant = "normal",
  beats = 4,
  color = "#2DD4BF",
  gridColor,
  surface = "navy",
  className,
  height = 80,
  grid = true,
  glow = true,
  draw = true,
  drawDelay = 0.2,
  pulse = true,
  pulseDuration = 3.4,
  pulseDelay = 0.9,
  strokeWidth = 2.2,
}: EcgStripProps) {
  const reduce = useReducedMotion();
  const pathRef = useRef<SVGPathElement>(null);

  const { d, width } = useMemo(
    () => ecgPath({ beats, beatWidth: 150, height: VB_H, variant }),
    [beats, variant]
  );

  const grid1 = gridColor ?? (surface === "navy" ? "rgba(45,212,191,0.10)" : "rgba(15,118,110,0.07)");
  const grid2 = gridColor ?? (surface === "navy" ? "rgba(45,212,191,0.18)" : "rgba(15,118,110,0.13)");

  const surfaceClass =
    surface === "navy"
      ? "bg-navy"
      : surface === "light"
      ? "bg-soft/40"
      : "";

  return (
    <div
      className={cn("relative overflow-hidden rounded-2xl", surfaceClass, className)}
      style={{ height }}
    >
      {/* ECG calibration paper */}
      {grid && (
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, ${grid1} 1px, transparent 1px),
              linear-gradient(to bottom, ${grid1} 1px, transparent 1px),
              linear-gradient(to right, ${grid2} 1px, transparent 1px),
              linear-gradient(to bottom, ${grid2} 1px, transparent 1px)`,
            backgroundSize: "8px 8px, 8px 8px, 40px 40px, 40px 40px",
          }}
        />
      )}

      <svg
        viewBox={`0 0 ${width} ${VB_H}`}
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
        aria-hidden
      >
        {glow && (
          <motion.path
            d={d}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth * 2.4}
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity={0.22}
            style={{ filter: "blur(3px)" }}
            initial={draw && !reduce ? { pathLength: 0 } : { pathLength: 1 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.3, ease: "easeInOut", delay: drawDelay }}
          />
        )}
        <motion.path
          ref={pathRef}
          d={d}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={draw && !reduce ? { pathLength: 0 } : { pathLength: 1 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.3, ease: "easeInOut", delay: drawDelay }}
        />
        {pulse && !reduce && (
          <TravelingDot pathRef={pathRef} color={color} duration={pulseDuration} delay={pulseDelay} />
        )}
      </svg>
    </div>
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
      <motion.circle cx={cx} cy={cy} r={11} fill={color} style={{ opacity: visible }} className="opacity-20 blur-[2px]" />
      <motion.circle cx={cx} cy={cy} r={3.6} fill={color} style={{ opacity: visible }} />
    </>
  );
}
