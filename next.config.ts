/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: "", // while pushing to github pages, set this to "/<REPO_NAME>"
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
