import { useEffect, useState } from "react";

/**
 * Subscribes to a CSS media query.
 *
 * Starts at `false` so the server-less first paint never assumes desktop, then
 * corrects on mount. Used to keep the story's fixed 3D guide off phones
 * entirely rather than loading it and hiding it with CSS.
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(query);
    setMatches(mql.matches);
    const onChange = (e: MediaQueryListEvent) => setMatches(e.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [query]);

  return matches;
}

/** Tailwind's `md` breakpoint. The story guide only runs at or above this. */
export const DESKTOP_QUERY = "(min-width: 768px)";
