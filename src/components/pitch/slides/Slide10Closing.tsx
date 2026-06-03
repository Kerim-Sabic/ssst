import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, BellRing, FileText, NotebookText, ScanLine, ShieldAlert } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Slide } from "../Slide";
import { SignalMark, WordReveal } from "../pitchShared";
import { ease, revealUp } from "@/lib/pitchMotion";

const moments: { icon: LucideIcon; label: string }[] = [
  { icon: NotebookText, label: "Journal" },
  { icon: ScanLine, label: "Validation" },
  { icon: ShieldAlert, label: "Risk" },
  { icon: BellRing, label: "Caregiver" },
  { icon: FileText, label: "Doctor summary" },
];

export function Slide10Closing({ onOpenDemo }: { onOpenDemo: () => void }) {
  const reduce = useReducedMotion();
  const isStandalone = typeof window !== "undefined" && !!window.__CS_STANDALONE__;
  return (
    <Slide className="items-center text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.5, duration: 0.7, ease }}
        className="relative mb-8"
      >
        <SignalMark size={92} className="mx-auto" />
        {!reduce && (
          <motion.span
            className="absolute inset-0 -z-10 rounded-[28%]"
            animate={{ boxShadow: ["0 0 0 0 rgba(20,184,166,0.35)", "0 0 0 22px rgba(20,184,166,0)"] }}
            transition={{ duration: 2.6, ease: "easeOut", repeat: Infinity, delay: 2.2 }}
          />
        )}
      </motion.div>

      <WordReveal
        text="CareSignal AI"
        highlight={["AI"]}
        className="text-[clamp(40px,6.5vw,72px)] font-extrabold leading-[1.02] tracking-tighter2 text-navy"
      />

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.9, duration: 0.6, ease }}
        className="mx-auto mt-4 max-w-xl text-[clamp(16px,2vw,20px)] leading-relaxed text-slate-600"
      >
        The chronic-care journal that turns daily entries into earlier action.
      </motion.p>

      {/* mini product moments compressing toward the mark */}
      <div className="mt-9 flex flex-wrap items-center justify-center gap-2.5">
        {moments.map((m, i) => (
          <motion.div
            key={m.label}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.2 + i * 0.18, duration: 0.5, ease }}
            className="flex items-center gap-2 rounded-2xl border border-line/80 bg-surface/90 px-3.5 py-2.5 shadow-soft backdrop-blur-sm"
          >
            <span className="grid h-7 w-7 place-items-center rounded-lg bg-signal-50 text-signal-deep">
              <m.icon className="h-3.5 w-3.5" />
            </span>
            <span className="text-[13px] font-semibold text-ink">{m.label}</span>
            {i < moments.length - 1 && <ArrowRight className="ml-1 hidden h-3.5 w-3.5 text-slate-300 sm:block" />}
          </motion.div>
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.6 }}
        className="mx-auto mt-8 max-w-lg text-[14px] leading-relaxed text-muted"
      >
        For patients living with chronic disease, the hardest part is not collecting data. It is knowing
        when the data means something.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.5, duration: 0.6, ease }}
        className="mt-7"
      >
        {isStandalone ? (
          <span className="relative inline-flex h-[54px] items-center gap-2.5 overflow-hidden rounded-2xl bg-navy px-8 text-[16px] font-semibold text-white shadow-lift">
            The early-warning layer for chronic care
            <ArrowRight className="h-[18px] w-[18px] text-signal" />
          </span>
        ) : (
          <motion.button
            onClick={onOpenDemo}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="relative inline-flex h-[54px] items-center gap-2.5 overflow-hidden rounded-2xl bg-navy px-8 text-[16px] font-semibold text-white shadow-lift"
          >
            {!reduce && (
              <motion.span
                className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-signal/25 to-transparent"
                initial={{ x: "-120%" }}
                animate={{ x: "320%" }}
                transition={{ duration: 2.2, ease: "easeInOut", repeat: Infinity, delay: 3 }}
              />
            )}
            Open live demo
            <ArrowRight className="h-[18px] w-[18px] text-signal" />
          </motion.button>
        )}
      </motion.div>

      {!isStandalone && (
        <motion.p variants={revealUp} className="mt-5 text-[13px] text-muted">
          Press <kbd className="rounded bg-soft px-1.5 py-0.5 text-[11px] font-bold text-navy">D</kbd> to open
          the live demo · <kbd className="rounded bg-soft px-1.5 py-0.5 text-[11px] font-bold text-navy">R</kbd>{" "}
          to restart
        </motion.p>
      )}
    </Slide>
  );
}
