import { examEscapeUrl } from "@/lib/examescape";

const ArrowOut = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 17 17 7M9 7h8v8" />
  </svg>
);

/** Full-bleed gold block. Highest prominence — used at the top of the home page. */
function Hero() {
  return (
    <section className="bg-[#f0c060] text-[#1c1a18]">
      <div className="max-w-screen-xl mx-auto px-6 py-12 sm:py-16 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
        <div className="max-w-2xl">
          <p className="text-[10px] uppercase tracking-[0.24em] font-semibold mb-3 flex items-center gap-2">
            <span className="bg-[#1c1a18] text-[#f0c060] px-2 py-0.5">New</span>
            Also from Outbbo
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-[3.5rem] font-bold leading-[1.05] tracking-tight mb-4">
            ExamEscape, your study
            <br className="hidden sm:block" /> helper for Canvas.
          </h2>
          <p className="text-sm sm:text-base leading-relaxed max-w-lg text-[#4a3f28]">
            If you use Canvas for coursework, ExamEscape is built to make
            studying faster and a lot less painful.
          </p>
        </div>

        <div className="w-full lg:w-auto flex flex-col items-stretch lg:items-end gap-2 shrink-0">
          <a
            href={examEscapeUrl("home-hero")}
            target="_blank"
            rel="noopener"
            className="w-full lg:w-auto justify-center bg-[#1c1a18] text-[#f0e8d8] px-10 py-4 text-sm font-semibold tracking-wide hover:bg-black transition-colors flex items-center gap-2 whitespace-nowrap"
          >
            Try ExamEscape
            <ArrowOut />
          </a>
          <p className="text-[10px] text-[#7a6438] text-center lg:text-right">
            examescape.com · opens in a new tab
          </p>
        </div>
      </div>
    </section>
  );
}

/** Dark horizontal banner. Used near the top of the catalog. */
function Banner() {
  return (
    <a
      href={examEscapeUrl("catalog-banner")}
      target="_blank"
      rel="noopener"
      className="group block bg-[#1c1a18] text-[#f0e8d8] hover:bg-[#0e0d0c] transition-colors mb-10"
    >
      <div className="px-6 sm:px-8 py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
        <div>
          <p className="text-[10px] uppercase tracking-[0.22em] text-[#f0c060] font-semibold mb-2">
            Also from Outbbo
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl font-semibold leading-tight mb-1.5">
            ExamEscape, a study helper for Canvas.
          </h2>
          <p className="text-xs sm:text-sm text-[#c4b8a8]">
            Built by the team behind these wallpapers. Free to try.
          </p>
        </div>
        <span className="w-full sm:w-auto justify-center bg-[#f0c060] text-[#1c1a18] px-7 py-3 text-sm font-semibold tracking-wide group-hover:bg-[#f5d080] transition-colors flex items-center gap-2 whitespace-nowrap shrink-0">
          Visit ExamEscape
          <ArrowOut />
        </span>
      </div>
    </a>
  );
}

/** Compact bordered card. Used in the wallpaper detail column. */
function Card() {
  return (
    <a
      href={examEscapeUrl("product-card")}
      target="_blank"
      rel="noopener"
      className="group block border-2 border-[#1c1a18] bg-[#f0c060] text-[#1c1a18] p-5 hover:bg-[#f5d080] transition-colors max-w-[340px]"
    >
      <p className="text-[9px] uppercase tracking-[0.22em] font-bold mb-2">
        Also from Outbbo
      </p>
      <h2 className="font-serif text-xl font-bold leading-tight mb-1.5">
        ExamEscape, a study helper for Canvas.
      </h2>
      <p className="text-[11px] text-[#4a3f28] leading-relaxed mb-3">
        Studying while you decorate your desktop? We built this too.
      </p>
      <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.16em] border-b-2 border-[#1c1a18] pb-0.5">
        Visit examescape.com
        <span className="group-hover:translate-x-0.5 transition-transform">
          <ArrowOut size={12} />
        </span>
      </span>
    </a>
  );
}

export default function ExamEscapePromo({
  variant = "hero",
}: {
  variant?: "hero" | "banner" | "card";
}) {
  if (variant === "banner") return <Banner />;
  if (variant === "card") return <Card />;
  return <Hero />;
}
