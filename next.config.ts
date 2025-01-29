/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", // Required for GitHub Pages
  assetPrefix: "./", // Ensures assets are correctly loaded in GitHub Pages
  trailingSlash: true, // Ensures proper paths for static files
  images: {
    unoptimized: true, // Disables Image Optimization
  },
  typescript: {
    ignoreBuildErrors: true, // Ignore TypeScript build errors
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
