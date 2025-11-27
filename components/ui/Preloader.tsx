"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const [count, setCount] = useState(0);

  useEffect(() => {
    // 1. Counter Logic (0 to 100)
    const interval = setInterval(() => {
      setCount((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsLoading(false), 500); // Wait a bit at 100% before splashing
          return 100;
        }
        return prev + 1;
      });
    }, 20); // Speed of loader

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0, 
            // The "Splash" Reveal: A hole opens in the center
            clipPath: "circle(0% at 50% 50%)", 
            transition: { duration: 1, ease: "easeInOut" }
          }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black overflow-hidden"
        >
          {/* --- LAYER 1: The "Round to Center" Vortex Rings --- */}
          {/* Ring 1 (Big) */}
          <motion.div 
            className="absolute w-[600px] h-[600px] border border-white/5 rounded-full"
            animate={{ scale: [1.5, 0], rotate: 360, opacity: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeIn" }}
          />
          {/* Ring 2 (Medium) */}
          <motion.div 
            className="absolute w-[400px] h-[400px] border border-white/10 rounded-full"
            animate={{ scale: [1.5, 0], rotate: -180, opacity: [0, 1, 0] }}
            transition={{ duration: 2, delay: 0.5, repeat: Infinity, ease: "easeIn" }}
          />
          {/* Ring 3 (Small) */}
          <motion.div 
            className="absolute w-[200px] h-[200px] border border-white/20 rounded-full dashed-border"
            animate={{ scale: [1.5, 0], rotate: 90, opacity: [0, 1, 0] }}
            transition={{ duration: 2, delay: 1, repeat: Infinity, ease: "easeIn" }}
            style={{ borderStyle: "dashed" }}
          />

          {/* --- LAYER 2: The Data Counter --- */}
          <div className="relative z-10 flex flex-col items-center">
            <motion.h1 
              className="text-8xl font-black text-white font-mono tracking-tighter"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
            >
              {count}%
            </motion.h1>
            <motion.div 
              className="mt-2 text-xs font-mono text-neon-cyan"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 0.5 }}
            >
              SYSTEM_INITIALIZING...
            </motion.div>
          </div>

          {/* --- LAYER 3: The "Splash" Mask (The thing that expands) --- */}
          {/* This invisible circle scales UP when we exit, revealing the site */}
          <motion.div
            className="absolute inset-0 bg-white mix-blend-difference pointer-events-none"
            initial={{ scale: 0, borderRadius: "100%" }}
            exit={{ scale: 20, transition: { duration: 0.8, ease: "circIn" } }}
          />

        </motion.div>
      )}
    </AnimatePresence>
  );
}