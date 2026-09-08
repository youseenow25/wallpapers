export default function ExamEscapeStrip() {
  return (
    <aside className="border-t border-[#ddd5c4] bg-[#e9e1d0] px-6 py-3">
      <div className="max-w-screen-xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-2 text-center">
        <span className="text-[9px] uppercase tracking-[0.2em] text-[#a09880]">
          Also from us
        </span>
        <span className="hidden sm:inline text-[#c4b8a8]">·</span>
        <p className="text-xs text-[#7a7060]">
          <a
            href="https://examescape.com"
            target="_blank"
            rel="noopener"
            className="font-medium text-[#1c1a18] hover:opacity-60 transition-opacity"
          >
            ExamEscape
          </a>
          {" — a study helper for Canvas."}{" "}
          <a
            href="https://examescape.com"
            target="_blank"
            rel="noopener"
            className="underline underline-offset-2 decoration-[#c4b8a8] hover:text-[#1c1a18] transition-colors whitespace-nowrap"
          >
            examescape.com
          </a>
        </p>
      </div>
    </aside>
  );
}
