import type { NextConfig } from "next";
import { NEXT_PUBLIC_API_URL } from "./config";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
        {
            source: '/api/:path*',
            destination: `${NEXT_PUBLIC_API_URL}/api/:path*`,
        },
    ];
},
};

export default nextConfig;
