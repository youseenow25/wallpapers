import type { Metadata } from "next";
import SeoRedirectPage from "@/components/SeoRedirectPage";

export const metadata: Metadata = {
  title: "Red Ferraris Estate Wallpaper — Oil Painting Style | Outbbo",
  description:
    "Download 'Red Ferraris at the Estate' — a premium oil painting style wallpaper by Outbbo. Two red Ferraris parked at a luxury villa, rendered in stunning impasto brushstrokes. High-resolution for MacBook & desktop.",
  keywords: [
    "ferrari wallpaper",
    "luxury car wallpaper",
    "red ferrari wallpaper",
    "supercar wallpaper",
    "oil painting car wallpaper",
    "MacBook wallpaper",
    "digital wallpaper download",
    "Outbbo wallpaper",
  ],
  alternates: { canonical: "https://www.outbbo.com/red-ferraris-estate-wallpaper" },
  openGraph: {
    title: "Red Ferraris Estate Wallpaper | Outbbo",
    description: "Two red Ferraris at a luxury villa in oil painting style. High-resolution for MacBook & desktop.",
    url: "https://www.outbbo.com/red-ferraris-estate-wallpaper",
    siteName: "Outbbo",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Red Ferraris Estate Wallpaper | Outbbo",
    description: "Two red Ferraris at a luxury villa in oil painting style.",
  },
};

export default function RedFerrarisEstatePage() {
  return (
    <SeoRedirectPage
      productUrl="https://www.outbbo.com/product/28"
      title="Red Ferraris at the Estate"
      tagline="The estate. The Ferraris. The life."
      description="Two red Ferraris sit in the courtyard of a palm-lined villa, surrounded by the kind of calm that only success can buy. Painted with thick impasto strokes that make every detail sing — this wallpaper belongs on the screen of someone who aims high."
      bullets={[
        "High-resolution file optimised for MacBook & desktop displays",
        "Instant digital download — no shipping, no wait",
        "Rich oil painting texture with vibrant reds and lush greens",
        "Perfect wallpaper for car enthusiasts and luxury lifestyle lovers",
      ]}
    />
  );
}
