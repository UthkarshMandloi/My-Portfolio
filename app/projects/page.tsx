import Link from "next/link";
import { client } from "@/lib/client";
import ProjectsArchive from "@/components/ui/ProjectsArchive";

export const revalidate = 10;
export const dynamic = 'force-dynamic';

async function getAllProjects() {
  const query = `*[_type == "project"] | order(_createdAt desc)`;
  return await client.fetch(query) || [];
}

export default async function ProjectsPage() {
  const projects = await getAllProjects();

  return (
    <main className="min-h-screen text-black relative z-10 selection:bg-black selection:text-white py-20 px-6 md:px-12 lg:px-24 overflow-hidden bg-transparent">
      {/* Premium Neo-Pop Paper Grid & Soft Warm Spotlight */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5dec9_1.5px,transparent_1.5px),linear-gradient(to_bottom,#e5dec9_1.5px,transparent_1.5px)] bg-[size:4rem_4rem] opacity-[0.38] -z-10 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[35rem] bg-gradient-to-b from-[#facc15]/12 via-transparent to-transparent blur-[120px] rounded-full -z-10 pointer-events-none" />

      {/* HEADER SECTION - SLEEK NEO-POP EDITORIAL */}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-16 relative">
        <div className="space-y-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 border-4 border-black text-black font-mono text-[10px] uppercase font-black tracking-widest bg-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all duration-150 rounded-xl"
          >
            ← Back To Home
          </Link>
          
          <h1 className="text-4xl md:text-7xl font-black tracking-tight text-black uppercase font-sans drop-shadow-[4px_4px_0px_rgba(0,0,0,1)]">
            CREATIVE ARCHIVE
          </h1>
          <p className="text-xs text-neutral-800 font-mono uppercase tracking-widest font-black">
            ENGINEERING RESOLUTIONS // {projects.length} TOTAL BUILDS
          </p>
        </div>

        {/* Premium Dynamic Brutalist Badge */}
        <div className="px-5 py-3 border-4 border-black bg-[#facc15] text-black font-mono font-black text-xs uppercase tracking-wider rounded-2xl shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] flex items-center gap-2 select-none hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[7px_7px_0px_0px_rgba(0,0,0,1)] transition-all">
          <span className="w-2.5 h-2.5 bg-black rounded-full animate-ping" />
          ★ INTERACTIVE MATRIX SHOWCASE ★
        </div>
      </div>

      {/* MAIN CLIENT-SIDE INTERACTIVE CONTAINER */}
      <ProjectsArchive initialProjects={projects} />

      {/* NEW PREMIUM BRUTALIST FOOTER */}
      <footer className="max-w-6xl mx-auto mt-28 pt-12 border-t-4 border-black flex flex-col md:flex-row justify-between items-center gap-6 text-black font-mono text-[10px] uppercase tracking-widest font-black">
        <span>© 2026 Uthkarsh Mandloi. All Rights Reserved.</span>
        <span className="px-4 py-2 border-2 border-black bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] text-black rounded-lg">
          DYNAMIC SCENOGRAPHY STYLING
        </span>
      </footer>
    </main>
  );
}
