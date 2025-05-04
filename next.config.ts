import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    output: 'export',
    images: {
        unoptimized: true, // This disables the image optimization API
    },
    eslint: {
        ignoreDuringBuilds: true,  // Disables linting during the build
    }
};

export default nextConfig;
