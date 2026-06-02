import type { ValidationResult } from "./types";

/**
 * CareSignal "Measure Again Intelligence" — a deterministic, client-side
 * validation layer. It never diagnoses. It classifies a raw reading as:
 *  - impossible:  likely an input / unit / device error → ask to check value
 *  - suspicious:  may be real, but technique can distort it → repeat correctly
 *  - ok:          within a plausible range to proceed
 */

const OK = (): ValidationResult => ({
  verdict: "ok",
  title: "Reading accepted",
  message: "This reading looks plausible. CareSignal will compare it with the baseline.",
});

const IMPOSSIBLE = (message: string): ValidationResult => ({
  verdict: "impossible",
  title: "Let’s check that value",
  message,
});

const SUSPICIOUS = (message: string): ValidationResult => ({
  verdict: "suspicious",
  title: "Let’s make sure this reading is real",
  message,
});

export function parseBloodPressure(raw: string): { sys: number; dia: number } | null {
  const m = raw.trim().match(/^(\d{1,3})\s*[/\\xX-]\s*(\d{1,3})$/);
  if (!m) return null;
  return { sys: Number(m[1]), dia: Number(m[2]) };
}

export function validateBloodPressure(raw: string): ValidationResult {
  const parsed = parseBloodPressure(raw);
  if (!parsed) {
    return IMPOSSIBLE(
      "This value may have been entered incorrectly. Enter blood pressure as systolic/diastolic, for example 135/82."
    );
  }
  const { sys, dia } = parsed;
  if (sys <= dia) {
    return IMPOSSIBLE(
      "The top number should be higher than the bottom number. Please check the reading and the order of the values."
    );
  }
  if (sys > 300 || dia > 200 || sys < 50 || dia < 25) {
    return IMPOSSIBLE(
      "This value is outside what a home monitor can measure. Please check the number and unit."
    );
  }
  if (sys >= 180 || dia >= 110 || sys < 90 || dia < 55) {
    return SUSPICIOUS(
      "This may be real, but blood pressure can be affected by movement, talking, stress, cuff position, or measuring too soon after activity. Let’s repeat it correctly."
    );
  }
  return OK();
}

export function validateGlucose(value: number, unit: "mg/dL" | "mmol/L"): ValidationResult {
  if (Number.isNaN(value) || value <= 0) {
    return IMPOSSIBLE("Please enter a numeric glucose value and confirm the meter unit.");
  }
  // A mmol/L value entered while the unit reads mg/dL (or vice-versa) is the classic error.
  if (unit === "mg/dL" && value < 20) {
    return IMPOSSIBLE(
      "This looks like a mmol/L reading entered as mg/dL. Confirm the meter unit: mg/dL or mmol/L."
    );
  }
  if (unit === "mg/dL" && value > 600) {
    return IMPOSSIBLE("This value is unusually high for a home meter. Check the strip and unit, then repeat.");
  }
  if (unit === "mg/dL" && (value < 60 || value > 300)) {
    return SUSPICIOUS(
      "This glucose reading is unusual. Let’s check the basics — clean dry hands, a fresh in-date strip, and the correct unit — before we flag it."
    );
  }
  return OK();
}

export function validateSpO2(value: number): ValidationResult {
  if (Number.isNaN(value)) {
    return IMPOSSIBLE("Please enter a numeric oxygen saturation value.");
  }
  if (value > 100 || value < 40) {
    return IMPOSSIBLE("Oxygen saturation must be between 40 and 100%. Please check the number.");
  }
  if (value < 92) {
    return SUSPICIOUS(
      "This oxygen reading is low. Cold hands, nail polish, movement, or sensor position can affect it. Let’s repeat it carefully."
    );
  }
  return OK();
}

export function validateHeartRate(value: number): ValidationResult {
  if (Number.isNaN(value)) return IMPOSSIBLE("Please enter a numeric heart rate.");
  if (value > 250 || value < 25) {
    return IMPOSSIBLE("This heart rate is outside a measurable range. Please check the number.");
  }
  return OK();
}

export function validateWeightChange(today: number, baseline: number): ValidationResult {
  if (Number.isNaN(today) || today <= 0) return IMPOSSIBLE("Please enter a valid weight in kilograms.");
  const delta = today - baseline;
  if (Math.abs(delta) >= 2) {
    return SUSPICIOUS(
      "This weight change is larger than expected over a short period. Let’s confirm it on the same scale, before eating, after the bathroom."
    );
  }
  return OK();
}

export const verdictTone: Record<ValidationResult["verdict"], "green" | "amber" | "red"> = {
  ok: "green",
  suspicious: "amber",
  impossible: "red",
};
