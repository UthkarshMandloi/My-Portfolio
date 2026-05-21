"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Pillar {
  label: string;
  title: string;
  desc: string;
  details: string[];
}

interface InteractiveAboutProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  profile: any;
}

export default function InteractiveAbout({ profile }: InteractiveAboutProps) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);

  const pillars: Pillar[] = [
    {
      label: "The Core Identity",
      title: "Computer Engineering Student",
      desc: "Dedicated to elegant logic, structural performance, and building functional engineering solutions.",
      details: ["Data Structures & Algorithms", "OS Architecture", "C/C++", "System Optimization"]
    },
    {
      label: "The Differentiator",
      title: "Hardware Meets Software",
      desc: "Bridging the gap between physical embedded systems (Arduino, robotics) and modern stack digital solutions (Next.js, AI).",
      details: ["PID Control Loops", "Arduino & STM32", "Serial Communication", "Hardware-Software Co-Design"]
    },
    {
      label: "The Leadership Angle",
      title: "Operations Lead & Captain",
      desc: "GDG Operations Lead & Robotronics Captain, driving collaboration, organizing major events, and executing ideas.",
      details: ["Hackathon Logistics", "Technical Mentorship", "500+ Community Size", "Team Captaincy"]
    },
    {
      label: "Currently Exploring",
      title: "AI Integration & Apps",
      desc: "Integrating state-of-the-art LLM APIs, building responsive cross-platform mobile apps, and designing clean interfaces.",
      details: ["OpenAI & Anthropic APIs", "React Native", "Vector Embeddings", "Context Orchestration"]
    }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
      <div className="lg:col-span-4">
        <span className="text-[10px] font-sans font-bold tracking-widest text-[var(--theme-text-muted)] theme-transition uppercase">
          Biography
        </span>
        <h2 className="text-3xl font-extrabold tracking-tight text-[var(--theme-text-color)] theme-transition font-sans mt-3">
          About Me
        </h2>
        
        {/* Interactive Pulse Metric */}
        <div className="mt-8 hidden lg:flex items-center gap-3 p-4 bg-[var(--theme-card-bg)] border border-[var(--theme-border-color)] rounded-xl theme-transition select-none w-fit">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--theme-text-color)] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[var(--theme-text-color)]"></span>
          </span>
          <span className="text-[10px] font-mono tracking-widest text-[var(--theme-text-muted)] uppercase">
            Interactive Deck — Hover to inspect
          </span>
        </div>
      </div>
      
      <div className="lg:col-span-8 space-y-12">
        <div className="space-y-6 text-lg md:text-xl text-[var(--theme-text-color)] opacity-90 theme-transition font-light leading-relaxed font-sans">
          <p className="transition-all duration-300 hover:translate-x-1 cursor-default">
            I’m a Computer Engineering student who loves living at the intersection of hardware and software. My journey started in robotics—building and tuning PID-controlled maze-solvers and line-followers as the Team Captain of the Robotronics Club. That hands-on experience in making physical things work taught me how to tackle complex, logic-heavy problems.
          </p>
          <p className="transition-all duration-300 hover:translate-x-1 cursor-default">
            Today, I apply that same problem-solving mindset to the digital world. I build fast, scalable web and mobile applications using React, Next.js, and React Native, and I’m deeply focused on integrating AI and LLM APIs to create smarter tools. Beyond writing code, I care about building communities. As the Operations Lead for GDG on Campus and a member of the NSS Content team, I enjoy bringing tech enthusiasts together, managing events, and turning ambitious ideas into reality.
          </p>
        </div>

        {/* CORE ELEMENTS / PILLARS - Highly Interactive */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
          {pillars.map((pillar, idx) => {
            const isHovered = hoveredIdx === idx;
            const isAnyHovered = hoveredIdx !== null;
            const isExpanded = expandedIdx === idx;

            return (
              <motion.div 
                key={idx}
                className={`p-6 rounded-xl border relative overflow-hidden transition-all duration-500 cursor-pointer shadow-sm select-none flex flex-col justify-between h-[200px] ${
                  isExpanded ? "ring-2 ring-[var(--theme-text-color)]" : ""
                }`}
                style={{
                  backgroundColor: "var(--theme-card-bg)",
                  borderColor: isHovered ? "var(--theme-text-color)" : "var(--theme-border-color)",
                  opacity: isAnyHovered && !isHovered ? 0.35 : 1,
                  scale: isHovered ? 1.02 : 1,
                }}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => {
                  setHoveredIdx(null);
                  setExpandedIdx(null);
                }}
                onClick={() => setExpandedIdx(isExpanded ? null : idx)}
                layout
              >
                {/* CAD Drafting Ticks overlay visible on hover */}
                <AnimatePresence>
                  {isHovered && (
                    <>
                      {/* Top-Left CAD bracket */}
                      <motion.div 
                        initial={{ opacity: 0, x: -6, y: -6 }}
                        animate={{ opacity: 0.6, x: 0, y: 0 }}
                        exit={{ opacity: 0, x: -6, y: -6 }}
                        className="absolute top-2 left-2 w-3.5 h-3.5 border-t border-l border-[var(--theme-text-color)]"
                      />
                      {/* Bottom-Right CAD bracket */}
                      <motion.div 
                        initial={{ opacity: 0, x: 6, y: 6 }}
                        animate={{ opacity: 0.6, x: 0, y: 0 }}
                        exit={{ opacity: 0, x: 6, y: 6 }}
                        className="absolute bottom-2 right-2 w-3.5 h-3.5 border-b border-r border-[var(--theme-text-color)]"
                      />
                    </>
                  )}
                </AnimatePresence>

                <div className="space-y-2 relative z-10 w-full">
                  <div className="flex justify-between items-center w-full">
                    <span className="text-[9px] font-sans font-bold tracking-widest text-[var(--theme-text-muted)] theme-transition uppercase">
                      {pillar.label}
                    </span>
                    <span className="text-[9px] font-mono text-[var(--theme-text-muted)] opacity-60">
                      [0{idx + 1}]
                    </span>
                  </div>

                  <AnimatePresence mode="wait">
                    {!isExpanded ? (
                      <motion.div
                        key="collapsed"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="space-y-1.5"
                      >
                        <h3 className="text-sm font-bold text-[var(--theme-text-color)] theme-transition font-sans">
                          {pillar.title}
                        </h3>
                        <p className="text-xs text-[var(--theme-text-muted)] theme-transition leading-relaxed font-sans line-clamp-3">
                          {pillar.desc}
                        </p>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="expanded"
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 5 }}
                        className="space-y-2 pt-1"
                      >
                        <h4 className="text-[10px] font-sans font-bold uppercase tracking-widest text-[var(--theme-text-color)]">
                          Core Competencies
                        </h4>
                        <div className="flex flex-wrap gap-1.5">
                          {pillar.details.map((detail, dIdx) => (
                            <span 
                              key={dIdx}
                              className="px-2 py-0.5 text-[8px] font-mono uppercase bg-[var(--theme-badge-bg)] border border-[var(--theme-border-color)] text-[var(--theme-badge-text)] rounded font-bold"
                            >
                              {detail}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Card Interaction Trigger Prompt */}
                <div className="w-full text-left pt-2 flex items-center justify-between text-[8px] font-mono tracking-widest text-[var(--theme-text-muted)] opacity-60 group-hover:opacity-100 transition-opacity">
                  <span>{isExpanded ? "HOVER / LEAVE TO CLOSE" : "CLICK TO EXPAND DETAILS"}</span>
                  <svg className={`w-2.5 h-2.5 transform transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </motion.div>
            );
          })}
        </div>
        
        {/* Dynamic Social Handles Row */}
        <div className="pt-6 flex items-center gap-6 border-t border-[var(--theme-border-color)] theme-transition">
          {profile.socials?.github && (
            <a 
              href={profile.socials.github} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-[var(--theme-text-muted)] hover:text-[var(--theme-text-color)] hover:scale-110 transition-all duration-300"
              title="GitHub"
            >
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
              </svg>
            </a>
          )}
          {profile.socials?.linkedin && (
            <a 
              href={profile.socials.linkedin} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-[var(--theme-text-muted)] hover:text-[var(--theme-text-color)] hover:scale-110 transition-all duration-300"
              title="LinkedIn"
            >
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
          )}
          {profile.socials?.instagram && (
            <a 
              href={profile.socials.instagram} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-[var(--theme-text-muted)] hover:text-[var(--theme-text-color)] hover:scale-110 transition-all duration-300"
              title="Instagram"
            >
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845a1.44 1.44 0 100-2.881 1.44 1.44 0 000 2.881z"/>
              </svg>
            </a>
          )}
          {profile.socials?.twitter && (
            <a 
              href={profile.socials.twitter} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-[var(--theme-text-muted)] hover:text-[var(--theme-text-color)] hover:scale-110 transition-all duration-300"
              title="Twitter / X"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
