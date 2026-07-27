import { MetadataRoute } from "next";
import { TOOLS } from "@/constants/tools";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://aitoolkit.app";

  const toolUrls = TOOLS.map((tool) => ({
    url: `${baseUrl}/tool/${tool.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    ...toolUrls,
  ];
}
