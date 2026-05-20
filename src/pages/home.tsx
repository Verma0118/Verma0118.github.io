import { personalInfo, cadProjects, softwareProjects } from "@/data/portfolio";
import { PublicLayout } from "@/components/layout/public-layout";
import { ModelViewerWrapper } from "@/components/ui/model-viewer-wrapper";
import { FractalBackground } from "@/components/ui/fractal-background";
import { ScrollFade } from "@/components/ui/scroll-fade";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Download, Send, MapPin, Calendar, Building, Code2, ArrowDown, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";

// ── Replace YOUR_FORM_ID with your Formspree form ID ──────────────────────
// Sign up at https://formspree.io → New Form → copy the ID from the endpoint
const FORMSPREE_ENDPOINT = "https://formspree.io/f/YOUR_FORM_ID";

const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function Home() {
  const { toast } = useToast();
  const [isSending, setIsSending] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  useEffect(() => {
    const target = sessionStorage.getItem("scrollTarget");
    if (target) {
      sessionStorage.removeItem("scrollTarget");
      const attempt = (tries: number) => {
        const el = document.querySelector(target);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        } else if (tries > 0) {
          setTimeout(() => attempt(tries - 1), 120);
        }
      };
      setTimeout(() => attempt(8), 200);
    }
  }, []);

  const onContactSubmit = async (data: ContactFormValues) => {
    setIsSending(true);
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      toast({ title: "Message sent", description: "Thanks for reaching out. I'll get back to you soon." });
      reset();
    } catch {
      toast({ variant: "destructive", title: "Failed to send", description: "Something went wrong. Please email directly." });
    } finally {
      setIsSending(false);
    }
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
  };
  const stagger = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  return (
    <PublicLayout>

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="min-h-screen flex flex-col items-center justify-center relative px-6 overflow-hidden">
        <FractalBackground />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 80% 70% at 50% 50%, transparent 35%, hsl(var(--background)) 100%)" }}
        />
        <div className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto">
          <motion.div initial="hidden" animate="visible" variants={stagger} className="flex flex-col items-center">
            <motion.h1
              variants={fadeUp}
              className="font-display font-light leading-[0.9] tracking-[0.06em] mb-1"
              style={{ fontSize: "clamp(5rem, 14vw, 12rem)" }}
            >
              <span className="text-foreground/90">Aarav</span>
            </motion.h1>
            <motion.h1
              variants={fadeUp}
              className="font-display font-light leading-[0.9] tracking-[0.06em] mb-12"
              style={{
                fontSize: "clamp(5rem, 14vw, 12rem)",
                background: "linear-gradient(135deg, #f97316 0%, #fb923c 60%, #fdba74 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Verma
            </motion.h1>

            <motion.div variants={fadeUp} className="w-12 h-px bg-primary/30 mb-8" />

            <motion.div variants={fadeUp} className="space-y-2 mb-12">
              <p className="text-base md:text-lg font-medium text-foreground/60 tracking-wide">
                Aerospace Engineering
                <span className="text-primary/40 mx-3">·</span>
                CS Minor
              </p>
              <p className="text-xs md:text-sm text-muted-foreground/60 tracking-widest uppercase">
                University of Illinois Urbana-Champaign
              </p>
              <p className="text-xs text-muted-foreground/60 tracking-wide pt-1">
                Mechanical design · Flight systems · Engineering software
              </p>
            </motion.div>

            <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-4">
              <a
                href="#cad-projects"
                onClick={(e) => { e.preventDefault(); document.querySelector("#cad-projects")?.scrollIntoView({ behavior: "smooth", block: "start" }); }}
                className="inline-flex items-center gap-2 px-7 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-all hover:scale-105 text-sm tracking-wide shadow-lg shadow-primary/20"
              >
                CAD Projects
              </a>
              <a
                href="#software-projects"
                onClick={(e) => { e.preventDefault(); document.querySelector("#software-projects")?.scrollIntoView({ behavior: "smooth", block: "start" }); }}
                className="inline-flex items-center gap-2 px-7 py-3 bg-transparent border border-white/20 text-foreground/80 font-semibold rounded-lg hover:border-primary/50 hover:text-primary transition-all hover:scale-105 text-sm tracking-wide"
              >
                Software Projects
              </a>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground/50"
        >
          <span className="text-[10px] tracking-widest uppercase">Scroll</span>
          <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
        </motion.div>
      </section>

      {/* ── CAD PROJECTS ─────────────────────────────────── */}
      <section id="cad-projects" className="py-24 border-t border-border bg-card/20">
        <div className="container mx-auto px-6">
          <ScrollFade className="mb-14">
            <p className="text-primary text-sm font-semibold tracking-wide mb-2">01 — CAD & Simulation</p>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-3">Hardware Design</h2>
            <p className="text-muted-foreground max-w-2xl text-base leading-relaxed">
              Mechanical designs, structural analysis, and physical builds. Interact with the 3D models directly below.
            </p>
          </ScrollFade>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            {cadProjects.map((project, idx) => (
              <ScrollFade
                key={project.id}
                delay={idx * 0.08}
                className="card-surface overflow-hidden flex flex-col hover:border-primary/30 transition-colors duration-300"
              >
                <div className="h-[340px] sm:h-[420px] relative border-b border-border bg-black/60">
                  <ModelViewerWrapper src={project.glbFileUrl} alt={project.title} className="w-full h-full" />
                  <div className="absolute top-3 left-3 z-10 flex flex-wrap gap-1.5">
                    {project.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="px-2.5 py-1 bg-black/70 backdrop-blur-md border border-primary/30 text-primary text-xs font-medium rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="p-7 flex flex-col flex-grow">
                  <h3 className="text-xl font-display font-bold text-foreground mb-3">{project.title}</h3>
                  <div className="flex flex-wrap gap-x-5 gap-y-1.5 mb-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1.5"><Building className="w-3.5 h-3.5 text-primary flex-shrink-0" />{project.organization}</span>
                    <span className="flex items-center gap-1.5 text-foreground/80 font-medium">{project.role}</span>
                    <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-primary flex-shrink-0" />{project.dateRange}</span>
                    <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-primary flex-shrink-0" />{project.location}</span>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed flex-grow whitespace-pre-wrap">{project.description}</p>
                </div>
              </ScrollFade>
            ))}
          </div>
        </div>
      </section>

      {/* ── SOFTWARE PROJECTS ────────────────────────────── */}
      <section id="software-projects" className="py-24 border-t border-border">
        <div className="container mx-auto px-6">
          <ScrollFade className="mb-14">
            <p className="text-primary text-sm font-semibold tracking-wide mb-2">02 — Software</p>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-3">Software Projects</h2>
            <p className="text-muted-foreground max-w-2xl text-base leading-relaxed">
              Flight software, simulation tools, and engineering applications — all available on GitHub.
            </p>
          </ScrollFade>

          {softwareProjects.length === 0 ? (
            <div className="card-surface p-12 text-center border-dashed border-border">
              <Code2 className="w-10 h-10 text-muted-foreground/40 mx-auto mb-3" />
              <p className="text-muted-foreground text-sm">
                Software projects coming soon — add them to <code className="text-primary text-xs">src/data/portfolio.ts</code>
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {softwareProjects.map((project, idx) => (
                <ScrollFade
                  key={project.id}
                  delay={idx * 0.08}
                  className="card-surface p-6 flex flex-col hover:border-primary/30 transition-colors duration-300"
                >
                  {project.thumbnailUrl ? (
                    <div className="relative -mx-6 -mt-6 mb-5 h-36 overflow-hidden rounded-t-lg border-b border-border">
                      <img src={project.thumbnailUrl} alt={project.title} className="w-full h-full object-cover" />
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="absolute top-2.5 right-2.5 w-8 h-8 rounded-md bg-black/60 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-black/80 transition-colors" aria-label="View on GitHub">
                        <Github className="w-4 h-4" />
                      </a>
                    </div>
                  ) : (
                    <div className="flex justify-between items-start mb-4">
                      <div className="w-10 h-10 rounded-md bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                        <Code2 className="w-5 h-5" />
                      </div>
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" aria-label="View on GitHub">
                        <Github className="w-5 h-5" />
                      </a>
                    </div>
                  )}
                  <h3 className="text-base font-display font-bold mb-2 text-foreground">{project.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-5 flex-grow">{project.description}</p>
                  <div className="flex flex-wrap gap-1.5 mt-auto">
                    {project.tags.map(tag => (
                      <span key={tag} className="text-xs font-medium text-primary/80 bg-primary/8 px-2 py-0.5 rounded border border-primary/15">{tag}</span>
                    ))}
                  </div>
                </ScrollFade>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── ABOUT ────────────────────────────────────────── */}
      <section id="about" className="py-24 border-t border-border bg-card/20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

            <ScrollFade direction="left" className="lg:col-span-5">
              <p className="text-primary text-sm font-semibold tracking-wide mb-2">03 — About</p>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-8">About Me</h2>
              <div className="card-surface p-7">
                <p className="text-muted-foreground leading-relaxed text-sm mb-7">{personalInfo.bio}</p>
                <div className="space-y-5 border-t border-border pt-5">
                  <div>
                    <h4 className="text-xs font-semibold text-primary uppercase tracking-widest mb-1.5">Education</h4>
                    <p className="text-foreground text-sm">{personalInfo.education}</p>
                  </div>
                  {personalInfo.currentFocus && (
                    <div>
                      <h4 className="text-xs font-semibold text-primary uppercase tracking-widest mb-1.5">Current Focus</h4>
                      <p className="text-foreground text-sm">{personalInfo.currentFocus}</p>
                    </div>
                  )}
                  {personalInfo.organizations.length > 0 && (
                    <div>
                      <h4 className="text-xs font-semibold text-primary uppercase tracking-widest mb-1.5">Organizations</h4>
                      <ul className="space-y-1">
                        {personalInfo.organizations.map((org) => (
                          <li key={org} className="text-sm text-foreground flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                            {org}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                {personalInfo.resumeUrl && (
                  <a
                    href={personalInfo.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground font-semibold rounded-md hover:bg-primary/90 transition-colors text-sm"
                  >
                    <Download className="w-4 h-4" /> Download Resume
                  </a>
                )}
              </div>
            </ScrollFade>

            <ScrollFade direction="right" className="lg:col-span-7 flex flex-col justify-start lg:pt-[3.75rem]">
              <h3 className="text-xl font-display font-bold text-foreground mb-8">Technical Skills</h3>
              <div className="space-y-8">
                <div>
                  <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-sm bg-primary" /> CAD & Simulation
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {personalInfo.skills.cadSimulation.map(skill => (
                      <span key={skill} className="px-3 py-1.5 card-surface text-foreground text-sm hover:border-primary/40 transition-colors cursor-default">{skill}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-sm bg-primary/60" /> Software & Programming
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {personalInfo.skills.software.map(skill => (
                      <span key={skill} className="px-3 py-1.5 card-surface text-foreground text-sm hover:border-primary/40 transition-colors cursor-default">{skill}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-sm bg-border" /> Manufacturing & Hardware
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {personalInfo.skills.manufacturing.map(skill => (
                      <span key={skill} className="px-3 py-1.5 card-surface text-foreground text-sm hover:border-primary/40 transition-colors cursor-default">{skill}</span>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollFade>
          </div>
        </div>
      </section>

      {/* ── CONTACT ──────────────────────────────────────── */}
      <section id="contact" className="py-24 border-t border-border">
        <div className="container mx-auto px-6">
          <ScrollFade className="max-w-4xl mx-auto">
            <div className="mb-12">
              <p className="text-primary text-sm font-semibold tracking-wide mb-2">04 — Contact</p>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-3">Get in Touch</h2>
              <p className="text-muted-foreground text-base">Open to engineering internships, research opportunities, and technical conversations.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="card-surface p-7 flex flex-col gap-6">
                <h3 className="font-display font-semibold text-foreground text-base">Contact</h3>
                <div className="space-y-4">
                  <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-3 group">
                    <div className="w-9 h-9 rounded-md bg-card border border-border flex items-center justify-center group-hover:border-primary/40 group-hover:bg-primary/8 transition-colors">
                      <Mail className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground mb-0.5">Email</div>
                      <div className="text-sm text-foreground group-hover:text-primary transition-colors font-medium">{personalInfo.email}</div>
                    </div>
                  </a>
                  <a href={personalInfo.linkedinUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 group">
                    <div className="w-9 h-9 rounded-md bg-card border border-border flex items-center justify-center group-hover:border-blue-500/40 group-hover:bg-blue-500/8 transition-colors">
                      <Linkedin className="w-4 h-4 text-muted-foreground group-hover:text-blue-400 transition-colors" />
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground mb-0.5">LinkedIn</div>
                      <div className="text-sm text-foreground group-hover:text-primary transition-colors font-medium">
                        {personalInfo.linkedinUrl.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')}
                      </div>
                    </div>
                  </a>
                  <a href={personalInfo.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 group">
                    <div className="w-9 h-9 rounded-md bg-card border border-border flex items-center justify-center group-hover:border-white/30 group-hover:bg-white/8 transition-colors">
                      <Github className="w-4 h-4 text-muted-foreground group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground mb-0.5">GitHub</div>
                      <div className="text-sm text-foreground group-hover:text-white transition-colors font-medium">
                        {personalInfo.githubUrl.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')}
                      </div>
                    </div>
                  </a>
                </div>
              </div>

              <form onSubmit={handleSubmit(onContactSubmit)} className="card-surface p-7 flex flex-col gap-4">
                <h3 className="font-display font-semibold text-foreground text-base">Send a Message</h3>
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1.5">Your Name</label>
                  <input {...register("name")} type="text" className="w-full bg-background border border-border rounded-md py-2.5 px-3 text-foreground text-sm focus:border-primary focus:ring-1 focus:ring-primary/30 outline-none transition-all" placeholder="Jane Smith" />
                  {errors.name && <span className="text-destructive text-xs mt-1 block">{errors.name.message}</span>}
                </div>
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1.5">Email Address</label>
                  <input {...register("email")} type="email" className="w-full bg-background border border-border rounded-md py-2.5 px-3 text-foreground text-sm focus:border-primary focus:ring-1 focus:ring-primary/30 outline-none transition-all" placeholder="jane@example.com" />
                  {errors.email && <span className="text-destructive text-xs mt-1 block">{errors.email.message}</span>}
                </div>
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1.5">Message</label>
                  <textarea {...register("message")} rows={4} className="w-full bg-background border border-border rounded-md py-2.5 px-3 text-foreground text-sm focus:border-primary focus:ring-1 focus:ring-primary/30 outline-none transition-all resize-none" placeholder="Tell me about the opportunity or question..." />
                  {errors.message && <span className="text-destructive text-xs mt-1 block">{errors.message.message}</span>}
                </div>
                <button
                  type="submit"
                  disabled={isSending}
                  className="mt-1 inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground font-semibold rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50 text-sm"
                >
                  {isSending ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Send className="w-4 h-4" /> Send Message</>}
                </button>
              </form>
            </div>
          </ScrollFade>
        </div>
      </section>

    </PublicLayout>
  );
}
