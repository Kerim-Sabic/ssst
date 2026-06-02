import { motion } from "framer-motion";
import { ease } from "@/lib/motion";
import { cn } from "@/lib/cn";

interface ProgressBarProps {
  value: number; // 0..1
  className?: string;
  tone?: "signal" | "navy";
}

export function ProgressBar({ value, className, tone = "signal" }: ProgressBarProps) {
  const clamped = Math.max(0, Math.min(1, value));
  return (
    <div className={cn("h-1.5 w-full overflow-hidden rounded-full bg-line/80", className)}>
      <motion.div
        className={cn(
          "h-full rounded-full",
          tone === "signal" ? "bg-gradient-to-r from-signal to-signal-deep" : "bg-navy"
        )}
        initial={{ width: 0 }}
        animate={{ width: `${clamped * 100}%` }}
        transition={{ duration: 0.6, ease }}
      />
    </div>
  );
}

/** Thin top-of-screen progress indicator. */
export function TopProgress({ value }: { value: number }) {
  const clamped = Math.max(0, Math.min(1, value));
  return (
    <div className="fixed inset-x-0 top-0 z-[90] h-[3px] bg-transparent">
      <motion.div
        className="h-full bg-gradient-to-r from-signal via-signal-deep to-navy"
        initial={false}
        animate={{ width: `${clamped * 100}%` }}
        transition={{ duration: 0.5, ease }}
      />
    </div>
  );
}
