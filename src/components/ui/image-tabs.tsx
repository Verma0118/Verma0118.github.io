import { useState } from "react";

export type ProjectImage = { src: string; alt: string; label: string };

interface ImageTabsProps {
  images: ProjectImage[];
  className?: string;
  fit?: "cover" | "contain";
}

// Reference image with optional tabs when a project has several views.
export function ImageTabs({ images, className = "", fit = "contain" }: ImageTabsProps) {
  const [i, setI] = useState(0);
  const img = images[i];
  return (
    <figure className={className}>
      <div className="relative aspect-[16/10] overflow-hidden" style={{ backgroundColor: "#232820" }}>
        <img
          src={img.src}
          alt={img.alt}
          loading="lazy"
          className={`absolute inset-0 w-full h-full ${fit === "cover" ? "object-cover" : "object-contain"}`}
        />
      </div>
      {images.length > 1 && (
        <div className="flex gap-1 mt-2" role="tablist" aria-label="Choose a view">
          {images.map((m, n) => (
            <button
              key={m.src}
              role="tab"
              aria-selected={n === i}
              onClick={() => setI(n)}
              className={`px-3 h-9 text-xs transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e8a33d] ${
                n === i ? "bg-[#f5f4f0] text-[#111110] font-medium" : "text-[#a9ada3] hover:text-[#f5f4f0]"
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
