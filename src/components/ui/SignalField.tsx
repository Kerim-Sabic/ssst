import { motion, useReducedMotion } from "framer-motion";
import { ecgPath } from "@/lib/ecg";
import { cn } from "@/lib/cn";

const wave = ecgPath({ beats: 7, beatWidth: 960 / 7, height: 140, baseline: 88, amplitude: 52 }).d;

/**
 * A barely-visible clinical signal motif used as a calm backdrop.
 * Two slow-drifting, clinically-shaped ECG lines + a faint grid. No blobs.
 */
export function SignalField({ className }: { className?: string }) {
  const reduce = useReducedMotion();

  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)} aria-hidden>
      <div className="absolute inset-0 grid-backdrop opacity-[0.55]" />
      <svg className="absolute inset-x-0 top-[18%] h-40 w-[200%]" viewBox="0 0 960 140" fill="none" preserveAspectRatio="none">
        <motion.path
          d={wave}
          stroke="url(#sg1)"
          strokeWidth={1.4}
          strokeLinecap="round"
          initial={{ x: 0 }}
          animate={reduce ? undefined : { x: [-480, 0] }}
          transition={{ duration: 26, ease: "linear", repeat: Infinity }}
        />
        <defs>
          <linearGradient id="sg1" x1="0" y1="0" x2="960" y2="0" gradientUnits="userSpaceOnUse">
            <stop stopColor="#14B8A6" stopOpacity="0" />
            <stop offset="0.5" stopColor="#14B8A6" stopOpacity="0.18" />
            <stop offset="1" stopColor="#14B8A6" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
      <svg className="absolute inset-x-0 top-[55%] h-40 w-[200%]" viewBox="0 0 960 140" fill="none" preserveAspectRatio="none">
        <motion.path
          d={wave}
          stroke="url(#sg2)"
          strokeWidth={1.2}
          strokeLinecap="round"
          initial={{ x: -200 }}
          animate={reduce ? undefined : { x: [-680, -200] }}
          transition={{ duration: 34, ease: "linear", repeat: Infinity }}
        />
        <defs>
          <linearGradient id="sg2" x1="0" y1="0" x2="960" y2="0" gradientUnits="userSpaceOnUse">
            <stop stopColor="#0B1B3A" stopOpacity="0" />
            <stop offset="0.5" stopColor="#0B1B3A" stopOpacity="0.08" />
            <stop offset="1" stopColor="#0B1B3A" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
