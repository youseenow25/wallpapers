import type { Metadata } from "next";
import SeoRedirectPage from "@/components/SeoRedirectPage";

export const metadata: Metadata = {
  title: "The Greatest Wallpaper — Oil Painting Style | Outbbo",
  description:
    "Download 'The Greatest' — a premium oil painting style wallpaper by Outbbo. An iconic portrait of a legendary boxer holding a newspaper, rendered in golden impasto brushstrokes. High-resolution for MacBook & desktop.",
  keywords: [
    "the greatest wallpaper",
    "boxing wallpaper",
    "iconic portrait wallpaper",
    "motivational wallpaper",
    "oil painting wallpaper",
    "MacBook wallpaper",
    "digital wallpaper download",
    "Outbbo wallpaper",
  ],
  alternates: { canonical: "https://www.outbbo.com/the-greatest-wallpaper" },
  openGraph: {
    title: "The Greatest Wallpaper | Outbbo",
    description: "An iconic boxing legend portrait in golden oil painting style. High-resolution for MacBook & desktop.",
    url: "https://www.outbbo.com/the-greatest-wallpaper",
    siteName: "Outbbo",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Greatest Wallpaper | Outbbo",
    description: "An iconic boxing legend portrait in golden oil painting style.",
  },
};

export default function TheGreatestPage() {
  return (
    <SeoRedirectPage
      productUrl="https://www.outbbo.com/product/35"
      title="The Greatest"
      tagline="Painted in history."
      description="A legendary figure, surrounded by his people, holding a message for the world. Painted in warm golden impasto — the kind of brushwork that turns a moment into a monument. This wallpaper belongs in the collection of anyone who knows what greatness actually costs."
      bullets={[
        "High-resolution file optimised for MacBook & desktop displays",
        "Instant digital download — no shipping, no wait",
        "Warm golden tones in expressive oil painting impasto style",
        "An iconic motivational wallpaper for your desktop",
      ]}
    />
  );
}
