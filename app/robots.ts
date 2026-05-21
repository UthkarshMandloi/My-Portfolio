import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/studio/", "/api/"],
      },
    ],
    sitemap: "https://uthkarshmandloi.vercel.app/sitemap.xml",
    host: "https://uthkarshmandloi.vercel.app",
  };
}
