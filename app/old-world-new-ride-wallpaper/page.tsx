import type { Metadata } from "next";
import SeoRedirectPage from "@/components/SeoRedirectPage";

export const metadata: Metadata = {
  title: "Old World New Ride Wallpaper — Oil Painting Style | Outbbo",
  description:
    "Download 'Old World New Ride' — a premium oil painting style wallpaper by Outbbo. A pink Subaru Impreza WRX in a rustic village setting, rendered in vivid impasto brushstrokes. High-resolution for MacBook & desktop.",
  keywords: [
    "subaru wallpaper",
    "subaru impreza wallpaper",
    "JDM wallpaper",
    "oil painting car wallpaper",
    "vintage contrast wallpaper",
    "MacBook wallpaper",
    "digital wallpaper download",
    "Outbbo wallpaper",
  ],
  alternates: { canonical: "https://www.outbbo.com/old-world-new-ride-wallpaper" },
  openGraph: {
    title: "Old World New Ride Wallpaper | Outbbo",
    description: "Pink Subaru Impreza WRX in a rustic village, oil painting style. High-resolution for MacBook & desktop.",
    url: "https://www.outbbo.com/old-world-new-ride-wallpaper",
    siteName: "Outbbo",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Old World New Ride Wallpaper | Outbbo",
    description: "Pink Subaru Impreza WRX in a rustic village, oil painting style.",
  },
};

export default function OldWorldNewRidePage() {
  return (
    <SeoRedirectPage
      productUrl="https://www.outbbo.com/product/30"
      title="Old World New Ride"
      tagline="Different worlds. Same road."
      description="A hot pink Subaru Impreza sits bold and unapologetic in front of a crumbling old village house. The contrast is the whole point. Painted in rich oil texture that makes the colour pop — this wallpaper is for those who do things differently."
      bullets={[
        "High-resolution file optimised for MacBook & desktop displays",
        "Instant digital download — no shipping, no wait",
        "Vivid pink and earth tones in oil painting impasto style",
        "Perfect for JDM fans and anyone who loves a good contrast",
      ]}
    />
  );
}
