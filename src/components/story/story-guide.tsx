import { useEffect, useRef } from "react";
import { motion, useTransform, useMotionValueEvent, useReducedMotion, type MotionValue } from "framer-motion";
import { guidePoses, guideModelUrl, guideModelAlt } from "@/data/story";
import { useMediaQuery, DESKTOP_QUERY } from "@/hooks/use-media-query";

/**
 * The interceptor that threads the whole story act.
 *
 * One <model-viewer> in a fixed layer. Scroll position drives its offset,
 * scale, orbit and exposure, so a single object appears to travel and turn
 * through every beat instead of a new visual appearing per screen.
 *
 * Deliberately inert:
 *  - no camera-controls and no auto-rotate, scroll is the only input
 *  - pointer-events-none, so it can never swallow a scroll or a click
 *  - aria-hidden, because it is decoration. The same model is available as a
 *    real, interactive viewer in the CAD section below.
 *
 * Z-index contract for the story act, lowest to highest:
 *   section backgrounds (auto) < guide (20) < beat content (30) < rail (40) < header (50)
 * The beat sections must not set a z-index of their own, or their content can
 * no longer rise above this layer.
 *
 * Progress is passed in rather than measured here. This component renders null
 * until the desktop media query resolves, and a `useScroll` of its own bound
 * to the document instead of the story container, so the model only ever
 * reached about four tenths of its travel and never faded out. The home page
 * owns the one measurement and both this and the rail read from it.
 */
export function StoryGuide({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  const mvRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const isDesktop = useMediaQuery(DESKTOP_QUERY);

  // Even spacing across the beats, so each pose lands as its beat fills the screen.
  const stops = guidePoses.map((_, i) => i / (guidePoses.length - 1));

  const x = useTransform(scrollYProgress, stops, guidePoses.map((p) => `${p.x}vw`));
  const y = useTransform(scrollYProgress, stops, guidePoses.map((p) => `${p.y}vh`));
  const scale = useTransform(scrollYProgress, stops, guidePoses.map((p) => p.scale));
  const azimuth = useTransform(scrollYProgress, stops, guidePoses.map((p) => p.azimuth));
  const exposure = useTransform(scrollYProgress, stops, guidePoses.map((p) => p.exposure));

  // Clears out before the handoff beat fills the screen, since that beat's
  // link grid runs full width and has no lane reserved for the model.
  const opacity = useTransform(scrollYProgress, [0, 0.82, 0.92], [1, 1, 0]);

  // Written straight to the element so scrolling never re-renders React.
  useMotionValueEvent(azimuth, "change", (v) => {
    mvRef.current?.setAttribute("camera-orbit", `${v.toFixed(2)}deg 75deg auto`);
  });
  useMotionValueEvent(exposure, "change", (v) => {
    mvRef.current?.setAttribute("exposure", v.toFixed(3));
  });

  // Reduced motion holds the feature pose from the design beat.
  const restPose = guidePoses[1];
  useEffect(() => {
    if (!reduce) return;
    const el = mvRef.current;
    if (!el) return;
    el.setAttribute("camera-orbit", `${restPose.azimuth}deg 75deg auto`);
    el.setAttribute("exposure", String(restPose.exposure));
  }, [reduce, restPose.azimuth, restPose.exposure]);

  // Phones get the model inline inside the design beat instead, so the heavy
  // asset is never loaded twice and never sits behind body copy.
  if (!isDesktop) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-0 z-20 pointer-events-none flex items-center justify-center"
      style={
        reduce
          ? { x: `${restPose.x}vw`, y: `${restPose.y}vh`, scale: restPose.scale, opacity }
          : { x, y, scale, opacity, willChange: "transform" }
      }
    >
      <div className="w-[34vw] h-[48vh] max-w-[560px]">
        <model-viewer
          ref={mvRef}
          src={guideModelUrl}
          alt={guideModelAlt}
          camera-orbit={`${guidePoses[0].azimuth}deg 75deg auto`}
          exposure={guidePoses[0].exposure}
          environment-image="neutral"
          shadow-intensity="0.35"
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
      </div>
    </motion.div>
  );
}
