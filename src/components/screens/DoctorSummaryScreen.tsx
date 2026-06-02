import { motion } from "framer-motion";
import {
  Check,
  ClipboardCheck,
  Copy,
  Download,
  FileText,
  Send,
  Stethoscope,
} from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Logo } from "@/components/ui/Logo";
import { ScreenShell, Eyebrow } from "@/components/ui/Bits";
import { useToast } from "@/components/ui/Toast";
import { useApp } from "@/lib/appContext";
import { ease, rise, stagger } from "@/lib/motion";
import { riskTheme } from "@/lib/risk";
import { cn } from "@/lib/cn";

export function DoctorSummaryScreen() {
  const { scenario } = useApp();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const d = scenario.doctor;
  const theme = riskTheme[scenario.level];

  useEffect(() => {
    setLoading(true);
    const t = window.setTimeout(() => setLoading(false), 900);
    return () => window.clearTimeout(t);
  }, [scenario.id]);

  return (
    <ScreenShell>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <Eyebrow>Doctor view</Eyebrow>
          <h1 className="text-balance text-[30px] font-extrabold leading-tight tracking-tighter2 text-navy sm:text-[36px]">
            Doctor-ready 7-day summary
          </h1>
          <p className="mt-2 max-w-xl text-[15.5px] leading-relaxed text-slate-600">
            A structured, scannable clinical handover — generated from this patient’s journal.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="secondary" size="sm" iconLeft={<Copy className="h-4 w-4" />}
            onClick={() => toast({ title: "Demo: summary copied", description: "Clinical summary copied to clipboard (simulated).", tone: "success" })}>
            Copy summary
          </Button>
          <Button variant="secondary" size="sm" iconLeft={<Download className="h-4 w-4" />}
            onClick={() => toast({ title: "Demo: PDF export simulated", description: "A formatted PDF would be generated here." })}>
            Download PDF
          </Button>
          <Button size="sm" iconLeft={<Send className="h-4 w-4" />}
            onClick={() => toast({ title: "Demo: doctor message simulated", description: `Securely shared with the ${scenario.patient.doctor}.`, tone: "info" })}>
            Send to doctor
          </Button>
        </div>
      </div>

      {loading ? (
        <SummarySkeleton />
      ) : (
        <motion.article
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease }}
          className="mx-auto mt-7 max-w-3xl overflow-hidden rounded-3xl border border-line/80 bg-surface shadow-card"
        >
          {/* document header */}
          <div className="flex items-start justify-between gap-4 border-b border-line/70 bg-gradient-to-b from-soft/50 to-transparent px-7 py-6">
            <div>
              <Logo />
              <p className="mt-3 text-[12px] font-semibold uppercase tracking-[0.14em] text-muted">
                Clinical handover summary
              </p>
              <h2 className="mt-1 text-[22px] font-extrabold tracking-tighter2 text-navy">
                {scenario.patient.name}, {scenario.patient.age}
              </h2>
              <p className="text-[13.5px] text-muted">{scenario.patient.conditions.join(" · ")}</p>
            </div>
            <div className="text-right">
              <span className={cn("inline-flex rounded-lg px-2.5 py-1 text-[12px] font-extrabold tracking-[0.1em]", theme.softBg, theme.text)}>
                {theme.badge}
              </span>
              <p className="mt-2 tnum text-[12px] text-muted">Report date</p>
              <p className="tnum text-[13px] font-semibold text-ink">Today · 08:42</p>
            </div>
          </div>

          <div className="space-y-7 px-7 py-7">
            {/* reason */}
            <Section icon={ClipboardCheck} title="Reason for alert">
              <p className="text-[15px] font-semibold text-ink">{d.reason}</p>
            </Section>

            <div className="hairline" />

            {/* key changes */}
            <Section icon={Stethoscope} title="Key changes">
              <motion.ul variants={stagger} initial="initial" animate="animate" className="grid gap-2 sm:grid-cols-2">
                {d.keyChanges.map((k) => (
                  <motion.li key={k} variants={rise} className="flex items-start gap-2.5 text-[14px] leading-relaxed text-slate-700">
                    <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-signal" />
                    {k}
                  </motion.li>
                ))}
              </motion.ul>
            </Section>

            <div className="hairline" />

            {/* red flags */}
            <Section icon={ClipboardCheck} title="Patient-reported red flags">
              <div className="grid gap-2 sm:grid-cols-2">
                {d.redFlags.map((rf) => {
                  const ok = ["No", "None"].includes(rf.answer);
                  return (
                    <div key={rf.label} className="flex items-center justify-between rounded-xl border border-line/70 bg-soft/40 px-3.5 py-2.5">
                      <span className="text-[13.5px] text-slate-700">{rf.label}</span>
                      <span className={cn("inline-flex items-center gap-1 text-[12.5px] font-semibold", ok ? "text-stable" : "text-watch")}>
                        {ok && <Check className="h-3 w-3" />} {rf.answer}
                      </span>
                    </div>
                  );
                })}
              </div>
            </Section>

            <div className="hairline" />

            {/* clinical note */}
            <Section icon={FileText} title="AI-generated clinical note">
              <div className="rounded-2xl border border-navy/12 bg-navy-50/50 px-5 py-4">
                <p className="text-[14.5px] italic leading-relaxed text-navy">“{d.clinicalNote}”</p>
              </div>
              <p className="mt-2 text-[12px] text-muted">
                Generated for organization only. CareSignal does not diagnose or recommend treatment.
              </p>
            </Section>

            <div className="hairline" />

            {/* discussion */}
            <Section icon={Stethoscope} title="Suggested discussion points">
              <div className="flex flex-wrap gap-2">
                {d.discussionPoints.map((p) => (
                  <span key={p} className="rounded-xl bg-soft/70 px-3 py-2 text-[13px] font-medium text-slate-700">
                    {p}
                  </span>
                ))}
              </div>
            </Section>
          </div>

          <div className="flex items-center justify-between border-t border-line/70 bg-soft/30 px-7 py-4">
            <Badge tone="signal">Demo prototype</Badge>
            <p className="text-[11px] text-muted">CareSignal AI · simulated clinical document</p>
          </div>
        </motion.article>
      )}
    </ScreenShell>
  );
}

function Section({ icon: Icon, title, children }: { icon: typeof FileText; title: string; children: ReactNode }) {
  return (
    <section>
      <div className="mb-3 flex items-center gap-2.5">
        <span className="grid h-8 w-8 place-items-center rounded-lg bg-signal-50 text-signal-deep">
          <Icon className="h-4 w-4" />
        </span>
        <h3 className="text-[13px] font-bold uppercase tracking-[0.12em] text-muted">{title}</h3>
      </div>
      {children}
    </section>
  );
}

function SummarySkeleton() {
  return (
    <div className="mx-auto mt-7 max-w-3xl overflow-hidden rounded-3xl border border-line/80 bg-surface p-7 shadow-card">
      <div className="flex items-center gap-2.5 text-muted">
        <span className="grid h-8 w-8 place-items-center rounded-lg bg-signal-50">
          <FileText className="h-4 w-4 animate-pulse text-signal-deep" />
        </span>
        <span className="text-[13px] font-semibold">Generating doctor summary…</span>
      </div>
      <div className="mt-6 space-y-3">
        {[80, 60, 70, 45, 65, 50].map((w, i) => (
          <div key={i} className="relative overflow-hidden rounded-lg bg-soft" style={{ height: 14, width: `${w}%` }}>
            <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/70 to-transparent" />
          </div>
        ))}
      </div>
    </div>
  );
}
