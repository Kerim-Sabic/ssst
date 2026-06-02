import { motion } from "framer-motion";
import { Check } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { premiumCard } from "@/lib/pitchMotion";
import { cn } from "@/lib/cn";

interface DiseaseCardProps {
  icon: LucideIcon;
  name: string;
  tracks: string;
  selected?: boolean;
  accent?: "signal" | "navy" | "violet" | "rose";
  className?: string;
  onClick?: () => void;
}

const accents = {
  signal: "bg-signal-50 text-signal-deep",
  navy: "bg-navy-50 text-navy",
  violet: "bg-violet-50 text-violet-700",
  rose: "bg-rose-50 text-rose-700",
};

export function DiseaseCard({
  icon: Icon,
  name,
  tracks,
  selected,
  accent = "signal",
  className,
  onClick,
}: DiseaseCardProps) {
  return (
    <motion.div
      variants={premiumCard}
      onClick={onClick}
      whileHover={onClick ? { y: -4 } : undefined}
      whileTap={onClick ? { scale: 0.985 } : undefined}
      role={onClick ? "button" : undefined}
      aria-pressed={onClick ? !!selected : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={
        onClick
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onClick();
              }
            }
          : undefined
      }
      className={cn(
        "relative overflow-hidden rounded-3xl border bg-surface/90 p-5 shadow-soft backdrop-blur-sm transition-shadow",
        onClick && "cursor-pointer select-none",
        selected ? "border-signal/50 shadow-ring" : "border-line/80",
        className
      )}
    >
      {selected && (
        <motion.span
          layoutId={`disease-glow-${name}`}
          className="pointer-events-none absolute inset-0 rounded-3xl ring-2 ring-signal/25"
        />
      )}
      <div className="flex items-start justify-between gap-3">
        <span className={cn("grid h-12 w-12 place-items-center rounded-2xl", accents[accent])}>
          <Icon className="h-6 w-6" />
        </span>
        {selected ? (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-signal-50 px-2.5 py-1 text-[11px] font-semibold text-signal-deep">
            <Check className="h-3 w-3" /> Selected
          </span>
        ) : (
          <span className="rounded-full bg-soft px-2.5 py-1 text-[11px] font-medium text-muted">Available</span>
        )}
      </div>
      <p className="mt-4 text-[18px] font-bold tracking-tightish text-ink">{name}</p>
      <p className="mt-1 text-[13.5px] leading-relaxed text-muted">{tracks}</p>
    </motion.div>
  );
}
