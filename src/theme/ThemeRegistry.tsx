'use client';

import { CacheProvider, ThemeProvider } from '@emotion/react';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import createEmotionCache from './emotion-cache';
import themeCreator from './theme';

const ColorModeContext = createContext({ toggleColorMode: () => {} });

const clientSideEmotionCache = createEmotionCache(); // ✅ Only create once!

export function ThemeRegistry({ children }: { children: React.ReactNode }) {
	const [mode, setMode] = useState<'light' | 'dark'>('light');

	useEffect(() => {
		const storedMode = localStorage.getItem('theme-mode') as 'light' | 'dark' | null;

		if (storedMode) {
			setMode(storedMode);
		} else {
			const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
			setMode(prefersDark ? 'dark' : 'light');
		}
	}, []);

	const colorMode = useMemo(
		() => ({
			toggleColorMode: () => {
				setMode(prev => {
					const newMode = prev === 'light' ? 'dark' : 'light';
					localStorage.setItem('theme-mode', newMode);
					return newMode;
				});
			},
		}),
		[],
	);

	const theme = useMemo(() => themeCreator(mode), [mode]);

	return (
		<CacheProvider value={clientSideEmotionCache}>
			<ColorModeContext.Provider value={colorMode}>
				<ThemeProvider theme={theme}>{children}</ThemeProvider>
			</ColorModeContext.Provider>
		</CacheProvider>
	);
}

export function useColorMode() {
	return useContext(ColorModeContext);
}
