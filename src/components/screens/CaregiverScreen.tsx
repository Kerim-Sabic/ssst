import { motion } from "framer-motion";
import { ArrowRight, BellRing, Check, Phone } from "lucide-react";
import { useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { PhoneMock } from "@/components/ui/PhoneMock";
import { ScreenShell, Eyebrow, SafetyNote } from "@/components/ui/Bits";
import { useApp } from "@/lib/appContext";
import { ease, rise, stagger } from "@/lib/motion";

export function CaregiverScreen() {
  const { scenario, go } = useApp();
  const c = scenario.caregiver;

  useEffect(() => {
    if (!c) go("doctor");
  }, [c, go]);

  if (!c) return null;

  return (
    <ScreenShell>
      <Eyebrow>Caregiver workflow</Eyebrow>
      <h1 className="text-balance text-[30px] font-extrabold leading-tight tracking-tighter2 text-navy sm:text-[36px]">
        Caregiver alert preview
      </h1>
      <p className="mt-2 max-w-xl text-[15.5px] leading-relaxed text-slate-600">
        When CareSignal detects a concerning pattern, {c.to} receives a clear, calm notification with the
        next steps — never a raw number dump.
      </p>

      <div className="mt-8 grid items-start gap-10 lg:grid-cols-[0.85fr_1.15fr]">
        {/* phone */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease }}
          className="order-2 lg:order-1"
        >
          <PhoneMock>
            <p className="px-1 pb-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-muted">
              Just now
            </p>
            <motion.div
              initial={{ opacity: 0, y: -24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.4, type: "spring", stiffness: 300, damping: 24 }}
              className="rounded-2xl border border-line/80 bg-white p-3.5 shadow-card"
            >
              <div className="flex items-center gap-2.5">
                <span className="grid h-8 w-8 place-items-center rounded-lg bg-navy">
                  <BellRing className="h-4 w-4 text-signal" />
                </span>
                <div className="leading-tight">
                  <p className="text-[12.5px] font-bold text-ink">CareSignal AI</p>
                  <p className="text-[11px] text-muted">To {c.to} · now</p>
                </div>
              </div>
              <p className="mt-3 text-[13px] leading-relaxed text-slate-700">{c.message}</p>
              <div className="mt-3 flex gap-2">
                <span className="flex-1 rounded-lg bg-navy py-2 text-center text-[12px] font-semibold text-white">
                  Open CareSignal
                </span>
                <span className="grid h-9 w-9 place-items-center rounded-lg bg-stable-soft text-stable">
                  <Phone className="h-4 w-4" />
                </span>
              </div>
            </motion.div>

            <div className="mt-4 flex items-center justify-center gap-1.5 text-[10px] text-muted">
              <Logo showWord={false} animated={false} className="scale-[0.5]" />
              <span>caregiver alert simulated</span>
            </div>
          </PhoneMock>
        </motion.div>

        {/* checklist */}
        <div className="order-1 lg:order-2">
          <div className="card p-6">
            <div className="flex items-center justify-between">
              <p className="text-[13px] font-semibold uppercase tracking-[0.12em] text-muted">
                {c.to}’s checklist
              </p>
              <span className="rounded-full bg-watch-soft px-2.5 py-1 text-[11px] font-semibold text-watch">
                Action needed today
              </span>
            </div>
            <motion.ul variants={stagger} initial="initial" animate="animate" className="mt-4 space-y-2.5">
              {c.checklist.map((item, i) => {
                const urgent = /urgent/i.test(item);
                return (
                  <motion.li
                    key={item}
                    variants={rise}
                    className="flex items-center gap-3 rounded-2xl border border-line/70 bg-soft/40 px-4 py-3"
                  >
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.3 + i * 0.12, type: "spring", stiffness: 400, damping: 22 }}
                      className={
                        urgent
                          ? "grid h-6 w-6 place-items-center rounded-full bg-concern-soft text-concern"
                          : "grid h-6 w-6 place-items-center rounded-full bg-stable-soft text-stable"
                      }
                    >
                      <Check className="h-3.5 w-3.5" />
                    </motion.span>
                    <span className={urgent ? "text-[14.5px] font-semibold text-concern" : "text-[14.5px] font-medium text-ink"}>
                      {item}
                    </span>
                  </motion.li>
                );
              })}
            </motion.ul>
          </div>
          <SafetyNote className="mt-5" />
        </div>
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
        <button onClick={() => go("timeline")} className="text-sm font-medium text-muted hover:text-ink">
          Back to timeline
        </button>
        <Button size="lg" onClick={() => go("doctor")} iconRight={<ArrowRight className="h-[18px] w-[18px]" />}>
          View doctor summary
        </Button>
      </div>
    </ScreenShell>
  );
}
