import { motion } from "framer-motion";
import { ArrowRight, Check, RefreshCw, ShieldAlert, TriangleAlert } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { TimerRing } from "@/components/ui/TimerRing";
import { ScreenShell, Eyebrow, SafetyNote } from "@/components/ui/Bits";
import { useApp } from "@/lib/appContext";
import { ease, rise, staggerFast } from "@/lib/motion";
import { cn } from "@/lib/cn";

type Phase = "rest" | "repeat";

export function ValidationScreen() {
  const { scenario, go } = useApp();
  const recheck = scenario.recheck;
  const [phase, setPhase] = useState<Phase>("rest");

  useEffect(() => {
    if (!recheck) go("analysis");
  }, [recheck, go]);

  if (!recheck) return null;

  const stillElevated = scenario.level === "red";

  return (
    <ScreenShell>
      <div className="mx-auto max-w-3xl">
        <Eyebrow>Measure Again Intelligence</Eyebrow>
        <h1 className="text-balance text-[30px] font-extrabold leading-tight tracking-tighter2 text-navy sm:text-[36px]">
          {recheck.title}
        </h1>
        <p className="mt-3 text-[16px] leading-relaxed text-slate-600">{recheck.subtitle}</p>

        {/* the flagged reading */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease }}
          className="mt-6 flex items-center justify-between rounded-3xl border border-watch/30 bg-watch-soft px-6 py-5"
        >
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-watch/15 text-watch">
              <TriangleAlert className="h-5 w-5" />
            </span>
            <div>
              <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-watch">First reading</p>
              <p className="tnum text-[26px] font-extrabold leading-none tracking-tighter2 text-ink">
                {recheck.initialReading}
                <span className="ml-1.5 text-[14px] font-semibold text-muted">{recheck.unit}</span>
              </p>
            </div>
          </div>
          <Badge tone="amber">Not yet flagged</Badge>
        </motion.div>

        {phase === "rest" ? (
          <RestPhase recheck={recheck} onReady={() => setPhase("repeat")} />
        ) : (
          <RepeatPhase recheck={recheck} stillElevated={stillElevated} onAnalyze={() => go("analysis")} />
        )}

        <SafetyNote variant="inline" className="mt-8" />
      </div>
    </ScreenShell>
  );
}

function RestPhase({
  recheck,
  onReady,
}: {
  recheck: NonNullable<ReturnType<typeof useApp>["scenario"]["recheck"]>;
  onReady: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease }}
      className="mt-6 grid gap-6 lg:grid-cols-[1.25fr_0.75fr]"
    >
      {/* instructions */}
      <div className="card p-6">
        <p className="text-[13px] font-semibold uppercase tracking-[0.12em] text-muted">Before measuring again</p>
        <motion.ol variants={staggerFast} initial="initial" animate="animate" className="mt-4 space-y-2.5">
          {recheck.instructions.map((ins, i) => (
            <motion.li
              key={ins.text}
              variants={rise}
              className={cn(
                "flex items-start gap-3 rounded-2xl border px-4 py-3",
                ins.urgent ? "border-concern/30 bg-concern-soft" : "border-line/70 bg-soft/40"
              )}
            >
              <span
                className={cn(
                  "tnum grid h-7 w-7 shrink-0 place-items-center rounded-full text-[12px] font-bold",
                  ins.urgent ? "bg-concern/15 text-concern" : "bg-surface text-signal-deep shadow-soft"
                )}
              >
                {ins.urgent ? <ShieldAlert className="h-3.5 w-3.5" /> : i + 1}
              </span>
              <span className={cn("text-[14.5px] font-medium leading-snug", ins.urgent ? "text-concern" : "text-ink")}>
                {ins.text}
              </span>
            </motion.li>
          ))}
        </motion.ol>
      </div>

      {/* timer */}
      <div className="card flex flex-col items-center justify-center gap-5 p-6 text-center">
        <p className="text-[13px] font-semibold uppercase tracking-[0.12em] text-muted">Rest timer</p>
        <TimerRing seconds={20} onComplete={onReady} />
        <p className="max-w-[200px] text-[13px] leading-relaxed text-muted">
          A short rest gives a more accurate reading. The full rest is 5 minutes.
        </p>
        <Button variant="secondary" size="md" full onClick={onReady} iconRight={<ArrowRight className="h-4 w-4" />}>
          Skip timer for demo
        </Button>
      </div>
    </motion.div>
  );
}

function RepeatPhase({
  recheck,
  stillElevated,
  onAnalyze,
}: {
  recheck: NonNullable<ReturnType<typeof useApp>["scenario"]["recheck"]>;
  stillElevated: boolean;
  onAnalyze: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease }}
      className="mt-6 space-y-6"
    >
      {/* repeated reading */}
      <div className="card overflow-hidden p-6">
        <div className="flex items-center gap-2.5">
          <RefreshCw className="h-4 w-4 text-signal-deep" />
          <p className="text-[13px] font-semibold uppercase tracking-[0.12em] text-muted">Repeated measurement</p>
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.45, ease }}
            className={cn(
              "rounded-2xl border px-5 py-4",
              stillElevated ? "border-concern/25 bg-concern-soft" : "border-stable/25 bg-stable-soft"
            )}
          >
            <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-muted">Repeated reading</p>
            <p className="tnum mt-1 text-[30px] font-extrabold leading-none tracking-tighter2 text-ink">
              {recheck.repeatedReading}
              <span className="ml-1.5 text-[14px] font-semibold text-muted">{recheck.unit}</span>
            </p>
          </motion.div>
          {recheck.repeatedSecondary && (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.45, ease }}
              className="rounded-2xl border border-line/80 bg-soft/40 px-5 py-4"
            >
              <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-muted">
                {recheck.repeatedSecondary.label}
              </p>
              <p className="tnum mt-1 text-[30px] font-extrabold leading-none tracking-tighter2 text-ink">
                {recheck.repeatedSecondary.value}
              </p>
            </motion.div>
          )}
        </div>
        <p
          className={cn(
            "mt-4 rounded-xl px-4 py-3 text-[13.5px] font-medium",
            stillElevated ? "bg-concern-soft text-concern" : "bg-stable-soft text-stable"
          )}
        >
          {stillElevated
            ? "Verified after repeat measurement — the reading remains elevated. CareSignal will now combine it with today’s journal."
            : "Verified after repeat measurement — the reading returned toward the usual range."}
        </p>
      </div>

      {/* red flags */}
      <div className="card p-6">
        <p className="text-[13px] font-semibold uppercase tracking-[0.12em] text-muted">Red-flag symptom check</p>
        <motion.div variants={staggerFast} initial="initial" animate="animate" className="mt-4 grid gap-2.5 sm:grid-cols-2">
          {recheck.redFlags.map((rf) => {
            const concerning = !["No", "None"].includes(rf.answer);
            return (
              <motion.div
                key={rf.label}
                variants={rise}
                className="flex items-center justify-between gap-3 rounded-2xl border border-line/70 bg-soft/40 px-4 py-3"
              >
                <span className="text-[14px] font-medium text-ink">{rf.label}</span>
                <span
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[12px] font-semibold",
                    concerning ? "bg-watch-soft text-watch" : "bg-stable-soft text-stable"
                  )}
                >
                  {!concerning && <Check className="h-3 w-3" />}
                  {rf.answer}
                </span>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      <div className="flex items-center justify-end">
        <Button size="lg" onClick={onAnalyze} iconRight={<ArrowRight className="h-[18px] w-[18px]" />}>
          Analyze with today’s journal
        </Button>
      </div>
    </motion.div>
  );
}
