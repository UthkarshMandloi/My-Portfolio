"use client";
import { useState } from "react";
import ContactModal from "./ContactModal";


interface HUDOverlayProps {
  profile?: {
    name?: string;
    headline?: string;
    email?: string;
    socials?: {
      github?: string;
      linkedin?: string;
      instagram?: string;
      twitter?: string;
    };
  };
}

export default function HUDOverlay({ profile }: HUDOverlayProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const email = profile?.email || "contact@example.com";
  
  // Extract a clean role label for the vertical sidebar
  let roleLabel = "CREATIVE DEVELOPER";
  if (profile?.headline) {
    // If it contains an '&' or ',', split and take the first part
    const parts = profile.headline.split(/[&,]/);
    roleLabel = parts[0].trim().toUpperCase();
  }

  // Smooth scroll helper
  const handleScroll = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* 1. TOP HEADER NAVIGATION */}
      <header className="fixed top-0 left-0 w-full z-[100] px-6 py-6 md:px-12 md:py-8 flex items-center justify-between select-none pointer-events-none">
        {/* Left Side: Geometric Wolf Logo (Clickable) */}
        <div className="pointer-events-auto flex items-center gap-3">
          <a href="#" className="flex items-center group">
            {/* Symmetrical Geometric Wolf Head SVG */}
            <svg 
              viewBox="0 0 100 100" 
              className="w-9 h-9 text-[var(--theme-text-color)] fill-current transition-all duration-[800ms] group-hover:scale-105 group-hover:rotate-6 filter drop-shadow-[0_0_8px_rgba(255,255,255,0.05)] theme-transition"
            >
              {/* Outer Ears */}
              <polygon points="50,42 20,20 32,48" opacity="0.85" />
              <polygon points="50,42 80,20 68,48" opacity="0.85" />
              {/* Forehead */}
              <polygon points="50,15 20,20 50,42" opacity="0.7" />
              <polygon points="50,15 80,20 50,42" opacity="0.7" />
              {/* Cheeks */}
              <polygon points="50,42 32,48 15,65 50,58" opacity="0.8" />
              <polygon points="50,42 68,48 85,65 50,58" opacity="0.8" />
              {/* Muzzle */}
              <polygon points="50,58 15,65 50,85" opacity="0.9" />
              <polygon points="50,58 85,65 50,85" opacity="0.9" />
              {/* Nose Tip (Accented) */}
              <polygon points="50,76 40,70 60,70" className="text-neutral-900 fill-current" />
            </svg>
          </a>
        </div>

        {/* Center: Glassmorphic Pill Nav with Icons */}
        <nav className="hidden md:flex items-center pointer-events-auto">
          <div
            className="flex items-center gap-1 px-2 py-2 rounded-full border border-[var(--theme-text-color)]/15 backdrop-blur-md theme-transition"
            style={{ background: "var(--theme-card-bg)" }}
          >
            {[
              {
                label: "About",
                target: "about-section",
                icon: (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="8" r="4" />
                    <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                  </svg>
                ),
              },
              {
                label: "Portfolio",
                target: "works",
                icon: (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="7" width="20" height="15" rx="2" />
                    <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
                  </svg>
                ),
              },
              {
                label: "Services",
                target: "services-section",
                icon: (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                  </svg>
                ),
              },
              {
                label: "Blog",
                target: "blog-section",
                icon: (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 20h9" />
                    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                  </svg>
                ),
              },
            ].map((item) => (
              <button
                key={item.label}
                onClick={() => handleScroll(item.target)}
                className="group flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[var(--theme-text-muted)] hover:text-[var(--theme-text-color)] hover:bg-[var(--theme-text-color)]/8 font-sans text-xs font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer theme-transition"
              >
                <span className="opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                  {item.icon}
                </span>
                {item.label}
              </button>
            ))}
          </div>
        </nav>

        {/* Right Side: Contact CTA */}
        <div className="pointer-events-auto">
          <button
            onClick={() => setModalOpen(true)}
            className="group flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--theme-text-color)]/20 bg-[var(--theme-text-color)]/5 hover:bg-[var(--theme-text-color)]/10 text-[var(--theme-text-color)] font-sans text-xs font-bold uppercase tracking-widest transition-all duration-300 backdrop-blur-sm cursor-pointer"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            Contact
            <svg
              className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
            </svg>
          </button>
        </div>
      </header>

      {/* 2. ELEGANT LEFT SIDEBAR FRAME */}
      <aside className="fixed left-0 top-0 h-full w-20 md:w-28 z-[90] flex flex-col items-center justify-between py-24 px-4 select-none pointer-events-none">
        {/* Top/Mid Vertical Line Indicator */}
        <div className="w-[1px] h-[15vh] bg-[var(--theme-text-color)] opacity-20 theme-transition" />

        {/* Vertical Rotated Text */}
        <div className="flex items-center justify-center my-auto py-8">
          <span 
            className="text-[9px] md:text-[10px] font-sans font-medium tracking-[0.25em] text-[var(--theme-text-muted)] uppercase whitespace-nowrap theme-transition"
            style={{ 
              writingMode: "vertical-rl", 
              transform: "rotate(180deg)" 
            }}
          >
            {roleLabel}
          </span>
        </div>

        {/* Bottom vertical divider & Current Year */}
        <div className="flex flex-col items-center gap-6">
          <div className="w-[1px] h-[15vh] bg-[var(--theme-text-color)] opacity-20 theme-transition" />
          <span className="text-[10px] md:text-xs font-sans tracking-widest text-[var(--theme-text-muted)] font-medium theme-transition">
            2026
          </span>
        </div>
      </aside>

      {/* Contact Modal */}
      <ContactModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        email={email}
      />
    </>
  );
}