/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: ['images.unsplash.com', 'images.pexels.com'],
        unoptimized: process.env.NODE_ENV === 'production' ? false : true,
    }
};

module.exports = nextConfig;
