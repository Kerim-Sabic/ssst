import { motion } from "framer-motion";
import {
  Activity,
  Droplet,
  Footprints,
  Pill,
  Scale,
  Stethoscope,
  ThermometerSnowflake,
  Wind,
  Waves,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Slide } from "../Slide";
import { Kicker, UnderlineDraw, WordReveal } from "../pitchShared";
import { ease } from "@/lib/pitchMotion";
import { cn } from "@/lib/cn";

interface Chip {
  icon: LucideIcon;
  label: string;
  value: string;
  /** entrance offset (px) and settled rotation / vertical jitter (deg / px) */
  fromX: number;
  fromY: number;
  rot: number;
  jitterY: number;
  tone?: "amber" | "red" | "muted";
}

const chips: Chip[] = [
  { icon: Activity, label: "Blood pressure", value: "148 / 92", fromX: -140, fromY: -40, rot: -4, jitterY: -5, tone: "amber" },
  { icon: Droplet, label: "Glucose", value: "9.4 mmol/L", fromX: 150, fromY: -60, rot: 3, jitterY: 4, tone: "amber" },
  { icon: Scale, label: "Weight", value: "74.8 kg", fromX: -160, fromY: 30, rot: 4, jitterY: 6, tone: "muted" },
  { icon: Wind, label: "SpO₂", value: "92%", fromX: 150, fromY: 50, rot: -5, jitterY: -4, tone: "red" },
  { icon: Pill, label: "Medication", value: "2 doses due", fromX: -120, fromY: 90, rot: 5, jitterY: 5, tone: "red" },
  { icon: Waves, label: "Fatigue", value: "worse", fromX: 150, fromY: 10, rot: -3, jitterY: -6, tone: "muted" },
  { icon: Stethoscope, label: "Cough", value: "at night", fromX: -150, fromY: -90, rot: 6, jitterY: 3, tone: "muted" },
  { icon: ThermometerSnowflake, label: "Swelling", value: "mild", fromX: 130, fromY: 100, rot: -4, jitterY: 5, tone: "amber" },
  { icon: Footprints, label: "Dizziness", value: "today", fromX: 40, fromY: -120, rot: 7, jitterY: -3, tone: "muted" },
];

const toneStyles = {
  amber: "text-watch bg-watch-soft",
  red: "text-concern bg-concern-soft",
  muted: "text-slate-500 bg-soft",
};

const dontKnow = [
  "which measurements matter",
  "whether a value is real or wrong",
  "when symptoms are worsening",
  "what to tell a caregiver",
  "what to tell a doctor",
];

export function Slide02Problem() {
  return (
    <Slide className="lg:grid lg:grid-cols-[1fr_0.92fr] lg:items-center lg:gap-12">
      <div>
        <Kicker className="mb-4">The problem</Kicker>
        <WordReveal
          text="Chronic patients are asked to manage too much alone."
          className="max-w-2xl text-[clamp(30px,4.4vw,50px)] font-extrabold leading-[1.06] tracking-tighter2 text-navy"
        />

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5, ease }}
          className="mt-6 max-w-lg text-[16px] leading-relaxed text-slate-600"
        >
          Every day they track symptoms, vitals, medication, and warning signs. They often don’t know:
        </motion.p>

        <ul className="mt-4 space-y-2">
          {dontKnow.map((d, i) => (
            <motion.li
              key={d}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 + i * 0.1, duration: 0.45, ease }}
              className="flex items-center gap-3 text-[16px] text-ink"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-watch" />
              {d}
            </motion.li>
          ))}
        </ul>

        <motion.div
          initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ delay: 1.45, duration: 0.55, ease }}
          className="mt-8 inline-block"
        >
          <p className="text-[clamp(22px,3vw,32px)] font-extrabold tracking-tighter2 text-navy">
            Daily data exists. <span className="text-signal-deep">Clear action does not.</span>
          </p>
          <UnderlineDraw className="mt-2 w-3/4" delay={1.9} />
        </motion.div>
      </div>

      {/* scattered data cluster — controlled chaos, no overlap */}
      <div className="mt-12 flex flex-wrap items-center justify-center gap-3 lg:mt-0 lg:max-w-md lg:justify-self-end">
        {chips.map((chip, i) => (
          <motion.div
            key={chip.label}
            initial={{ opacity: 0, x: chip.fromX, y: chip.fromY, rotate: chip.rot * 2.2, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, y: chip.jitterY, rotate: chip.rot, scale: 1 }}
            transition={{ delay: 0.25 + i * 0.075, duration: 0.6, ease }}
            whileHover={{ rotate: 0, y: chip.jitterY - 4, scale: 1.04, zIndex: 10 }}
            className="flex w-[150px] items-center gap-2.5 rounded-2xl border border-line/80 bg-surface/95 px-3.5 py-2.5 shadow-card backdrop-blur-sm"
          >
            <span className={cn("grid h-8 w-8 shrink-0 place-items-center rounded-lg", toneStyles[chip.tone ?? "muted"])}>
              <chip.icon className="h-4 w-4" />
            </span>
            <div className="min-w-0 leading-tight">
              <p className="truncate text-[12px] font-semibold text-ink">{chip.label}</p>
              <p className="tnum truncate text-[11px] text-muted">{chip.value}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </Slide>
  );
}
