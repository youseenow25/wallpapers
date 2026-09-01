"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import type { Wallpaper } from "@/lib/types";
import ProductCard from "@/components/ProductCard";

const COLLAPSED_TAG_COUNT = 6;

export default function CatalogClient({ wallpapers: initialWallpapers }: { wallpapers: Wallpaper[] }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [type, setType] = useState<string>("desktop");
  const [tag, setTag] = useState<string>("all");
  const [showAllTags, setShowAllTags] = useState(false);

  useEffect(() => {
    const typeParam = searchParams.get("type");
    if (typeParam && ["all", "desktop"].includes(typeParam)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setType(typeParam);
    }
  }, [searchParams]);

  const wallpapers = type === "all"
    ? initialWallpapers
    : initialWallpapers.filter(w => w.type === type);

  const allTags = Array.from(
    new Set(
      wallpapers.flatMap((w) =>
        w.tags ? w.tags.split(",").map((t) => t.trim()).filter(Boolean) : [],
      ),
    ),
  ).sort();

  const visibleTags = showAllTags ? allTags : allTags.slice(0, COLLAPSED_TAG_COUNT);

  const F1_PACK_ID = 196;

  // The Complete Collection-2 batch (uploaded 2026-09-02) is pinned to the
  // bottom of the catalog regardless of its newer created_at, in id order.
  const BOTTOM_IDS = Array.from({ length: 35 }, (_, i) => 345 + i); // 345–379
  const BOTTOM_ID_SET = new Set(BOTTOM_IDS);

  const sortByNewest = (list: Wallpaper[]) => {
    const f1Pack = list.find((w) => w.id === F1_PACK_ID);

    const bottom = list
      .filter((w) => BOTTOM_ID_SET.has(w.id))
      .sort((a, b) => a.id - b.id);

    const others = list.filter(
      (w) => w.id !== F1_PACK_ID && !BOTTOM_ID_SET.has(w.id),
    );

    // Sort others by created_at descending (newest first)
    others.sort((a, b) => {
      const dateA = new Date(a.created_at || 0).getTime();
      const dateB = new Date(b.created_at || 0).getTime();
      return dateB - dateA;
    });

    // F1 pack first (if present), then newest-first, then the pinned bottom batch
    return [...(f1Pack ? [f1Pack] : []), ...others, ...bottom];
  };

  const filtered = sortByNewest(
    tag === "all"
      ? wallpapers
      : wallpapers.filter((w) =>
          w.tags?.split(",").map((t) => t.trim()).includes(tag),
        ),
  );

  return (
    <div className="max-w-screen-xl mx-auto px-6 py-16">
      <div className="mb-12">
        <h1 className="font-serif text-4xl font-bold mb-2">Collection</h1>
        <p className="text-sm text-[#7a7060]">{wallpapers.length} wallpapers</p>
      </div>

      <div className="flex flex-wrap gap-2 mb-10">
        <button
          onClick={() => { setType("all"); setTag("all"); router.push("?type=all"); }}
          className={`text-xs uppercase tracking-widest px-3 py-1.5 border transition-colors font-semibold ${
            type === "all"
              ? "bg-[#1c1a18] text-[#f0e8d8] border-[#1c1a18]"
              : "border-[#ddd5c4] text-[#7a7060] hover:border-[#7a7060]"
          }`}
        >
          All Wallpapers
        </button>
        <button
          onClick={() => { setType("desktop"); setTag("all"); router.push("?type=desktop"); }}
          className={`text-xs uppercase tracking-widest px-3 py-1.5 border transition-colors font-semibold ${
            type === "desktop"
              ? "bg-[#1c1a18] text-[#f0e8d8] border-[#1c1a18]"
              : "border-[#ddd5c4] text-[#7a7060] hover:border-[#7a7060]"
          }`}
        >
          Desktop
        </button>
      </div>

      {allTags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-10">
          <button
            onClick={() => setTag("all")}
            className={`text-xs uppercase tracking-widest px-3 py-1.5 border transition-colors ${
              tag === "all"
                ? "bg-[#1c1a18] text-[#f0e8d8] border-[#1c1a18]"
                : "border-[#ddd5c4] text-[#7a7060] hover:border-[#7a7060]"
            }`}
          >
            All
          </button>
          {visibleTags.map((t) => (
            <button
              key={t}
              onClick={() => setTag(t)}
              className={`text-xs uppercase tracking-widest px-3 py-1.5 border transition-colors capitalize ${
                tag === t
                  ? "bg-[#1c1a18] text-[#f0e8d8] border-[#1c1a18]"
                  : "border-[#ddd5c4] text-[#7a7060] hover:border-[#7a7060]"
              }`}
            >
              {t}
            </button>
          ))}
          {allTags.length > COLLAPSED_TAG_COUNT && (
            <button
              onClick={() => setShowAllTags((v) => !v)}
              className="text-xs uppercase tracking-widest px-3 py-1.5 border border-[#ddd5c4] text-[#7a7060] hover:border-[#7a7060] transition-colors"
            >
              {showAllTags ? "− Less" : `+ ${allTags.length - COLLAPSED_TAG_COUNT} more`}
            </button>
          )}
        </div>
      )}

      {filtered.length === 0 ? (
        <p className="text-sm text-[#7a7060]">No wallpapers found.</p>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((w) => (
            <ProductCard key={w.id} w={w} />
          ))}
        </div>
      )}
    </div>
  );
}
