/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  transpilePackages: ['undici'],
  experimental: {
    serverComponentsExternalPackages: ['cheerio', 'axios']
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals.push('cheerio', 'axios')
    }
    return config
  }
};

module.exports = nextConfig;
