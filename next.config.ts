import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '3mb',
    },
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  /* config options here */
  reactCompiler: true,
};

export default nextConfig;
