import { motion } from "framer-motion";
import { BellRing, FileText, NotebookText, RadioTower, ScanLine, Workflow } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Slide } from "../Slide";
import { Kicker, WordReveal } from "../pitchShared";
import { ease, revealUp } from "@/lib/pitchMotion";

interface Step {
  icon: LucideIcon;
  title: string;
  desc: string;
}

const pipeline: Step[] = [
  { icon: NotebookText, title: "Ask", desc: "The right questions for this condition" },
  { icon: ScanLine, title: "Validate", desc: "Confirm abnormal measurements" },
  { icon: RadioTower, title: "Detect", desc: "Find deterioration patterns" },
  { icon: BellRing, title: "Alert", desc: "Notify the caregiver" },
  { icon: FileText, title: "Summarize", desc: "Doctor-ready handover" },
];

export function Slide03Insight() {
  return (
    <Slide>
      <Kicker className="mb-4">The insight</Kicker>
      <WordReveal
        text="A journal is not enough."
        className="text-[clamp(32px,5vw,56px)] font-extrabold leading-[1.05] tracking-tighter2 text-navy"
      />

      <div className="mt-10 grid gap-6 lg:grid-cols-[0.7fr_1.3fr] lg:items-center">
        {/* muted notebook */}
        <motion.div
          variants={revealUp}
          className="rounded-3xl border border-line bg-soft/60 p-6 shadow-soft"
        >
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-slate-200/70 text-slate-500">
            <NotebookText className="h-5 w-5" />
          </span>
          <p className="mt-4 text-[13px] font-semibold uppercase tracking-[0.12em] text-slate-400">
            Basic journal
          </p>
          <p className="mt-1 text-[20px] font-bold tracking-tightish text-slate-500">Record symptoms.</p>
          <div className="mt-4 space-y-2 opacity-60">
            {["Mon · felt tired", "Tue · headache", "Wed · slept poorly"].map((l) => (
              <div key={l} className="rounded-lg border border-line bg-white/70 px-3 py-2 text-[12.5px] text-slate-400">
                {l}
              </div>
            ))}
          </div>
        </motion.div>

        {/* signal pipeline */}
        <div>
          <div className="mb-4 flex items-center gap-2 text-signal-deep">
            <Workflow className="h-4 w-4" />
            <span className="text-[12px] font-semibold uppercase tracking-[0.16em]">CareSignal pipeline</span>
          </div>
          <div className="relative">
            {/* connecting animated line: draws, then flows */}
            <svg className="absolute left-0 top-9 hidden h-2 w-full lg:block" viewBox="0 0 1000 8" preserveAspectRatio="none" aria-hidden>
              <motion.line
                x1="20" y1="4" x2="980" y2="4"
                stroke="#14B8A6" strokeWidth="2" strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.45 }}
                transition={{ duration: 1, ease: "easeInOut", delay: 0.3 }}
              />
              <motion.line
                x1="20" y1="4" x2="980" y2="4"
                stroke="#0F766E" strokeWidth="2.4" strokeLinecap="round" strokeDasharray="2 16"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.9, strokeDashoffset: [0, -72] }}
                transition={{
                  opacity: { delay: 1.4, duration: 0.4 },
                  strokeDashoffset: { delay: 1.4, duration: 1.5, ease: "linear", repeat: Infinity },
                }}
              />
            </svg>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
              {pipeline.map((s, i) => (
                <motion.div
                  key={s.title}
                  initial={{ opacity: 0, y: 18, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 0.45 + i * 0.13, duration: 0.5, ease }}
                  className="relative rounded-2xl border border-line/80 bg-surface/90 p-4 text-center shadow-card backdrop-blur-sm"
                >
                  <span className="mx-auto grid h-11 w-11 place-items-center rounded-2xl bg-signal-50 text-signal-deep">
                    <s.icon className="h-5 w-5" />
                  </span>
                  <p className="mt-3 text-[15px] font-bold tracking-tightish text-ink">{s.title}</p>
                  <p className="mt-1 text-[12px] leading-snug text-muted">{s.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
          <motion.p
            variants={revealUp}
            className="mt-6 text-[17px] font-semibold text-navy"
          >
            Most apps store entries. <span className="text-signal-deep">CareSignal makes them actionable.</span>
          </motion.p>
        </div>
      </div>
    </Slide>
  );
}
