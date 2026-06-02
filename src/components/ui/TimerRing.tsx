import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

interface TimerRingProps {
  /** total seconds (demo uses a short ring); label still reads as the rest period */
  seconds?: number;
  onComplete?: () => void;
  className?: string;
}

/** A smooth animated rest-timer ring. Counts down; resolves on its own or via Skip. */
export function TimerRing({ seconds = 20, onComplete, className }: TimerRingProps) {
  const reduce = useReducedMotion();
  const [remaining, setRemaining] = useState(seconds);
  const done = useRef(false);

  useEffect(() => {
    if (reduce) return; // reduced motion: rely on Skip button
    const start = Date.now();
    const id = window.setInterval(() => {
      const elapsed = (Date.now() - start) / 1000;
      const left = Math.max(0, seconds - elapsed);
      setRemaining(left);
      if (left <= 0 && !done.current) {
        done.current = true;
        window.clearInterval(id);
        onComplete?.();
      }
    }, 100);
    return () => window.clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const R = 54;
  const C = 2 * Math.PI * R;
  const progress = 1 - remaining / seconds;
  const mins = Math.floor(remaining / 60);
  const secs = Math.ceil(remaining % 60);

  return (
    <div className={cn("relative grid place-items-center", className)}>
      <svg viewBox="0 0 140 140" className="h-36 w-36 -rotate-90">
        <circle cx="70" cy="70" r={R} fill="none" stroke="#E2E8F0" strokeWidth={8} />
        <motion.circle
          cx="70"
          cy="70"
          r={R}
          fill="none"
          stroke="url(#ring)"
          strokeWidth={8}
          strokeLinecap="round"
          strokeDasharray={C}
          initial={{ strokeDashoffset: C }}
          animate={{ strokeDashoffset: C * (1 - progress) }}
          transition={{ duration: 0.2, ease: "linear" }}
        />
        <defs>
          <linearGradient id="ring" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#14B8A6" />
            <stop offset="100%" stopColor="#0F766E" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="tnum text-2xl font-bold tracking-tighter2 text-navy">
          {mins}:{secs.toString().padStart(2, "0")}
        </span>
        <span className="text-[11px] font-medium text-muted">rest before retry</span>
      </div>
    </div>
  );
}
