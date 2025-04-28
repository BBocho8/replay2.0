'use client';

import { CssBaseline, ThemeProvider } from '@mui/material';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import themeCreator from './theme';

const ColorModeContext = createContext({ toggleColorMode: () => {} });

export function ThemeRegistry({ children }: { children: React.ReactNode }) {
	const [mode, setMode] = useState<'light' | 'dark'>('light');

	useEffect(() => {
		const storedMode = localStorage.getItem('theme-mode') as 'light' | 'dark' | null;

		if (storedMode) {
			setMode(storedMode);
		} else {
			// No saved mode? Detect system preference
			const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
			setMode(prefersDark ? 'dark' : 'light');
		}
	}, []);

	const colorMode = useMemo(
		() => ({
			toggleColorMode: () => {
				setMode(prevMode => {
					const newMode = prevMode === 'light' ? 'dark' : 'light';
					localStorage.setItem('theme-mode', newMode);
					return newMode;
				});
			},
		}),
		[],
	);

	const theme = useMemo(() => themeCreator(mode), [mode]);

	return (
		<ColorModeContext.Provider value={colorMode}>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				{children}
			</ThemeProvider>
		</ColorModeContext.Provider>
	);
}

export function useColorMode() {
	return useContext(ColorModeContext);
}
