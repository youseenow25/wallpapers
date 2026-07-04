import type { NextConfig } from "next";

const BACKEND = "http://localhost:4000";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { hostname: "picsum.photos" },
      { hostname: "localhost", port: "4000" },
    ],
  },
  async rewrites() {
    return [
      // Explicit pages to avoid Express trailing-slash redirect loop
      { source: "/admin",                destination: `${BACKEND}/admin/login.html` },
      { source: "/admin/",               destination: `${BACKEND}/admin/index.html` },
      { source: "/admin/:path*",         destination: `${BACKEND}/admin/:path*` },
      { source: "/css/:path*",           destination: `${BACKEND}/css/:path*` },
      { source: "/js/:path*",            destination: `${BACKEND}/js/:path*` },
      { source: "/uploads/:path*",       destination: `${BACKEND}/uploads/:path*` },
      { source: "/api/admin/:path*",     destination: `${BACKEND}/api/admin/:path*` },
      { source: "/api/download/:path*",  destination: `${BACKEND}/api/download/:path*` },
    ];
  },
};

export default nextConfig;
