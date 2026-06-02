import { AnimatePresence, MotionConfig, motion, useReducedMotion } from "framer-motion";
import { Maximize, NotebookPen } from "lucide-react";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { Logo } from "@/components/ui/Logo";
import { navigate } from "@/lib/router";
import { ease, slideVariants } from "@/lib/pitchMotion";
import { DeckBackground } from "./DeckBackground";
import { SlideNavigation } from "./SlideNavigation";
import { PresenterNotes } from "./PresenterNotes";
import { SignalMark } from "./pitchShared";

import { Slide01Title } from "./slides/Slide01Title";
import { Slide02Problem } from "./slides/Slide02Problem";
import { Slide03Insight } from "./slides/Slide03Insight";
import { Slide04Solution } from "./slides/Slide04Solution";
import { Slide05MeasureAgain } from "./slides/Slide05MeasureAgain";
import { Slide06Patient } from "./slides/Slide06Patient";
import { Slide07Pattern } from "./slides/Slide07Pattern";
import { Slide08Workflow } from "./slides/Slide08Workflow";
import { Slide09Why } from "./slides/Slide09Why";
import { Slide10Closing } from "./slides/Slide10Closing";

interface DeckSlide {
  title: string;
  note: string;
  render: (ctx: { openDemo: () => void }) => JSX.Element;
}

const deck: DeckSlide[] = [
  {
    title: "Title",
    note: "CareSignal is not just a symptom diary. It turns daily chronic-disease entries into validated signals and clear next steps.",
    render: () => <Slide01Title />,
  },
  {
    title: "Problem",
    note: "The real problem is not lack of data. It is lack of interpretation and action.",
    render: () => <Slide02Problem />,
  },
  {
    title: "Insight",
    note: "Most apps store entries. CareSignal makes those entries actionable.",
    render: () => <Slide03Insight />,
  },
  {
    title: "Solution",
    note: "The app does not ask everything. It asks what matters for that patient — try toggling the disease packs.",
    render: () => <Slide04Solution />,
  },
  {
    title: "Measure Again",
    note: "This is our differentiator. Before escalating, CareSignal checks whether the measurement was taken correctly. Press Replay to run it live.",
    render: () => <Slide05MeasureAgain />,
  },
  {
    title: "Demo patient",
    note: "CareSignal compares the patient to their baseline, not only generic thresholds.",
    render: () => <Slide06Patient />,
  },
  {
    title: "Pattern detection",
    note: "We are not diagnosing. We are organizing warning signs into a clear escalation moment.",
    render: () => <Slide07Pattern />,
  },
  {
    title: "Workflow",
    note: "The same daily entry becomes useful to the patient, family, and clinical team.",
    render: () => <Slide08Workflow />,
  },
  {
    title: "Why this wins",
    note: "The product is simple enough for a hackathon, but strong enough to become a real chronic-care platform.",
    render: () => <Slide09Why />,
  },
  {
    title: "Closing",
    note: "CareSignal gives patients, caregivers, and doctors the same thing: earlier clarity.",
    render: ({ openDemo }) => <Slide10Closing onOpenDemo={openDemo} />,
  },
];

export function PitchDeck() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [notesOpen, setNotesOpen] = useState(false);
  const [intro, setIntro] = useState(true);
  const reduce = useReducedMotion();
  const total = deck.length;

  // refs so keyboard handlers always read the latest values
  const introRef = useRef(intro);
  introRef.current = intro;
  const indexRef = useRef(index);
  indexRef.current = index;

  const openDemo = useCallback(() => navigate("/"), []);

  const paginate = useCallback(
    (target: number) => {
      setIndex((cur) => {
        const next = Math.max(0, Math.min(total - 1, target));
        setDirection(next >= cur ? 1 : -1);
        return next;
      });
    },
    [total]
  );

  const goNext = useCallback(() => paginate(indexRef.current + 1), [paginate]);
  const goPrev = useCallback(() => paginate(indexRef.current - 1), [paginate]);
  const restart = useCallback(() => paginate(0), [paginate]);

  const toggleFullscreen = useCallback(() => {
    try {
      if (!document.fullscreenElement) void document.documentElement.requestFullscreen?.();
      else void document.exitFullscreen?.();
    } catch {
      /* fullscreen not allowed — ignore */
    }
  }, []);

  // dismiss the intro automatically
  useEffect(() => {
    if (!intro) return;
    const t = window.setTimeout(() => setIntro(false), reduce ? 350 : 1700);
    return () => window.clearTimeout(t);
  }, [intro, reduce]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (introRef.current && e.key !== "Tab") {
        setIntro(false);
        return;
      }
      switch (e.key) {
        case "ArrowRight":
        case "PageDown":
        case " ":
          e.preventDefault();
          goNext();
          break;
        case "ArrowLeft":
        case "PageUp":
          e.preventDefault();
          goPrev();
          break;
        case "r":
        case "R":
          restart();
          break;
        case "d":
        case "D":
          openDemo();
          break;
        case "p":
        case "P":
          setNotesOpen((o) => !o);
          break;
        case "f":
        case "F":
          toggleFullscreen();
          break;
        case "Home":
          paginate(0);
          break;
        case "End":
          paginate(total - 1);
          break;
        default:
          break;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goNext, goPrev, restart, openDemo, toggleFullscreen, paginate, total]);

  const current = deck[index];

  return (
    <MotionConfig reducedMotion="user">
      <div className="relative min-h-screen overflow-x-hidden text-ink">
        <DeckBackground />

        {/* top bar */}
        <motion.header
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: intro ? 0 : 1, y: intro ? -16 : 0 }}
          transition={{ duration: 0.5, ease, delay: intro ? 0 : 0.15 }}
          className="relative z-40 mx-auto flex w-full max-w-6xl items-center justify-between px-6 pt-6 sm:px-10"
        >
          <div className="flex items-center gap-3">
            <button onClick={openDemo} aria-label="Open live demo">
              <Logo animated={false} />
            </button>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-line/80 bg-surface/80 px-2.5 py-1 text-[11px] font-semibold text-signal-deep shadow-soft backdrop-blur-sm">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-signal" />
              </span>
              Pitch mode
            </span>
          </div>

          <div className="flex items-center gap-2">
            <IconButton label="Presenter notes (P)" active={notesOpen} onClick={() => setNotesOpen((o) => !o)}>
              <NotebookPen className="h-4 w-4" />
            </IconButton>
            <IconButton label="Fullscreen (F)" onClick={toggleFullscreen}>
              <Maximize className="h-4 w-4" />
            </IconButton>
          </div>
        </motion.header>

        {/* slides */}
        <div className="relative z-10 pb-28">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={index}
              custom={direction}
              variants={slideVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              {current.render({ openDemo })}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* teal signal sweep on each slide change */}
        <motion.div
          key={`sweep-${index}`}
          className="pointer-events-none fixed inset-x-0 bottom-[3px] z-30 h-px"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          <motion.div
            className="h-px w-1/3 bg-gradient-to-r from-transparent via-signal to-transparent"
            initial={{ x: "-40%" }}
            animate={{ x: "340%" }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: intro ? 0 : 1 }}
          transition={{ duration: 0.5, delay: intro ? 0 : 0.3 }}
        >
          <SlideNavigation
            index={index}
            total={total}
            onPrev={goPrev}
            onNext={goNext}
            onJump={paginate}
            onRestart={restart}
            onOpenDemo={openDemo}
          />
        </motion.div>

        <PresenterNotes
          open={notesOpen}
          note={current.note}
          title={current.title}
          index={index}
          total={total}
          onClose={() => setNotesOpen(false)}
        />

        {/* one-time cinematic intro */}
        <DeckIntro show={intro} />
      </div>
    </MotionConfig>
  );
}

function DeckIntro({ show }: { show: boolean }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="intro"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: "-100%", transition: { duration: 0.75, ease } }}
          className="fixed inset-0 z-[120] grid place-items-center bg-navy"
        >
          <div className="flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease }}
            >
              <SignalMark size={104} className="shadow-[0_30px_90px_-20px_rgba(20,184,166,0.6)]" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease, delay: 0.4 }}
              className="mt-6 text-[26px] font-extrabold tracking-tighter2 text-white"
            >
              Care<span className="text-signal">Signal</span>{" "}
              <span className="align-top text-[13px] font-semibold text-white/55">AI</span>
            </motion.div>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.9, ease, delay: 0.6 }}
              className="mt-4 h-[2px] w-40 origin-left rounded-full bg-gradient-to-r from-transparent via-signal to-transparent"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function IconButton({
  children,
  label,
  onClick,
  active,
}: {
  children: ReactNode;
  label: string;
  onClick: () => void;
  active?: boolean;
}) {
  return (
    <motion.button
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.94 }}
      onClick={onClick}
      aria-label={label}
      title={label}
      className={
        "grid h-9 w-9 place-items-center rounded-xl border border-line/80 shadow-soft backdrop-blur-sm transition-colors " +
        (active ? "bg-navy text-white" : "bg-surface/80 text-slate-600 hover:text-ink")
      }
    >
      {children}
    </motion.button>
  );
}
