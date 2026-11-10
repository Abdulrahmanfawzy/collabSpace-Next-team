import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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