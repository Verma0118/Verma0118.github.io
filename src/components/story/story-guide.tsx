import { useEffect, useRef } from "react";
import { motion, useTransform, useMotionValueEvent, useReducedMotion, type MotionValue } from "framer-motion";
import {
  guidePoses, guideCallouts, guideModelUrl, guideModelAlt, storyBeats,
  mountModelUrl, mountModelAlt, mountBeatId,
} from "@/data/story";
import { useMediaQuery, DESKTOP_QUERY } from "@/hooks/use-media-query";

/**
 * The interceptor that threads the whole story act.
 *
 * One <model-viewer> in a fixed layer. Scroll position drives its offset,
 * size, camera orbit, camera target and exposure, so a single object appears
 * to be inspected rather than spun. Each beat has a genuinely different
 * framing: wide establishing shot, then close on the nose, then in on a motor
 * arm, then back out to the whole system. An earlier version only swept
 * azimuth at a fixed distance and read as a turntable gimmick.
 *
 * Component callouts are hotspots anchored to surface coordinates measured by
 * raycasting the loaded model. The GLB is a single merged mesh with one
 * unnamed material, so individual parts cannot be isolated or recoloured; a
 * marker plus a camera move is the honest way to point at one.
 *
 * Deliberately inert:
 *  - no camera-controls and no auto-rotate, scroll is the only input
 *  - pointer-events-none, so it can never swallow a scroll or a click
 *  - aria-hidden, because it is decoration. Every callout repeats something
 *    already stated in the beat copy or on the page it links to.
 *
 * Z-index contract for the story act, lowest to highest:
 *   section backgrounds (auto) < guide (20) < beat content (30) < rail (40) < header (50)
 * The beat sections must not set a z-index of their own, or their content can
 * no longer rise above this layer.
 *
 * Progress and the beat stops are passed in. This component renders null until
 * the desktop media query resolves, and a `useScroll` of its own bound to the
 * document instead of the story container, so the model only ever reached
 * about four tenths of its travel and never faded out.
 */

/** Linear sample of a per-beat value against measured beat stops. */
function sample(v: number, stops: number[], values: number[]): number {
  if (v <= stops[0]) return values[0];
  const last = stops.length - 1;
  if (v >= stops[last]) return values[last];
  for (let i = 0; i < last; i++) {
    if (v >= stops[i] && v <= stops[i + 1]) {
      const span = stops[i + 1] - stops[i];
      const t = span <= 0 ? 0 : (v - stops[i]) / span;
      return values[i] + (values[i + 1] - values[i]) * t;
    }
  }
  return values[last];
}

/**
 * Extra per-beat motion layered on top of the pose interpolation, as a
 * function of how far through that beat the scroll is (0 to 1).
 *
 * The software beat is about a guidance law, so the model flies an arc across
 * its lane rather than sitting still: out, across and down, then back up. dx
 * stays small enough that the model never crosses into the 52% text lane.
 */
const BEAT_ARCS: Record<string, (t: number) => { dx: number; dy: number }> = {
  "story-software": (t) => ({
    dx: 2 * Math.cos(Math.PI * t),
    dy: 5 * Math.sin(Math.PI * t),
  }),
};

/** How far through beat `i` the scroll is, 0 to 1. */
function localProgress(v: number, stops: number[], i: number): number {
  const a = stops[i];
  const b = stops[i + 1] ?? 1;
  if (b <= a) return 0;
  return Math.min(1, Math.max(0, (v - a) / (b - a)));
}

export function StoryGuide({
  scrollYProgress,
  stopsRef,
  activeBeat,
}: {
  scrollYProgress: MotionValue<number>;
  stopsRef: React.MutableRefObject<number[]>;
  activeBeat: number;
}) {
  const mvRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const isDesktop = useMediaQuery(DESKTOP_QUERY);

  // Only values bound to `style` below may be motion values. A derived motion
  // value with no subscriber never recomputes, so camera-orbit silently stayed
  // on the hero pose while camera-target tracked correctly. Anything written
  // to the element as an attribute is sampled straight from progress instead.
  const arcAt = (v: number) => {
    const stops = stopsRef.current;
    let i = 0;
    for (let k = 0; k < storyBeats.length; k++) if (v >= stops[k]) i = k;
    const fn = BEAT_ARCS[storyBeats[i]?.id ?? ""];
    return fn ? fn(localProgress(v, stops, i)) : { dx: 0, dy: 0 };
  };

  const x = useTransform(scrollYProgress, (v) =>
    `${sample(v, stopsRef.current, guidePoses.map((p) => p.x)) + arcAt(v).dx}vw`);
  const y = useTransform(scrollYProgress, (v) =>
    `${sample(v, stopsRef.current, guidePoses.map((p) => p.y)) + arcAt(v).dy}vh`);
  const scale = useTransform(scrollYProgress, (v) =>
    sample(v, stopsRef.current, guidePoses.map((p) => p.scale)));

  // The electronics mount slides out of the fuselage.
  //
  // Timed against the approach, not the beat itself. A beat's composed framing
  // is at its own t = 0, when its top meets the viewport top, so anything that
  // should be settled by then has to animate on the way in. Keyed to the beat
  // span instead, the stack was still invisible exactly when the beat looked
  // its best.
  const mountIndex = storyBeats.findIndex((b) => b.id === mountBeatId);
  const mountWindow = (v: number) => {
    const stops = stopsRef.current;
    const here = stops[mountIndex];
    const prev = stops[mountIndex - 1] ?? 0;
    const next = stops[mountIndex + 1] ?? 1;
    const inSpan = here - prev;
    const outSpan = next - here;
    // -1 .. 0 approaching, 0 .. 1 inside the beat.
    return v < here
      ? (inSpan > 0 ? (v - here) / inSpan : 0)
      : (outSpan > 0 ? (v - here) / outSpan : 0);
  };
  const mountT = useTransform(scrollYProgress, mountWindow);
  // Out and settled by the time the beat lands, gone as it leaves.
  const mountOpacity = useTransform(mountT, [-0.5, -0.32, -0.05, 0.45, 0.7], [0, 0, 1, 1, 0]);
  // Starts buried in the fuselage and ends clear of it, below and right of
  // the airframe, so it reads as having come out rather than as a decal
  // sitting on the body.
  //
  // In vw/vh, not percentages: a percentage here is of the element's own box,
  // not the guide box, which put the stack straight back on the fuselage.
  const mountX = useTransform(mountT, [-0.45, -0.05], ["7vw", "19vw"]);
  const mountY = useTransform(mountT, [-0.45, -0.05], ["6vh", "27vh"]);
  const mountScale = useTransform(mountT, [-0.45, -0.05], [0.5, 1]);

  // Clears out before the handoff beat fills the screen, since that beat's
  // link grid runs full width and has no lane reserved for the model.
  const opacity = useTransform(scrollYProgress, (v) =>
    sample(v, stopsRef.current, [1, 1, 1, 1, 1, 0]));

  const targetFor = (v: number) => {
    const comp = (i: 0 | 1 | 2) => sample(v, stopsRef.current, guidePoses.map((p) => p.target[i]));
    return `${comp(0)}m ${comp(1)}m ${comp(2)}m`;
  };

  // Written straight to the element so scrolling never re-renders React.
  const writeCamera = () => {
    const el = mvRef.current;
    if (!el) return;
    const v = scrollYProgress.get();
    const of = (key: "azimuth" | "polar" | "radius" | "exposure") =>
      sample(v, stopsRef.current, guidePoses.map((p) => p[key]));
    el.setAttribute(
      "camera-orbit",
      `${of("azimuth").toFixed(2)}deg ${of("polar").toFixed(2)}deg ${of("radius").toFixed(4)}m`,
    );
    el.setAttribute("camera-target", targetFor(v));
    el.setAttribute("exposure", of("exposure").toFixed(3));
  };
  useMotionValueEvent(scrollYProgress, "change", writeCamera);

  // Reduced motion holds the design beat's framing.
  const rest = guidePoses[1];
  useEffect(() => {
    const el = mvRef.current;
    if (!el) return;
    if (reduce) {
      el.setAttribute("camera-orbit", `${rest.azimuth}deg ${rest.polar}deg ${rest.radius}m`);
      el.setAttribute("camera-target", `${rest.target[0]}m ${rest.target[1]}m ${rest.target[2]}m`);
      el.setAttribute("exposure", String(rest.exposure));
    } else {
      writeCamera();
    }
  }, [reduce, isDesktop]);

  // Phones get the model inline inside the design beat instead, so the heavy
  // asset is never loaded twice and never sits behind body copy.
  if (!isDesktop) return null;

  const beat = storyBeats[activeBeat];
  const callout = beat ? guideCallouts[beat.id] : undefined;

  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-0 z-20 pointer-events-none flex items-center justify-center"
      style={
        reduce
          ? { x: `${rest.x}vw`, y: `${rest.y}vh`, scale: rest.scale, opacity }
          : { x, y, scale, opacity, willChange: "transform" }
      }
    >
      {/* Width and offset are load-bearing: the canvas must clear the text
          lane on the left (52%) and stay inside the viewport on the right, or
          it covers the headline and clips the callout. Apparent size of the
          model comes from the camera radius, not from scaling this box. */}
      {/* The bottom fades out so the ground shadow never ends on a hard edge
          where the canvas stops. */}
      <div
        className="relative w-[46vw] h-[72vh]"
        style={{
          maskImage: "linear-gradient(to bottom, black 78%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 78%, transparent 100%)",
        }}
      >
        <model-viewer
          ref={mvRef}
          src={guideModelUrl}
          alt={guideModelAlt}
          camera-orbit={`${guidePoses[0].azimuth}deg ${guidePoses[0].polar}deg ${guidePoses[0].radius}m`}
          camera-target={`${guidePoses[0].target[0]}m ${guidePoses[0].target[1]}m ${guidePoses[0].target[2]}m`}
          exposure={guidePoses[0].exposure}
          environment-image="neutral"
          shadow-intensity="0.9"
          shadow-softness="0.8"
          tone-mapping="neutral"
          interaction-prompt="none"
          disable-zoom
          disable-tap
          disable-pan
          tabIndex={-1}
          class="w-full h-full block outline-none"
          style={{ pointerEvents: "none", backgroundColor: "transparent", ["--min-hotspot-opacity" as any]: "0.2" }}
        >
          <div slot="progress-bar" />
          {callout && (
            <div
              key={beat.id}
              slot="hotspot-callout"
              data-position={`${callout.position[0]}m ${callout.position[1]}m ${callout.position[2]}m`}
              data-normal={`${callout.normal[0]} ${callout.normal[1]} ${callout.normal[2]}`}
              className="flex flex-row-reverse items-center gap-2 whitespace-nowrap"
              style={{ pointerEvents: "none" }}
            >
              {/* Marker, leader and label. The leader is the Haylon accent: the
                  interceptor is the page's one bright moment. The label sits on
                  a paper plate so it stays legible over the white airframe. */}
              <span
                style={{
                  display: "block",
                  width: 7,
                  height: 7,
                  border: "1.5px solid var(--color-haylon)",
                  backgroundColor: "var(--color-paper)",
                  transform: "rotate(45deg)",
                }}
              />
              <span style={{ display: "block", width: 36, height: 1, backgroundColor: "var(--color-haylon)" }} />
              <span
                style={{
                  fontSize: 14,
                  color: "var(--color-ink)",
                  backgroundColor: "rgba(244,241,234,0.92)",
                  padding: "3px 8px",
                }}
              >
                {callout.label}
              </span>
            </div>
          )}
        </model-viewer>

        {/*
          Second viewer, mounted only while the build beat is active. The
          interceptor GLB is one merged mesh, so the stack inside it cannot be
          moved or pulled out; showing the real electronics-mount model sliding
          clear of the fuselage is the honest equivalent.
        */}
        {(activeBeat === mountIndex || activeBeat === mountIndex - 1) && !reduce && (
          <motion.div
            className="absolute left-0 top-0 w-[46%] h-[46%] pointer-events-none"
            style={{ x: mountX, y: mountY, scale: mountScale, opacity: mountOpacity }}
          >
            <model-viewer
              src={mountModelUrl}
              alt={mountModelAlt}
              camera-orbit="35deg 70deg auto"
              exposure="0.9"
              environment-image="neutral"
              shadow-intensity="0"
              tone-mapping="neutral"
              interaction-prompt="none"
              disable-zoom
              disable-tap
              disable-pan
              tabIndex={-1}
              class="w-full h-full block outline-none"
              style={{ pointerEvents: "none", backgroundColor: "transparent" }}
            >
              <div slot="progress-bar" />
            </model-viewer>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
