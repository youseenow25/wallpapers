import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact — WALLVAULT",
  description: "Get in touch with the Wallvault team.",
};

export default function ContactPage() {
  return (
    <div className="min-h-[calc(100vh-56px)] flex flex-col">
      <div className="flex-1 max-w-screen-sm mx-auto w-full px-6 py-24">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-[10px] tracking-[0.14em] uppercase text-[#a09880] mb-12">
          <Link href="/" className="hover:text-[#1c1a18] transition-colors">Home</Link>
          <span>›</span>
          <span className="text-[#1c1a18]">Contact</span>
        </nav>

        {/* Header */}
        <h1 className="font-serif text-4xl lg:text-5xl font-bold leading-tight mb-4">
          Get in Touch
        </h1>
        <div className="w-10 h-[2px] bg-[#1c1a18] mb-8" />
        <p className="text-[#7a7060] text-sm leading-relaxed mb-16 max-w-sm">
          Have a question about an order, a licensing inquiry, or just want to say hello? We&apos;re happy to hear from you.
        </p>

        {/* Contact card */}
        <div className="border border-[#ddd5c4] p-8 mb-8">
          <p className="text-[9px] uppercase tracking-[0.2em] text-[#a09880] mb-4">Email us at</p>
          <a
            href="mailto:admin@outbbo.com"
            className="font-serif text-2xl lg:text-3xl font-semibold text-[#1c1a18] hover:opacity-60 transition-opacity break-all"
          >
            admin@outbbo.com
          </a>
          <p className="text-xs text-[#a09880] mt-4 leading-relaxed">
            We typically reply within 24 hours on business days.
          </p>
        </div>

        {/* Topics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-px border border-[#ddd5c4]">
          {[
            { label: "Orders & Downloads", desc: "Issues accessing your files after purchase" },
            { label: "Licensing", desc: "Commercial use and extended license inquiries" },
            { label: "General", desc: "Everything else — feedback, partnerships, hello" },
          ].map((item) => (
            <div key={item.label} className="p-6 border-b sm:border-b-0 sm:border-r border-[#ddd5c4] last:border-0">
              <p className="text-[10px] uppercase tracking-[0.16em] font-medium mb-2">{item.label}</p>
              <p className="text-xs text-[#7a7060] leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

      </div>

      {/* Footer */}
      <footer className="border-t border-[#ddd5c4] px-6 py-10">
        <div className="max-w-screen-xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="outbbo" style={{ height: "22px", width: "auto", mixBlendMode: "multiply" }} />
          <p className="text-xs text-[#7a7060]">© {new Date().getFullYear()} outbbo. All rights reserved.</p>
          <a href="mailto:admin@outbbo.com" className="text-xs text-[#7a7060] hover:text-[#1c1a18] transition-colors">
            admin@outbbo.com
          </a>
        </div>
      </footer>
    </div>
  );
}
