import type { Metadata } from "next";
import SeoRedirectPage from "@/components/SeoRedirectPage";

export const metadata: Metadata = {
  title: "One Way Wallpaper — Dark Spiritual Oil Painting Style | Outbbo",
  description:
    "Download 'One Way' — a premium oil painting style wallpaper by Outbbo. A glowing cross beside a One Way street sign under a deep night sky, painted in moody blue impasto. High-resolution for MacBook & desktop.",
  keywords: [
    "one way wallpaper",
    "faith wallpaper",
    "cross wallpaper",
    "spiritual wallpaper",
    "dark night wallpaper",
    "oil painting wallpaper",
    "MacBook wallpaper",
    "digital wallpaper download",
    "Outbbo wallpaper",
  ],
  alternates: { canonical: "https://www.outbbo.com/one-way-wallpaper" },
  openGraph: {
    title: "One Way Wallpaper | Outbbo",
    description: "A glowing cross beside a One Way sign under a deep night sky. Dark oil painting style wallpaper.",
    url: "https://www.outbbo.com/one-way-wallpaper",
    siteName: "Outbbo",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "One Way Wallpaper | Outbbo",
    description: "A glowing cross beside a One Way sign under a deep night sky. Dark oil painting style.",
  },
};

export default function OneWayPage() {
  return (
    <SeoRedirectPage
      productUrl="https://www.outbbo.com/product/36"
      title="One Way"
      tagline="One direction. One path."
      description="A street sign points forward. A luminous cross stands in the dark. The night sky swirls in deep indigo oil paint. Simple. Unambiguous. This wallpaper is for those who know exactly where they're going and why."
      bullets={[
        "High-resolution file optimised for MacBook & desktop displays",
        "Instant digital download — no shipping, no wait",
        "Deep navy and golden glow in moody oil painting impasto style",
        "A minimal spiritual wallpaper with powerful symbolism",
      ]}
    />
  );
}
