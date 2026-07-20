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
  const title = `${w.title} Wallpaper — Download for Mac & Desktop | Outbbo`;
  const description = `Download "${w.title}" — a premium oil painting style digital wallpaper by Outbbo. High-resolution, optimised for MacBook and desktop displays. Instant download.`;
  const url = `https://www.outbbo.com/product/${id}`;
  return {
    title,
    description,
    keywords: [
      `${w.title.toLowerCase()} wallpaper`,
      "oil painting wallpaper",
      "premium desktop wallpaper",
      "MacBook wallpaper",
      "digital wallpaper download",
      "Outbbo wallpaper",
      ...(w.tags ? w.tags.split(",").map((t: string) => `${t.trim()} wallpaper`) : []),
    ],
    alternates: { canonical: url },
    openGraph: {
      title: `${w.title} Wallpaper | Outbbo`,
      description,
      url,
      siteName: "Outbbo",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${w.title} Wallpaper | Outbbo`,
      description,
    },
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
    <ProductDetail
      w={w}
      bundleCount={allWallpapers.length}
      bundleValue={totalRetailValue}
    />
  );
}
