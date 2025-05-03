'use client';

import { CacheProvider } from '@emotion/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import createEmotionCache from './emotion-cache';
import { darkThemeOptions, lightThemeOptions } from './theme';

interface ThemeContextValue {
	toggleColorMode: () => void;
	mode: 'light' | 'dark';
}

const ColorModeContext = createContext<ThemeContextValue>({
	toggleColorMode: () => {},
	mode: 'light',
});

export function ThemeRegistry({ children }: { children: React.ReactNode }) {
	const [mode, setMode] = useState<'light' | 'dark'>('light');

	useEffect(() => {
		const saved = localStorage.getItem('theme-mode') as 'light' | 'dark' | null;
		if (saved) {
			setMode(saved);
		} else {
			setMode(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
		}
	}, []);

	const colorMode = useMemo<ThemeContextValue>(
		() => ({
			toggleColorMode: () => {
				setMode(prev => {
					const next = prev === 'light' ? 'dark' : 'light';
					localStorage.setItem('theme-mode', next);
					return next;
				});
			},
			mode,
		}),
		[mode],
	);

	const theme = useMemo(() => {
		const base = createTheme({ palette: { mode } }); // set mode here
		return createTheme(base, mode === 'light' ? lightThemeOptions : darkThemeOptions);
	}, [mode]);
	const emotionCache = useMemo(() => createEmotionCache(), []);

	return (
		<CacheProvider value={emotionCache}>
			<ColorModeContext.Provider value={{ mode, toggleColorMode: colorMode.toggleColorMode }}>
				<ThemeProvider theme={theme}>{children}</ThemeProvider>
			</ColorModeContext.Provider>
		</CacheProvider>
	);
}

export function useColorMode() {
	return useContext(ColorModeContext);
}
