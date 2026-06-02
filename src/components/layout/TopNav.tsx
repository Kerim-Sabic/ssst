import { motion } from "framer-motion";
import { ArrowRight, Presentation } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { useApp } from "@/lib/appContext";
import { navigate } from "@/lib/router";
import { ease } from "@/lib/motion";
import { cn } from "@/lib/cn";

const navLinks = [
  { label: "Product", screen: "landing" as const },
  { label: "Demo", screen: "checkin" as const },
  { label: "Doctor summary", screen: "doctor" as const },
  { label: "Safety", screen: "result" as const },
];

export function TopNav() {
  const { go, screen, restart, beginDemo } = useApp();
  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease }}
      className="sticky top-0 z-[80] border-b border-line/70 bg-bg/80 glass-line"
    >
      <div className="shell flex h-16 items-center justify-between gap-4">
        <button onClick={restart} className="rounded-lg" aria-label="CareSignal home">
          <Logo />
        </button>

        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((l) => (
            <button
              key={l.label}
              onClick={() => go(l.screen)}
              className={cn(
                "rounded-lg px-3 py-2 text-sm font-medium text-muted transition-colors hover:text-ink hover:bg-soft",
                screen === l.screen && "text-ink"
              )}
            >
              {l.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/pitchdeck")}
            className="hidden items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-muted transition-colors hover:bg-soft hover:text-ink sm:inline-flex"
          >
            <Presentation className="h-4 w-4 text-signal-deep" />
            Pitch deck
          </button>
          <Badge tone="signal" className="hidden lg:inline-flex">
            Demo prototype
          </Badge>
          <Button size="sm" onClick={() => beginDemo("onboarding")} iconRight={<ArrowRight className="h-4 w-4" />}>
            Start demo
          </Button>
        </div>
      </div>
    </motion.header>
  );
}
