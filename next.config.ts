import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [{ source: "/naomi", destination: "/naomi.html" }];
  },
};

export default nextConfig;
