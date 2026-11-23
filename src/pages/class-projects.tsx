import { useEffect } from "react";
import { classProjects } from "@/data/portfolio";
import { PublicLayout } from "@/components/layout/public-layout";
import { ModelViewerWrapper } from "@/components/ui/model-viewer-wrapper";
import { motion, useReducedMotion } from "framer-motion";

export default function ClassProjects() {
  const reduce = useReducedMotion();

  useEffect(() => {
    document.title = "Class Work | Aarav Verma";
  }, []);

  const reveal = (delay = 0) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, amount: 0.15 },
          transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] },
        };

  return (
    <PublicLayout>
      <div className="container mx-auto px-6 pt-14 md:pt-20 pb-28 max-w-7xl">
        <motion.header {...reveal()} className="mb-20 max-w-3xl">
          <h1
            className="text-ink leading-[1.02] tracking-[-0.025em] mb-6"
            style={{ fontSize: "clamp(2.75rem, 7vw, 5.5rem)", fontWeight: 300 }}
          >
            Class work
          </h1>
          <p className="text-[19px] leading-relaxed text-ink-2 max-w-[52ch]">
            CAD models from my engineering coursework. Drag to rotate, scroll to zoom.
          </p>
        </motion.header>

        <div className="space-y-24">
          {classProjects.map((course) => (
            <section key={course.id} aria-labelledby={`course-${course.id}`}>
              <motion.div {...reveal()} className="flex flex-wrap items-baseline gap-x-6 gap-y-1 pb-5 mb-10 border-b border-rule">
                <h2 id={`course-${course.id}`} className="text-ink" style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)" }}>
                  {course.code}
                </h2>
                <p className="text-[18px] text-ink-2 mr-auto">{course.name}</p>
                <p className="text-[15px] text-ink-2 tabular-nums">
                  {course.models.length} model{course.models.length !== 1 ? "s" : ""}
                </p>
              </motion.div>

              <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10 list-none p-0 m-0">
                {course.models.map((model, mi) => (
                  <motion.li key={model.id} {...reveal((mi % 3) * 0.06)}>
                    <div className="h-64 bg-graphite text-graphite-ink-2">
                      <ModelViewerWrapper src={model.glbFileUrl} alt={model.name} className="h-full w-full" />
                    </div>
                    <p className="text-[18px] text-ink mt-3">{model.name}</p>
                  </motion.li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </PublicLayout>
  );
}
