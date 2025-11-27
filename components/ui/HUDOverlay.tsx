"use client";

export default function HUDOverlay() {
  return (
    <div className="fixed inset-4 md:inset-6 z-50 pointer-events-none border border-white/5 rounded-lg select-none">
      
      {/* --- CORNERS (The Brackets) --- */}
      
      {/* Top Left */}
      <div className="absolute top-0 left-0 w-8 h-8 border-t-[3px] border-l-[3px] border-white rounded-tl-sm" />
      <div className="absolute top-6 left-6 font-mono text-[10px] tracking-widest text-gray-500">
        // EST. 2025
      </div>

      {/* Top Right */}
      <div className="absolute top-0 right-0 w-8 h-8 border-t-[3px] border-r-[3px] border-white rounded-tr-sm" />
      <div className="absolute top-6 right-6 font-mono text-[10px] tracking-widest text-right text-gray-500">
        REC ●
      </div>

      {/* Bottom Left */}
      <div className="absolute bottom-0 left-0 w-8 h-8 border-b-[3px] border-l-[3px] border-white rounded-bl-sm" />
      <div className="absolute bottom-6 left-6 font-mono text-[10px] tracking-widest text-gray-500">
        X: 104.2 Y: 88.1
      </div>

      {/* Bottom Right */}
      <div className="absolute bottom-0 right-0 w-8 h-8 border-b-[3px] border-r-[3px] border-white rounded-br-sm" />
      
      {/* --- CENTER CROSSHAIRS --- */}
      {/* Top Center Notch */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-10 h-[2px] bg-white/20" />
      {/* Bottom Center Notch */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-10 h-[2px] bg-white/20" />
      {/* Left Center Notch */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[2px] h-10 bg-white/20" />
      {/* Right Center Notch */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[2px] h-10 bg-white/20" />

      {/* --- SUBTLE SCANLINE (Optional - makes it feel like a screen) --- */}
      <div className="absolute inset-0 w-full h-[1px] bg-white/10 animate-scanline" />
      
      <style jsx>{`
        @keyframes scanline {
          0% { top: 0%; opacity: 0; }
          15% { opacity: 1; }
          85% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        .animate-scanline {
          animation: scanline 8s linear infinite;
        }
      `}</style>
    </div>
  );
}