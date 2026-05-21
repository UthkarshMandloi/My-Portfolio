import Link from "next/link";
import { client } from "@/lib/client";
import { urlFor } from "@/lib/image";
import Hero from "@/components/ui/Hero";
import HoloCard from "@/components/ui/HoloCard";
import HUDOverlay from "@/components/ui/HUDOverlay";
import PageWrapper from "@/components/PageWrapper";
import ThemeScrollController from "@/components/ui/ThemeScrollController";
import InteractiveAbout from "@/components/ui/InteractiveAbout";
import InteractiveExperience from "@/components/ui/InteractiveExperience";
import InteractiveServices from "@/components/ui/InteractiveServices";

export const revalidate = 10;
export const dynamic = 'force-dynamic';

async function getProfile() {
  const query = `*[_type == "profile"][0]`;
  return await client.fetch(query);
}

async function getProjects() {
  const query = `*[_type == "project"] | order(_createdAt desc)`;
  return await client.fetch(query);
}

async function getExperiences() {
  const query = `*[_type == "experience"] | order(orderNumber asc, _createdAt desc)`;
  return await client.fetch(query) || [];
}

const defaultExperiences = [
  {
    _id: "default-1",
    role: "Operations Lead",
    company: "GDG on Campus",
    period: "Jan 2025 — Present",
    description: "Leading event operations, coordinating technical workshops, managing community outreach, and orchestrating large-scale campus hackathons to empower over 500+ tech enthusiasts.",
    skills: ["Leadership", "Community Management", "Event Operations"],
    github: "https://github.com/gdg",
    linkedin: "https://linkedin.com/company/google-developer-groups",
    instagram: "https://instagram.com/gdg"
  },
  {
    _id: "default-2",
    role: "Team Captain",
    company: "Robotronics Club",
    period: "Aug 2023 — May 2024",
    description: "Led an elite robotics engineering team in building and tuning PID-controlled autonomous maze-solving and line-following robots, achieving top-tier recognition at national tech festivals.",
    skills: ["PID Control", "Arduino", "Embedded Systems", "Robotics"],
    github: "https://github.com/UthkarshMandloi/Robotronics-Hub",
    instagram: "https://instagram.com/robotronics_iet"
  },
  {
    _id: "default-3",
    role: "Content Creator & Member",
    company: "NSS Content Team",
    period: "Sep 2023 — Present",
    description: "Curating highly engaging technical content, newsletters, and informational materials for social campaigns, promoting digital literacy and technical engagement.",
    skills: ["Technical Writing", "Creative Communication", "Content Strategy"],
    instagram: "https://instagram.com/nss_iet_davv"
  }
];

export default async function Home() {
  const profile = await getProfile();
  const projects = await getProjects();
  const experiences = await getExperiences();

  // Experience fallback
  const displayExperiences = experiences.length > 0 ? experiences : defaultExperiences;

  // Filter for featured projects (Top Selection from CMS), fallback to first 3 if none flagged
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const featuredProjects = projects.filter((p: any) => p.isFeatured === true);
  const displayedProjects = featuredProjects.length > 0 ? featuredProjects : projects.slice(0, 3);

  return (
    <PageWrapper>
      {/* JSON-LD Structured Data — Person schema for Google rich results */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: profile?.name || "Uthkarsh Mandloi",
            url: "https://uthkarshmandloi.in",
            image: "https://uthkarshmandloi.in/og-image.png",
            jobTitle: profile?.headline || "Creative Engineer & Designer",
            description:
              "Computer Engineering student, Robotics lead, Next.js & AI developer based in Indore, India.",
            email: profile?.email || "uthkarshmandloi@gmail.com",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Indore",
              addressRegion: "Madhya Pradesh",
              addressCountry: "IN",
            },
            sameAs: [
              "https://github.com/UthkarshMandloi",
              "https://linkedin.com/in/uthkarshmandloi",
              "https://instagram.com/uthkarshmandloi",
            ],
            knowsAbout: [
              "Robotics",
              "Next.js",
              "React",
              "Artificial Intelligence",
              "Embedded Systems",
              "Web Development",
              "Three.js",
              "Computer Engineering",
            ],
          }),
        }}
      />

      {/* 1. Mount the Scroll Theme Controller */}
      <ThemeScrollController />
      
      {/* 2. Main content container mapped to custom CSS variables */}
      <main className="min-h-screen text-[var(--theme-text-color)] relative z-10 w-full selection:bg-neutral-800 selection:text-white bg-transparent theme-transition">
        
        <HUDOverlay profile={profile} />
        
        {/* 1. HERO SECTION */}
        <Hero profile={profile} projectCount={projects.length} />

        {/* 2. ABOUT ME SECTION */}
        <div id="about-section" className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:pl-36 pb-32 pt-20 border-t border-[var(--theme-border-color)] theme-transition">
          <InteractiveAbout profile={profile} />
        </div>

        {/* 3. EXPERIENCE SECTION */}
        <div id="experience-section" className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:pl-36 pb-32 pt-20 border-t border-[var(--theme-border-color)] theme-transition">
          <InteractiveExperience experiences={displayExperiences} />
        </div>

        {/* 4. EXPERTISE SECTION */}
        <div id="services-section" className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:pl-36 pb-32 pt-20 border-t border-[var(--theme-border-color)] theme-transition">
          <div className="flex items-end justify-between mb-16">
            <div>
              <span className="text-[10px] font-sans font-bold tracking-widest text-[var(--theme-text-muted)] theme-transition uppercase">
                Offerings
              </span>
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-[var(--theme-text-color)] theme-transition font-sans mt-3">
                Expertise
              </h2>
            </div>
          </div>

          <InteractiveServices />
        </div>

        {/* 5. TOP SELECTION / SELECTED WORKS SECTION */}
        <div id="works" className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:pl-36 pb-32 pt-28 border-t border-[var(--theme-border-color)] theme-transition">
          <div className="flex items-end justify-between mb-16 pb-6">
            <div>
              <span className="text-[10px] font-sans font-bold tracking-widest text-[var(--theme-text-muted)] theme-transition uppercase">
                Featured Selection
              </span>
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-[var(--theme-text-color)] theme-transition font-sans mt-3">
                Top Selection
              </h2>
            </div>
            <span className="font-sans text-[var(--theme-text-muted)] theme-transition text-base font-semibold tracking-widest uppercase">
              / 0{displayedProjects.length}
            </span>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {displayedProjects.map((project: any) => (
              <HoloCard 
                key={project._id}
                title={project.title}
                description={project.summary}
                image={project.image ? urlFor(project.image).width(800).url() : `https://opengraph.githubassets.com/1/UthkarshMandloi/${project.title.replace(/ /g, "-")}`}
                tech={project.technologies || []}
                link={project.link || project.github}
              />
            ))}
          </div>

          {/* View All Projects - Stark Neo-Pop Transition Button */}
          <div className="mt-16 pt-12 border-t border-[var(--theme-border-color)] theme-transition flex justify-center">
            <Link 
              href="/projects"
              className="inline-flex items-center gap-3 px-8 py-5 border-4 border-black text-black font-mono font-black text-lg uppercase bg-yellow-400 hover:bg-[#38bdf8] hover:text-black hover:-translate-x-1 hover:-translate-y-1 transition-all duration-300 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] select-none cursor-pointer rounded-2xl"
            >
              <span>View All Projects</span>
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
              </svg>
            </Link>
          </div>
        </div>

        {/* 6. BLOG SECTION */}
        <div id="blog-section" className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:pl-36 pb-32 pt-20 border-t border-[var(--theme-border-color)] theme-transition">
          <div className="flex items-end justify-between mb-16">
            <div>
              <span className="text-[10px] font-sans font-bold tracking-widest text-[var(--theme-text-muted)] theme-transition uppercase">
                Insights
              </span>
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-[var(--theme-text-color)] theme-transition font-sans mt-3">
                Latest Articles
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                date: "May 2026",
                title: "Designing the Perfect Asymmetrical Web Layout",
                excerpt: "An in-depth look at how editorial spacing, typography hierarchy, and selective interactive animations create luxury web portfolios."
              },
              {
                date: "April 2026",
                title: "Optimizing 3D Particle Canvases in Next.js",
                excerpt: "Techniques and best practices to compile React Three Fiber components efficiently, preventing thread blocks and mismatch issues."
              }
            ].map((post, idx) => (
              <article 
                key={idx}
                className="p-8 bg-[var(--theme-card-bg)] border border-[var(--theme-border-color)] rounded-2xl hover:bg-[var(--theme-card-hover-bg)] hover:border-[var(--theme-border-color)] transition-all duration-500 space-y-4 group cursor-pointer theme-transition"
              >
                <span className="text-[10px] font-sans font-semibold tracking-wider text-[var(--theme-text-muted)] theme-transition uppercase">
                  {post.date}
                </span>
                <h3 className="text-lg font-bold text-[var(--theme-text-color)] theme-transition font-sans group-hover:text-[var(--theme-text-color)] transition-colors">
                  {post.title}
                </h3>
                <p className="text-xs text-[var(--theme-text-muted)] theme-transition leading-relaxed">
                  {post.excerpt}
                </p>
                <div className="pt-2 flex items-center gap-1 text-[10px] font-sans font-bold uppercase tracking-widest text-[var(--theme-text-muted)] theme-transition group-hover:text-[var(--theme-text-color)] transition-colors duration-300">
                  <span>Read Article</span>
                  <svg className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* 7. FOOTER */}
        <footer className="relative z-10 border-t border-[var(--theme-border-color)] theme-transition py-12 lg:pl-36">
          <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-6">
            <span className="text-[10px] font-sans font-medium text-[var(--theme-text-muted)] theme-transition uppercase tracking-widest">
              © 2026 {profile.name}. All Rights Reserved.
            </span>
            <span className="text-[10px] font-sans font-medium text-[var(--theme-text-muted)] theme-transition uppercase tracking-widest">
              Designed with Precision.
            </span>
          </div>
        </footer>
      </main>
    </PageWrapper>
  );
}