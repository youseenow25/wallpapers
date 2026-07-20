"use client";

import { useState } from "react";
import { createAllBundleSession } from "@/lib/api";

/**
 * Compact "get every wallpaper" upsell, sized to live inside the product
 * page's buy column (max-w-[320px]) instead of a full-width banner at the
 * bottom of the page. The general full-width banner lives in BundleBanner.
 */
export default function BundleUpsellCard({
  wallpaperCount,
  totalValue,
}: {
  wallpaperCount: number;
  totalValue: number;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleClick() {
    setError("");
    setLoading(true);
    try {
      const { url } = await createAllBundleSession();
      window.location.href = url;
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setLoading(false);
    }
  }

  const savings = Math.round(totalValue - 24.99);

  return (
    <div className="mt-6 max-w-[320px] bg-[#1c1a18] text-[#f0e8d8] p-4">
      <p className="text-[9px] uppercase tracking-[0.2em] text-[#f0c060] mb-1.5">
        Best value · Limited offer
      </p>
      <p className="font-serif text-lg font-semibold leading-tight mb-1">
        Get all {wallpaperCount} wallpapers
      </p>
      <p className="text-[11px] text-[#c4b8a8] leading-relaxed mb-3.5">
        One purchase — download anytime, keep forever.
        {savings > 0 && (
          <> Save <span className="text-[#f0e8d8] font-medium">${savings}+</span> vs. buying individually.</>
        )}
      </p>

      <div className="flex items-center justify-between gap-3">
        <div className="flex items-baseline gap-1.5">
          <span className="font-serif text-2xl font-bold">$24.99</span>
          {savings > 0 && (
            <span className="text-[10px] text-[#a09880] line-through">
              ${totalValue.toFixed(2)}
            </span>
          )}
        </div>
        <button
          onClick={handleClick}
          disabled={loading}
          className="bg-[#f0c060] text-[#1c1a18] px-4 py-2.5 text-[11px] font-semibold uppercase tracking-wide hover:bg-[#f5d080] transition-colors disabled:opacity-60 flex items-center gap-1.5 whitespace-nowrap"
        >
          {loading ? (
            <>
              <svg className="animate-spin w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
              </svg>
              Redirecting…
            </>
          ) : (
            <>
              Get all
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </>
          )}
        </button>
      </div>
      {error && <p className="text-[10px] text-red-400 mt-2">{error}</p>}
    </div>
  );
}
