import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { premiumCard } from "@/lib/pitchMotion";
import { cn } from "@/lib/cn";

type Tone = "neutral" | "green" | "amber" | "red";

interface MetricCardProps {
  label: string;
  value: ReactNode;
  unit?: string;
  delta?: string;
  tone?: Tone;
  icon?: LucideIcon;
  className?: string;
}

const toneMap: Record<Tone, { value: string; chip: string; icon: string }> = {
  neutral: { value: "text-ink", chip: "bg-soft text-muted", icon: "bg-soft text-muted" },
  green: { value: "text-stable", chip: "bg-stable-soft text-stable", icon: "bg-stable-soft text-stable" },
  amber: { value: "text-watch", chip: "bg-watch-soft text-watch", icon: "bg-watch-soft text-watch" },
  red: { value: "text-concern", chip: "bg-concern-soft text-concern", icon: "bg-concern-soft text-concern" },
};

export function MetricCard({ label, value, unit, delta, tone = "neutral", icon: Icon, className }: MetricCardProps) {
  const t = toneMap[tone];
  return (
    <motion.div
      variants={premiumCard}
      className={cn(
        "rounded-2xl border border-line/80 bg-surface/90 p-4 shadow-soft backdrop-blur-sm",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <span className="text-[12px] font-medium text-muted">{label}</span>
        {Icon && (
          <span className={cn("grid h-6 w-6 place-items-center rounded-md", t.icon)}>
            <Icon className="h-3.5 w-3.5" />
          </span>
        )}
      </div>
      <div className="mt-1.5 flex items-baseline gap-1.5">
        <span className={cn("tnum text-[26px] font-extrabold leading-none tracking-tighter2", t.value)}>
          {value}
        </span>
        {unit && <span className="text-[13px] font-semibold text-muted">{unit}</span>}
      </div>
      {delta && (
        <span className={cn("mt-2 inline-flex rounded-md px-1.5 py-0.5 text-[11px] font-semibold", t.chip)}>
          {delta}
        </span>
      )}
    </motion.div>
  );
}
