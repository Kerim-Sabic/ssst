import type { LucideIcon } from "lucide-react";

export type RiskLevel = "green" | "amber" | "red";

export type ScreenId =
  | "landing"
  | "onboarding"
  | "conditions"
  | "plan"
  | "checkin"
  | "validation"
  | "analysis"
  | "result"
  | "timeline"
  | "caregiver"
  | "doctor";

export type DiseasePackId = "hypertension" | "diabetes" | "heart-failure" | "copd";

export interface DiseasePack {
  id: DiseasePackId;
  name: string;
  short: string;
  icon: LucideIcon;
  blurb: string;
  tracks: string[];
  accent: "signal" | "navy" | "rose" | "violet";
}

export type VitalKind = "bp" | "glucose" | "spo2" | "weight" | "hr";

/** Result of the measurement-validation engine. */
export type ValidationVerdict = "impossible" | "suspicious" | "ok";

export interface ValidationResult {
  verdict: ValidationVerdict;
  title: string;
  message: string;
}

export interface TimelinePoint {
  day: string;
  value: number;
  label?: string;
}

export interface InsightCard {
  icon: LucideIcon;
  title: string;
  detail: string;
  tone: RiskLevel | "neutral";
}

export interface ActionCard {
  title: string;
  audience: "patient" | "caregiver" | "doctor";
  icon: LucideIcon;
  items: string[];
}

export interface ScenarioPatient {
  name: string;
  age: number;
  conditions: string[];
  caregiver: string;
  doctor: string;
}

export interface RecheckInstruction {
  text: string;
  urgent?: boolean;
}

export interface RecheckCoach {
  vital: VitalKind;
  unit: string;
  title: string;
  subtitle: string;
  initialReading: string;
  repeatedReading: string;
  repeatedSecondary?: { label: string; value: string };
  instructions: RecheckInstruction[];
  /** red-flag symptom questions asked after repeat */
  redFlags: { label: string; answer: string }[];
}

export interface AnalysisFact {
  label: string;
  value: string;
  tone: RiskLevel | "neutral";
}

export interface Scenario {
  id: string;
  shortLabel: string;
  menuTitle: string;
  menuDesc: string;
  level: RiskLevel;
  patient: ScenarioPatient;
  /** Where the demo panel should jump the user when selecting this scenario. */
  entry: ScreenId;
  /** Optional measurement recheck coach for this scenario. */
  recheck?: RecheckCoach;
  analysisFacts: AnalysisFact[];
  result: {
    headline: string;
    summary: string;
    actions: ActionCard[];
  };
  timeline?: {
    weight?: TimelinePoint[];
    bp?: TimelinePoint[];
    hr?: TimelinePoint[];
    insights: InsightCard[];
  };
  caregiver?: {
    to: string;
    message: string;
    checklist: string[];
  };
  doctor: {
    reason: string;
    keyChanges: string[];
    redFlags: { label: string; answer: string }[];
    clinicalNote: string;
    discussionPoints: string[];
  };
}
