import type { Metadata } from "next";
import SeoRedirectPage from "@/components/SeoRedirectPage";

export const metadata: Metadata = {
  title: "Zen and the Machine Wallpaper — Oil Painting Style | Outbbo",
  description:
    "Download 'Zen and the Machine' — a premium oil painting style wallpaper by Outbbo. A Buddhist monk pouring tea on a Porsche GT3 RS, painted in dramatic impasto. High-resolution for MacBook & desktop.",
  keywords: [
    "zen wallpaper",
    "porsche wallpaper",
    "monk wallpaper",
    "spiritual car wallpaper",
    "oil painting wallpaper",
    "MacBook wallpaper",
    "digital wallpaper download",
    "Outbbo wallpaper",
  ],
  alternates: { canonical: "https://www.outbbo.com/zen-and-the-machine-wallpaper" },
  openGraph: {
    title: "Zen and the Machine Wallpaper | Outbbo",
    description: "A Buddhist monk and a Porsche GT3 RS in oil painting style. High-resolution for MacBook & desktop.",
    url: "https://www.outbbo.com/zen-and-the-machine-wallpaper",
    siteName: "Outbbo",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zen and the Machine Wallpaper | Outbbo",
    description: "A Buddhist monk and a Porsche GT3 RS in oil painting style.",
  },
};

export default function ZenAndTheMachinePage() {
  return (
    <SeoRedirectPage
      productUrl="https://www.outbbo.com/product/29"
      title="Zen and the Machine"
      tagline="Stillness meets speed."
      description="A Buddhist monk kneels on the hood of a yellow Porsche GT3 RS, serenely pouring tea into the darkness. Two worlds collide — and somehow, they make perfect sense. This oil painting wallpaper is for those who chase both peace and performance."
      bullets={[
        "High-resolution file optimised for MacBook & desktop displays",
        "Instant digital download — no shipping, no wait",
        "Deep amber and shadow tones in rich impasto oil painting style",
        "A conversation piece for your desktop",
      ]}
    />
  );
}
