import { Link, useLocation } from "wouter";
import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Github, Linkedin, Mail } from "lucide-react";
import { personalInfo } from "@/data/portfolio";

export function PublicLayout({ children }: { children: React.ReactNode }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location, setLocation] = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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

  return (
    <div className="min-h-screen flex flex-col relative">
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-[#2e3328] ${
          scrolled
            ? "bg-[#1a1e16]/60 backdrop-blur-xl backdrop-saturate-150 py-3 shadow-lg shadow-black/30"
            : "bg-[#1a1e16]/20 backdrop-blur-md py-5"
        }`}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="font-display text-xl text-foreground/80 group-hover:text-foreground transition-colors" style={{ fontWeight: 400 }}>
              Aarav Verma
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              link.highlight ? (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium px-4 py-1.5 bg-[#f5f4f0] text-[#111110] rounded-lg hover:bg-[#eeecea] transition-colors"
                >
                  {link.label}
                </a>
              ) : link.page ? (
                <Link key={link.href} href={link.href} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                  {link.label}
                </Link>
              ) : (
                <a key={link.href} href={link.href} onClick={(e) => scrollTo(e, link.href)} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                  {link.label}
                </a>
              )
            ))}
          </nav>

          <button className="md:hidden text-foreground" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle menu">
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed inset-x-0 top-[60px] z-40 bg-background/98 backdrop-blur-sm border-b border-border p-6"
          >
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                link.page ? (
                  <Link key={link.href} href={link.href} onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium text-foreground hover:text-primary transition-colors py-2 border-b border-border last:border-0">
                    {link.label}
                  </Link>
                ) : link.highlight ? (
                  <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" className="text-lg font-medium text-primary py-2 border-b border-border last:border-0">
                    {link.label}
                  </a>
                ) : (
                  <a key={link.href} href={link.href} onClick={(e) => scrollTo(e, link.href)} className="text-lg font-medium text-foreground hover:text-primary transition-colors py-2 border-b border-border last:border-0">
                    {link.label}
                  </a>
                )
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-grow flex flex-col pt-20">
        {children}
      </main>

      <footer className="border-t border-border py-8 mt-16 bg-card/40">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-foreground text-sm font-medium">Aarav Verma</p>
            <p className="text-muted-foreground text-xs mt-0.5">Aerospace Engineering · UIUC · {new Date().getFullYear()}</p>
          </div>
          <div className="flex items-center gap-5">
            <a href={`mailto:${personalInfo.email}`} className="text-muted-foreground hover:text-foreground transition-colors" aria-label="Email">
              <Mail className="w-4 h-4" />
            </a>
            <a href={personalInfo.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="LinkedIn">
              <Linkedin className="w-4 h-4" />
            </a>
            <a href={personalInfo.githubUrl} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="GitHub">
              <Github className="w-4 h-4" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
