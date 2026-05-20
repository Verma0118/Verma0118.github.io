import { useEffect, useRef, useState } from "react";
import { Loader2, Box, AlertCircle } from "lucide-react";

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

export function ModelViewerWrapper({ src, alt, className = "" }: ModelViewerProps) {
  const [status, setStatus] = useState<"loading" | "loaded" | "error">("loading");
  const mvRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setStatus("loading");
    if (!src) return;
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
  }, [src]);

  if (!src) {
    return (
      <div className={`relative overflow-hidden bg-secondary/30 flex flex-col items-center justify-center gap-2 ${className}`}>
        <Box className="w-10 h-10 text-muted-foreground/40" />
        <span className="text-xs text-muted-foreground">No 3D model</span>
      </div>
    );
  }

  return (
    <div className={`relative group ${className}`}>
      {status === "loading" && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/80 gap-2 pointer-events-none">
          <Loader2 className="w-7 h-7 text-primary animate-spin" />
          <span className="text-xs text-muted-foreground">Loading 3D model…</span>
        </div>
      )}
      {status === "error" && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/80 gap-2 pointer-events-none">
          <AlertCircle className="w-7 h-7 text-destructive/70" />
          <span className="text-xs text-muted-foreground">Could not load model</span>
        </div>
      )}
      <model-viewer
        ref={mvRef}
        src={src}
        alt={alt}
        camera-controls
        auto-rotate
        rotation-per-second="15deg"
        interaction-prompt="none"
        shadow-intensity="0.5"
        exposure="1.2"
        tone-mapping="neutral"
        class="w-full h-full cursor-grab active:cursor-grabbing outline-none block"
      >
        <div slot="progress-bar" />
      </model-viewer>
      {status === "loaded" && (
        <div className="absolute bottom-2 right-2 px-2 py-1 rounded bg-black/60 border border-white/10 text-[10px] text-white/60 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
          Drag to rotate · Scroll to zoom
        </div>
      )}
    </div>
  );
}
