import { motion } from "framer-motion";
import {
  BadgeCheck,
  Globe,
  KeyRound,
  Lock,
  ScrollText,
  ShieldOff,
  UserCheck,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Slide } from "../Slide";
import { Kicker, WordReveal } from "../pitchShared";
import { MotionCard } from "../MotionCard";
import { revealUp, staggerParent } from "@/lib/pitchMotion";

interface Pillar {
  icon: LucideIcon;
  title: string;
  detail: string;
}

const pillars: Pillar[] = [
  { icon: Lock, title: "Encryption everywhere", detail: "TLS in transit · AES-256 at rest, per-patient keys." },
  { icon: UserCheck, title: "Consent & sharing controls", detail: "Patients grant caregiver / clinician access — revocable anytime." },
  { icon: KeyRound, title: "Data minimization", detail: "Collect only the vitals each condition needs. Nothing extra." },
  { icon: ScrollText, title: "Audit & access logs", detail: "Least-privilege access with full, tamper-evident traceability." },
  { icon: Globe, title: "Regional hosting", detail: "EU data stays in the EU; residency honored by design." },
  { icon: ShieldOff, title: "No data sales — ever", detail: "Health data is never sold or used for advertising." },
];

const compliance = ["GDPR (EU)", "HIPAA-aligned (US)", "ISO 27001 (target)"];

export function SlideSecurity() {
  return (
    <Slide>
      <Kicker className="mb-4">Security · privacy · compliance</Kicker>
      <WordReveal
        text="Patient data, handled with care."
        className="max-w-3xl text-[clamp(28px,4.4vw,50px)] font-extrabold leading-[1.05] tracking-tighter2 text-navy"
      />
      <motion.p variants={revealUp} className="mt-3 max-w-2xl text-[16px] leading-relaxed text-slate-600">
        Chronic-care data is sensitive and lifelong. Privacy is a design constraint, not an afterthought.
      </motion.p>

      <motion.div variants={staggerParent} className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {pillars.map((p) => (
          <MotionCard key={p.title} className="p-5" interactive>
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-signal-50 text-signal-deep">
              <p.icon className="h-5 w-5" />
            </span>
            <p className="mt-3.5 text-[15.5px] font-bold tracking-tightish text-ink">{p.title}</p>
            <p className="mt-1 text-[13.5px] leading-relaxed text-muted">{p.detail}</p>
          </MotionCard>
        ))}
      </motion.div>

      <motion.div
        variants={revealUp}
        className="mt-6 flex flex-col gap-4 rounded-3xl border border-navy/15 bg-navy px-6 py-5 text-white sm:flex-row sm:items-center sm:justify-between"
      >
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="text-[12px] font-semibold uppercase tracking-[0.14em] text-white/60">Aligned with</span>
          {compliance.map((c) => (
            <span key={c} className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-[12.5px] font-semibold">
              <BadgeCheck className="h-3.5 w-3.5 text-signal" /> {c}
            </span>
          ))}
        </div>
        <p className="text-[13px] text-white/70">
          This prototype stores <span className="font-semibold text-white">nothing</span> — all data is local
          and simulated.
        </p>
      </motion.div>
    </Slide>
  );
}
