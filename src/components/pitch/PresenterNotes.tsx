import { AnimatePresence, motion } from "framer-motion";
import { NotebookPen, X } from "lucide-react";
import { ease } from "@/lib/pitchMotion";

interface PresenterNotesProps {
  open: boolean;
  note: string;
  title: string;
  index: number;
  total: number;
  onClose: () => void;
}

export function PresenterNotes({ open, note, title, index, total, onClose }: PresenterNotesProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.aside
          key="notes"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.32, ease }}
          className="fixed bottom-20 left-6 z-50 w-[min(420px,calc(100vw-3rem))] overflow-hidden rounded-2xl border border-line/80 bg-navy text-white shadow-lift sm:left-10"
        >
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
            <div className="flex items-center gap-2.5">
              <span className="grid h-7 w-7 place-items-center rounded-lg bg-white/10 text-signal">
                <NotebookPen className="h-3.5 w-3.5" />
              </span>
              <div className="leading-tight">
                <p className="text-[12px] font-bold tracking-tightish">Presenter notes</p>
                <p className="tnum text-[10.5px] text-white/55">
                  Slide {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")} · {title}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              aria-label="Close presenter notes"
              className="grid h-7 w-7 place-items-center rounded-lg text-white/60 hover:bg-white/10 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <p className="px-4 py-4 text-[14px] leading-relaxed text-white/85">{note}</p>
          <div className="border-t border-white/10 px-4 py-2.5">
            <p className="text-[10.5px] text-white/45">
              Press <kbd className="rounded bg-white/10 px-1 font-semibold text-white/70">P</kbd> to toggle ·{" "}
              <kbd className="rounded bg-white/10 px-1 font-semibold text-white/70">→</kbd> next
            </p>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
