"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

interface Props {
  productUrl: string;
  title: string;
  tagline: string;
  description: string;
  bullets: string[];
}

export default function SeoRedirectPage({ productUrl, title, tagline, description, bullets }: Props) {
  const [seconds, setSeconds] = useState(3);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((s) => {
        if (s <= 1) {
          clearInterval(interval);
          window.location.href = productUrl;
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [productUrl]);

  return (
    <div className="min-h-screen bg-[#faf8f5] flex flex-col items-center justify-center px-6 py-20">
      <div className="max-w-xl w-full text-center">
        <p className="text-xs uppercase tracking-widest text-[#7a7060] mb-4">Outbbo — Premium Digital Wallpapers</p>
        <h1 className="font-serif text-4xl sm:text-5xl font-semibold text-[#1c1a18] mb-4 leading-tight">
          {title}
        </h1>
        <p className="text-lg text-[#7a7060] mb-6 leading-relaxed">{tagline}</p>
        <p className="text-sm text-[#4a4540] leading-relaxed mb-8">{description}</p>

        <ul className="text-left space-y-2 mb-10 inline-block">
          {bullets.map((b) => (
            <li key={b} className="flex items-start gap-2 text-sm text-[#4a4540]">
              <span className="mt-0.5 text-[#7a7060]">✦</span>
              {b}
            </li>
          ))}
        </ul>

        <div className="mb-6">
          <a
            href={productUrl}
            className="inline-block bg-[#1c1a18] text-[#faf8f5] text-sm uppercase tracking-widest px-8 py-4 hover:bg-[#3a3530] transition-colors"
          >
            Get This Wallpaper
          </a>
        </div>

        <p className="text-xs text-[#aaa090]">
          {seconds > 0
            ? `Redirecting in ${seconds}…`
            : "Redirecting…"}
          {" "}
          <a href={productUrl} className="underline hover:text-[#7a7060] transition-colors">
            Click here if not redirected.
          </a>
        </p>

        <div className="mt-12 pt-8 border-t border-[#ddd5c4]">
          <Link href="/" className="text-xs uppercase tracking-widest text-[#7a7060] hover:text-[#1c1a18] transition-colors">
            ← Browse all wallpapers
          </Link>
        </div>
      </div>
    </div>
  );
}
