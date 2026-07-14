import type { Metadata } from "next";
import SeoRedirectPage from "@/components/SeoRedirectPage";

export const metadata: Metadata = {
  title: "Summer at the Villa Wallpaper — Oil Painting Style | Outbbo",
  description:
    "Download 'Summer at the Villa' — a premium oil painting style wallpaper by Outbbo. Luxurious poolside summer scene rendered in rich impasto brushstrokes. High-resolution for MacBook & desktop.",
  keywords: [
    "summer villa wallpaper",
    "pool party wallpaper",
    "luxury lifestyle wallpaper",
    "oil painting wallpaper",
    "summer desktop wallpaper",
    "MacBook wallpaper",
    "digital wallpaper download",
    "Outbbo wallpaper",
  ],
  alternates: { canonical: "https://www.outbbo.com/summer-at-the-villa-wallpaper" },
  openGraph: {
    title: "Summer at the Villa Wallpaper | Outbbo",
    description: "Luxurious poolside summer scene in oil painting style. High-resolution for MacBook & desktop.",
    url: "https://www.outbbo.com/summer-at-the-villa-wallpaper",
    siteName: "Outbbo",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Summer at the Villa Wallpaper | Outbbo",
    description: "Luxurious poolside summer scene in oil painting style.",
  },
};

export default function SummerAtTheVillaPage() {
  return (
    <SeoRedirectPage
      productUrl="https://www.outbbo.com/product/27"
      title="Summer at the Villa"
      tagline="Endless summer, painted in oil."
      description="A sun-drenched poolside scene captured like a Renaissance master painted it — laughter, golden light, and the kind of afternoon that never ends. This oil painting wallpaper brings warmth and luxury to every glance at your screen."
      bullets={[
        "High-resolution file optimised for MacBook & desktop displays",
        "Instant digital download — no shipping, no wait",
        "Rich impasto oil painting texture with preserved natural colours",
        "Perfect as a desktop wallpaper or artistic statement piece",
      ]}
    />
  );
}
