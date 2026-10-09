import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    { url: siteConfig.url, lastModified, changeFrequency: "weekly", priority: 1 },
    { url: `${siteConfig.url}/quem-somos`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteConfig.url}/contato`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteConfig.url}/politica-de-privacidade`, lastModified, changeFrequency: "yearly", priority: 0.3 },
  ];
}
