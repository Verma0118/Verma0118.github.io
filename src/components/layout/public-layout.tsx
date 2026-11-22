import { Link, useLocation } from "wouter";
import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Github, Linkedin, Mail } from "lucide-react";
import { personalInfo } from "@/data/portfolio";

/**
 * `navHidden` is used by the home page's story act. While the narrative is on
 * screen the nav is not rendered at all, rather than faded out, so it never
 * becomes a set of invisible but focusable controls. The wordmark stays.
 */
export function PublicLayout({
  children,
  navHidden = false,
  skipTarget = "#cad-projects",
}: {
  children: React.ReactNode;
  navHidden?: boolean;
  skipTarget?: string;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location, setLocation] = useLocation();
  const sentinelRef = useRef<HTMLDivElement>(null);

  // A sentinel at the top of the page flips the header's hairline on, instead
  // of a scroll listener that would fire on every frame.
  useEffect(() => {
    const el = sentinelRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(([entry]) => setScrolled(!entry.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const navLinks: { href: string; label: string; highlight?: boolean; page?: boolean }[] = [
    { href: "#cad-projects", label: "CAD & Simulation" },
    { href: "#software-projects", label: "Software" },
    { href: "/class-projects", label: "Class Work", page: true },
    { href: "#about", label: "About" },
    { href: "#contact", label: "Contact" },
    { href: "/resume.pdf", label: "Resume", highlight: true },
  ];

  const doScroll = useCallback((hash: string) => {
    const target = document.querySelector(hash);
    if (target) {
      const offsetPosition = target.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  }, []);

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (location !== "/") {
      sessionStorage.setItem("scrollTarget", href);
      setLocation("/");
      return;
    }
    doScroll(href);
  };

  // The story act can hide the nav while a menu is open on a small screen.
  useEffect(() => {
    if (navHidden && mobileMenuOpen) setMobileMenuOpen(false);
  }, [navHidden, mobileMenuOpen]);

  return (
    <div className="min-h-[100dvh] flex flex-col relative bg-paper">
      <div ref={sentinelRef} aria-hidden="true" className="absolute top-0 left-0 h-12 w-px pointer-events-none" />
      <a
        href={skipTarget}
        onClick={(e) => {
          e.preventDefault();
          const el = document.querySelector(skipTarget);
          if (!el) return;
          el.scrollIntoView({ behavior: "auto", block: "start" });
          (el as HTMLElement).focus?.();
        }}
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:px-4 focus:py-2 focus:bg-ink focus:text-paper focus:text-sm focus:font-medium focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-ink"
      >
        Skip to the portfolio
      </a>

      <header
        className={`fixed top-0 left-0 right-0 z-50 h-16 md:h-[72px] flex items-center bg-paper border-b transition-colors duration-300 ${
          scrolled ? "border-rule" : "border-transparent"
        }`}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          <Link href="/" className="focus-ring">
            <span className="font-display text-[22px] text-ink tracking-[-0.01em]" style={{ fontWeight: 400 }}>
              Aarav Verma
            </span>
          </Link>

          {!navHidden && (
          <nav className="hidden md:flex items-center gap-7" aria-label="Primary">
            {navLinks.map((link) => (
              link.highlight ? (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[15px] text-ink link-rule focus-ring"
                >
                  {link.label}
                </a>
              ) : link.page ? (
                <Link key={link.href} href={link.href} className="text-[15px] text-ink-2 hover:text-ink transition-colors focus-ring">
                  {link.label}
                </Link>
              ) : (
                <a key={link.href} href={link.href} onClick={(e) => scrollTo(e, link.href)} className="text-[15px] text-ink-2 hover:text-ink transition-colors focus-ring">
                  {link.label}
                </a>
              )
            ))}
          </nav>
          )}

          {!navHidden && (
          <button
            className="md:hidden text-ink h-11 w-11 -mr-2 flex items-center justify-center focus-ring"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X strokeWidth={1.5} /> : <Menu strokeWidth={1.5} />}
          </button>
          )}
        </div>
      </header>

      <AnimatePresence>
        {mobileMenuOpen && !navHidden && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed inset-x-0 top-16 z-40 bg-paper border-b border-rule px-6 pb-6"
          >
            <nav className="flex flex-col" aria-label="Primary">
              {navLinks.map((link) => (
                link.page ? (
                  <Link key={link.href} href={link.href} onClick={() => setMobileMenuOpen(false)} className="font-display text-2xl text-ink py-3 border-b border-rule last:border-0 focus-ring">
                    {link.label}
                  </Link>
                ) : link.highlight ? (
                  <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" className="font-display text-2xl text-ink py-3 border-b border-rule last:border-0 focus-ring">
                    {link.label}
                  </a>
                ) : (
                  <a key={link.href} href={link.href} onClick={(e) => scrollTo(e, link.href)} className="font-display text-2xl text-ink py-3 border-b border-rule last:border-0 focus-ring">
                    {link.label}
                  </a>
                )
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-grow flex flex-col pt-16 md:pt-[72px]">
        {children}
      </main>

      <footer className="border-t border-rule">
        <div className="container mx-auto px-6 py-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <p className="font-display text-2xl text-ink" style={{ fontWeight: 400 }}>Aarav Verma</p>
            <p className="text-[14px] text-ink-2 mt-1">Aerospace Engineering, University of Illinois Urbana-Champaign</p>
          </div>
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 list-none p-0 m-0 text-[15px]">
            <li>
              <a href={`mailto:${personalInfo.email}`} className="inline-flex items-center gap-2 text-ink link-rule focus-ring">
                <Mail className="w-4 h-4" strokeWidth={1.5} aria-hidden="true" /> Email
              </a>
            </li>
            <li>
              <a href={personalInfo.linkedinUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-ink link-rule focus-ring">
                <Linkedin className="w-4 h-4" strokeWidth={1.5} aria-hidden="true" /> LinkedIn
              </a>
            </li>
            <li>
              <a href={personalInfo.githubUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-ink link-rule focus-ring">
                <Github className="w-4 h-4" strokeWidth={1.5} aria-hidden="true" /> GitHub
              </a>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  );
}
