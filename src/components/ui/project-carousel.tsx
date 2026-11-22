import { useState } from "react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { ModelViewerWrapper } from "@/components/ui/model-viewer-wrapper";

export type CarouselSlide = {
  label: string;
  title: string;
  description: string;
  tags: string[];
  glbFileUrl: string;
};

interface ProjectCarouselProps {
  organization: string;
  dateRange: string;
  slides: CarouselSlide[];
  link?: { href: string; label: string };
  /** The page's one bright moment. Turns on the Haylon accent rule and link. */
  featured?: boolean;
}

const arrow =
  "h-11 w-11 flex items-center justify-center border border-graphite-ink-2/50 text-graphite-ink hover:bg-graphite-ink hover:text-graphite transition-colors outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-graphite-ink";

/**
 * A project with several models: a large graphite plinth carrying the 3D
 * viewer, and a narrow text column beside it. White PLA prints sit on the dark
 * ground so their form reads; the model list runs underneath as text tabs.
 */
export function ProjectCarousel({ organization, dateRange, slides, link, featured = false }: ProjectCarouselProps) {
  const [i, setI] = useState(0);
  const slide = slides[i];
  const go = (n: number) => setI((n + slides.length) % slides.length);

  return (
    <article
      className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start"
      aria-roledescription="carousel"
      aria-label={slides[0].title}
    >
      <div className="lg:col-span-8">
        <div className="relative h-[380px] md:h-[480px] lg:h-[600px] bg-graphite text-graphite-ink-2">
          <ModelViewerWrapper key={slide.glbFileUrl} src={slide.glbFileUrl} alt={slide.title} className="w-full h-full" />

          <div className="absolute left-4 bottom-4 z-20 flex gap-2">
            <button onClick={() => go(i - 1)} aria-label="Previous model" className={arrow}>
              <ChevronLeft className="w-5 h-5" strokeWidth={1.5} aria-hidden="true" />
            </button>
            <button onClick={() => go(i + 1)} aria-label="Next model" className={arrow}>
              <ChevronRight className="w-5 h-5" strokeWidth={1.5} aria-hidden="true" />
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-x-6 gap-y-1 mt-3" role="tablist" aria-label="Choose a model">
          {slides.map((s, n) => (
            <button
              key={s.label}
              role="tab"
              aria-selected={n === i}
              onClick={() => setI(n)}
              className={`h-10 text-[15px] border-b transition-colors focus-ring ${
                n === i ? "text-ink border-ink" : "text-ink-2 border-transparent hover:text-ink"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      <div className="lg:col-span-4 lg:pt-2" aria-live="polite">
        {featured && <span aria-hidden="true" className="block w-16 h-px bg-haylon mb-6" />}
        <p className="text-[14px] text-ink-2 mb-5 leading-relaxed">
          {organization}
          <br />
          {dateRange}
        </p>
        <h3 className="text-ink mb-5 leading-[1.08]" style={{ fontSize: "clamp(1.75rem, 2.6vw, 2.25rem)" }}>
          {slide.title}
        </h3>
        <p className="text-[16px] leading-relaxed text-ink-2 mb-6">{slide.description}</p>
        <p className="tag-run mb-8">
          <span className="sr-only">Tools: </span>
          {slide.tags.join(", ")}
        </p>
        {link && (
          <Link
            href={link.href}
            className={`group inline-flex items-center gap-2 text-[15px] font-medium link-rule focus-ring ${featured ? "text-haylon" : "text-ink"}`}
            style={featured ? { textDecorationColor: "var(--color-haylon)" } : undefined}
          >
            {link.label}
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" strokeWidth={1.5} aria-hidden="true" />
          </Link>
        )}
      </div>
    </article>
  );
}
