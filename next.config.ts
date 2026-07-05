import type { NextConfig } from "next";

const BACKEND = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { hostname: "picsum.photos" },
      { hostname: "localhost", port: "4000" },
      { hostname: "api.outbbo.com" },
    ],
  },
  async rewrites() {
    return [
      { source: "/uploads/:path*",      destination: `${BACKEND}/uploads/:path*` },
      { source: "/api/admin/:path*",    destination: `${BACKEND}/api/admin/:path*` },
      { source: "/api/download/:path*", destination: `${BACKEND}/api/download/:path*` },
    ];
  },
};

export default nextConfig;
