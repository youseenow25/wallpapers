"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthContext";
import { PRICING, startMembershipCheckout, getToken, type Plan } from "@/lib/api";

const PLANS: {
  plan: Plan;
  name: string;
  price: string;
  period: string;
  blurb: string;
  perks: string[];
  highlight?: boolean;
}[] = [
  {
    plan: "monthly",
    name: "Monthly",
    price: `$${PRICING.monthly.amount}`,
    period: "/month",
    blurb: "Access to all wallpapers, billed monthly.",
    perks: [
      "Access to every wallpaper in the collection",
      "Download any wallpaper, unlimited",
      "New wallpapers as they drop",
      "Cancel anytime",
    ],
  },
  {
    plan: "lifetime",
    name: "Lifetime",
    price: `$${PRICING.lifetime.amount}`,
    period: "one-time",
    blurb: "Pay once. Yours forever.",
    perks: [
      "Everything in Monthly",
      "One payment, lifetime access",
      "All future wallpapers included",
      "No recurring charges",
    ],
    highlight: true,
  },
];

export default function PricingPage() {
  const { user, hasAccess } = useAuth();
  const router = useRouter();
  const [loadingPlan, setLoadingPlan] = useState<Plan | null>(null);
  const [error, setError] = useState("");

  async function choose(plan: Plan) {
    setError("");
    if (!user) {
      router.push(`/signup?next=${encodeURIComponent("/pricing")}`);
      return;
    }
    if (hasAccess) {
      router.push("/account");
      return;
    }
    const token = getToken();
    if (!token) {
      router.push("/login?next=/pricing");
      return;
    }
    setLoadingPlan(plan);
    try {
      const { url } = await startMembershipCheckout(plan, token);
      window.location.assign(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Checkout failed");
      setLoadingPlan(null);
    }
  }

  return (
    <div className="max-w-screen-lg mx-auto px-6 py-20">
      <div className="text-center mb-14">
        <p className="text-[10px] uppercase tracking-[0.25em] text-[#a09880] mb-3">Membership</p>
        <h1 className="font-serif text-4xl lg:text-5xl font-bold mb-4">One membership. Every wallpaper.</h1>
        <p className="text-sm text-[#7a7060] max-w-md mx-auto">
          Unlock the entire Outbbo collection and every future drop. Choose the plan that fits.
        </p>
      </div>

      {hasAccess && (
        <div className="max-w-md mx-auto mb-10 text-center border border-[#c4b8a8] bg-[#e6dbc8]/50 px-5 py-4 text-sm text-[#5c5248]">
          You already have an active membership.{" "}
          <a href="/account" className="underline underline-offset-2">Go to your account →</a>
        </div>
      )}

      <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
        {PLANS.map((p) => (
          <div
            key={p.plan}
            className={`relative flex flex-col p-8 border ${
              p.highlight ? "border-[#1c1a18] bg-[#1c1a18] text-[#f0e8d8]" : "border-[#ddd5c4] bg-white/30"
            }`}
          >
            {p.highlight && (
              <span className="absolute -top-3 left-8 bg-[#f0c060] text-[#1c1a18] text-[10px] font-semibold uppercase tracking-widest px-3 py-1">
                Best value
              </span>
            )}
            <h2 className="font-serif text-2xl font-semibold mb-1">{p.name}</h2>
            <p className={`text-sm mb-6 ${p.highlight ? "text-[#c4b8a8]" : "text-[#7a7060]"}`}>{p.blurb}</p>
            <div className="flex items-baseline gap-1.5 mb-6">
              <span className="font-serif text-4xl font-bold">{p.price}</span>
              <span className={`text-sm ${p.highlight ? "text-[#a09880]" : "text-[#a09880]"}`}>{p.period}</span>
            </div>
            <ul className="space-y-2.5 mb-8 flex-1">
              {p.perks.map((perk) => (
                <li key={perk} className="flex items-start gap-2.5 text-sm">
                  <svg className="flex-shrink-0 mt-0.5" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={p.highlight ? "#f0c060" : "#1c1a18"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span className={p.highlight ? "text-[#e8e0d0]" : "text-[#5c5248]"}>{perk}</span>
                </li>
              ))}
            </ul>
            <button
              onClick={() => choose(p.plan)}
              disabled={loadingPlan !== null}
              className={`w-full py-3.5 text-[11px] tracking-[0.18em] uppercase font-medium transition-colors disabled:opacity-50 ${
                p.highlight
                  ? "bg-[#f0c060] text-[#1c1a18] hover:bg-[#f5d080]"
                  : "bg-[#1c1a18] text-[#f0e8d8] hover:bg-black"
              }`}
            >
              {loadingPlan === p.plan ? "Redirecting…" : hasAccess ? "Manage membership" : `Get ${p.name}`}
            </button>
          </div>
        ))}
      </div>

      {error && <p className="text-center text-sm text-red-600 mt-8">{error}</p>}

      <p className="text-center text-xs text-[#a09880] mt-12 flex items-center justify-center gap-1.5">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0110 0v4" />
        </svg>
        Secure checkout powered by Stripe
      </p>
    </div>
  );
}
