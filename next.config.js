/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  // experimental: {
  //   fontLoaders: [
  //     { loader: '@next/font/google', options: { timeout: 60000 } }
  //   ],
  // },
};

module.exports = nextConfig;