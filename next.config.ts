import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig : NextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // Allow all domains (or use "lh3.googleusercontent.com" for Google avatars)
      },
    ],
  },
};

module.exports = nextConfig;