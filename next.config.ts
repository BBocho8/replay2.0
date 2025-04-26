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
	async redirects() {
		return [
			// Basic redirect
			// {
			//   source: '/about',
			//   destination: '/',
			//   permanent: true,
			// },
			// Wildcard path matching
			{
				source: '/admin/:slug',
				destination: '/admin/:slug',
				permanent: true,
			},
		];
	},
};

export default nextConfig;
