import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface BadgeProps {
  children: ReactNode;
  className?: string;
  tone?: "neutral" | "signal" | "navy" | "green" | "amber" | "red";
  icon?: ReactNode;
}

const tones: Record<NonNullable<BadgeProps["tone"]>, string> = {
  neutral: "bg-soft text-muted border-line/80",
  signal: "bg-signal-50 text-signal-deep border-signal/20",
  navy: "bg-navy-50 text-navy border-navy/15",
  green: "bg-stable-soft text-stable border-stable/20",
  amber: "bg-watch-soft text-watch border-watch/25",
  red: "bg-concern-soft text-concern border-concern/25",
};

export function Badge({ children, className, tone = "neutral", icon }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold tracking-tightish",
        tones[tone],
        className
      )}
    >
      {icon}
      {children}
    </span>
  );
}

/** Small status pill with an explicit dot + label (never color alone). */
export function StatusPill({
  tone,
  label,
  className,
}: {
  tone: "green" | "amber" | "red";
  label: string;
  className?: string;
}) {
  const dot = { green: "bg-stable", amber: "bg-watch", red: "bg-concern" }[tone];
  return (
    <Badge tone={tone} className={className} icon={<span className={cn("h-1.5 w-1.5 rounded-full", dot)} />}>
      {label}
    </Badge>
  );
}
