import { examEscapeUrl } from "@/lib/examescape";

export default function ExamEscapeBar() {
  return (
    <a
      href={examEscapeUrl("top-bar")}
      target="_blank"
      rel="noopener"
      className="group block bg-[#f0c060] text-[#1c1a18] hover:bg-[#f5d080] transition-colors"
    >
      <div className="max-w-screen-xl mx-auto px-6 h-9 flex items-center justify-center gap-2 overflow-hidden">
        <span className="hidden sm:inline text-[9px] font-semibold uppercase tracking-[0.2em] bg-[#1c1a18] text-[#f0c060] px-2 py-0.5 shrink-0">
          New
        </span>
        <p className="text-[11px] sm:text-xs font-medium truncate">
          <span className="hidden sm:inline">Sponsored: </span>
          <span className="font-semibold">Bypass Lockdown Broser, HonorLock, Safe Exam Browser</span>
        
          <span className="sm:hidden">Do you want ChatGPT inside protected exam? ExamEscape allows you to use ChatGPT inside the protected exam software</span>
        </p>
        <span className="flex items-center gap-1 text-[11px] sm:text-xs font-semibold underline underline-offset-2 whitespace-nowrap shrink-0">
          Check it out
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="group-hover:translate-x-0.5 transition-transform"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </span>
      </div>
    </a>
  );
}
