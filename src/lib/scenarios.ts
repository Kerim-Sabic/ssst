import {
  Activity,
  AlertTriangle,
  CheckCircle2,
  Droplet,
  HeartPulse,
  Pill,
  Stethoscope,
  UserCheck,
  Wind,
  Scale,
} from "lucide-react";
import type { Scenario } from "./types";

/* ------------------------------------------------------------------ */
/* Scenario 3 — Heart failure worsening (the main demo, RED)           */
/* ------------------------------------------------------------------ */

const heartFailure: Scenario = {
  id: "hf-worsening",
  shortLabel: "Heart failure worsening",
  menuTitle: "Heart failure worsening",
  menuDesc: "The flagship flow — repeat-confirmed high BP plus a 3-day deterioration pattern.",
  level: "red",
  entry: "checkin",
  patient: {
    name: "Amina Hadžić",
    age: 67,
    conditions: ["Heart failure", "Hypertension"],
    caregiver: "Lejla (daughter)",
    doctor: "Cardiology clinic",
  },
  recheck: {
    vital: "bp",
    unit: "mmHg",
    title: "Let’s make sure this reading is real",
    subtitle:
      "Your BP reading was 184/118 mmHg. This may be real, but blood pressure can be affected by movement, talking, stress, cuff position, or measuring too soon after activity.",
    initialReading: "184/118",
    repeatedReading: "178/112",
    repeatedSecondary: { label: "Repeated heart rate", value: "104 bpm" },
    instructions: [
      { text: "Sit quietly for 5 minutes" },
      { text: "Keep both feet flat on the floor" },
      { text: "Keep your back supported" },
      { text: "Place the cuff on bare skin" },
      { text: "Support your arm at heart level" },
      { text: "Do not talk during the measurement" },
      { text: "Measure again" },
    ],
    redFlags: [
      { label: "Chest pain", answer: "No" },
      { label: "Severe shortness of breath at rest", answer: "No" },
      { label: "Weakness, numbness, or speech trouble", answer: "No" },
      { label: "Confusion or fainting", answer: "No" },
      { label: "Severe headache or vision change", answer: "No" },
    ],
  },
  analysisFacts: [
    { label: "Weight", value: "+2.4 kg", tone: "red" },
    { label: "Repeated BP", value: "178/112", tone: "red" },
    { label: "Heart rate", value: "104 bpm", tone: "amber" },
    { label: "Diuretic", value: "Missed", tone: "amber" },
    { label: "Breathing", value: "Worse", tone: "amber" },
    { label: "Leg swelling", value: "New, mild", tone: "amber" },
  ],
  result: {
    headline: "Concerning worsening pattern",
    summary:
      "Repeated high blood pressure plus rising weight, a missed diuretic, worsening breathing, new leg swelling, elevated heart rate, and reduced walking ability may indicate clinical deterioration.",
    actions: [
      {
        title: "What Amina should do now",
        audience: "patient",
        icon: UserCheck,
        items: [
          "Sit upright and rest",
          "Do not ignore worsening breathing or swelling",
          "Contact the cardiology clinic today",
          "Seek urgent care now if chest pain, severe breathlessness, confusion, fainting, weakness, or speech difficulty appears",
        ],
      },
      {
        title: "What the caregiver sees",
        audience: "caregiver",
        icon: HeartPulse,
        items: [
          "Check on Amina today",
          "Help repeat the BP measurement if needed",
          "Help contact her doctor",
          "Bring the medication list and 7-day summary",
        ],
      },
      {
        title: "What the doctor receives",
        audience: "doctor",
        icon: Stethoscope,
        items: [
          "3-day worsening trend detected",
          "Weight +2.4 kg · BP 178/112 after repeat",
          "HR 104 · one missed diuretic dose",
          "Breathing worse · new leg swelling",
        ],
      },
    ],
  },
  timeline: {
    weight: [
      { day: "Mon", value: 72.4 },
      { day: "Tue", value: 72.6 },
      { day: "Wed", value: 72.8 },
      { day: "Thu", value: 73.5 },
      { day: "Today", value: 74.8, label: "+2.4 kg" },
    ],
    bp: [
      { day: "Mon", value: 136 },
      { day: "Tue", value: 142 },
      { day: "Wed", value: 148 },
      { day: "Thu", value: 162 },
      { day: "Today", value: 178, label: "178/112" },
    ],
    hr: [
      { day: "Mon", value: 78 },
      { day: "Tue", value: 82 },
      { day: "Wed", value: 84 },
      { day: "Thu", value: 96 },
      { day: "Today", value: 104, label: "104 bpm" },
    ],
    insights: [
      {
        icon: Scale,
        title: "Weight rising over 3 days",
        detail: "+2.4 kg vs. usual baseline of 72.4 kg — a fluid-retention signal.",
        tone: "red",
      },
      {
        icon: Activity,
        title: "BP remains high after repeat",
        detail: "178/112 confirmed after a correct re-measurement, not a one-off spike.",
        tone: "red",
      },
      {
        icon: Wind,
        title: "Symptoms changed from baseline",
        detail: "Breathing worse, new swelling, cough worse lying down, walking reduced.",
        tone: "amber",
      },
      {
        icon: Pill,
        title: "Medication adherence issue",
        detail: "One missed diuretic dose yesterday, alongside the weight gain.",
        tone: "amber",
      },
    ],
  },
  caregiver: {
    to: "Lejla",
    message:
      "CareSignal detected a concerning pattern for Amina today: repeated high BP, weight gain, worsening breathing, leg swelling, and a missed diuretic. Please check on her and help contact her doctor.",
    checklist: [
      "Call Amina",
      "Ask if breathing is worse",
      "Help repeat BP if needed",
      "Check the medication box",
      "Help contact the cardiology clinic",
      "Use urgent care if red-flag symptoms appear",
    ],
  },
  doctor: {
    reason: "Concerning 3-day worsening pattern",
    keyChanges: [
      "Weight increased from 72.4 kg to 74.8 kg (+2.4 kg over 3 days)",
      "BP increased and remained high after repeat measurement: 178/112",
      "Heart rate increased to 104 bpm",
      "Missed diuretic dose yesterday",
      "New leg swelling",
      "Shortness of breath worse than usual",
      "Cough worse while lying down",
      "Walking tolerance decreased",
    ],
    redFlags: [
      { label: "Chest pain", answer: "No" },
      { label: "Severe breathlessness at rest", answer: "No" },
      { label: "Fainting / confusion", answer: "No" },
      { label: "Weakness / numbness / speech difficulty", answer: "No" },
      { label: "Severe headache / vision change", answer: "No" },
    ],
    clinicalNote:
      "Over the last 3 days, the patient reports progressive weight gain, worsening dyspnea, new leg swelling, elevated BP after repeated measurement, elevated HR, and one missed diuretic dose. Pattern may require clinical review, especially given known heart failure and hypertension.",
    discussionPoints: [
      "Fluid retention / heart-failure symptom worsening",
      "Medication adherence",
      "Blood-pressure control",
      "Need for clinician follow-up",
    ],
  },
};

/* ------------------------------------------------------------------ */
/* Scenario 1 — Stable day (GREEN)                                     */
/* ------------------------------------------------------------------ */

const stable: Scenario = {
  id: "stable",
  shortLabel: "Stable day",
  menuTitle: "Stable day",
  menuDesc: "A calm, in-range check-in. CareSignal confirms baseline and reassures.",
  level: "green",
  entry: "analysis",
  patient: heartFailure.patient,
  analysisFacts: [
    { label: "Weight", value: "72.5 kg", tone: "green" },
    { label: "Blood pressure", value: "132/82", tone: "green" },
    { label: "Heart rate", value: "76 bpm", tone: "green" },
    { label: "Diuretic", value: "Taken", tone: "green" },
    { label: "Breathing", value: "As usual", tone: "green" },
    { label: "Swelling", value: "None", tone: "green" },
  ],
  result: {
    headline: "Stable pattern",
    summary:
      "Today’s entry matches Amina’s usual baseline. Weight, blood pressure, heart rate, medication, and symptoms are all within her normal range.",
    actions: [
      {
        title: "What Amina should do now",
        audience: "patient",
        icon: CheckCircle2,
        items: [
          "Continue your usual routine",
          "Keep taking medication as prescribed",
          "Complete tomorrow’s morning check-in",
          "Reach out if breathing or swelling changes",
        ],
      },
      {
        title: "What the caregiver sees",
        audience: "caregiver",
        icon: HeartPulse,
        items: [
          "No action needed today",
          "Amina’s readings are within her baseline",
          "You’ll be alerted if a pattern changes",
        ],
      },
      {
        title: "What the doctor receives",
        audience: "doctor",
        icon: Stethoscope,
        items: [
          "Stable 7-day trend",
          "Weight steady at baseline",
          "BP and HR within normal range",
          "Full medication adherence",
        ],
      },
    ],
  },
  timeline: {
    weight: [
      { day: "Mon", value: 72.4 },
      { day: "Tue", value: 72.5 },
      { day: "Wed", value: 72.4 },
      { day: "Thu", value: 72.6 },
      { day: "Today", value: 72.5, label: "steady" },
    ],
    bp: [
      { day: "Mon", value: 134 },
      { day: "Tue", value: 136 },
      { day: "Wed", value: 133 },
      { day: "Thu", value: 135 },
      { day: "Today", value: 132, label: "132/82" },
    ],
    insights: [
      {
        icon: CheckCircle2,
        title: "Weight steady at baseline",
        detail: "No meaningful change from Amina’s usual 72.4 kg.",
        tone: "green",
      },
      {
        icon: Activity,
        title: "Blood pressure controlled",
        detail: "132/82 — within Amina’s usual range.",
        tone: "green",
      },
    ],
  },
  doctor: {
    reason: "Routine stable check-in",
    keyChanges: [
      "Weight steady at baseline (72.5 kg)",
      "BP 132/82 — within usual range",
      "Heart rate 76 bpm",
      "Full medication adherence",
      "No new symptoms reported",
    ],
    redFlags: [
      { label: "Chest pain", answer: "No" },
      { label: "Severe breathlessness", answer: "No" },
      { label: "New swelling", answer: "No" },
    ],
    clinicalNote:
      "Today’s entry is consistent with the patient’s usual baseline across weight, blood pressure, heart rate, symptoms, and medication adherence. No deterioration signal detected.",
    discussionPoints: ["Continue current management", "Maintain daily monitoring"],
  },
};

/* ------------------------------------------------------------------ */
/* Scenario 2 — Suspicious BP, resolves to GREEN after repeat          */
/* ------------------------------------------------------------------ */

const suspiciousBP: Scenario = {
  id: "suspicious-bp",
  shortLabel: "Suspicious BP reading",
  menuTitle: "Suspicious BP reading",
  menuDesc: "Shows Measure Again Intelligence catching a false alarm before escalation.",
  level: "green",
  entry: "validation",
  patient: heartFailure.patient,
  recheck: {
    vital: "bp",
    unit: "mmHg",
    title: "Let’s make sure this reading is real",
    subtitle:
      "Your BP reading was 184/118 mmHg. Before we flag anything, let’s repeat it correctly — measurement conditions can strongly affect blood pressure.",
    initialReading: "184/118",
    repeatedReading: "136/84",
    repeatedSecondary: { label: "Repeated heart rate", value: "79 bpm" },
    instructions: heartFailure.recheck!.instructions,
    redFlags: heartFailure.recheck!.redFlags,
  },
  analysisFacts: [
    { label: "First reading", value: "184/118", tone: "amber" },
    { label: "Repeated BP", value: "136/84", tone: "green" },
    { label: "Heart rate", value: "79 bpm", tone: "green" },
    { label: "Weight", value: "Steady", tone: "green" },
    { label: "Symptoms", value: "None new", tone: "green" },
    { label: "Red flags", value: "None", tone: "green" },
  ],
  result: {
    headline: "Likely measurement effect — now stable",
    summary:
      "The first reading may have been affected by measurement conditions. After a correct repeat, BP returned to Amina’s usual range with no new symptoms.",
    actions: [
      {
        title: "What Amina should do now",
        audience: "patient",
        icon: CheckCircle2,
        items: [
          "Your repeated reading is within your usual range",
          "Continue your usual routine and medication",
          "Use the rest-and-repeat steps each time you measure",
          "Reach out if a high reading repeats correctly",
        ],
      },
      {
        title: "What the caregiver sees",
        audience: "caregiver",
        icon: HeartPulse,
        items: [
          "No action needed today",
          "First reading was likely a measurement effect",
          "Repeat reading was normal",
        ],
      },
      {
        title: "What the doctor receives",
        audience: "doctor",
        icon: Stethoscope,
        items: [
          "One high reading, not reproduced on repeat",
          "Repeat BP 136/84 within range",
          "No new symptoms · no red flags",
          "Logged as verified after repeat measurement",
        ],
      },
    ],
  },
  timeline: {
    bp: [
      { day: "Mon", value: 134 },
      { day: "Tue", value: 138 },
      { day: "Wed", value: 135 },
      { day: "Thu", value: 137 },
      { day: "Today", value: 136, label: "after repeat" },
    ],
    insights: [
      {
        icon: CheckCircle2,
        title: "High reading not reproduced",
        detail: "184/118 dropped to 136/84 after a correct re-measurement.",
        tone: "green",
      },
      {
        icon: Activity,
        title: "Within Amina’s usual range",
        detail: "Repeat BP and HR match her normal baseline.",
        tone: "green",
      },
    ],
  },
  doctor: {
    reason: "Single high reading, not reproduced on repeat",
    keyChanges: [
      "First reading 184/118 — likely affected by measurement conditions",
      "Repeat BP 136/84 within usual range",
      "Heart rate 79 bpm",
      "No new symptoms",
    ],
    redFlags: [
      { label: "Chest pain", answer: "No" },
      { label: "Severe breathlessness", answer: "No" },
      { label: "Fainting / confusion", answer: "No" },
    ],
    clinicalNote:
      "An initial elevated BP reading (184/118) was not reproduced after a guided correct re-measurement (136/84), with no accompanying symptoms or red flags. Logged as verified after repeat measurement.",
    discussionPoints: ["Measurement technique reinforcement", "Routine BP monitoring"],
  },
};

/* ------------------------------------------------------------------ */
/* Scenario 4 — Diabetes low glucose (Emir, RED)                       */
/* ------------------------------------------------------------------ */

const lowGlucose: Scenario = {
  id: "low-glucose",
  shortLabel: "Diabetes low glucose",
  menuTitle: "Diabetes — low glucose",
  menuDesc: "Emir, 54. A low glucose reading with symptoms — recheck then act.",
  level: "red",
  entry: "validation",
  patient: {
    name: "Emir Begović",
    age: 54,
    conditions: ["Type 2 diabetes"],
    caregiver: "Selma (wife)",
    doctor: "Diabetes clinic",
  },
  recheck: {
    vital: "glucose",
    unit: "mg/dL",
    title: "This glucose reading is unusual",
    subtitle:
      "Your reading was 52 mg/dL. Let’s check the basics before we flag it — but if you feel shaky, sweaty, confused, or weak, do not wait to get help.",
    initialReading: "52 mg/dL",
    repeatedReading: "54 mg/dL",
    instructions: [
      { text: "Wash and dry your hands" },
      { text: "Use a new test strip" },
      { text: "Confirm the meter unit: mg/dL or mmol/L" },
      { text: "Check whether the strip is expired" },
      { text: "Repeat the measurement if safe to do so" },
      {
        text: "If you have shaking, sweating, confusion, or weakness, do not wait — get help",
        urgent: true,
      },
    ],
    redFlags: [
      { label: "Shaking", answer: "Yes" },
      { label: "Sweating", answer: "Yes" },
      { label: "Confusion", answer: "No" },
      { label: "Able to swallow safely", answer: "Yes" },
    ],
  },
  analysisFacts: [
    { label: "First reading", value: "52 mg/dL", tone: "red" },
    { label: "Repeated", value: "54 mg/dL", tone: "red" },
    { label: "Shaking", value: "Yes", tone: "amber" },
    { label: "Sweating", value: "Yes", tone: "amber" },
    { label: "Confusion", value: "No", tone: "green" },
    { label: "Unit", value: "Confirmed mg/dL", tone: "green" },
  ],
  result: {
    headline: "Concerning low glucose pattern",
    summary:
      "A repeated low glucose reading with shaking and sweating may indicate hypoglycemia that needs prompt action following Emir’s low-glucose plan.",
    actions: [
      {
        title: "What Emir should do now",
        audience: "patient",
        icon: UserCheck,
        items: [
          "Follow your doctor’s low-glucose plan",
          "Take a fast-acting carbohydrate if it is appropriate for you",
          "Recheck glucose after about 15 minutes",
          "Get help now if confusion, fainting, or severe symptoms appear",
        ],
      },
      {
        title: "What the caregiver sees",
        audience: "caregiver",
        icon: HeartPulse,
        items: [
          "Check on Emir now",
          "Help with fast-acting carbohydrate if appropriate",
          "Stay until glucose recovers on recheck",
          "Call for urgent help if confusion or fainting appears",
        ],
      },
      {
        title: "What the doctor receives",
        audience: "doctor",
        icon: Stethoscope,
        items: [
          "Repeated low glucose: 52 → 54 mg/dL",
          "Symptomatic: shaking, sweating",
          "No confusion · able to swallow",
          "Unit confirmed mg/dL after recheck",
        ],
      },
    ],
  },
  timeline: {
    insights: [
      {
        icon: Droplet,
        title: "Low glucose confirmed on repeat",
        detail: "52 then 54 mg/dL — not a single misread.",
        tone: "red",
      },
      {
        icon: AlertTriangle,
        title: "Symptomatic hypoglycemia signs",
        detail: "Shaking and sweating present; no confusion reported.",
        tone: "amber",
      },
    ],
  },
  caregiver: {
    to: "Selma",
    message:
      "CareSignal detected a low glucose pattern for Emir: repeated reading of 52–54 mg/dL with shaking and sweating. Please check on him and help with his low-glucose plan.",
    checklist: [
      "Check on Emir now",
      "Help with fast-acting carbohydrate if appropriate",
      "Recheck glucose in ~15 minutes",
      "Call for urgent help if confusion or fainting appears",
    ],
  },
  doctor: {
    reason: "Symptomatic low glucose, confirmed on repeat",
    keyChanges: [
      "Repeated low glucose: 52 → 54 mg/dL",
      "Symptomatic: shaking and sweating present",
      "No confusion · able to swallow safely",
      "Meter unit confirmed mg/dL after recheck",
    ],
    redFlags: [
      { label: "Shaking", answer: "Yes" },
      { label: "Sweating", answer: "Yes" },
      { label: "Confusion", answer: "No" },
      { label: "Able to swallow safely", answer: "Yes" },
    ],
    clinicalNote:
      "The patient recorded a repeated low glucose reading (52–54 mg/dL) with adrenergic symptoms (shaking, sweating) but no neuroglycopenic features. Reading verified after recheck with unit confirmation. Pattern consistent with symptomatic hypoglycemia and may require review of the low-glucose plan.",
    discussionPoints: [
      "Hypoglycemia frequency and triggers",
      "Medication / insulin timing",
      "Low-glucose action plan review",
    ],
  },
};

/* ------------------------------------------------------------------ */
/* Scenario 5 — COPD low oxygen (Mira, RED)                            */
/* ------------------------------------------------------------------ */

const lowOxygen: Scenario = {
  id: "low-oxygen",
  shortLabel: "COPD low oxygen",
  menuTitle: "COPD — low oxygen",
  menuDesc: "Mira, 61. Low SpO₂ with heavy rescue-inhaler use — recheck then warn.",
  level: "red",
  entry: "validation",
  patient: {
    name: "Mira Kovač",
    age: 61,
    conditions: ["COPD / asthma"],
    caregiver: "Ivan (son)",
    doctor: "Respiratory clinic",
  },
  recheck: {
    vital: "spo2",
    unit: "%",
    title: "This oxygen reading is low",
    subtitle:
      "Your reading was 86%. Let’s repeat it carefully — cold hands, nail polish, movement, or sensor position can affect it. If breathlessness is severe, seek urgent help.",
    initialReading: "86%",
    repeatedReading: "88%",
    repeatedSecondary: { label: "Repeated heart rate", value: "98 bpm" },
    instructions: [
      { text: "Warm your hand" },
      { text: "Remove nail polish if possible" },
      { text: "Keep your finger still" },
      { text: "Wait for the reading to stabilize" },
      { text: "Check the sensor is placed correctly" },
      { text: "Repeat the measurement" },
      { text: "If breathlessness is severe, seek urgent help", urgent: true },
    ],
    redFlags: [
      { label: "Breathlessness", answer: "Worse" },
      { label: "Rescue inhaler used today", answer: "4 times" },
      { label: "Able to speak full sentences", answer: "Short sentences" },
      { label: "Blue lips or confusion", answer: "No" },
    ],
  },
  analysisFacts: [
    { label: "First SpO₂", value: "86%", tone: "red" },
    { label: "Repeated SpO₂", value: "88%", tone: "red" },
    { label: "Heart rate", value: "98 bpm", tone: "amber" },
    { label: "Rescue inhaler", value: "4× today", tone: "amber" },
    { label: "Breathlessness", value: "Worse", tone: "amber" },
    { label: "Blue lips", value: "No", tone: "green" },
  ],
  result: {
    headline: "Concerning respiratory worsening pattern",
    summary:
      "A repeated low oxygen reading with worsening breathlessness and heavy rescue-inhaler use may indicate a respiratory flare that needs clinical attention.",
    actions: [
      {
        title: "What Mira should do now",
        audience: "patient",
        icon: UserCheck,
        items: [
          "Sit upright and try to slow your breathing",
          "Contact your respiratory clinic today",
          "Follow your written action plan for flare-ups",
          "Seek urgent help now if severe breathlessness, blue lips, confusion, or inability to speak full sentences appears",
        ],
      },
      {
        title: "What the caregiver sees",
        audience: "caregiver",
        icon: HeartPulse,
        items: [
          "Check on Mira now",
          "Help her sit upright and stay calm",
          "Help contact the respiratory clinic",
          "Call for urgent help if severe symptoms appear",
        ],
      },
      {
        title: "What the doctor receives",
        audience: "doctor",
        icon: Stethoscope,
        items: [
          "Repeated low SpO₂: 86 → 88%",
          "Rescue inhaler used 4× today",
          "Breathlessness worse · speaking in short sentences",
          "No blue lips or confusion reported",
        ],
      },
    ],
  },
  timeline: {
    insights: [
      {
        icon: Wind,
        title: "Low oxygen confirmed on repeat",
        detail: "86% then 88% after a careful re-measurement.",
        tone: "red",
      },
      {
        icon: AlertTriangle,
        title: "Heavy rescue-inhaler use",
        detail: "Used 4 times today with worsening breathlessness.",
        tone: "amber",
      },
    ],
  },
  caregiver: {
    to: "Ivan",
    message:
      "CareSignal detected a respiratory worsening pattern for Mira: repeated low oxygen (86–88%), worsening breathlessness, and rescue inhaler used 4 times today. Please check on her and help contact her clinic.",
    checklist: [
      "Check on Mira now",
      "Help her sit upright and stay calm",
      "Help contact the respiratory clinic",
      "Call for urgent help if severe symptoms appear",
    ],
  },
  doctor: {
    reason: "Respiratory worsening, low SpO₂ confirmed on repeat",
    keyChanges: [
      "Repeated low oxygen saturation: 86 → 88%",
      "Rescue inhaler used 4 times today",
      "Breathlessness worse · speaking in short sentences",
      "Heart rate 98 bpm",
      "No blue lips or confusion reported",
    ],
    redFlags: [
      { label: "Severe breathlessness", answer: "Worsening" },
      { label: "Blue lips", answer: "No" },
      { label: "Confusion", answer: "No" },
      { label: "Able to speak full sentences", answer: "Short sentences" },
    ],
    clinicalNote:
      "The patient recorded a repeated low oxygen saturation (86–88%) with worsening breathlessness and heavy rescue-inhaler use (4× today), speaking in short sentences but without cyanosis or confusion. Pattern consistent with a respiratory flare and may require clinical attention.",
    discussionPoints: [
      "Respiratory flare management",
      "Rescue-inhaler use frequency",
      "Action-plan escalation thresholds",
    ],
  },
};

export const scenarios: Scenario[] = [
  stable,
  suspiciousBP,
  heartFailure,
  lowGlucose,
  lowOxygen,
];

export const defaultScenario = heartFailure;

export const scenarioById = (id: string): Scenario =>
  scenarios.find((s) => s.id === id) ?? defaultScenario;
