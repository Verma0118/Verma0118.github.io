import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
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
  reversed?: boolean;
}

const btn =
  "h-11 w-11 flex items-center justify-center bg-[#1a1e16]/85 border border-[#2e3328] text-[#f5f4f0] hover:border-[#f5f4f0]/40 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f5f4f0]";

// Featured-card layout with a 3D viewer that cycles through several models, each with its own text.
export function ProjectCarousel({ organization, dateRange, slides, reversed = false }: ProjectCarouselProps) {
  const [i, setI] = useState(0);
  const slide = slides[i];
  const go = (n: number) => setI((n + slides.length) % slides.length);

  return (
    <article
      className="grid grid-cols-1 lg:grid-cols-2 overflow-hidden"
      style={{ border: "1px solid #d0cec9" }}
      aria-roledescription="carousel"
      aria-label={slides[0].title}
    >
      <div className={`h-[380px] lg:h-[500px] relative ${reversed ? "order-1 lg:order-2" : "order-1"}`} style={{ backgroundColor: "#1a1e16" }}>
        <ModelViewerWrapper key={slide.glbFileUrl} src={slide.glbFileUrl} alt={slide.title} className="w-full h-full" />

        <button onClick={() => go(i - 1)} aria-label="Previous model" className={`${btn} absolute left-3 top-1/2 -translate-y-1/2 z-20`}>
          <ChevronLeft className="w-5 h-5" aria-hidden="true" />
        </button>
        <button onClick={() => go(i + 1)} aria-label="Next model" className={`${btn} absolute right-3 top-1/2 -translate-y-1/2 z-20`}>
          <ChevronRight className="w-5 h-5" aria-hidden="true" />
        </button>

        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex gap-1 bg-[#1a1e16]/85 border border-[#2e3328] p-1" role="tablist" aria-label="Choose a model">
          {slides.map((s, n) => (
            <button
              key={s.label}
              role="tab"
              aria-selected={n === i}
              onClick={() => setI(n)}
              className={`px-3 h-9 text-xs whitespace-nowrap transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f5f4f0] ${
                n === i ? "bg-[#f5f4f0] text-[#111110] font-medium" : "text-[#c9ccc4] hover:text-[#f5f4f0]"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      <div
        className={`flex flex-col justify-center p-8 md:p-12 ${reversed ? "order-2 lg:order-1" : "order-2"}`}
        style={{ backgroundColor: "#e4e2de", ...(reversed ? { borderRight: "1px solid #d0cec9" } : { borderLeft: "1px solid #d0cec9" }) }}
        aria-live="polite"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-0.5 h-7 flex-shrink-0" style={{ backgroundColor: "#d0cec9" }} aria-hidden="true" />
          <span className="text-[10px] tracking-[0.2em] uppercase" style={{ color: "#6b6966" }}>
            {organization} · {dateRange}
          </span>
        </div>
        <h3 className="text-2xl md:text-3xl font-display font-normal mb-4" style={{ color: "#111110", fontWeight: 400 }}>
          {slide.title}
        </h3>
        <p className="text-sm leading-relaxed mb-8" style={{ color: "#6b6966" }}>
          {slide.description}
        </p>
        <div className="flex flex-wrap gap-2" role="list" aria-label="Technologies used">
          {slide.tags.map((tag) => (
            <span key={tag} className="text-xs px-2.5 py-1" style={{ backgroundColor: "#d0cec9", color: "#6b6966" }} role="listitem">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
