import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    output: 'export',
    eslint: {
        ignoreDuringBuilds: true,  // Disables linting during the build
    }
};

export default nextConfig;
