import { motion, useReducedMotion } from "framer-motion";
import { useId } from "react";
import type { TimelinePoint } from "@/lib/types";
import { ease } from "@/lib/motion";
import { cn } from "@/lib/cn";

interface LineChartProps {
  points: TimelinePoint[];
  color?: string;
  baseline?: number;
  height?: number;
  showDots?: boolean;
  showArea?: boolean;
  className?: string;
  delay?: number;
}

/** A self-drawing SVG line chart with an optional baseline band. */
export function LineChart({
  points,
  color = "#14B8A6",
  baseline,
  height = 120,
  showDots = true,
  showArea = true,
  className,
  delay = 0,
}: LineChartProps) {
  const reduce = useReducedMotion();
  const uid = useId().replace(/:/g, "");
  const W = 320;
  const H = height;
  const padX = 14;
  const padY = 18;

  const values = points.map((p) => p.value);
  const allVals = baseline != null ? [...values, baseline] : values;
  const min = Math.min(...allVals);
  const max = Math.max(...allVals);
  const span = max - min || 1;

  const x = (i: number) => padX + (i * (W - padX * 2)) / Math.max(1, points.length - 1);
  const y = (v: number) => padY + (1 - (v - min) / span) * (H - padY * 2);

  const linePath = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${x(i).toFixed(1)} ${y(p.value).toFixed(1)}`)
    .join(" ");
  const areaPath = `${linePath} L ${x(points.length - 1)} ${H - padY} L ${x(0)} ${H - padY} Z`;
  const baseY = baseline != null ? y(baseline) : null;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className={cn("w-full", className)}
      preserveAspectRatio="none"
      role="img"
    >
      <defs>
        <linearGradient id={`area-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.18" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>

      {baseY != null && (
        <>
          <line
            x1={padX}
            x2={W - padX}
            y1={baseY}
            y2={baseY}
            stroke="#94A3B8"
            strokeWidth={1}
            strokeDasharray="4 5"
            opacity={0.7}
          />
          <text x={W - padX} y={baseY - 5} textAnchor="end" className="fill-muted" fontSize="8.5" fontWeight={600}>
            baseline
          </text>
        </>
      )}

      {showArea && (
        <motion.path
          d={areaPath}
          fill={`url(#area-${uid})`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease, delay: delay + 0.4 }}
        />
      )}

      <motion.path
        d={linePath}
        fill="none"
        stroke={color}
        strokeWidth={2.4}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={reduce ? { pathLength: 1 } : { pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.1, ease, delay }}
      />

      {showDots &&
        points.map((p, i) => {
          const last = i === points.length - 1;
          return (
            <motion.circle
              key={i}
              cx={x(i)}
              cy={y(p.value)}
              r={last ? 4.2 : 3}
              fill={last ? color : "#fff"}
              stroke={color}
              strokeWidth={last ? 0 : 2}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3, ease, delay: delay + 0.5 + i * 0.08 }}
            />
          );
        })}
    </svg>
  );
}
