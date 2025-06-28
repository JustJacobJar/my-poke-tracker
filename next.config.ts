// @ts-expect-error No declaration file
import { PrismaPlugin } from "@prisma/nextjs-monorepo-workaround-plugin";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  experimental: {
    authInterrupts: true,
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.plugins = [...config.plugins, new PrismaPlugin()];
    }
    return config;
  },
  /* config options here */
  images: {
    remotePatterns: [
      new URL(
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/**",
      ),
    ],
    formats: ['image/webp'],
    minimumCacheTTL:2678400
  },
};

export default nextConfig;
