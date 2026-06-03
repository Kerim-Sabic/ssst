import { motion, useReducedMotion } from "framer-motion";
import { useId, useMemo, useRef } from "react";
import { signalDraw } from "@/lib/pitchMotion";
import { ecgPath, type EcgVariant } from "@/lib/ecg";
import { EcgPulseDot } from "@/components/ui/EcgPulseDot";
import { cn } from "@/lib/cn";

interface SignalLineProps {
  className?: string;
  /** "draw" self-draws once; "drift" slowly scrolls for ambient backdrops. */
  mode?: "draw" | "drift";
  color?: string;
  strokeWidth?: number;
  opacity?: number;
  variant?: EcgVariant;
  beats?: number;
  /** render a glowing pulse dot travelling along the trace */
  pulse?: boolean;
  pulseColor?: string;
  pulseDuration?: number;
  pulseDelay?: number;
}

const VB_W = 960;
const VB_H = 120;

/** A clinically-shaped ECG trace — the deck's recurring heartbeat motif.
 *  Optionally carries a glowing pulse that travels along the rhythm. */
export function SignalLine({
  className,
  mode = "draw",
  color = "#14B8A6",
  strokeWidth = 1.6,
  opacity = 1,
  variant = "normal",
  beats = 6,
  pulse = false,
  pulseColor = "#2DD4BF",
  pulseDuration = 3.2,
  pulseDelay = 0,
}: SignalLineProps) {
  const reduce = useReducedMotion();
  const uid = useId().replace(/:/g, "");
  const pathRef = useRef<SVGPathElement>(null);

  const d = useMemo(
    () => ecgPath({ beats, beatWidth: VB_W / beats, height: VB_H, variant }).d,
    [beats, variant]
  );

  if (mode === "drift") {
    return (
      <svg
        className={cn("w-[200%]", className)}
        viewBox={`0 0 ${VB_W} ${VB_H}`}
        fill="none"
        preserveAspectRatio="none"
        aria-hidden
      >
        <motion.path
          d={d}
          stroke={`url(#sl-${uid})`}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ x: 0 }}
          animate={reduce ? undefined : { x: [-VB_W / 2, 0] }}
          transition={{ duration: 30, ease: "linear", repeat: Infinity }}
          style={{ opacity }}
        />
        <defs>
          <linearGradient id={`sl-${uid}`} x1="0" y1="0" x2={VB_W} y2="0" gradientUnits="userSpaceOnUse">
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
      viewBox={`0 0 ${VB_W} ${VB_H}`}
      fill="none"
      preserveAspectRatio="none"
      aria-hidden
    >
      <motion.path
        ref={pathRef}
        d={d}
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={signalDraw}
        style={{ opacity }}
      />
      {pulse && !reduce && (
        <EcgPulseDot pathRef={pathRef} color={pulseColor} duration={pulseDuration} delay={pulseDelay} />
      )}
    </svg>
  );
}
