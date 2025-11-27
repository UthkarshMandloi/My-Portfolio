"use client";
import { Tilt } from 'react-tilt';
import { motion } from 'framer-motion';

const defaultOptions = {
    reverse:        false,  
    max:            15,     
    perspective:    1000,   
    scale:          1.02,   
    speed:          1000,   
    transition:     true,   
    axis:           null,   
    reset:          true,   
    easing:         "cubic-bezier(.03,.98,.52,.99)",    
}

interface HoloCardProps {
    title: string;
    description: string;
    image: string;
    tech: string[];
    link: string;
}

export default function HoloCard({ title, description, image, tech, link }: HoloCardProps) {
  return (
    <Tilt options={defaultOptions} className="relative w-full h-[400px] rounded-xl overflow-hidden group cursor-pointer">
      {/* 1. The Glass Container */}
      <div className="absolute inset-0 bg-neutral-900/40 backdrop-blur-md border border-white/10 rounded-xl z-10 shadow-xl transition-all duration-300 group-hover:border-neon-cyan/50">
        
        {/* 2. The Holographic Gradient Overlay (Visible on hover) */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500 bg-gradient-to-tr from-transparent via-neon-purple to-neon-cyan z-20 pointer-events-none mix-blend-overlay" />
        
        {/* 3. Card Content */}
        <div className="relative z-30 p-6 flex flex-col h-full text-white font-mono">
          {/* Top Decor */}
          <div className="flex justify-between items-start mb-4 opacity-50 text-[10px] tracking-widest">
             <span>PROJECT_ID_01</span>
             <div className="flex gap-1">
                <div className="w-2 h-2 rounded-full bg-red-500" />
                <div className="w-2 h-2 rounded-full bg-yellow-500" />
                <div className="w-2 h-2 rounded-full bg-green-500" />
             </div>
          </div>

          {/* Image Area */}
          <div className="w-full h-40 bg-black/50 rounded-lg mb-4 overflow-hidden border border-white/5 relative">
             {image && <img src={image} alt={title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />}
          </div>

          {/* Text Info */}
          <h2 className="text-xl font-bold uppercase tracking-wide group-hover:text-neon-cyan transition-colors">
            {title}
          </h2>
          <p className="text-xs text-gray-400 mt-2 line-clamp-3 leading-relaxed">
            {description}
          </p>

          {/* Tech Stack Tags */}
          <div className="mt-auto flex flex-wrap gap-2 pt-4">
            {tech.map((t) => (
              <span key={t} className="px-2 py-1 text-[9px] uppercase tracking-wider bg-white/5 border border-white/10 rounded-sm text-gray-300">
                {t}
              </span>
            ))}
          </div>
        </div>
        
        {/* 4. Decorative Cyberpunk Lines */}
        <div className="absolute bottom-0 right-0 w-16 h-16 border-r-2 border-b-2 border-white/10 rounded-br-xl group-hover:border-neon-purple/50 transition-colors" />
      </div>
    </Tilt>
  );
}