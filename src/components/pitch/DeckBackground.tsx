import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect } from "react";
import { SignalLine } from "./SignalLine";

/** Cinematic backdrop: clinical grid + faint drifting waveform + a soft
 *  radial light that gently follows the cursor on desktop. No blobs. */
export function DeckBackground() {
  const reduce = useReducedMotion();
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.3);
  const sx = useSpring(mx, { stiffness: 60, damping: 20 });
  const sy = useSpring(my, { stiffness: 60, damping: 20 });

  useEffect(() => {
    if (reduce) return;
    const onMove = (e: MouseEvent) => {
      mx.set(e.clientX / window.innerWidth);
      my.set(e.clientY / window.innerHeight);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my, reduce]);

  const xPct = useTransform(sx, (v) => `${(v * 100).toFixed(2)}%`);
  const yPct = useTransform(sy, (v) => `${(v * 100).toFixed(2)}%`);
  const light = useMotionTemplate`radial-gradient(680px circle at ${xPct} ${yPct}, rgba(20,184,166,0.07), transparent 62%)`;

  // subtle parallax for the two waveform layers
  const px1 = useTransform(sx, (v) => (v - 0.5) * -26);
  const py1 = useTransform(sy, (v) => (v - 0.5) * -16);
  const px2 = useTransform(sx, (v) => (v - 0.5) * 18);
  const py2 = useTransform(sy, (v) => (v - 0.5) * 12);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-bg" aria-hidden>
      {/* base wash */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-bg to-soft/40" />

      {/* clinical grid */}
      <div
        className="absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(15,23,42,0.035) 1px, transparent 1px), linear-gradient(to bottom, rgba(15,23,42,0.035) 1px, transparent 1px)",
          backgroundSize: "52px 52px",
          maskImage: "radial-gradient(ellipse 90% 70% at 50% 40%, #000 40%, transparent 85%)",
          WebkitMaskImage: "radial-gradient(ellipse 90% 70% at 50% 40%, #000 40%, transparent 85%)",
        }}
      />

      {/* mouse-follow radial light */}
      {!reduce && <motion.div className="absolute inset-0" style={{ background: light }} />}

      {/* faint drifting waveforms with parallax */}
      <motion.div className="absolute inset-x-0 top-[20%] h-40 opacity-70" style={{ x: px1, y: py1 }}>
        <SignalLine mode="drift" color="#14B8A6" strokeWidth={1.4} opacity={0.22} />
      </motion.div>
      <motion.div className="absolute inset-x-0 bottom-[15%] h-40 opacity-50" style={{ x: px2, y: py2 }}>
        <SignalLine mode="drift" color="#0B1B3A" strokeWidth={1.2} opacity={0.1} />
      </motion.div>

      {/* soft top + bottom vignette for depth */}
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/70 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-bg to-transparent" />
    </div>
  );
}
