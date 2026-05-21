"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [hoverText, setHoverText] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  // Use motion values for buttery smooth cursor trailing without triggering React re-renders!
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Apply spring physics for that fluid trailing lag effect on the outer bracket
  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const trailX = useSpring(cursorX, springConfig);
  const trailY = useSpring(cursorY, springConfig);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      let target = e.target as HTMLElement | null;
      
      // Bubble up to find interactive parent (a, button, clickable elements)
      let foundInteractive = false;
      let text = "VIEW";

      while (target) {
        if (
          window.getComputedStyle(target).cursor === "pointer" ||
          target.tagName.toLowerCase() === "a" ||
          target.tagName.toLowerCase() === "button" ||
          target.onclick ||
          target.getAttribute("role") === "button"
        ) {
          foundInteractive = true;
          
          // Determine custom badge text based on element type
          if (target.tagName.toLowerCase() === "a" || target.getAttribute("href")) {
            text = "LINK ↗";
          } else if (target.tagName.toLowerCase() === "button" || target.getAttribute("role") === "button") {
            text = "CLICK";
          } else {
            text = "VIEW";
          }
          break;
        }
        target = target.parentElement;
      }

      if (foundInteractive) {
        setIsHovering(true);
        setHoverText(text);
      } else {
        setIsHovering(false);
        setHoverText("");
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseleave", handleMouseLeave);
    
    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isVisible, cursorX, cursorY]);

  if (!isVisible) return null;

  return (
    <>
      {/* 1. Responsively tight geometric ribbon arrowhead inner core - 0 lag */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] flex items-center justify-center"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.div
          className="relative transition-colors duration-500"
          animate={{
            scale: isHovering ? 0.45 : 0.56,
            rotate: isHovering ? 15 : 0,
          }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 25,
          }}
        >
          {/* Custom SVG Geometric Mitered Arrow Logo */}
          <svg 
            width="64" 
            height="64" 
            viewBox="0 0 64 64" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="drop-shadow-[0_3px_10px_rgba(0,0,0,0.22)]"
          >
            {/* Segment 1: Left Vertical Bar */}
            <path 
              d="M18 14 L26 6 L26 52 L18 44 Z" 
              fill="var(--theme-text-color, white)" 
              className="transition-colors duration-500" 
            />
            {/* Segment 2: Top Diagonal Bar */}
            <path 
              d="M28 6 L48 26 L42 32 L20 12 Z" 
              fill="var(--theme-text-color, white)" 
              className="transition-colors duration-500" 
            />
            {/* Segment 3: Bottom Return Chevron */}
            <path 
              d="M48 26 L28 46 L32 38 L24 30 Z" 
              fill="var(--theme-text-color, white)" 
              className="transition-colors duration-500" 
            />
          </svg>
        </motion.div>
      </motion.div>

      {/* 3. Trailing drafting compass/scale ring - with fluid spring physics */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] flex items-center justify-center"
        style={{
          x: trailX,
          y: trailY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.div
          className="relative flex items-center justify-center transition-colors duration-500"
          animate={{
            width: isHovering ? 44 : 24,
            height: isHovering ? 44 : 24,
            rotate: isHovering ? 180 : 0,
            borderRadius: "50%",
            borderColor: isHovering ? "var(--theme-text-color, white)" : "rgba(255,255,255,0.25)",
            borderWidth: isHovering ? "2px" : "1px",
            borderStyle: isHovering ? "solid" : "dashed",
            boxShadow: isHovering 
              ? "0 0 15px var(--theme-text-color, white)" 
              : "0 0 0px transparent",
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 24,
          }}
        >
          {/* Compass ticks visible when hovering */}
          {isHovering && (
            <>
              {/* Directional compass scales */}
              <div className="absolute top-0.5 w-[1.5px] h-2 bg-[var(--theme-text-color,white)] transition-colors duration-500" />
              <div className="absolute bottom-0.5 w-[1.5px] h-2 bg-[var(--theme-text-color,white)] transition-colors duration-500" />
              <div className="absolute left-0.5 w-2 h-[1.5px] bg-[var(--theme-text-color,white)] transition-colors duration-500" />
              <div className="absolute right-0.5 w-2 h-[1.5px] bg-[var(--theme-text-color,white)] transition-colors duration-500" />
              {/* 45 degree ticks */}
              <div className="absolute w-[1.5px] h-1.5 bg-[var(--theme-text-color,white)] rotate-45 top-1.5 left-1.5 transition-colors duration-500" />
              <div className="absolute w-[1.5px] h-1.5 bg-[var(--theme-text-color,white)] -rotate-45 top-1.5 right-1.5 transition-colors duration-500" />
              <div className="absolute w-[1.5px] h-1.5 bg-[var(--theme-text-color,white)] -rotate-45 bottom-1.5 left-1.5 transition-colors duration-500" />
              <div className="absolute w-[1.5px] h-1.5 bg-[var(--theme-text-color,white)] rotate-45 bottom-1.5 right-1.5 transition-colors duration-500" />
            </>
          )}
        </motion.div>

        {/* 4. Elegant dynamic context label that pops next to trailing compass */}
        <motion.div
          className="absolute left-10 px-2.5 py-1 bg-black border border-[var(--theme-text-color,white)] text-[var(--theme-text-color,white)] font-mono text-[9px] font-black uppercase tracking-widest rounded-lg shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] pointer-events-none select-none flex items-center justify-center whitespace-nowrap transition-colors duration-500"
          initial={{ opacity: 0, scale: 0.5, x: -10 }}
          animate={{
            opacity: isHovering ? 0.95 : 0,
            scale: isHovering ? 1.0 : 0.5,
            x: isHovering ? 0 : -10,
          }}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 22,
          }}
        >
          {hoverText}
        </motion.div>
      </motion.div>
    </>
  );
}
