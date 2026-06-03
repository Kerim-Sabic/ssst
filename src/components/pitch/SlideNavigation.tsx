import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, PlayCircle, RotateCcw } from "lucide-react";
import { ease, springSnappy } from "@/lib/pitchMotion";
import { cn } from "@/lib/cn";

interface SlideNavigationProps {
  index: number;
  total: number;
  builds?: number;
  buildStep?: number;
  nextTitle?: string;
  hideDemo?: boolean;
  onPrev: () => void;
  onNext: () => void;
  onJump: (i: number) => void;
  onRestart: () => void;
  onOpenDemo: () => void;
}

export function SlideNavigation({
  index,
  total,
  builds = 0,
  buildStep = 0,
  nextTitle,
  hideDemo,
  onPrev,
  onNext,
  onJump,
  onRestart,
  onOpenDemo,
}: SlideNavigationProps) {
  const progress = (index + 1) / total;

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40">
      <div className="pointer-events-auto mx-auto mb-3 flex w-full max-w-6xl items-center justify-between gap-4 px-6 sm:px-10">
        {/* counter + dots */}
        <div className="flex items-center gap-4">
          <div className="tnum flex items-baseline gap-1 text-[13px] font-semibold text-navy">
            <motion.span
              key={index}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease }}
              className="inline-block text-[15px]"
            >
              {String(index + 1).padStart(2, "0")}
            </motion.span>
            <span className="text-muted">/ {String(total).padStart(2, "0")}</span>
          </div>

          {builds > 0 && (
            <span className="hidden items-center gap-1 rounded-full border border-signal/30 bg-signal-50/70 px-2 py-1 text-[10px] font-semibold text-signal-deep sm:inline-flex">
              {Array.from({ length: builds + 1 }).map((_, i) => (
                <span
                  key={i}
                  className={cn("h-1.5 w-1.5 rounded-full transition-colors", i <= buildStep ? "bg-signal-deep" : "bg-signal/30")}
                />
              ))}
              <span className="ml-0.5">build</span>
            </span>
          )}

          <div className="hidden items-center gap-1.5 rounded-full border border-line/70 bg-surface/70 px-2 py-1.5 shadow-soft backdrop-blur-sm sm:flex">
            {Array.from({ length: total }).map((_, i) => (
              <button
                key={i}
                onClick={() => onJump(i)}
                aria-label={`Go to slide ${i + 1}`}
                className="group relative grid h-4 place-items-center px-0.5"
              >
                {i === index && (
                  <motion.span
                    layoutId="nav-dot-active"
                    transition={springSnappy}
                    className="absolute h-1.5 w-6 rounded-full bg-gradient-to-r from-signal to-signal-deep"
                  />
                )}
                <span
                  className={cn(
                    "relative h-1.5 rounded-full transition-all duration-300",
                    i === index ? "w-6 bg-transparent" : "w-1.5 bg-slate-300 group-hover:bg-slate-400 group-hover:scale-125"
                  )}
                />
              </button>
            ))}
          </div>
        </div>

        {/* actions */}
        <div className="flex items-center gap-2">
          {nextTitle && (
            <span className="mr-1 hidden items-center gap-1.5 text-[11px] text-muted xl:flex">
              <span className="text-slate-400">Next ·</span>
              <span className="font-semibold text-slate-500">{nextTitle}</span>
            </span>
          )}
          <span className="mr-1 hidden items-center gap-1 text-[11px] text-muted lg:flex">
            <kbd className="rounded border border-line/80 bg-surface/80 px-1.5 py-0.5 font-semibold text-slate-500">←</kbd>
            <kbd className="rounded border border-line/80 bg-surface/80 px-1.5 py-0.5 font-semibold text-slate-500">→</kbd>
          </span>
          <motion.button
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={onRestart}
            className="hidden h-10 items-center gap-2 rounded-xl border border-line/80 bg-surface/85 px-3.5 text-[13px] font-semibold text-slate-600 shadow-soft backdrop-blur-sm transition-colors hover:text-ink sm:inline-flex"
          >
            <RotateCcw className="h-4 w-4" /> Restart
          </motion.button>
          {!hideDemo && (
            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={onOpenDemo}
              className="group inline-flex h-10 items-center gap-2 rounded-xl bg-navy px-4 text-[13px] font-semibold text-white shadow-soft transition-colors hover:bg-navy-600"
            >
              <PlayCircle className="h-4 w-4 text-signal transition-transform group-hover:scale-110" /> Open live demo
            </motion.button>
          )}
          <div className="flex items-center">
            <NavArrow direction="prev" onClick={onPrev} disabled={index === 0} />
            <NavArrow direction="next" onClick={onNext} disabled={index === total - 1} />
          </div>
        </div>
      </div>

      {/* progress bar */}
      <div className="relative h-[3px] w-full bg-line/70">
        <motion.div
          className="h-full bg-gradient-to-r from-signal via-signal-deep to-navy"
          initial={false}
          animate={{ width: `${progress * 100}%` }}
          transition={{ duration: 0.55, ease }}
        />
        <motion.span
          className="absolute top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-signal shadow-[0_0_8px_rgba(20,184,166,0.8)]"
          initial={false}
          animate={{ left: `calc(${progress * 100}% - 4px)` }}
          transition={{ duration: 0.55, ease }}
        />
      </div>
    </div>
  );
}

function NavArrow({
  direction,
  onClick,
  disabled,
}: {
  direction: "prev" | "next";
  onClick: () => void;
  disabled?: boolean;
}) {
  const Icon = direction === "prev" ? ChevronLeft : ChevronRight;
  return (
    <motion.button
      whileHover={disabled ? undefined : { scale: 1.05 }}
      whileTap={disabled ? undefined : { scale: 0.92 }}
      onClick={onClick}
      disabled={disabled}
      aria-label={direction === "prev" ? "Previous slide" : "Next slide"}
      className={cn(
        "grid h-10 w-10 place-items-center border border-line/80 bg-surface/85 text-slate-600 shadow-soft backdrop-blur-sm transition-all hover:text-ink disabled:opacity-35",
        direction === "prev" ? "rounded-l-xl" : "-ml-px rounded-r-xl"
      )}
    >
      <Icon className="h-[18px] w-[18px]" />
    </motion.button>
  );
}
