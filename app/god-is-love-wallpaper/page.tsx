import type { Metadata } from "next";
import SeoRedirectPage from "@/components/SeoRedirectPage";

export const metadata: Metadata = {
  title: "God Is Love Wallpaper — Street Art Oil Painting Style | Outbbo",
  description:
    "Download 'God Is Love' — a premium oil painting style wallpaper by Outbbo. A weathered wall painted with a glowing cross and the words 'God Is Love', rendered in rich green impasto brushstrokes. High-resolution for MacBook & desktop.",
  keywords: [
    "god is love wallpaper",
    "faith wallpaper",
    "spiritual wallpaper",
    "street art wallpaper",
    "cross wallpaper",
    "oil painting wallpaper",
    "MacBook wallpaper",
    "digital wallpaper download",
    "Outbbo wallpaper",
  ],
  alternates: { canonical: "https://www.outbbo.com/god-is-love-wallpaper" },
  openGraph: {
    title: "God Is Love Wallpaper | Outbbo",
    description: "A weathered wall with 'God Is Love' in oil painting style. High-resolution for MacBook & desktop.",
    url: "https://www.outbbo.com/god-is-love-wallpaper",
    siteName: "Outbbo",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "God Is Love Wallpaper | Outbbo",
    description: "A weathered wall with 'God Is Love' in oil painting style.",
  },
};

export default function GodIsLovePage() {
  return (
    <SeoRedirectPage
      productUrl="https://www.outbbo.com/product/37"
      title="God Is Love"
      tagline="Written on every wall."
      description="Somewhere between graffiti and gospel — a cross, a message, and a wall that's seen it all. Painted in deep forest green oil strokes that give weight to every letter. This wallpaper is a quiet statement for those who carry faith into every day."
      bullets={[
        "High-resolution file optimised for MacBook & desktop displays",
        "Instant digital download — no shipping, no wait",
        "Rich forest green tones in textured oil painting impasto style",
        "A faith-inspired wallpaper with an urban edge",
      ]}
    />
  );
}
