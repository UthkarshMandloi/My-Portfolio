"use client";

import { Tilt } from "react-tilt";

const tiltOptions = {
  reverse: false,
  max: 8, // Subtle tilt for a premium, non-gimmicky feel
  perspective: 1000,
  scale: 1.015,
  speed: 800,
  transition: true,
  axis: null,
  reset: true,
  easing: "cubic-bezier(.03,.98,.52,.99)",
};

interface HoloCardProps {
  title: string;
  description: string;
  image: string;
  tech: string[];
  link: string;
}

export default function HoloCard({ title, description, image, tech, link }: HoloCardProps) {
  return (
    <a 
      href={link} 
      target="_blank" 
      rel="noopener noreferrer" 
      className="block w-full h-[430px] group pointer-events-auto select-none"
    >
      <Tilt options={tiltOptions} className="relative w-full h-full rounded-2xl overflow-hidden cursor-pointer">
        {/* Sleek Glassmorphic Container with Premium Border Transitions */}
        <div className="absolute inset-0 bg-[var(--theme-card-bg)] backdrop-blur-md border border-[var(--theme-border-color)] rounded-2xl z-10 shadow-2xl transition-all duration-[800ms] group-hover:border-[var(--theme-text-muted)] group-hover:bg-[var(--theme-card-hover-bg)] theme-transition">
          
          {/* Main Card Content */}
          <div className="relative z-30 p-6 flex flex-col h-full text-[var(--theme-text-color)] theme-transition">
            
            {/* Elegant Image Area with Smooth Zoom Hover */}
            <div className="w-full h-44 bg-[var(--theme-bg-color)]/30 rounded-xl mb-6 overflow-hidden border border-[var(--theme-border-color)] relative theme-transition">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              {image ? (
                <img 
                  src={image} 
                  alt={title} 
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out" 
                />
              ) : (
                <div className="w-full h-full bg-neutral-800 animate-pulse" />
              )}
              
              {/* Subtle overlay gradient on image */}
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--theme-bg-color)]/80 via-transparent to-transparent opacity-60 pointer-events-none theme-transition" />
            </div>

            {/* Typography Section */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-sans font-semibold tracking-widest text-[var(--theme-text-muted)] uppercase theme-transition">
                  Case Study
                </span>
                <div className="w-1.5 h-1.5 rounded-full bg-[var(--theme-text-muted)]/40 group-hover:bg-[var(--theme-text-color)] transition-colors duration-300 theme-transition" />
              </div>
              
              <h3 className="text-xl font-bold tracking-tight text-[var(--theme-text-color)] font-sans transition-colors duration-300 theme-transition">
                {title}
              </h3>
              
              <p className="text-xs text-[var(--theme-text-muted)] font-normal leading-relaxed line-clamp-3 pt-1 theme-transition">
                {description}
              </p>
            </div>

            {/* Clean, Non-Cluttered Tech Tags */}
            <div className="mt-auto flex flex-wrap gap-2 pt-4">
              {tech.slice(0, 4).map((t) => (
                <span 
                  key={t} 
                  className="px-2.5 py-1 text-[9px] font-mono uppercase tracking-wider bg-[var(--theme-badge-bg)] border border-[var(--theme-border-color)] rounded-md text-[var(--theme-badge-text)] font-semibold group-hover:border-[var(--theme-text-muted)] transition-all duration-300 theme-transition"
                >
                  {t}
                </span>
              ))}
            </div>
            
          </div>
          
          {/* Subtle Hover Ambient Glow (Monochrome white/dynamic) */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-700 bg-radial-gradient from-[var(--theme-text-color)]/20 via-transparent to-transparent z-20 pointer-events-none theme-transition" />
        </div>
      </Tilt>
    </a>
  );
}