import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface ScrollFadeProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right";
  amount?: number;
}

export function ScrollFade({ children, className, delay = 0, direction = "up", amount = 0.12 }: ScrollFadeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount });

  const hidden = { opacity: 0, y: direction === "up" ? 28 : 0, x: direction === "left" ? -24 : direction === "right" ? 24 : 0 };
  const visible = { opacity: 1, y: 0, x: 0 };

  return (
    <motion.div
      ref={ref}
      className={className}
      animate={isInView ? visible : hidden}
      initial={hidden}
      transition={{ duration: 0.5, ease: "easeOut", delay: isInView ? delay : 0 }}
    >
      {children}
    </motion.div>
  );
}
