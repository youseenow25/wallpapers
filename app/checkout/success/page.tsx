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
      .then((data) => {
        setOrder(data);
        clearCart();
      })
      .catch((err) => setError(err.message));
  }, [sessionId, clearCart]);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] px-6 text-center">
        <p className="text-red-600 mb-4">{error}</p>
        <Link href="/" className="text-xs underline underline-offset-2">
          Return home
        </Link>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="flex items-center justify-center min-h-[80vh]">
        <div className="flex items-center gap-2 text-[#7a7060] text-sm">
          <svg
            className="animate-spin w-4 h-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
          </svg>
          Confirming your order…
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-6 text-center">
      <div className="w-16 h-16 rounded-full bg-[#c4b8a8] flex items-center justify-center mb-8">
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>

      <h1 className="font-serif text-4xl font-bold mb-3">Order Confirmed</h1>
      <p className="text-[#7a7060] text-sm mb-8 max-w-sm">
        Thank you! Check your email for the download link.
      </p>

      <div className="border border-[#ddd5c4] px-8 py-6 mb-10 space-y-2 min-w-64 text-sm">
        <div className="flex justify-between gap-8">
          <span className="text-[#7a7060]">Order #</span>
          <span className="font-medium">{order.orderId}</span>
        </div>
        {order.email && (
          <div className="flex justify-between gap-8">
            <span className="text-[#7a7060]">Email</span>
            <span className="font-medium truncate max-w-[180px]">{order.email}</span>
          </div>
        )}
        {order.discountApplied > 0 && (
          <div className="flex justify-between gap-8 text-green-700">
            <span>Discount saved</span>
            <span className="font-medium">−${order.discountApplied.toFixed(2)}</span>
          </div>
        )}
        <div className="flex justify-between gap-8 border-t border-[#ddd5c4] pt-2 font-semibold">
          <span>Total paid</span>
          <span>${order.total.toFixed(2)}</span>
        </div>
      </div>

      <Link
        href="/catalog"
        className="inline-block border border-[#1c1a18] px-8 py-3 text-xs tracking-widest uppercase hover:bg-[#1c1a18] hover:text-[#f0e8d8] transition-colors"
      >
        Continue Shopping
      </Link>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-[80vh]">
          <div className="flex items-center gap-2 text-[#7a7060] text-sm">
            <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
            </svg>
            Loading…
          </div>
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
