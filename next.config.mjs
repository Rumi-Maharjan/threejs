/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        path: "/", // <----- THIS IS THE ISSUE
    },
};

export default nextConfig;
