"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function SpiralPreloader({ onComplete }: { onComplete: () => void }) {
  const [stage, setStage] = useState("spiral"); // 'spiral' | 'impact' | 'done'

  useEffect(() => {
    // 1. Spiral Animation runs (approx 2s)
    
    // 2. Trigger Splash at 2.1s (Just before it hits center)
    const timer1 = setTimeout(() => {
        setStage("impact");
    }, 2100);

    // 3. Finish everything
    const timer2 = setTimeout(() => {
        setStage("done");
        onComplete();
    }, 3000);

    return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
    };
  }, [onComplete]);

  if (stage === "done") return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-black flex items-center justify-center overflow-hidden">
      
      {/* --- PHASE 1: THE LIQUID SPIRAL --- */}
      {stage === "spiral" && (
        <div className="absolute animate-spiral-container">
            {/* The Drop (Teardrop Shape) */}
            <div className="w-4 h-12 bg-white rounded-full blur-[2px] animate-liquid-tail relative">
                 {/* The Head of the drop */}
                 <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-6 bg-white rounded-full shadow-[0_0_15px_white]" />
            </div>
        </div>
      )}

      {/* --- PHASE 2: THE INK SPLASH --- */}
      {stage === "impact" && (
         <motion.div 
            className="absolute z-10 w-full h-full flex items-center justify-center"
            initial={{ opacity: 1 }}
         >
            {/* An SVG Shape that looks like an Ink Splatter */}
            <motion.svg
               viewBox="0 0 200 200"
               className="w-[20vmin] h-[20vmin] text-white"
               initial={{ scale: 0 }}
               animate={{ scale: 30 }} // Scales up huge to cover screen
               transition={{ duration: 0.6, ease: "easeIn" }}
            >
               {/* Irregular Ink Blot Shape */}
               <path 
                 fill="currentColor" 
                 d="M45,-76C58.3,-69.3,69.2,-58.3,76.6,-45.6C84,-32.9,87.9,-18.5,86.2,-4.7C84.5,9.1,77.2,22.3,68.9,34.5C60.6,46.7,51.3,57.9,39.9,66.6C28.5,75.3,15,81.5,0.7,80.4C-13.6,79.2,-28.5,70.8,-41.8,61.7C-55.1,52.6,-66.8,42.8,-75.6,30.3C-84.4,17.8,-90.3,2.6,-88.2,-11.8C-86,-26.2,-75.8,-39.8,-64.2,-49.4C-52.6,-59,-39.6,-64.6,-27.1,-71.7C-14.6,-78.8,-2.6,-87.4,8.8,-86.6C20.2,-85.8,31.7,-82.7,45,-76Z" 
                 transform="translate(100 100)" 
               />
            </motion.svg>
         </motion.div>
      )}

      <style jsx>{`
        /* 1. Rotates the whole container (The Spiral Path) */
        @keyframes spiral-rotate {
            0% { transform: rotate(0deg) translateX(40vw) scale(0.5); }
            40% { transform: rotate(180deg) translateX(25vw) scale(0.8); }
            100% { transform: rotate(720deg) translateX(0px) scale(0.2); }
        }

        /* 2. Orients the drop so the tail points BACKWARDS */
        /* It spins opposite to the main rotation to keep 'head first' orientation */
        @keyframes liquid-tail {
            0% { transform: rotate(90deg); } 
            100% { transform: rotate(90deg); }
        }

        .animate-spiral-container {
            animation: spiral-rotate 2.1s cubic-bezier(0.25, 1, 0.5, 1) forwards;
            /* Using ease-out makes it "woosh" in */
        }

        .animate-liquid-tail {
             /* Keeps the tail pointing away from center as it spins */
             transform-origin: bottom center;
        }
      `}</style>
    </div>
  );
}