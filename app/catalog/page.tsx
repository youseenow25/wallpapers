import { getWallpapers } from "@/lib/api";
import CatalogClient from "./CatalogClient";

export default async function CatalogPage() {
  const wallpapers = await getWallpapers().catch(() => []);
  return <CatalogClient wallpapers={wallpapers} />;
}
