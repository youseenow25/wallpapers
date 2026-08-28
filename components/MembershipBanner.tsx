import Link from "next/link";
import { PRICING } from "@/lib/api";

export default function MembershipBanner({ wallpaperCount }: { wallpaperCount?: number }) {
  return (
    <section className="bg-[#1c1a18] text-[#f0e8d8]">
      <div className="max-w-screen-xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
        {/* Copy */}
        <div className="text-center sm:text-left">
          <p className="text-xs uppercase tracking-[0.2em] text-[#a09880] mb-0.5">
            Membership
          </p>
          <h2 className="font-serif text-xl sm:text-2xl font-semibold leading-tight mb-1">
            Unlock the entire collection.
            {wallpaperCount ? (
              <span className="text-[#f0c060]"> All {wallpaperCount} wallpapers, one membership.</span>
            ) : (
              <span className="text-[#f0c060]"> Every wallpaper, one membership.</span>
            )}
          </h2>
          <p className="text-xs text-[#c4b8a8]">
            <span className="text-[#f0e8d8] font-medium">${PRICING.monthly.amount}/mo</span> unlocks every wallpaper,
            or <span className="text-[#f0e8d8] font-medium">${PRICING.lifetime.amount}</span> once for lifetime access to all.
          </p>
        </div>

        {/* CTA */}
        <div className="w-full sm:w-auto flex flex-col items-stretch sm:items-center gap-1.5 shrink-0">
          <Link
            href="/pricing"
            className="w-full sm:w-auto justify-center bg-[#f0c060] text-[#1c1a18] px-6 py-3 sm:py-2.5 text-sm font-semibold tracking-wide hover:bg-[#f5d080] transition-colors flex items-center gap-2 whitespace-nowrap"
          >
            View membership
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </Link>
          <p className="text-[10px] text-[#7a6a50] text-center">Cancel anytime · Instant access</p>
        </div>
      </div>
    </section>
  );
}
