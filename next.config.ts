import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'i.ytimg.com',
				port: '',
				pathname: '/**',
			},
		],
	},
	reactStrictMode: false,
	output: 'standalone',
	eslint: {
		ignoreDuringBuilds: true,
	},
};

export default nextConfig;
