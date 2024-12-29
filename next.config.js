/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {}, // Set this as an object, not a boolean
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "m.media-amazon.com", // Replace this with your image source
        pathname: "/**", // You can add a specific path pattern if needed
      },
    ],
  },
};

module.exports = nextConfig;
