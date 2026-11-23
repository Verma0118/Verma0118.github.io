import { useState } from "react";

export type ProjectImage = { src: string; alt: string; label: string };

interface ImageTabsProps {
  images: ProjectImage[];
  className?: string;
  fit?: "cover" | "contain";
}

// Reference image on a graphite ground, so plots and screenshots read like lab
// output, with text tabs underneath when a project has several views. The tab
// row wraps: the analysis project carries five views, which overflowed the
// viewport on phones and pushed the whole page sideways.
export function ImageTabs({ images, className = "", fit = "contain" }: ImageTabsProps) {
  const [i, setI] = useState(0);
  const img = images[i];
  return (
    <figure className={`m-0 ${className}`}>
      <div className="relative aspect-[16/10] overflow-hidden bg-graphite">
        <img
          src={img.src}
          alt={img.alt}
          loading="lazy"
          className={`absolute inset-0 w-full h-full ${fit === "cover" ? "object-cover" : "object-contain p-3"}`}
        />
      </div>
      {images.length > 1 && (
        <div className="flex flex-wrap gap-x-5 gap-y-1 mt-3" role="tablist" aria-label="Choose a view">
          {images.map((m, n) => (
            <button
              key={m.src}
              role="tab"
              aria-selected={n === i}
              onClick={() => setI(n)}
              className={`h-9 text-[15px] border-b transition-colors focus-ring ${
                n === i ? "text-ink border-ink" : "text-ink-2 border-transparent hover:text-ink"
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>
      )}
    </figure>
  );
}
