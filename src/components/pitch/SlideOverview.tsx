import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { ease } from "@/lib/pitchMotion";
import { cn } from "@/lib/cn";

interface SlideOverviewProps {
  open: boolean;
  titles: string[];
  index: number;
  onJump: (i: number) => void;
  onClose: () => void;
}

/** Presenter slide-grid overview (press O). Jump anywhere instantly. */
export function SlideOverview({ open, titles, index, onJump, onClose }: SlideOverviewProps) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[110] bg-navy/40 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            role="dialog"
            aria-label="Slide overview"
            initial={{ opacity: 0, scale: 0.97, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 8 }}
            transition={{ duration: 0.3, ease }}
            className="fixed left-1/2 top-1/2 z-[111] w-[min(900px,calc(100vw-3rem))] -translate-x-1/2 -translate-y-1/2 rounded-3xl border border-line/80 bg-surface p-6 shadow-lift"
          >
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-[13px] font-bold tracking-tightish text-ink">Slide overview</p>
                <p className="text-[12px] text-muted">Click any slide to jump · press O to close</p>
              </div>
              <button
                onClick={onClose}
                aria-label="Close overview"
                className="grid h-8 w-8 place-items-center rounded-lg text-muted hover:bg-soft hover:text-ink"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
              {titles.map((t, i) => {
                const active = i === index;
                return (
                  <button
                    key={t + i}
                    onClick={() => {
                      onJump(i);
                      onClose();
                    }}
                    className={cn(
                      "group flex aspect-[4/3] flex-col justify-between rounded-2xl border p-3 text-left transition-all",
                      active
                        ? "border-signal/50 bg-signal-50/60 ring-2 ring-signal/25"
                        : "border-line/80 bg-soft/40 hover:border-slate-300 hover:bg-surface hover:shadow-card"
                    )}
                  >
                    <span className="tnum text-[12px] font-bold text-muted">{String(i + 1).padStart(2, "0")}</span>
                    <span className="text-[13px] font-semibold leading-snug text-ink">{t}</span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
