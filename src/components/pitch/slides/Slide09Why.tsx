import { motion } from "framer-motion";
import { Fingerprint, Layers, MonitorPlay, ShieldCheck, Target, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Slide } from "../Slide";
import { Kicker, SignalMark, WordReveal } from "../pitchShared";
import { ease } from "@/lib/pitchMotion";

interface Proof {
  icon: LucideIcon;
  title: string;
  desc: string;
}

const left: Proof[] = [
  { icon: Target, title: "Specific", desc: "Chronic-disease daily deterioration" },
  { icon: MonitorPlay, title: "Demoable", desc: "One clear patient story" },
  { icon: ShieldCheck, title: "Safe", desc: "Does not diagnose or prescribe" },
];
const right: Proof[] = [
  { icon: Users, title: "Useful", desc: "Patient + caregiver + doctor" },
  { icon: Layers, title: "Scalable", desc: "Disease packs can expand" },
  { icon: Fingerprint, title: "Memorable", desc: "Measure Again Intelligence" },
];

function ProofCard({ p, delay }: { p: Proof; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, duration: 0.5, ease }}
      whileHover={{ y: -5 }}
      className="rounded-2xl border border-line/80 bg-surface/90 p-4 shadow-card backdrop-blur-sm transition-shadow hover:shadow-lift"
    >
      <span className="grid h-10 w-10 place-items-center rounded-xl bg-signal-50 text-signal-deep">
        <p.icon className="h-5 w-5" />
      </span>
      <p className="mt-3 text-[16px] font-bold tracking-tightish text-ink">{p.title}</p>
      <p className="mt-0.5 text-[13px] leading-snug text-muted">{p.desc}</p>
    </motion.div>
  );
}

export function Slide09Why() {
  return (
    <Slide>
      <Kicker className="mb-4">Why this wins</Kicker>
      <WordReveal
        text="Focused enough to build. Important enough to matter."
        className="max-w-3xl text-[clamp(26px,4vw,46px)] font-extrabold leading-[1.06] tracking-tighter2 text-navy"
      />

      <div className="mt-10 grid items-center gap-6 lg:grid-cols-[1fr_auto_1fr]">
        <div className="grid gap-4">
          {left.map((p, i) => (
            <ProofCard key={p.title} p={p} delay={0.3 + i * 0.12} />
          ))}
        </div>

        {/* center mark + line */}
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.6, ease }}
          >
            <SignalMark size={92} />
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.6, ease }}
            className="mt-6 max-w-[200px] text-[clamp(18px,2.2vw,24px)] font-extrabold leading-tight tracking-tighter2 text-navy"
          >
            Not a diary.<br />
            <span className="text-signal-deep">An early-warning layer.</span>
          </motion.p>
        </div>

        <div className="grid gap-4">
          {right.map((p, i) => (
            <ProofCard key={p.title} p={p} delay={0.45 + i * 0.12} />
          ))}
        </div>
      </div>
    </Slide>
  );
}
