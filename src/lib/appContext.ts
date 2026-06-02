import { createContext, useContext } from "react";
import type { Scenario, ScreenId } from "./types";

export interface AppState {
  screen: ScreenId;
  scenario: Scenario;
  /** disease packs chosen on the condition screen */
  selectedConditions: string[];
  go: (screen: ScreenId) => void;
  next: () => void;
  back: () => void;
  restart: () => void;
  /** Reset to the flagship scenario and jump to a given start screen. */
  beginDemo: (screen?: ScreenId) => void;
  selectScenario: (scenario: Scenario) => void;
  setSelectedConditions: (ids: string[]) => void;
}

export const AppContext = createContext<AppState | null>(null);

export function useApp(): AppState {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppContext");
  return ctx;
}

/** Canonical linear order used by the marketing → check-in portion. */
export const flowOrder: ScreenId[] = [
  "landing",
  "onboarding",
  "conditions",
  "plan",
  "checkin",
  "validation",
  "analysis",
  "result",
  "timeline",
  "caregiver",
  "doctor",
];
