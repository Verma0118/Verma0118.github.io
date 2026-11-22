import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { ScrollFade } from "@/components/ui/scroll-fade";
import { ModelViewerWrapper } from "@/components/ui/model-viewer-wrapper";
import { useMediaQuery, DESKTOP_QUERY } from "@/hooks/use-media-query";
import { guideModelUrl, guideModelAlt, type StoryBeat } from "@/data/story";

/**
 * One full-viewport beat of the story act.
 *
 * Same skeleton every time (heading, body, figures, link, evidence) so the
 * beats read as one authored sequence. Every beat sits on the same paper
 * ground; rhythm comes from the camera move and from what the evidence is.
 *
 * Layout rule, and the reason this is not a two-column beat: the fixed 3D
 * guide needs a lane of its own. Text is held to the left ~52% on large
 * screens and the guide owns the right. Nothing in the text lane may cross
 * into the guide's.
 *
 * Evidence sits under the text on graphite cells, so FEA plots and build
 * photos read like lab output. It breaks out of the text lane to full width
 * and clears the guide vertically instead.
 *
 * `min-h-[100dvh]` rather than `h-screen`, so the iOS address bar cannot
 * shift the layout mid-scroll. Content sits at z-30 to clear the fixed guide
 * at z-20; this section must not declare a z-index of its own.
 */

function BeatLink({ beat }: { beat: StoryBeat }) {
  if (!beat.link) return null;
  const { href, label, page } = beat.link;

  const className = "group btn-outline self-start focus-ring";
  const inner = (
    <>
      {label}
      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" strokeWidth={1.5} aria-hidden="true" />
    </>
  );

  if (page) {
    return (
      <Link href={href} className={className}>
        {inner}
      </Link>
    );
  }

  return (
    <a
      href={href}
      className={className}
      onClick={(e) => {
        e.preventDefault();
        document.querySelector(href)?.scrollIntoView({ behavior: "smooth", block: "start" });
      }}
    >
      {inner}
    </a>
  );
}

function BeatVisual({ beat }: { beat: StoryBeat }) {
  const isDesktop = useMediaQuery(DESKTOP_QUERY);

  // On the design beat the fixed guide IS the visual, so nothing is rendered
  // here on desktop. Phones never run the guide, so the same model goes inline
  // and interactive instead, on a light plinth.
  if (beat.guideIsVisual) {
    if (isDesktop) return null;
    return (
      <div className="h-[44vh] min-h-[260px] bg-graphite text-graphite-ink-2">
        <ModelViewerWrapper src={guideModelUrl} alt={guideModelAlt} className="w-full h-full" />
      </div>
    );
  }

  const ev = beat.evidence;
  if (!ev) return null;

  const cols = isDesktop ? ev.cols : 2;

  return (
    <ul
      className="grid gap-2 list-none p-0 m-0"
      style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`, maxWidth: ev.maxW }}
    >
      {ev.items.map((img) => {
        const figure = (
          <figure className="m-0">
            <div className={`${ev.height} overflow-hidden bg-graphite`}>
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                decoding="async"
                className={`w-full h-full ${ev.fit === "cover" ? "object-cover" : "object-contain p-2"} transition-transform duration-500 ease-out group-hover:scale-[1.02]`}
              />
            </div>
            {img.label && (
              <figcaption className="text-[14px] mt-2 leading-snug text-ink-2 group-hover:text-ink transition-colors">
                {img.label}
              </figcaption>
            )}
          </figure>
        );

        if (!img.href) return <li key={img.src}>{figure}</li>;

        const cls = "group block focus-ring";
        return (
          <li key={img.src}>
            {img.page ? (
              <Link href={img.href} className={cls}>
                {figure}
              </Link>
            ) : (
              <a href={img.href} target="_blank" rel="noopener noreferrer" className={cls}>
                {figure}
              </a>
            )}
          </li>
        );
      })}
    </ul>
  );
}

export function StoryBeatSection({ beat }: { beat: StoryBeat }) {
  const accentHeading = beat.metrics?.some((m) => m.accent);

  return (
    <section
      id={beat.id}
      aria-labelledby={`${beat.id}-heading`}
      className="relative min-h-[100dvh] flex items-center py-24 md:py-28 bg-paper"
    >
      {/* lg:pl-40 reserves the left gutter for the fixed progress rail. */}
      <div className="container mx-auto px-6 lg:pl-40 relative z-30">
        <div className="w-full">
          {/* Text lane, held to ~52% on large screens. */}
          <div className="w-full lg:max-w-[52%]">
            <ScrollFade className="flex flex-col">
              <h2
                id={`${beat.id}-heading`}
                className="text-ink mb-6 leading-[1.06]"
                style={{ fontSize: "clamp(2.25rem, 4.4vw, 3.75rem)", fontWeight: 300 }}
              >
                {beat.heading}
              </h2>

              {accentHeading && <span aria-hidden="true" className="block w-16 h-px bg-haylon mb-6" />}

              {beat.body && (
                <p className="text-[17px] leading-relaxed max-w-[52ch] mb-12 text-ink-2">
                  {beat.body}
                </p>
              )}

              {beat.metrics && (
                <dl className="grid grid-cols-1 sm:grid-cols-3 gap-x-8 gap-y-6 mb-12">
                  {beat.metrics.map((m) => (
                    <div key={m.label} className="flex flex-col-reverse">
                      <dt className="text-[14px] leading-snug text-ink-2 mt-3">{m.label}</dt>
                      <dd className={`m-0 figure whitespace-nowrap ${m.accent ? "text-haylon" : "text-ink"}`} style={{ fontSize: "clamp(2.25rem, 3.2vw, 3rem)" }}>
                        {m.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              )}

              <BeatLink beat={beat} />
            </ScrollFade>
          </div>

          {(beat.guideIsVisual || beat.evidence) && (
            <ScrollFade delay={0.12} className={beat.guideIsVisual ? "mt-12 lg:max-w-[52%]" : "mt-12"}>
              <BeatVisual beat={beat} />
            </ScrollFade>
          )}
        </div>
      </div>
    </section>
  );
}
