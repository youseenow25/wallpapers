import { Suspense } from "react";
import { getWallpapers } from "@/lib/api";
import CatalogClient from "./CatalogClient";
import MembershipBanner from "@/components/MembershipBanner";

export default async function CatalogPage() {
  const wallpapers = await getWallpapers().catch(() => []);
  return (
    <>
      {wallpapers.length > 0 && (
        <MembershipBanner wallpaperCount={wallpapers.length} />
      )}
      <Suspense>
        <CatalogClient wallpapers={wallpapers} />
      </Suspense>
    </>
  );
}
