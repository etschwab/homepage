import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  turbopack: {
    root: process.cwd(),
  },
  async redirects() {
    return [
      {
        source: "/kompetenzen",
        destination: "/ueber-mich",
        permanent: true,
      },
      {
        source: "/bildungsweg",
        destination: "/ueber-mich",
        permanent: true,
      },
      {
        source: "/kontakt",
        destination: "/dateien",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
