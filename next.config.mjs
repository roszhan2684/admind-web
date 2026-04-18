/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '5050',
        pathname: '/outputs/**',
      },
      {
        protocol: 'https',
        hostname: '**',
        pathname: '/outputs/**',
      },
    ],
  },
};

export default nextConfig;
