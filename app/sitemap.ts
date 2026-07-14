import type { MetadataRoute } from "next";
import { getWallpapers } from "@/lib/api";

const BASE = "https://www.outbbo.com";

const SEO_SLUGS = [
  "stay-humble-stay-goated",
  "life-is-a-joke-wallpaper",
  "the-world-is-yours",
  "summer-at-the-villa-wallpaper",
  "red-ferraris-estate-wallpaper",
  "zen-and-the-machine-wallpaper",
  "old-world-new-ride-wallpaper",
  "corner-office-flex-wallpaper",
  "phantom-rider-wallpaper",
  "part-the-waters-wallpaper",
  "jadore-napoli-wallpaper",
  "the-greatest-wallpaper",
  "one-way-wallpaper",
  "god-is-love-wallpaper",
  "white-countach-dreams-wallpaper",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const wallpapers = await getWallpapers().catch(() => []);

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
    { url: `${BASE}/catalog`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.4 },
  ];

  const productPages: MetadataRoute.Sitemap = wallpapers.map((w) => ({
    url: `${BASE}/product/${w.id}`,
    lastModified: new Date(w.created_at),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const seoPages: MetadataRoute.Sitemap = SEO_SLUGS.map((slug) => ({
    url: `${BASE}/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...productPages, ...seoPages];
}
