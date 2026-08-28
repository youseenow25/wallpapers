"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { coverUrl, framedCoverUrl, packImageUrl, getMemberDownloads, getToken, PRICING } from "@/lib/api";
import { packImageCount, type Wallpaper } from "@/lib/types";
import { useAuth } from "./AuthContext";

export default function ProductDetail({
  w,
}: {
  w: Wallpaper;
  bundleCount?: number;
  bundleValue?: number;
}) {
  const [expanded, setExpanded] = useState(false);
  const { user, hasAccess, loading } = useAuth();
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const packCount = packImageCount(w);
  const [selectedImg, setSelectedImg] = useState<number | undefined>(
    packCount > 0 ? 0 : undefined,
  );

  const tags = w.tags ? w.tags.split(",").filter(Boolean) : [];
  const descWords = w.description.split(" ");
  const isLong = descWords.length > 20;
  const shortDesc = isLong ? descWords.slice(0, 20).join(" ") + "…" : w.description;

  // Members get a signed download link for this wallpaper.
  useEffect(() => {
    if (!hasAccess) return;
    const token = getToken();
    if (!token) return;
    let active = true;
    getMemberDownloads(token)
      .then((d) => {
        if (!active) return;
        const item = d.items.find((i) => i.id === w.id);
        setDownloadUrl(item?.url ?? null);
      })
      .catch(() => {});
    return () => { active = false; };
  }, [hasAccess, w.id]);

  return (
    <div className="flex flex-col lg:flex-row min-h-[calc(100vh-56px)]">

      {/* ── Left ─────────────────────────────────────────────────────────── */}
      <div className="lg:w-[42%] flex flex-col justify-center px-8 lg:px-16 py-16 lg:py-12 lg:overflow-y-auto">

        {/* Breadcrumb */}
        <nav className="flex items-center flex-wrap gap-1.5 text-[10px] tracking-[0.14em] uppercase text-[#a09880] mb-10">
          <Link href="/" className="hover:text-[#1c1a18] transition-colors">Home</Link>
          <span>›</span>
          <Link href="/catalog" className="hover:text-[#1c1a18] transition-colors">Catalog</Link>
          <span>›</span>
          <span className="text-[#1c1a18]">{w.title}</span>
        </nav>

        {/* Title */}
        <h1 className="font-serif text-4xl lg:text-5xl xl:text-[3.5rem] font-bold leading-[1.08] tracking-tight mb-5">
          {w.title}
        </h1>

        {/* Accent line */}
        <div className="w-10 h-[2px] bg-[#1c1a18] mb-6" />

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-6">
            {tags.map((tag) => (
              <span
                key={tag}
                className="text-[9px] font-medium uppercase tracking-[0.2em] text-[#7a7060] bg-[#e6dbc8] px-2.5 py-1"
              >
                {tag.trim()}
              </span>
            ))}
          </div>
        )}

        {/* Description */}
        <div className="mb-8">
          <p className="text-[13px] leading-[1.85] text-[#5c5248] whitespace-pre-line">
            {expanded ? w.description : shortDesc}
          </p>
          {isLong && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="mt-1.5 text-[10px] uppercase tracking-widest text-[#a09880] hover:text-[#1c1a18] transition-colors"
            >
              {expanded ? "Show less" : "Read more ›"}
            </button>
          )}
        </div>

        {/* Access status */}
        <div className="mb-8 pb-8 border-b border-[#ddd5c4]">
          <p className="text-[11px] uppercase tracking-[0.2em] text-[#a09880] mb-1.5">
            Included with membership
          </p>
          <div className="flex items-baseline gap-2.5">
            <span className="font-serif text-[2.6rem] font-semibold leading-none tracking-tight">
              ${PRICING.monthly.amount}
            </span>
            <span className="text-xs text-[#a09880] mb-0.5">/mo · or ${PRICING.lifetime.amount} lifetime</span>
          </div>
          <p className="text-[11px] text-[#a09880] mt-1.5 flex items-center gap-1">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            Full-collection access · Instant download
            {packCount > 0 && <> · {packCount} wallpapers in this pack</>}
          </p>
        </div>

        {/* Access CTA */}
        <div className="space-y-2.5 max-w-[320px]">
          {loading ? (
            <div className="w-full py-4 bg-[#e6dbc8] animate-pulse" />
          ) : hasAccess ? (
            <>
              <a
                href={downloadUrl ?? undefined}
                aria-disabled={!downloadUrl}
                className={`w-full bg-[#1c1a18] hover:bg-[#0e0d0c] text-[#f0e8d8] py-4 text-[11px] tracking-[0.18em] uppercase font-medium transition-colors flex items-center justify-center gap-2 ${downloadUrl ? "" : "opacity-50 pointer-events-none"}`}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                {downloadUrl ? "Download" : "Preparing…"}
              </a>
              <Link
                href="/account"
                className="block text-center w-full border border-[#1c1a18] text-[#1c1a18] hover:bg-[#1c1a18] hover:text-[#f0e8d8] py-4 text-[11px] tracking-[0.18em] uppercase font-medium transition-all duration-200"
              >
                Download entire collection
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/pricing"
                className="block text-center w-full bg-[#1c1a18] hover:bg-[#0e0d0c] text-[#f0e8d8] py-4 text-[11px] tracking-[0.18em] uppercase font-medium transition-colors"
              >
                Get access
              </Link>
              {!user && (
                <Link
                  href="/login"
                  className="block text-center w-full border border-[#1c1a18] text-[#1c1a18] hover:bg-[#1c1a18] hover:text-[#f0e8d8] py-4 text-[11px] tracking-[0.18em] uppercase font-medium transition-all duration-200"
                >
                  Sign in
                </Link>
              )}
            </>
          )}
        </div>

        {/* Membership nudge */}
        <div className="mt-5 max-w-[320px] border-l-2 border-[#c4b8a8] pl-3.5 py-1">
          <p className="text-[11px] text-[#7a7060] leading-relaxed">
            <span className="font-semibold text-[#1c1a18]">One membership, everything:</span>{" "}
            every wallpaper on Outbbo, plus new drops — from ${PRICING.monthly.amount}/mo.
          </p>
        </div>

        {/* Trust */}
        <div className="mt-5 flex items-center gap-2 text-[10px] text-[#b0a898] tracking-wider">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0110 0v4" />
          </svg>
          Secure checkout · Powered by Stripe
        </div>
      </div>

      {/* ── Right: dark panel ────────────────────────────────────────────── */}
      <div className="lg:w-[58%] bg-[#0f0e0d] flex items-center justify-center py-20 lg:py-0 min-h-64 lg:min-h-0 relative overflow-hidden">
        {/* Ambient glow */}
        <div
          className="absolute inset-0 opacity-25 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 55% at 50% 42%, #7a6040 0%, transparent 70%)",
          }}
        />
        {/* Grain texture */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
            backgroundRepeat: "repeat",
            backgroundSize: "128px 128px",
          }}
        />
        <div className={`relative z-10 select-none ${w.type === 'mobile' ? 'w-[280px] sm:w-[320px] mx-auto' : 'w-[92%] max-w-[620px]'}`}>
          {w.type === 'mobile' ? (
            /* iPhone mockup */
            <div>
              <div className="relative bg-[#1a1a1a] rounded-[3rem] p-3 shadow-[0_16px_128px_rgba(0,0,0,0.15),0_1px_1px_rgba(0,0,0,0.1)]">
                {/* Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[100px] h-[28px] bg-[#1a1a1a] rounded-b-2xl z-10"></div>

                {/* Screen */}
                <div className="bg-white rounded-[2.5rem] overflow-hidden relative" style={{ height: '620px' }}>
                  {/* Status Bar */}
                  <div className="absolute top-0 left-0 right-0 h-11 flex items-end justify-between px-6 pb-1 z-20">
                    <span className="text-[9px] font-semibold text-[#1a1a1a]">9:41</span>
                    <div className="flex gap-1 items-center">
                      <div className="w-3 h-1.5 border border-[#1a1a1a] rounded-sm relative">
                        <div className="absolute inset-[1px] bg-[#1a1a1a] rounded-[1px]" style={{ width: '70%' }}></div>
                      </div>
                    </div>
                  </div>

                  {/* Wallpaper */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={coverUrl(w.id)}
                    alt={w.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Home Indicator */}
              <div className="flex justify-center mt-1.5">
                <div className="w-24 h-1 bg-white/30 rounded-full"></div>
              </div>
            </div>
          ) : (
            /* Monitor frame for desktop wallpapers */
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={framedCoverUrl(w.id, selectedImg)}
                alt={w.title}
                className="w-full h-auto block"
              />
            </>
          )}

          {/* Pack gallery */}
          {packCount > 0 && (
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {Array.from({ length: packCount }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImg(i)}
                  className={`w-16 h-10 overflow-hidden border transition-opacity ${
                    selectedImg === i
                      ? "border-[#f0e8d8] opacity-100"
                      : "border-transparent opacity-50 hover:opacity-80"
                  }`}
                  aria-label={`${w.title} — wallpaper ${i + 1}`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={packImageUrl(w.id, i)} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
