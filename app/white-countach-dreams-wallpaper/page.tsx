import type { Metadata } from "next";
import SeoRedirectPage from "@/components/SeoRedirectPage";

export const metadata: Metadata = {
  title: "White Countach Dreams Wallpaper — Oil Painting Style | Outbbo",
  description:
    "Download 'White Countach Dreams' — a premium oil painting style wallpaper by Outbbo. A man reclining beside a white Lamborghini Countach with scissor doors open, painted in rich impasto. High-resolution for MacBook & desktop.",
  keywords: [
    "lamborghini wallpaper",
    "countach wallpaper",
    "lamborghini countach wallpaper",
    "supercar wallpaper",
    "oil painting car wallpaper",
    "MacBook wallpaper",
    "digital wallpaper download",
    "Outbbo wallpaper",
  ],
  alternates: { canonical: "https://www.outbbo.com/white-countach-dreams-wallpaper" },
  openGraph: {
    title: "White Countach Dreams Wallpaper | Outbbo",
    description: "A man reclining beside a white Lamborghini Countach, oil painting style. High-resolution for MacBook & desktop.",
    url: "https://www.outbbo.com/white-countach-dreams-wallpaper",
    siteName: "Outbbo",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "White Countach Dreams Wallpaper | Outbbo",
    description: "A man reclining beside a white Lamborghini Countach, oil painting style.",
  },
};

export default function WhiteCountachDreamsPage() {
  return (
    <SeoRedirectPage
      productUrl="https://www.outbbo.com/product/38"
      title="White Countach Dreams"
      tagline="The dream parked in your driveway."
      description="Scissor doors open to the sky, a young man leans against the white Lamborghini Countach — unhurried, like it's just another Tuesday. Painted in warm earthy oil strokes that make the white gleam. The wallpaper of someone who dreams in Italian."
      bullets={[
        "High-resolution file optimised for MacBook & desktop displays",
        "Instant digital download — no shipping, no wait",
        "Warm earth tones and crisp white in oil painting impasto style",
        "The ultimate supercar wallpaper for Lamborghini fans",
      ]}
    />
  );
}
