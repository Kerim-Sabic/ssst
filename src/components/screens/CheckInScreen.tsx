import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle, ArrowRight, Check, Sparkles, Sunrise } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Badge } from "@/components/ui/Badge";
import { ScreenShell } from "@/components/ui/Bits";
import { useApp } from "@/lib/appContext";
import { buildCheckIn } from "@/lib/checkin";
import {
  validateBloodPressure,
  validateGlucose,
  validateSpO2,
  validateWeightChange,
} from "@/lib/validation";
import type { ValidationResult } from "@/lib/types";
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

type Notice = { tone: "amber" | "red"; message: string } | null;

function validateMeasurement(id: string, kind: string, value: string): ValidationResult | null {
  if (kind === "bp") return validateBloodPressure(value);
  if (id === "weight") return validateWeightChange(parseFloat(value), 72.4);
  if (id === "glucose") return validateGlucose(parseFloat(value), "mg/dL");
  if (id === "spo2") return validateSpO2(parseFloat(value));
  return null;
}

export function CheckInScreen() {
  const { go, selectedConditions } = useApp();
  const questions = useMemo(() => buildCheckIn(selectedConditions), [selectedConditions]);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [input, setInput] = useState("");
  const [revealed, setRevealed] = useState(false);
  const [notice, setNotice] = useState<Notice>(null);
  const advancing = useRef(false);

  const q = questions[Math.min(index, questions.length - 1)];
  const total = questions.length;

  useEffect(() => {
    setInput(q.kind === "choice" ? "" : q.demoValue);
    setRevealed(false);
    setNotice(null);
    advancing.current = false;
  }, [index, q.kind, q.demoValue]);

  const proceed = () => {
    if (index + 1 < total) setIndex((i) => i + 1);
    else go("analysis");
  };

  const commit = (value: string) => {
    if (advancing.current || !value.trim()) return;

    // live measurement validation ("Measure Again Intelligence")
    if (q.kind === "bp" || q.kind === "number") {
      const res = validateMeasurement(q.id, q.kind, value);
      if (res && res.verdict === "impossible") {
        setNotice({ tone: "red", message: res.message });
        return; // block — let the patient correct it
      }

      advancing.current = true;
      setAnswers((a) => ({ ...a, [q.id]: value }));
      setRevealed(true);

      // BP triggers the full Measure-Again screen only when genuinely suspicious
      if (q.triggersValidation) {
        if (res && res.verdict === "suspicious") {
          window.setTimeout(() => go("validation"), 720);
        } else {
          window.setTimeout(proceed, 950);
        }
        return;
      }

      // other vitals: surface coaching inline, then continue
      if (res && res.verdict === "suspicious") {
        setNotice({ tone: "amber", message: res.message });
        window.setTimeout(proceed, 1500);
      } else {
        window.setTimeout(proceed, 950);
      }
      return;
    }

    // choice questions
    advancing.current = true;
    setAnswers((a) => ({ ...a, [q.id]: value }));
    setRevealed(true);
    window.setTimeout(proceed, 950);
  };

  const progress = (index + (revealed ? 1 : 0)) / total;

  return (
    <ScreenShell>
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
            Let’s complete your personalized check-in.
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
                  <div className="flex items-stretch gap-3">
                    <div className="relative flex-1">
                      <input
                        value={input}
                        onChange={(e) => {
                          setInput(e.target.value);
                          if (notice) setNotice(null);
                        }}
                        onKeyDown={(e) => e.key === "Enter" && commit(input)}
                        disabled={revealed}
                        inputMode={q.kind === "bp" ? "text" : "decimal"}
                        className={cn(
                          "h-[60px] w-full rounded-2xl border bg-soft/40 px-5 text-[24px] font-bold tracking-tightish text-ink tnum outline-none transition-colors focus:bg-surface disabled:opacity-70",
                          notice?.tone === "red" ? "border-concern/60 focus:border-concern" : "border-line/90 focus:border-signal/50"
                        )}
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
                )}
              </div>

              {/* live validation notice (impossible / suspicious) */}
              <AnimatePresence>
                {notice && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className={cn(
                      "mt-5 flex items-start gap-2.5 rounded-2xl border px-4 py-3",
                      toneSoft[notice.tone]
                    )}
                  >
                    <AlertTriangle className={cn("mt-0.5 h-4 w-4 shrink-0", toneClass[notice.tone])} />
                    <p className="text-[13.5px] font-medium leading-relaxed text-ink">{notice.message}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* baseline / static feedback */}
              <AnimatePresence>
                {revealed && q.feedback && !notice && (
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
