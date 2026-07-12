import type { Metadata } from "next";
import SeoRedirectPage from "@/components/SeoRedirectPage";

export const metadata: Metadata = {
  title: "The World is Yours Wallpaper — Download for iPhone & Desktop | outbbo",
  description:
    "Download 'The World is Yours' premium digital wallpaper by outbbo. Iconic inspirational design for iPhone, Android, and desktop. High-resolution instant download.",
  keywords: [
    "the world is yours wallpaper",
    "scarface wallpaper",
    "inspirational wallpaper",
    "ambition wallpaper",
    "iPhone wallpaper",
    "desktop wallpaper",
    "digital wallpaper download",
    "outbbo wallpaper",
  ],
  openGraph: {
    title: "The World is Yours Wallpaper | outbbo",
    description:
      "Iconic inspirational wallpaper for iPhone and desktop. High-resolution instant download.",
    url: "https://www.outbbo.com/product/13",
    siteName: "outbbo",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The World is Yours Wallpaper | outbbo",
    description: "Iconic inspirational wallpaper for iPhone and desktop.",
  },
  alternates: {
    canonical: "https://www.outbbo.com/product/13",
  },
};

export default function TheWorldIsYoursPage() {
  return (
    <SeoRedirectPage
      productUrl="https://www.outbbo.com/product/13"
      title="The World is Yours"
      tagline="Claim it."
      description="A timeless statement for those who think big. 'The World is Yours' is a premium wallpaper built for dreamers, hustlers, and anyone who refuses to settle — bold design for a bold mindset."
      bullets={[
        "High-resolution file for iPhone, Android & desktop",
        "Instant digital download — no shipping, no wait",
        "Iconic statement typography",
        "Perfect for lock screen or home screen",
      ]}
    />
  );
}
