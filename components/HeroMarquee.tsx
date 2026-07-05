import Link from "next/link";
import type { Wallpaper } from "@/lib/types";
import { coverUrl } from "@/lib/api";

export default function HeroMarquee({ wallpapers }: { wallpapers: Wallpaper[] }) {
  if (!wallpapers.length) return null;

  const items = [...wallpapers, ...wallpapers];

  return (
    <section className="border-b border-[#ddd5c4]">
      {/* Headline */}
      <div className="text-center pt-20 pb-12 px-6">
        <p className="text-[9px] uppercase tracking-[0.25em] text-[#a09880] mb-4">
          Premium Collection
        </p>
        <h1 className="font-serif text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.08] tracking-tight mb-5">
          More Than a Wallpaper.
        </h1>
        <p className="text-sm text-[#7a7060] max-w-sm mx-auto leading-relaxed mb-8">
          Digital art designed to become part of your everyday life.
        </p>
        <Link
          href="/catalog"
          className="inline-block text-[10px] uppercase tracking-[0.2em] border border-[#1c1a18] px-7 py-3 hover:bg-[#1c1a18] hover:text-[#f0e8d8] transition-colors"
        >
          Shop Now
        </Link>
      </div>

      {/* Scrolling strip */}
      <div className="marquee-outer pb-16">
        <div className="marquee-track">
          {items.map((w, i) => (
            <Link
              key={`${w.id}-${i}`}
              href={`/product/${w.id}`}
              className="group flex-shrink-0 watermark"
              style={{ width: "260px", height: "170px", display: "block", borderRadius: "6px" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={coverUrl(w.id)}
                alt={w.title}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                className="group-hover:scale-105 transition-transform duration-500"
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
