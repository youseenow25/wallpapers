"use client";

import { Suspense, useEffect, useState, useRef } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useCart } from "@/components/CartContext";
import { verifyCheckoutSession } from "@/lib/api";

interface OrderDetails {
  orderId: number;
  email: string;
  total: number;
  discountApplied: number;
}

const Spinner = () => (
  <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
  </svg>
);

function LoadingScreen() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#f0e8d8] gap-4">
      <Spinner />
      <p className="text-[#7a7060] text-sm tracking-wide">Confirming your order…</p>
    </div>
  );
}

function ErrorScreen({ message }: { message: string }) {
  return (
    <div className="min-h-screen bg-[#f0e8d8] flex items-center justify-center px-6">
      <div className="w-full max-w-md text-center">
        {/* Icon */}
        <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-8">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="1.5">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        </div>

        <p className="text-[9px] uppercase tracking-[0.25em] text-[#a09880] mb-3">Payment Issue</p>
        <h1 className="font-serif text-3xl font-bold text-[#1c1a18] mb-3">Something went wrong</h1>
        <p className="text-sm text-[#7a7060] leading-relaxed mb-2 max-w-xs mx-auto">
          We couldn&apos;t confirm your order. No charge was made.
        </p>
        <p className="text-xs text-[#a09880] bg-[#e4d9c4] px-4 py-2 rounded mx-auto mb-10 max-w-sm font-mono break-all">
          {message}
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/catalog"
            className="border border-[#1c1a18] text-[#1c1a18] px-8 py-3 text-[11px] tracking-[0.18em] uppercase font-medium hover:bg-[#1c1a18] hover:text-[#f0e8d8] transition-colors"
          >
            Back to Catalog
          </Link>
          <Link
            href="/contact"
            className="bg-[#1c1a18] text-[#f0e8d8] px-8 py-3 text-[11px] tracking-[0.18em] uppercase font-medium hover:bg-black transition-colors"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
}

function SuccessContent() {
  const params = useSearchParams();
  const sessionId = params.get("session_id");
  const { clearCart } = useCart();
  const [order, setOrder] = useState<OrderDetails | null>(null);
  const [error, setError] = useState("");
  const verified = useRef(false);

  useEffect(() => {
    if (!sessionId || verified.current) return;
    verified.current = true;
    verifyCheckoutSession(sessionId)
      .then((data) => { setOrder(data); clearCart(); })
      .catch((err) => setError(err.message));
  }, [sessionId, clearCart]);

  if (error) return <ErrorScreen message={error} />;
  if (!order) return <LoadingScreen />;

  return (
    <div className="min-h-screen bg-[#f0e8d8]">
      {/* Top accent bar */}
      <div className="h-1 bg-gradient-to-r from-transparent via-[#1c1a18] to-transparent opacity-10" />

      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4px)] px-6 py-20">
        <div className="w-full max-w-lg">

          {/* Check mark */}
          <div className="flex justify-center mb-10">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-[#1c1a18] flex items-center justify-center">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#f0e8d8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              {/* Glow ring */}
              <div className="absolute inset-0 rounded-full border border-[#1c1a18] opacity-20 scale-125" />
            </div>
          </div>

          {/* Heading */}
          <div className="text-center mb-10">
            <p className="text-[9px] uppercase tracking-[0.28em] text-[#a09880] mb-3">
              Order Confirmed
            </p>
            <h1 className="font-serif text-4xl lg:text-5xl font-bold text-[#1c1a18] leading-tight mb-4">
              Thank you for your purchase.
            </h1>
            <p className="text-sm text-[#7a7060] leading-relaxed max-w-xs mx-auto">
              Your payment was successful.
            </p>
          </div>

          {/* Email notice card */}
          <div className="bg-[#1c1a18] text-[#f0e8d8] rounded-sm px-7 py-6 mb-6 flex gap-5 items-start">
            <div className="mt-0.5 flex-shrink-0">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium mb-1">Download link sent</p>
              <p className="text-xs text-[#c4b8a8] leading-relaxed">
                We sent your download link
                {order.email ? (
                  <> to <span className="text-[#f0e8d8] font-medium">{order.email}</span></>
                ) : (
                  " to the email you provided"
                )}
                . Links expire in 7 days.
              </p>
            </div>
          </div>

          {/* Order summary */}
          <div className="border border-[#ddd5c4] bg-white/30 rounded-sm divide-y divide-[#ddd5c4] mb-10 text-sm">
            <div className="flex justify-between px-6 py-3.5">
              <span className="text-[#7a7060]">Order</span>
              <span className="font-medium text-[#1c1a18]">#{order.orderId}</span>
            </div>
            {order.email && (
              <div className="flex justify-between px-6 py-3.5">
                <span className="text-[#7a7060]">Email</span>
                <span className="font-medium text-[#1c1a18] truncate max-w-[200px]">{order.email}</span>
              </div>
            )}
            {order.discountApplied > 0 && (
              <div className="flex justify-between px-6 py-3.5">
                <span className="text-green-700">Bundle discount</span>
                <span className="font-medium text-green-700">−${order.discountApplied.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between px-6 py-3.5 font-semibold">
              <span>Total paid</span>
              <span>${order.total.toFixed(2)}</span>
            </div>
          </div>

          {/* Spam note */}
          <p className="text-center text-xs text-[#a09880] mb-8 leading-relaxed">
            Can&apos;t find the email? Check your spam folder, or{" "}
            <Link href="/contact" className="underline underline-offset-2 hover:text-[#1c1a18] transition-colors">
              contact us
            </Link>{" "}
            and we&apos;ll resend it.
          </p>

          {/* CTA */}
          <div className="text-center">
            <Link
              href="/catalog"
              className="inline-block border border-[#1c1a18] text-[#1c1a18] px-10 py-3.5 text-[11px] tracking-[0.2em] uppercase font-medium hover:bg-[#1c1a18] hover:text-[#f0e8d8] transition-colors"
            >
              Continue Shopping
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <SuccessContent />
    </Suspense>
  );
}
