import { motion } from "framer-motion";
import {
  Activity,
  ArrowRight,
  BellRing,
  CheckCircle2,
  FileText,
  HeartPulse,
  Pill,
  ShieldCheck,
  Stethoscope,
  TrendingUp,
} from "lucide-react";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { Badge, StatusPill } from "@/components/ui/Badge";
import { Counter, BPCounter } from "@/components/ui/Counter";
import { LineChart } from "@/components/ui/LineChart";
import { SignalField } from "@/components/ui/SignalField";
import { ScreenShell } from "@/components/ui/Bits";
import { useApp } from "@/lib/appContext";
import { ease, rise, stagger } from "@/lib/motion";

const chips = [
  { icon: Activity, label: "Adaptive journal" },
  { icon: ShieldCheck, label: "Measurement validation" },
  { icon: BellRing, label: "Caregiver alerts" },
  { icon: Stethoscope, label: "Doctor-ready summary" },
];

const trust = [
  { icon: ShieldCheck, label: "Does not diagnose" },
  { icon: TrendingUp, label: "Baseline-aware" },
  { icon: HeartPulse, label: "Chronic-care first" },
];

export function LandingScreen() {
  const { go, beginDemo } = useApp();

  return (
    <div className="relative">
      <SignalField className="h-[680px]" />
      <ScreenShell className="relative">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
          {/* Left: hero copy */}
          <motion.div variants={stagger} initial="initial" animate="animate">
            <motion.div variants={rise}>
              <Badge tone="navy" icon={<span className="h-1.5 w-1.5 rounded-full bg-signal" />}>
                CareSignal AI · chronic-care monitoring
              </Badge>
            </motion.div>

            <motion.h1
              variants={rise}
              className="mt-5 text-balance text-[40px] font-extrabold leading-[1.04] tracking-tighter2 text-navy sm:text-[54px]"
            >
              Adaptive journaling for chronic disease patients.
            </motion.h1>

            <motion.p
              variants={rise}
              className="mt-5 max-w-xl text-[17px] leading-relaxed text-slate-600"
            >
              CareSignal asks the right daily questions, validates unusual measurements, detects worsening
              patterns, and prepares clear summaries for caregivers and doctors.
            </motion.p>

            <motion.div variants={rise} className="mt-8 flex flex-wrap items-center gap-3">
              <Button size="lg" onClick={() => beginDemo("onboarding")} iconRight={<ArrowRight className="h-[18px] w-[18px]" />}>
                Start demo
              </Button>
              <Button size="lg" variant="secondary" onClick={() => go("doctor")} iconLeft={<FileText className="h-[18px] w-[18px]" />}>
                View doctor summary
              </Button>
            </motion.div>

            <motion.div variants={rise} className="mt-8 flex flex-wrap gap-2.5">
              {chips.map((c) => (
                <span
                  key={c.label}
                  className="inline-flex items-center gap-2 rounded-full border border-line/80 bg-surface/80 px-3 py-1.5 text-[13px] font-medium text-slate-700 shadow-soft glass-line"
                >
                  <c.icon className="h-3.5 w-3.5 text-signal-deep" />
                  {c.label}
                </span>
              ))}
            </motion.div>

            <motion.div variants={rise} className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px] text-muted">
              {trust.map((t) => (
                <span key={t.label} className="inline-flex items-center gap-1.5">
                  <t.icon className="h-3.5 w-3.5 text-signal-deep" />
                  {t.label}
                </span>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: floating dashboard preview */}
          <motion.div
            initial={{ opacity: 0, y: 28, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, ease, delay: 0.15 }}
            className="relative"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 7, ease: "easeInOut", repeat: Infinity }}
            >
              <DashboardPreview onOpen={() => go("doctor")} />
            </motion.div>
          </motion.div>
        </div>
      </ScreenShell>
    </div>
  );
}

function DashboardPreview({ onOpen }: { onOpen: () => void }) {
  return (
    <div className="card overflow-hidden">
      {/* header */}
      <div className="flex items-center justify-between border-b border-line/70 bg-gradient-to-b from-soft/50 to-transparent px-5 py-4">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-navy text-base font-bold text-white">
            AH
          </span>
          <div>
            <p className="text-[15px] font-bold tracking-tightish text-ink">Amina Hadžić</p>
            <p className="text-[12px] text-muted">Heart failure + hypertension · 67</p>
          </div>
        </div>
        <StatusPill tone="amber" label="Watch" />
      </div>

      {/* body */}
      <div className="space-y-4 p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
              Today’s check-in
            </span>
          </div>
          <span className="tnum text-[12px] font-medium text-muted">6 / 8 complete</span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-line/80">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-signal to-signal-deep"
            initial={{ width: 0 }}
            animate={{ width: "75%" }}
            transition={{ duration: 1, ease, delay: 0.6 }}
          />
        </div>

        <div className="grid grid-cols-3 gap-3">
          <Metric icon={Activity} label="Blood pressure" value={<BPCounter sys={168} dia={96} delay={0.7} />} tone="amber" />
          <Metric icon={TrendingUp} label="Weight trend" value={<Counter to={1.1} prefix="+" suffix=" kg" decimals={1} delay={0.7} />} tone="amber" />
          <Metric icon={Pill} label="Medication" value="1 missed" tone="red" />
        </div>

        {/* mini chart */}
        <div className="rounded-2xl border border-line/80 bg-soft/40 p-3.5">
          <div className="mb-1 flex items-center justify-between">
            <span className="text-[12px] font-semibold text-ink">7-day BP signal</span>
            <Badge tone="amber">trending up</Badge>
          </div>
          <LineChart
            height={88}
            color="#F59E0B"
            baseline={135}
            points={[
              { day: "1", value: 136 },
              { day: "2", value: 142 },
              { day: "3", value: 148 },
              { day: "4", value: 162 },
              { day: "5", value: 168 },
            ]}
            delay={0.8}
          />
        </div>

        <div className="flex items-center justify-between rounded-2xl border border-stable/25 bg-stable-soft px-4 py-3">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="h-4 w-4 text-stable" />
            <span className="text-[13px] font-semibold text-ink">Doctor summary ready</span>
          </div>
          <button onClick={onOpen} className="text-[13px] font-semibold text-signal-deep hover:underline">
            Open
          </button>
        </div>

        <p className="tnum text-center text-[11px] text-muted">Last updated today 08:42</p>
      </div>
    </div>
  );
}

function Metric({
  icon: Icon,
  label,
  value,
  tone,
}: {
  icon: typeof Activity;
  label: string;
  value: ReactNode;
  tone: "amber" | "red" | "green";
}) {
  const wrap = {
    amber: "bg-watch-soft text-watch",
    red: "bg-concern-soft text-concern",
    green: "bg-stable-soft text-stable",
  }[tone];
  return (
    <div className="rounded-2xl border border-line/80 bg-surface p-3">
      <span className={`mb-2 inline-grid h-7 w-7 place-items-center rounded-lg ${wrap}`}>
        <Icon className="h-3.5 w-3.5" />
      </span>
      <p className="tnum text-[15px] font-bold tracking-tightish text-ink">{value}</p>
      <p className="text-[11px] leading-tight text-muted">{label}</p>
    </div>
  );
}
