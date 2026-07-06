import { getWallpapers } from "@/lib/api";
import CatalogClient from "./CatalogClient";
import BundleBanner from "@/components/BundleBanner";

export default async function CatalogPage() {
  const wallpapers = await getWallpapers().catch(() => []);
  const totalRetailValue = wallpapers.reduce((s, w) => s + Number(w.price), 0);
  return (
    <>
      {wallpapers.length > 0 && (
        <BundleBanner wallpaperCount={wallpapers.length} totalValue={totalRetailValue} />
      )}
      <CatalogClient wallpapers={wallpapers} />
    </>
  );
}
