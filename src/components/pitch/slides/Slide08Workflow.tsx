import { motion } from "framer-motion";
import { ArrowRight, UserCheck } from "lucide-react";
import { Slide } from "../Slide";
import { Kicker, WordReveal } from "../pitchShared";
import { PhoneMockup } from "../PhoneMockup";
import { DoctorSummaryMini } from "../DoctorSummaryMini";
import { ease, revealUp } from "@/lib/pitchMotion";

const patientSteps = [
  "Sit upright and rest",
  "Contact the cardiology clinic today",
  "Don’t ignore worsening breathing",
  "Seek urgent help for red-flag symptoms",
];

function Connector({ delay }: { delay: number }) {
  return (
    <div className="relative mx-auto hidden h-16 w-full max-w-[60px] items-center justify-center lg:flex">
      <svg viewBox="0 0 60 24" className="h-6 w-full" fill="none" aria-hidden>
        <motion.line
          x1="2" y1="12" x2="46" y2="12"
          stroke="#14B8A6" strokeWidth="2" strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.5 }}
          transition={{ duration: 0.55, ease: "easeInOut", delay }}
        />
        <motion.line
          x1="2" y1="12" x2="46" y2="12"
          stroke="#0F766E" strokeWidth="2.2" strokeLinecap="round" strokeDasharray="1.5 9"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.9, strokeDashoffset: [0, -42] }}
          transition={{
            opacity: { delay: delay + 0.4, duration: 0.3 },
            strokeDashoffset: { delay: delay + 0.4, duration: 1.1, ease: "linear", repeat: Infinity },
          }}
        />
        <motion.path
          d="M42 7 L50 12 L42 17"
          stroke="#0F766E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: delay + 0.4 }}
        />
      </svg>
    </div>
  );
}

export function Slide08Workflow() {
  return (
    <Slide>
      <Kicker className="mb-4">The workflow</Kicker>
      <WordReveal
        text="From daily journal to family action and clinical context."
        className="max-w-3xl text-[clamp(26px,4vw,46px)] font-extrabold leading-[1.06] tracking-tighter2 text-navy"
      />

      <div className="mt-10 grid items-center gap-4 lg:grid-cols-[1fr_auto_1fr_auto_1fr]">
        {/* patient */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.55, ease }}
          className="rounded-3xl border border-line/80 bg-surface/95 p-5 shadow-card backdrop-blur-sm"
        >
          <div className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-signal-50 text-signal-deep">
              <UserCheck className="h-4 w-4" />
            </span>
            <p className="text-[14px] font-bold tracking-tightish text-ink">Patient</p>
          </div>
          <p className="mt-3 text-[12px] font-semibold uppercase tracking-[0.12em] text-muted">Clear next steps</p>
          <ul className="mt-2 space-y-2">
            {patientSteps.map((s, i) => {
              const urgent = /urgent/i.test(s);
              return (
                <motion.li
                  key={s}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + i * 0.09, duration: 0.4, ease }}
                  className="flex items-start gap-2 text-[13px] leading-snug"
                >
                  <span className={`mt-[6px] h-1.5 w-1.5 shrink-0 rounded-full ${urgent ? "bg-concern" : "bg-signal"}`} />
                  <span className={urgent ? "font-semibold text-concern" : "text-slate-600"}>{s}</span>
                </motion.li>
              );
            })}
          </ul>
        </motion.div>

        <Connector delay={0.85} />

        {/* caregiver */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.95, duration: 0.55, ease }}
        >
          <p className="mb-2 text-center text-[12px] font-semibold uppercase tracking-[0.12em] text-muted">
            Caregiver
          </p>
          <PhoneMockup notifyDelay={1.25} className="scale-95" />
        </motion.div>

        <Connector delay={1.7} />

        {/* doctor */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.55, ease }}
        >
          <p className="mb-2 text-center text-[12px] font-semibold uppercase tracking-[0.12em] text-muted">
            Doctor
          </p>
          <DoctorSummaryMini baseDelay={2.0} />
        </motion.div>
      </div>

      <motion.p variants={revealUp} className="mt-8 flex items-center gap-2 text-[15px] font-semibold text-navy">
        The same daily entry becomes useful to patient, family, and clinical team.
        <ArrowRight className="h-4 w-4 text-signal-deep" />
      </motion.p>
    </Slide>
  );
}
