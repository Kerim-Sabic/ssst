import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check, Sparkles, Sunrise } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Badge } from "@/components/ui/Badge";
import { ScreenShell } from "@/components/ui/Bits";
import { useApp } from "@/lib/appContext";
import { heartFailureCheckIn } from "@/lib/checkin";
import { ease } from "@/lib/motion";
import { cn } from "@/lib/cn";

const toneClass = {
  green: "text-stable",
  amber: "text-watch",
  red: "text-concern",
} as const;

const toneSoft = {
  green: "bg-stable-soft border-stable/25",
  amber: "bg-watch-soft border-watch/30",
  red: "bg-concern-soft border-concern/30",
} as const;

export function CheckInScreen() {
  const { go } = useApp();
  const questions = heartFailureCheckIn;
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [input, setInput] = useState("");
  const [revealed, setRevealed] = useState(false); // showing feedback for current answer
  const advancing = useRef(false);

  const q = questions[index];
  const total = questions.length;

  useEffect(() => {
    setInput(q.kind === "choice" ? "" : q.demoValue);
    setRevealed(false);
    advancing.current = false;
  }, [index, q.kind, q.demoValue]);

  const commit = (value: string) => {
    if (advancing.current || !value.trim()) return;
    advancing.current = true;
    setAnswers((a) => ({ ...a, [q.id]: value }));
    setRevealed(true);

    if (q.triggersValidation) {
      window.setTimeout(() => go("validation"), 720);
      return;
    }
    window.setTimeout(() => {
      if (index + 1 < total) setIndex((i) => i + 1);
      else go("analysis");
    }, 950);
  };

  const progress = (index + (revealed ? 1 : 0)) / total;

  return (
    <ScreenShell>
      {/* heading */}
      <div className="mb-7 flex flex-wrap items-end justify-between gap-3">
        <div>
          <div className="mb-2 flex items-center gap-2 text-signal-deep">
            <Sunrise className="h-4 w-4" />
            <span className="label-eyebrow text-signal-deep">Morning check-in</span>
          </div>
          <h1 className="text-[30px] font-extrabold leading-tight tracking-tighter2 text-navy sm:text-[36px]">
            Good morning, Amina
          </h1>
          <p className="mt-2 max-w-xl text-[15.5px] leading-relaxed text-slate-600">
            Let’s complete your heart failure + hypertension check-in.
          </p>
        </div>
        <Badge tone="navy" className="tnum">
          Step {Math.min(index + 1, total)} of {total}
        </Badge>
      </div>

      <ProgressBar value={progress} className="mb-8" />

      <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        {/* question card */}
        <div className="card relative overflow-hidden p-6 sm:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={q.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4, ease }}
            >
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-signal-50 text-signal-deep">
                  <q.icon className="h-5 w-5" />
                </span>
                <span className="tnum text-[12px] font-semibold uppercase tracking-[0.14em] text-muted">
                  Question {index + 1}
                </span>
              </div>

              <h2 className="mt-5 text-balance text-[24px] font-bold leading-snug tracking-tightish text-ink sm:text-[27px]">
                {q.prompt}
              </h2>
              {q.helper && <p className="mt-2 text-[14px] leading-relaxed text-muted">{q.helper}</p>}

              {/* input / choices */}
              <div className="mt-7">
                {q.kind === "choice" ? (
                  <div className="grid gap-2.5 sm:grid-cols-2">
                    {q.choices!.map((c) => {
                      const isAnswer = answers[q.id] === c.value;
                      const suggested = c.value === q.demoValue;
                      return (
                        <motion.button
                          key={c.value}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => commit(c.value)}
                          disabled={revealed}
                          className={cn(
                            "group relative flex items-center justify-between gap-2 rounded-2xl border px-4 py-3.5 text-left text-[15px] font-medium transition-all",
                            isAnswer
                              ? "border-signal/50 bg-signal-50/70 ring-2 ring-signal/20 text-ink"
                              : "border-line/80 bg-surface text-slate-700 hover:border-slate-300 hover:bg-soft/50"
                          )}
                        >
                          <span>{c.value}</span>
                          {isAnswer ? (
                            <Check className="h-4 w-4 text-signal-deep" />
                          ) : (
                            suggested && (
                              <span className="rounded-md bg-soft px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-muted opacity-0 transition-opacity group-hover:opacity-100">
                                demo
                              </span>
                            )
                          )}
                        </motion.button>
                      );
                    })}
                  </div>
                ) : (
                  <div>
                    <div className="flex items-stretch gap-3">
                      <div className="relative flex-1">
                        <input
                          value={input}
                          onChange={(e) => setInput(e.target.value)}
                          onKeyDown={(e) => e.key === "Enter" && commit(input)}
                          disabled={revealed}
                          inputMode={q.kind === "bp" ? "text" : "decimal"}
                          className="h-[60px] w-full rounded-2xl border border-line/90 bg-soft/40 px-5 text-[24px] font-bold tracking-tightish text-ink tnum outline-none transition-colors focus:border-signal/50 focus:bg-surface disabled:opacity-70"
                          aria-label={q.prompt}
                        />
                        {q.unit && (
                          <span className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-[15px] font-semibold text-muted">
                            {q.unit}
                          </span>
                        )}
                      </div>
                      <Button
                        size="lg"
                        className="h-[60px] px-6"
                        onClick={() => commit(input)}
                        disabled={revealed}
                        iconRight={<ArrowRight className="h-[18px] w-[18px]" />}
                      >
                        Save
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              {/* feedback */}
              <AnimatePresence>
                {revealed && q.feedback && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: "auto" }}
                    className={cn(
                      "mt-5 flex items-start gap-2.5 rounded-2xl border px-4 py-3",
                      toneSoft[q.feedbackTone ?? "amber"]
                    )}
                  >
                    <Sparkles className={cn("mt-0.5 h-4 w-4 shrink-0", toneClass[q.feedbackTone ?? "amber"])} />
                    <p className="text-[14px] font-medium text-ink">{q.feedback}</p>
                  </motion.div>
                )}
                {revealed && q.triggersValidation && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-4 text-[13px] font-medium text-watch"
                  >
                    This reading is unusually high. Before we flag it, let’s repeat it correctly…
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* live context panel */}
        <ContextPanel answers={answers} currentId={q.id} />
      </div>
    </ScreenShell>
  );
}

function ContextPanel({ answers, currentId }: { answers: Record<string, string>; currentId: string }) {
  const rows = useMemo(
    () => [
      { label: "Baseline weight", value: "72.4 kg", static: true as const },
      { label: "Today’s weight", id: "weight", fallback: "—" },
      { label: "Diuretic", id: "diuretic", fallback: "—" },
      { label: "Breathing", id: "breathing", fallback: "—" },
      { label: "Leg swelling", id: "swelling", fallback: "—" },
      { label: "Cough lying down", id: "cough", fallback: "—" },
      { label: "Walking", id: "walking", fallback: "—" },
    ],
    []
  );

  return (
    <div className="card h-fit overflow-hidden lg:sticky lg:top-24">
      <div className="border-b border-line/70 bg-gradient-to-b from-soft/50 to-transparent px-5 py-4">
        <p className="text-[13px] font-bold tracking-tightish text-ink">Live context</p>
        <p className="text-[12px] text-muted">Compared with Amina’s usual baseline</p>
      </div>
      <div className="divide-y divide-line/70">
        {rows.map((r) => {
          const answered = "id" in r && r.id && answers[r.id];
          const isCurrent = "id" in r && r.id === currentId;
          return (
            <div key={r.label} className="flex items-center justify-between px-5 py-3">
              <span className="text-[13.5px] text-muted">{r.label}</span>
              <motion.span
                key={String(answered)}
                initial={answered ? { opacity: 0, x: 6 } : false}
                animate={{ opacity: 1, x: 0 }}
                className={cn(
                  "text-[13.5px] font-semibold tnum",
                  answered ? "text-ink" : isCurrent ? "text-signal-deep" : "text-slate-400"
                )}
              >
                {"static" in r && r.static
                  ? r.value
                  : answered
                  ? answers[(r as { id: string }).id]
                  : isCurrent
                  ? "answering…"
                  : (r as { fallback: string }).fallback}
              </motion.span>
            </div>
          );
        })}
        <div className="flex items-center justify-between px-5 py-3">
          <span className="text-[13.5px] text-muted">Blood pressure</span>
          <Badge tone="amber">pending validation</Badge>
        </div>
      </div>
      <div className="border-t border-line/70 px-5 py-3">
        <p className="tnum text-[11px] text-muted">Last updated today 08:42</p>
      </div>
    </div>
  );
}
