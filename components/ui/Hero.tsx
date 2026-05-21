"use client";

import { motion } from "framer-motion";
import { urlFor } from "@/lib/image";

interface HeroProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  profile: any;
  projectCount?: number;
}

export default function Hero({ profile, projectCount }: HeroProps) {
  if (!profile) return null;

  const projectsNumber = projectCount || 25;

  return (
    <section className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden bg-transparent pt-24 md:pt-0">
      
      {/* ASYMMETRICAL EDITORIAL GRID */}
      <div className="relative w-full max-w-7xl mx-auto px-6 md:px-12 lg:pl-36 flex-1 flex flex-col md:flex-row md:items-end justify-between z-20 pb-0">
        
        {/* LEFT COLUMN: STATS, HEADING, AND DESCRIPTION */}
        <div className="flex flex-col justify-center h-full md:pb-24 pt-12 md:pt-28 max-w-xl z-20">
          
          {/* STATS HEADER */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex gap-16 mb-10 md:mb-14"
          >
            <div>
              <span className="text-4xl md:text-5xl font-light tracking-tight text-[var(--theme-text-color)] theme-transition font-sans">
                +{projectsNumber}
              </span>
              <p className="text-[10px] md:text-xs text-[var(--theme-text-muted)] theme-transition uppercase tracking-widest mt-2 font-medium">
                Projects Completed
              </p>
            </div>
            <div>
              <span className="text-4xl md:text-5xl font-light tracking-tight text-[var(--theme-text-color)] theme-transition font-sans">
                +50
              </span>
              <p className="text-[10px] md:text-xs text-[var(--theme-text-muted)] theme-transition uppercase tracking-widest mt-2 font-medium">
                GitHub Repositories
              </p>
            </div>
          </motion.div>

          {/* MAIN HEADING & SUBTITLE */}
          <div className="space-y-4 md:space-y-6">
            <motion.h1 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.8, ease: "easeOut" }}
              className="text-[14vw] md:text-[9vw] lg:text-[8vw] font-extrabold tracking-tighter leading-none text-[var(--theme-text-color)] theme-transition select-none font-sans"
            >
              Hello
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
              className="text-sm md:text-base font-sans text-[var(--theme-text-muted)] theme-transition max-w-md leading-relaxed font-normal tracking-wide flex items-start gap-2"
            >
              <span className="text-[var(--theme-text-muted)] opacity-60 theme-transition font-light">—</span>
              <span>
                It&apos;s <span className="text-[var(--theme-text-color)] font-medium theme-transition">{profile.name}</span>, a {profile.headline || "creative engineer & designer"}.
              </span>
            </motion.p>
          </div>

          {/* ELEGANT BOUNCING SCROLL DOWN INDICATOR */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mt-12 md:mt-20 flex items-center gap-3 cursor-pointer group w-fit select-none"
            onClick={() => document.getElementById('works')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <span className="text-[10px] font-sans font-semibold text-[var(--theme-text-muted)] group-hover:text-[var(--theme-text-color)] tracking-[0.2em] uppercase transition-colors duration-300">
              Scroll down
            </span>
            <div className="w-5 h-8 border border-[var(--theme-border-color)] rounded-full flex justify-center p-1 group-hover:border-[var(--theme-text-muted)] transition-colors duration-300 theme-transition">
              <motion.div 
                className="w-1 h-1.5 bg-[var(--theme-text-color)] rounded-full theme-transition"
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              />
            </div>
          </motion.div>
        </div>

        {/* RIGHT COLUMN: LARGE MONOCHROME STUDIO PORTRAIT */}
        <div className="relative w-full md:w-[62%] flex items-end justify-center md:justify-end self-end h-[58vh] md:h-[90vh] overflow-hidden md:overflow-visible mt-8 md:mt-0 z-10">
          <div className="relative h-full w-auto aspect-[3/4] md:aspect-[4/5] z-10">
            {profile.profileImage ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.98, y: 40 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 1, ease: "easeOut" }}
                className="relative w-full h-full group overflow-hidden border-b border-[var(--theme-border-color)] theme-transition"
              >
                {/* Monochrome Image with Premium Hover */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={urlFor(profile.profileImage).width(1200).url()}
                  alt={profile.name}
                  className="w-full h-full object-cover object-top grayscale contrast-[1.08] brightness-90 group-hover:grayscale-0 group-hover:contrast-100 group-hover:brightness-100 group-hover:scale-[1.02] transition-all duration-1000 ease-out"
                />

                {/* Subtle Linear Dark Gradient Overlay on the Bottom of the Image */}
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--theme-bg-color)] via-transparent to-transparent opacity-60 z-20 pointer-events-none theme-transition" />
              </motion.div>
            ) : (
              <div className="w-full h-full bg-neutral-900 border border-[var(--theme-border-color)] animate-pulse rounded-lg theme-transition" />
            )}
          </div>
        </div>

      </div>
      
    </section>
  );
}