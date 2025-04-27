import NavbarV2 from '@/components/main-components/NavbarV2';
import { SWRProvider } from '@/utils/swr/swr-provider';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import { ToastContainer } from 'react-toastify';
import Footer from '../components/main-components/Footer';

import 'react-toastify/dist/ReactToastify.css';
import './globals.css';

const roboto = Roboto({
	subsets: ['latin'],
	weight: ['100', '300', '400', '500', '700', '900'],
});

export const metadata: Metadata = {
	title: 'SVE Mendig - Match Replay',
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body className={`${roboto} antialiased`}>
				<ToastContainer />
				<SpeedInsights />
				<Analytics />
				<SWRProvider>
					<main>
						<NavbarV2 />
						{children}
						<Footer />
					</main>
				</SWRProvider>
			</body>
		</html>
	);
}
