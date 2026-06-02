import { AnimatePresence, motion } from "framer-motion";
import { Check, MonitorPlay, Sparkles, X } from "lucide-react";
import { useState } from "react";
import { StatusPill } from "@/components/ui/Badge";
import { useApp } from "@/lib/appContext";
import { scenarios } from "@/lib/scenarios";
import { ease } from "@/lib/motion";
import { cn } from "@/lib/cn";
import { riskTheme } from "@/lib/risk";

/** A polished presenter tool to switch demo scenarios live. Not a debug panel. */
export function DemoPanel() {
  const [open, setOpen] = useState(false);
  const { scenario, selectScenario } = useApp();

  return (
    <>
      <motion.button
        onClick={() => setOpen(true)}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5, ease }}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className="fixed bottom-5 right-5 z-[100] flex items-center gap-2 rounded-2xl border border-line/80 bg-navy px-4 py-3 text-sm font-semibold text-white shadow-lift"
      >
        <MonitorPlay className="h-4 w-4 text-signal" />
        Pitch mode
      </motion.button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-[101] bg-navy/30 backdrop-blur-[2px]"
              onClick={() => setOpen(false)}
            />
            <motion.div
              role="dialog"
              aria-label="Pitch mode scenario switcher"
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.98 }}
              transition={{ duration: 0.35, ease }}
              className="fixed bottom-5 right-5 z-[102] w-[min(420px,calc(100vw-2.5rem))] overflow-hidden rounded-3xl border border-line/80 bg-surface shadow-lift"
            >
              <div className="flex items-start justify-between gap-3 border-b border-line/70 bg-gradient-to-b from-soft/60 to-transparent px-5 py-4">
                <div className="flex items-center gap-3">
                  <span className="grid h-9 w-9 place-items-center rounded-xl bg-navy text-signal">
                    <Sparkles className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-sm font-bold tracking-tightish text-ink">Pitch mode</p>
                    <p className="text-[12px] text-muted">Switch the live demo scenario</p>
                  </div>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="grid h-8 w-8 place-items-center rounded-lg text-muted hover:bg-soft hover:text-ink"
                  aria-label="Close pitch mode"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="max-h-[60vh] space-y-2 overflow-y-auto p-3">
                {scenarios.map((s, i) => {
                  const active = s.id === scenario.id;
                  const theme = riskTheme[s.level];
                  return (
                    <button
                      key={s.id}
                      onClick={() => {
                        selectScenario(s);
                        setOpen(false);
                      }}
                      className={cn(
                        "group flex w-full items-start gap-3 rounded-2xl border p-3 text-left transition-all",
                        active
                          ? "border-signal/40 bg-signal-50/60 ring-1 ring-signal/20"
                          : "border-line/80 bg-surface hover:border-slate-300 hover:bg-soft/50"
                      )}
                    >
                      <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-soft text-[12px] font-bold text-muted tnum">
                        {i + 1}
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <p className="truncate text-[13.5px] font-semibold text-ink">{s.menuTitle}</p>
                          <StatusPill tone={s.level} label={theme.label} />
                        </div>
                        <p className="mt-0.5 text-[12px] leading-snug text-muted">{s.menuDesc}</p>
                      </div>
                      {active && (
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-signal-deep" />
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="border-t border-line/70 px-4 py-3">
                <p className="text-[11px] leading-relaxed text-muted">
                  Demo prototype · all data is simulated. CareSignal does not diagnose.
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
