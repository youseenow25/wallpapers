"use client";

import { Suspense, useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useAuth } from "@/components/AuthContext";
import { getMemberDownloads, verifyMembership, getToken, PRICING } from "@/lib/api";
import type { MemberDownloads } from "@/lib/types";

function AccountContent() {
  const { user, loading, hasAccess, logout, refresh } = useAuth();
  const params = useSearchParams();
  const sessionId = params.get("session_id");
  const [verifying, setVerifying] = useState(!!sessionId);
  const [downloads, setDownloads] = useState<MemberDownloads | null>(null);
  const verified = useRef(false);

  // On return from Stripe, confirm the checkout so access applies immediately.
  useEffect(() => {
    if (!sessionId || verified.current) return;
    const token = getToken();
    if (!token) return;
    verified.current = true;
    verifyMembership(sessionId, token)
      .then(() => refresh())
      .catch(() => {})
      .finally(() => setVerifying(false));
  }, [sessionId, refresh]);

  // Load the member download list once access is confirmed.
  useEffect(() => {
    if (!hasAccess) return;
    const token = getToken();
    if (!token) return;
    getMemberDownloads(token).then(setDownloads).catch(() => {});
  }, [hasAccess]);

  if (loading || verifying) {
    return (
      <div className="min-h-[calc(100vh-56px)] flex flex-col items-center justify-center gap-4">
        <svg className="animate-spin w-5 h-5 text-[#7a7060]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
        </svg>
        <p className="text-sm text-[#7a7060]">{verifying ? "Confirming your membership…" : "Loading…"}</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-[calc(100vh-56px)] flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="font-serif text-3xl font-bold mb-3">You&apos;re signed out</h1>
          <p className="text-sm text-[#7a7060] mb-8">Sign in to view your membership and downloads.</p>
          <Link href="/login" className="inline-block bg-[#1c1a18] text-[#f0e8d8] px-8 py-3.5 text-[11px] tracking-[0.18em] uppercase font-medium hover:bg-black transition-colors">
            Sign in
          </Link>
        </div>
      </div>
    );
  }

  const planLabel = user.plan === "lifetime" ? "Lifetime" : user.plan === "monthly" ? "Monthly" : "None";

  return (
    <div className="max-w-screen-md mx-auto px-6 py-16">
      <div className="flex items-start justify-between mb-10">
        <div>
          <h1 className="font-serif text-4xl font-bold mb-1">Account</h1>
          <p className="text-sm text-[#7a7060]">{user.email}</p>
        </div>
        <button onClick={logout} className="text-[11px] uppercase tracking-widest text-[#a09880] hover:text-[#1c1a18] transition-colors">
          Sign out
        </button>
      </div>

      {/* Membership status */}
      <div className="border border-[#ddd5c4] bg-white/30 p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <p className="text-[10px] uppercase tracking-[0.2em] text-[#a09880]">Membership</p>
          <span className={`text-[10px] uppercase tracking-widest px-2.5 py-1 ${hasAccess ? "bg-[#1c9d5b] text-white" : "bg-[#e6dbc8] text-[#7a7060]"}`}>
            {hasAccess ? "Active" : "Inactive"}
          </span>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="font-serif text-2xl font-semibold">{planLabel}</span>
          {user.plan === "monthly" && user.currentPeriodEnd && (
            <span className="text-xs text-[#a09880]">renews {new Date(user.currentPeriodEnd).toLocaleDateString()}</span>
          )}
        </div>

        {!hasAccess && (
          <div className="mt-5">
            <p className="text-sm text-[#7a7060] mb-4">
              You don&apos;t have an active membership yet. Unlock the full collection for ${PRICING.monthly.amount}/mo or ${PRICING.lifetime.amount} lifetime.
            </p>
            <Link href="/pricing" className="inline-block bg-[#1c1a18] text-[#f0e8d8] px-6 py-3 text-[11px] tracking-[0.18em] uppercase font-medium hover:bg-black transition-colors">
              View membership
            </Link>
          </div>
        )}
      </div>

      {/* Downloads */}
      {hasAccess && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-serif text-2xl font-semibold">Your collection</h2>
            {downloads?.downloadAllUrl && (
              <a href={downloads.downloadAllUrl} className="bg-[#1c1a18] text-[#f0e8d8] px-5 py-2.5 text-[11px] tracking-[0.18em] uppercase font-medium hover:bg-black transition-colors">
                Download all
              </a>
            )}
          </div>
          {!downloads ? (
            <p className="text-sm text-[#7a7060]">Loading your downloads…</p>
          ) : (
            <div className="border border-[#ddd5c4] bg-white/30 divide-y divide-[#ddd5c4]">
              {downloads.items.map((d) => (
                <div key={d.id} className="flex items-center justify-between gap-4 px-5 py-3.5">
                  <span className="text-sm font-medium text-[#1c1a18] truncate">{d.title}</span>
                  <a href={d.url} className="flex-shrink-0 text-[11px] tracking-widest uppercase text-[#1c1a18] hover:opacity-60 transition-opacity">
                    Download
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function AccountPage() {
  return (
    <Suspense>
      <AccountContent />
    </Suspense>
  );
}
