import Link from "next/link";
import { packImageCount, type Wallpaper } from "@/lib/types";
import { coverUrl } from "@/lib/api";

export default function ProductCard({ w }: { w: Wallpaper }) {
  const packCount = packImageCount(w);
  return (
    <Link href={`/product/${w.id}`} className="group block">
      <div className="relative overflow-hidden aspect-[4/3] bg-[#e4d9c4] mb-3">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={coverUrl(w.id)}
          alt={w.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {packCount > 0 && (
          <span className="absolute top-2 left-2 bg-[#1c1a18]/90 text-[#f0e8d8] text-[9px] font-medium uppercase tracking-[0.18em] px-2.5 py-1">
            {packCount}-Pack
          </span>
        )}
      </div>
      <div className="space-y-0.5">
        <h3 className="text-sm font-medium leading-snug">{w.title}</h3>
        <p className="text-sm text-[#7a7060]">${Number(w.price).toFixed(2)}</p>
      </div>
    </Link>
  );
}
