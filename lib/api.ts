import type { Wallpaper } from "./types";

const API =
  process.env.NEXT_PUBLIC_API_URL ||
  (typeof window === "undefined" ? "http://localhost:4000" : "");

export function coverUrl(id: number | string): string {
  return `${API}/api/covers/${id}`;
}

export async function getWallpapers(): Promise<Wallpaper[]> {
  const res = await fetch(`${API}/api/wallpapers`, { next: { revalidate: 60 } });
  if (!res.ok) throw new Error("Failed to fetch wallpapers");
  return res.json();
}

export async function getWallpaper(id: number | string): Promise<Wallpaper> {
  const res = await fetch(`${API}/api/wallpapers/${id}`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error("Wallpaper not found");
  return res.json();
}

export async function createCheckoutSession(
  items: { id: number; quantity: number }[],
  email?: string,
): Promise<{ url: string; discountPercent: number }> {
  const res = await fetch(`${API}/api/checkout/session`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ items, email }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || "Checkout failed");
  }
  return res.json();
}

export async function verifyCheckoutSession(
  sessionId: string,
): Promise<{ orderId: number; email: string; total: number; discountApplied: number }> {
  const res = await fetch(`${API}/api/checkout/verify/${sessionId}`);
  if (!res.ok) throw new Error("Payment verification failed");
  return res.json();
}
