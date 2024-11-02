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
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "res.cloudinary.com",
                port: "",
                pathname: "/**",
            },
        ]
    }
};

export default nextConfig;
