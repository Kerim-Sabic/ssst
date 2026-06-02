import { motion } from "framer-motion";
import { BellRing, FileText } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { LineChart } from "@/components/ui/LineChart";
import { ScreenShell, Eyebrow } from "@/components/ui/Bits";
import { useApp } from "@/lib/appContext";
import { ease, rise, stagger } from "@/lib/motion";
import { toneIconWrap } from "@/lib/risk";
import type { TimelinePoint } from "@/lib/types";
import { cn } from "@/lib/cn";

export function TimelineScreen() {
  const { scenario, go } = useApp();
  const t = scenario.timeline;

  const charts: { title: string; unit: string; color: string; baseline?: number; points?: TimelinePoint[] }[] = [
    { title: "Weight", unit: "kg", color: "#0B1B3A", baseline: 72.4, points: t?.weight },
    { title: "Blood pressure (systolic)", unit: "mmHg", color: "#EF4444", baseline: 135, points: t?.bp },
    { title: "Heart rate", unit: "bpm", color: "#F59E0B", baseline: 78, points: t?.hr },
  ].filter((c) => c.points && c.points.length);

  return (
    <ScreenShell>
      <Eyebrow>Signal timeline</Eyebrow>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-balance text-[30px] font-extrabold leading-tight tracking-tighter2 text-navy sm:text-[36px]">
            7-day signal timeline
          </h1>
          <p className="mt-2 max-w-xl text-[15.5px] leading-relaxed text-slate-600">
            CareSignal compares today’s entry with {scenario.patient.name.split(" ")[0]}’s normal baseline.
          </p>
        </div>
        <Badge tone="signal">Baseline-aware detection</Badge>
      </div>

      {/* charts */}
      {charts.length > 0 && (
        <motion.div variants={stagger} initial="initial" animate="animate" className="mt-7 grid gap-4 md:grid-cols-3">
          {charts.map((c, idx) => {
            const last = c.points![c.points!.length - 1];
            return (
              <motion.div key={c.title} variants={rise} className="card p-5">
                <div className="flex items-center justify-between">
                  <p className="text-[13px] font-bold tracking-tightish text-ink">{c.title}</p>
                  {last.label && <Badge tone="neutral" className="tnum">{last.label}</Badge>}
                </div>
                <div className="mt-3">
                  <LineChart points={c.points!} color={c.color} baseline={c.baseline} height={110} delay={0.15 * idx} />
                </div>
                <div className="mt-2 flex justify-between text-[11px] text-muted tnum">
                  {c.points!.map((p) => (
                    <span key={p.day}>{p.day}</span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      )}

      {/* insights */}
      <motion.div variants={stagger} initial="initial" animate="animate" className="mt-6 grid gap-4 sm:grid-cols-2">
        {t?.insights.map((ins) => (
          <motion.div
            key={ins.title}
            variants={rise}
            whileHover={{ y: -4 }}
            transition={{ type: "spring", stiffness: 300, damping: 24 }}
            className="card-soft flex items-start gap-4 p-5 transition-shadow hover:shadow-card"
          >
            <span className={cn("grid h-11 w-11 shrink-0 place-items-center rounded-2xl", toneIconWrap[ins.tone])}>
              <ins.icon className="h-5 w-5" />
            </span>
            <div>
              <p className="text-[15px] font-bold tracking-tightish text-ink">{ins.title}</p>
              <p className="mt-1 text-[13.5px] leading-relaxed text-muted">{ins.detail}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* signature phrase */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.55, ease }}
        className="mt-7 overflow-hidden rounded-3xl border border-navy/15 bg-navy px-7 py-8 text-center text-white"
      >
        <p className="text-[13px] font-semibold uppercase tracking-[0.18em] text-signal">CareSignal principle</p>
        <p className="mx-auto mt-2 max-w-xl text-balance text-[26px] font-extrabold leading-tight tracking-tighter2 sm:text-[30px]">
          Your normal matters more than normal.
        </p>
        <p className="mx-auto mt-3 max-w-lg text-[14px] leading-relaxed text-white/70">
          CareSignal compares each day to this patient’s usual baseline — not just generic thresholds — so it
          can detect meaningful change early.
        </p>
      </motion.div>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
        <button onClick={() => go("result")} className="text-sm font-medium text-muted hover:text-ink">
          Back to result
        </button>
        {scenario.caregiver ? (
          <Button size="lg" onClick={() => go("caregiver")} iconRight={<BellRing className="h-[18px] w-[18px]" />}>
            Send caregiver alert
          </Button>
        ) : (
          <Button size="lg" onClick={() => go("doctor")} iconRight={<FileText className="h-[18px] w-[18px]" />}>
            View doctor summary
          </Button>
        )}
      </div>
    </ScreenShell>
  );
}
