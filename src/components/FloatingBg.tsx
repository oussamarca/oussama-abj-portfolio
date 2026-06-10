"use client";
import { motion, useReducedMotion } from "framer-motion";
import { Bot, Cloud, Cpu, Sparkles, Workflow, Code2 } from "lucide-react";

const items = [
  { Icon: Bot, top: "10%", left: "8%", size: 28, delay: 0 },
  { Icon: Cloud, top: "70%", left: "12%", size: 32, delay: 0.4 },
  { Icon: Cpu, top: "20%", left: "85%", size: 30, delay: 0.8 },
  { Icon: Sparkles, top: "60%", left: "78%", size: 22, delay: 1.2 },
  { Icon: Workflow, top: "82%", left: "55%", size: 26, delay: 1.6 },
  { Icon: Code2, top: "35%", left: "45%", size: 20, delay: 2.0 },
];

export function FloatingBg() {
  const reduce = useReducedMotion();
  if (reduce) return null;
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {items.map(({ Icon, top, left, size, delay }, i) => (
        <motion.div
          key={i}
          className="absolute text-primary/15"
          style={{ top, left }}
          initial={{ y: 0, opacity: 0 }}
          animate={{ y: [0, -18, 0], opacity: [0, 1, 0.6] }}
          transition={{
            duration: 6 + (i % 3),
            repeat: Infinity,
            ease: "easeInOut",
            delay,
          }}
        >
          <Icon style={{ width: size, height: size }} />
        </motion.div>
      ))}
    </div>
  );
}
