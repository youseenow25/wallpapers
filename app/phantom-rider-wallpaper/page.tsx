import type { Metadata } from "next";
import SeoRedirectPage from "@/components/SeoRedirectPage";

export const metadata: Metadata = {
  title: "Phantom Rider Wallpaper — Dark Oil Painting Style | Outbbo",
  description:
    "Download 'Phantom Rider' — a premium dark oil painting style wallpaper by Outbbo. A headless flaming horseman galloping across an open field under a deep blue sky. High-resolution for MacBook & desktop.",
  keywords: [
    "phantom rider wallpaper",
    "dark wallpaper",
    "horse wallpaper",
    "cinematic wallpaper",
    "headless horseman wallpaper",
    "oil painting wallpaper",
    "MacBook wallpaper",
    "digital wallpaper download",
    "Outbbo wallpaper",
  ],
  alternates: { canonical: "https://www.outbbo.com/phantom-rider-wallpaper" },
  openGraph: {
    title: "Phantom Rider Wallpaper | Outbbo",
    description: "A flaming headless horseman galloping across open plains. Dark oil painting style wallpaper.",
    url: "https://www.outbbo.com/phantom-rider-wallpaper",
    siteName: "Outbbo",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Phantom Rider Wallpaper | Outbbo",
    description: "A flaming headless horseman galloping across open plains. Dark oil painting style wallpaper.",
  },
};

export default function PhantomRiderPage() {
  return (
    <SeoRedirectPage
      productUrl="https://www.outbbo.com/product/32"
      title="Phantom Rider"
      tagline="Ride into the unknown."
      description="A cloaked figure with a blazing flame where a head should be, galloping hard across golden fields under a vast blue sky. Equal parts myth and masterpiece — painted in thick dramatic oil strokes that make the fire glow. This wallpaper commands attention."
      bullets={[
        "High-resolution file optimised for MacBook & desktop displays",
        "Instant digital download — no shipping, no wait",
        "Striking blue and amber contrast in oil painting impasto style",
        "A dark, cinematic wallpaper for bold personalities",
      ]}
    />
  );
}
