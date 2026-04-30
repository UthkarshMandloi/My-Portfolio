"use client";

import React, { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PathData {
  d: string;
  fill: string;
  transform: string;
}

export default function SignaturePreloader({ onComplete }: { onComplete: () => void }) {
  const [paths, setPaths] = useState<PathData[]>([]);
  const [phase, setPhase] = useState<"loading" | "drawing" | "glowing" | "done">("loading");

  useEffect(() => {
    // Fetch the signature SVG dynamically so we don't bloat the JS bundle
    fetch("/signature.svg")
      .then((res) => res.text())
      .then((str) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(str, "image/svg+xml");
        const pathElements = Array.from(doc.querySelectorAll("path"));
        const parsedPaths = pathElements.map((p) => ({
          d: p.getAttribute("d") || "",
          fill: p.getAttribute("fill") || "currentColor",
          transform: p.getAttribute("transform") || "",
        }));
        setPaths(parsedPaths);
        setPhase("drawing");
      })
      .catch((err) => {
        console.error("Failed to load signature SVG", err);
        // If it fails for any reason, skip the preloader
        onComplete();
      });
  }, [onComplete]);

  useEffect(() => {
    if (phase === "drawing") {
      const timer = setTimeout(() => {
        setPhase("glowing");
      }, 3500); // 3.5s total for the drawing animation sequence
      return () => clearTimeout(timer);
    } else if (phase === "glowing") {
      const timer = setTimeout(() => {
        setPhase("done");
        setTimeout(onComplete, 1000); // Allow 1s for the exit animation
      }, 1500); // 1.5s for the glowing hold phase
      return () => clearTimeout(timer);
    }
  }, [phase, onComplete]);

  // Particle generation for a high-tech/magical floating feel
  const particles = useMemo(() => {
    return Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      scale: Math.random() * 1.5 + 0.5,
      delay: Math.random() * 3,
      duration: Math.random() * 2 + 2,
    }));
  }, []);

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#050505] overflow-hidden"
        >
          {/* Subtle animated background gradient */}
          <motion.div 
            className="absolute inset-0 opacity-40 mix-blend-screen"
            animate={{ 
              background: [
                "radial-gradient(circle at 50% 50%, rgba(60, 50, 100, 0.4) 0%, transparent 60%)",
                "radial-gradient(circle at 50% 50%, rgba(90, 70, 140, 0.5) 0%, transparent 70%)",
                "radial-gradient(circle at 50% 50%, rgba(60, 50, 100, 0.4) 0%, transparent 60%)"
              ]
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Floating Particles */}
          <div className="absolute inset-0 pointer-events-none">
            {particles.map((p) => (
              <motion.div
                key={p.id}
                className="absolute w-1 h-1 rounded-full bg-white shadow-[0_0_10px_2px_rgba(255,255,255,0.8)]"
                style={{ left: `${p.x}%`, top: `${p.y}%` }}
                initial={{ opacity: 0, y: 20, scale: p.scale }}
                animate={{
                  opacity: [0, 0.6, 0],
                  y: -100,
                }}
                transition={{
                  duration: p.duration,
                  delay: p.delay,
                  repeat: Infinity,
                  ease: "easeOut",
                }}
              />
            ))}
          </div>

          <div className="relative w-full max-w-5xl px-8 flex flex-col items-center justify-center">
            {paths.length > 0 && (
              <motion.svg
                viewBox="0 0 695 359"
                className="w-full h-auto z-10"
                style={{ filter: "drop-shadow(0px 0px 10px rgba(255, 255, 255, 0.2))" }}
                animate={phase === "glowing" ? { filter: "drop-shadow(0px 0px 35px rgba(180, 150, 255, 0.9))" } : {}}
                transition={{ duration: 1.5 }}
              >
                {paths.map((p, i) => {
                  // Stagger drawing over 2 seconds
                  const delay = (i / paths.length) * 2; 
                  return (
                    <motion.path
                      key={i}
                      d={p.d}
                      transform={p.transform}
                      initial={{ 
                        pathLength: 0, 
                        fill: "rgba(255,255,255,0)", 
                        stroke: "rgba(255,255,255,0.8)", 
                        strokeWidth: 2 
                      }}
                      animate={{ 
                        pathLength: 1, 
                        // Once glowing phase starts, transition to the fill color mapped in the SVG
                        fill: phase === "glowing" ? p.fill : "rgba(255,255,255,0)",
                        // Fade out the stroke as the fill comes in
                        stroke: phase === "glowing" ? "rgba(255,255,255,0)" : "rgba(255,255,255,0.9)" 
                      }}
                      transition={{
                        pathLength: { duration: 1.5, delay, ease: "easeInOut" },
                        fill: { duration: 1, ease: "easeIn" },
                        stroke: { duration: 1, ease: "easeOut" }
                      }}
                    />
                  );
                })}
              </motion.svg>
            )}

            {/* Core Glowing reflection underneath the signature to give 3D depth */}
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 h-40 bg-purple-600 rounded-full blur-[120px] opacity-0 mix-blend-screen pointer-events-none"
              animate={phase === "glowing" ? { opacity: 0.35, scale: 1.1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 1.5 }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
