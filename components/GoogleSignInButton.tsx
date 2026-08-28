"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "./AuthContext";

const CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

interface GoogleCredentialResponse {
  credential: string;
}
interface GoogleIdApi {
  initialize: (cfg: {
    client_id: string;
    callback: (r: GoogleCredentialResponse) => void;
  }) => void;
  renderButton: (el: HTMLElement, opts: Record<string, unknown>) => void;
}
declare global {
  interface Window {
    google?: { accounts: { id: GoogleIdApi } };
  }
}

const GSI_SRC = "https://accounts.google.com/gsi/client";

export default function GoogleSignInButton({ next }: { next: string }) {
  const { loginWithGoogle } = useAuth();
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!CLIENT_ID) return;

    function render() {
      if (!window.google || !containerRef.current) return;
      window.google.accounts.id.initialize({
        client_id: CLIENT_ID as string,
        callback: async (resp) => {
          try {
            await loginWithGoogle(resp.credential);
            router.push(next);
          } catch (err) {
            setError(err instanceof Error ? err.message : "Google sign-in failed");
          }
        },
      });
      window.google.accounts.id.renderButton(containerRef.current, {
        theme: "outline",
        size: "large",
        width: 320,
        text: "continue_with",
        shape: "rectangular",
      });
    }

    if (window.google) {
      render();
      return;
    }
    const existing = document.querySelector<HTMLScriptElement>(`script[src="${GSI_SRC}"]`);
    if (existing) {
      existing.addEventListener("load", render);
      return () => existing.removeEventListener("load", render);
    }
    const script = document.createElement("script");
    script.src = GSI_SRC;
    script.async = true;
    script.defer = true;
    script.onload = render;
    document.body.appendChild(script);
  }, [next, loginWithGoogle, router]);

  if (!CLIENT_ID) return null;

  return (
    <div className="flex flex-col items-center gap-2">
      <div ref={containerRef} className="flex justify-center min-h-[40px]" />
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}
