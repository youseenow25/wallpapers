import type { Wallpaper, User, MemberDownloads } from "./types";

const API =
  process.env.NEXT_PUBLIC_API_URL ||
  (typeof window === "undefined" ? "http://localhost:4000" : "");

const CDN = "https://d2e5alblmbpd9l.cloudfront.net";

export function coverUrl(id: number | string): string {
  return `${CDN}/framed/${id}.jpg`;
}

export function framedCoverUrl(id: number | string, imgIdx?: number): string {
  return imgIdx === undefined
    ? `${API}/api/covers/${id}/framed`
    : `${API}/api/covers/${id}/framed?img=${imgIdx}`;
}

export function framedMobileCoverUrl(id: number | string, imgIdx?: number): string {
  return imgIdx === undefined
    ? `${API}/api/covers/${id}/framed-mobile`
    : `${API}/api/covers/${id}/framed-mobile?img=${imgIdx}`;
}

export function packImageUrl(id: number | string, idx: number): string {
  return `${API}/api/covers/${id}/img/${idx}`;
}

export async function getWallpapers(type?: string): Promise<Wallpaper[]> {
  const url = new URL(`${API}/api/wallpapers`);
  if (type) url.searchParams.append('type', type);
  const res = await fetch(url.toString(), { next: { revalidate: 3600 } });
  if (!res.ok) throw new Error("Failed to fetch wallpapers");
  return res.json();
}

export async function getWallpaper(id: number | string): Promise<Wallpaper> {
  const res = await fetch(`${API}/api/wallpapers/${id}`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error("Wallpaper not found");
  return res.json();
}

// ── Membership pricing ────────────────────────────────────────────────────────

export const PRICING = {
  monthly: { amount: 4.99, label: "Monthly", period: "/mo" },
  lifetime: { amount: 24.99, label: "Lifetime", period: "one-time" },
} as const;

export type Plan = "monthly" | "lifetime";

// ── Auth token storage ────────────────────────────────────────────────────────

const TOKEN_KEY = "wv-token";

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}
export function setToken(token: string) {
  if (typeof window !== "undefined") localStorage.setItem(TOKEN_KEY, token);
}
export function clearToken() {
  if (typeof window !== "undefined") localStorage.removeItem(TOKEN_KEY);
}

async function jsonOrThrow(res: Response) {
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || "Something went wrong");
  return data;
}

// ── Auth ──────────────────────────────────────────────────────────────────────

export async function register(email: string, password: string): Promise<{ token: string; user: User }> {
  const res = await fetch(`${API}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return jsonOrThrow(res);
}

export async function login(email: string, password: string): Promise<{ token: string; user: User }> {
  const res = await fetch(`${API}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return jsonOrThrow(res);
}

export async function googleLogin(credential: string): Promise<{ token: string; user: User }> {
  const res = await fetch(`${API}/api/auth/google`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ credential }),
  });
  return jsonOrThrow(res);
}

export async function getMe(token: string): Promise<{ user: User }> {
  const res = await fetch(`${API}/api/auth/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return jsonOrThrow(res);
}

// ── Membership ────────────────────────────────────────────────────────────────

export async function startMembershipCheckout(plan: Plan, token: string): Promise<{ url: string }> {
  const res = await fetch(`${API}/api/membership/checkout`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify({ plan }),
  });
  return jsonOrThrow(res);
}

export async function verifyMembership(sessionId: string, token: string): Promise<{ user: User; paid: boolean }> {
  const res = await fetch(`${API}/api/membership/verify/${sessionId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return jsonOrThrow(res);
}

export async function getMemberDownloads(token: string): Promise<MemberDownloads> {
  const res = await fetch(`${API}/api/member/downloads`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return jsonOrThrow(res);
}
