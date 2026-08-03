import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  experimental: {
    viewTransition: true,
  },
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
