import type { Metadata } from "next";
import SeoRedirectPage from "@/components/SeoRedirectPage";

export const metadata: Metadata = {
  title: "J'adore Napoli Wallpaper — Oil Painting Style | Outbbo",
  description:
    "Download 'J'adore Napoli' — a premium oil painting style wallpaper by Outbbo. A young man in a Napoli jersey standing in the Mediterranean sea, rendered in expressive impasto brushstrokes. High-resolution for MacBook & desktop.",
  keywords: [
    "napoli wallpaper",
    "naples wallpaper",
    "italy wallpaper",
    "football wallpaper",
    "SSC Napoli wallpaper",
    "oil painting wallpaper",
    "MacBook wallpaper",
    "digital wallpaper download",
    "Outbbo wallpaper",
  ],
  alternates: { canonical: "https://www.outbbo.com/jadore-napoli-wallpaper" },
  openGraph: {
    title: "J'adore Napoli Wallpaper | Outbbo",
    description: "A young man in a Napoli jersey in the Mediterranean sea, oil painting style.",
    url: "https://www.outbbo.com/jadore-napoli-wallpaper",
    siteName: "Outbbo",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "J'adore Napoli Wallpaper | Outbbo",
    description: "A young man in a Napoli jersey in the Mediterranean sea, oil painting style.",
  },
};

export default function JadoreNapoliPage() {
  return (
    <SeoRedirectPage
      productUrl="https://www.outbbo.com/product/34"
      title="J'adore Napoli"
      tagline="For the love of Napoli."
      description="Arms spread wide, eyes closed, standing chest-deep in the sea — this is what belonging feels like. A tribute to Naples, football, and the deep blue Mediterranean, painted in expressive oil strokes full of movement and emotion."
      bullets={[
        "High-resolution file optimised for MacBook & desktop displays",
        "Instant digital download — no shipping, no wait",
        "Rich blue and green tones in oil painting impasto style",
        "The perfect wallpaper for Napoli fans and Italy lovers",
      ]}
    />
  );
}
