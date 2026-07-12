import type { Metadata } from "next";
import SeoRedirectPage from "@/components/SeoRedirectPage";

export const metadata: Metadata = {
  title: "Stay Humble Stay Goated Wallpaper — Download for iPhone & Desktop | Outbbo",
  description:
    "Download the 'Stay Humble Stay Goated' premium digital wallpaper by Outbbo. Motivational design for iPhone, Android, and desktop. High-resolution instant download.",
  keywords: [
    "stay humble stay goated wallpaper",
    "goated wallpaper",
    "motivational wallpaper",
    "hustle wallpaper",
    "iPhone wallpaper",
    "desktop wallpaper",
    "digital wallpaper download",
    "Outbbo wallpaper",
  ],
  openGraph: {
    title: "Stay Humble Stay Goated Wallpaper | Outbbo",
    description:
      "Motivational wallpaper for iPhone and desktop. High-resolution instant download.",
    url: "https://www.outbbo.com/product/9",
    siteName: "Outbbo",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Stay Humble Stay Goated Wallpaper | Outbbo",
    description: "Motivational wallpaper for iPhone and desktop.",
  },
};

export default function StayHumbleStayGoatedPage() {
  return (
    <SeoRedirectPage
      productUrl="https://www.outbbo.com/product/9"
      title="Stay Humble Stay Goated"
      tagline="Two rules. Live by them."
      description="The grind never stops — but neither does the humility. 'Stay Humble Stay Goated' is a premium motivational wallpaper that keeps you locked in without losing sight of who you are."
      bullets={[
        "High-resolution file for iPhone, Android & desktop",
        "Instant digital download — no shipping, no wait",
        "Clean bold typography built for focus",
        "Perfect for lock screen or home screen",
      ]}
    />
  );
}
