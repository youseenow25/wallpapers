"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/components/AuthContext";
import GoogleSignInButton from "@/components/GoogleSignInButton";

function LoginForm() {
  const { login } = useAuth();
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get("next") || "/account";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      router.push(next);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sign in failed");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-[calc(100vh-56px)] flex items-center justify-center px-6 py-20">
      <div className="w-full max-w-sm">
        <h1 className="font-serif text-3xl font-bold mb-1">Sign in</h1>
        <p className="text-sm text-[#7a7060] mb-8">Access your membership and downloads.</p>

        <div className="mb-6">
          <GoogleSignInButton next={next} />
        </div>

        <div className="flex items-center gap-3 mb-6">
          <span className="flex-1 h-px bg-[#ddd5c4]" />
          <span className="text-[10px] uppercase tracking-widest text-[#a09880]">or</span>
          <span className="flex-1 h-px bg-[#ddd5c4]" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[10px] uppercase tracking-widest text-[#a09880] mb-1.5">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-[#ddd5c4] bg-white/40 px-3.5 py-3 text-sm focus:outline-none focus:border-[#1c1a18]"
            />
          </div>
          <div>
            <label className="block text-[10px] uppercase tracking-widest text-[#a09880] mb-1.5">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-[#ddd5c4] bg-white/40 px-3.5 py-3 text-sm focus:outline-none focus:border-[#1c1a18]"
            />
          </div>
          {error && <p className="text-xs text-red-600">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#1c1a18] text-[#f0e8d8] py-3.5 text-[11px] tracking-[0.18em] uppercase font-medium hover:bg-black transition-colors disabled:opacity-50"
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>

        <p className="text-sm text-[#7a7060] mt-6 text-center">
          No account?{" "}
          <Link href={`/signup?next=${encodeURIComponent(next)}`} className="text-[#1c1a18] underline underline-offset-2">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
