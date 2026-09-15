import type { MetadataRoute } from "next";

const BASE_URL = "https://etienneschwab.ch";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/ueber-mich", "/projekte", "/impressum"];

  return routes.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}
