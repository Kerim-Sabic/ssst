import { motion } from "framer-motion";
import { Activity, Footprints, HeartPulse, Scale } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { Slide } from "../Slide";
import { Kicker, UnderlineDraw, WordReveal } from "../pitchShared";
import { MetricCard } from "../MetricCard";
import { Counter, BPCounter } from "../Counter";
import { ease, revealUp, staggerParent } from "@/lib/pitchMotion";

type Tone = "green" | "amber" | "red";
interface Row {
  icon: LucideIcon;
  label: string;
  value: ReactNode;
  unit?: string;
  tone: Tone;
  delta?: string;
}

const B_DELAY = 0.45;
const T_DELAY = 0.95;

const baseline: Row[] = [
  { icon: Scale, label: "Weight", value: <Counter to={72.4} decimals={1} delay={B_DELAY} />, unit: "kg", tone: "green" },
  { icon: Activity, label: "Blood pressure", value: <BPCounter sys={135} dia={82} delay={B_DELAY} />, tone: "green" },
  { icon: HeartPulse, label: "Heart rate", value: <Counter to={78} delay={B_DELAY} />, unit: "bpm", tone: "green" },
  { icon: Footprints, label: "Walking", value: <Counter to={300} delay={B_DELAY} />, unit: "m", tone: "green" },
];

const today: Row[] = [
  { icon: Scale, label: "Weight", value: <Counter to={74.8} decimals={1} delay={T_DELAY} />, unit: "kg", tone: "red", delta: "+2.4 kg" },
  { icon: Activity, label: "BP (repeated)", value: <BPCounter sys={178} dia={112} delay={T_DELAY} />, tone: "red", delta: "verified" },
  { icon: HeartPulse, label: "Heart rate", value: <Counter to={104} delay={T_DELAY} />, unit: "bpm", tone: "amber", delta: "rising" },
  { icon: Footprints, label: "Walking", value: "Less", tone: "amber", delta: "reduced" },
];

export function Slide06Patient() {
  return (
    <Slide>
      <Kicker className="mb-4">Demo patient</Kicker>
      <WordReveal
        text="Amina’s normal changed before the crisis."
        className="max-w-3xl text-[clamp(28px,4.4vw,50px)] font-extrabold leading-[1.05] tracking-tighter2 text-navy"
      />
      <motion.p variants={revealUp} className="mt-3 text-[15px] font-medium text-muted">
        Amina Hadžić · 67 · Heart failure + hypertension · lives alone, daughter nearby
      </motion.p>

      <div className="mt-9 grid items-center gap-5 lg:grid-cols-[1fr_auto_1fr]">
        {/* baseline */}
        <motion.div variants={staggerParent}>
          <p className="mb-3 flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.14em] text-stable">
            <span className="h-1.5 w-1.5 rounded-full bg-stable" /> Usual baseline
          </p>
          <div className="grid grid-cols-2 gap-3">
            {baseline.map((m) => (
              <MetricCard key={m.label} {...m} />
            ))}
          </div>
        </motion.div>

        {/* connecting signal line with travelling pulse */}
        <div className="relative hidden h-28 w-20 lg:block">
          <svg viewBox="0 0 80 112" className="h-full w-full" fill="none" aria-hidden>
            <motion.path
              d="M2 56 H18 l6 -18 l6 36 l6 -46 l8 54 l6 -26 H78"
              stroke="#14B8A6"
              strokeWidth={2}
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.1, ease: "easeInOut", delay: 0.7 }}
            />
            <motion.circle
              r={3.2}
              fill="#0F766E"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 1, 0], cx: [2, 40, 78, 78], cy: [56, 38, 56, 56] }}
              transition={{ duration: 1.6, ease: "easeInOut", delay: 1.8, repeat: Infinity, repeatDelay: 1.4 }}
            />
          </svg>
        </div>

        {/* today */}
        <motion.div variants={staggerParent}>
          <p className="mb-3 flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.14em] text-concern">
            <span className="h-1.5 w-1.5 rounded-full bg-concern" /> Today
          </p>
          <div className="grid grid-cols-2 gap-3">
            {today.map((m) => (
              <MetricCard key={m.label} {...m} />
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ delay: 1.6, duration: 0.6, ease }}
        className="mt-9 inline-block"
      >
        <p className="text-[clamp(22px,3vw,34px)] font-extrabold tracking-tighter2 text-navy">
          Your normal matters more than <span className="text-signal-deep">normal.</span>
        </p>
        <UnderlineDraw className="mt-2 w-2/3" delay={2.05} />
      </motion.div>
    </Slide>
  );
}
