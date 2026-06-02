import { Activity, Droplet, HeartPulse, Wind } from "lucide-react";
import type { DiseasePack } from "./types";

export const diseasePacks: DiseasePack[] = [
  {
    id: "hypertension",
    name: "Hypertension",
    short: "High blood pressure",
    icon: Activity,
    accent: "signal",
    blurb: "Daily pressure control and early-warning signs.",
    tracks: [
      "Morning & evening BP",
      "Heart rate",
      "Headache · dizziness",
      "Chest pain check",
      "Medication taken",
      "Salt-heavy meals",
      "Stress · sleep",
    ],
  },
  {
    id: "diabetes",
    name: "Diabetes",
    short: "Glucose management",
    icon: Droplet,
    accent: "violet",
    blurb: "Glucose patterns with hypo/hyper safety checks.",
    tracks: [
      "Fasting glucose",
      "Before / after meals",
      "Insulin · medication",
      "Hypoglycemia signs",
      "Hyperglycemia signs",
      "Foot wound check",
      "Illness · exercise",
    ],
  },
  {
    id: "heart-failure",
    name: "Heart failure",
    short: "Fluid & function",
    icon: HeartPulse,
    accent: "navy",
    blurb: "Fluid retention and daily function tracking.",
    tracks: [
      "Daily weight",
      "Breathing · at rest",
      "Leg swelling",
      "Cough lying down",
      "Walking ability",
      "Diuretic adherence",
      "Fatigue",
    ],
  },
  {
    id: "copd",
    name: "COPD / Asthma",
    short: "Respiratory",
    icon: Wind,
    accent: "rose",
    blurb: "Oxygen, breathlessness and rescue-inhaler use.",
    tracks: [
      "Oxygen saturation",
      "Breathlessness",
      "Cough · wheeze",
      "Sputum color",
      "Rescue inhaler use",
      "Fever · triggers",
      "Walk / talk ability",
    ],
  },
];

export const packAccent: Record<
  DiseasePack["accent"],
  { ring: string; chip: string; icon: string; dot: string }
> = {
  signal: {
    ring: "ring-signal/30",
    chip: "bg-signal-50 text-signal-deep",
    icon: "bg-signal-50 text-signal-deep",
    dot: "bg-signal",
  },
  navy: {
    ring: "ring-navy/25",
    chip: "bg-navy-50 text-navy",
    icon: "bg-navy-50 text-navy",
    dot: "bg-navy",
  },
  violet: {
    ring: "ring-violet-300/40",
    chip: "bg-violet-50 text-violet-700",
    icon: "bg-violet-50 text-violet-700",
    dot: "bg-violet-500",
  },
  rose: {
    ring: "ring-rose-300/40",
    chip: "bg-rose-50 text-rose-700",
    icon: "bg-rose-50 text-rose-700",
    dot: "bg-rose-500",
  },
};
