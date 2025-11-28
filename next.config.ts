import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Handle external packages properly (updated syntax for Next.js 16)
  serverExternalPackages: ['mongoose', 'bcryptjs'],
  
  // Ensure proper ESM handling
  transpilePackages: [],
  
  // Experimental features for better compatibility
  experimental: {
    // Add any experimental features if needed
  },
};

export default nextConfig;
