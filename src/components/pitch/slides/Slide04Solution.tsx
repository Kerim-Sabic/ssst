import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import {
  Activity,
  Check,
  Droplet,
  Footprints,
  Hand,
  HeartPulse,
  MousePointerClick,
  Pill,
  Scale,
  Stethoscope,
  Wind,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useMemo, useState } from "react";
import { Slide } from "../Slide";
import { Kicker, WordReveal } from "../pitchShared";
import { DiseaseCard } from "../DiseaseCard";
import { Counter } from "../Counter";
import { revealUp, springSnappy, staggerParent } from "@/lib/pitchMotion";

type PackId = "hypertension" | "diabetes" | "heart-failure" | "copd";

interface Pack {
  id: PackId;
  icon: LucideIcon;
  name: string;
  tracks: string;
  accent: "signal" | "navy" | "violet" | "rose";
  journal: { icon: LucideIcon; label: string }[];
}

const packs: Pack[] = [
  {
    id: "hypertension",
    icon: Activity,
    name: "Hypertension",
    tracks: "BP, HR, dizziness, chest pain, medication",
    accent: "signal",
    journal: [
      { icon: Activity, label: "Blood pressure" },
      { icon: HeartPulse, label: "Heart rate" },
      { icon: Pill, label: "Medication taken?" },
    ],
  },
  {
    id: "diabetes",
    icon: Droplet,
    name: "Diabetes",
    tracks: "Glucose, meals, insulin/meds, hypo/hyper symptoms",
    accent: "violet",
    journal: [
      { icon: Droplet, label: "Fasting glucose" },
      { icon: Pill, label: "Insulin / meds" },
      { icon: Hand, label: "Foot wound check" },
    ],
  },
  {
    id: "heart-failure",
    icon: HeartPulse,
    name: "Heart failure",
    tracks: "Weight, breathing, swelling, diuretic, walking",
    accent: "navy",
    journal: [
      { icon: Scale, label: "Weight" },
      { icon: Wind, label: "Shortness of breath" },
      { icon: HeartPulse, label: "Leg swelling" },
      { icon: Stethoscope, label: "Cough lying down" },
      { icon: Footprints, label: "Walking ability" },
    ],
  },
  {
    id: "copd",
    icon: Wind,
    name: "COPD / Asthma",
    tracks: "SpO₂, breathlessness, cough, wheeze, inhaler",
    accent: "rose",
    journal: [
      { icon: Wind, label: "Oxygen (SpO₂)" },
      { icon: Stethoscope, label: "Wheeze / cough" },
      { icon: Pill, label: "Rescue inhaler use" },
    ],
  },
];

export function Slide04Solution() {
  const [selected, setSelected] = useState<PackId[]>(["hypertension", "heart-failure"]);

  const toggle = (id: PackId) =>
    setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));

  const journal = useMemo(() => {
    const seen = new Set<string>();
    const out: { icon: LucideIcon; label: string }[] = [];
    for (const p of packs) {
      if (!selected.includes(p.id)) continue;
      for (const item of p.journal) {
        if (!seen.has(item.label)) {
          seen.add(item.label);
          out.push(item);
        }
      }
    }
    return out;
  }, [selected]);

  const names = packs.filter((p) => selected.includes(p.id)).map((p) => p.name);

  return (
    <Slide>
      <Kicker className="mb-4">The solution · interactive</Kicker>
      <WordReveal
        text="An adaptive journal for each chronic condition."
        className="max-w-3xl text-[clamp(28px,4.2vw,48px)] font-extrabold leading-[1.06] tracking-tighter2 text-navy"
      />
      <motion.div variants={revealUp} className="mt-4 flex flex-wrap items-center gap-3">
        <p className="max-w-xl text-[16px] leading-relaxed text-slate-600">
          CareSignal asks what matters, not everything.
        </p>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-signal/30 bg-signal-50/70 px-3 py-1 text-[12px] font-semibold text-signal-deep">
          <MousePointerClick className="h-3.5 w-3.5" /> Tap a condition to rebuild the journal
        </span>
      </motion.div>

      <LayoutGroup>
        <div className="mt-8 grid gap-6 lg:grid-cols-[1.25fr_0.75fr] lg:items-start">
          <motion.div variants={staggerParent} className="grid gap-4 sm:grid-cols-2">
            {packs.map((p) => {
              const isSel = selected.includes(p.id);
              return (
                <DiseaseCard
                  key={p.id}
                  icon={p.icon}
                  name={p.name}
                  tracks={p.tracks}
                  accent={p.accent}
                  selected={isSel}
                  onClick={() => toggle(p.id)}
                  className={isSel ? "" : "opacity-[0.92]"}
                />
              );
            })}
          </motion.div>

          {/* personalized journal — rebuilds live */}
          <motion.div
            layout
            transition={springSnappy}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col overflow-hidden rounded-3xl border border-signal/30 bg-surface/95 shadow-ring backdrop-blur-sm"
          >
            <div className="flex items-center justify-between gap-3 border-b border-line/70 bg-signal-50/50 px-5 py-3.5">
              <div className="min-w-0">
                <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-signal-deep">
                  Amina’s journal
                </p>
                <p className="truncate text-[13px] font-bold text-ink">
                  {names.length ? names.join(" + ") : "No condition selected"}
                </p>
              </div>
              <div className="flex shrink-0 items-baseline gap-1 rounded-xl bg-surface px-2.5 py-1.5 shadow-soft">
                <Counter to={journal.length} duration={0.5} className="tnum text-[18px] font-extrabold tracking-tighter2 text-navy" />
                <span className="text-[11px] font-medium text-muted">items</span>
              </div>
            </div>

            <motion.ul layout className="max-h-[320px] min-h-[210px] space-y-1.5 overflow-y-auto p-4">
              <AnimatePresence mode="popLayout" initial={false}>
                {journal.length === 0 ? (
                  <motion.li
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="grid h-[178px] place-items-center px-6 text-center text-[13px] leading-relaxed text-muted"
                  >
                    Select a condition to build the daily journal.
                  </motion.li>
                ) : (
                  journal.map((j) => (
                    <motion.li
                      layout
                      key={j.label}
                      initial={{ opacity: 0, x: 18 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -18 }}
                      transition={springSnappy}
                      className="flex items-center gap-3 rounded-xl border border-line/70 bg-soft/40 px-3 py-2"
                    >
                      <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-surface text-signal-deep shadow-soft">
                        <j.icon className="h-3.5 w-3.5" />
                      </span>
                      <span className="text-[13.5px] font-medium text-ink">{j.label}</span>
                      <Check className="ml-auto h-3.5 w-3.5 text-stable/70" />
                    </motion.li>
                  ))
                )}
              </AnimatePresence>
            </motion.ul>
          </motion.div>
        </div>
      </LayoutGroup>
    </Slide>
  );
}
