import type { Metadata } from "next";
import SeoRedirectPage from "@/components/SeoRedirectPage";

export const metadata: Metadata = {
  title: "Life is a Joke Wallpaper — Download for iPhone & Desktop | outbbo",
  description:
    "Download the 'Life is a Joke' premium digital wallpaper by outbbo. Bold, humorous design perfect for iPhone, Android, and desktop. High-resolution instant download.",
  keywords: [
    "life is a joke wallpaper",
    "funny wallpaper",
    "humor wallpaper",
    "iPhone wallpaper",
    "desktop wallpaper",
    "digital wallpaper download",
    "outbbo wallpaper",
  ],
  openGraph: {
    title: "Life is a Joke Wallpaper | outbbo",
    description:
      "Bold humorous wallpaper for iPhone and desktop. High-resolution instant download.",
    url: "https://www.outbbo.com/product/25",
    siteName: "outbbo",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Life is a Joke Wallpaper | outbbo",
    description: "Bold humorous wallpaper for iPhone and desktop.",
  },
  alternates: {
    canonical: "https://www.outbbo.com/product/25",
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
