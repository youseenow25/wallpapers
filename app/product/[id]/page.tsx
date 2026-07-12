import { getWallpaper, getWallpapers } from "@/lib/api";
import ProductDetail from "@/components/ProductDetail";
import BundleBanner from "@/components/BundleBanner";
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
    title: `${w.title} — outbbo`,
    description: w.description,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [w, allWallpapers] = await Promise.all([
    getWallpaper(id).catch(() => null),
    getWallpapers().catch(() => []),
  ]);
  if (!w) notFound();
  const totalRetailValue = allWallpapers.reduce((s, wp) => s + Number(wp.price), 0);
  return (
    <>
      <ProductDetail w={w} />
      {allWallpapers.length > 0 && (
        <BundleBanner wallpaperCount={allWallpapers.length} totalValue={totalRetailValue} />
      )}
    </>
  );
}
