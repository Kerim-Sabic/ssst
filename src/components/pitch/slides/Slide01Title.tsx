import { motion, useReducedMotion } from "framer-motion";
import { Activity, ArrowRight, FileText, Scale } from "lucide-react";
import { Slide } from "../Slide";
import { SignalMark, WordReveal, Kicker } from "../pitchShared";
import { MetricCard } from "../MetricCard";
import { Counter, BPCounter } from "../Counter";
import { EcgStrip } from "@/components/ui/EcgStrip";
import { StatusPill } from "@/components/ui/Badge";
import { premiumCard, revealUp, staggerTight } from "@/lib/pitchMotion";

export function Slide01Title() {
  const reduce = useReducedMotion();
  return (
    <Slide className="lg:grid lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-12">
      <div>
        <motion.div variants={revealUp}>
          <SignalMark size={84} className="mb-7" />
        </motion.div>

        <Kicker className="mb-4">Demo prototype · keynote</Kicker>

        <WordReveal
          text="CareSignal AI"
          highlight={["AI"]}
          className="text-[clamp(44px,7vw,76px)] font-extrabold leading-[1.02] tracking-tighter2 text-navy"
        />

        <motion.p
          variants={revealUp}
          className="mt-5 max-w-xl text-[clamp(16px,2vw,20px)] leading-relaxed text-slate-600"
        >
          Adaptive chronic-disease journaling with measurement validation and early-warning escalation.
        </motion.p>

        <motion.p variants={revealUp} className="mt-4 text-[14px] font-medium text-muted">
          Built for patients, caregivers, and doctors.
        </motion.p>

        <motion.div
          variants={revealUp}
          className="mt-7 inline-flex items-center gap-2 rounded-full border border-line/80 bg-surface/80 px-4 py-2 text-[13px] font-semibold text-slate-700 shadow-soft backdrop-blur-sm"
        >
          Press <kbd className="rounded bg-soft px-1.5 py-0.5 text-[11px] font-bold text-navy">→</kbd> to begin
          <ArrowRight className="h-4 w-4 text-signal-deep" />
        </motion.div>
      </div>

      {/* floating app preview */}
      <motion.div
        variants={premiumCard}
        className="mt-12 lg:mt-0"
        style={{ perspective: 1200 }}
      >
        <motion.div
          animate={reduce ? undefined : { y: [0, -12, 0], rotateX: [0.5, -0.5, 0.5], rotateY: [-1.5, 1.5, -1.5] }}
          transition={{ duration: 9, ease: "easeInOut", repeat: Infinity }}
          style={{ transformStyle: "preserve-3d" }}
          className="relative mx-auto max-w-md overflow-hidden rounded-[28px] border border-line/80 bg-surface/95 shadow-lift backdrop-blur-sm"
        >
          {/* header */}
          <div className="flex items-center justify-between border-b border-line/70 bg-gradient-to-b from-soft/50 to-transparent px-5 py-4">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-navy text-[15px] font-bold text-white">AH</span>
              <div className="leading-tight">
                <p className="text-[15px] font-bold tracking-tightish text-ink">Amina Hadžić</p>
                <p className="text-[12px] text-muted">Heart failure + hypertension</p>
              </div>
            </div>
            <StatusPill tone="amber" label="Watch" />
          </div>

          {/* metrics */}
          <motion.div variants={staggerTight} className="grid grid-cols-2 gap-3 p-5">
            <MetricCard
              label="Blood pressure"
              value={<BPCounter sys={168} dia={96} delay={0.6} />}
              tone="amber"
              icon={Activity}
            />
            <MetricCard
              label="Weight trend"
              value={<Counter to={1.1} prefix="+" decimals={1} delay={0.6} />}
              unit="kg"
              tone="amber"
              icon={Scale}
              delta="vs baseline"
            />
          </motion.div>

          {/* ECG signal strip */}
          <div className="mx-5 mb-4">
            <div className="mb-1.5 flex items-center justify-between">
              <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">Sinus rhythm · 72 bpm</span>
              <span className="text-[11px] font-semibold text-signal-deep">stable</span>
            </div>
            <EcgStrip
              variant="normal"
              beats={4}
              surface="navy"
              height={58}
              glow
              pulse
              pulseDelay={1.2}
              className="border border-line/15"
            />
          </div>

          <div className="mx-5 mb-5 flex items-center justify-between rounded-2xl border border-stable/25 bg-stable-soft px-4 py-3">
            <span className="flex items-center gap-2 text-[13px] font-semibold text-ink">
              <FileText className="h-4 w-4 text-stable" /> Doctor summary ready
            </span>
            <span className="tnum text-[11px] text-muted">08:42</span>
          </div>
        </motion.div>
      </motion.div>
    </Slide>
  );
}
