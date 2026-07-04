import { getWallpaper, getWallpapers } from "@/lib/api";
import ProductDetail from "@/components/ProductDetail";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const wallpapers = await getWallpapers().catch(() => []);
  return wallpapers.map((w) => ({ id: String(w.id) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const w = await getWallpaper(id).catch(() => null);
  if (!w) return { title: "Wallpaper not found" };
  return {
    title: `${w.title} — WALLVAULT`,
    description: w.description,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const w = await getWallpaper(id).catch(() => null);
  if (!w) notFound();
  return <ProductDetail w={w} />;
}
