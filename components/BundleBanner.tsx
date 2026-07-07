"use client";

import { useState } from "react";
import { createAllBundleSession } from "@/lib/api";

export default function BundleBanner({
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
    <section className="bg-[#1c1a18] text-[#f0e8d8]">
      <div className="max-w-screen-xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Copy */}
        <div className="text-center sm:text-left">
          <p className="text-xs uppercase tracking-[0.2em] text-[#a09880] mb-1">
            Limited offer
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl font-semibold leading-tight mb-2">
            Get every wallpaper.<br />
            <span className="text-[#f0c060]">All {wallpaperCount} titles, $24.99.</span>
          </h2>
          <p className="text-sm text-[#c4b8a8] max-w-sm">
            The complete collection in one purchase — download anytime, keep forever.
            {savings > 0 && (
              <> Save <span className="text-[#f0e8d8] font-medium">${savings}+</span> vs. buying individually.</>
            )}
          </p>
        </div>

        {/* CTA */}
        <div className="flex flex-col items-center gap-2 shrink-0">
          <div className="text-center">
            <span className="text-3xl font-serif font-bold">$24.99</span>
            {savings > 0 && (
              <p className="text-xs text-[#a09880] mt-0.5">
                <span className="line-through">${totalValue.toFixed(2)}</span> retail value
              </p>
            )}
          </div>
          {error && <p className="text-xs text-red-400">{error}</p>}
          <button
            onClick={handleClick}
            disabled={loading}
            className="bg-[#f0c060] text-[#1c1a18] px-8 py-3.5 text-sm font-semibold tracking-wide hover:bg-[#f5d080] transition-colors disabled:opacity-60 flex items-center gap-2 whitespace-nowrap"
          >
            {loading ? (
              <>
                <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                </svg>
                Redirecting…
              </>
            ) : (
              <>
                Get Everything
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </>
            )}
          </button>
          <p className="text-[10px] text-[#7a6a50] text-center">Secure checkout · Instant download</p>
        </div>
      </div>
    </section>
  );
}
