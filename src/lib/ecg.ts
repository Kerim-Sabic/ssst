/**
 * Clinically-shaped ECG path generator.
 *
 * Produces an SVG path with believable P–QRS–T morphology rather than a
 * generic sine/zig-zag:
 *   • P wave  — smooth, upright, low-amplitude atrial depolarisation
 *   • PR seg  — isoelectric (flat) baseline
 *   • QRS     — small Q dip, sharp tall R, S dip (narrow in "normal")
 *   • ST seg  — isoelectric ("concern" depresses it)
 *   • T wave  — upright, slightly asymmetric repolarisation
 *
 * The "concern" variant widens/slurs the QRS, depresses the ST segment and
 * renders a tall, peaked T wave — the textbook look of ischaemia /
 * hyperkalaemia used to communicate a worsening rhythm.
 */

export type EcgVariant = "normal" | "concern";

export interface EcgPathOptions {
  beats?: number;
  /** horizontal length of one cardiac cycle, in path units */
  beatWidth?: number;
  height?: number;
  /** y of the isoelectric baseline (defaults to 62% down) */
  baseline?: number;
  /** R-wave height (defaults to 42% of height) */
  amplitude?: number;
  variant?: EcgVariant;
  /** flat lead-in before the first beat, in path units */
  leadFlat?: number;
}

export interface EcgPath {
  d: string;
  width: number;
  height: number;
  baseline: number;
}

export function ecgPath(opts: EcgPathOptions = {}): EcgPath {
  const beats = opts.beats ?? 4;
  const W = opts.beatWidth ?? 120;
  const H = opts.height ?? 120;
  const by = opts.baseline ?? H * 0.62;
  const A = opts.amplitude ?? H * 0.42;
  const variant = opts.variant ?? "normal";
  const lead = opts.leadFlat ?? 0;

  const P = H * 0.06; // P-wave amplitude (up)
  const Qd = H * 0.05; // Q depth (down)
  const Sd = H * 0.12; // S depth (down)
  const Tn = H * 0.14; // normal T amplitude
  const Tc = H * 0.26; // peaked (concern) T amplitude
  const stDep = variant === "concern" ? H * 0.09 : 0; // ST depression (down)
  const Tamp = variant === "concern" ? Tc : Tn;

  const cmds: string[] = [`M 0 ${by.toFixed(2)}`];
  if (lead > 0) cmds.push(`L ${lead.toFixed(2)} ${by.toFixed(2)}`);

  for (let i = 0; i < beats; i++) {
    const X = lead + i * W;
    const x = (f: number) => (X + f * W).toFixed(2);
    const y = (v: number) => v.toFixed(2);

    // PR lead-in (flat)
    cmds.push(`L ${x(0.1)} ${y(by)}`);
    // P wave (smooth bump)
    cmds.push(`Q ${x(0.16)} ${y(by - 2 * P)} ${x(0.22)} ${y(by)}`);
    // PR segment (flat)
    cmds.push(`L ${x(0.3)} ${y(by)}`);

    if (variant === "concern") {
      // wider, slurred QRS
      cmds.push(`L ${x(0.33)} ${y(by + Qd)}`); // Q
      cmds.push(`L ${x(0.39)} ${y(by - A)}`); // R (wide)
      cmds.push(`L ${x(0.45)} ${y(by + Sd)}`); // S
      cmds.push(`L ${x(0.5)} ${y(by + stDep)}`); // J point (depressed)
      cmds.push(`L ${x(0.6)} ${y(by + stDep)}`); // ST (depressed, flat)
      // peaked, pointed T
      cmds.push(
        `C ${x(0.64)} ${y(by + stDep - Tamp * 0.3)} ${x(0.69)} ${y(by - Tamp * 1.5)} ${x(0.74)} ${y(by)}`
      );
    } else {
      // narrow QRS
      cmds.push(`L ${x(0.33)} ${y(by + Qd)}`); // Q
      cmds.push(`L ${x(0.37)} ${y(by - A)}`); // R (sharp)
      cmds.push(`L ${x(0.41)} ${y(by + Sd)}`); // S
      cmds.push(`L ${x(0.44)} ${y(by)}`); // J point
      cmds.push(`L ${x(0.56)} ${y(by)}`); // ST (flat)
      // asymmetric T (gentle upstroke, steeper downstroke)
      cmds.push(
        `C ${x(0.62)} ${y(by - Tamp * 0.5)} ${x(0.7)} ${y(by - Tamp * 1.15)} ${x(0.76)} ${y(by)}`
      );
    }

    // baseline to end of beat
    cmds.push(`L ${x(1.0)} ${y(by)}`);
  }

  return { d: cmds.join(" "), width: lead + beats * W, height: H, baseline: by };
}

/** A single compact P–QRS–T beat for logos and icons. ViewBox: 0 0 32 24. */
export const ECG_ICON_PATH =
  "M2 13 H8 q1.2 -3.4 2.4 0 H13.4 l0.7 1.9 l1.1 -9.6 l1 11.1 l0.7 -3.4 H20.4 q1.4 -3.7 2.8 0 H30";

export const ECG_ICON_VIEWBOX = "0 0 32 24";
