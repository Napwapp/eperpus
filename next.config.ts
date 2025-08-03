import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "via.placeholder.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
    dirs: [
      "app",
      "components",
      "hooks",
      "lib",
      "middlewares",
      "validations",
      "prisma",
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;