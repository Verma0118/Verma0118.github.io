import { motion, AnimatePresence } from "framer-motion";
import type { StoryBeat } from "@/data/story";

/**
 * Position indicator for the story act.
 *
 * A real in-page nav, not decoration: every node is a link to its beat, so
 * keyboard and screen reader users can move through the story in the same
 * jumps a mouse user gets. Node state is carried by fill, size and an
 * aria-current attribute, never by colour alone.
 *
 * Every beat shares the paper ground, so the rail is ink throughout.
 */
export function StoryRail({
  beats,
  activeIndex,
  visible,
}: {
  beats: StoryBeat[];
  activeIndex: number;
  visible: boolean;
}) {
  const ink = "var(--color-ink)";
  const dim = "var(--color-ink-2)";
  const line = "var(--color-rule)";

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          aria-label="Story progress"
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -8 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="hidden lg:flex fixed left-8 top-1/2 -translate-y-1/2 z-40 flex-col gap-1"
        >
          {beats.map((beat, i) => {
            const isActive = i === activeIndex;
            const isPassed = i < activeIndex;
            return (
              <a
                key={beat.id}
                href={`#${beat.id}`}
                aria-current={isActive ? "step" : undefined}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(beat.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                className="group flex items-center gap-3 py-1.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
                style={{ outlineColor: ink }}
              >
                <span
                  aria-hidden="true"
                  className="block shrink-0 transition-all duration-300"
                  style={{
                    width: isActive ? 18 : 10,
                    height: 2,
                    backgroundColor: isActive || isPassed ? ink : line,
                  }}
                />
                <span
                  className="text-[13px] transition-colors whitespace-nowrap"
                  style={{ color: isActive ? ink : dim, fontWeight: isActive ? 500 : 400 }}
                >
                  {beat.railLabel}
                </span>
              </a>
            );
          })}
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
