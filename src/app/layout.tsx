import NavbarManager from '@/components/main-components/NavbarManger';
import { ThemeRegistry } from '@/theme';
import { SWRProvider } from '@/utils/swr/swr-provider';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from '../components/main-components/Footer';
import './globals.css';

const roboto = Roboto({
	subsets: ['latin'],
	weight: ['100', '300', '400', '500', '700', '900'],
});

export const metadata: Metadata = {
	title: 'SVE Mendig - Match Replay',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body className={`${roboto} antialiased`}>
				<ThemeRegistry>
					<ToastContainer />
					<SpeedInsights />
					<Analytics />
					<SWRProvider>
						<main>
							<NavbarManager />
							{children}
							<Footer />
						</main>
					</SWRProvider>
				</ThemeRegistry>
			</body>
		</html>
	);
}
