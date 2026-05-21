"use client";

import { useEffect } from "react";

export interface ThemeColors {
  bgColor: string;
  textColor: string;
  textMuted: string;
  borderColor: string;
  cardBg: string;
  cardHoverBg: string;
  badgeBg: string;
  badgeText: string;
  particleColor: string;
  wireframeColor: string;
  ambientIntensity: number;
  directionalIntensity: number;
  isDark: boolean;
  starsSaturation: number;
}

export const themes: Record<string, ThemeColors> = {
  hero: {
    bgColor: "#050505",
    textColor: "#ffffff",
    textMuted: "#a3a3a3",
    borderColor: "rgba(255, 255, 255, 0.05)",
    cardBg: "rgba(0, 0, 0, 0.3)",
    cardHoverBg: "rgba(255, 255, 255, 0.05)",
    badgeBg: "rgba(255, 255, 255, 0.05)",
    badgeText: "#d4d4d4",
    particleColor: "#ffffff",
    wireframeColor: "#b026ff",
    ambientIntensity: 0.5,
    directionalIntensity: 1.0,
    isDark: true,
    starsSaturation: 0.0,
  },
  about: {
    bgColor: "#f4f0ff", // Soft glowing lavender/violet
    textColor: "#3b0764", // Rich, deep vibrant purple/violet
    textMuted: "#7c3aed", // Vibrant purple
    borderColor: "rgba(124, 58, 237, 0.25)",
    cardBg: "rgba(255, 255, 255, 0.65)", // Semi-transparent glass white
    cardHoverBg: "rgba(255, 255, 255, 0.85)",
    badgeBg: "rgba(124, 58, 237, 0.12)",
    badgeText: "#6d28d9",
    particleColor: "#8b5cf6", // Glowing violet particles
    wireframeColor: "#a78bfa", 
    ambientIntensity: 1.2,
    directionalIntensity: 1.5,
    isDark: false,
    starsSaturation: 1.0,
  },
  experience: {
    bgColor: "#ecfdf5", // Soft mint emerald
    textColor: "#065f46", // Rich, deep vibrant emerald green
    textMuted: "#059669", // Vibrant green
    borderColor: "rgba(5, 150, 105, 0.25)",
    cardBg: "rgba(255, 255, 255, 0.65)",
    cardHoverBg: "rgba(255, 255, 255, 0.85)",
    badgeBg: "rgba(5, 150, 105, 0.12)",
    badgeText: "#047857",
    particleColor: "#10b981", // Glowing emerald particles
    wireframeColor: "#34d399",
    ambientIntensity: 1.2,
    directionalIntensity: 1.5,
    isDark: false,
    starsSaturation: 1.0,
  },
  services: {
    bgColor: "#fff7ed", // Soft glowing peach/amber
    textColor: "#9a3412", // Rich, deep vibrant warm mahogany/amber
    textMuted: "#ea580c", // Vibrant orange
    borderColor: "rgba(234, 88, 12, 0.25)",
    cardBg: "rgba(255, 255, 255, 0.65)",
    cardHoverBg: "rgba(255, 255, 255, 0.85)",
    badgeBg: "rgba(234, 88, 12, 0.12)",
    badgeText: "#c2410c",
    particleColor: "#f97316", // Glowing amber particles
    wireframeColor: "#fb923c",
    ambientIntensity: 1.2,
    directionalIntensity: 1.5,
    isDark: false,
    starsSaturation: 1.0,
  },
  works: {
    bgColor: "#fffbeb", // Soft warm gold
    textColor: "#1e1b4b", // Rich, deep vibrant royal indigo
    textMuted: "#4338ca", // Vibrant indigo
    borderColor: "#4338ca", // Stark indigo borders for Neo-Pop
    cardBg: "#ffffff",
    cardHoverBg: "#f5f3ff",
    badgeBg: "rgba(67, 56, 202, 0.12)",
    badgeText: "#3730a3",
    particleColor: "#eab308", // Glowing yellow gold particles
    wireframeColor: "#facc15",
    ambientIntensity: 1.3,
    directionalIntensity: 1.6,
    isDark: false,
    starsSaturation: 1.0,
  },
  blog: {
    bgColor: "#f0f9ff", // Soft glowing sky blue
    textColor: "#0c4a6e", // Rich, deep vibrant sapphire/sky blue
    textMuted: "#0284c7", // Vibrant sky blue
    borderColor: "rgba(2, 132, 199, 0.25)",
    cardBg: "rgba(255, 255, 255, 0.65)",
    cardHoverBg: "rgba(255, 255, 255, 0.85)",
    badgeBg: "rgba(2, 132, 199, 0.12)",
    badgeText: "#0369a1",
    particleColor: "#0284c7", // Glowing sky blue particles
    wireframeColor: "#38bdf8",
    ambientIntensity: 1.2,
    directionalIntensity: 1.5,
    isDark: false,
    starsSaturation: 1.0,
  }
};

const sectionMappings = [
  { id: "hero-top", key: "hero" },
  { id: "about-section", key: "about" },
  { id: "experience-section", key: "experience" },
  { id: "services-section", key: "services" },
  { id: "works", key: "works" },
  { id: "blog-section", key: "blog" }
];

export default function ThemeScrollController() {
  useEffect(() => {
    // Initial set of variables
    updateThemeVariables(themes.hero);

    function updateThemeVariables(theme: ThemeColors) {
      const doc = document.documentElement;
      doc.style.setProperty("--theme-bg-color", theme.bgColor);
      doc.style.setProperty("--theme-text-color", theme.textColor);
      doc.style.setProperty("--theme-text-muted", theme.textMuted);
      doc.style.setProperty("--theme-border-color", theme.borderColor);
      doc.style.setProperty("--theme-card-bg", theme.cardBg);
      doc.style.setProperty("--theme-card-hover-bg", theme.cardHoverBg);
      doc.style.setProperty("--theme-badge-bg", theme.badgeBg);
      doc.style.setProperty("--theme-badge-text", theme.badgeText);

      // Dispatch a custom event for client components (like Scene3D)
      const event = new CustomEvent("theme-change", { detail: theme });
      window.dispatchEvent(event);
    }

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;

      let activeKey = "hero";

      // If we are at the very top or haven't scrolled past half the hero section, keep hero theme
      if (scrollY < viewportHeight * 0.45) {
        activeKey = "hero";
      } else {
        // Find which section is occupying the middle-top area of the screen
        sectionMappings.forEach((sec) => {
          const el = document.getElementById(sec.id);
          if (el) {
            const rect = el.getBoundingClientRect();
            // A section is active if its top is above the viewport center and bottom is below it
            const viewportCenter = viewportHeight * 0.5;
            if (rect.top <= viewportCenter && rect.bottom >= viewportCenter) {
              activeKey = sec.key;
            }
          }
        });
        
        // Fallback check: if we scrolled deep down but did not perfectly hit a center (spacing gaps),
        // find the closest section whose top is closest to 0
        if (activeKey === "hero" && scrollY > viewportHeight * 0.45) {
          let minDistance = Infinity;
          sectionMappings.forEach((sec) => {
            const el = document.getElementById(sec.id);
            if (el) {
              const rect = el.getBoundingClientRect();
              const distance = Math.abs(rect.top - 100);
              if (distance < minDistance) {
                minDistance = distance;
                activeKey = sec.key;
              }
            }
          });
        }
      }

      const activeTheme = themes[activeKey] || themes.hero;
      updateThemeVariables(activeTheme);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Run once on mount to capture initial scroll or reload
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return null; // Side-effect only component
}
