import { motion } from "framer-motion";
import {
  ActivitySquare,
  BellRing,
  CheckCircle2,
  FileText,
  ShieldAlert,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ScreenShell, SafetyNote } from "@/components/ui/Bits";
import { useApp } from "@/lib/appContext";
import { ease, rise, stagger } from "@/lib/motion";
import { riskTheme } from "@/lib/risk";
import { cn } from "@/lib/cn";

const audienceMeta = {
  patient: { chip: "For Amina", tone: "bg-signal-50 text-signal-deep" },
  caregiver: { chip: "For caregiver", tone: "bg-navy-50 text-navy" },
  doctor: { chip: "For doctor", tone: "bg-stable-soft text-stable" },
};

export function RiskResultScreen() {
  const { scenario, go } = useApp();
  const theme = riskTheme[scenario.level];
  const r = scenario.result;
  const Icon = scenario.level === "green" ? CheckCircle2 : ShieldAlert;
  const firstName = scenario.patient.name.split(" ")[0];

  const burst =
    scenario.level === "red" ? "bg-concern/20" : scenario.level === "amber" ? "bg-watch/20" : "bg-stable/20";

  return (
    <ScreenShell>
      {/* glow burst on reveal */}
      <div className="relative">
        <motion.div
          aria-hidden
          className={cn("pointer-events-none absolute -inset-2 -z-10 rounded-[2rem] blur-2xl", burst)}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: [0, 0.7, 0.2], scale: [0.85, 1.04, 1] }}
          transition={{ duration: 1.1, ease, delay: 0.1 }}
        />
        {/* big risk card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.55, ease }}
          className={cn(
            "relative overflow-hidden rounded-3xl border bg-surface p-7 sm:p-9",
            theme.border,
            theme.glow
          )}
        >
        <div className={cn("absolute inset-x-0 top-0 h-1", scenario.level === "green" ? "bg-stable" : scenario.level === "amber" ? "bg-watch" : "bg-concern")} />
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-start gap-4">
            <motion.span
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.15, type: "spring", stiffness: 260, damping: 18 }}
              className={cn("grid h-14 w-14 shrink-0 place-items-center rounded-2xl", theme.softBg, theme.text)}
            >
              <Icon className="h-7 w-7" />
            </motion.span>
            <div>
              <div className="flex items-center gap-2.5">
                <span className={cn("rounded-lg px-2.5 py-1 text-[12px] font-extrabold tracking-[0.12em]", theme.softBg, theme.text)}>
                  {theme.badge}
                </span>
                <span className="text-[13px] font-semibold uppercase tracking-[0.12em] text-muted">
                  {theme.label} pattern
                </span>
              </div>
              <h1 className="mt-2 text-balance text-[28px] font-extrabold leading-tight tracking-tighter2 text-navy sm:text-[34px]">
                {r.headline}
              </h1>
            </div>
          </div>
          <Badge tone="neutral" className="tnum shrink-0">
            {firstName} · today 08:42
          </Badge>
        </div>

        <p className="mt-5 max-w-3xl text-[16px] leading-relaxed text-slate-600">{r.summary}</p>

        <div className="mt-6">
          <SafetyNote variant="inline" />
        </div>
        </motion.div>
      </div>

      {/* action cards */}
      <motion.div variants={stagger} initial="initial" animate="animate" className="mt-6 grid gap-4 lg:grid-cols-3">
        {r.actions.map((a) => {
          const meta = audienceMeta[a.audience];
          return (
            <motion.div
              key={a.title}
              variants={rise}
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
              className="card flex flex-col p-6 transition-shadow hover:shadow-lift"
            >
              <div className="flex items-center justify-between">
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-soft text-navy">
                  <a.icon className="h-5 w-5" />
                </span>
                <span className={cn("rounded-full px-2.5 py-1 text-[11px] font-semibold", meta.tone)}>
                  {meta.chip}
                </span>
              </div>
              <h3 className="mt-4 text-[17px] font-bold tracking-tightish text-ink">{a.title}</h3>
              <ul className="mt-3 space-y-2.5">
                {a.items.map((item, i) => {
                  const urgent = /urgent|seek/i.test(item);
                  return (
                    <li key={i} className="flex items-start gap-2.5">
                      <span
                        className={cn(
                          "mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full",
                          urgent ? "bg-concern" : "bg-signal"
                        )}
                      />
                      <span className={cn("text-[13.5px] leading-relaxed", urgent ? "font-semibold text-concern" : "text-slate-600")}>
                        {item}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          );
        })}
      </motion.div>

      {/* navigation buttons */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5, ease }}
        className="mt-8 flex flex-wrap items-center gap-3"
      >
        <Button onClick={() => go("timeline")} iconLeft={<TrendingUp className="h-[18px] w-[18px]" />}>
          View trend timeline
        </Button>
        {scenario.caregiver && (
          <Button variant="secondary" onClick={() => go("caregiver")} iconLeft={<BellRing className="h-[18px] w-[18px]" />}>
            Preview caregiver alert
          </Button>
        )}
        <Button variant="secondary" onClick={() => go("doctor")} iconLeft={<FileText className="h-[18px] w-[18px]" />}>
          Generate doctor summary
        </Button>
        <span className="ml-auto hidden items-center gap-2 text-[13px] text-muted sm:flex">
          <ActivitySquare className="h-4 w-4 text-signal-deep" />
          Verified after repeat measurement
        </span>
      </motion.div>
    </ScreenShell>
  );
}
