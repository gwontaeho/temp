/** @type {import('next').NextConfig} */

const destination = "https://spirokit-api.net/v1/:path*";
// const destination = "https://dev.spirokit-api.net/v1/:path*";

const nextConfig = {
    reactStrictMode: true,
    async rewrites() {
        return [
            {
                source: "/api/:path*",
                destination,
            },
        ];
    },
};

module.exports = nextConfig;
