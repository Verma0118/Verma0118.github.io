import { personalInfo, cadProjects, softwareProjects } from "@/data/portfolio";
import { PublicLayout } from "@/components/layout/public-layout";
import { ModelViewerWrapper } from "@/components/ui/model-viewer-wrapper";
import { FractalBackground } from "@/components/ui/fractal-background";
import { ScrollFade } from "@/components/ui/scroll-fade";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Download, Send, Code2, ArrowDown, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";

// ── Replace YOUR_FORM_ID with your Formspree form ID ──────────────────────
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
    visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
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

            <motion.div variants={fadeUp} className="mb-8">
              <span className="inline-flex items-center px-4 py-1.5 rounded-full border border-[#2e3328] bg-[#232820]/80 text-[#8a8f84] text-[11px] tracking-[0.18em] uppercase">
                Aerospace Engineer · Startup Founder
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="font-display text-foreground leading-[1] tracking-tight mb-8"
              style={{ fontSize: "clamp(4rem, 11vw, 8rem)", fontWeight: 400 }}
            >
              Aarav Verma
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-[11px] md:text-xs tracking-[0.2em] uppercase text-muted-foreground mb-12"
            >
              NOBE · Ghost Electric Motorcycles · UIUC · Class of 2029
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-4">
              <a
                href="#cad-projects"
                onClick={(e) => { e.preventDefault(); document.querySelector("#cad-projects")?.scrollIntoView({ behavior: "smooth", block: "start" }); }}
                className="inline-flex items-center gap-2 px-7 py-3 bg-[#f5f4f0] text-[#111110] font-medium rounded-lg hover:bg-[#eeecea] transition-colors text-sm tracking-wide"
              >
                View Projects
              </a>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-3 bg-transparent border border-[#2e3328] text-[#8a8f84] font-medium rounded-lg hover:border-[#f5f4f0]/30 hover:text-[#f5f4f0] transition-all text-sm tracking-wide"
              >
                Resume
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
      <section id="cad-projects" className="py-24 border-t border-[#2e3328]">
        <div className="container mx-auto px-6">
          <ScrollFade className="mb-14">
            <p className="text-[#8a8f84] text-xs font-medium tracking-[0.18em] uppercase mb-3">01 — CAD & Simulation</p>
            <h2 className="text-3xl md:text-4xl font-display font-normal text-foreground mb-3">Hardware Design</h2>
            <p className="text-muted-foreground max-w-2xl text-base leading-relaxed">
              Mechanical designs, structural analysis, and physical builds. Interact with the 3D models directly below.
            </p>
          </ScrollFade>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            {cadProjects.map((project, idx) => (
              <ScrollFade
                key={project.id}
                delay={idx * 0.08}
                className="overflow-hidden flex flex-col rounded-xl border border-[#2e3328] bg-[#232820] hover:shadow-[0_8px_40px_rgba(0,0,0,0.5)] transition-shadow duration-300"
              >
                <div className="h-[340px] sm:h-[420px] relative border-b border-[#2e3328] bg-black/40">
                  <ModelViewerWrapper src={project.glbFileUrl} alt={project.title} className="w-full h-full" />
                  <div className="absolute top-3 left-3 z-10 flex flex-wrap gap-1.5">
                    {project.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="px-2.5 py-1 bg-[#1a1e16]/90 backdrop-blur-md border border-[#2e3328] text-[#8a8f84] text-xs font-medium rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="p-7 flex flex-col flex-grow">
                  <h3 className="text-xl font-display font-normal text-foreground mb-2">{project.title}</h3>
                  <p className="text-xs text-muted-foreground mb-4 tracking-wide">
                    {project.organization} · {project.role} · {project.dateRange}
                  </p>
                  <p className="text-muted-foreground text-sm leading-relaxed flex-grow">{project.description}</p>
                </div>
              </ScrollFade>
            ))}
          </div>
        </div>
      </section>

      {/* ── SOFTWARE PROJECTS ────────────────────────────── */}
      <section id="software-projects" className="py-24" style={{ backgroundColor: '#eeecea' }}>
        <div className="container mx-auto px-6">
          <ScrollFade className="mb-14">
            <p className="text-xs font-medium tracking-[0.18em] uppercase mb-3" style={{ color: '#6b6966' }}>02 — Software</p>
            <h2 className="text-3xl md:text-4xl font-display font-normal mb-3" style={{ color: '#111110' }}>Software Projects</h2>
            <p className="text-base leading-relaxed max-w-2xl" style={{ color: '#6b6966' }}>
              Flight software, simulation tools, and engineering applications — all available on GitHub.
            </p>
          </ScrollFade>

          {softwareProjects.length === 0 ? (
            <div className="p-12 text-center rounded-xl border border-dashed" style={{ backgroundColor: '#e4e2de', borderColor: '#d0cec9' }}>
              <Code2 className="w-10 h-10 mx-auto mb-3" style={{ color: '#6b6966' }} />
              <p className="text-sm" style={{ color: '#6b6966' }}>
                Software projects coming soon — add them to <code className="text-xs" style={{ color: '#111110' }}>src/data/portfolio.ts</code>
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {softwareProjects.map((project, idx) => (
                <ScrollFade
                  key={project.id}
                  delay={idx * 0.08}
                  className="p-6 flex flex-col rounded-xl border transition-shadow duration-300 hover:shadow-[0_4px_24px_rgba(0,0,0,0.08)]"
                  style={{ backgroundColor: '#e4e2de', borderColor: '#d0cec9' }}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-10 h-10 rounded-md flex items-center justify-center" style={{ backgroundColor: '#d0cec9' }}>
                      <Code2 className="w-5 h-5" style={{ color: '#111110' }} />
                    </div>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-opacity hover:opacity-50"
                      aria-label="View on GitHub"
                      style={{ color: '#111110' }}
                    >
                      <Github className="w-5 h-5" />
                    </a>
                  </div>
                  <h3 className="text-base font-display font-normal mb-2" style={{ color: '#111110' }}>{project.title}</h3>
                  <p className="text-sm leading-relaxed mb-5 flex-grow" style={{ color: '#6b6966' }}>{project.description}</p>
                  <div className="flex flex-wrap gap-1.5 mt-auto">
                    {project.tags.map(tag => (
                      <span key={tag} className="text-xs font-medium px-2 py-0.5 rounded" style={{ backgroundColor: '#d0cec9', color: '#6b6966' }}>{tag}</span>
                    ))}
                  </div>
                </ScrollFade>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── ABOUT ────────────────────────────────────────── */}
      <section id="about" className="py-24 border-t" style={{ backgroundColor: '#eeecea', borderColor: '#d0cec9' }}>
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

            <ScrollFade direction="left" className="lg:col-span-5">
              <p className="text-xs font-medium tracking-[0.18em] uppercase mb-3" style={{ color: '#6b6966' }}>03 — About</p>
              <h2 className="text-3xl md:text-4xl font-display font-normal mb-8" style={{ color: '#111110' }}>About Me</h2>
              <div className="p-7 rounded-xl border" style={{ backgroundColor: '#e4e2de', borderColor: '#d0cec9' }}>
                <p className="leading-relaxed text-sm mb-7" style={{ color: '#6b6966' }}>{personalInfo.bio}</p>
                <div className="space-y-5 border-t pt-5" style={{ borderColor: '#d0cec9' }}>
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-widest mb-1.5" style={{ color: '#6b6966' }}>Education</h4>
                    <p className="text-sm" style={{ color: '#111110' }}>{personalInfo.education}</p>
                  </div>
                  {personalInfo.currentFocus && (
                    <div>
                      <h4 className="text-xs font-semibold uppercase tracking-widest mb-1.5" style={{ color: '#6b6966' }}>Current Focus</h4>
                      <p className="text-sm" style={{ color: '#111110' }}>{personalInfo.currentFocus}</p>
                    </div>
                  )}
                  {personalInfo.organizations.length > 0 && (
                    <div>
                      <h4 className="text-xs font-semibold uppercase tracking-widest mb-1.5" style={{ color: '#6b6966' }}>Organizations</h4>
                      <ul className="space-y-1">
                        {personalInfo.organizations.map((org) => (
                          <li key={org} className="text-sm flex items-center gap-2" style={{ color: '#111110' }}>
                            <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: '#6b6966' }} />
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
                    className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 font-medium rounded-lg hover:opacity-90 transition-opacity text-sm"
                    style={{ backgroundColor: '#1a1e16', color: '#f5f4f0' }}
                  >
                    <Download className="w-4 h-4" /> Download Resume
                  </a>
                )}
              </div>
            </ScrollFade>

            <ScrollFade direction="right" className="lg:col-span-7 flex flex-col justify-start lg:pt-[3.75rem]">
              <h3 className="text-xl font-display font-normal mb-8" style={{ color: '#111110' }}>Technical Skills</h3>
              <div className="space-y-8">
                {[
                  { label: "CAD & Simulation", skills: personalInfo.skills.cadSimulation },
                  { label: "Software & Programming", skills: personalInfo.skills.software },
                  { label: "Manufacturing & Hardware", skills: personalInfo.skills.manufacturing },
                ].map(({ label, skills }) => (
                  <div key={label}>
                    <h4 className="text-xs font-semibold uppercase tracking-widest mb-3 flex items-center gap-2" style={{ color: '#6b6966' }}>
                      <span className="w-2 h-2 rounded-sm" style={{ backgroundColor: '#d0cec9' }} /> {label}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {skills.map(skill => (
                        <span
                          key={skill}
                          className="px-3 py-1.5 text-sm rounded-lg border cursor-default transition-colors"
                          style={{ backgroundColor: '#e4e2de', borderColor: '#d0cec9', color: '#111110' }}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollFade>
          </div>
        </div>
      </section>

      {/* ── CONTACT ──────────────────────────────────────── */}
      <section id="contact" className="py-24 border-t border-[#2e3328]">
        <div className="container mx-auto px-6">
          <ScrollFade className="max-w-4xl mx-auto">
            <div className="mb-12">
              <p className="text-[#8a8f84] text-xs font-medium tracking-[0.18em] uppercase mb-3">04 — Contact</p>
              <h2 className="text-3xl md:text-4xl font-display font-normal text-foreground mb-3">Get in Touch</h2>
              <p className="text-muted-foreground text-base">Open to engineering internships, research opportunities, and technical conversations.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="rounded-xl border border-[#2e3328] bg-[#232820] p-7 flex flex-col gap-6">
                <h3 className="font-display font-normal text-foreground text-base">Contact</h3>
                <div className="space-y-4">
                  <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-3 group">
                    <div className="w-9 h-9 rounded-md bg-[#1a1e16] border border-[#2e3328] flex items-center justify-center group-hover:border-[#f5f4f0]/20 transition-colors">
                      <Mail className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground mb-0.5">Email</div>
                      <div className="text-sm text-foreground group-hover:text-foreground/80 transition-colors font-medium">{personalInfo.email}</div>
                    </div>
                  </a>
                  <a href={personalInfo.linkedinUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 group">
                    <div className="w-9 h-9 rounded-md bg-[#1a1e16] border border-[#2e3328] flex items-center justify-center group-hover:border-[#f5f4f0]/20 transition-colors">
                      <Linkedin className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground mb-0.5">LinkedIn</div>
                      <div className="text-sm text-foreground group-hover:text-foreground/80 transition-colors font-medium">
                        {personalInfo.linkedinUrl.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')}
                      </div>
                    </div>
                  </a>
                  <a href={personalInfo.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 group">
                    <div className="w-9 h-9 rounded-md bg-[#1a1e16] border border-[#2e3328] flex items-center justify-center group-hover:border-[#f5f4f0]/20 transition-colors">
                      <Github className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground mb-0.5">GitHub</div>
                      <div className="text-sm text-foreground group-hover:text-foreground/80 transition-colors font-medium">
                        {personalInfo.githubUrl.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')}
                      </div>
                    </div>
                  </a>
                </div>
              </div>

              <form onSubmit={handleSubmit(onContactSubmit)} className="rounded-xl border border-[#2e3328] bg-[#232820] p-7 flex flex-col gap-4">
                <h3 className="font-display font-normal text-foreground text-base">Send a Message</h3>
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1.5">Your Name</label>
                  <input {...register("name")} type="text" className="w-full bg-[#1a1e16] border border-[#2e3328] rounded-md py-2.5 px-3 text-foreground text-sm focus:border-[#f5f4f0]/30 focus:ring-1 focus:ring-[#f5f4f0]/10 outline-none transition-all" placeholder="Jane Smith" />
                  {errors.name && <span className="text-destructive text-xs mt-1 block">{errors.name.message}</span>}
                </div>
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1.5">Email Address</label>
                  <input {...register("email")} type="email" className="w-full bg-[#1a1e16] border border-[#2e3328] rounded-md py-2.5 px-3 text-foreground text-sm focus:border-[#f5f4f0]/30 focus:ring-1 focus:ring-[#f5f4f0]/10 outline-none transition-all" placeholder="jane@example.com" />
                  {errors.email && <span className="text-destructive text-xs mt-1 block">{errors.email.message}</span>}
                </div>
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1.5">Message</label>
                  <textarea {...register("message")} rows={4} className="w-full bg-[#1a1e16] border border-[#2e3328] rounded-md py-2.5 px-3 text-foreground text-sm focus:border-[#f5f4f0]/30 focus:ring-1 focus:ring-[#f5f4f0]/10 outline-none transition-all resize-none" placeholder="Tell me about the opportunity or question..." />
                  {errors.message && <span className="text-destructive text-xs mt-1 block">{errors.message.message}</span>}
                </div>
                <button
                  type="submit"
                  disabled={isSending}
                  className="mt-1 inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#f5f4f0] text-[#111110] font-medium rounded-lg hover:bg-[#eeecea] transition-colors disabled:opacity-50 text-sm"
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
