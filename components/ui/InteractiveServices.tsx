"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ServiceItem {
  num: string;
  title: string;
  desc: string;
  deliverables: string[];
}

export default function InteractiveServices() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);

  const services: ServiceItem[] = [
    {
      num: "01",
      title: "Full-Stack Web Development",
      desc: "Building extremely fast, SEO-optimized, and robust next-generation web applications using Next.js, React, Node.js, and Sanity.io.",
      deliverables: ["Next.js App Router Setup", "Headless CMS Orchestration", "Serverless API Design", "Database Query Tuning"]
    },
    {
      num: "02",
      title: "UI/UX Creative Engineering",
      desc: "Crafting beautiful interfaces with tailored layouts, smooth micro-interactions, responsive typography, and premium user experiences.",
      deliverables: ["Component Design Systems", "Bespoke CSS/Variable Morphs", "Responsive Ratios", "Interactive SVG Assets"]
    },
    {
      num: "03",
      title: "3D Visual Web Experiences",
      desc: "Blending interactive web assets using Three.js, React Three Fiber, and WebGL to capture attention and elevate digital storytelling.",
      deliverables: ["GLSL Fragment Shaders", "3D Particle Starfields", "GPU-Accelerated Geometries", "Physics-Driven Parallax"]
    },
    {
      num: "04",
      title: "System Architecture & API Design",
      desc: "Designing high-performance system backends, scalable REST/GraphQL APIs, and headless CMS models to power digital platforms.",
      deliverables: ["Headless Schema Structures", "REST/GraphQL Integrations", "Optimized Fetch Hooks", "Sanity Webhook Triggers"]
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {services.map((service, idx) => {
        const isHovered = hoveredIdx === idx;
        const isAnyHovered = hoveredIdx !== null;
        const isExpanded = expandedIdx === idx;

        return (
          <motion.div 
            key={service.num}
            className={`p-8 bg-[var(--theme-card-bg)] border border-[var(--theme-border-color)] rounded-2xl relative overflow-hidden transition-all duration-500 cursor-pointer select-none flex flex-col justify-between h-[230px] group theme-transition ${
              isAnyHovered && !isHovered ? "opacity-35 scale-[0.98]" : "opacity-100 scale-100"
            } ${
              isExpanded ? "ring-2 ring-[var(--theme-text-color)]" : ""
            }`}
            onMouseEnter={() => setHoveredIdx(idx)}
            onMouseLeave={() => {
              setHoveredIdx(null);
              setExpandedIdx(null);
            }}
            onClick={() => setExpandedIdx(isExpanded ? null : idx)}
            layout
          >
            {/* Top Row: Num and Crosshair */}
            <div className="flex justify-between items-center relative z-10 w-full">
              <span className="text-2xl font-light text-[var(--theme-text-muted)] theme-transition font-mono">
                /{service.num}
              </span>
              
              {/* Rotating CAD Crosshair Target */}
              <motion.div
                animate={{ rotate: isHovered ? 90 : 0 }}
                transition={{ type: "spring", stiffness: 100, damping: 15 }}
                className={`w-6 h-6 flex items-center justify-center border rounded-full transition-colors duration-300 ${
                  isHovered ? "border-[var(--theme-text-color)]" : "border-[var(--theme-border-color)]"
                }`}
              >
                <div className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
                  isHovered ? "bg-[var(--theme-text-color)] animate-ping" : "bg-[var(--theme-text-muted)] opacity-30"
                }`} />
              </motion.div>
            </div>

            {/* Core Typography & Deliverables Accordion */}
            <div className="space-y-2 relative z-10 w-full pt-4">
              <AnimatePresence mode="wait">
                {!isExpanded ? (
                  <motion.div
                    key="desc"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-2"
                  >
                    <h3 className="text-lg font-bold text-[var(--theme-text-color)] theme-transition font-sans">
                      {service.title}
                    </h3>
                    <p className="text-xs text-[var(--theme-text-muted)] theme-transition leading-relaxed line-clamp-3">
                      {service.desc}
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="deliverables"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    className="space-y-2"
                  >
                    <h4 className="text-[9px] font-sans font-bold uppercase tracking-widest text-[var(--theme-text-color)]">
                      Deliverables & Technologies
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {service.deliverables.map((del, dIdx) => (
                        <span 
                          key={dIdx}
                          className="px-2.5 py-1 text-[8px] font-mono uppercase bg-[var(--theme-badge-bg)] border border-[var(--theme-border-color)] text-[var(--theme-badge-text)] rounded font-semibold transition-colors group-hover:border-[var(--theme-text-muted)] theme-transition"
                        >
                          {del}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Bottom Status Trigger Prompt */}
            <div className="w-full pt-4 flex items-center justify-between text-[8px] font-mono tracking-widest text-[var(--theme-text-muted)] opacity-50 group-hover:opacity-100 transition-opacity z-10">
              <span>{isExpanded ? "HOVER / LEAVE TO CLOSE" : "CLICK TO EXPAND METHODOLOGY"}</span>
              <svg className={`w-2.5 h-2.5 transform transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" />
              </svg>
            </div>

            {/* Premium CAD Stretching Horizontal Guide Line */}
            <div 
              className="absolute bottom-0 left-0 h-[2px] bg-[var(--theme-text-color)] transition-all duration-[600ms] ease-out z-20"
              style={{ width: isHovered ? "100%" : "0%" }}
            />
          </motion.div>
        );
      })}
    </div>
  );
}
