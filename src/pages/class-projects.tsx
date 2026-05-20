import { classProjects } from "@/data/portfolio";
import { PublicLayout } from "@/components/layout/public-layout";
import { ModelViewerWrapper } from "@/components/ui/model-viewer-wrapper";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function ClassProjects() {
  return (
    <PublicLayout>
      <div className="container mx-auto px-6 py-16 max-w-7xl">
        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="mb-14">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-mono text-primary/60 tracking-widest">03</span>
            <div className="h-px flex-1 max-w-[40px] bg-primary/30" />
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-semibold text-foreground mb-3">Class Projects</h1>
          <p className="text-muted-foreground max-w-xl">
            CAD models from my engineering coursework — all built in NX Siemens. Drag to rotate, scroll to zoom.
          </p>
        </motion.div>

        <div className="space-y-20">
          {classProjects.map((course, ci) => (
            <motion.section
              key={course.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: ci * 0.1, duration: 0.5 }}
            >
              <div className="flex items-baseline gap-4 mb-8">
                <span className="text-2xl md:text-3xl font-display font-semibold text-foreground">{course.code}</span>
                <span className="text-muted-foreground text-sm md:text-base">{course.name}</span>
                <div className="h-px flex-1 bg-border" />
                <span className="text-xs text-muted-foreground/50 tabular-nums">
                  {course.models.length} model{course.models.length !== 1 ? "s" : ""}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {course.models.map((model, mi) => (
                  <motion.div
                    key={model.id}
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: ci * 0.1 + mi * 0.06, duration: 0.4 }}
                    className="group rounded-xl border border-border bg-card/40 overflow-hidden hover:border-primary/30 transition-colors"
                  >
                    <ModelViewerWrapper src={model.glbFileUrl} alt={model.name} className="h-64 w-full bg-black/60" />
                    <div className="px-4 py-3 border-t border-border/50">
                      <p className="text-sm font-medium text-foreground">{model.name}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          ))}
        </div>
      </div>
    </PublicLayout>
  );
}
