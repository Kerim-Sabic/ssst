import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** A clean phone frame for the caregiver-notification preview. */
export function PhoneMock({ children, className, time = "08:42" }: { children: ReactNode; className?: string; time?: string }) {
  return (
    <div
      className={cn(
        "relative mx-auto w-[300px] rounded-[2.6rem] border border-slate-300/70 bg-navy p-2.5 shadow-lift",
        className
      )}
    >
      {/* side buttons */}
      <span className="absolute -left-[3px] top-24 h-12 w-[3px] rounded-l bg-slate-400/50" />
      <span className="absolute -right-[3px] top-20 h-8 w-[3px] rounded-r bg-slate-400/50" />
      <div className="relative overflow-hidden rounded-[2.1rem] bg-gradient-to-b from-slate-100 to-white">
        {/* status bar / notch */}
        <div className="flex items-center justify-between px-6 pt-3 pb-2 text-[11px] font-semibold text-navy">
          <span className="tnum">{time}</span>
          <span className="absolute left-1/2 top-2 h-5 w-24 -translate-x-1/2 rounded-full bg-navy" />
          <span className="flex items-center gap-1 text-navy/70">
            <span className="h-2.5 w-4 rounded-[2px] border border-navy/40" />
          </span>
        </div>
        <div className="px-3.5 pb-6 pt-2">{children}</div>
      </div>
    </div>
  );
}
