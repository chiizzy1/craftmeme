/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: config => {
    config.externals.push('pino-pretty', 'lokijs', 'encoding')
    return config
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: "picsum.photos",
      },
      {
        protocol: 'https',
        hostname: "quicknode.quicknode-ipfs.com",
      },
      {
        protocol: 'https',
        hostname: "forget-member-silk.quicknode-ipfs.com",
      },
    ],
  },
};

export default nextConfig;