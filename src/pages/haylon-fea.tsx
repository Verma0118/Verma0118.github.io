import { useEffect, useRef, useState } from "react";
import { useLocation } from "wouter";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, CheckCircle2, AlertTriangle, Clock, ChevronDown } from "lucide-react";
import { PublicLayout } from "@/components/layout/public-layout";
import { haylonFea, haylonBuild, type FeaStatus } from "@/data/portfolio";

const STATUS: Record<FeaStatus, { color: string; Icon: typeof CheckCircle2 }> = {
  pass: { color: "#9cc59a", Icon: CheckCircle2 },
  flag: { color: "#ef8f7d", Icon: AlertTriangle },
  preliminary: { color: "#e8b14f", Icon: Clock },
};

function StatusBadge({ status, label }: { status: FeaStatus; label: string }) {
  const { color, Icon } = STATUS[status];
  return (
    <span className="inline-flex items-center gap-1.5 text-sm whitespace-nowrap" style={{ color }}>
      <Icon className="w-4 h-4 shrink-0" aria-hidden="true" />
      {label}
    </span>
  );
}

const TABS = [
  { id: "build", label: "Build log" },
  { id: "analysis", label: "Structural analysis" },
] as const;

type TabId = (typeof TABS)[number]["id"];

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

  // New route: open the tab the link asked for, then settle focus on the heading.
  useEffect(() => {
    document.title = "Interceptor Build and Analysis | Aarav Verma";
    const hash = window.location.hash.slice(1);
    const toAnalysis = hash === "analysis" || haylonFea.parts.some((p) => p.id === hash);
    if (toAnalysis) {
      setTab("analysis");
      // The panel is hidden until this render lands, so scroll once it is on screen.
      if (hash !== "analysis") {
        revealPart(hash);
        requestAnimationFrame(() => document.getElementById(hash)?.scrollIntoView());
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
      <div className="container mx-auto px-6 pt-28 pb-24 max-w-6xl lining-nums">
        {/* Header */}
        <motion.header {...reveal()} className="mb-10">
          <a
            href="/"
            onClick={backToProject}
            className="inline-flex items-center gap-2 text-sm text-[#a9ada3] hover:text-[#f5f4f0] transition-colors mb-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f5f4f0]"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            Back to Haylon Interceptor
          </a>
          <p className="text-sm mb-3 text-[#a9ada3]">NOBE, UIUC for Haylon Technologies</p>
          <h1
            ref={headingRef}
            tabIndex={-1}
            className="text-4xl md:text-6xl font-display font-normal text-[#f5f4f0] leading-[1.05] mb-6 outline-none"
            style={{ fontWeight: 400 }}
          >
            Interceptor Build and Analysis
          </h1>
          <p className="text-base leading-relaxed text-[#c9ccc4] max-w-[65ch]">
            Two halves of the same project: the build log from printing and assembling the airframe, and the structural
            simulations that sized its parts.
          </p>
        </motion.header>

        {/* Tabs */}
        <div role="tablist" aria-label="Interceptor documentation" className="flex gap-1 mb-12 border-b border-[#2e3328]">
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
              className={`px-5 h-12 text-sm transition-colors -mb-px border-b-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f5f4f0] ${
                tab === t.id
                  ? "border-[#f5f4f0] text-[#f5f4f0] font-medium"
                  : "border-transparent text-[#a9ada3] hover:text-[#f5f4f0]"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* ── BUILD LOG ── */}
        <div role="tabpanel" id="panel-build" aria-labelledby="tab-build" tabIndex={0} hidden={tab !== "build"} className="focus-visible:outline-none">
          <motion.section {...reveal()} aria-labelledby="build-intro-heading" className="mb-20">
            <p className="text-sm text-[#a9ada3] mb-3">
              {haylonBuild.entry}, {haylonBuild.date}
            </p>
            <h2 id="build-intro-heading" className="text-2xl md:text-3xl font-display font-normal text-[#f5f4f0] mb-5" style={{ fontWeight: 400 }}>
              From CAD to parts in hand
            </h2>
            <p className="text-base leading-relaxed text-[#c9ccc4] max-w-[65ch] mb-10">{haylonBuild.intro}</p>
            <ul className="grid grid-cols-1 md:grid-cols-3 gap-px" style={{ backgroundColor: "#2e3328", border: "1px solid #2e3328" }}>
              {haylonBuild.workCompleted.map((item) => (
                <li key={item} className="p-6 text-sm leading-relaxed text-[#c9ccc4]" style={{ backgroundColor: "#1a1e16" }}>
                  {item}
                </li>
              ))}
            </ul>
          </motion.section>

          {/* Photos */}
          <motion.section {...reveal()} aria-labelledby="photos-heading" className="mb-24">
            <h2 id="photos-heading" className="text-2xl md:text-3xl font-display font-normal text-[#f5f4f0] mb-8" style={{ fontWeight: 400 }}>
              Printed and assembled
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {haylonBuild.photos.map((photo) => (
                <figure key={photo.src} className={photo.wide ? "sm:col-span-2" : ""}>
                  <a
                    href={photo.src}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`block relative overflow-hidden group focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f5f4f0] ${
                      photo.wide ? "aspect-[21/10]" : "aspect-square"
                    }`}
                    style={{ backgroundColor: "#111410", border: "1px solid #2e3328" }}
                  >
                    <img
                      src={photo.src}
                      alt={photo.alt}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                    <span className="sr-only"> (opens full size in a new tab)</span>
                  </a>
                  <figcaption className="text-xs leading-relaxed text-[#a9ada3] mt-2">{photo.caption}</figcaption>
                </figure>
              ))}
            </div>
          </motion.section>

          {/* Problems found */}
          <motion.section {...reveal()} aria-labelledby="problems-heading" className="mb-24">
            <h2 id="problems-heading" className="text-2xl md:text-3xl font-display font-normal text-[#f5f4f0] mb-8" style={{ fontWeight: 400 }}>
              What broke, and why
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-px" style={{ backgroundColor: "#2e3328", border: "1px solid #2e3328" }}>
              {haylonBuild.problems.map((p) => (
                <article key={p.problem} className="p-6 md:p-8 flex flex-col" style={{ backgroundColor: "#1a1e16" }}>
                  <h3 className="text-lg font-display text-[#f5f4f0] mb-4">{p.problem}</h3>
                  <p className="text-sm leading-relaxed text-[#a9ada3] mb-6 flex-grow">{p.happened}</p>
                  <p className="text-sm leading-relaxed text-[#c9ccc4] pt-5" style={{ borderTop: "1px solid #2e3328" }}>
                    <span className="text-[#9cc59a]">Fix. </span>
                    {p.fix}
                  </p>
                </article>
              ))}
            </div>
          </motion.section>

          {/* Design changes */}
          <motion.section {...reveal()} aria-labelledby="changes-heading">
            <h2 id="changes-heading" className="text-2xl md:text-3xl font-display font-normal text-[#f5f4f0] mb-8" style={{ fontWeight: 400 }}>
              Changes into the next print
            </h2>
            <dl className="grid grid-cols-1 md:grid-cols-2 gap-px mb-8" style={{ backgroundColor: "#2e3328", border: "1px solid #2e3328" }}>
              {haylonBuild.changes.map((c) => (
                <div key={c.part} className="p-6" style={{ backgroundColor: "#1a1e16" }}>
                  <dt className="text-base font-display text-[#f5f4f0] mb-2">{c.part}</dt>
                  <dd className="text-sm leading-relaxed text-[#a9ada3]">{c.change}</dd>
                </div>
              ))}
            </dl>
            <p className="text-sm leading-relaxed text-[#c9ccc4] max-w-[65ch]">{haylonBuild.statusNote}</p>
          </motion.section>
        </div>

        {/* ── STRUCTURAL ANALYSIS ── */}
        <div role="tabpanel" id="panel-analysis" aria-labelledby="tab-analysis" tabIndex={0} hidden={tab !== "analysis"} className="focus-visible:outline-none">
          <motion.section {...reveal()} aria-labelledby="fea-intro-heading" className="mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
              <div className="lg:col-span-5">
                <h2 id="fea-intro-heading" className="text-2xl md:text-3xl font-display font-normal text-[#f5f4f0] mb-5" style={{ fontWeight: 400 }}>
                  {haylonFea.title}
                </h2>
                <p className="text-base leading-relaxed text-[#c9ccc4]">{haylonFea.intro}</p>
              </div>

              <div className="lg:col-span-7">
                <h3 className="text-sm text-[#a9ada3] mb-3">Shared assumptions</h3>
                <dl className="grid grid-cols-2 sm:grid-cols-3 gap-px" style={{ backgroundColor: "#2e3328", border: "1px solid #2e3328" }}>
                  {haylonFea.assumptions.map((a) => (
                    <div key={a.label} className="p-5 flex flex-col-reverse gap-1" style={{ backgroundColor: "#1a1e16" }}>
                      <dt className="text-xs text-[#a9ada3]">{a.label}</dt>
                      <dd className="text-xl font-display text-[#f5f4f0] lining-nums tabular-nums">{a.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </motion.section>

          {/* Per-part detail, one expandable row each */}
          <div className="flex flex-wrap items-end justify-between gap-4 mb-2">
            <h2 className="text-2xl md:text-3xl font-display font-normal text-[#f5f4f0]" style={{ fontWeight: 400 }}>
              Results by part
            </h2>
            <button
              onClick={toggleAll}
              className="text-sm text-[#a9ada3] hover:text-[#f5f4f0] underline underline-offset-4 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f5f4f0]"
            >
              {allOpen ? "Collapse all" : "Expand all"}
            </button>
          </div>

          <p className="text-sm text-[#a9ada3] mb-5">Open a part for its load case, plots, and verdict.</p>

          <div style={{ borderTop: "1px solid #2e3328" }}>
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
                  style={{ borderBottom: "1px solid #2e3328" }}
                >
                  <h2 id={`${p.id}-heading`} className="m-0">
                    <button
                      type="button"
                      onClick={() => togglePart(p.id)}
                      aria-expanded={isOpen}
                      aria-controls={`${p.id}-panel`}
                      className="group w-full text-left px-4 md:px-6 py-6 flex flex-wrap items-center gap-x-6 gap-y-3 transition-colors hover:bg-[#232820] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#f5f4f0]"
                    >
                      <span className="text-2xl md:text-3xl font-display font-normal text-[#f5f4f0] mr-auto" style={{ fontWeight: 400 }}>
                        {p.name}
                      </span>
                      <span className="hidden md:flex items-center gap-6 text-sm text-[#a9ada3] lining-nums tabular-nums">
                        <span>Peak {p.peakStress}</span>
                        <span>SF {p.safetyFactor}</span>
                      </span>
                      <StatusBadge status={p.status} label={p.statusLabel} />
                      <span className="flex items-center gap-2 text-sm text-[#c9ccc4] group-hover:text-[#f5f4f0] transition-colors">
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
                      <p className="text-sm leading-relaxed text-[#c9ccc4] mb-8">{p.summary}</p>

                      <h3 className="text-lg font-display text-[#f5f4f0] mb-2">Load case: {p.loadCase}</h3>
                      <p className="text-sm leading-relaxed text-[#a9ada3] mb-8">{p.loadDetail}</p>

                      <dl className="grid grid-cols-2 gap-px" style={{ backgroundColor: "#2e3328", border: "1px solid #2e3328" }}>
                        {p.metrics.map((m) => (
                          <div key={m.label} className="p-4 flex flex-col-reverse gap-1" style={{ backgroundColor: "#1a1e16" }}>
                            <dt className="text-xs text-[#a9ada3]">{m.label}</dt>
                            <dd className="text-lg font-display text-[#f5f4f0] lining-nums tabular-nums">{m.value}</dd>
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
                            className="block relative aspect-[4/3] overflow-hidden group focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f5f4f0]"
                            style={{ backgroundColor: "#111410", border: "1px solid #2e3328" }}
                          >
                            <img
                              src={img.src}
                              alt={img.alt}
                              loading="lazy"
                              className="absolute inset-0 w-full h-full object-contain p-2 transition-transform duration-500 group-hover:scale-[1.02]"
                            />
                            <span className="sr-only"> (opens full size in a new tab)</span>
                          </a>
                          <figcaption className="text-xs leading-relaxed text-[#a9ada3] mt-2">{img.caption}</figcaption>
                        </figure>
                      ))}
                    </div>
                  </div>

                  {/* Verdict + improvements */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-px mt-10" style={{ backgroundColor: "#2e3328", border: "1px solid #2e3328" }}>
                    <div className="p-6 md:p-8" style={{ backgroundColor: "#232820" }}>
                      <h3 className="text-lg font-display text-[#f5f4f0] mb-3">Verdict</h3>
                      <p className="text-sm leading-relaxed text-[#c9ccc4]">{p.verdict}</p>
                    </div>
                    <div className="p-6 md:p-8" style={{ backgroundColor: "#1a1e16" }}>
                      <h3 className="text-lg font-display text-[#f5f4f0] mb-3">
                        {p.status === "preliminary" ? "Next steps" : "Improvements"}
                      </h3>
                      <ul className="space-y-2.5">
                        {p.improvements.map((item) => (
                          <li key={item} className="text-sm leading-relaxed text-[#c9ccc4] pl-4 relative">
                            <span className="absolute left-0 top-[0.6em] w-1.5 h-px bg-[#a9ada3]" aria-hidden="true" />
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
