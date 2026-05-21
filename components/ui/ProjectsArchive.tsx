"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { urlFor } from "@/lib/image";

interface Project {
  _id: string;
  title: string;
  summary?: string;
  technologies?: string[];
  link?: string;
  github?: string;
  image?: unknown;
  isFeatured?: boolean;
  [key: string]: unknown;
}

interface ProjectsArchiveProps {
  initialProjects: Project[];
}

const colorPalettes = [
  { bg: "bg-[#38bdf8]", text: "text-black", border: "border-black" }, // Sky Blue
  { bg: "bg-[#facc15]", text: "text-black", border: "border-black" }, // Vibrant Yellow
  { bg: "bg-[#f43f5e]", text: "text-black", border: "border-black" }, // Vibrant Pink-Rose
  { bg: "bg-[#34d399]", text: "text-black", border: "border-black" }, // Emerald Green
  { bg: "bg-[#a78bfa]", text: "text-black", border: "border-black" }, // Purple
  { bg: "bg-[#fb923c]", text: "text-black", border: "border-black" }, // Vibrant Orange
];

export default function ProjectsArchive({ initialProjects }: ProjectsArchiveProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState("ALL");

  useEffect(() => {
    // Force a premium light Neo-Pop theme when on the projects page
    const doc = document.documentElement;
    const oldBgColor = doc.style.getPropertyValue("--theme-bg-color");
    const oldTextColor = doc.style.getPropertyValue("--theme-text-color");
    const oldTextMuted = doc.style.getPropertyValue("--theme-text-muted");
    const oldBorderColor = doc.style.getPropertyValue("--theme-border-color");

    doc.style.setProperty("--theme-bg-color", "#faf8f5");
    doc.style.setProperty("--theme-text-color", "#000000");
    doc.style.setProperty("--theme-text-muted", "#444444");
    doc.style.setProperty("--theme-border-color", "#000000");

    const activeTheme = {
      isDark: false, // enables light-mode sketch-style dash strokes instead of stars!
      wireframeColor: "#4338ca", // crisp royal indigo wireframe objects
      ambientIntensity: 1.3,
      directionalIntensity: 1.6,
    };

    const event = new CustomEvent("theme-change", { detail: activeTheme });
    window.dispatchEvent(event);

    return () => {
      // Revert variables upon navigating back or let ThemeScrollController set its values on the home page
      if (oldBgColor) doc.style.setProperty("--theme-bg-color", oldBgColor);
      else doc.style.removeProperty("--theme-bg-color");

      if (oldTextColor) doc.style.setProperty("--theme-text-color", oldTextColor);
      else doc.style.removeProperty("--theme-text-color");

      if (oldTextMuted) doc.style.setProperty("--theme-text-muted", oldTextMuted);
      else doc.style.removeProperty("--theme-text-muted");

      if (oldBorderColor) doc.style.setProperty("--theme-border-color", oldBorderColor);
      else doc.style.removeProperty("--theme-border-color");
    };
  }, []);

  // Extract unique tech tags for filtering
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    initialProjects.forEach((project) => {
      project.technologies?.forEach((tech: string) => {
        if (tech && tech.trim()) {
          tags.add(tech.trim().toUpperCase());
        }
      });
    });
    return ["ALL", ...Array.from(tags).sort()];
  }, [initialProjects]);

  // Filter projects dynamically
  const filteredProjects = useMemo(() => {
    return initialProjects.filter((project) => {
      const matchesSearch = 
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.summary?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.technologies?.some((tech: string) => tech.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesTag = 
        selectedTag === "ALL" ||
        project.technologies?.some((tech: string) => tech.trim().toUpperCase() === selectedTag);

      return matchesSearch && matchesTag;
    });
  }, [initialProjects, searchTerm, selectedTag]);

  // Calculate live stats
  const stats = useMemo(() => {
    const total = filteredProjects.length;
    const hasGithub = filteredProjects.filter(p => p.github).length;
    const ratio = total > 0 ? Math.round((hasGithub / total) * 100) : 0;
    return { total, hasGithub, ratio };
  }, [filteredProjects]);

  return (
    <div className="max-w-6xl mx-auto">
      
      {/* 1. DYNAMIC NEO-POP STATS DASHBOARD GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-12">
        {/* Stat 1: Filtered Count */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="bg-[#facc15] border-4 border-black rounded-2xl p-5 flex flex-col justify-between shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] select-none"
        >
          <span className="font-mono text-[10px] text-black font-black uppercase tracking-widest">
            ★ CREATIONS ON INDEX
          </span>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-4xl font-black text-black leading-none">
              {stats.total}
            </span>
            <span className="text-xs font-mono text-black/70 font-bold">
              / {initialProjects.length} total
            </span>
          </div>
          <span className="text-[10px] font-mono text-black/80 font-bold mt-3 border-t-2 border-black/10 pt-2 block uppercase">
            Filtered results matched
          </span>
        </motion.div>

        {/* Stat 2: Active Tag Category */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="bg-[#38bdf8] border-4 border-black rounded-2xl p-5 flex flex-col justify-between shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] select-none"
        >
          <span className="font-mono text-[10px] text-black font-black uppercase tracking-widest">
            ★ CURRENT MATRIX
          </span>
          <div className="mt-4 truncate">
            <span className="text-xl font-black text-black uppercase tracking-tight block leading-none py-1">
              {selectedTag === "ALL" ? "All Projects" : selectedTag}
            </span>
          </div>
          <span className="text-[10px] font-mono text-black/80 font-bold mt-3 border-t-2 border-black/10 pt-2 block uppercase">
            Active tech division
          </span>
        </motion.div>

        {/* Stat 3: Open Source Ratio */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="bg-[#34d399] border-4 border-black rounded-2xl p-5 flex flex-col justify-between shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] select-none"
        >
          <span className="font-mono text-[10px] text-black font-black uppercase tracking-widest">
            ★ GIT RATIO
          </span>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-4xl font-black text-black leading-none">
              {stats.ratio}%
            </span>
            <span className="text-xs font-mono text-black/70 font-bold">
              open source
            </span>
          </div>
          <span className="text-[10px] font-mono text-black/80 font-bold mt-3 border-t-2 border-black/10 pt-2 block uppercase">
            Available repositories
          </span>
        </motion.div>
      </div>

      {/* 2. NEO-POP SEARCH & TAG CLOUD FILTER MODULE */}
      <div className="bg-white border-4 border-black rounded-3xl p-6 mb-12 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <div className="flex flex-col lg:flex-row gap-6 justify-between items-stretch lg:items-center">
          
          {/* Brutalist Search Bar */}
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-black">
              <svg className="w-4 h-4 stroke-current" fill="none" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="SEARCH PROJECT ARCHIVE BY NAME OR STACK..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-4 bg-[#fcfaf7] border-4 border-black rounded-2xl text-xs font-mono uppercase font-black tracking-wider text-black placeholder-neutral-500 focus:outline-none focus:bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:shadow-none focus:translate-x-1 focus:translate-y-1 transition-all duration-150"
            />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm("")}
                className="absolute inset-y-0 right-4 flex items-center text-black hover:text-red-500 transition-colors font-mono font-bold"
              >
                ✕ CLEAR
              </button>
            )}
          </div>

          {/* Reset Action */}
          {(selectedTag !== "ALL" || searchTerm) && (
            <button
              onClick={() => {
                setSelectedTag("ALL");
                setSearchTerm("");
              }}
              className="px-6 py-4 bg-[#f43f5e] border-4 border-black text-black font-mono text-[10px] uppercase font-black tracking-widest rounded-2xl hover:bg-black hover:text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all duration-150 text-center"
            >
              Reset Search ↺
            </button>
          )}
        </div>

        {/* Scrollable Tech Tag Badges Cloud */}
        <div className="mt-6 border-t-4 border-black/10 pt-5">
          <span className="text-[10px] font-mono text-black font-black uppercase tracking-widest block mb-3">
            CLASSIFY CREATIONS BY TECH BADGE:
          </span>
          <div className="flex flex-wrap gap-2 max-h-36 overflow-y-auto pr-2 scrollbar-thin">
            {allTags.map((tag) => {
              const isActive = selectedTag === tag;
              return (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`px-3 py-1.5 font-mono text-[10px] uppercase font-black border-2 border-black transition-all duration-150 rounded-lg whitespace-nowrap cursor-pointer shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 ${
                    isActive
                      ? "bg-black text-white shadow-none translate-x-0.5 translate-y-0.5"
                      : "bg-white text-black hover:bg-neutral-100"
                  }`}
                >
                  {tag}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 3. STAGGERED GRID VIA FRAMER PRESENCE */}
      <motion.div 
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 min-h-[40vh]"
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, index) => {
            const palette = colorPalettes[index % colorPalettes.length];
            const projectImage = project.image 
              ? urlFor(project.image).width(800).url() 
              : `https://opengraph.githubassets.com/1/UthkarshMandloi/${project.title.replace(/ /g, "-")}`;

            return (
              <motion.div
                layout
                key={project._id}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ duration: 0.25 }}
                className={`relative group flex flex-col border-4 border-black rounded-3xl overflow-hidden ${palette.bg} ${palette.text} p-5 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-2 hover:-translate-y-2 hover:shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] hover:rotate-[0.5deg] transition-all duration-200`}
              >
                {/* Image Showcase Box inside Card */}
                <div className="w-full h-48 border-4 border-black rounded-2xl overflow-hidden bg-white relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={projectImage}
                    alt={project.title}
                    className="w-full h-full object-cover object-center group-hover:scale-[1.03] transition-transform duration-500"
                  />
                  
                  {/* Case Tag Overlay */}
                  <div className="absolute top-3 left-3 px-3 py-1 bg-white border-2 border-black rounded-lg font-mono text-[9px] font-black uppercase text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                    PROJ #{index + 1}
                  </div>

                  {project.isFeatured && (
                    <div className="absolute top-3 right-3 px-3 py-1 bg-[#facc15] border-2 border-black rounded-lg font-mono text-[9px] font-black uppercase text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center gap-1">
                      ★ FEATURED
                    </div>
                  )}
                </div>

                {/* Card Details & Info Content */}
                <div className="mt-5 space-y-4 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Meta Section */}
                    <div className="flex items-center justify-between font-mono text-[9px] font-black uppercase opacity-85">
                      <span>BUILD SUCCESSFUL</span>
                      <span>{'// 2026'}</span>
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl font-black tracking-tight uppercase leading-none border-b-4 border-black/10 pb-3 mt-1.5 font-sans">
                      {project.title}
                    </h3>

                    {/* Description */}
                    <p className="text-xs font-semibold leading-relaxed font-sans mt-3 opacity-95">
                      {project.summary || "A beautifully structured full-stack engineering solution resolving core performance, caching, and scalable UI bottlenecks."}
                    </p>
                  </div>

                  {/* Tech Tags & Actions */}
                  <div>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {project.technologies?.slice(0, 4).map((tech: string) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 text-[8px] font-mono uppercase font-black bg-white border-2 border-black rounded shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)] text-black"
                        >
                          {tech}
                        </span>
                      )) || (
                        <span className="px-2 py-0.5 text-[8px] font-mono uppercase font-black bg-white border-2 border-black rounded shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)] text-black">
                          Full-Stack
                        </span>
                      )}
                    </div>

                    {/* Action Links Row */}
                    <div className="pt-4 mt-4 border-t-2 border-black/10 flex items-center justify-between gap-3">
                      {project.link ? (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 text-center py-2 px-3 border-2 border-black bg-black text-white font-mono text-[9px] uppercase font-black rounded-xl hover:bg-white hover:text-black transition-colors duration-150 shadow-[3px_3px_0px_0px_rgba(0,0,0,0.15)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5"
                        >
                          Live Demo ↗
                        </a>
                      ) : (
                        <div className="flex-1 text-center py-2 px-3 border-2 border-black bg-neutral-950/15 text-black/40 font-mono text-[9px] uppercase font-black rounded-xl cursor-not-allowed select-none">
                          Internal App
                        </div>
                      )}
                      
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 border-2 border-black bg-white text-black rounded-xl hover:bg-black hover:text-white transition-all duration-150 shadow-[3px_3px_0px_0px_rgba(0,0,0,0.15)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 flex items-center justify-center"
                          title="GitHub Repository"
                        >
                          <svg className="w-5.5 h-5.5 fill-current" viewBox="0 0 24 24">
                            <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {/* Grid Empty Fallback State */}
      {filteredProjects.length === 0 && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20 bg-white border-4 border-black rounded-3xl mt-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
        >
          <span className="text-4xl block mb-4">🔍</span>
          <h3 className="text-xl font-black text-black uppercase font-mono tracking-wider">
            No projects matched your filters
          </h3>
          <p className="text-neutral-500 font-mono text-xs uppercase tracking-widest mt-2 max-w-md mx-auto">
            Try adjusting your search criteria or resetting the classification badges above.
          </p>
          <button
            onClick={() => {
              setSearchTerm("");
              setSelectedTag("ALL");
            }}
            className="mt-6 px-4 py-2.5 bg-[#facc15] border-4 border-black text-black font-mono text-[10px] uppercase font-black tracking-widest rounded-xl hover:bg-black hover:text-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all duration-150"
          >
            Clear Filters ↺
          </button>
        </motion.div>
      )}
    </div>
  );
}
