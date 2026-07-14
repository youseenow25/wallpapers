import type { Metadata } from "next";
import SeoRedirectPage from "@/components/SeoRedirectPage";

export const metadata: Metadata = {
  title: "Part the Waters Wallpaper — Ocean Oil Painting Style | Outbbo",
  description:
    "Download 'Part the Waters' — a premium oil painting style wallpaper by Outbbo. A lone shark cutting through a parting school of fish, seen from above, rendered in stunning teal impasto. High-resolution for MacBook & desktop.",
  keywords: [
    "shark wallpaper",
    "ocean wallpaper",
    "underwater wallpaper",
    "nature wallpaper",
    "oil painting wallpaper",
    "MacBook wallpaper",
    "digital wallpaper download",
    "Outbbo wallpaper",
  ],
  alternates: { canonical: "https://www.outbbo.com/part-the-waters-wallpaper" },
  openGraph: {
    title: "Part the Waters Wallpaper | Outbbo",
    description: "A shark parting a school of fish from above, in oil painting style. High-resolution for MacBook & desktop.",
    url: "https://www.outbbo.com/part-the-waters-wallpaper",
    siteName: "Outbbo",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Part the Waters Wallpaper | Outbbo",
    description: "A shark parting a school of fish from above, in oil painting style.",
  },
};

export default function PartTheWatersPage() {
  return (
    <SeoRedirectPage
      productUrl="https://www.outbbo.com/product/33"
      title="Part the Waters"
      tagline="The ocean parts for those who lead."
      description="Seen from above, a single shark moves through the deep — and thousands of fish make way. A stunning aerial composition painted in deep ocean teal with thick, flowing oil strokes that mirror the current. This wallpaper is a quiet reminder of what real presence looks like."
      bullets={[
        "High-resolution file optimised for MacBook & desktop displays",
        "Instant digital download — no shipping, no wait",
        "Deep teal ocean tones in rich impasto oil painting style",
        "Breathtaking nature wallpaper with a powerful visual metaphor",
      ]}
    />
  );
}
