import type { RiskLevel } from "./types";

export interface RiskTheme {
  label: string;
  badge: string;
  text: string;
  border: string;
  softBg: string;
  line: string;
  glow: string;
  ring: string;
  dot: string;
  fg: string; // strong foreground color hex for charts
}

export const riskTheme: Record<RiskLevel, RiskTheme> = {
  green: {
    label: "Stable",
    badge: "GREEN",
    text: "text-stable",
    border: "border-stable/30",
    softBg: "bg-stable-soft",
    line: "border-stable/20",
    glow: "shadow-[0_24px_70px_-20px_rgba(16,185,129,0.35)]",
    ring: "ring-stable/25",
    dot: "bg-stable",
    fg: "#10B981",
  },
  amber: {
    label: "Watch",
    badge: "AMBER",
    text: "text-watch",
    border: "border-watch/30",
    softBg: "bg-watch-soft",
    line: "border-watch/20",
    glow: "shadow-[0_24px_70px_-20px_rgba(245,158,11,0.4)]",
    ring: "ring-watch/30",
    dot: "bg-watch",
    fg: "#F59E0B",
  },
  red: {
    label: "Concerning",
    badge: "RED",
    text: "text-concern",
    border: "border-concern/30",
    softBg: "bg-concern-soft",
    line: "border-concern/20",
    glow: "shadow-[0_24px_70px_-18px_rgba(239,68,68,0.42)]",
    ring: "ring-concern/30",
    dot: "bg-concern",
    fg: "#EF4444",
  },
};

export const toneText: Record<RiskLevel | "neutral", string> = {
  green: "text-stable",
  amber: "text-watch",
  red: "text-concern",
  neutral: "text-muted",
};

export const toneSoftBg: Record<RiskLevel | "neutral", string> = {
  green: "bg-stable-soft",
  amber: "bg-watch-soft",
  red: "bg-concern-soft",
  neutral: "bg-soft",
};

export const toneIconWrap: Record<RiskLevel | "neutral", string> = {
  green: "bg-stable-soft text-stable",
  amber: "bg-watch-soft text-watch",
  red: "bg-concern-soft text-concern",
  neutral: "bg-soft text-muted",
};
