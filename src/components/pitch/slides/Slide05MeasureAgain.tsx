import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Armchair, Check, HeartPulse, MicOff, RefreshCw, RotateCcw, Ruler, Timer } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useState } from "react";
import { Slide } from "../Slide";
import { Kicker } from "../pitchShared";
import { BPCounter } from "../Counter";
import { useBuild } from "../buildContext";
import { ease, springSnappy } from "@/lib/pitchMotion";
import { cn } from "@/lib/cn";

const instructions: { icon: LucideIcon; text: string }[] = [
  { icon: Timer, text: "Rest 5 minutes" },
  { icon: Armchair, text: "Feet flat, back supported" },
  { icon: Ruler, text: "Cuff on bare skin, arm at heart level" },
  { icon: MicOff, text: "Do not talk" },
  { icon: RefreshCw, text: "Measure again" },
];

/** phases via build step: 0 flagged · 1 resting+instructions · 2 verifying · 3 confirmed */
export function Slide05MeasureAgain() {
  const reduce = useReducedMotion();
  const { step, set } = useBuild();
  const [replay, setReplay] = useState(0);
  const phase = step;

  const doReplay = () => {
    setReplay((r) => r + 1);
    set(0);
  };

  return (
    <Slide>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <Kicker className="mb-4">Signature feature · press → to run</Kicker>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease }}
            className="text-[clamp(32px,5vw,58px)] font-extrabold leading-[1.02] tracking-tighter2 text-navy"
          >
            Measure Again <span className="text-signal-deep">Intelligence</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease, delay: 0.1 }}
            className="mt-3 text-[clamp(16px,2vw,20px)] text-slate-600"
          >
            CareSignal does not blindly accept abnormal values.
          </motion.p>
        </div>

        <motion.button
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={doReplay}
          className="inline-flex h-11 items-center gap-2 rounded-2xl border border-line/80 bg-surface/90 px-5 text-[14px] font-semibold text-navy shadow-soft backdrop-blur-sm transition-colors hover:border-signal/40"
        >
          <RotateCcw className="h-4 w-4 text-signal-deep" /> Replay
        </motion.button>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-stretch">
        {/* flagged reading → verified */}
        <div className="flex flex-col gap-4">
          <motion.div
            key={`flag-${replay}`}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={reduce ? { opacity: 1, scale: 1 } : { opacity: 1, scale: 1, x: [0, -8, 8, -5, 5, 0] }}
            transition={{
              opacity: { duration: 0.45, ease },
              scale: { duration: 0.45, ease },
              x: { duration: 0.5, ease, delay: 0.9 },
            }}
            className={cn(
              "relative overflow-hidden rounded-3xl border px-7 py-6 shadow-card transition-colors duration-500",
              phase >= 1 ? "border-line/80 bg-surface/90" : "border-watch/30 bg-watch-soft"
            )}
          >
            {!reduce && (
              <motion.div
                key={`sweep-${replay}`}
                className="pointer-events-none absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-signal/35 to-transparent"
                initial={{ x: "-120%" }}
                animate={{ x: "320%" }}
                transition={{ duration: 1.1, ease: "easeInOut", delay: 1.4 }}
              />
            )}
            <p className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.14em] text-watch">
              BP entered
              {phase >= 1 && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="rounded-md bg-watch/15 px-1.5 py-0.5 text-[10px] tracking-normal"
                >
                  unverified
                </motion.span>
              )}
            </p>
            <p className="tnum mt-1 text-[clamp(44px,7vw,64px)] font-extrabold leading-none tracking-tighter2 text-ink">
              <BPCounter key={`bp1-${replay}`} sys={184} dia={118} delay={0.2} duration={0.9} />
              <span className="ml-2 text-[18px] font-semibold text-muted">mmHg</span>
            </p>
            <motion.p
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.5 }}
              className="mt-3 text-[15px] font-semibold text-signal-deep"
            >
              “Let’s make sure this reading is real.”
            </motion.p>
          </motion.div>

          {/* repeated reading */}
          <AnimatePresence>
            {phase >= 2 && (
              <motion.div
                key={`repeat-${replay}`}
                initial={{ opacity: 0, y: 22, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={springSnappy}
                className="relative flex items-center justify-between overflow-hidden rounded-3xl border border-concern/30 bg-surface/95 px-7 py-6 shadow-card backdrop-blur-sm"
              >
                {phase >= 3 && (
                  <motion.span
                    className="pointer-events-none absolute inset-0 -z-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 1.4 }}
                    style={{ boxShadow: "inset 0 0 60px rgba(239,68,68,0.15)" }}
                  />
                )}
                <div>
                  <p className="flex items-center gap-1.5 text-[12px] font-semibold uppercase tracking-[0.14em] text-muted">
                    <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ ...springSnappy, delay: 0.3 }}>
                      <Check className="h-3.5 w-3.5 text-stable" />
                    </motion.span>
                    Verified after repeat
                  </p>
                  <p className="tnum mt-1 text-[clamp(36px,5vw,52px)] font-extrabold leading-none tracking-tighter2 text-concern">
                    <BPCounter key={`bp2-${replay}-${phase >= 2}`} sys={178} dia={112} delay={0.1} duration={0.9} />
                  </p>
                </div>
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-concern-soft text-concern">
                  <HeartPulse className="h-6 w-6" />
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* timer ring + instructions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6, ease }}
          className="rounded-3xl border border-line/80 bg-surface/95 p-6 shadow-card backdrop-blur-sm"
        >
          <div className="flex items-center gap-5">
            <RestRing key={`ring-${replay}`} active={phase >= 1} />
            <div>
              <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-muted">Before re-measuring</p>
              <p className="text-[18px] font-bold tracking-tightish text-ink">Repeat it correctly</p>
              <p className="mt-1 text-[13px] leading-snug text-muted">A short rest gives a more accurate reading.</p>
            </div>
          </div>
          <ul className="mt-5 space-y-2">
            {instructions.map((ins, i) => (
              <motion.li
                key={`${ins.text}-${replay}`}
                initial={{ opacity: 0, x: 16 }}
                animate={phase >= 1 ? { opacity: 1, x: 0 } : { opacity: 0, x: 16 }}
                transition={{ delay: phase >= 1 ? i * 0.14 : 0, duration: 0.42, ease }}
                className="flex items-center gap-3 rounded-2xl border border-line/70 bg-soft/40 px-4 py-2.5"
              >
                <span className="grid h-8 w-8 place-items-center rounded-lg bg-signal-50 text-signal-deep">
                  <ins.icon className="h-4 w-4" />
                </span>
                <span className="text-[14.5px] font-medium text-ink">{ins.text}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* live status line */}
      <div className="mt-6 flex items-center gap-2.5">
        <span className="relative flex h-2 w-2">
          <span className={cn("absolute inline-flex h-full w-full rounded-full opacity-60", phase >= 3 ? "bg-concern" : "bg-signal", phase < 3 && "animate-ping")} />
          <span className={cn("relative inline-flex h-2 w-2 rounded-full", phase >= 3 ? "bg-concern" : "bg-signal")} />
        </span>
        <AnimatePresence mode="wait">
          <motion.span
            key={phase}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.3 }}
            className="text-[13.5px] font-medium text-slate-600"
          >
            {phase === 0 && "Abnormal reading flagged — not escalating yet. Press → to coach a repeat."}
            {phase === 1 && "Coaching a correct re-measurement…"}
            {phase === 2 && "Re-measuring under correct conditions…"}
            {phase >= 3 && "Still elevated after repeat — now combine with today’s journal."}
          </motion.span>
        </AnimatePresence>
      </div>
    </Slide>
  );
}

function RestRing({ active }: { active: boolean }) {
  const reduce = useReducedMotion();
  const R = 34;
  const C = 2 * Math.PI * R;
  return (
    <div className="relative grid h-24 w-24 shrink-0 place-items-center">
      <svg viewBox="0 0 88 88" className="h-24 w-24 -rotate-90">
        <circle cx="44" cy="44" r={R} fill="none" stroke="#E2E8F0" strokeWidth={7} />
        <motion.circle
          cx="44"
          cy="44"
          r={R}
          fill="none"
          stroke="url(#restRing)"
          strokeWidth={7}
          strokeLinecap="round"
          strokeDasharray={C}
          initial={{ strokeDashoffset: C }}
          animate={{ strokeDashoffset: active ? 0 : C }}
          transition={{ duration: reduce ? 0 : 2.4, ease: "easeInOut" }}
        />
        <defs>
          <linearGradient id="restRing" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#14B8A6" />
            <stop offset="100%" stopColor="#0F766E" />
          </linearGradient>
        </defs>
      </svg>
      <Timer className="absolute h-6 w-6 text-signal-deep" />
    </div>
  );
}
