"use client";

export default function SciFiGrid() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      {/* 1. Moving Floor Grid */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
            backgroundImage: `linear-gradient(to right, #333 1px, transparent 1px), linear-gradient(to bottom, #333 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
            maskImage: 'linear-gradient(to bottom, transparent 5%, black 40%)',
            transform: 'perspective(500px) rotateX(60deg) translateY(-100px) scale(2)',
        }}
      />
      
      {/* 2. Floating Particles / Noise */}
      <div className="absolute inset-0 opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay"></div>
      
      {/* 3. Random Glowing Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-purple/20 rounded-full blur-[100px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-cyan/20 rounded-full blur-[100px] animate-pulse delay-1000" />
    </div>
  );
}