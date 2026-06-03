import { motion } from "framer-motion";
import { Bluetooth, Building2, FlaskConical, Rocket, Smartphone } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Slide } from "../Slide";
import { Kicker, WordReveal } from "../pitchShared";
import { ease, revealUp, staggerParent } from "@/lib/pitchMotion";

interface Milestone {
  month: string;
  icon: LucideIcon;
  title: string;
  items: string[];
}

const milestones: Milestone[] = [
  {
    month: "Month 1",
    icon: Bluetooth,
    title: "Foundations",
    items: [
      "Secure backend: auth + encrypted store",
      "Real device pairing — BP, scale, oximeter (BLE)",
      "Clinician-reviewed thresholds",
      "Accessibility + localization pass",
    ],
  },
  {
    month: "Month 2",
    icon: Building2,
    title: "Close the circle",
    items: [
      "Caregiver app + real push / SMS alerts",
      "Doctor portal — FHIR + PDF export",
      "On-device validation tuning",
      "Pilot with one chronic-care clinic",
    ],
  },
  {
    month: "Month 3",
    icon: FlaskConical,
    title: "Prove & ship",
    items: [
      "Retrospective + small prospective validation",
      "Security review · DPA / GDPR sign-off",
      "Closed beta as an installable PWA",
      "Feedback loop with patients & clinicians",
    ],
  },
];

const patientGets = [
  { icon: Smartphone, label: "Installable app (PWA → iOS / Android)" },
  { icon: Rocket, label: "Caregiver invites + clinic onboarding" },
];

export function SlideRoadmap() {
  return (
    <Slide>
      <Kicker className="mb-4">Implementation roadmap</Kicker>
      <WordReveal
        text="From prototype to patients in 90 days."
        highlight={["days."]}
        className="max-w-3xl text-[clamp(28px,4.4vw,50px)] font-extrabold leading-[1.05] tracking-tighter2 text-navy"
      />
      <motion.p variants={revealUp} className="mt-3 max-w-2xl text-[16px] leading-relaxed text-slate-600">
        A focused three-month runway turns this hackathon prototype into a monitored pilot real patients can use.
      </motion.p>

      <div className="relative mt-9">
        {/* timeline rail */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, ease, delay: 0.3 }}
          className="absolute left-0 right-0 top-[26px] hidden h-0.5 origin-left bg-gradient-to-r from-signal via-signal-deep to-navy lg:block"
        />
        <motion.div variants={staggerParent} className="grid gap-4 lg:grid-cols-3">
          {milestones.map((m, i) => (
            <motion.div key={m.month} variants={revealUp} className="relative">
              <div className="mb-4 hidden items-center gap-3 lg:flex">
                <span className="relative z-10 grid h-[52px] w-[52px] place-items-center rounded-2xl border border-line/80 bg-surface text-signal-deep shadow-soft">
                  <m.icon className="h-6 w-6" />
                  <span className="absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full bg-navy text-[10px] font-bold text-white tnum">
                    {i + 1}
                  </span>
                </span>
              </div>
              <div className="rounded-3xl border border-line/80 bg-surface/90 p-5 shadow-card backdrop-blur-sm">
                <div className="flex items-center justify-between">
                  <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-signal-deep">{m.month}</p>
                  <span className="grid h-8 w-8 place-items-center rounded-lg bg-signal-50 text-signal-deep lg:hidden">
                    <m.icon className="h-4 w-4" />
                  </span>
                </div>
                <p className="mt-1 text-[18px] font-bold tracking-tightish text-ink">{m.title}</p>
                <ul className="mt-3 space-y-2">
                  {m.items.map((it) => (
                    <li key={it} className="flex items-start gap-2.5 text-[13.5px] leading-snug text-slate-600">
                      <span className="mt-[6px] h-1.5 w-1.5 shrink-0 rounded-full bg-signal" />
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <motion.div
        variants={revealUp}
        className="mt-6 flex flex-col gap-3 rounded-3xl border border-navy/15 bg-navy px-6 py-5 text-white sm:flex-row sm:items-center sm:justify-between"
      >
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
          <span className="text-[12px] font-semibold uppercase tracking-[0.14em] text-white/60">What patients get</span>
          {patientGets.map((p) => (
            <span key={p.label} className="inline-flex items-center gap-2 text-[13.5px] font-medium text-white/90">
              <p.icon className="h-4 w-4 text-signal" /> {p.label}
            </span>
          ))}
        </div>
        <p className="text-[13px] font-semibold text-signal">90 days → a monitored pilot.</p>
      </motion.div>
    </Slide>
  );
}
