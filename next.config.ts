import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "21mb",
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "collabspace.huma-volve.com",
        pathname: "/storage/avatars/**",
      },
    ],
  },
};

export default nextConfig;