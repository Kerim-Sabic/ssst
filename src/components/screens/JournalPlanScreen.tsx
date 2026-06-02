import { motion } from "framer-motion";
import {
  Activity,
  ArrowRight,
  Check,
  Footprints,
  HeartPulse,
  Pill,
  Scale,
  ShieldAlert,
  Stethoscope,
  UserCheck,
  Wind,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ScreenShell, Eyebrow, JourneySteps } from "@/components/ui/Bits";
import { useApp } from "@/lib/appContext";
import { ease, rise, stagger, staggerFast } from "@/lib/motion";

interface PlanItem {
  icon: LucideIcon;
  label: string;
}

const required: PlanItem[] = [
  { icon: Scale, label: "Weight" },
  { icon: Activity, label: "Blood pressure" },
  { icon: HeartPulse, label: "Heart rate" },
  { icon: Pill, label: "Diuretic taken?" },
  { icon: Wind, label: "Shortness of breath" },
  { icon: HeartPulse, label: "Leg swelling" },
  { icon: Stethoscope, label: "Cough while lying down" },
  { icon: Footprints, label: "Walking ability" },
  { icon: ShieldAlert, label: "Chest-pain red-flag check" },
  { icon: ShieldAlert, label: "Dizziness / fainting check" },
];

const views = [
  {
    icon: UserCheck,
    title: "Patient view",
    desc: "Simple guided questions, one at a time, in plain language.",
    accent: "bg-signal-50 text-signal-deep",
  },
  {
    icon: HeartPulse,
    title: "Caregiver view",
    desc: "Clear alerts and next steps when a pattern changes.",
    accent: "bg-navy-50 text-navy",
  },
  {
    icon: Stethoscope,
    title: "Doctor view",
    desc: "A structured, scannable 7-day summary, ready to share.",
    accent: "bg-stable-soft text-stable",
  },
];

export function JournalPlanScreen() {
  const { go } = useApp();

  return (
    <ScreenShell>
      <JourneySteps active={2} />
      <Eyebrow>Personalized plan</Eyebrow>
      <h1 className="max-w-3xl text-balance text-[32px] font-extrabold leading-tight tracking-tighter2 text-navy sm:text-[38px]">
        Today’s journal is personalized for Amina
      </h1>
      <p className="mt-3 max-w-2xl text-[16px] leading-relaxed text-slate-600">
        Because Amina selected heart failure and hypertension, CareSignal focuses on fluid retention, blood
        pressure, medication adherence, breathing, and daily function.
      </p>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        {/* checklist */}
        <div className="card p-6">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-[13px] font-semibold uppercase tracking-[0.12em] text-muted">Required today</p>
            <span className="tnum text-[12px] font-medium text-muted">{required.length} items</span>
          </div>
          <motion.ul
            variants={staggerFast}
            initial="initial"
            animate="animate"
            className="grid gap-2.5 sm:grid-cols-2"
          >
            {required.map((item) => (
              <motion.li
                key={item.label}
                variants={rise}
                className="flex items-center gap-3 rounded-xl border border-line/70 bg-soft/40 px-3 py-2.5"
              >
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-surface text-signal-deep shadow-soft">
                  <item.icon className="h-4 w-4" />
                </span>
                <span className="text-[14px] font-medium text-ink">{item.label}</span>
                <Check className="ml-auto h-4 w-4 text-stable/70" />
              </motion.li>
            ))}
          </motion.ul>
          <p className="mt-4 rounded-xl bg-signal-50/60 px-4 py-3 text-[13px] leading-relaxed text-signal-deep">
            CareSignal does not ask every possible question. It asks the questions that matter for this
            patient’s conditions and recent trends.
          </p>
        </div>

        {/* three views */}
        <motion.div variants={stagger} initial="initial" animate="animate" className="flex flex-col gap-4">
          {views.map((v) => (
            <motion.div
              key={v.title}
              variants={rise}
              className="card-soft flex items-start gap-4 p-5 transition-all hover:shadow-card"
            >
              <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-2xl ${v.accent}`}>
                <v.icon className="h-5 w-5" />
              </span>
              <div>
                <p className="text-[15px] font-bold tracking-tightish text-ink">{v.title}</p>
                <p className="mt-1 text-[13.5px] leading-relaxed text-muted">{v.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease, delay: 0.5 }}
        className="mt-9 flex items-center justify-between gap-4"
      >
        <button onClick={() => go("conditions")} className="text-sm font-medium text-muted hover:text-ink">
          Back
        </button>
        <motion.div animate={{ scale: [1, 1.02, 1] }} transition={{ duration: 1.4, delay: 0.8, ease }}>
          <Button size="lg" onClick={() => go("checkin")} iconRight={<ArrowRight className="h-[18px] w-[18px]" />}>
            Start today’s check-in
          </Button>
        </motion.div>
      </motion.div>
    </ScreenShell>
  );
}
