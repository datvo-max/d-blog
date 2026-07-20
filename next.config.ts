import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/d-blog',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
