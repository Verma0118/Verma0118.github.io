import { personalInfo, cadProjects, softwareProjects } from "@/data/portfolio";
import { PublicLayout } from "@/components/layout/public-layout";
import { ModelViewerWrapper } from "@/components/ui/model-viewer-wrapper";
import { FractalBackground } from "@/components/ui/fractal-background";
import { ScrollFade } from "@/components/ui/scroll-fade";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Download, Send, ArrowDown, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";

const FORMSPREE_ENDPOINT = "https://formspree.io/vermaa0118@gmail.com";

const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

const FEATURED = [cadProjects[0], cadProjects[5]];
const CAD_GRID = cadProjects.slice(1, 5);

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
        headers: { "Content-Type": "application/x-www-form-urlencoded", "Accept": "application/json" },
        body: new URLSearchParams(data).toString(),
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

  const heroScroll = (hash: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    document.querySelector(hash)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <PublicLayout>

      {/* ── HERO ── dark */}
      <section
        className="min-h-screen flex flex-col items-center justify-center relative px-6 overflow-hidden"
        aria-label="Introduction"
      >
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
              className="font-display text-foreground leading-[0.95] tracking-tight mb-6"
              style={{ fontSize: "clamp(4rem, 11vw, 8rem)", fontWeight: 400 }}
            >
              Aarav Verma
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-[11px] md:text-xs tracking-[0.2em] uppercase text-muted-foreground mb-14"
            >
              NOBE · Ghost Electric Motorcycles · UIUC · Class of 2029
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-4">
              <a
                href="#cad-projects"
                onClick={heroScroll("#cad-projects")}
                className="inline-flex items-center gap-2 px-7 py-3 bg-[#f5f4f0] text-[#111110] font-medium hover:bg-[#eeecea] transition-colors text-sm tracking-wide focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f5f4f0]"
              >
                View Projects
              </a>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-3 bg-transparent border border-[#2e3328] text-[#8a8f84] font-medium hover:border-[#f5f4f0]/30 hover:text-[#f5f4f0] transition-all text-sm tracking-wide focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8a8f84]"
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
          aria-hidden="true"
        >
          <span className="text-[10px] tracking-widest uppercase">Scroll</span>
          <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
        </motion.div>
      </section>

      {/* ── FEATURED PROJECTS ── light */}
      <section id="cad-projects" className="py-24" style={{ backgroundColor: '#eeecea' }}>
        <div className="container mx-auto px-6">

          <ScrollFade className="mb-16">
            <div className="flex items-center gap-4 mb-5">
              <div className="w-0.5 h-10 flex-shrink-0" style={{ backgroundColor: '#d0cec9' }} aria-hidden="true" />
              <p className="text-[10px] tracking-[0.25em] uppercase" style={{ color: '#6b6966' }}>Featured Work</p>
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-normal mb-4" style={{ color: '#111110', fontWeight: 400 }}>
              Hardware Design
            </h2>
            <p className="text-base leading-relaxed max-w-xl" style={{ color: '#6b6966' }}>
              Mechanical designs and structural analysis. Interact with the 3D models directly.
            </p>
          </ScrollFade>

          <div className="space-y-6">
            {FEATURED.map((project, idx) => {
              const isReversed = idx % 2 === 1;
              return (
                <ScrollFade key={project.id} delay={idx * 0.1}>
                  <article
                    className="grid grid-cols-1 lg:grid-cols-2 overflow-hidden"
                    style={{ border: '1px solid #d0cec9' }}
                    aria-label={project.title}
                  >
                    {/* 3D viewer */}
                    <div
                      className={`h-[380px] lg:h-[500px] ${isReversed ? 'order-1 lg:order-2' : 'order-1'}`}
                      style={{ backgroundColor: '#1a1e16' }}
                    >
                      <ModelViewerWrapper src={project.glbFileUrl} alt={project.title} className="w-full h-full" />
                    </div>

                    {/* text panel */}
                    <div
                      className={`flex flex-col justify-center p-8 md:p-12 ${isReversed ? 'order-2 lg:order-1' : 'order-2'}`}
                      style={{
                        backgroundColor: '#e4e2de',
                        ...(isReversed
                          ? { borderRight: '1px solid #d0cec9' }
                          : { borderLeft: '1px solid #d0cec9' }),
                      }}
                    >
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-0.5 h-7 flex-shrink-0" style={{ backgroundColor: '#d0cec9' }} aria-hidden="true" />
                        <span className="text-[10px] tracking-[0.2em] uppercase" style={{ color: '#6b6966' }}>
                          {project.organization} · {project.dateRange}
                        </span>
                      </div>
                      <h3 className="text-2xl md:text-3xl font-display font-normal mb-4" style={{ color: '#111110', fontWeight: 400 }}>
                        {project.title}
                      </h3>
                      <p className="text-sm leading-relaxed mb-8" style={{ color: '#6b6966' }}>
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2" role="list" aria-label="Technologies used">
                        {project.tags.map(tag => (
                          <span
                            key={tag}
                            className="text-xs px-2.5 py-1"
                            style={{ backgroundColor: '#d0cec9', color: '#6b6966' }}
                            role="listitem"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </article>
                </ScrollFade>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CAD GRID (4 projects) ── dark */}
      <section className="py-24" style={{ borderTop: '1px solid #2e3328', backgroundColor: '#1a1e16' }}>
        <div className="container mx-auto px-6">

          <ScrollFade className="mb-12">
            <div className="flex items-center gap-4 mb-5">
              <div className="w-0.5 h-10 flex-shrink-0 bg-[#2e3328]" aria-hidden="true" />
              <p className="text-[10px] tracking-[0.25em] uppercase text-[#8a8f84]">More Hardware</p>
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-normal text-foreground" style={{ fontWeight: 400 }}>
              Engineering Projects
            </h2>
          </ScrollFade>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px" style={{ backgroundColor: '#2e3328' }}>
            {CAD_GRID.map((project, idx) => (
              <ScrollFade
                key={project.id}
                delay={idx * 0.07}
                className="flex flex-col overflow-hidden"
                style={{ backgroundColor: '#1a1e16' }}
              >
                <article
                  className="flex flex-col flex-grow hover:bg-[#232820] transition-colors duration-300"
                  aria-label={project.title}
                >
                  <div className="h-[340px] relative bg-black/40">
                    <ModelViewerWrapper src={project.glbFileUrl} alt={project.title} className="w-full h-full" />
                    <div className="absolute top-3 left-3 z-10 flex flex-wrap gap-1.5" role="list" aria-label="Technologies">
                      {project.tags.slice(0, 3).map(tag => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 bg-[#1a1e16]/90 backdrop-blur-md border border-[#2e3328] text-[#8a8f84] text-[10px]"
                          role="listitem"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="p-6 border-t border-[#2e3328] flex flex-col flex-grow">
                    <p className="text-[10px] tracking-[0.18em] uppercase text-[#8a8f84] mb-2">
                      {project.organization} · {project.dateRange}
                    </p>
                    <h3 className="text-lg font-display font-normal text-foreground mb-3" style={{ fontWeight: 400 }}>
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{project.description}</p>
                  </div>
                </article>
              </ScrollFade>
            ))}
          </div>
        </div>
      </section>

      {/* ── SOFTWARE PROJECTS ── light */}
      <section id="software-projects" className="py-24" style={{ borderTop: '1px solid #d0cec9', backgroundColor: '#eeecea' }}>
        <div className="container mx-auto px-6">

          <ScrollFade className="mb-12">
            <div className="flex items-center gap-4 mb-5">
              <div className="w-0.5 h-10 flex-shrink-0" style={{ backgroundColor: '#d0cec9' }} aria-hidden="true" />
              <p className="text-[10px] tracking-[0.25em] uppercase" style={{ color: '#6b6966' }}>Software</p>
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-normal mb-2" style={{ color: '#111110', fontWeight: 400 }}>
              Software Projects
            </h2>
            <p className="text-base leading-relaxed" style={{ color: '#6b6966' }}>
              Flight software, simulation tools, and engineering applications.
            </p>
          </ScrollFade>

          {/* Volant — featured */}
          <ScrollFade className="mb-4">
            <article
              aria-label={softwareProjects[1].title}
              style={{ border: '1px solid #d0cec9', backgroundColor: '#e4e2de' }}
            >
              <div className="p-8 md:p-12">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-0.5 h-7 flex-shrink-0" style={{ backgroundColor: '#d0cec9' }} aria-hidden="true" />
                  <span className="text-[10px] tracking-[0.2em] uppercase" style={{ color: '#6b6966' }}>Startup · B2B SaaS</span>
                </div>
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-5">
                  <h3 className="text-2xl md:text-3xl font-display font-normal" style={{ color: '#111110', fontWeight: 400 }}>
                    {softwareProjects[1].title}
                  </h3>
                  <a
                    href={softwareProjects[1].githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-medium hover:opacity-60 transition-opacity shrink-0 mt-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#111110] cursor-pointer"
                    style={{ color: '#111110' }}
                    aria-label="View Volant on GitHub"
                  >
                    <Github className="w-4 h-4" aria-hidden="true" /> View on GitHub
                  </a>
                </div>
                <p className="text-sm md:text-base leading-relaxed mb-8 max-w-2xl" style={{ color: '#6b6966' }}>
                  {softwareProjects[1].description}
                </p>
                <div className="flex flex-wrap gap-2" role="list" aria-label="Technologies used">
                  {softwareProjects[1].tags.map(tag => (
                    <span
                      key={tag}
                      className="text-xs px-2.5 py-1"
                      style={{ backgroundColor: '#d0cec9', color: '#6b6966' }}
                      role="listitem"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          </ScrollFade>

          {/* TVC Simulator — secondary */}
          <ScrollFade>
            <article
              aria-label={softwareProjects[0].title}
              className="flex flex-col md:flex-row md:items-center gap-6 p-6 md:p-8"
              style={{ border: '1px solid #d0cec9', borderTop: 'none', backgroundColor: '#e4e2de' }}
            >
              <div className="flex-1 min-w-0">
                <span className="text-[10px] tracking-[0.2em] uppercase block mb-1.5" style={{ color: '#6b6966' }}>
                  Simulation Tool
                </span>
                <h3 className="text-lg font-display font-normal mb-2" style={{ color: '#111110', fontWeight: 400 }}>
                  {softwareProjects[0].title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: '#6b6966' }}>{softwareProjects[0].description}</p>
              </div>
              <div className="flex flex-wrap gap-1.5 shrink-0" role="list" aria-label="Technologies used">
                {softwareProjects[0].tags.map(tag => (
                  <span
                    key={tag}
                    className="text-xs px-2.5 py-1"
                    style={{ backgroundColor: '#d0cec9', color: '#6b6966' }}
                    role="listitem"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <a
                href={softwareProjects[0].githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium hover:opacity-60 transition-opacity shrink-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#111110] cursor-pointer"
                style={{ color: '#111110' }}
                aria-label="View TVC Simulator on GitHub"
              >
                <Github className="w-4 h-4" aria-hidden="true" /> GitHub
              </a>
            </article>
          </ScrollFade>
        </div>
      </section>

      {/* ── ABOUT ── light, editorial */}
      <section id="about" className="py-24" style={{ borderTop: '1px solid #d0cec9', backgroundColor: '#eeecea' }}>
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">

            <ScrollFade direction="left" className="lg:col-span-5">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-0.5 h-10 flex-shrink-0" style={{ backgroundColor: '#d0cec9' }} aria-hidden="true" />
                <p className="text-[10px] tracking-[0.25em] uppercase" style={{ color: '#6b6966' }}>About</p>
              </div>
              <h2 className="text-4xl md:text-5xl font-display font-normal mb-8" style={{ color: '#111110', fontWeight: 400 }}>
                About Me
              </h2>
              <p className="text-base leading-relaxed mb-10" style={{ color: '#6b6966' }}>{personalInfo.bio}</p>

              <div className="space-y-6">
                <div>
                  <p className="text-[10px] tracking-[0.2em] uppercase mb-2" style={{ color: '#6b6966' }}>Education</p>
                  <p className="text-sm" style={{ color: '#111110' }}>{personalInfo.education}</p>
                </div>
                {personalInfo.currentFocus && (
                  <div>
                    <p className="text-[10px] tracking-[0.2em] uppercase mb-2" style={{ color: '#6b6966' }}>Current Focus</p>
                    <p className="text-sm" style={{ color: '#111110' }}>{personalInfo.currentFocus}</p>
                  </div>
                )}
                {personalInfo.organizations.length > 0 && (
                  <div>
                    <p className="text-[10px] tracking-[0.2em] uppercase mb-2" style={{ color: '#6b6966' }}>Organizations</p>
                    <ul className="space-y-1">
                      {personalInfo.organizations.map(org => (
                        <li key={org} className="text-sm flex items-center gap-2.5" style={{ color: '#111110' }}>
                          <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ backgroundColor: '#6b6966' }} aria-hidden="true" />
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
                  className="mt-10 inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium hover:opacity-90 transition-opacity focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1a1e16] cursor-pointer"
                  style={{ backgroundColor: '#1a1e16', color: '#f5f4f0' }}
                >
                  <Download className="w-4 h-4" aria-hidden="true" /> Download Resume
                </a>
              )}
            </ScrollFade>

            <ScrollFade direction="right" className="lg:col-span-7 flex flex-col justify-start lg:pt-24">
              <div className="space-y-8">
                {[
                  { label: "CAD & Simulation", skills: personalInfo.skills.cadSimulation },
                  { label: "Software & Programming", skills: personalInfo.skills.software },
                  { label: "Manufacturing & Hardware", skills: personalInfo.skills.manufacturing },
                ].map(({ label, skills }) => (
                  <div key={label} className="border-t pt-6" style={{ borderColor: '#d0cec9' }}>
                    <p className="text-[10px] tracking-[0.2em] uppercase mb-4" style={{ color: '#6b6966' }}>{label}</p>
                    <div className="flex flex-wrap gap-2" role="list" aria-label={`${label} skills`}>
                      {skills.map(skill => (
                        <span
                          key={skill}
                          className="px-3 py-1.5 text-sm border"
                          style={{ backgroundColor: '#e4e2de', borderColor: '#d0cec9', color: '#111110' }}
                          role="listitem"
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

      {/* ── CONTACT ── dark */}
      <section id="contact" className="py-24 border-t border-[#2e3328]">
        <div className="container mx-auto px-6">
          <ScrollFade className="max-w-4xl mx-auto">
            <div className="mb-12">
              <div className="flex items-center gap-4 mb-5">
                <div className="w-0.5 h-10 flex-shrink-0 bg-[#2e3328]" aria-hidden="true" />
                <p className="text-[10px] tracking-[0.25em] uppercase text-[#8a8f84]">Contact</p>
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-normal text-foreground mb-3" style={{ fontWeight: 400 }}>
                Get in Touch
              </h2>
              <p className="text-muted-foreground text-base">
                Open to engineering internships, research opportunities, and technical conversations.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

              <div className="rounded-xl border border-[#2e3328] bg-[#232820] p-7 flex flex-col gap-6">
                <h3 className="font-display font-normal text-foreground text-base" style={{ fontWeight: 400 }}>Contact</h3>
                <div className="space-y-4">
                  <a
                    href={`mailto:${personalInfo.email}`}
                    className="flex items-center gap-3 group rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f5f4f0]"
                  >
                    <div className="w-9 h-9 rounded-md bg-[#1a1e16] border border-[#2e3328] flex items-center justify-center group-hover:border-[#f5f4f0]/20 transition-colors" aria-hidden="true">
                      <Mail className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground mb-0.5">Email</div>
                      <div className="text-sm text-foreground font-medium">{personalInfo.email}</div>
                    </div>
                  </a>
                  <a
                    href={personalInfo.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 group rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f5f4f0]"
                  >
                    <div className="w-9 h-9 rounded-md bg-[#1a1e16] border border-[#2e3328] flex items-center justify-center group-hover:border-[#f5f4f0]/20 transition-colors" aria-hidden="true">
                      <Linkedin className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground mb-0.5">LinkedIn</div>
                      <div className="text-sm text-foreground font-medium">
                        {personalInfo.linkedinUrl.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')}
                      </div>
                    </div>
                  </a>
                  <a
                    href={personalInfo.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 group rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f5f4f0]"
                  >
                    <div className="w-9 h-9 rounded-md bg-[#1a1e16] border border-[#2e3328] flex items-center justify-center group-hover:border-[#f5f4f0]/20 transition-colors" aria-hidden="true">
                      <Github className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground mb-0.5">GitHub</div>
                      <div className="text-sm text-foreground font-medium">
                        {personalInfo.githubUrl.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')}
                      </div>
                    </div>
                  </a>
                </div>
              </div>

              <form
                onSubmit={handleSubmit(onContactSubmit)}
                noValidate
                className="rounded-xl border border-[#2e3328] bg-[#232820] p-7 flex flex-col gap-4"
                aria-label="Contact form"
              >
                <h3 className="font-display font-normal text-foreground text-base" style={{ fontWeight: 400 }}>Send a Message</h3>
                <div>
                  <label htmlFor="contact-name" className="block text-xs font-medium text-muted-foreground mb-1.5">
                    Your Name
                  </label>
                  <input
                    {...register("name")}
                    id="contact-name"
                    type="text"
                    autoComplete="name"
                    className="w-full bg-[#1a1e16] border border-[#2e3328] rounded-md py-2.5 px-3 text-foreground text-sm focus:border-[#f5f4f0]/30 focus:ring-1 focus:ring-[#f5f4f0]/10 outline-none transition-all"
                    placeholder="Jane Smith"
                    aria-invalid={errors.name ? "true" : undefined}
                    aria-describedby={errors.name ? "name-error" : undefined}
                  />
                  {errors.name && (
                    <span id="name-error" role="alert" className="text-destructive text-xs mt-1 block">
                      {errors.name.message}
                    </span>
                  )}
                </div>
                <div>
                  <label htmlFor="contact-email" className="block text-xs font-medium text-muted-foreground mb-1.5">
                    Email Address
                  </label>
                  <input
                    {...register("email")}
                    id="contact-email"
                    type="email"
                    autoComplete="email"
                    className="w-full bg-[#1a1e16] border border-[#2e3328] rounded-md py-2.5 px-3 text-foreground text-sm focus:border-[#f5f4f0]/30 focus:ring-1 focus:ring-[#f5f4f0]/10 outline-none transition-all"
                    placeholder="jane@example.com"
                    aria-invalid={errors.email ? "true" : undefined}
                    aria-describedby={errors.email ? "email-error" : undefined}
                  />
                  {errors.email && (
                    <span id="email-error" role="alert" className="text-destructive text-xs mt-1 block">
                      {errors.email.message}
                    </span>
                  )}
                </div>
                <div>
                  <label htmlFor="contact-message" className="block text-xs font-medium text-muted-foreground mb-1.5">
                    Message
                  </label>
                  <textarea
                    {...register("message")}
                    id="contact-message"
                    rows={4}
                    className="w-full bg-[#1a1e16] border border-[#2e3328] rounded-md py-2.5 px-3 text-foreground text-sm focus:border-[#f5f4f0]/30 focus:ring-1 focus:ring-[#f5f4f0]/10 outline-none transition-all resize-none"
                    placeholder="Tell me about the opportunity or question..."
                    aria-invalid={errors.message ? "true" : undefined}
                    aria-describedby={errors.message ? "message-error" : undefined}
                  />
                  {errors.message && (
                    <span id="message-error" role="alert" className="text-destructive text-xs mt-1 block">
                      {errors.message.message}
                    </span>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={isSending}
                  className="mt-1 inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#f5f4f0] text-[#111110] font-medium rounded-lg hover:bg-[#eeecea] transition-colors disabled:opacity-50 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f5f4f0]"
                  aria-label={isSending ? "Sending message" : "Send message"}
                >
                  {isSending
                    ? <><Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" /><span>Sending…</span></>
                    : <><Send className="w-4 h-4" aria-hidden="true" /> Send Message</>
                  }
                </button>
              </form>

            </div>
          </ScrollFade>
        </div>
      </section>

    </PublicLayout>
  );
}
