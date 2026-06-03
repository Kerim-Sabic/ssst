import {
  Activity,
  Droplet,
  Footprints,
  HeartPulse,
  Pill,
  Scale,
  Stethoscope,
  Wind,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type QuestionKind = "number" | "choice" | "bp";

export interface CheckInChoice {
  value: string;
  tone?: "green" | "amber" | "red";
}

export interface CheckInQuestion {
  id: string;
  icon: LucideIcon;
  prompt: string;
  helper?: string;
  kind: QuestionKind;
  unit?: string;
  /** Pre-filled demo answer for a smooth live demo. */
  demoValue: string;
  /** Feedback shown after entry (e.g. baseline comparison). */
  feedback?: string;
  feedbackTone?: "green" | "amber" | "red";
  choices?: CheckInChoice[];
  /** When true, answering this triggers the measurement-validation screen. */
  triggersValidation?: boolean;
}

/** The personalized heart-failure + hypertension check-in for Amina. */
export const heartFailureCheckIn: CheckInQuestion[] = [
  {
    id: "weight",
    icon: Scale,
    prompt: "What is your weight today?",
    helper: "Weigh on the same scale, before eating, after the bathroom.",
    kind: "number",
    unit: "kg",
    demoValue: "74.8",
    feedback: "+2.4 kg compared with your usual baseline of 72.4 kg.",
    feedbackTone: "red",
  },
  {
    id: "diuretic",
    icon: Pill,
    prompt: "Did you take your diuretic yesterday?",
    kind: "choice",
    demoValue: "Missed one dose",
    choices: [
      { value: "Taken", tone: "green" },
      { value: "Missed one dose", tone: "amber" },
      { value: "Not sure", tone: "amber" },
    ],
    feedback: "Noted — a missed dose can contribute to fluid build-up.",
    feedbackTone: "amber",
  },
  {
    id: "breathing",
    icon: Wind,
    prompt: "How is your breathing today?",
    kind: "choice",
    demoValue: "Slightly worse",
    choices: [
      { value: "Same as usual", tone: "green" },
      { value: "Slightly worse", tone: "amber" },
      { value: "Much worse", tone: "red" },
      { value: "Worse at rest", tone: "red" },
    ],
    feedback: "Change from baseline noted.",
    feedbackTone: "amber",
  },
  {
    id: "swelling",
    icon: HeartPulse,
    prompt: "Any swelling in your legs?",
    kind: "choice",
    demoValue: "Mild",
    choices: [
      { value: "No", tone: "green" },
      { value: "Mild", tone: "amber" },
      { value: "Significant", tone: "red" },
    ],
    feedback: "New mild swelling recorded.",
    feedbackTone: "amber",
  },
  {
    id: "cough",
    icon: Stethoscope,
    prompt: "Any cough when lying down?",
    kind: "choice",
    demoValue: "Yes, worse than usual",
    choices: [
      { value: "No", tone: "green" },
      { value: "Yes, mild", tone: "amber" },
      { value: "Yes, worse than usual", tone: "red" },
    ],
    feedback: "Cough while lying down can be a fluid-retention sign.",
    feedbackTone: "amber",
  },
  {
    id: "walking",
    icon: Footprints,
    prompt: "Can you walk your usual distance?",
    helper: "Your usual tolerance is about 300 m without stopping.",
    kind: "choice",
    demoValue: "Less than usual",
    choices: [
      { value: "Yes", tone: "green" },
      { value: "Less than usual", tone: "amber" },
      { value: "Much less than usual", tone: "red" },
    ],
    feedback: "Reduced walking tolerance recorded.",
    feedbackTone: "amber",
  },
  {
    id: "bp",
    icon: Activity,
    prompt: "What is your blood pressure now?",
    helper: "Enter as systolic/diastolic, for example 135/82.",
    kind: "bp",
    unit: "mmHg",
    demoValue: "184/118",
    triggersValidation: true,
  },
];

/** Extra pack-specific questions appended when the patient also tracks these. */
const glucoseQuestion: CheckInQuestion = {
  id: "glucose",
  icon: Droplet,
  prompt: "What is your glucose today?",
  helper: "Confirm the meter unit is mg/dL.",
  kind: "number",
  unit: "mg/dL",
  demoValue: "210",
};

const spo2Question: CheckInQuestion = {
  id: "spo2",
  icon: Wind,
  prompt: "What is your oxygen saturation now?",
  helper: "Warm hands, finger still, wait for the reading to settle.",
  kind: "number",
  unit: "%",
  demoValue: "90",
};

/**
 * Compose the daily check-in from the conditions CareSignal is watching.
 * The flagship heart-failure + hypertension selection reproduces the original
 * 7-question flow exactly; adding Diabetes / COPD appends the relevant vital.
 */
export function buildCheckIn(selected: string[]): CheckInQuestion[] {
  const has = (id: string) => selected.includes(id);
  const core = heartFailureCheckIn.filter((q) => q.id !== "bp");
  const bp = heartFailureCheckIn.find((q) => q.id === "bp")!;

  const out: CheckInQuestion[] = [];
  if (has("heart-failure")) out.push(...core);
  if (has("diabetes")) out.push(glucoseQuestion);
  if (has("copd")) out.push(spo2Question);
  if (has("hypertension") || has("heart-failure")) out.push(bp);

  return out.length ? out : [...core, bp];
}
