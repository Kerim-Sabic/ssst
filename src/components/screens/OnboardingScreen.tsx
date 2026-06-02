import { motion } from "framer-motion";
import {
  ArrowRight,
  CalendarClock,
  Check,
  Gauge,
  HeartHandshake,
  Home,
  Scale,
  Stethoscope,
  User,
  Wind,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ScreenShell, Eyebrow, JourneySteps } from "@/components/ui/Bits";
import { useApp } from "@/lib/appContext";
import { rise, stagger } from "@/lib/motion";

interface FieldDef {
  icon: LucideIcon;
  label: string;
  value: string;
  hint?: string;
}

const fields: FieldDef[] = [
  { icon: User, label: "Patient", value: "Amina Hadžić", hint: "Age 67" },
  { icon: Home, label: "Living situation", value: "Lives alone", hint: "Daughter nearby" },
  { icon: HeartHandshake, label: "Caregiver connected", value: "Lejla", hint: "Daughter" },
  { icon: Stethoscope, label: "Summary destination", value: "Cardiology clinic", hint: "Doctor-ready" },
  { icon: CalendarClock, label: "Preferred check-in", value: "Morning", hint: "08:00 reminder" },
];

const devices = [
  { icon: Gauge, label: "BP monitor" },
  { icon: Scale, label: "Weight scale" },
  { icon: Wind, label: "Pulse oximeter" },
];

export function OnboardingScreen() {
  const { go } = useApp();

  return (
    <ScreenShell narrow>
      <JourneySteps active={0} />
      <Eyebrow>Personalize</Eyebrow>
      <h1 className="text-balance text-[32px] font-extrabold leading-tight tracking-tighter2 text-navy sm:text-[38px]">
        Set up Amina’s care journal
      </h1>
      <p className="mt-3 max-w-xl text-[16px] leading-relaxed text-slate-600">
        CareSignal tailors the daily journal to the patient, their caregiver, and the clinic that
        receives the summary. Everything below is prefilled for the demo.
      </p>

      <motion.div variants={stagger} initial="initial" animate="animate" className="mt-8 space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          {fields.map((f) => (
            <motion.div
              key={f.label}
              variants={rise}
              className="group relative overflow-hidden rounded-2xl border border-line/80 bg-surface p-4 shadow-soft transition-all hover:border-signal/30 hover:shadow-card"
            >
              <span className="pointer-events-none absolute inset-y-0 left-0 w-[3px] origin-top scale-y-0 bg-gradient-to-b from-signal to-signal-deep transition-transform duration-300 group-hover:scale-y-100" />
              <div className="flex items-start gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-signal-50 text-signal-deep">
                  <f.icon className="h-[18px] w-[18px]" />
                </span>
                <div className="min-w-0">
                  <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-muted">
                    {f.label}
                  </p>
                  <p className="mt-0.5 text-[16px] font-bold tracking-tightish text-ink">{f.value}</p>
                  {f.hint && <p className="text-[13px] text-muted">{f.hint}</p>}
                </div>
              </div>
            </motion.div>
          ))}

          {/* devices card spans */}
          <motion.div
            variants={rise}
            className="rounded-2xl border border-line/80 bg-surface p-4 shadow-soft"
          >
            <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-muted">
              Connected devices
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {devices.map((d) => (
                <span
                  key={d.label}
                  className="inline-flex items-center gap-2 rounded-xl border border-line/80 bg-soft/60 px-3 py-2 text-[13px] font-medium text-slate-700"
                >
                  <d.icon className="h-4 w-4 text-signal-deep" />
                  {d.label}
                  <Check className="h-3.5 w-3.5 text-stable" />
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>

      <div className="mt-9 flex items-center justify-between gap-4">
        <button onClick={() => go("landing")} className="text-sm font-medium text-muted hover:text-ink">
          Back
        </button>
        <Button size="lg" onClick={() => go("conditions")} iconRight={<ArrowRight className="h-[18px] w-[18px]" />}>
          Continue
        </Button>
      </div>
    </ScreenShell>
  );
}
