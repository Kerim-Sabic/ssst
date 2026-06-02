import { AnimatePresence, MotionConfig } from "framer-motion";
import { useCallback, useMemo, useState } from "react";
import { TopNav } from "@/components/layout/TopNav";
import { Footer } from "@/components/layout/Footer";
import { DemoPanel } from "@/components/layout/DemoPanel";
import { ToastProvider } from "@/components/ui/Toast";
import { TopProgress } from "@/components/ui/ProgressBar";
import { AppContext, flowOrder } from "@/lib/appContext";
import { defaultScenario } from "@/lib/scenarios";
import type { Scenario, ScreenId } from "@/lib/types";

import { LandingScreen } from "@/components/screens/LandingScreen";
import { OnboardingScreen } from "@/components/screens/OnboardingScreen";
import { ConditionScreen } from "@/components/screens/ConditionScreen";
import { JournalPlanScreen } from "@/components/screens/JournalPlanScreen";
import { CheckInScreen } from "@/components/screens/CheckInScreen";
import { ValidationScreen } from "@/components/screens/ValidationScreen";
import { AnalysisScreen } from "@/components/screens/AnalysisScreen";
import { RiskResultScreen } from "@/components/screens/RiskResultScreen";
import { TimelineScreen } from "@/components/screens/TimelineScreen";
import { CaregiverScreen } from "@/components/screens/CaregiverScreen";
import { DoctorSummaryScreen } from "@/components/screens/DoctorSummaryScreen";

const screens: Record<ScreenId, () => JSX.Element | null> = {
  landing: LandingScreen,
  onboarding: OnboardingScreen,
  conditions: ConditionScreen,
  plan: JournalPlanScreen,
  checkin: CheckInScreen,
  validation: ValidationScreen,
  analysis: AnalysisScreen,
  result: RiskResultScreen,
  timeline: TimelineScreen,
  caregiver: CaregiverScreen,
  doctor: DoctorSummaryScreen,
};

export default function App() {
  const [screen, setScreen] = useState<ScreenId>("landing");
  const [scenario, setScenario] = useState<Scenario>(defaultScenario);
  const [selectedConditions, setSelectedConditions] = useState<string[]>([
    "heart-failure",
    "hypertension",
  ]);

  const scrollTop = () =>
    window.scrollTo({ top: 0, behavior: "smooth" });

  const go = useCallback((next: ScreenId) => {
    setScreen(next);
    scrollTop();
  }, []);

  const next = useCallback(() => {
    setScreen((cur) => {
      const i = flowOrder.indexOf(cur);
      return flowOrder[Math.min(flowOrder.length - 1, i + 1)];
    });
    scrollTop();
  }, []);

  const back = useCallback(() => {
    setScreen((cur) => {
      const i = flowOrder.indexOf(cur);
      return flowOrder[Math.max(0, i - 1)];
    });
    scrollTop();
  }, []);

  const restart = useCallback(() => {
    setScenario(defaultScenario);
    setScreen("landing");
    scrollTop();
  }, []);

  const beginDemo = useCallback((target: ScreenId = "onboarding") => {
    setScenario(defaultScenario);
    setSelectedConditions(["heart-failure", "hypertension"]);
    setScreen(target);
    scrollTop();
  }, []);

  const selectScenario = useCallback((s: Scenario) => {
    setScenario(s);
    setScreen(s.entry);
    scrollTop();
  }, []);

  const value = useMemo(
    () => ({
      screen,
      scenario,
      selectedConditions,
      go,
      next,
      back,
      restart,
      beginDemo,
      selectScenario,
      setSelectedConditions,
    }),
    [screen, scenario, selectedConditions, go, next, back, restart, beginDemo, selectScenario]
  );

  const progress = (flowOrder.indexOf(screen) + 1) / flowOrder.length;
  const Screen = screens[screen];

  return (
    <AppContext.Provider value={value}>
      <MotionConfig reducedMotion="user">
        <ToastProvider>
          <TopProgress value={progress} />
          <div className="flex min-h-screen flex-col bg-bg">
            <TopNav />
            <div className="flex-1">
              <AnimatePresence mode="wait">
                <Screen key={screen} />
              </AnimatePresence>
            </div>
            {screen !== "analysis" && <Footer />}
          </div>
          <DemoPanel />
        </ToastProvider>
      </MotionConfig>
    </AppContext.Provider>
  );
}
