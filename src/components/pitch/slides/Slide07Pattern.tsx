import { AnimatePresence, motion } from "framer-motion";
import { Activity, ShieldCheck } from "lucide-react";
import { Slide } from "../Slide";
import { Kicker, WordReveal } from "../pitchShared";
import { RiskCard } from "../RiskCard";
import { useBuild } from "../buildContext";
import { EcgStrip } from "@/components/ui/EcgStrip";
import { ease, revealUp } from "@/lib/pitchMotion";

const signals = [
  "Repeated high BP",
  "Weight gain",
  "Elevated heart rate",
  "Missed medication",
  "Worsening breathing",
  "New leg swelling",
  "Reduced walking ability",
];

/** build step: 0 signals · 1 converge + risk · 2 abnormal rhythm */
export function Slide07Pattern() {
  const { step } = useBuild();

  return (
    <Slide>
      <Kicker className="mb-4">Pattern detection · press →</Kicker>
      <WordReveal
        text="One symptom is noise. A pattern is a signal."
        highlight={["signal."]}
        className="max-w-3xl text-[clamp(28px,4.4vw,50px)] font-extrabold leading-[1.05] tracking-tighter2 text-navy"
      />

      <div className="mt-9 grid items-center gap-8 lg:grid-cols-[1fr_auto_1fr]">
        {/* signal chips */}
        <div className="space-y-2.5">
          {signals.map((s, i) => (
            <motion.div
              key={s}
              initial={{ opacity: 0, x: -18 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.13, duration: 0.45, ease }}
              className="group relative flex items-center gap-3 overflow-hidden rounded-2xl border border-line/80 bg-surface/90 px-4 py-2.5 shadow-soft backdrop-blur-sm"
            >
              <span className="absolute inset-y-0 left-0 w-1 bg-watch/60" />
              <span className="relative grid h-3 w-3 place-items-center" aria-hidden>
                <motion.span
                  className="absolute h-3 w-3 rounded-full bg-watch/30"
                  animate={{ scale: [1, 1.7, 1], opacity: [0.6, 0, 0.6] }}
                  transition={{ duration: 1.8, repeat: Infinity, delay: 0.3 + i * 0.13 }}
                />
                <span className="h-1.5 w-1.5 rounded-full bg-watch" />
              </span>
              <span className="text-[14.5px] font-medium text-ink">{s}</span>
            </motion.div>
          ))}
        </div>

        {/* converging, flowing connector */}
        <div className="relative hidden h-48 w-28 lg:block">
          <AnimatePresence>
            {step >= 1 && (
              <motion.svg
                key="conv"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                viewBox="0 0 112 192"
                className="h-full w-full"
                fill="none"
                aria-hidden
              >
                <motion.path
                  d="M2 24 C 64 36, 64 96, 104 96 M2 96 C 64 96, 64 96, 104 96 M2 168 C 64 156, 64 96, 104 96"
                  stroke="#F59E0B"
                  strokeWidth={1.5}
                  strokeLinecap="round"
                  opacity={0.35}
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.9, ease: "easeInOut" }}
                />
                <motion.path
                  d="M2 24 C 64 36, 64 96, 104 96 M2 96 C 64 96, 64 96, 104 96 M2 168 C 64 156, 64 96, 104 96"
                  stroke="#14B8A6"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeDasharray="2 12"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.9, strokeDashoffset: [0, -56] }}
                  transition={{
                    opacity: { delay: 0.5, duration: 0.4 },
                    strokeDashoffset: { delay: 0.5, duration: 1.4, ease: "linear", repeat: Infinity },
                  }}
                />
                <motion.path
                  d="M94 90 L104 96 L94 102"
                  stroke="#EF4444"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.4 }}
                />
              </motion.svg>
            )}
          </AnimatePresence>
        </div>

        {/* risk result with glow burst */}
        <div className="relative min-h-[150px]">
          <AnimatePresence>
            {step >= 1 ? (
              <motion.div key="risk" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <motion.div
                  className="pointer-events-none absolute inset-0 -z-10 rounded-3xl bg-concern/20 blur-2xl"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: [0, 0.7, 0.25], scale: [0.8, 1.08, 1] }}
                  transition={{ duration: 1.1, ease }}
                />
                <RiskCard level="red" title="Concerning worsening pattern" delay={0.1} />
              </motion.div>
            ) : (
              <motion.div
                key="placeholder"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid h-full min-h-[150px] place-items-center rounded-3xl border border-dashed border-line bg-surface/40 px-6 text-center text-[13px] text-muted"
              >
                Seven daily signals, one picture →
                <br />
                press → to combine them
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* recorded abnormal rhythm */}
      <AnimatePresence>
        {step >= 2 && (
          <motion.div
            key="ecg"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.5, ease }}
            className="mt-7 overflow-hidden rounded-2xl border border-concern/25 bg-navy"
          >
            <div className="flex items-center justify-between px-4 pt-2.5">
              <span className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/70">
                <Activity className="h-3.5 w-3.5 text-concern" /> Recorded rhythm · abnormal
              </span>
              <span className="text-[11px] font-semibold text-concern">peaked T · ST change</span>
            </div>
            <EcgStrip
              variant="concern"
              beats={5}
              surface="none"
              color="#F87171"
              gridColor="rgba(248,113,113,0.12)"
              height={72}
              glow
              pulse
              pulseDelay={0.4}
              drawDelay={0.2}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.p
        variants={revealUp}
        className="mt-6 flex max-w-3xl items-start gap-2.5 text-[14px] leading-relaxed text-muted"
      >
        <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-signal-deep" />
        <span>
          <span className="font-semibold text-ink">CareSignal does not diagnose.</span> It organizes warning
          signs and suggests when to contact a healthcare professional.
        </span>
      </motion.p>
    </Slide>
  );
}
