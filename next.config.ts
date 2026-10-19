import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  experimental: {
    serverActions: {
      // Dokument-Uploads im Admin (max. 4 MB plus Formular-Overhead).
      bodySizeLimit: "4.5mb",
    },
  },
  outputFileTracingIncludes: {
    "/api/private-documents/*": ["./secure-documents/**/*"],
  },
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
