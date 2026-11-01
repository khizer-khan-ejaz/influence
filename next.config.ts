import type { NextConfig } from "next";

// Media uploaded through Django admin is served from the public site origin (e.g. https://hiqfluence.com/media/...).
const mediaOrigin = new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000");

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: mediaOrigin.protocol.replace(":", "") as "http" | "https",
        hostname: mediaOrigin.hostname,
        port: mediaOrigin.port,
        pathname: "/media/**",
      },
      // Local development: Django serves media directly.
      { protocol: "http", hostname: "localhost", port: "8000", pathname: "/media/**" },
    ],
  },
  // Pages retired when the site was focused on four pages. Permanent so search engines move their signals.
  async redirects() {
    return [
      { source: "/about", destination: "/", permanent: true },
      { source: "/process", destination: "/#approach", permanent: true },
      { source: "/industries/:slug*", destination: "/#industries", permanent: true },
      { source: "/case-studies/:slug*", destination: "/", permanent: true },
      // Articles rewritten to cover every channel, not only YouTube.
      { source: "/insights/how-to-vet-youtube-creators", destination: "/insights/how-to-vet-creators", permanent: true },
      { source: "/insights/choosing-youtube-integration-format", destination: "/insights/choosing-creator-content-formats", permanent: true },
    ];
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
