import { motion } from "framer-motion";
import {
  Activity,
  HeartHandshake,
  Microscope,
  ScanLine,
  ShieldCheck,
  Stethoscope,
  TriangleAlert,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Slide } from "../Slide";
import { Kicker, WordReveal } from "../pitchShared";
import { revealUp, staggerParent } from "@/lib/pitchMotion";

interface Principle {
  icon: LucideIcon;
  title: string;
  detail: string;
}

const principles: Principle[] = [
  {
    icon: Stethoscope,
    title: "Decision support, not diagnosis",
    detail: "Organizes warning signs and defers to clinicians. It never names a disease.",
  },
  {
    icon: ScanLine,
    title: "Measure Again Intelligence",
    detail: "Rejects measurement artefacts before escalating — fewer false alarms, less alarm fatigue.",
  },
  {
    icon: Activity,
    title: "Baseline + guideline aware",
    detail: "Compares to the patient’s own normal and accepted red flags, not generic thresholds alone.",
  },
  {
    icon: TriangleAlert,
    title: "Explicit red-flag escalation",
    detail: "Urgent-symptom checks route straight to “seek urgent help now.”",
  },
  {
    icon: HeartHandshake,
    title: "Human-in-the-loop",
    detail: "Patient, caregiver and clinician act — never autonomous, never changes medication.",
  },
  {
    icon: Microscope,
    title: "Validated before claims",
    detail: "Clinical advisory board and validation studies gate any diagnostic language.",
  },
];

const thresholds = [
  "Weight ↑ ≥ 2 kg / 3 days",
  "BP high — confirmed on repeat",
  "SpO₂ < 92%",
  "Glucose < 70 mg/dL",
];

export function SlideSafety() {
  return (
    <Slide>
      <Kicker className="mb-4">Medical safety</Kicker>
      <WordReveal
        text="Safe by design — it never plays doctor."
        highlight={["doctor."]}
        className="max-w-3xl text-[clamp(27px,4.2vw,48px)] font-extrabold leading-[1.06] tracking-tighter2 text-navy"
      />
      <motion.p variants={revealUp} className="mt-3 max-w-2xl text-[16px] leading-relaxed text-slate-600">
        The goal is to catch deterioration earlier <span className="font-semibold text-ink">without crying
        wolf</span> — and to fail safe when uncertain.
      </motion.p>

      <motion.div variants={staggerParent} className="mt-7 grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
        {principles.map((p) => (
          <motion.div
            key={p.title}
            variants={revealUp}
            className="rounded-2xl border border-line/80 bg-surface/90 p-4 shadow-soft backdrop-blur-sm"
          >
            <div className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-signal-50 text-signal-deep">
                <p.icon className="h-[18px] w-[18px]" />
              </span>
              <p className="text-[14.5px] font-bold leading-tight tracking-tightish text-ink">{p.title}</p>
            </div>
            <p className="mt-2.5 text-[13px] leading-relaxed text-muted">{p.detail}</p>
          </motion.div>
        ))}
      </motion.div>

      <motion.div variants={revealUp} className="mt-6 grid gap-4 lg:grid-cols-[0.55fr_0.45fr] lg:items-center">
        <div className="flex items-start gap-3 rounded-3xl border border-line/80 bg-soft/50 px-5 py-4">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-signal-50 text-signal-deep">
            <ShieldCheck className="h-5 w-5" />
          </span>
          <p className="text-[13.5px] leading-relaxed text-slate-700">
            <span className="font-semibold text-ink">CareSignal does not diagnose.</span> It organizes warning
            signs, suggests when to contact a professional, and says to seek urgent help if severe symptoms
            appear. When uncertain, it escalates conservatively.
          </p>
        </div>
        <div className="rounded-3xl border border-navy/15 bg-navy px-5 py-4 text-white">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/60">Guideline-anchored flags</p>
          <div className="mt-2.5 flex flex-wrap gap-2">
            {thresholds.map((t) => (
              <span key={t} className="rounded-lg bg-white/10 px-2.5 py-1 text-[12px] font-semibold text-white/90">
                {t}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </Slide>
  );
}
