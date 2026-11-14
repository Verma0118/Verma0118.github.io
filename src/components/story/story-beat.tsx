import { Link } from "wouter";
import { ArrowRight, ArrowDown } from "lucide-react";
import { ScrollFade } from "@/components/ui/scroll-fade";
import { ModelViewerWrapper } from "@/components/ui/model-viewer-wrapper";
import { useMediaQuery, DESKTOP_QUERY } from "@/hooks/use-media-query";
import { guideModelUrl, guideModelAlt, type StoryBeat } from "@/data/story";

/**
 * One full-viewport beat of the story act.
 *
 * Same skeleton every time (heading, body, metrics, link, evidence) so the
 * five beats read as one authored sequence. Rhythm comes from the dark/cream
 * theme flip and from what the evidence is, not from moving the structure
 * around.
 *
 * Layout rule, and the reason this is not a two-column beat: the fixed 3D
 * guide needs a lane of its own. Text is held to the left ~52% on large
 * screens and the guide owns the right. An earlier two-column version swept
 * the model straight through the headline, and cream type over a white
 * fuselage is unreadable. Nothing in the text lane may cross into the guide's.
 *
 * Evidence images sit under the text rather than opposite it, so they stay in
 * the text lane too. On phones the guide does not run at all, so the evidence
 * is the only visual and gets the full width.
 *
 * `min-h-[100dvh]` rather than `h-screen`, so the iOS address bar cannot
 * shift the layout mid-scroll. Content sits at z-30 to clear the fixed guide
 * at z-20; this section must not declare a z-index of its own.
 */

const THEME = {
  cream: {
    bg: "#eeecea",
    heading: "#111110",
    body: "#5c5a56",
    metricValue: "#111110",
    metricLabel: "#5c5a56",
    rule: "#d0cec9",
    btnBg: "#1a1e16",
    btnText: "#f5f4f0",
    btnHover: "#2e3328",
    focus: "#1a1e16",
  },
  dark: {
    bg: "#1a1e16",
    heading: "#f5f4f0",
    body: "#8a8f84",
    metricValue: "#f5f4f0",
    metricLabel: "#8a8f84",
    rule: "#2e3328",
    btnBg: "#f5f4f0",
    btnText: "#111110",
    btnHover: "#eeecea",
    focus: "#f5f4f0",
  },
} as const;

function BeatLink({ beat, t }: { beat: StoryBeat; t: typeof THEME.cream | typeof THEME.dark }) {
  if (!beat.link) return null;
  const { href, label, page } = beat.link;

  const className =
    "group inline-flex items-center gap-2 self-start px-6 h-12 text-sm font-medium transition-colors active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2";
  const style = { backgroundColor: t.btnBg, color: t.btnText, outlineColor: t.focus };

  const inner = (
    <>
      {label}
      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
    </>
  );

  if (page) {
    return (
      <Link href={href} className={className} style={style}>
        {inner}
      </Link>
    );
  }

  return (
    <a
      href={href}
      className={className}
      style={style}
      onClick={(e) => {
        e.preventDefault();
        document.querySelector(href)?.scrollIntoView({ behavior: "smooth", block: "start" });
      }}
    >
      {inner}
    </a>
  );
}

function BeatVisual({ beat, t }: { beat: StoryBeat; t: typeof THEME.cream | typeof THEME.dark }) {
  const isDesktop = useMediaQuery(DESKTOP_QUERY);
  const visual = beat.visual;
  if (!visual) return null;

  // On the design beat the fixed guide IS the visual, so nothing is rendered
  // here on desktop. Phones never run the guide, so the same model goes inline
  // and interactive instead.
  if (visual.type === "guide") {
    if (isDesktop) return null;
    return (
      <div className="h-[44vh] min-h-[260px]" style={{ border: `1px solid ${t.rule}`, backgroundColor: "#1a1e16" }}>
        <ModelViewerWrapper src={guideModelUrl} alt={guideModelAlt} className="w-full h-full" />
      </div>
    );
  }

  if (visual.type === "image") {
    return (
      <figure className="m-0 max-w-[420px]">
        <div className="aspect-[16/11] overflow-hidden" style={{ border: `1px solid ${t.rule}`, backgroundColor: "#232820" }}>
          <img src={visual.src} alt={visual.alt} loading="lazy" decoding="async" className="w-full h-full object-contain" />
        </div>
      </figure>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 max-w-[420px]">
      {visual.items.map((img) => (
        <figure key={img.src} className="m-0">
          <div className="aspect-[4/5] overflow-hidden" style={{ border: `1px solid ${t.rule}`, backgroundColor: "#e4e2de" }}>
            <img src={img.src} alt={img.alt} loading="lazy" decoding="async" className="w-full h-full object-cover" />
          </div>
        </figure>
      ))}
    </div>
  );
}

export function StoryBeatSection({ beat, nextId }: { beat: StoryBeat; nextId?: string }) {
  const t = THEME[beat.theme];

  return (
    <section
      id={beat.id}
      aria-labelledby={`${beat.id}-heading`}
      className="relative min-h-[100dvh] flex items-center py-24 md:py-28"
      style={{ backgroundColor: t.bg, borderTop: `1px solid ${t.rule}` }}
    >
      {/* lg:pl-40 reserves the left gutter for the fixed progress rail. */}
      <div className="container mx-auto px-6 lg:pl-40 relative z-30">
        {/* Text lane. Must not extend past ~52% on large screens: the fixed
            guide owns the right and cream type over the model is unreadable. */}
        <div className="w-full lg:max-w-[52%]">

          <ScrollFade className="flex flex-col">
            <h2
              id={`${beat.id}-heading`}
              className="font-display font-normal mb-5 leading-[1.08]"
              style={{ color: t.heading, fontWeight: 400, fontSize: "clamp(2rem, 4.2vw, 3.25rem)" }}
            >
              {beat.heading}
            </h2>

            {beat.body && (
              <p className="text-base leading-relaxed max-w-[52ch] mb-10" style={{ color: t.body }}>
                {beat.body}
              </p>
            )}

            {beat.metrics && (
              <dl className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
                {beat.metrics.map((m) => (
                  <div key={m.label} className="border-t pt-4" style={{ borderColor: t.rule }}>
                    <dt className="sr-only">{m.label}</dt>
                    <dd className="m-0">
                      <span
                        className="block font-display font-normal leading-none mb-2"
                        style={{ color: t.metricValue, fontWeight: 400, fontSize: "clamp(1.875rem, 3vw, 2.5rem)" }}
                      >
                        {m.value}
                      </span>
                      <span className="block text-sm leading-snug" style={{ color: t.metricLabel }}>
                        {m.label}
                      </span>
                    </dd>
                  </div>
                ))}
              </dl>
            )}

            <BeatLink beat={beat} t={t} />
          </ScrollFade>

          {beat.visual && (
            <ScrollFade delay={0.12} className="mt-12">
              <BeatVisual beat={beat} t={t} />
            </ScrollFade>
          )}

        </div>
      </div>

      {nextId && (
        <a
          href={`#${nextId}`}
          onClick={(e) => {
            e.preventDefault();
            document.getElementById(nextId)?.scrollIntoView({ behavior: "smooth", block: "start" });
          }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 inline-flex items-center justify-center w-11 h-11 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
          style={{ border: `1px solid ${t.rule}`, color: t.body, outlineColor: t.focus }}
        >
          <ArrowDown className="w-4 h-4" aria-hidden="true" />
          <span className="sr-only">Continue to {nextId.replace("story-", "")}</span>
        </a>
      )}
    </section>
  );
}
