import { Logo } from "@/components/ui/Logo";
import { SafetyNote } from "@/components/ui/Bits";

export function Footer() {
  return (
    <footer className="mt-8 border-t border-line/70 bg-surface/60">
      <div className="shell flex flex-col gap-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div className="max-w-md">
          <Logo />
          <p className="mt-3 text-[13px] leading-relaxed text-muted">
            The daily journal that knows when something is wrong. Adaptive chronic-care monitoring with
            measurement validation and clear next steps.
          </p>
        </div>
        <div className="sm:max-w-sm">
          <SafetyNote variant="inline" />
          <p className="mt-3 text-[11px] text-muted">
            Demo prototype · all patients and data are fictional and simulated.
          </p>
        </div>
      </div>
    </footer>
  );
}
