export default function ExamEscapePromo() {
  return (
    <section className="max-w-screen-xl mx-auto px-6 py-16">
      <div className="border border-[#ddd5c4] bg-[#e9e1d0] p-8 sm:p-12 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
        <div className="max-w-xl">
          <p className="text-[10px] uppercase tracking-[0.2em] text-[#a09880] mb-3">
            Also from Outbbo
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold leading-tight mb-4">
            ExamEscape — a study helper for
            <span className="text-[#b8912f]"> Canvas</span>.
          </h2>
          <p className="text-sm text-[#7a7060] leading-relaxed">
            Built by the same team behind Outbbo. If you use Canvas for
            coursework, ExamEscape is made to make studying less painful.
          </p>
        </div>

        <div className="w-full lg:w-auto flex flex-col items-stretch lg:items-end gap-2 shrink-0">
          <a
            href="https://examescape.com"
            target="_blank"
            rel="noopener"
            className="w-full lg:w-auto justify-center bg-[#1c1a18] text-[#f0e8d8] px-8 py-3.5 text-sm font-semibold tracking-wide hover:bg-black transition-colors flex items-center gap-2 whitespace-nowrap"
          >
            Visit ExamEscape
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 17 17 7M9 7h8v8" />
            </svg>
          </a>
          <p className="text-[10px] text-[#a09880] text-center lg:text-right">
            examescape.com · opens in a new tab
          </p>
        </div>
      </div>
    </section>
  );
}
