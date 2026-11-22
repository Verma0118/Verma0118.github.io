import { personalInfo, cadProjects, softwareProjects, simulationProjects } from "@/data/portfolio";
import { PublicLayout } from "@/components/layout/public-layout";
import { ModelViewerWrapper } from "@/components/ui/model-viewer-wrapper";
import { ScrollFade } from "@/components/ui/scroll-fade";
import { ImageTabs } from "@/components/ui/image-tabs";
import { ProjectCarousel } from "@/components/ui/project-carousel";
import { StoryGuide } from "@/components/story/story-guide";
import { StoryBeatSection } from "@/components/story/story-beat";
import { StoryRail } from "@/components/story/story-rail";
import { storyBeats, handoffLinks } from "@/data/story";
import { motion, useScroll, useMotionValueEvent, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight, ArrowDown } from "lucide-react";
import { Link } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

// Get your free key at web3forms.com, paste it here
const WEB3FORMS_KEY = "51cec2da-9568-4d72-a5ce-5523d3c2a7c8";

const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

const FEATURED = [cadProjects[5], cadProjects[0]];
const CAD_GRID = cadProjects.slice(1, 5);

/** Beats rendered with the shared skeleton. Index 0 is the hero, 5 the handoff. */
const STORY_MIDDLE = storyBeats.slice(1, 5);

export default function Home() {
  const { toast } = useToast();
  const [isSending, setIsSending] = useState(false);

  const reduce = useReducedMotion();
  const storyRef = useRef<HTMLDivElement>(null);
  const [activeBeat, setActiveBeat] = useState(0);
  const [inStory, setInStory] = useState(true);

  /**
   * Latched once, on mount. Anyone arriving on a deep link to the browse act,
   * coming back from a sub-page, or restored mid-page by the browser gets the
   * clickable site immediately and never has the story replayed at them.
   * A hash pointing at a beat still counts as entering the story.
   */
  const [skipStory] = useState(() => {
    if (typeof window === "undefined") return false;
    const hash = window.location.hash;
    if (hash && !hash.startsWith("#story-")) return true;
    if (sessionStorage.getItem("scrollTarget")) return true;
    return window.scrollY > 40;
  });

  const navHidden = !skipStory && inStory;

  const { scrollYProgress } = useScroll({
    target: storyRef,
    offset: ["start start", "end end"],
  });

  /**
   * Scroll progress at which each beat reaches the top of the viewport.
   * Measured rather than assumed: beats no longer all stand exactly one
   * screen tall now that they carry evidence grids, so evenly spaced stops
   * would drift the guide's framing away from the beat it belongs to.
   */
  const stopsRef = useRef<number[]>(storyBeats.map((_, i) => i / (storyBeats.length - 1)));

  useLayoutEffect(() => {
    const measure = () => {
      const story = storyRef.current;
      if (!story) return;
      const total = story.scrollHeight - window.innerHeight;
      if (total <= 0) return;
      stopsRef.current = storyBeats.map((b, i) => {
        const el = document.getElementById(b.id);
        if (!el) return i / (storyBeats.length - 1);
        return Math.min(1, Math.max(0, (el.offsetTop - story.offsetTop) / total));
      });
    };
    measure();
    // Images and the model change the story's height as they land.
    const t = window.setTimeout(measure, 600);
    window.addEventListener("resize", measure);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("resize", measure);
    };
  }, []);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const stops = stopsRef.current;
    const last = storyBeats.length - 1;
    // Active beat is the last one whose top the scroll has passed.
    let idx = 0;
    for (let i = 0; i <= last; i++) if (v >= stops[i] - 0.02) idx = i;
    setActiveBeat((prev) => (prev === idx ? prev : idx));
    // The nav returns as soon as the handoff beat becomes the active one.
    const handed = idx >= last;
    setInStory((prev) => (prev === !handed ? prev : !handed));
  });

  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  useEffect(() => {
    // Sub-pages set their own titles; restore this one on the way back.
    document.title = "Aarav Verma Portfolio";
    const target = sessionStorage.getItem("scrollTarget");
    if (target) {
      sessionStorage.removeItem("scrollTarget");
      const attempt = (tries: number) => {
        const el = document.querySelector(target);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        } else if (tries > 0) {
          setTimeout(() => attempt(tries - 1), 120);
        }
      };
      setTimeout(() => attempt(8), 200);
    }
  }, []);

  const onContactSubmit = async (data: ContactFormValues) => {
    setIsSending(true);
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `Portfolio Contact from ${data.name}`,
          name: data.name,
          email: data.email,
          message: data.message,
        }),
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.message);
      toast({ title: "Message sent", description: "Thanks for reaching out. I'll get back to you soon." });
      reset();
    } catch {
      toast({ variant: "destructive", title: "Failed to send", description: "Something went wrong. Please email directly." });
    } finally {
      setIsSending(false);
    }
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
  };
  const stagger = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
  };

  const heroScroll = (hash: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    document.querySelector(hash)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const sectionHeading = "text-ink leading-[1.04]";
  const sectionHeadingSize = { fontSize: "clamp(2.5rem, 5vw, 4.25rem)", fontWeight: 300 } as const;
  const inputCls =
    "w-full bg-transparent border border-ink-3 h-12 px-3 text-ink text-[16px] placeholder:text-ink-3 outline-none transition-colors focus:border-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink";

  return (
    <PublicLayout navHidden={navHidden} skipTarget="#cad-projects">

      <StoryGuide scrollYProgress={scrollYProgress} stopsRef={stopsRef} activeBeat={activeBeat} />
      <StoryRail beats={storyBeats} activeIndex={activeBeat} visible={navHidden} />

      {/* ── STORY ACT ── five beats, then the handoff back to browsing ── */}
      <div ref={storyRef}>

      {/* ── BEAT 0, the opening. Left-aligned; the guide owns the right. */}
      <section
        id="story-open"
        className="min-h-[calc(100dvh-72px)] flex items-center relative bg-paper"
        aria-label="Introduction"
      >
        <div className="container mx-auto px-6 lg:pl-40 relative z-30 py-16">
          <motion.div
            initial={reduce ? false : "hidden"}
            animate="visible"
            variants={stagger}
            className="w-full lg:max-w-[52%]"
          >
            <motion.p variants={fadeUp} className="text-[17px] text-ink-2 mb-6">
              Aerospace engineer and startup founder
            </motion.p>

            <motion.h1
              variants={fadeUp}
              className="text-ink leading-[0.98] tracking-[-0.03em] mb-8"
              style={{ fontSize: "clamp(3.5rem, 9vw, 7.5rem)", fontWeight: 300, fontVariationSettings: '"opsz" 72' }}
            >
              Aarav Verma
            </motion.h1>

            <motion.p variants={fadeUp} className="text-[17px] leading-relaxed text-ink-2 max-w-[44ch] mb-12">
              Project manager at NOBE, build team engineer at UAV@Illinois, and an incoming intern at L3Harris.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-x-8 gap-y-4">
              <a href="#story-design" onClick={heroScroll("#story-design")} className="group btn-outline focus-ring">
                See the work
                <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-0.5" strokeWidth={1.5} aria-hidden="true" />
              </a>
              <a
                href={personalInfo.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[15px] text-ink link-rule focus-ring"
              >
                Resume
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── BEATS 1 to 4 ── design, analysis, build, software ── */}
      {STORY_MIDDLE.map((beat) => (
        <StoryBeatSection key={beat.id} beat={beat} />
      ))}

      {/* ── BEAT 5, the handoff. The site becomes clickable here. */}
      <section
        id="story-handoff"
        aria-labelledby="story-handoff-heading"
        className="relative min-h-[100dvh] flex items-center py-24 md:py-28 bg-paper"
      >
        <div className="container mx-auto px-6 lg:pl-40 relative z-30">
          <ScrollFade className="max-w-2xl mb-14">
            <h2 id="story-handoff-heading" className={`${sectionHeading} mb-5`} style={sectionHeadingSize}>
              {storyBeats[5].heading}
            </h2>
            <p className="text-[17px] leading-relaxed text-ink-2">{storyBeats[5].body}</p>
          </ScrollFade>

          <ScrollFade delay={0.1}>
            <nav aria-label="Portfolio sections">
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-12 list-none p-0 m-0 border-t border-rule">
                {handoffLinks.map((dest) => {
                  const body = (
                    <>
                      <span className="font-display text-ink text-[28px] md:text-[32px] leading-tight" style={{ fontWeight: 350 }}>
                        {dest.label}
                      </span>
                      <span className="flex items-center gap-4 text-[15px] text-ink-2">
                        <span className="hidden sm:inline">{dest.note}</span>
                        <ArrowRight className="w-4 h-4 shrink-0 text-ink transition-transform group-hover:translate-x-1" strokeWidth={1.5} aria-hidden="true" />
                      </span>
                    </>
                  );
                  const cls = "group flex items-center justify-between gap-6 py-5 border-b border-rule focus-ring";
                  return (
                    <li key={dest.href}>
                      {dest.page ? (
                        <Link href={dest.href} className={cls}>{body}</Link>
                      ) : (
                        <a
                          href={dest.href}
                          className={cls}
                          onClick={(e) => {
                            e.preventDefault();
                            document.querySelector(dest.href)?.scrollIntoView({ behavior: "smooth", block: "start" });
                          }}
                        >
                          {body}
                        </a>
                      )}
                    </li>
                  );
                })}
              </ul>
            </nav>
          </ScrollFade>
        </div>
      </section>

      </div>
      {/* ── END STORY ACT ── everything below is the browsable portfolio ── */}

      {/* ── HARDWARE DESIGN ── the interceptor leads, the Canary drone follows */}
      <section id="cad-projects" tabIndex={-1} aria-labelledby="cad-heading" className="py-28 md:py-36 outline-none border-t border-rule">
        <div className="container mx-auto px-6">
          <ScrollFade className="mb-16 md:mb-20 max-w-3xl">
            <h2 id="cad-heading" className={`${sectionHeading} mb-5`} style={sectionHeadingSize}>
              Hardware design
            </h2>
            <p className="text-[17px] leading-relaxed text-ink-2 max-w-[52ch]">
              Mechanical designs and structural analysis. Every model below can be turned and zoomed.
            </p>
          </ScrollFade>

          {/* The interceptor: the page's one bright moment. */}
          {"slides" in FEATURED[0] && (
            <ScrollFade className="mb-28 md:mb-36">
              <ProjectCarousel
                organization={FEATURED[0].organization}
                dateRange={FEATURED[0].dateRange}
                slides={(FEATURED[0] as any).slides}
                link={(FEATURED[0] as any).link}
                featured
              />
            </ScrollFade>
          )}

          {/* Canary drone: mirrored, text first, on a light plinth. */}
          <ScrollFade>
            <article aria-label={FEATURED[1].title} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
              <div className="lg:col-span-4 order-2 lg:order-1">
                <p className="text-[14px] text-ink-2 mb-5 leading-relaxed">
                  {FEATURED[1].organization}<br />{FEATURED[1].dateRange}
                </p>
                <h3 className="text-ink mb-5 leading-[1.08]" style={{ fontSize: "clamp(1.75rem, 2.6vw, 2.25rem)" }}>
                  {FEATURED[1].title}
                </h3>
                <p className="text-[16px] leading-relaxed text-ink-2 mb-6">{FEATURED[1].description}</p>
                <p className="tag-run"><span className="sr-only">Tools: </span>{FEATURED[1].tags.join(", ")}</p>
              </div>
              <div className="lg:col-span-8 order-1 lg:order-2 h-[380px] md:h-[480px] lg:h-[560px] bg-paper-2 text-ink-2">
                <ModelViewerWrapper src={FEATURED[1].glbFileUrl} alt={FEATURED[1].title} className="w-full h-full" />
              </div>
            </article>
          </ScrollFade>
        </div>
      </section>

      {/* ── ENGINEERING PROJECTS ── staggered two-up plinths, text beneath */}
      <section aria-labelledby="eng-heading" className="pb-28 md:pb-36">
        <div className="container mx-auto px-6">
          <ScrollFade className="mb-14 border-t border-rule pt-14">
            <h2 id="eng-heading" className="text-ink leading-[1.08]" style={{ fontSize: "clamp(2rem, 3.4vw, 2.75rem)", fontWeight: 300 }}>
              More engineering projects
            </h2>
          </ScrollFade>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 lg:gap-x-16 gap-y-20">
            {CAD_GRID.map((project, idx) => (
              <ScrollFade key={project.id} delay={(idx % 2) * 0.08} className={idx % 2 === 1 ? "md:mt-28" : ""}>
                <article aria-label={project.title}>
                  {/* Graphite plinth: these are white prints and renders, which
                      vanish against the paper ground. */}
                  <div className="h-[340px] lg:h-[420px] bg-graphite text-graphite-ink-2">
                    <ModelViewerWrapper src={project.glbFileUrl} alt={project.title} className="w-full h-full" />
                  </div>
                  <div className="pt-6 max-w-[56ch]">
                    <p className="text-[14px] text-ink-2 mb-3">{project.organization}, {project.dateRange}</p>
                    <h3 className="text-ink mb-3 leading-tight" style={{ fontSize: "1.75rem" }}>{project.title}</h3>
                    <p className="text-[16px] leading-relaxed text-ink-2 mb-4">{project.description}</p>
                    <p className="tag-run"><span className="sr-only">Tools: </span>{project.tags.join(", ")}</p>
                  </div>
                </article>
              </ScrollFade>
            ))}
          </div>
        </div>
      </section>

      {/* ── SOFTWARE ── the intercept sim leads, the rest as an index */}
      <section id="software-projects" aria-labelledby="sw-heading" className="py-28 md:py-36 border-t border-rule">
        <div className="container mx-auto px-6">
          <ScrollFade className="mb-16 max-w-3xl">
            <h2 id="sw-heading" className={`${sectionHeading} mb-5`} style={sectionHeadingSize}>
              Software
            </h2>
            <p className="text-[17px] leading-relaxed text-ink-2 max-w-[52ch]">
              Simulation, flight software, and tools I use every day.
            </p>
          </ScrollFade>

          <ScrollFade className="mb-20">
            <article aria-labelledby="sw-lead" className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
              <div className="lg:col-span-7 order-1">
                <ImageTabs images={softwareProjects[0].images!} />
              </div>
              <div className="lg:col-span-5 order-2">
                <p className="text-[14px] text-ink-2 mb-4">{softwareProjects[0].kind}</p>
                <h3 id="sw-lead" className="text-ink mb-5 leading-[1.08]" style={{ fontSize: "clamp(1.75rem, 2.6vw, 2.25rem)" }}>
                  {softwareProjects[0].title}
                </h3>
                <p className="text-[16px] leading-relaxed text-ink-2 mb-8">{softwareProjects[0].description}</p>
                <ol className="flex flex-wrap items-center gap-x-3 gap-y-2 mb-8 list-none p-0 font-display text-ink text-[22px]" aria-label="Control sequence">
                  {softwareProjects[0].steps!.map((step, i, all) => (
                    <li key={step} className="flex items-center gap-3">
                      <span>{step}</span>
                      {i < all.length - 1 && <ArrowRight className="w-4 h-4 text-ink-3" strokeWidth={1.5} aria-hidden="true" />}
                    </li>
                  ))}
                </ol>
                <p className="tag-run mb-8"><span className="sr-only">Tools: </span>{softwareProjects[0].tags.join(", ")}</p>
                {softwareProjects[0].githubUrl && (
                  <a
                    href={softwareProjects[0].githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[15px] font-medium text-ink link-rule focus-ring"
                  >
                    View on GitHub <ArrowUpRight className="w-4 h-4" strokeWidth={1.5} aria-hidden="true" />
                  </a>
                )}
              </div>
            </article>
          </ScrollFade>

          <ul className="list-none p-0 m-0 border-t border-rule">
            {softwareProjects.slice(1).map((project) => {
              const href = project.demoUrl ?? project.githubUrl;
              const linkLabel = project.demoUrl ? "Open the live demo" : "View on GitHub";
              return (
                <li key={project.id} className="border-b border-rule">
                  <ScrollFade>
                    <article aria-labelledby={`sw-${project.id}`} className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-10 py-10">
                      <div className="md:col-span-4">
                        <p className="text-[14px] text-ink-2 mb-2">{project.kind}</p>
                        <h3 id={`sw-${project.id}`} className="text-ink leading-tight" style={{ fontSize: "1.75rem" }}>
                          {project.title}
                        </h3>
                      </div>
                      <div className="md:col-span-5">
                        <p className="text-[16px] leading-relaxed text-ink-2 mb-3">{project.description}</p>
                        <p className="tag-run"><span className="sr-only">Tools: </span>{project.tags.join(", ")}</p>
                      </div>
                      <div className="md:col-span-3 md:text-right">
                        {href && (
                          <a
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-[15px] font-medium text-ink link-rule focus-ring"
                          >
                            {linkLabel}
                            <ArrowUpRight className="w-4 h-4" strokeWidth={1.5} aria-hidden="true" />
                            <span className="sr-only">, {project.title}</span>
                          </a>
                        )}
                      </div>
                    </article>
                  </ScrollFade>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* ── SIMULATION & ANALYSIS ── the FEA campaign on a graphite band */}
      <section id="simulation-projects" aria-labelledby="sim-heading" className="border-t border-rule">
        <div className="container mx-auto px-6 pt-28 md:pt-36 pb-14">
          <ScrollFade className="max-w-3xl">
            <h2 id="sim-heading" className={`${sectionHeading} mb-5`} style={sectionHeadingSize}>
              Simulation and analysis
            </h2>
            <p className="text-[17px] leading-relaxed text-ink-2 max-w-[52ch]">
              MATLAB and Simulink work in controls modeling, FEA validation and mesh convergence.
            </p>
          </ScrollFade>
        </div>

        {simulationProjects.filter((p) => "featured" in p).map((project) => (
          <div key={project.id} className="bg-graphite text-graphite-ink">
            <div className="container mx-auto px-6 py-16 md:py-20">
              <article aria-labelledby={`sim-${project.id}`} className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
                <div className="lg:col-span-4">
                  <p className="text-[14px] text-graphite-ink-2 mb-4">{project.category}, {project.dateRange}</p>
                  <h3 id={`sim-${project.id}`} className="mb-5 leading-[1.08]" style={{ fontSize: "clamp(1.75rem, 2.6vw, 2.25rem)" }}>
                    {project.title}
                  </h3>
                  <p className="text-[16px] leading-relaxed text-graphite-ink-2 mb-8">{project.description}</p>
                  {"link" in project && (
                    <Link
                      href={(project as any).link.href}
                      className="group inline-flex items-center gap-2 text-[15px] font-medium text-graphite-ink underline underline-offset-[0.3em] decoration-1 decoration-graphite-ink-2 hover:decoration-graphite-ink outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-graphite-ink"
                    >
                      {(project as any).link.label}
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" strokeWidth={1.5} aria-hidden="true" />
                    </Link>
                  )}
                </div>
                {/* Five plots: the camera mount, the one that failed, leads at
                    double size; the other four fill a 2x2 beside it. Fixed row
                    heights keep every cell aligned. */}
                <ul className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 auto-rows-[180px] md:auto-rows-[200px] gap-x-2 gap-y-8 list-none p-0 m-0">
                  {project.images.map((img, n) => (
                    <li key={img.src} className={n === 0 ? "col-span-2 row-span-2" : ""}>
                      <figure className="m-0 h-full flex flex-col">
                        <div className="bg-graphite-2 flex-1 min-h-0">
                          <img src={img.src} alt={img.alt} loading="lazy" className="w-full h-full object-contain p-3" />
                        </div>
                        <figcaption className="text-[14px] text-graphite-ink-2 mt-2">{img.label}</figcaption>
                      </figure>
                    </li>
                  ))}
                </ul>
              </article>
            </div>
          </div>
        ))}

        <div className="container mx-auto px-6 py-20 md:py-28">
          <ul className="list-none p-0 m-0 border-t border-rule">
            {simulationProjects.filter((p) => !("featured" in p)).map((project) => (
              <li key={project.id} className="border-b border-rule">
                <ScrollFade>
                  <article aria-labelledby={`sim-${project.id}`} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 py-12">
                    <div className="lg:col-span-5">
                      <p className="text-[14px] text-ink-2 mb-3">{project.category}, {project.dateRange}</p>
                      <h3 id={`sim-${project.id}`} className="text-ink leading-[1.12] mb-4" style={{ fontSize: "1.75rem" }}>
                        {project.title}
                      </h3>
                      <p className="tag-run"><span className="sr-only">Tools: </span>{project.tags.join(", ")}</p>
                    </div>
                    <p className="lg:col-span-4 text-[16px] leading-relaxed text-ink-2">{project.description}</p>
                    <div className="lg:col-span-3">
                      <ImageTabs images={project.images} />
                    </div>
                  </article>
                </ScrollFade>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── ABOUT ── portrait, statement, then the record as plain lists */}
      <section id="about" aria-labelledby="about-heading" className="py-28 md:py-36 border-t border-rule">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            <ScrollFade className="lg:col-span-4">
              <img
                src="/photo.jpg"
                alt="Aarav Verma"
                className="w-full object-cover block bg-paper-2"
                style={{ aspectRatio: "4/5", objectPosition: "center 12%" }}
              />
            </ScrollFade>

            <div className="lg:col-span-7 lg:col-start-6">
              <ScrollFade>
                <h2 id="about-heading" className={`${sectionHeading} mb-8`} style={sectionHeadingSize}>
                  About
                </h2>
                <p className="font-display text-ink leading-[1.3] mb-14" style={{ fontSize: "clamp(1.375rem, 2vw, 1.75rem)", fontWeight: 350 }}>
                  {personalInfo.bio}
                </p>
              </ScrollFade>

              <ScrollFade delay={0.08}>
                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-10 mb-14">
                  <div>
                    <dt className="text-[14px] text-ink-2 mb-2">Education</dt>
                    <dd className="m-0 text-[16px] text-ink leading-relaxed">{personalInfo.education}</dd>
                  </div>
                  {personalInfo.currentFocus && (
                    <div>
                      <dt className="text-[14px] text-ink-2 mb-2">Current focus</dt>
                      <dd className="m-0 text-[16px] text-ink leading-relaxed">{personalInfo.currentFocus}</dd>
                    </div>
                  )}
                  {personalInfo.organizations.length > 0 && (
                    <div>
                      <dt className="text-[14px] text-ink-2 mb-2">Organizations</dt>
                      <dd className="m-0">
                        <ul className="list-none p-0 m-0 space-y-1 text-[16px] text-ink">
                          {personalInfo.organizations.map((org) => <li key={org}>{org}</li>)}
                        </ul>
                      </dd>
                    </div>
                  )}
                  {personalInfo.previousWork.length > 0 && (
                    <div>
                      <dt className="text-[14px] text-ink-2 mb-2">Previous work</dt>
                      <dd className="m-0">
                        <ul className="list-none p-0 m-0 space-y-1 text-[16px] text-ink">
                          {personalInfo.previousWork.map((job) => <li key={job}>{job}</li>)}
                        </ul>
                      </dd>
                    </div>
                  )}
                </dl>

                <dl className="border-t border-rule">
                  {[
                    { label: "CAD and simulation", skills: personalInfo.skills.cadSimulation },
                    { label: "Software and programming", skills: personalInfo.skills.software },
                    { label: "Manufacturing and hardware", skills: personalInfo.skills.manufacturing },
                  ].map(({ label, skills }) => (
                    <div key={label} className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-6 py-5 border-b border-rule">
                      <dt className="text-[14px] text-ink-2">{label}</dt>
                      <dd className="m-0 sm:col-span-2 text-[16px] text-ink leading-relaxed">{skills.join(", ")}</dd>
                    </div>
                  ))}
                </dl>

                <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4">
                  {personalInfo.resumeUrl && (
                    <a href={personalInfo.resumeUrl} target="_blank" rel="noopener noreferrer" className="btn-outline focus-ring">
                      Resume, PDF
                    </a>
                  )}
                  {personalInfo.portfolioPdfUrl && (
                    <a href={personalInfo.portfolioPdfUrl} target="_blank" rel="noopener noreferrer" className="text-[15px] text-ink link-rule focus-ring">
                      Portfolio, PDF
                    </a>
                  )}
                </div>
              </ScrollFade>
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" aria-labelledby="contact-heading" className="py-28 md:py-36 border-t border-rule">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-12">
            <ScrollFade className="lg:col-span-5">
              <h2 id="contact-heading" className={`${sectionHeading} mb-6`} style={sectionHeadingSize}>
                Get in touch
              </h2>
              <p className="text-[17px] leading-relaxed text-ink-2 mb-10 max-w-[40ch]">
                Open to engineering internships, research opportunities, and technical conversations.
              </p>
              <a
                href={`mailto:${personalInfo.email}`}
                className="font-display text-ink link-rule focus-ring break-all"
                style={{ fontSize: "clamp(1.25rem, 2vw, 1.625rem)", fontWeight: 350 }}
              >
                {personalInfo.email}
              </a>
            </ScrollFade>

            <ScrollFade className="lg:col-span-6 lg:col-start-7" delay={0.08}>
              <form onSubmit={handleSubmit(onContactSubmit)} noValidate className="flex flex-col gap-6" aria-label="Contact form">
                <div className="flex flex-col gap-2">
                  <label htmlFor="contact-name" className="text-[15px] text-ink">Your name</label>
                  <input
                    {...register("name")}
                    id="contact-name"
                    type="text"
                    autoComplete="name"
                    className={inputCls}
                    aria-invalid={errors.name ? "true" : undefined}
                    aria-describedby={errors.name ? "name-error" : undefined}
                  />
                  {errors.name && (
                    <span id="name-error" role="alert" className="text-destructive text-[14px]">{errors.name.message}</span>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="contact-email" className="text-[15px] text-ink">Email address</label>
                  <input
                    {...register("email")}
                    id="contact-email"
                    type="email"
                    autoComplete="email"
                    className={inputCls}
                    aria-invalid={errors.email ? "true" : undefined}
                    aria-describedby={errors.email ? "email-error" : undefined}
                  />
                  {errors.email && (
                    <span id="email-error" role="alert" className="text-destructive text-[14px]">{errors.email.message}</span>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="contact-message" className="text-[15px] text-ink">Message</label>
                  <textarea
                    {...register("message")}
                    id="contact-message"
                    rows={5}
                    className={`${inputCls} h-auto py-3 resize-none`}
                    aria-invalid={errors.message ? "true" : undefined}
                    aria-describedby={errors.message ? "message-error" : undefined}
                  />
                  {errors.message && (
                    <span id="message-error" role="alert" className="text-destructive text-[14px]">{errors.message.message}</span>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={isSending}
                  className="btn-outline self-start focus-ring disabled:opacity-60 disabled:pointer-events-none"
                >
                  {isSending ? "Sending" : "Send message"}
                </button>
                <span className="sr-only" role="status" aria-live="polite">{isSending ? "Sending message" : ""}</span>
              </form>
            </ScrollFade>
          </div>
        </div>
      </section>

    </PublicLayout>
  );
}
