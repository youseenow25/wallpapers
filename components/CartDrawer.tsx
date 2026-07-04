"use client";

import { useState } from "react";
import { useCart } from "./CartContext";
import { createCheckoutSession } from "@/lib/api";

const DISCOUNT_TIERS = [
  { minItems: 5, percent: 50, label: "5+ items" },
  { minItems: 3, percent: 40, label: "3+ items" },
  { minItems: 2, percent: 30, label: "2+ items" },
];

function getDiscount(totalItems: number) {
  return DISCOUNT_TIERS.find((d) => totalItems >= d.minItems) || null;
}

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, total, count } =
    useCart();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const discount = getDiscount(count);
  const discountAmount = discount ? total * (discount.percent / 100) : 0;
  const finalTotal = total - discountAmount;

  async function handleStripeCheckout(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { url } = await createCheckoutSession(
        items.map((i) => ({ id: i.wallpaper.id, quantity: i.quantity })),
        email || undefined,
      );
      window.location.href = url;
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Checkout failed");
      setLoading(false);
    }
  }

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 backdrop-blur-sm"
          onClick={closeCart}
        />
      )}

      <aside
        className={`fixed top-0 right-0 h-full w-full max-w-sm bg-[#f0e8d8] z-50 flex flex-col shadow-2xl transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#ddd5c4]">
          <span className="text-sm tracking-widest uppercase font-medium">
            Your Cart ({count})
          </span>
          <button
            onClick={closeCart}
            className="p-1 hover:opacity-60 transition-opacity"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Discount banner */}
        {count > 0 && (
          <div className="px-6 py-2.5 bg-[#1c1a18] text-[#f0e8d8]">
            {discount ? (
              <p className="text-xs text-center">
                <span className="font-semibold">{discount.percent}% bundle discount</span> applied
                {count < 5 && (
                  <span className="text-[#c4b8a8]">
                    {" "}— add {5 - count} more for 20% off
                  </span>
                )}
              </p>
            ) : (
              <p className="text-xs text-center text-[#c4b8a8]">
                Buy 2+ wallpapers and save 10–20%
              </p>
            )}
          </div>
        )}

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-3 text-center">
              <svg
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                className="opacity-30"
              >
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 001.97-1.67L23 6H6" />
              </svg>
              <p className="text-sm text-[#7a7060]">Your cart is empty</p>
            </div>
          ) : (
            <ul className="space-y-4">
              {items.map((item) => (
                <li key={item.wallpaper.id} className="flex gap-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.wallpaper.cover_image}
                    alt={item.wallpaper.title}
                    className="w-16 h-12 object-cover rounded"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">
                      {item.wallpaper.title}
                    </p>
                    <p className="text-xs text-[#7a7060]">
                      ${Number(item.wallpaper.price).toFixed(2)} each
                    </p>
                    <div className="flex items-center gap-3 mt-1.5">
                      <div className="flex items-center border border-[#ddd5c4] text-sm">
                        <button
                          onClick={() =>
                            item.quantity > 1
                              ? updateQuantity(item.wallpaper.id, item.quantity - 1)
                              : removeItem(item.wallpaper.id)
                          }
                          className="px-2 py-0.5 hover:bg-[#e4d9c4]"
                        >
                          −
                        </button>
                        <span className="px-3 py-0.5 border-x border-[#ddd5c4]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.wallpaper.id, item.quantity + 1)
                          }
                          className="px-2 py-0.5 hover:bg-[#e4d9c4]"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.wallpaper.id)}
                        className="text-xs text-[#7a7060] underline underline-offset-2 hover:text-[#1c1a18]"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  <p className="text-sm font-medium whitespace-nowrap">
                    ${(Number(item.wallpaper.price) * item.quantity).toFixed(2)}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-[#ddd5c4] px-6 py-5 space-y-3">
            {/* Price breakdown */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-sm">
                <span className="text-[#7a7060]">Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              {discount && (
                <div className="flex justify-between text-sm text-green-700">
                  <span>Bundle discount ({discount.percent}%)</span>
                  <span>−${discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-sm font-semibold border-t border-[#ddd5c4] pt-1.5">
                <span>Total</span>
                <span>${finalTotal.toFixed(2)}</span>
              </div>
              <p className="text-xs text-[#7a7060]">Tax included. Billed in USD.</p>
            </div>

            {/* Checkout form */}
            <form onSubmit={handleStripeCheckout} className="space-y-2.5">
              <input
                type="email"
                placeholder="Email for receipt (optional)"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-[#ddd5c4] bg-transparent px-3 py-2 text-sm outline-none focus:border-[#7a7060] placeholder:text-[#7a7060]"
              />
              {error && <p className="text-xs text-red-600">{error}</p>}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#1c1a18] text-[#f0e8d8] py-3.5 text-sm tracking-wide hover:bg-black transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                    </svg>
                    Redirecting to Stripe…
                  </>
                ) : (
                  <>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
                      <line x1="1" y1="10" x2="23" y2="10" />
                    </svg>
                    Checkout with Stripe
                    {discount && (
                      <span className="ml-1 text-xs bg-white/20 px-1.5 py-0.5 rounded">
                        {discount.percent}% off
                      </span>
                    )}
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={closeCart}
                className="w-full text-center text-xs text-[#7a7060] underline underline-offset-2 hover:text-[#1c1a18]"
              >
                Continue shopping
              </button>
            </form>
          </div>
        )}
      </aside>
    </>
  );
}
