import { createContext, useContext } from "react";

export interface BuildApi {
  /** current manual reveal step within the active slide (0-based) */
  step: number;
  /** total reveal steps this slide declares */
  total: number;
  /** jump to a specific step (used by in-slide Replay buttons) */
  set: (n: number) => void;
}

export const BuildContext = createContext<BuildApi>({ step: 0, total: 0, set: () => {} });

export function useBuild(): BuildApi {
  return useContext(BuildContext);
}
