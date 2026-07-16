"use client";

import { useState } from "react";
import type { Wallpaper } from "@/lib/types";
import ProductCard from "@/components/ProductCard";

const COLLAPSED_TAG_COUNT = 12;

export default function CatalogClient({ wallpapers }: { wallpapers: Wallpaper[] }) {
  const [tag, setTag] = useState<string>("all");
  const [showAllTags, setShowAllTags] = useState(false);

  const allTags = Array.from(
    new Set(
      wallpapers.flatMap((w) =>
        w.tags ? w.tags.split(",").map((t) => t.trim()).filter(Boolean) : [],
      ),
    ),
  ).sort();

  const visibleTags = showAllTags ? allTags : allTags.slice(0, COLLAPSED_TAG_COUNT);

  const BOTTOM_IDS = new Set([27, 28, 29, 30, 31]);

  const sortToBottom = (list: Wallpaper[]) => {
    const top = list.filter((w) => !BOTTOM_IDS.has(w.id));
    const bottom = list.filter((w) => BOTTOM_IDS.has(w.id));
    return [...top, ...bottom];
  };

  const filtered = sortToBottom(
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
