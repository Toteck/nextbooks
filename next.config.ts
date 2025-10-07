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
      {
        protocol: "https",
        hostname: "i.pinimg.com", // 💡 Domínio Pinterest
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
