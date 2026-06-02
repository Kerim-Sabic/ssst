import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import type { ReactNode } from "react";
import { pageVariants } from "@/lib/motion";
import { cn } from "@/lib/cn";

/** Standard screen wrapper with the signature page transition. */
export function ScreenShell({
  children,
  className,
  narrow,
}: {
  children: ReactNode;
  className?: string;
  narrow?: boolean;
}) {
  return (
    <motion.main
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className={cn("shell py-10 sm:py-14", narrow && "max-w-narrow", className)}
    >
      {children}
    </motion.main>
  );
}

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("mb-3 flex items-center gap-2", className)}>
      <span className="h-1.5 w-1.5 rounded-full bg-signal" />
      <span className="label-eyebrow">{children}</span>
    </div>
  );
}

const journeyLabels = ["Setup", "Conditions", "Plan", "Check-in", "Analysis", "Result"];

/** Compact progress rail for the guided demo journey. */
export function JourneySteps({ active }: { active: number }) {
  return (
    <div className="mb-7 flex items-center gap-2">
      {journeyLabels.map((label, i) => {
        const done = i < active;
        const current = i === active;
        return (
          <div key={label} className="flex items-center gap-2">
            <div
              className={cn(
                "flex items-center gap-2 rounded-full px-2.5 py-1 text-[12px] font-semibold transition-colors",
                current && "bg-navy text-white",
                done && "text-signal-deep",
                !current && !done && "text-muted"
              )}
            >
              <span
                className={cn(
                  "grid h-4 w-4 place-items-center rounded-full text-[9px]",
                  current && "bg-white/20 text-white",
                  done && "bg-signal-50 text-signal-deep",
                  !current && !done && "bg-soft text-muted"
                )}
              >
                {done ? "✓" : i + 1}
              </span>
              <span className="hidden sm:inline">{label}</span>
            </div>
            {i < journeyLabels.length - 1 && (
              <span className={cn("h-px w-3 sm:w-5", done ? "bg-signal/40" : "bg-line")} />
            )}
          </div>
        );
      })}
    </div>
  );
}

/** The required, always-visible safety disclaimer. Never tiny gray text. */
export function SafetyNote({ className, variant = "card" }: { className?: string; variant?: "card" | "inline" }) {
  if (variant === "inline") {
    return (
      <p className={cn("flex items-start gap-2 text-[13px] leading-relaxed text-muted", className)}>
        <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-signal-deep" />
        <span>
          <span className="font-semibold text-ink">CareSignal does not diagnose.</span> It helps organize
          warning signs and suggests when to contact a healthcare professional.
        </span>
      </p>
    );
  }
  return (
    <div
      className={cn(
        "flex items-start gap-3 rounded-2xl border border-line/80 bg-soft/60 px-4 py-3.5",
        className
      )}
    >
      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-signal-50 text-signal-deep">
        <ShieldCheck className="h-4 w-4" />
      </span>
      <p className="text-[13px] leading-relaxed text-slate-600">
        <span className="font-semibold text-ink">CareSignal does not diagnose.</span> It helps organize
        warning signs and suggests when to contact a healthcare professional. Seek urgent help if severe
        symptoms appear.
      </p>
    </div>
  );
}
