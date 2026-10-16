import { personalInfo, cadProjects, softwareProjects, simulationProjects } from "@/data/portfolio";
import { PublicLayout } from "@/components/layout/public-layout";
import { ModelViewerWrapper } from "@/components/ui/model-viewer-wrapper";
import { FractalBackground } from "@/components/ui/fractal-background";
import { ScrollFade } from "@/components/ui/scroll-fade";
import { ImageTabs } from "@/components/ui/image-tabs";
import { ProjectCarousel } from "@/components/ui/project-carousel";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Download, Send, Loader2, ArrowRight, ArrowUpRight } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";

// Get your free key at web3forms.com, paste it here
const WEB3FORMS_KEY = "51cec2da-9568-4d72-a5ce-5523d3c2a7c8";

const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

const FEATURED = [cadProjects[5], cadProjects[0]];
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
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `Portfolio Contact from ${data.name}`,
          name: data.name,
          email: data.email,
          message: data.message,
        }),
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.message);
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
              <span className="text-sm md:text-base tracking-wide text-[#8a8f84]">
                Aerospace Engineer and Startup Founder
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
              className="flex flex-wrap justify-center gap-x-10 gap-y-2 text-sm md:text-base tracking-wide text-muted-foreground mb-14"
            >
              <span>NOBE</span>
              <span>UAV@Illinois</span>
              <span>Incoming L3Harris Intern</span>
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

      </section>

      {/* ── FEATURED PROJECTS ── light */}
      <section id="cad-projects" className="py-28 md:py-32" style={{ backgroundColor: '#eeecea' }}>
        <div className="container mx-auto px-6">

          <ScrollFade className="mb-16">
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
                  {"slides" in project ? (
                    <ProjectCarousel
                      organization={project.organization}
                      dateRange={project.dateRange}
                      slides={(project as any).slides}
                      reversed={isReversed}
                    />
                  ) : (
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
                      <p className="text-sm mb-5" style={{ color: '#6b6966' }}>{project.organization}<br />{project.dateRange}</p>
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
                  )}
                </ScrollFade>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CAD GRID (4 projects) ── dark */}
      <section className="py-28 md:py-32" style={{ borderTop: '1px solid #2e3328', backgroundColor: '#1a1e16' }}>
        <div className="container mx-auto px-6">

          <ScrollFade className="mb-12">
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
                    <p className="text-sm text-[#8a8f84] mb-3">{project.organization}<br />{project.dateRange}</p>
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
      <section id="software-projects" className="py-28 md:py-32" style={{ borderTop: '1px solid #d0cec9', backgroundColor: '#eeecea' }}>
        <div className="container mx-auto px-6">

          <ScrollFade className="mb-14">
            <h2 className="text-4xl md:text-5xl font-display font-normal mb-4" style={{ color: '#111110', fontWeight: 400 }}>
              Software Projects
            </h2>
            <p className="text-base leading-relaxed max-w-xl" style={{ color: '#6b6966' }}>
              Simulation, flight software, and tools I use every day.
            </p>
          </ScrollFade>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            {/* Haylon Intercept Sim: lead project */}
            <ScrollFade className="lg:col-span-7">
              <article aria-label={softwareProjects[0].title} className="h-full flex flex-col p-8 md:p-12" style={{ backgroundColor: '#1a1e16', border: '1px solid #2e3328' }}>
                <p className="text-sm text-[#8a8f84] mb-6">{softwareProjects[0].kind}</p>
                <h3 className="text-3xl md:text-4xl font-display font-normal text-foreground mb-5" style={{ fontWeight: 400 }}>
                  {softwareProjects[0].title}
                </h3>
                <p className="text-base leading-relaxed text-[#a9ada3] max-w-[52ch] mb-10">{softwareProjects[0].description}</p>

                <ImageTabs images={softwareProjects[0].images!} className="mb-10" />

                <ol className="flex flex-wrap items-center gap-x-3 gap-y-2 mb-10 text-foreground font-display text-xl" aria-label="Control sequence">
                  {softwareProjects[0].steps!.map((step, i, all) => (
                    <li key={step} className="flex items-center gap-3">
                      <span style={{ fontWeight: 400 }}>{step}</span>
                      {i < all.length - 1 && <ArrowRight className="w-4 h-4 text-[#e8a33d]" aria-hidden="true" />}
                    </li>
                  ))}
                </ol>

                <div className="mt-auto flex flex-wrap items-end justify-between gap-6">
                  <div className="flex flex-wrap gap-2" role="list" aria-label="Technologies used">
                    {softwareProjects[0].tags.map(tag => (
                      <span key={tag} className="text-xs px-2.5 py-1 bg-[#232820] text-[#a9ada3]" role="listitem">{tag}</span>
                    ))}
                  </div>
                  {softwareProjects[0].githubUrl && (
                    <a
                      href={softwareProjects[0].githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-foreground hover:text-[#e8a33d] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#e8a33d]"
                    >
                      View on GitHub <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                    </a>
                  )}
                </div>
              </article>
            </ScrollFade>

            {/* Other repos */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              {softwareProjects.slice(1).map((project, idx) => (
                <ScrollFade key={project.id} delay={idx * 0.08} className="flex-1">
                  <article
                    aria-label={project.title}
                    className="h-full flex flex-col p-7 transition-colors duration-300 hover:bg-[#dedbd6]"
                    style={{ border: '1px solid #d0cec9', backgroundColor: '#e4e2de' }}
                  >
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div>
                        <p className="text-sm mb-1" style={{ color: '#6b6966' }}>{project.kind}</p>
                        <h3 className="text-2xl font-display font-normal" style={{ color: '#111110', fontWeight: 400 }}>{project.title}</h3>
                      </div>
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`View ${project.title} on GitHub`}
                          className="shrink-0 h-11 w-11 -mr-2 -mt-2 flex items-center justify-center hover:opacity-60 transition-opacity focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#111110]"
                          style={{ color: '#111110' }}
                        >
                          <ArrowUpRight className="w-5 h-5" aria-hidden="true" />
                        </a>
                      )}
                    </div>
                    <p className="text-sm leading-relaxed mb-5" style={{ color: '#6b6966' }}>{project.description}</p>
                    <div className="flex flex-wrap gap-1.5 mt-auto" role="list" aria-label="Technologies used">
                      {project.tags.map(tag => (
                        <span key={tag} className="text-xs px-2.5 py-1" style={{ backgroundColor: '#d0cec9', color: '#55534f' }} role="listitem">{tag}</span>
                      ))}
                    </div>
                  </article>
                </ScrollFade>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SIMULATION & ANALYSIS ── dark */}
      <section id="simulation-projects" className="py-28 md:py-32 border-t border-[#2e3328]">
        <div className="container mx-auto px-6">

          <ScrollFade className="mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-normal text-foreground mb-2" style={{ fontWeight: 400 }}>
              Simulation &amp; Analysis
            </h2>
            <p className="text-base leading-relaxed text-muted-foreground">
              MATLAB and Simulink work in controls modeling, FEA validation, mesh convergence.
            </p>
          </ScrollFade>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4" role="list">
            {simulationProjects.map(project => (
              <ScrollFade key={project.id}>
                <article
                  aria-label={project.title}
                  role="listitem"
                  className="h-full border border-[#2e3328] bg-[#232820] p-6 flex flex-col gap-4"
                >
                  <ImageTabs images={project.images} />
                  <div>
                    <span className="text-sm block mb-1.5 text-[#8a8f84]">
                      {project.category}
                    </span>
                    <h3 className="text-lg font-display font-normal text-foreground mb-2" style={{ fontWeight: 400 }}>
                      {project.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">{project.description}</p>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-auto pt-2" role="list" aria-label="Technologies used">
                    {project.tags.map(tag => (
                      <span
                        key={tag}
                        className="text-xs px-2.5 py-1 bg-[#1a1e16] text-[#8a8f84]"
                        role="listitem"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </article>
              </ScrollFade>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT ── light, editorial */}
      <section id="about" className="py-28 md:py-32" style={{ borderTop: '1px solid #d0cec9', backgroundColor: '#eeecea' }}>
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">

            {/* Photo */}
            <div className="lg:col-span-3">
              <ScrollFade direction="left">
                <div className="overflow-hidden" style={{ border: '1px solid #d0cec9' }}>
                  <img
                    src="/photo.jpg"
                    alt="Aarav Verma"
                    className="w-full object-cover"
                    style={{ aspectRatio: '3/4', display: 'block', objectPosition: 'center 12%' }}
                  />
                </div>
              </ScrollFade>
            </div>

            {/* Bio + info */}
            <div className="lg:col-span-4">
              <ScrollFade>
                <h2 className="text-3xl md:text-4xl font-display font-normal mb-5" style={{ color: '#111110', fontWeight: 400 }}>
                  About Me
                </h2>
                <p className="text-sm leading-relaxed mb-8" style={{ color: '#6b6966' }}>{personalInfo.bio}</p>

                <div className="space-y-4">
                  <div>
                    <p className="text-sm mb-1.5" style={{ color: '#6b6966' }}>Education</p>
                    <p className="text-sm" style={{ color: '#111110' }}>{personalInfo.education}</p>
                  </div>
                  {personalInfo.currentFocus && (
                    <div>
                      <p className="text-sm mb-1.5" style={{ color: '#6b6966' }}>Current Focus</p>
                      <p className="text-sm" style={{ color: '#111110' }}>{personalInfo.currentFocus}</p>
                    </div>
                  )}
                  {personalInfo.organizations.length > 0 && (
                    <div>
                      <p className="text-sm mb-1.5" style={{ color: '#6b6966' }}>Organizations</p>
                      <ul className="space-y-1">
                        {personalInfo.organizations.map(org => (
                          <li key={org} className="text-sm" style={{ color: '#111110' }}>
                            {org}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  {personalInfo.resumeUrl && (
                    <a
                      href={personalInfo.resumeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium hover:opacity-90 transition-opacity focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1a1e16] cursor-pointer"
                      style={{ backgroundColor: '#1a1e16', color: '#f5f4f0' }}
                    >
                      <Download className="w-4 h-4" aria-hidden="true" /> Download Resume
                    </a>
                  )}
                  {personalInfo.portfolioPdfUrl && (
                    <a
                      href={personalInfo.portfolioPdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium border hover:bg-[#1a1e16] hover:text-[#f5f4f0] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1a1e16] cursor-pointer"
                      style={{ borderColor: '#1a1e16', color: '#1a1e16' }}
                    >
                      <Download className="w-4 h-4" aria-hidden="true" /> Download Portfolio PDF
                    </a>
                  )}
                </div>
              </ScrollFade>
            </div>

            {/* Skills */}
            <div className="lg:col-span-5">
              <ScrollFade direction="right">
                <div className="space-y-6">
                  {[
                    { label: "CAD & Simulation", skills: personalInfo.skills.cadSimulation },
                    { label: "Software & Programming", skills: personalInfo.skills.software },
                    { label: "Manufacturing & Hardware", skills: personalInfo.skills.manufacturing },
                  ].map(({ label, skills }) => (
                    <div key={label} className="border-t pt-5" style={{ borderColor: '#d0cec9' }}>
                      <p className="text-sm mb-3" style={{ color: '#6b6966' }}>{label}</p>
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
        </div>
      </section>

      {/* ── CONTACT ── dark */}
      <section id="contact" className="py-28 md:py-32 border-t border-[#2e3328]">
        <div className="container mx-auto px-6">
          <ScrollFade className="max-w-4xl mx-auto">
            <div className="mb-12">
              <h2 className="text-3xl md:text-4xl font-display font-normal text-foreground mb-3" style={{ fontWeight: 400 }}>
                Get in Touch
              </h2>
              <p className="text-muted-foreground text-base">
                Open to engineering internships, research opportunities, and technical conversations.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

              <div className="border border-[#2e3328] bg-[#232820] p-7 flex flex-col gap-6">
                <h3 className="font-display font-normal text-foreground text-base" style={{ fontWeight: 400 }}>Contact</h3>
                <div className="space-y-4">
                  <a
                    href={`mailto:${personalInfo.email}`}
                    className="flex items-center gap-3 group focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f5f4f0]"
                  >
                    <div className="w-9 h-9 bg-[#1a1e16] border border-[#2e3328] flex items-center justify-center group-hover:border-[#f5f4f0]/20 transition-colors" aria-hidden="true">
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
                    className="flex items-center gap-3 group focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f5f4f0]"
                  >
                    <div className="w-9 h-9 bg-[#1a1e16] border border-[#2e3328] flex items-center justify-center group-hover:border-[#f5f4f0]/20 transition-colors" aria-hidden="true">
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
                    className="flex items-center gap-3 group focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f5f4f0]"
                  >
                    <div className="w-9 h-9 bg-[#1a1e16] border border-[#2e3328] flex items-center justify-center group-hover:border-[#f5f4f0]/20 transition-colors" aria-hidden="true">
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
                className="border border-[#2e3328] bg-[#232820] p-7 flex flex-col gap-4"
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
                    className="w-full bg-[#1a1e16] border border-[#2e3328] py-2.5 px-3 text-foreground text-sm focus:border-[#f5f4f0]/30 focus:ring-1 focus:ring-[#f5f4f0]/10 outline-none transition-all"
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
                    className="w-full bg-[#1a1e16] border border-[#2e3328] py-2.5 px-3 text-foreground text-sm focus:border-[#f5f4f0]/30 focus:ring-1 focus:ring-[#f5f4f0]/10 outline-none transition-all"
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
                  className="mt-1 inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#f5f4f0] text-[#111110] font-medium hover:bg-[#eeecea] transition-colors disabled:opacity-50 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f5f4f0]"
                  aria-label={isSending ? "Sending message" : "Send message"}
                >
                  {isSending
                    ? <><Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" /><span>Sending…</span></>
                    : <><Send className="w-4 h-4" aria-hidden="true" /> Send Message</>}
                </button>
              </form>

            </div>
          </ScrollFade>
        </div>
      </section>

    </PublicLayout>
  );
}
