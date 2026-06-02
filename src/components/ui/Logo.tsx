import { motion } from "framer-motion";
import { ECG_ICON_PATH, ECG_ICON_VIEWBOX } from "@/lib/ecg";
import { cn } from "@/lib/cn";

interface LogoProps {
  className?: string;
  showWord?: boolean;
  tone?: "navy" | "white";
  animated?: boolean;
}

/** CareSignal mark — a calm clinical signal pulse inside a rounded tile. */
export function Logo({ className, showWord = true, tone = "navy", animated = true }: LogoProps) {
  const wordColor = tone === "white" ? "text-white" : "text-navy";
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <div className="relative grid h-9 w-9 place-items-center rounded-xl bg-navy shadow-soft">
        <svg viewBox={ECG_ICON_VIEWBOX} className="h-[18px] w-[24px]" fill="none" aria-hidden>
          <motion.path
            d={ECG_ICON_PATH}
            stroke="#2DD4BF"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={animated ? { pathLength: 0, opacity: 0 } : false}
            animate={animated ? { pathLength: 1, opacity: 1 } : undefined}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          />
        </svg>
        <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-signal shadow-[0_0_0_3px_rgba(20,184,166,0.25)]" />
      </div>
      {showWord && (
        <div className={cn("text-[17px] font-bold leading-none tracking-tighter2", wordColor)}>
          Care<span className="text-signal-deep">Signal</span>
          <span className={cn("ml-1 align-top text-[10px] font-semibold tracking-normal", tone === "white" ? "text-white/60" : "text-muted")}>
            AI
          </span>
        </div>
      )}
    </div>
  );
}
