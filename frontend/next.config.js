/**
 * @type {import('next').NextConfig}
 */
const withPlugins = require("next-compose-plugins")
const withImages = require("next-images")

const nextConfig = {
  images: {
    loader: "default",
    domains: ["localhost", "res.cloudinary.com"],
    path: "/_next/image",
  },
  webpack5: true,
}

module.exports = withPlugins([[withImages]], nextConfig)
