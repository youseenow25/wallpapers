"use client";

import Link from "next/link";
import { useAuth } from "./AuthContext";

export default function Nav() {
  const { user, hasAccess } = useAuth();

  return (
    <header className="fixed top-0 left-0 right-0 z-30 bg-[#f0e8d8] border-b border-[#ddd5c4]">
      <nav className="max-w-screen-xl mx-auto px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <button className="lg:hidden p-1">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
          <div className="hidden lg:flex items-center gap-6">
            <Link href="/" className="nav-link">Home</Link>
            <Link href="/catalog" className="nav-link">Catalog</Link>
            <Link href="/pricing" className="nav-link">Pricing</Link>
            <Link href="/contact" className="nav-link">Contact</Link>
          </div>
        </div>

        <Link href="/" className="absolute left-1/2 -translate-x-1/2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo.png"
            alt="outbbo"
            style={{ width: "180px", height: "auto", mixBlendMode: "multiply" }}
          />
        </Link>

        <div className="flex items-center gap-4">
          {user ? (
            <Link
              href="/account"
              className="flex items-center gap-1.5 text-xs tracking-widest uppercase hover:opacity-60 transition-opacity"
            >
              Account
              {hasAccess && (
                <span className="w-1.5 h-1.5 bg-[#1c9d5b] rounded-full" aria-label="Active membership" />
              )}
            </Link>
          ) : (
            <>
              <Link
                href="/login"
                className="hidden sm:block text-xs tracking-widest uppercase hover:opacity-60 transition-opacity"
              >
                Sign in
              </Link>
              <Link
                href="/pricing"
                className="bg-[#1c1a18] text-[#f0e8d8] px-4 py-2 text-[11px] tracking-widest uppercase hover:bg-black transition-colors"
              >
                Join
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
