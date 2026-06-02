import { AnimatePresence, motion } from "framer-motion";
import { Check, Info, ShieldCheck } from "lucide-react";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { ease } from "@/lib/motion";
import { cn } from "@/lib/cn";

type ToastTone = "default" | "success" | "info";

interface ToastItem {
  id: number;
  title: string;
  description?: string;
  tone: ToastTone;
}

interface ToastApi {
  toast: (t: { title: string; description?: string; tone?: ToastTone }) => void;
}

const ToastContext = createContext<ToastApi | null>(null);

export function useToast(): ToastApi {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}

const icons: Record<ToastTone, ReactNode> = {
  default: <ShieldCheck className="h-4 w-4 text-signal-deep" />,
  success: <Check className="h-4 w-4 text-stable" />,
  info: <Info className="h-4 w-4 text-navy" />,
};

export function ToastProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ToastItem[]>([]);
  const seq = useRef(0);

  const toast = useCallback<ToastApi["toast"]>(({ title, description, tone = "default" }) => {
    const id = ++seq.current;
    setItems((prev) => [...prev, { id, title, description, tone }]);
    window.setTimeout(() => {
      setItems((prev) => prev.filter((t) => t.id !== id));
    }, 3200);
  }, []);

  const api = useMemo(() => ({ toast }), [toast]);

  return (
    <ToastContext.Provider value={api}>
      {children}
      <div className="pointer-events-none fixed inset-x-0 bottom-5 z-[120] flex flex-col items-center gap-2.5 px-4 sm:bottom-7">
        <AnimatePresence>
          {items.map((t) => (
            <motion.div
              key={t.id}
              layout
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.97 }}
              transition={{ duration: 0.32, ease }}
              className="pointer-events-auto flex w-full max-w-sm items-start gap-3 rounded-2xl border border-line/80 bg-surface/95 px-4 py-3 shadow-lift glass-line"
            >
              <span
                className={cn(
                  "mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-lg",
                  t.tone === "success" ? "bg-stable-soft" : t.tone === "info" ? "bg-navy-50" : "bg-signal-50"
                )}
              >
                {icons[t.tone]}
              </span>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-ink">{t.title}</p>
                {t.description && (
                  <p className="mt-0.5 text-[13px] leading-snug text-muted">{t.description}</p>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}
