import type { MetadataRoute } from "next";
import { client } from "@/lib/client";

const BASE_URL = "https://uthkarshmandloi.in";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Fetch all project slugs/IDs from Sanity for dynamic routes
  const projects = await client.fetch<{ _id: string; _updatedAt: string }[]>(
    `*[_type == "project"]{ _id, _updatedAt }`
  );

  const projectUrls: MetadataRoute.Sitemap = projects.map((p) => ({
    url: `${BASE_URL}/projects`,
    lastModified: new Date(p._updatedAt),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/projects`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    // Deduplicated project entries
    ...projectUrls.filter(
      (v, i, a) => a.findIndex((t) => t.url === v.url) === i
    ),
  ];
}
