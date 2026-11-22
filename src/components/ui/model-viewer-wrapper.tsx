import { useEffect, useRef, useState } from "react";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "model-viewer": any;
    }
  }
}

interface ModelViewerProps {
  src?: string | null;
  alt: string;
  className?: string;
}

/**
 * The <model-viewer> element is only mounted once it is near the viewport.
 *
 * The home page now carries the story guide, the featured carousel and the
 * class-work grid on one scroll, and every GLB here is between 1 and 2 MB.
 * Mounting them all on load would stall the first paint, so each one waits
 * until it is within a screen of being seen.
 */
const ROOT_MARGIN = "600px 0px";

export function ModelViewerWrapper({ src, alt, className = "" }: ModelViewerProps) {
  const [status, setStatus] = useState<"loading" | "loaded" | "error">("loading");
  const [near, setNear] = useState(false);
  const hostRef = useRef<HTMLDivElement>(null);
  const mvRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    if (typeof IntersectionObserver === "undefined") {
      setNear(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setNear(true);
          io.disconnect();
        }
      },
      { rootMargin: ROOT_MARGIN },
    );
    io.observe(host);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    setStatus("loading");
    if (!src || !near) return;
    const el = mvRef.current;
    if (!el) return;
    const onLoad = () => setStatus("loaded");
    const onError = () => setStatus("error");
    const onProgress = (e: any) => { if (e?.detail?.totalProgress === 1) setStatus("loaded"); };
    el.addEventListener("load", onLoad);
    el.addEventListener("error", onError);
    el.addEventListener("progress", onProgress);
    return () => {
      el.removeEventListener("load", onLoad);
      el.removeEventListener("error", onError);
      el.removeEventListener("progress", onProgress);
    };
  }, [src, near]);

  // Status overlays inherit the plinth's text colour, so they read on both the
  // light and the graphite grounds without knowing which one they sit on.
  if (!src) {
    return (
      <div className={`relative overflow-hidden flex items-center justify-center ${className}`}>
        <span className="text-[14px] opacity-70">No 3D model</span>
      </div>
    );
  }

  return (
    <div ref={hostRef} className={`relative group ${className}`}>
      {(!near || status === "loading") && (
        <div className="absolute inset-0 z-10 flex items-end justify-start p-4 pointer-events-none" aria-hidden="true">
          <span className="text-[14px] opacity-70 motion-safe:animate-pulse">Loading model</span>
        </div>
      )}
      {status === "error" && (
        <div className="absolute inset-0 z-10 flex items-end justify-start p-4 pointer-events-none" role="status">
          <span className="text-[14px]">This model could not be loaded.</span>
        </div>
      )}
      {near && (
        <model-viewer
          ref={mvRef}
          src={src}
          alt={alt}
          camera-controls
          auto-rotate
          rotation-per-second="12deg"
          interaction-prompt="none"
          shadow-intensity="0.8"
          shadow-softness="0.9"
          exposure="1"
          environment-image="neutral"
          tone-mapping="neutral"
          class="w-full h-full cursor-grab active:cursor-grabbing outline-none block"
          style={{ backgroundColor: "transparent" }}
        >
          <div slot="progress-bar" />
        </model-viewer>
      )}
      {status === "loaded" && (
        <div className="absolute bottom-3 right-4 text-[13px] opacity-0 group-hover:opacity-70 transition-opacity pointer-events-none" aria-hidden="true">
          Drag to rotate
        </div>
      )}
    </div>
  );
}
