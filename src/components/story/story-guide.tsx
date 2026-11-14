import { useEffect, useRef } from "react";
import { motion, useTransform, useMotionValueEvent, useReducedMotion, type MotionValue } from "framer-motion";
import { guidePoses, guideCallouts, guideModelUrl, guideModelAlt, storyBeats } from "@/data/story";
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
  const x = useTransform(scrollYProgress, (v) =>
    `${sample(v, stopsRef.current, guidePoses.map((p) => p.x))}vw`);
  const y = useTransform(scrollYProgress, (v) =>
    `${sample(v, stopsRef.current, guidePoses.map((p) => p.y))}vh`);
  const scale = useTransform(scrollYProgress, (v) =>
    sample(v, stopsRef.current, guidePoses.map((p) => p.scale)));

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
  const onDark = beat?.theme !== "cream";
  const ink = onDark ? "#f5f4f0" : "#111110";
  const chipBg = onDark ? "rgba(26,30,22,0.82)" : "rgba(238,236,234,0.88)";
  const chipBorder = onDark ? "#2e3328" : "#d0cec9";

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
      <div className="w-[40vw] h-[56vh] max-w-[700px]">
        <model-viewer
          ref={mvRef}
          src={guideModelUrl}
          alt={guideModelAlt}
          camera-orbit={`${guidePoses[0].azimuth}deg ${guidePoses[0].polar}deg ${guidePoses[0].radius}m`}
          camera-target={`${guidePoses[0].target[0]}m ${guidePoses[0].target[1]}m ${guidePoses[0].target[2]}m`}
          exposure={guidePoses[0].exposure}
          environment-image="neutral"
          shadow-intensity="0.3"
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
              <span
                style={{
                  display: "block",
                  width: 7,
                  height: 7,
                  backgroundColor: ink,
                  transform: "rotate(45deg)",
                }}
              />
              <span
                style={{
                  display: "block",
                  width: 26,
                  height: 1,
                  backgroundColor: chipBorder,
                }}
              />
              <span
                style={{
                  fontSize: 12,
                  letterSpacing: "0.01em",
                  color: ink,
                  backgroundColor: chipBg,
                  border: `1px solid ${chipBorder}`,
                  padding: "4px 9px",
                  backdropFilter: "blur(2px)",
                }}
              >
                {callout.label}
              </span>
            </div>
          )}
        </model-viewer>
      </div>
    </motion.div>
  );
}
