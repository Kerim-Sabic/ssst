import { motion } from "framer-motion";
import { BellRing, Phone } from "lucide-react";
import { cn } from "@/lib/cn";

interface PhoneMockupProps {
  to?: string;
  message?: string;
  className?: string;
  /** delay (s) before the notification drops in */
  notifyDelay?: number;
}

/** A clean phone frame with a CareSignal caregiver notification dropping in. */
export function PhoneMockup({
  to = "Lejla",
  message = "CareSignal detected a concerning pattern for Amina today: repeated high BP, weight gain, worsening breathing, and a missed diuretic. Please check on her and help contact her doctor.",
  className,
  notifyDelay = 0.5,
}: PhoneMockupProps) {
  return (
    <div className={cn("relative mx-auto w-[260px] rounded-[2.4rem] border border-slate-300/70 bg-navy p-2.5 shadow-lift", className)}>
      <span className="absolute -left-[3px] top-20 h-10 w-[3px] rounded-l bg-slate-400/50" />
      <span className="absolute -right-[3px] top-16 h-7 w-[3px] rounded-r bg-slate-400/50" />
      <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-b from-slate-100 to-white">
        <div className="relative flex items-center justify-between px-6 pb-2 pt-3 text-[11px] font-semibold text-navy">
          <span className="tnum">08:42</span>
          <span className="absolute left-1/2 top-2 h-5 w-20 -translate-x-1/2 rounded-full bg-navy" />
          <span className="h-2.5 w-4 rounded-[2px] border border-navy/40" />
        </div>
        <div className="px-3 pb-7 pt-3">
          <p className="px-1 pb-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-muted">Just now</p>
          <motion.div
            initial={{ opacity: 0, y: -26, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: notifyDelay, type: "spring", stiffness: 300, damping: 24 }}
            className="rounded-2xl border border-line/80 bg-white p-3 shadow-card"
          >
            <div className="flex items-center gap-2.5">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-navy">
                <BellRing className="h-4 w-4 text-signal" />
              </span>
              <div className="leading-tight">
                <p className="text-[12px] font-bold text-ink">CareSignal AI</p>
                <p className="text-[10.5px] text-muted">To {to} · now</p>
              </div>
            </div>
            <p className="mt-2.5 text-[12px] leading-relaxed text-slate-700">{message}</p>
            <div className="mt-3 flex gap-2">
              <span className="flex-1 rounded-lg bg-navy py-1.5 text-center text-[11.5px] font-semibold text-white">
                Open CareSignal
              </span>
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-stable-soft text-stable">
                <Phone className="h-3.5 w-3.5" />
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
