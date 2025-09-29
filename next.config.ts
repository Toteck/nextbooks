import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.ctfassets.net",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "nextjs.org", // Adicione esta linha
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
