import { motion } from "framer-motion";
import { Bluetooth, Cpu, Server, Smartphone, Stethoscope } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Slide } from "../Slide";
import { Kicker, WordReveal } from "../pitchShared";
import { revealUp, staggerParent } from "@/lib/pitchMotion";
import { cn } from "@/lib/cn";

interface Layer {
  icon: LucideIcon;
  title: string;
  tech: string;
  status: "live" | "next";
}

const layers: Layer[] = [
  {
    icon: Smartphone,
    title: "Patient & caregiver apps",
    tech: "React · TypeScript · Tailwind · Framer Motion",
    status: "live",
  },
  {
    icon: Cpu,
    title: "Adaptive journal + Measure-Again engine",
    tech: "Deterministic, on-device validation & pattern logic",
    status: "live",
  },
  {
    icon: Server,
    title: "Secure API & encrypted store",
    tech: "Edge / Node · Postgres · per-patient encryption",
    status: "next",
  },
  {
    icon: Stethoscope,
    title: "Clinical integrations",
    tech: "Device BLE · FHIR / EHR export · clinician portal",
    status: "next",
  },
];

const stack = ["React", "TypeScript", "Tailwind", "Framer Motion", "lucide-react", "Vite"];

export function SlideArchitecture() {
  return (
    <Slide>
      <Kicker className="mb-4">Architecture & stack</Kicker>
      <WordReveal
        text="Architected to become real."
        className="max-w-3xl text-[clamp(28px,4.4vw,50px)] font-extrabold leading-[1.05] tracking-tighter2 text-navy"
      />
      <motion.p variants={revealUp} className="mt-3 max-w-2xl text-[16px] leading-relaxed text-slate-600">
        A calm client today; a secure, standards-based platform tomorrow — the same logic, hardened.
      </motion.p>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.35fr_0.65fr] lg:items-start">
        {/* layered stack */}
        <motion.div variants={staggerParent} className="space-y-3">
          {layers.map((l, i) => (
            <motion.div
              key={l.title}
              variants={revealUp}
              className="relative flex items-center gap-4 overflow-hidden rounded-2xl border border-line/80 bg-surface/90 p-4 shadow-soft backdrop-blur-sm"
            >
              <span
                className={cn(
                  "grid h-12 w-12 shrink-0 place-items-center rounded-2xl",
                  l.status === "live" ? "bg-signal-50 text-signal-deep" : "bg-navy-50 text-navy"
                )}
              >
                <l.icon className="h-6 w-6" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[15.5px] font-bold tracking-tightish text-ink">{l.title}</p>
                <p className="text-[13px] text-muted">{l.tech}</p>
              </div>
              <span
                className={cn(
                  "shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold",
                  l.status === "live" ? "bg-stable-soft text-stable" : "bg-soft text-muted"
                )}
              >
                {l.status === "live" ? "Live in demo" : "Production path"}
              </span>
              {/* flow connector */}
              {i < layers.length - 1 && (
                <span className="absolute -bottom-3 left-9 z-10 h-3 w-px bg-line" />
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* side: stack + principle */}
        <motion.div variants={revealUp} className="space-y-4">
          <div className="rounded-3xl border border-line/80 bg-surface/90 p-5 shadow-soft backdrop-blur-sm">
            <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-muted">Today’s stack</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {stack.map((s) => (
                <span key={s} className="rounded-lg bg-soft/70 px-2.5 py-1 text-[12.5px] font-medium text-slate-700">
                  {s}
                </span>
              ))}
            </div>
          </div>
          <div className="rounded-3xl border border-signal/25 bg-signal-50/50 p-5">
            <p className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.12em] text-signal-deep">
              <Bluetooth className="h-3.5 w-3.5" /> No magic boxes
            </p>
            <p className="mt-2 text-[14px] leading-relaxed text-slate-700">
              The demo runs the <span className="font-semibold text-ink">real logic</span> — deterministic
              and offline. The path to production is wiring, not reinvention.
            </p>
          </div>
        </motion.div>
      </div>
    </Slide>
  );
}
