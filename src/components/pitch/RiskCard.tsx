import { motion } from "framer-motion";
import { ShieldAlert } from "lucide-react";
import { ease } from "@/lib/pitchMotion";
import { cn } from "@/lib/cn";

interface RiskCardProps {
  level?: "red" | "amber" | "green";
  badge?: string;
  title: string;
  className?: string;
  /** seconds to wait before the riskReveal entrance */
  delay?: number;
}

const map = {
  red: {
    badge: "RED",
    label: "Concerning",
    text: "text-concern",
    chip: "bg-concern-soft text-concern",
    border: "border-concern/30",
    glow: "shadow-[0_30px_80px_-24px_rgba(239,68,68,0.45)]",
    bar: "bg-concern",
  },
  amber: {
    badge: "AMBER",
    label: "Watch",
    text: "text-watch",
    chip: "bg-watch-soft text-watch",
    border: "border-watch/30",
    glow: "shadow-[0_30px_80px_-24px_rgba(245,158,11,0.4)]",
    bar: "bg-watch",
  },
  green: {
    badge: "GREEN",
    label: "Stable",
    text: "text-stable",
    chip: "bg-stable-soft text-stable",
    border: "border-stable/30",
    glow: "shadow-[0_30px_80px_-24px_rgba(16,185,129,0.4)]",
    bar: "bg-stable",
  },
};

export function RiskCard({ level = "red", badge, title, className, delay = 0 }: RiskCardProps) {
  const t = map[level];
  return (
    <motion.div
      initial={{ scale: 0.92, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.7, ease, delay }}
      className={cn(
        "relative overflow-hidden rounded-3xl border bg-surface/95 p-7 backdrop-blur-sm sm:p-8",
        t.border,
        t.glow,
        className
      )}
    >
      <span className={cn("absolute inset-x-0 top-0 h-1", t.bar)} />
      <div className="flex items-center gap-4">
        <motion.span
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: delay + 0.2, type: "spring", stiffness: 240, damping: 16 }}
          className={cn("grid h-14 w-14 shrink-0 place-items-center rounded-2xl", t.chip)}
        >
          <ShieldAlert className="h-7 w-7" />
        </motion.span>
        <div>
          <div className="flex items-center gap-2.5">
            <span className={cn("rounded-lg px-2.5 py-1 text-[12px] font-extrabold tracking-[0.14em]", t.chip)}>
              {badge ?? t.badge}
            </span>
            <span className="text-[12px] font-semibold uppercase tracking-[0.14em] text-muted">
              {t.label} pattern
            </span>
          </div>
          <p className={cn("mt-2 text-[26px] font-extrabold leading-tight tracking-tighter2 sm:text-[30px]", "text-navy")}>
            {title}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
