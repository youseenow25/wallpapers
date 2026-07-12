import type { Metadata } from "next";
import SeoRedirectPage from "@/components/SeoRedirectPage";

export const metadata: Metadata = {
  title: "Life is a Joke Wallpaper — Download for iPhone & Desktop | Outbbo",
  description:
    "Download the 'Life is a Joke' premium digital wallpaper by Outbbo. Bold, humorous design perfect for iPhone, Android, and desktop. High-resolution instant download.",
  keywords: [
    "life is a joke wallpaper",
    "funny wallpaper",
    "humor wallpaper",
    "iPhone wallpaper",
    "desktop wallpaper",
    "digital wallpaper download",
    "Outbbo wallpaper",
  ],
  openGraph: {
    title: "Life is a Joke Wallpaper | Outbbo",
    description:
      "Bold humorous wallpaper for iPhone and desktop. High-resolution instant download.",
    url: "https://www.outbbo.com/product/25",
    siteName: "Outbbo",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Life is a Joke Wallpaper | Outbbo",
    description: "Bold humorous wallpaper for iPhone and desktop.",
  },
};

export default function LifeIsAJokeWallpaperPage() {
  return (
    <SeoRedirectPage
      productUrl="https://www.outbbo.com/product/25"
      title="Life is a Joke"
      tagline="Don't take it too seriously."
      description="A sharp, witty wallpaper that says it all. 'Life is a Joke' brings dark humor and bold typography to your screen — a daily reminder not to sweat the small stuff."
      bullets={[
        "High-resolution file for iPhone, Android & desktop",
        "Instant digital download — no shipping, no wait",
        "Bold minimalist typography design",
        "Perfect for lock screen or home screen",
      ]}
    />
  );
}
