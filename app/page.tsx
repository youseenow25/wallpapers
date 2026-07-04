import Link from "next/link";
import { getWallpapers } from "@/lib/api";
import ProductCard from "@/components/ProductCard";
import HeroMarquee from "@/components/HeroMarquee";

export default async function HomePage() {
  const wallpapers = await getWallpapers().catch(() => []);
  const featured = wallpapers.filter((w) => w.featured).slice(0, 4);
  const latest = wallpapers.filter((w) => !w.featured).slice(0, 4);

  return (
    <>
      {/* Marquee hero */}
      <HeroMarquee wallpapers={wallpapers} />

      {/* Featured */}
      {featured.length > 0 && (
        <section className="max-w-screen-xl mx-auto px-6 py-20">
          <div className="flex items-end justify-between mb-10">
            <h2 className="font-serif text-2xl font-semibold">Featured</h2>
            <Link
              href="/catalog"
              className="text-xs uppercase tracking-widest text-[#7a7060] hover:text-[#1c1a18] transition-colors"
            >
              View all <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{display:"inline",verticalAlign:"middle"}}><polyline points="9 18 15 12 9 6"/></svg>
            </Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.map((w) => (
              <ProductCard key={w.id} w={w} />
            ))}
          </div>
        </section>
      )}

      <div className="max-w-screen-xl mx-auto px-6">
        <hr className="border-[#ddd5c4]" />
      </div>

      {/* New Arrivals */}
      {latest.length > 0 && (
        <section className="max-w-screen-xl mx-auto px-6 py-20">
          <div className="flex items-end justify-between mb-10">
            <h2 className="font-serif text-2xl font-semibold">New Arrivals</h2>
            <Link
              href="/catalog"
              className="text-xs uppercase tracking-widest text-[#7a7060] hover:text-[#1c1a18] transition-colors"
            >
              View all <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{display:"inline",verticalAlign:"middle"}}><polyline points="9 18 15 12 9 6"/></svg>
            </Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {latest.map((w) => (
              <ProductCard key={w.id} w={w} />
            ))}
          </div>
        </section>
      )}

      {/* Footer */}
      <footer id="contact" className="border-t border-[#ddd5c4] px-6 py-10 mt-auto">
        <div className="max-w-screen-xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="outbbo" style={{ height: "22px", width: "auto", mixBlendMode: "multiply" }} />
          <p className="text-xs text-[#7a7060]">
            © {new Date().getFullYear()} Wallvault. All rights reserved.
          </p>
          <a
            href="mailto:admin@outbbo.com"
            className="text-xs text-[#7a7060] hover:text-[#1c1a18] transition-colors"
          >
            admin@outbbo.com
          </a>
        </div>
      </footer>
    </>
  );
}
