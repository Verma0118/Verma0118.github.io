import { useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { ScrollFade } from "@/components/ui/scroll-fade";
import { useMediaQuery, DESKTOP_QUERY } from "@/hooks/use-media-query";
import { currentPaper, type PaperPage } from "@/data/portfolio";
import type { StoryBeat } from "@/data/story";

/**
 * The current main project's paper, as a stack of pages.
 *
 * Three pages lie fanned in the text lane with their edges showing, and a
 * fourth card at the end of the stack links to the full PDF. Hovering or
 * focusing a page pulls a copy of it out of the stack: it flies from its slot
 * to the right half of the screen at reading size, and the page that was
 * there fades out in place. The stack always keeps all three pages.
 *
 * Selection is sticky rather than tied to hover-out. A page that moved away
 * from the cursor and then snapped back on mouse-leave would flicker.
 *
 * The guide fades out on this beat, so the right half is free. On phones
 * there is no reader: the pages sit in a swipeable row and each opens the PDF
 * at that page.
 */

const PAGE_RATIO = "935 / 1210";
// Fan: slight rotation per slot so the edges read as separate sheets.
const ROTATE = [-5, -1.5, 2.5];

function pageHref(p: PaperPage) {
  return `${currentPaper.pdfUrl}#page=${p.page}`;
}

function ReadMoreCard({ className = "" }: { className?: string }) {
  return (
    <a
      href={currentPaper.pdfUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`group flex flex-col justify-between bg-paper-2 border border-rule p-4 lg:p-5 focus-ring ${className}`}
      style={{ aspectRatio: PAGE_RATIO }}
    >
      <span className="text-[13px] lg:text-[14px] text-ink-2 leading-snug">{currentPaper.status}</span>
      <span className="font-display text-ink leading-[1.1] text-[20px] lg:text-[24px]" style={{ fontWeight: 350 }}>
        Read the full paper
      </span>
      <span className="flex items-center justify-between text-[13px] lg:text-[14px] text-ink-2">
        {currentPaper.pageCount} pages, PDF
        <ArrowUpRight className="w-4 h-4 text-ink transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={1.5} aria-hidden="true" />
      </span>
    </a>
  );
}

type Flight = { x: number; y: number; scale: number; rotate: number } | null;

// Slow enough to follow with the eye: the page leaves the stack and settles.
const FLY = { duration: 1.05, ease: [0.45, 0, 0.2, 1] } as const;
const FADE = { duration: 0.6, ease: "easeOut" } as const;

function DesktopStack({ beat }: { beat: StoryBeat }) {
  const reduce = useReducedMotion();
  const pages = currentPaper.pages;
  const [view, setView] = useState<{ page: number; from: Flight }>({ page: pages[0].page, from: null });
  const slotRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const readerRef = useRef<HTMLDivElement>(null);
  const current = pages.find((p) => p.page === view.page)!;

  // The stack always keeps its three pages. Selecting one sends a copy out of
  // its slot to the reader: measure the slot and the reader, start the copy at
  // the slot's size and position, and let it travel to rest. The page that was
  // being read fades where it is instead of flying back.
  function select(i: number) {
    const page = pages[i].page;
    if (page === view.page) return;
    const slot = slotRefs.current[i]?.getBoundingClientRect();
    const reader = readerRef.current?.getBoundingClientRect();
    let from: Flight = null;
    if (!reduce && slot && reader && reader.width > 0) {
      from = {
        x: slot.left + slot.width / 2 - (reader.left + reader.width / 2),
        y: slot.top + slot.height / 2 - (reader.top + reader.height / 2),
        scale: slot.width / reader.width,
        rotate: ROTATE[i],
      };
    }
    setView({ page, from });
  }

  return (
    <div className="flex items-center gap-[4vw] min-h-[calc(100dvh-14rem)]">
      {/* Text lane: copy, then the stack. */}
      <div className="story-lane">
        <ScrollFade>
          <h2
            id={`${beat.id}-heading`}
            className="text-ink mb-6 leading-[1.06]"
            style={{ fontSize: "clamp(2.25rem, 4.4vw, 3.75rem)", fontWeight: 300 }}
          >
            {beat.heading}
          </h2>
          <span aria-hidden="true" className="block w-16 h-px bg-haylon mb-6" />
          <p className="text-[19px] leading-relaxed max-w-[48ch] mb-14 text-ink-2">{beat.body}</p>
        </ScrollFade>

        <ScrollFade delay={0.1}>
          <p id="paper-stack-hint" className="text-[15px] text-ink-2 mb-6">
            Hover a page to pull it out and read it.
          </p>
          <ul
            aria-describedby="paper-stack-hint"
            className="relative list-none p-0 m-0 h-[calc(var(--w)*1.36)] [--w:clamp(110px,calc((52vw_-_var(--lane-left)_-_2rem)_/_3.15),190px)] [--step:calc(var(--w)*0.5)]"
          >
            {pages.map((p, i) => {
              const isOut = p.page === view.page;
              return (
                <li
                  key={p.page}
                  className="absolute top-0"
                  style={{ left: `calc(${i} * var(--step))`, width: "var(--w)", zIndex: i + 1 }}
                >
                  <button
                    ref={(el) => {
                      slotRefs.current[i] = el;
                    }}
                    type="button"
                    onMouseEnter={() => select(i)}
                    onFocus={() => select(i)}
                    onClick={() => select(i)}
                    aria-pressed={isOut}
                    aria-label={`Read page ${p.page}, ${p.label}`}
                    className="group relative block w-full text-left focus-ring"
                    style={{ aspectRatio: PAGE_RATIO }}
                  >
                    {/* The page being read sits lifted, so the stack shows which one is open. */}
                    <img
                      src={p.src}
                      alt=""
                      draggable={false}
                      className={`absolute inset-0 w-full h-full object-cover bg-white border shadow-[0_6px_18px_-8px_rgba(60,50,30,0.35)] transition-transform duration-500 ease-out group-hover:-translate-y-3 ${
                        isOut ? "-translate-y-3 border-ink-3" : "border-rule"
                      }`}
                      style={{ rotate: `${ROTATE[i]}deg` }}
                    />
                  </button>
                </li>
              );
            })}
            <li
              className="absolute top-0"
              style={{ left: `calc(${pages.length - 1} * var(--step) + var(--w) + 2rem)`, width: "var(--w)", zIndex: pages.length + 1 }}
            >
              <ReadMoreCard className="w-full" />
            </li>
          </ul>
        </ScrollFade>
      </div>

      {/* Reader: the page that was pulled out, at reading size. */}
      <div className="flex-1 flex justify-center items-center">
        <figure className="m-0 w-[min(100%,calc(64dvh*0.773))]">
          <div ref={readerRef} className="relative" style={{ aspectRatio: PAGE_RATIO }}>
            <AnimatePresence initial={false}>
              <motion.a
                key={current.page}
                href={pageHref(current)}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-0 block focus-ring"
                aria-label={`Open page ${current.page} of the paper, ${current.label}, as a PDF`}
                initial={view.from ? { ...view.from, opacity: 1 } : { opacity: 0 }}
                animate={{ x: 0, y: 0, scale: 1, rotate: 0, opacity: 1, transition: reduce ? { duration: 0 } : FLY }}
                exit={{ opacity: 0, transition: reduce ? { duration: 0 } : FADE }}
              >
                <img
                  src={current.src}
                  alt={current.alt}
                  draggable={false}
                  className="w-full h-full object-cover bg-white border border-rule shadow-[0_24px_60px_-24px_rgba(60,50,30,0.45)]"
                />
              </motion.a>
            </AnimatePresence>
          </div>
          <figcaption className="mt-4 flex items-baseline justify-between gap-4 text-[15px] text-ink-2" aria-live="polite">
            <span>
              Page {current.page} of {currentPaper.pageCount}, {current.label}
            </span>
            <a href={pageHref(current)} target="_blank" rel="noopener noreferrer" className="text-ink link-rule focus-ring whitespace-nowrap">
              Open this page
            </a>
          </figcaption>
        </figure>
      </div>
    </div>
  );
}

function MobileStack({ beat }: { beat: StoryBeat }) {
  return (
    <>
      <ScrollFade>
        <h2 id={`${beat.id}-heading`} className="text-ink mb-6 leading-[1.06]" style={{ fontSize: "clamp(2.25rem, 9vw, 3rem)", fontWeight: 300 }}>
          {beat.heading}
        </h2>
        <span aria-hidden="true" className="block w-16 h-px bg-haylon mb-6" />
        <p className="text-[18px] leading-relaxed mb-10 text-ink-2">{beat.body}</p>
      </ScrollFade>
      <ul className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-px-6 list-none p-0 m-0 -mx-6 px-6 pb-4">
        {currentPaper.pages.map((p) => (
          <li key={p.page} className="snap-start shrink-0 w-[68vw]">
            <a href={pageHref(p)} target="_blank" rel="noopener noreferrer" className="block focus-ring">
              <img src={p.src} alt={p.alt} loading="lazy" className="w-full bg-white border border-rule" style={{ aspectRatio: PAGE_RATIO }} />
              <span className="block mt-2 text-[15px] text-ink-2">Page {p.page}, {p.label}</span>
            </a>
          </li>
        ))}
        <li className="snap-start shrink-0 w-[68vw]">
          <ReadMoreCard className="w-full" />
        </li>
      </ul>
    </>
  );
}

export function PaperBeat({ beat }: { beat: StoryBeat }) {
  const isDesktop = useMediaQuery(DESKTOP_QUERY);
  return (
    <section
      id={beat.id}
      aria-labelledby={`${beat.id}-heading`}
      className="relative min-h-[100dvh] flex items-center py-24 md:py-28 bg-paper"
    >
      <div className="story-pad w-full pr-6 lg:pr-12 relative z-30">
        {isDesktop ? <DesktopStack beat={beat} /> : <MobileStack beat={beat} />}
      </div>
    </section>
  );
}
