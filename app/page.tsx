import { client } from "@/lib/client";
import { urlFor } from "@/lib/image";
import Hero from "@/components/ui/Hero";
import HoloCard from "@/components/ui/HoloCard";
import HUDOverlay from "@/components/ui/HUDOverlay";
import PageWrapper from "@/components/PageWrapper"; // <--- Import Wrapper

export const revalidate = 10;

async function getProfile() {
  const query = `*[_type == "profile"][0]`;
  return await client.fetch(query);
}

async function getProjects() {
  const query = `*[_type == "project"] | order(_createdAt desc)`;
  return await client.fetch(query);
}

export default async function Home() {
  const profile = await getProfile();
  const projects = await getProjects();

  return (
    // Wrap EVERYTHING in PageWrapper
    <PageWrapper>
      <main className="min-h-screen bg-neutral-950 text-white relative overflow-x-hidden selection:bg-white selection:text-black">
        
        <HUDOverlay />
        <Hero profile={profile} />

        <div id="works" className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pb-32 pt-20">
          <div className="flex items-end justify-between mb-16 border-b border-white/20 pb-4">
            <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter text-white">
              Selected Works
            </h2>
            <span className="font-mono text-gray-400 text-xl">
              // 00{projects.length}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {projects.map((project: any) => (
              <HoloCard 
                key={project._id}
                title={project.title}
                description={project.summary}
                image={project.image ? urlFor(project.image).width(800).url() : ""}
                tech={project.technologies || []}
                link={project.link || project.github}
              />
            ))}
          </div>
        </div>
      </main>
    </PageWrapper>
  );
}