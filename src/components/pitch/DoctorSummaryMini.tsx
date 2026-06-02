import { motion } from "framer-motion";
import { FileText } from "lucide-react";
import { ease, staggerTight } from "@/lib/pitchMotion";
import { cn } from "@/lib/cn";

const lines = [
  "Weight +2.4 kg over 3 days",
  "BP 178/112 after repeat measurement",
  "HR 104 · one missed diuretic dose",
  "New leg swelling · dyspnea worse",
];

/** A compact, credible clinical-document card for the workflow slide. */
export function DoctorSummaryMini({ className, baseDelay = 0.3 }: { className?: string; baseDelay?: number }) {
  return (
    <div className={cn("overflow-hidden rounded-3xl border border-line/80 bg-surface/95 shadow-card backdrop-blur-sm", className)}>
      <div className="flex items-center justify-between border-b border-line/70 bg-gradient-to-b from-soft/50 to-transparent px-5 py-3.5">
        <div className="flex items-center gap-2.5">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-signal-50 text-signal-deep">
            <FileText className="h-4 w-4" />
          </span>
          <div className="leading-tight">
            <p className="text-[12.5px] font-bold text-ink">Doctor-ready summary</p>
            <p className="text-[10.5px] text-muted">Amina Hadžić, 67 · 7-day</p>
          </div>
        </div>
        <span className="rounded-md bg-concern-soft px-2 py-0.5 text-[10px] font-extrabold tracking-[0.1em] text-concern">
          RED
        </span>
      </div>
      <div className="space-y-3 px-5 py-4">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted">Reason for alert</p>
          <p className="mt-0.5 text-[13px] font-semibold text-ink">Concerning 3-day worsening pattern</p>
        </div>
        <motion.ul variants={staggerTight} className="space-y-1.5">
          {lines.map((l, i) => (
            <motion.li
              key={l}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: baseDelay + i * 0.12, duration: 0.4, ease }}
              className="flex items-start gap-2 text-[12.5px] leading-snug text-slate-600"
            >
              <span className="mt-[6px] h-1.5 w-1.5 shrink-0 rounded-full bg-signal" />
              {l}
            </motion.li>
          ))}
        </motion.ul>
        <div className="rounded-xl border border-navy/12 bg-navy-50/50 px-3.5 py-2.5">
          <p className="text-[11.5px] italic leading-relaxed text-navy">
            “Pattern may require clinical review, given known heart failure and hypertension.”
          </p>
        </div>
      </div>
    </div>
  );
}
