import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { ScreenShell, Eyebrow, JourneySteps } from "@/components/ui/Bits";
import { useApp } from "@/lib/appContext";
import { diseasePacks, packAccent } from "@/lib/diseasePacks";
import { ease, rise, stagger } from "@/lib/motion";
import { cn } from "@/lib/cn";

const genSteps = [
  "Building Amina’s journal",
  "Prioritizing heart-failure signals",
  "Adding blood-pressure safety checks",
  "Creating caregiver escalation rules",
  "Preparing doctor-summary format",
];

export function ConditionScreen() {
  const { go, selectedConditions, setSelectedConditions } = useApp();
  const [generating, setGenerating] = useState(false);
  const [step, setStep] = useState(0);

  const toggle = (id: string) => {
    if (generating) return;
    setSelectedConditions(
      selectedConditions.includes(id)
        ? selectedConditions.filter((c) => c !== id)
        : [...selectedConditions, id]
    );
  };

  useEffect(() => {
    if (!generating) return;
    if (step < genSteps.length) {
      const t = window.setTimeout(() => setStep((s) => s + 1), 520);
      return () => window.clearTimeout(t);
    }
    const done = window.setTimeout(() => go("plan"), 650);
    return () => window.clearTimeout(done);
  }, [generating, step, go]);

  return (
    <ScreenShell>
      <JourneySteps active={1} />
      <Eyebrow>Disease packs</Eyebrow>
      <h1 className="max-w-3xl text-balance text-[32px] font-extrabold leading-tight tracking-tighter2 text-navy sm:text-[38px]">
        Choose the conditions CareSignal should watch
      </h1>
      <p className="mt-3 max-w-2xl text-[16px] leading-relaxed text-slate-600">
        CareSignal creates a daily journal based on the conditions that matter for this patient. Two packs
        are preselected for Amina.
      </p>

      <motion.div
        variants={stagger}
        initial="initial"
        animate="animate"
        className="mt-8 grid gap-4 sm:grid-cols-2"
      >
        {diseasePacks.map((pack) => {
          const selected = selectedConditions.includes(pack.id);
          const accent = packAccent[pack.accent];
          return (
            <motion.button
              key={pack.id}
              variants={rise}
              onClick={() => toggle(pack.id)}
              disabled={generating}
              className={cn(
                "group relative overflow-hidden rounded-3xl border bg-surface p-5 text-left shadow-soft transition-all duration-300",
                selected
                  ? "border-signal/50 ring-2 ring-signal/25 shadow-card"
                  : "border-line/80 hover:border-slate-300 hover:shadow-card",
                generating && "opacity-70"
              )}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className={cn("grid h-12 w-12 place-items-center rounded-2xl", accent.icon)}>
                    <pack.icon className="h-[22px] w-[22px]" />
                  </span>
                  <div>
                    <p className="text-[17px] font-bold tracking-tightish text-ink">{pack.name}</p>
                    <p className="text-[13px] text-muted">{pack.short}</p>
                  </div>
                </div>
                <span
                  className={cn(
                    "grid h-6 w-6 place-items-center rounded-full border-2 transition-all",
                    selected ? "border-signal bg-signal text-white" : "border-line bg-surface"
                  )}
                >
                  <AnimatePresence>
                    {selected && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        transition={{ type: "spring", stiffness: 500, damping: 25 }}
                      >
                        <Check className="h-3.5 w-3.5" />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </span>
              </div>

              <p className="mt-3 text-[13.5px] leading-relaxed text-slate-600">{pack.blurb}</p>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {pack.tracks.slice(0, 5).map((t) => (
                  <span
                    key={t}
                    className="rounded-lg bg-soft/70 px-2 py-1 text-[11.5px] font-medium text-slate-600"
                  >
                    {t}
                  </span>
                ))}
                <span className="rounded-lg bg-soft/70 px-2 py-1 text-[11.5px] font-medium text-muted">
                  +{pack.tracks.length - 5} more
                </span>
              </div>
            </motion.button>
          );
        })}
      </motion.div>

      {/* generation panel */}
      <AnimatePresence mode="wait">
        {generating ? (
          <motion.div
            key="gen"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.4, ease }}
            className="mt-8 overflow-hidden rounded-3xl border border-line/80 bg-navy p-6 text-white shadow-card"
          >
            <div className="flex items-center gap-2.5">
              <Loader2 className="h-4 w-4 animate-spin text-signal" />
              <p className="text-sm font-semibold tracking-tightish">Generating Amina’s journal…</p>
            </div>
            <div className="mt-4 space-y-2.5">
              {genSteps.map((s, i) => {
                const complete = i < step;
                const active = i === step;
                return (
                  <motion.div
                    key={s}
                    initial={{ opacity: 0.3 }}
                    animate={{ opacity: complete || active ? 1 : 0.35 }}
                    className="flex items-center gap-3"
                  >
                    <span
                      className={cn(
                        "grid h-6 w-6 place-items-center rounded-full border transition-colors",
                        complete ? "border-signal bg-signal/20 text-signal" : "border-white/25 text-white/50"
                      )}
                    >
                      {complete ? (
                        <Check className="h-3.5 w-3.5" />
                      ) : active ? (
                        <Loader2 className="h-3 w-3 animate-spin" />
                      ) : (
                        <span className="h-1.5 w-1.5 rounded-full bg-white/40" />
                      )}
                    </span>
                    <span className={cn("text-[14px]", complete ? "text-white" : "text-white/70")}>
                      {s}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="cta"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mt-9 flex flex-col items-center justify-between gap-4 sm:flex-row"
          >
            <p className="text-[13px] text-muted">
              {selectedConditions.length} pack{selectedConditions.length === 1 ? "" : "s"} selected ·
              CareSignal asks only what matters for these.
            </p>
            <Button
              size="lg"
              disabled={selectedConditions.length === 0}
              onClick={() => {
                setStep(0);
                setGenerating(true);
              }}
              iconRight={<ArrowRight className="h-[18px] w-[18px]" />}
            >
              Generate my daily journal
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </ScreenShell>
  );
}
