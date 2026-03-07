/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        formats: ['image/webp', 'image/avif'],
    },
    experimental: {
        optimizeCss: process.env.NODE_ENV === 'production',
    },
};

export default nextConfig;