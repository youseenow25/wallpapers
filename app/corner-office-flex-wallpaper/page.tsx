import type { Metadata } from "next";
import SeoRedirectPage from "@/components/SeoRedirectPage";

export const metadata: Metadata = {
  title: "Corner Office Flex Wallpaper — Oil Painting Style | Outbbo",
  description:
    "Download 'Corner Office Flex' — a premium oil painting style wallpaper by Outbbo. A suited executive beside a blue Ferrari F40 in a high-rise office, painted in rich impasto. High-resolution for MacBook & desktop.",
  keywords: [
    "ferrari office wallpaper",
    "luxury wallpaper",
    "success wallpaper",
    "ferrari f40 wallpaper",
    "oil painting wallpaper",
    "MacBook wallpaper",
    "digital wallpaper download",
    "Outbbo wallpaper",
  ],
  alternates: { canonical: "https://www.outbbo.com/corner-office-flex-wallpaper" },
  openGraph: {
    title: "Corner Office Flex Wallpaper | Outbbo",
    description: "A suited executive with a Ferrari F40 in a high-rise office, oil painting style.",
    url: "https://www.outbbo.com/corner-office-flex-wallpaper",
    siteName: "Outbbo",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Corner Office Flex Wallpaper | Outbbo",
    description: "A suited executive with a Ferrari F40 in a high-rise office, oil painting style.",
  },
};

export default function CornerOfficeFlexPage() {
  return (
    <SeoRedirectPage
      productUrl="https://www.outbbo.com/product/31"
      title="Corner Office Flex"
      tagline="The office deserves a better car."
      description="A man in a sharp suit sits cool and composed beside a cobalt blue Ferrari F40 — inside a corner office overlooking the city. Painted in golden impasto tones that radiate power. A wallpaper for those who are building something real."
      bullets={[
        "High-resolution file optimised for MacBook & desktop displays",
        "Instant digital download — no shipping, no wait",
        "Deep blue and golden tones in rich oil painting style",
        "The ideal wallpaper for ambitious professionals",
      ]}
    />
  );
}
