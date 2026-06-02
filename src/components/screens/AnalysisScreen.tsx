import { motion, useReducedMotion } from "framer-motion";
import { Check, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Logo } from "@/components/ui/Logo";
import { EcgStrip } from "@/components/ui/EcgStrip";
import { useApp } from "@/lib/appContext";
import { ease } from "@/lib/motion";
import { toneIconWrap, toneText } from "@/lib/risk";
import { cn } from "@/lib/cn";

const steps = [
  "Checking repeated measurement",
  "Comparing to baseline",
  "Reviewing 3-day trend",
  "Combining symptoms and medication",
  "Preparing action plan",
];

export function AnalysisScreen() {
  const { scenario, go } = useApp();
  const reduce = useReducedMotion();
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (step < steps.length) {
      const t = window.setTimeout(() => setStep((s) => s + 1), reduce ? 200 : 480);
      return () => window.clearTimeout(t);
    }
    const done = window.setTimeout(() => go("result"), reduce ? 200 : 700);
    return () => window.clearTimeout(done);
  }, [step, go, reduce]);

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.3 } }}
      className="shell grid min-h-[78vh] place-items-center py-12"
    >
      <div className="w-full max-w-2xl">
        <div className="mb-8 flex flex-col items-center text-center">
          <Logo showWord={false} className="mb-5 scale-125" />
          <h1 className="text-[26px] font-extrabold tracking-tighter2 text-navy sm:text-[30px]">
            Analyzing {scenario.patient.name.split(" ")[0]}’s pattern
          </h1>
          <p className="mt-2 text-[15px] text-muted">
            Comparing today’s journal with the usual baseline — no diagnosis, just signals.
          </p>
        </div>

        {/* animated signal line */}
        <div className="card overflow-hidden p-6">
          <SignalSweep />

          {/* steps */}
          <div className="mt-6 space-y-2.5">
            {steps.map((s, i) => {
              const complete = i < step;
              const active = i === step;
              return (
                <motion.div
                  key={s}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: complete || active ? 1 : 0.4, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center gap-3"
                >
                  <span
                    className={cn(
                      "grid h-7 w-7 place-items-center rounded-full border transition-colors",
                      complete
                        ? "border-stable bg-stable-soft text-stable"
                        : active
                        ? "border-signal bg-signal-50 text-signal-deep"
                        : "border-line bg-surface text-slate-400"
                    )}
                  >
                    {complete ? (
                      <Check className="h-4 w-4" />
                    ) : active ? (
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    ) : (
                      <span className="h-1.5 w-1.5 rounded-full bg-slate-300" />
                    )}
                  </span>
                  <span className={cn("text-[14.5px] font-medium", complete || active ? "text-ink" : "text-muted")}>
                    {s}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* fact cards */}
        <div className="mt-5 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
          {scenario.analysisFacts.map((f, i) => (
            <motion.div
              key={f.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 + i * 0.08, duration: 0.4, ease }}
              className="rounded-2xl border border-line/80 bg-surface p-3 shadow-soft"
            >
              <span className={cn("inline-grid h-6 w-6 place-items-center rounded-md", toneIconWrap[f.tone])}>
                <span className="h-1.5 w-1.5 rounded-full bg-current" />
              </span>
              <p className={cn("tnum mt-1.5 text-[15px] font-bold tracking-tightish", toneText[f.tone])}>{f.value}</p>
              <p className="text-[11px] leading-tight text-muted">{f.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.main>
  );
}

function SignalSweep() {
  const reduce = useReducedMotion();
  return (
    <div className="relative h-20 w-full overflow-hidden rounded-2xl">
      <EcgStrip variant="normal" beats={4} surface="navy" height={80} glow pulse pulseDelay={0.6} pulseDuration={2.4} />
      {!reduce && (
        <motion.div
          className="pointer-events-none absolute inset-y-0 w-24 bg-gradient-to-r from-transparent via-signal/25 to-transparent"
          initial={{ x: "-20%" }}
          animate={{ x: "120%" }}
          transition={{ duration: 1.8, ease: "easeInOut", repeat: Infinity }}
        />
      )}
    </div>
  );
}
