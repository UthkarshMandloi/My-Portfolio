"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ExperienceItem {
  _id: string;
  role: string;
  company: string;
  period: string;
  description: string;
  skills?: string[];
  github?: string;
  linkedin?: string;
  instagram?: string;
  achievements?: string[];
}

interface InteractiveExperienceProps {
  experiences: ExperienceItem[];
}

const fallbackAchievements: Record<string, string[]> = {
  "default-1": [
    "Coordinated logistics and vendor operations for a major campus hackathon with 500+ participants.",
    "Hosted weekly Android development study jams, teaching Jetpack Compose to 60+ junior students.",
    "Orchestrated cross-departmental operations, increasing student engagement by 40% year-over-year."
  ],
  "default-2": [
    "Led 8 students in modeling and designing a PID-controlled robot capable of navigating complex physical mazes.",
    "Integrated custom multi-sensor arrays (ultrasonic, infrared) with real-time interrupt handling on Arduino.",
    "Secured 2nd place in the national Robo-Race competition against 35 collegiate engineering teams."
  ],
  "default-3": [
    "Authored 15+ comprehensive technical newsletters covering web accessibility and open-source practices.",
    "Designed standard content strategy guidelines, scaling social media reach to 2,000+ active followers.",
    "Collaborated with community outreach leads to script educational documentaries for digital literacy drives."
  ]
};

export default function InteractiveExperience({ experiences }: InteractiveExperienceProps) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
      <div className="lg:col-span-4">
        <span className="text-[10px] font-sans font-bold tracking-widest text-[var(--theme-text-muted)] theme-transition uppercase">
          Career Pathway
        </span>
        <h2 className="text-3xl font-extrabold tracking-tight text-[var(--theme-text-color)] theme-transition font-sans mt-3">
          Experience
        </h2>
        
        {/* Dynamic Interactive Timeline Stats */}
        <div className="mt-8 hidden lg:block space-y-3">
          <div className="p-4 bg-[var(--theme-card-bg)] border border-[var(--theme-border-color)] rounded-xl theme-transition select-none w-fit font-mono text-[9px] text-[var(--theme-text-muted)] space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              <span>Timeline Nodes: {experiences.length} Active</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
              <span>Spotlight Focus: {hoveredIdx !== null ? `Node 0${hoveredIdx + 1}` : "Idle"}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="lg:col-span-8 space-y-8 relative pl-6 border-l border-[var(--theme-border-color)] theme-transition ml-2">
        {/* Continuous dynamic timeline tracking line */}
        {hoveredIdx !== null && (
          <motion.div 
            className="absolute left-0 w-[2px] bg-[var(--theme-text-color)] -translate-x-[1.5px] z-20"
            initial={{ height: 0, y: 0 }}
            animate={{ 
              height: 100,
              y: hoveredIdx * 190 + 20 // approximate alignment
            }}
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
          />
        )}

        {experiences.map((exp, idx) => {
          const isHovered = hoveredIdx === idx;
          const isAnyHovered = hoveredIdx !== null;
          const isExpanded = expandedId === exp._id;
          const achievements = exp.achievements || fallbackAchievements[exp._id] || [
            "Contributed to project delivery, meeting core engineering milestones.",
            "Collaborated with cross-functional members to design and deploy optimized features.",
            "Conducted technical testing and documentation to ensure high reliability."
          ];

          return (
            <motion.div 
              key={exp._id}
              className={`group relative pb-8 border-b border-[var(--theme-border-color)] last:border-b-0 space-y-4 hover:border-[var(--theme-border-color)] transition-all duration-500 cursor-pointer theme-transition ${
                isAnyHovered && !isHovered ? "opacity-35 scale-[0.98]" : "opacity-100 scale-100"
              }`}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
              onClick={() => setExpandedId(isExpanded ? null : exp._id)}
            >
              {/* Individual Bullet Marker */}
              <div 
                className={`absolute -left-[31px] w-2.5 h-2.5 rounded-full border-2 bg-black z-10 transition-all duration-300 ${
                  isHovered 
                    ? "border-[var(--theme-text-color)] scale-125 bg-[var(--theme-text-color)]" 
                    : "border-[var(--theme-border-color)]"
                }`}
              />

              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  {/* Brand Icon Badge */}
                  <div className="p-3 bg-[var(--theme-card-bg)] border border-[var(--theme-border-color)] rounded-xl group-hover:border-[var(--theme-text-color)] group-hover:bg-[var(--theme-card-hover-bg)] shrink-0 transition-colors duration-300 theme-transition">
                    {exp.company?.toLowerCase().includes("gdg") ? (
                      <svg className="w-5 h-5 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
                      </svg>
                    ) : exp.company?.toLowerCase().includes("robotronics") ? (
                      <svg className="w-5 h-5 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="11" width="18" height="10" rx="2" />
                        <path d="M12 2v3M8 5h8M7 11V9a1 1 0 011-1h8a1 1 0 011 1v2M9 15h.01M15 15h.01" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5 text-rose-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-[var(--theme-text-color)] theme-transition font-sans group-hover:text-[var(--theme-text-color)] transition-colors duration-300">
                      {exp.role}
                    </h3>
                    <div className="flex flex-wrap items-center gap-2 mt-1">
                      <span className="text-sm font-sans font-semibold text-[var(--theme-text-muted)] theme-transition">
                        {exp.company}
                      </span>
                      {(exp.github || exp.linkedin || exp.instagram) && (
                        <span className="text-[var(--theme-text-muted)] opacity-60 font-light text-xs shrink-0">—</span>
                      )}
                      <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                        {exp.github && (
                          <a 
                            href={exp.github} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-[var(--theme-text-muted)] hover:text-[var(--theme-text-color)] transition-colors duration-300 p-0.5"
                            title={`${exp.company} GitHub`}
                          >
                            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                            </svg>
                          </a>
                        )}
                        {exp.linkedin && (
                          <a 
                            href={exp.linkedin} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-[var(--theme-text-muted)] hover:text-[var(--theme-text-color)] transition-colors duration-300 p-0.5"
                            title={`${exp.company} LinkedIn`}
                          >
                            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                            </svg>
                          </a>
                        )}
                        {exp.instagram && (
                          <a 
                            href={exp.instagram} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-[var(--theme-text-muted)] hover:text-[var(--theme-text-color)] transition-colors duration-300 p-0.5"
                            title={`${exp.company} Instagram`}
                          >
                            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845a1.44 1.44 0 100-2.881 1.44 1.44 0 000 2.881z"/>
                            </svg>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <span className="text-xs md:text-sm font-mono text-[var(--theme-text-muted)] tracking-wider group-hover:text-[var(--theme-text-color)] transition-colors duration-300 pt-1 theme-transition">
                  {exp.period}
                </span>
              </div>
              
              <p className="text-sm text-[var(--theme-text-muted)] opacity-95 leading-relaxed font-sans theme-transition">
                {exp.description}
              </p>

              {/* Achievements Accordion */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden pl-4 border-l border-[var(--theme-text-color)] space-y-2 mt-4"
                  >
                    <h4 className="text-[10px] font-sans font-bold uppercase tracking-widest text-[var(--theme-text-color)]">
                      Key Highlights
                    </h4>
                    <ul className="space-y-1.5 text-xs text-[var(--theme-text-muted)] list-disc pl-4 font-sans leading-relaxed">
                      {achievements.map((item, key) => (
                        <li key={key} className="hover:text-[var(--theme-text-color)] transition-colors duration-300">{item}</li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
              
              <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                {exp.skills && exp.skills.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {exp.skills.map((skill: string) => (
                      <span 
                        key={skill}
                        className="px-2.5 py-1 text-[9px] font-mono uppercase tracking-wider bg-[var(--theme-badge-bg)] border border-[var(--theme-border-color)] rounded-md text-[var(--theme-badge-text)] font-semibold transition-colors group-hover:border-[var(--theme-text-muted)] theme-transition"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
                
                <span className="text-[8px] font-mono tracking-widest text-[var(--theme-text-muted)] opacity-40 group-hover:opacity-100 transition-opacity">
                  {isExpanded ? "CLICK TO COLLAPSE" : "CLICK TO VIEW IMPACT"}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
