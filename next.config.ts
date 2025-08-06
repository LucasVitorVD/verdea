import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [new URL('https://tomato-causal-moth-141.mypinata.cloud/**')],
  },
};

export default nextConfig;
