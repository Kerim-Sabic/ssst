import { AnimatePresence, MotionConfig, motion, useReducedMotion } from "framer-motion";
import { Download, LayoutGrid, Maximize, NotebookPen, Timer } from "lucide-react";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { Logo } from "@/components/ui/Logo";
import { navigate } from "@/lib/router";
import { ease, slideVariants } from "@/lib/pitchMotion";
import { BuildContext } from "./buildContext";
import { DeckBackground } from "./DeckBackground";
import { SlideNavigation } from "./SlideNavigation";
import { PresenterNotes } from "./PresenterNotes";
import { SlideOverview } from "./SlideOverview";
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
import { SlideArchitecture } from "./slides/SlideArchitecture";
import { SlideSecurity } from "./slides/SlideSecurity";
import { SlideSafety } from "./slides/SlideSafety";
import { SlideRoadmap } from "./slides/SlideRoadmap";
import { Slide10Closing } from "./slides/Slide10Closing";

interface DeckSlide {
  title: string;
  note: string;
  /** number of manual reveal steps the slide supports (0 = none) */
  builds?: number;
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
    note: "The app does not ask everything. It asks what matters for that patient — tap the disease packs to rebuild the journal live.",
    render: () => <Slide04Solution />,
  },
  {
    title: "Measure Again",
    note: "Our differentiator. Press → to step through: flagged reading → coach a correct repeat → still high → combine with the journal.",
    builds: 3,
    render: () => <Slide05MeasureAgain />,
  },
  {
    title: "Demo patient",
    note: "CareSignal compares the patient to their baseline, not only generic thresholds.",
    render: () => <Slide06Patient />,
  },
  {
    title: "Pattern detection",
    note: "We are not diagnosing. Press → to converge the signals into one risk picture, then reveal the abnormal rhythm.",
    builds: 2,
    render: () => <Slide07Pattern />,
  },
  {
    title: "Workflow",
    note: "Press → to walk it: patient action → caregiver alert → doctor summary. The same entry serves all three.",
    builds: 2,
    render: () => <Slide08Workflow />,
  },
  {
    title: "Why this wins",
    note: "Simple enough for a hackathon, strong enough to become a real chronic-care platform.",
    render: () => <Slide09Why />,
  },
  {
    title: "Architecture",
    note: "The demo runs the real, deterministic logic on-device. Going to production is wiring — a secure API, encrypted store, device BLE and FHIR — not reinventing the model.",
    render: () => <SlideArchitecture />,
  },
  {
    title: "Security & privacy",
    note: "Chronic-care data is lifelong and sensitive. Encryption everywhere, patient-controlled consent, data minimization, EU residency, and GDPR / HIPAA alignment. The prototype stores nothing.",
    render: () => <SlideSecurity />,
  },
  {
    title: "Medical safety",
    note: "This is the credibility slide. It never diagnoses; Measure-Again cuts false alarms; flags are baseline- and guideline-anchored; red flags escalate to urgent help; humans stay in the loop; validated before any claims.",
    render: () => <SlideSafety />,
  },
  {
    title: "Roadmap",
    note: "Given a 3-month runway: Month 1 secure backend + real devices; Month 2 caregiver/doctor apps + a clinic pilot; Month 3 validation, compliance sign-off, and a downloadable beta patients can actually use.",
    render: () => <SlideRoadmap />,
  },
  {
    title: "Closing",
    note: "CareSignal gives patients, caregivers, and doctors the same thing: earlier clarity.",
    render: ({ openDemo }) => <Slide10Closing onOpenDemo={openDemo} />,
  },
];

const INTRO_KEY = "caresignal_deck_intro_seen";

function readHashIndex(): number {
  const raw = window.location.hash.replace(/[^0-9]/g, "");
  const n = parseInt(raw, 10);
  if (Number.isFinite(n) && n >= 1 && n <= deck.length) return n - 1;
  return 0;
}

export function PitchDeck() {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(readHashIndex);
  const [direction, setDirection] = useState(1);
  const [build, setBuild] = useState(0);
  const [notesOpen, setNotesOpen] = useState(false);
  const [overviewOpen, setOverviewOpen] = useState(false);
  const [intro, setIntro] = useState(() => {
    try {
      return !window.sessionStorage.getItem(INTRO_KEY);
    } catch {
      return true;
    }
  });

  const total = deck.length;
  const current = deck[index];
  const currentBuilds = current.builds ?? 0;

  // refs for keyboard handlers (always-fresh)
  const introRef = useRef(intro);
  introRef.current = intro;
  const indexRef = useRef(index);
  indexRef.current = index;
  const buildRef = useRef(build);
  buildRef.current = build;

  const openDemo = useCallback(() => navigate("/"), []);
  const isStandalone = typeof window !== "undefined" && !!window.__CS_STANDALONE__;
  const downloadDeck = useCallback(() => {
    const a = document.createElement("a");
    a.href = "/caresignal-pitchdeck.html";
    a.download = "CareSignal-Pitchdeck.html";
    document.body.appendChild(a);
    a.click();
    a.remove();
  }, []);

  const paginate = useCallback(
    (target: number, atBuild = 0) => {
      const next = Math.max(0, Math.min(total - 1, target));
      setDirection(next >= indexRef.current ? 1 : -1);
      setIndex(next);
      setBuild(atBuild);
    },
    [total]
  );

  const advance = useCallback(() => {
    const builds = deck[indexRef.current].builds ?? 0;
    if (buildRef.current < builds) setBuild((b) => b + 1);
    else paginate(indexRef.current + 1, 0);
  }, [paginate]);

  const retreat = useCallback(() => {
    if (buildRef.current > 0) setBuild((b) => b - 1);
    else paginate(indexRef.current - 1, deck[Math.max(0, indexRef.current - 1)].builds ?? 0);
  }, [paginate]);

  // presenter timer
  const startRef = useRef(Date.now());
  const [elapsed, setElapsed] = useState(0);
  useEffect(() => {
    const id = window.setInterval(() => setElapsed(Math.floor((Date.now() - startRef.current) / 1000)), 1000);
    return () => window.clearInterval(id);
  }, []);

  const restart = useCallback(() => {
    startRef.current = Date.now();
    setElapsed(0);
    paginate(0, 0);
  }, [paginate]);

  const toggleFullscreen = useCallback(() => {
    try {
      if (!document.fullscreenElement) void document.documentElement.requestFullscreen?.();
      else void document.exitFullscreen?.();
    } catch {
      /* fullscreen not allowed */
    }
  }, []);

  // persist current slide in the URL hash
  useEffect(() => {
    try {
      window.history.replaceState(null, "", `${window.location.pathname}#${index + 1}`);
    } catch {
      /* ignore */
    }
  }, [index]);

  // dismiss intro (auto), remembering for the session
  const dismissIntro = useCallback(() => {
    setIntro(false);
    try {
      window.sessionStorage.setItem(INTRO_KEY, "1");
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    if (!intro) return;
    const t = window.setTimeout(dismissIntro, reduce ? 300 : 1700);
    return () => window.clearTimeout(t);
  }, [intro, reduce, dismissIntro]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (introRef.current && e.key !== "Tab") {
        dismissIntro();
        return;
      }
      if (e.key === "o" || e.key === "O") {
        setOverviewOpen((o) => !o);
        return;
      }
      switch (e.key) {
        case "ArrowRight":
        case "PageDown":
        case " ":
          e.preventDefault();
          advance();
          break;
        case "ArrowLeft":
        case "PageUp":
          e.preventDefault();
          retreat();
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
          paginate(0, 0);
          break;
        case "End":
          paginate(total - 1, 0);
          break;
        default:
          break;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [advance, retreat, restart, openDemo, toggleFullscreen, paginate, total, dismissIntro]);

  const mm = String(Math.floor(elapsed / 60)).padStart(2, "0");
  const ss = String(elapsed % 60).padStart(2, "0");

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
            <span className="hidden items-center gap-1.5 rounded-full border border-line/80 bg-surface/80 px-2.5 py-1 text-[11px] font-semibold text-signal-deep shadow-soft backdrop-blur-sm sm:inline-flex">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-signal" />
              </span>
              Pitch mode
            </span>
            <span className="tnum inline-flex items-center gap-1.5 rounded-full border border-line/80 bg-surface/80 px-2.5 py-1 text-[11px] font-semibold text-muted shadow-soft backdrop-blur-sm">
              <Timer className="h-3 w-3" /> {mm}:{ss}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {!isStandalone && (
              <motion.button
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.96 }}
                onClick={downloadDeck}
                title="Download the deck as one self-contained file (opens offline, all animations)"
                className="hidden h-9 items-center gap-2 rounded-xl border border-line/80 bg-surface/80 px-3.5 text-[13px] font-semibold text-navy shadow-soft backdrop-blur-sm transition-colors hover:border-signal/40 sm:inline-flex"
              >
                <Download className="h-4 w-4 text-signal-deep" /> Download deck
              </motion.button>
            )}
            <IconButton label="Slide overview (O)" active={overviewOpen} onClick={() => setOverviewOpen((o) => !o)}>
              <LayoutGrid className="h-4 w-4" />
            </IconButton>
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
            <motion.div key={index} custom={direction} variants={slideVariants} initial="initial" animate="animate" exit="exit">
              <BuildContext.Provider value={{ step: build, total: currentBuilds, set: setBuild }}>
                {current.render({ openDemo })}
              </BuildContext.Provider>
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

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: intro ? 0 : 1 }} transition={{ duration: 0.5, delay: intro ? 0 : 0.3 }}>
          <SlideNavigation
            index={index}
            total={total}
            builds={currentBuilds}
            buildStep={build}
            hideDemo={isStandalone}
            nextTitle={index < total - 1 ? deck[index + 1].title : undefined}
            onPrev={retreat}
            onNext={advance}
            onJump={(i) => paginate(i, 0)}
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

        <SlideOverview
          open={overviewOpen}
          titles={deck.map((d) => d.title)}
          index={index}
          onJump={(i) => paginate(i, 0)}
          onClose={() => setOverviewOpen(false)}
        />

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
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, ease }}>
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
