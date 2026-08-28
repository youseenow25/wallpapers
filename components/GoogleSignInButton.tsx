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
    ux_mode?: string;
    auto_select?: boolean;
  }) => void;
  renderButton: (el: HTMLElement, opts: Record<string, unknown>) => void;
  prompt: () => void;
}
declare global {
  interface Window {
    google?: { accounts: { id: GoogleIdApi } };
  }
}

const GSI_SRC = "https://accounts.google.com/gsi/client";

function loadGsi(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined") return reject(new Error("no window"));
    if (window.google?.accounts?.id) return resolve();
    const existing = document.querySelector<HTMLScriptElement>(`script[src="${GSI_SRC}"]`);
    if (existing) {
      existing.addEventListener("load", () => resolve());
      existing.addEventListener("error", () => reject(new Error("Failed to load Google")));
      if (window.google?.accounts?.id) resolve();
      return;
    }
    const script = document.createElement("script");
    script.src = GSI_SRC;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load Google"));
    document.body.appendChild(script);
  });
}

export default function GoogleSignInButton({ next }: { next: string }) {
  const { loginWithGoogle } = useAuth();
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState("");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!CLIENT_ID) return;
    let cancelled = false;

    loadGsi()
      .then(() => {
        if (cancelled || !window.google || !containerRef.current) return;
        window.google.accounts.id.initialize({
          client_id: CLIENT_ID as string,
          ux_mode: "popup",
          auto_select: false,
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
          type: "standard",
          theme: "outline",
          size: "large",
          width: 320,
          text: "continue_with",
          shape: "rectangular",
          logo_alignment: "center",
        });
        setReady(true);

        // If Google can't render (e.g. origin not authorized), the container
        // stays empty — surface a hint instead of showing a blank gap.
        setTimeout(() => {
          if (!cancelled && containerRef.current && containerRef.current.childElementCount === 0) {
            setError("Google sign-in couldn't load. Check that this site's origin is authorized in Google Cloud.");
          }
        }, 2500);
      })
      .catch(() => {
        if (!cancelled) setError("Couldn't reach Google. Check your connection and try again.");
      });

    return () => { cancelled = true; };
  }, [next, loginWithGoogle, router]);

  if (!CLIENT_ID) {
    return (
      <p className="text-xs text-[#a06a5a] text-center max-w-[300px] mx-auto">
        Google sign-in isn&apos;t configured yet.
      </p>
    );
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <div ref={containerRef} className="flex justify-center" style={{ minHeight: ready ? 40 : 0 }} />
      {error && <p className="text-xs text-[#a06a5a] text-center max-w-[300px]">{error}</p>}
    </div>
  );
}
