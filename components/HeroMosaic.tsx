import Link from "next/link";
import type { Wallpaper } from "@/lib/types";

function MosaicCell({
  w,
  className = "",
  style,
}: {
  w: Wallpaper;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <Link
      href={`/product/${w.id}`}
      className={`block overflow-hidden group ${className}`}
      style={style}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={w.cover_image}
        alt={w.title}
        className="w-full h-full object-cover group-hover:scale-[1.06] transition-transform duration-700 ease-out"
      />
    </Link>
  );
}

export default function HeroMosaic({ wallpapers }: { wallpapers: Wallpaper[] }) {
  // Fill to at least 8 by cycling
  const pool = wallpapers.length >= 8
    ? wallpapers
    : [...wallpapers, ...wallpapers, ...wallpapers].slice(0, 8);

  const [A, B, C, D, E, F, G, H] = pool;

  return (
    <>
      {/* ── Desktop mosaic (lg+) ──────────────────────────────────────── */}
      <section
        className="hidden lg:grid gap-[2px] h-[82vh] min-h-[520px]"
        style={{
          gridTemplateColumns: "1.15fr 1fr 1.1fr 1fr 1.15fr",
          gridTemplateRows: "1fr 1fr 1fr",
        }}
      >
        {/* A — left tall */}
        <MosaicCell w={A} style={{ gridColumn: "1", gridRow: "1 / 4" }} />

        {/* B — top middle-left */}
        <MosaicCell w={B} style={{ gridColumn: "2", gridRow: "1" }} />

        {/* C — top center */}
        <MosaicCell w={C} style={{ gridColumn: "3", gridRow: "1" }} />

        {/* D — top right-center */}
        <MosaicCell w={D} style={{ gridColumn: "4", gridRow: "1" }} />

        {/* E — right tall */}
        <MosaicCell w={E} style={{ gridColumn: "5", gridRow: "1 / 4" }} />

        {/* Text card */}
        <div
          className="bg-[#f0e8d8] flex flex-col items-center justify-center text-center px-8 xl:px-12"
          style={{ gridColumn: "2 / 4", gridRow: "2" }}
        >
          <p className="text-[9px] uppercase tracking-[0.22em] text-[#a09880] mb-3">
            Premium Collection
          </p>
          <h2 className="font-serif text-2xl xl:text-3xl 2xl:text-4xl font-bold leading-[1.15] tracking-tight mb-3">
            More Than a<br />Wallpaper.
          </h2>
          <p className="text-[11px] xl:text-xs text-[#7a7060] leading-relaxed max-w-[200px] mb-5">
            We don&apos;t create ordinary wallpapers. We create digital art
            designed to become part of your everyday life.
          </p>
          <Link
            href="/catalog"
            className="text-[9px] uppercase tracking-[0.2em] border border-[#1c1a18] px-5 py-2 hover:bg-[#1c1a18] hover:text-[#f0e8d8] transition-colors"
          >
            Shop Now
          </Link>
        </div>

        {/* F — middle-right, spans rows 2-3 */}
        <MosaicCell w={F} style={{ gridColumn: "4", gridRow: "2 / 4" }} />

        {/* G — bottom middle-left */}
        <MosaicCell w={G} style={{ gridColumn: "2", gridRow: "3" }} />

        {/* H — bottom center */}
        <MosaicCell w={H} style={{ gridColumn: "3", gridRow: "3" }} />
      </section>

      {/* ── Mobile fallback (< lg) ────────────────────────────────────── */}
      <section className="lg:hidden">
        <div className="text-center px-6 py-12 border-b border-[#ddd5c4]">
          <p className="text-[9px] uppercase tracking-[0.22em] text-[#a09880] mb-3">
            Premium Collection
          </p>
          <h2 className="font-serif text-4xl font-bold leading-tight mb-3">
            More Than a Wallpaper.
          </h2>
          <p className="text-sm text-[#7a7060] max-w-xs mx-auto leading-relaxed mb-6">
            Digital art designed to become part of your everyday life.
          </p>
          <Link
            href="/catalog"
            className="inline-block text-[10px] uppercase tracking-widest border border-[#1c1a18] px-6 py-2.5 hover:bg-[#1c1a18] hover:text-[#f0e8d8] transition-colors"
          >
            Shop Now
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-[2px]">
          {pool.slice(0, 6).map((w, i) => (
            <MosaicCell
              key={`${w.id}-${i}`}
              w={w}
              className="aspect-[4/3]"
            />
          ))}
        </div>
      </section>
    </>
  );
}
