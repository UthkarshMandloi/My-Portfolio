import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/ui/CustomCursor";
import NoiseOverlay from "@/components/ui/NoiseOverlay";
import Scene3D from "@/components/ui/Scene3D";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const BASE_URL = "https://uthkarshmandloi.in";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),

  /* ── Core ── */
  title: {
    default: "Uthkarsh Mandloi | Creative Engineer & Designer",
    template: "%s | Uthkarsh Mandloi",
  },
  description:
    "Portfolio of Uthkarsh Mandloi — Computer Engineering student, Robotics lead, Next.js & AI developer based in Indore, India. Building stunning web apps, custom hardware, and autonomous robot systems.",
  keywords: [
    "Uthkarsh Mandloi",
    "portfolio",
    "creative engineer",
    "web developer",
    "Next.js developer",
    "robotics engineer",
    "AI developer",
    "computer engineering",
    "Indore developer",
    "frontend developer",
    "React developer",
    "full stack developer",
    "GDG campus",
    "Robotronics",
    "hardware software",
  ],
  authors: [{ name: "Uthkarsh Mandloi", url: BASE_URL }],
  creator: "Uthkarsh Mandloi",
  publisher: "Uthkarsh Mandloi",

  /* ── Canonical & Alternates ── */
  alternates: {
    canonical: BASE_URL,
  },

  /* ── Open Graph (Facebook, LinkedIn, WhatsApp, Discord) ── */
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: BASE_URL,
    siteName: "Uthkarsh Mandloi",
    title: "Uthkarsh Mandloi | Creative Engineer & Designer",
    description:
      "Robotics lead, Next.js developer & AI engineer. Explore projects, experience, and expertise.",
    images: [
      {
        url: `${BASE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Uthkarsh Mandloi – Creative Engineer & Designer",
      },
    ],
  },

  /* ── Twitter / X Card ── */
  twitter: {
    card: "summary_large_image",
    title: "Uthkarsh Mandloi | Creative Engineer & Designer",
    description:
      "Robotics lead, Next.js developer & AI engineer based in Indore, India.",
    images: [`${BASE_URL}/og-image.png`],
    creator: "@uthkarshmandloi",
  },

  /* ── Robots ── */
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  /* ── Search Engine Verification ── */
  // Replace the placeholder values below with your real codes:
  // Google: https://search.google.com/search-console → Add Property → HTML Tag
  // Bing:   https://www.bing.com/webmasters          → Add Site → HTML Meta Tag
  verification: {
    google: "REPLACE_WITH_GOOGLE_VERIFICATION_CODE",
    other: {
      "msvalidate.01": ["REPLACE_WITH_BING_VERIFICATION_CODE"],
    },
  },

  /* ── Icons ── */
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black overflow-x-hidden`}
      >
        <CustomCursor />
        <NoiseOverlay />
        <Scene3D />
        <div className="relative z-10 overflow-hidden w-full">
          {children}
        </div>
      </body>
    </html>
  );
}
