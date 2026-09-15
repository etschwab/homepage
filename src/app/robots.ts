import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/login", "/dateien", "/admin", "/api/"],
    },
    sitemap: "https://etienneschwab.ch/sitemap.xml",
  };
}
