import { useEffect, useRef, useState } from "react";
import { useLocation } from "wouter";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, CheckCircle2, AlertTriangle, Clock, ChevronDown } from "lucide-react";
import { PublicLayout } from "@/components/layout/public-layout";
import { haylonFea, haylonBuildEntries, type BuildEntryData, type FeaStatus } from "@/data/portfolio";

// The icon and label carry the meaning; colour only reinforces it. Flag takes
// the semantic error red, the other two stay in ink.
const STATUS: Record<FeaStatus, { color: string; Icon: typeof CheckCircle2 }> = {
  pass: { color: "var(--color-ink)", Icon: CheckCircle2 },
  flag: { color: "var(--color-destructive)", Icon: AlertTriangle },
  preliminary: { color: "var(--color-ink-2)", Icon: Clock },
};

function StatusBadge({ status, label }: { status: FeaStatus; label: string }) {
  const { color, Icon } = STATUS[status];
  return (
    <span className="inline-flex items-center gap-1.5 text-[17px] whitespace-nowrap" style={{ color }}>
      <Icon className="w-4 h-4 shrink-0" strokeWidth={1.5} aria-hidden="true" />
      {label}
    </span>
  );
}

const TABS = [
  { id: "build", label: "Build log" },
  { id: "analysis", label: "Structural analysis" },
] as const;

type TabId = (typeof TABS)[number]["id"];

type Reveal = (delay?: number) => Record<string, unknown>;

function BuildEntry({ entry, reveal }: { entry: BuildEntryData; reveal: Reveal }) {
  const problemCols = entry.problems.length === 2 ? "md:grid-cols-2" : "md:grid-cols-3";
  return (
    <article
      id={entry.id}
      aria-labelledby={`${entry.id}-heading`}
      className="mb-24 last:mb-0 pt-16 first:pt-0 border-t border-rule first:border-t-0 scroll-mt-24"
    >
      <motion.div {...reveal()} className="mb-20">
        <p className="text-[17px] text-ink-2 mb-3">
          {entry.entry}, {entry.date}
        </p>
        <h2
          id={`${entry.id}-heading`}
          className="text-2xl md:text-3xl text-ink mb-5"
        >
          {entry.title}
        </h2>
        <p className="text-[18px] leading-relaxed text-ink-2 max-w-[65ch] mb-10">{entry.intro}</p>
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-px" style={{ backgroundColor: "var(--color-rule)", border: "1px solid var(--color-rule)" }}>
          {entry.workCompleted.map((item) => (
            <li key={item} className="p-6 text-[17px] leading-relaxed text-ink-2" style={{ backgroundColor: "var(--color-paper)" }}>
              {item}
            </li>
          ))}
        </ul>
      </motion.div>

      {/* Photos, and the clip when the entry has one */}
      <motion.section {...reveal()} aria-labelledby={`${entry.id}-photos-heading`} className="mb-24">
        <h3
          id={`${entry.id}-photos-heading`}
          className="text-2xl md:text-3xl text-ink mb-8"
        >
          From the bench
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {entry.photos.map((photo) => (
            <figure key={photo.src} className={photo.wide ? "sm:col-span-2 lg:col-span-3" : ""}>
              <a
                href={photo.src}
                target="_blank"
                rel="noopener noreferrer"
                className={`block relative overflow-hidden group focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink ${
                  photo.wide ? "aspect-[21/10]" : "aspect-square"
                }`}
                style={{ backgroundColor: "var(--color-graphite)" }}
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
                <span className="sr-only"> (opens full size in a new tab)</span>
              </a>
              <figcaption className="text-[15px] leading-relaxed text-ink-2 mt-2">{photo.caption}</figcaption>
            </figure>
          ))}
        </div>
        {entry.video && (
          <figure className="mt-10 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-start">
            <div className="md:col-span-4 lg:col-span-3">
              <video
                src={entry.video.src}
                poster={entry.video.poster}
                controls
                muted
                playsInline
                preload="none"
                aria-label={entry.video.label}
                className="block w-full"
                style={{ backgroundColor: "var(--color-graphite)" }}
              />
            </div>
            <figcaption className="md:col-span-8 lg:col-span-6">
              <p className="text-[17px] leading-relaxed text-ink-2 mb-3">{entry.video.caption}</p>
              <p className="text-[15px] leading-relaxed text-ink-2 max-w-[60ch]">{entry.video.description}</p>
            </figcaption>
          </figure>
        )}
      </motion.section>

      {/* Problems found */}
      <motion.section {...reveal()} aria-labelledby={`${entry.id}-problems-heading`} className={entry.changes ? "mb-24" : ""}>
        <h3
          id={`${entry.id}-problems-heading`}
          className="text-2xl md:text-3xl text-ink mb-8"
        >
          What broke, and why
        </h3>
        <div className={`grid grid-cols-1 ${problemCols} gap-px`} style={{ backgroundColor: "var(--color-rule)", border: "1px solid var(--color-rule)" }}>
          {entry.problems.map((p) => (
            <article key={p.problem} className="p-6 md:p-8 flex flex-col" style={{ backgroundColor: "var(--color-paper)" }}>
              <h4 className="text-lg font-display text-ink mb-4">{p.problem}</h4>
              <p className="text-[17px] leading-relaxed text-ink-2 mb-6 flex-grow">{p.happened}</p>
              <p className="text-[17px] leading-relaxed text-ink-2 pt-5" style={{ borderTop: "1px solid var(--color-rule)" }}>
                <span className="text-haylon font-medium">Fix. </span>
                {p.fix}
              </p>
            </article>
          ))}
        </div>
      </motion.section>

      {/* Design changes */}
      {entry.changes && (
        <motion.section {...reveal()} aria-labelledby={`${entry.id}-changes-heading`}>
          <h3
            id={`${entry.id}-changes-heading`}
            className="text-2xl md:text-3xl text-ink mb-8"
          >
            Changes into the next print
          </h3>
          <dl className="grid grid-cols-1 md:grid-cols-2 gap-px mb-8" style={{ backgroundColor: "var(--color-rule)", border: "1px solid var(--color-rule)" }}>
            {entry.changes.map((c) => (
              <div key={c.part} className="p-6" style={{ backgroundColor: "var(--color-paper)" }}>
                <dt className="text-[18px] font-display text-ink mb-2">{c.part}</dt>
                <dd className="text-[17px] leading-relaxed text-ink-2">{c.change}</dd>
              </div>
            ))}
          </dl>
          {entry.statusNote && <p className="text-[17px] leading-relaxed text-ink-2 max-w-[65ch]">{entry.statusNote}</p>}
        </motion.section>
      )}
    </article>
  );
}

export default function HaylonFea() {
  const [, setLocation] = useLocation();
  const reduce = useReducedMotion();
  const headingRef = useRef<HTMLHeadingElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [tab, setTab] = useState<TabId>("build");
  const [openParts, setOpenParts] = useState<string[]>([haylonFea.parts[0].id]);

  const togglePart = (id: string) =>
    setOpenParts((cur) => (cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id]));
  const allOpen = openParts.length === haylonFea.parts.length;
  const toggleAll = () => setOpenParts(allOpen ? [] : haylonFea.parts.map((p) => p.id));
  // Opening a part from a link or a hash, so the target is never left collapsed.
  const revealPart = (id: string) => setOpenParts((cur) => (cur.includes(id) ? cur : [...cur, id]));

  // A hash target can sit inside a panel that is still hidden on mount, so the
  // scroll waits until the render that shows it has committed.
  const pendingScroll = useRef<string | null>(null);
  // Bumped whenever a scroll is queued, so the effect runs even when the tab
  // the target needs is already the active one.
  const [scrollTick, setScrollTick] = useState(0);
  useEffect(() => {
    const id = pendingScroll.current;
    if (!id) return;
    const el = document.getElementById(id);
    if (!el || el.closest("[hidden]")) return;
    pendingScroll.current = null;
    el.scrollIntoView();
  }, [tab, openParts, scrollTick]);

  // New route: open the tab the link asked for, then settle focus on the heading.
  useEffect(() => {
    document.title = "Interceptor Build and Analysis | Aarav Verma";
    const hash = window.location.hash.slice(1);
    // A build entry link lands on the build tab and scrolls to that entry.
    if (haylonBuildEntries.some((e) => e.id === hash)) {
      pendingScroll.current = hash;
      setScrollTick((n) => n + 1);
      setTab("build");
      return;
    }
    const toAnalysis = hash === "analysis" || haylonFea.parts.some((p) => p.id === hash);
    if (toAnalysis) {
      setTab("analysis");
      // The panel is hidden until this render lands, so scroll once it is on screen.
      if (hash !== "analysis") {
        pendingScroll.current = hash;
        setScrollTick((n) => n + 1);
        revealPart(hash);
        return;
      }
    }
    window.scrollTo(0, 0);
    headingRef.current?.focus();
  }, []);

  const backToProject = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    sessionStorage.setItem("scrollTarget", "#cad-projects");
    setLocation("/");
  };

  // Left and right arrows move between tabs, as expected for a tablist.
  const onTabKey = (e: React.KeyboardEvent, i: number) => {
    const delta = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!delta) return;
    e.preventDefault();
    const next = (i + delta + TABS.length) % TABS.length;
    setTab(TABS[next].id);
    tabRefs.current[next]?.focus();
  };

  const reveal = (delay = 0) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, amount: 0.15 },
          transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] },
        };

  return (
    <PublicLayout>
      <div className="container mx-auto px-6 pt-14 md:pt-20 pb-28 max-w-6xl lining-nums">
        {/* Header */}
        <motion.header {...reveal()} className="mb-10">
          <a
            href="/"
            onClick={backToProject}
            className="inline-flex items-center gap-2 text-[17px] text-ink-2 hover:text-ink transition-colors mb-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
          >
            <ArrowLeft className="w-4 h-4" strokeWidth={1.5} aria-hidden="true" />
            Back to Haylon Interceptor
          </a>
          <p className="text-[17px] mb-3 text-ink-2">NOBE, UIUC for Haylon Technologies</p>
          <h1
            ref={headingRef}
            tabIndex={-1}
            className="text-ink leading-[1.02] tracking-[-0.025em] mb-8 outline-none"
            style={{ fontSize: "clamp(2.75rem, 7vw, 5.5rem)", fontWeight: 300 }}
          >
            Interceptor Build and Analysis
          </h1>
          {/* The interceptor is the site's one bright moment, so its page
              carries the accent rule. */}
          <span aria-hidden="true" className="block w-16 h-px bg-haylon mb-8" />
          <p className="text-[19px] leading-relaxed text-ink-2 max-w-[60ch]">
            Two halves of the same project: the build log from printing and assembling the airframe, and the structural
            simulations that sized its parts.
          </p>
        </motion.header>

        {/* Tabs */}
        <div role="tablist" aria-label="Interceptor documentation" className="flex mb-16 border-b border-rule">
          {TABS.map((t, i) => (
            <button
              key={t.id}
              ref={(el) => { tabRefs.current[i] = el; }}
              role="tab"
              id={`tab-${t.id}`}
              aria-selected={tab === t.id}
              aria-controls={`panel-${t.id}`}
              tabIndex={tab === t.id ? 0 : -1}
              onClick={() => setTab(t.id)}
              onKeyDown={(e) => onTabKey(e, i)}
              className={`px-1 mr-8 h-12 text-[15px] transition-colors -mb-px border-b focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink ${
                tab === t.id
                  ? "border-ink text-ink font-medium"
                  : "border-transparent text-ink-2 hover:text-ink"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* ── BUILD LOG ── */}
        <div role="tabpanel" id="panel-build" aria-labelledby="tab-build" tabIndex={0} hidden={tab !== "build"} className="focus-visible:outline-none">
          {haylonBuildEntries.map((e) => (
            <BuildEntry key={e.id} entry={e} reveal={reveal} />
          ))}
        </div>

        {/* ── STRUCTURAL ANALYSIS ── */}
        <div role="tabpanel" id="panel-analysis" aria-labelledby="tab-analysis" tabIndex={0} hidden={tab !== "analysis"} className="focus-visible:outline-none">
          <motion.section {...reveal()} aria-labelledby="fea-intro-heading" className="mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
              <div className="lg:col-span-5">
                <h2 id="fea-intro-heading" className="text-2xl md:text-3xl text-ink mb-5">
                  {haylonFea.title}
                </h2>
                <p className="text-[18px] leading-relaxed text-ink-2">{haylonFea.intro}</p>
              </div>

              <div className="lg:col-span-7">
                <h3 className="text-[17px] text-ink-2 mb-3">Shared assumptions</h3>
                <dl className="grid grid-cols-2 sm:grid-cols-3 gap-px" style={{ backgroundColor: "var(--color-rule)", border: "1px solid var(--color-rule)" }}>
                  {haylonFea.assumptions.map((a) => (
                    <div key={a.label} className="p-5 flex flex-col-reverse gap-1" style={{ backgroundColor: "var(--color-paper)" }}>
                      <dt className="text-[15px] text-ink-2">{a.label}</dt>
                      <dd className="figure text-ink" style={{ fontSize: "1.875rem" }}>{a.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </motion.section>

          {/* Per-part detail, one expandable row each */}
          <div className="flex flex-wrap items-end justify-between gap-4 mb-2">
            <h2 className="text-2xl md:text-3xl text-ink">
              Results by part
            </h2>
            <button
              onClick={toggleAll}
              className="text-[17px] text-ink-2 hover:text-ink underline underline-offset-4 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
            >
              {allOpen ? "Collapse all" : "Expand all"}
            </button>
          </div>

          <p className="text-[17px] text-ink-2 mb-5">Open a part for its load case, plots, and verdict.</p>

          <div style={{ borderTop: "1px solid var(--color-rule)" }}>
            {haylonFea.parts.map((p, idx) => {
              const flipped = idx % 2 === 1;
              const oddImages = p.images.length % 2 === 1 && p.images.length > 1;
              const isOpen = openParts.includes(p.id);
              return (
                <motion.section
                  key={p.id}
                  id={p.id}
                  {...reveal()}
                  aria-labelledby={`${p.id}-heading`}
                  className="scroll-mt-28"
                  style={{ borderBottom: "1px solid var(--color-rule)" }}
                >
                  <h2 id={`${p.id}-heading`} className="m-0">
                    <button
                      type="button"
                      onClick={() => togglePart(p.id)}
                      aria-expanded={isOpen}
                      aria-controls={`${p.id}-panel`}
                      className="group w-full text-left px-4 md:px-6 py-6 flex flex-wrap items-center gap-x-6 gap-y-3 transition-colors hover:bg-paper-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-ink"
                    >
                      <span className="text-2xl md:text-3xl text-ink mr-auto">
                        {p.name}
                      </span>
                      <span className="hidden md:flex items-center gap-6 text-[17px] text-ink-2 lining-nums tabular-nums">
                        <span>Peak {p.peakStress}</span>
                        <span>SF {p.safetyFactor}</span>
                      </span>
                      <StatusBadge status={p.status} label={p.statusLabel} />
                      <span className="flex items-center gap-2 text-[17px] text-ink-2 group-hover:text-ink transition-colors">
                        {isOpen ? "Hide details" : "Show details"}
                        <ChevronDown
                          className={`w-4 h-4 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                          aria-hidden="true"
                        />
                      </span>
                    </button>
                  </h2>

                  <div id={`${p.id}-panel`} hidden={!isOpen} className="px-4 md:px-6 pb-12 pt-2">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
                    {/* Text */}
                    <div className={`lg:col-span-5 ${flipped ? "lg:order-2" : ""}`}>
                      <p className="text-[17px] leading-relaxed text-ink-2 mb-8">{p.summary}</p>

                      <h3 className="text-lg font-display text-ink mb-2">Load case: {p.loadCase}</h3>
                      <p className="text-[17px] leading-relaxed text-ink-2 mb-8">{p.loadDetail}</p>

                      <dl className="grid grid-cols-2 gap-px" style={{ backgroundColor: "var(--color-rule)", border: "1px solid var(--color-rule)" }}>
                        {p.metrics.map((m) => (
                          <div key={m.label} className="p-4 flex flex-col-reverse gap-1" style={{ backgroundColor: "var(--color-paper)" }}>
                            <dt className="text-[15px] text-ink-2">{m.label}</dt>
                            <dd className="figure text-ink" style={{ fontSize: "1.5rem" }}>{m.value}</dd>
                          </div>
                        ))}
                      </dl>
                    </div>

                    {/* Plots */}
                    <div className={`lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 content-start ${flipped ? "lg:order-1" : ""}`}>
                      {p.images.map((img, n) => (
                        <figure
                          key={img.src}
                          className={p.images.length === 1 || (oddImages && n === 0) ? "sm:col-span-2" : ""}
                        >
                          <a
                            href={img.src}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block relative aspect-[4/3] overflow-hidden group focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
                            style={{ backgroundColor: "var(--color-graphite)" }}
                          >
                            <img
                              src={img.src}
                              alt={img.alt}
                              loading="lazy"
                              className="absolute inset-0 w-full h-full object-contain p-2 transition-transform duration-500 group-hover:scale-[1.02]"
                            />
                            <span className="sr-only"> (opens full size in a new tab)</span>
                          </a>
                          <figcaption className="text-[15px] leading-relaxed text-ink-2 mt-2">{img.caption}</figcaption>
                        </figure>
                      ))}
                    </div>
                  </div>

                  {/* Verdict + improvements */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-px mt-10" style={{ backgroundColor: "var(--color-rule)", border: "1px solid var(--color-rule)" }}>
                    <div className="p-6 md:p-8" style={{ backgroundColor: "var(--color-paper-2)" }}>
                      <h3 className="text-lg font-display text-ink mb-3">Verdict</h3>
                      <p className="text-[17px] leading-relaxed text-ink-2">{p.verdict}</p>
                    </div>
                    <div className="p-6 md:p-8" style={{ backgroundColor: "var(--color-paper)" }}>
                      <h3 className="text-lg font-display text-ink mb-3">
                        {p.status === "preliminary" ? "Next steps" : "Improvements"}
                      </h3>
                      <ul className="space-y-2.5">
                        {p.improvements.map((item) => (
                          <li key={item} className="text-[17px] leading-relaxed text-ink-2 pl-4 relative">
                            <span className="absolute left-0 top-[0.6em] w-1.5 h-px bg-ink-3" aria-hidden="true" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  </div>
                </motion.section>
              );
            })}
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
