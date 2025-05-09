import FooterManager from '@/components/main-components/FooterManager';
import NavbarManager from '@/components/main-components/NavbarManager';
import { ThemeRegistry } from '@/theme';
import '@/utils/dayjs';
import { SWRProvider } from '@/utils/swr/swr-provider';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
			<body className={`${roboto.className} antialiased`}>
				<ThemeRegistry>
					<ToastContainer />
					<SpeedInsights />
					<Analytics />
					<SWRProvider>
						{/* Page Wrapper */}
						<div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
							<NavbarManager />
							<main style={{ flex: 1 }}>{children}</main>
							<FooterManager />
						</div>
					</SWRProvider>
				</ThemeRegistry>
			</body>
		</html>
	);
}
