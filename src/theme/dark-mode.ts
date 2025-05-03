import { type ThemeOptions, createTheme } from '@mui/material/styles';

const baseTheme = createTheme();

export const darkThemeOptions: ThemeOptions = {
	palette: {
		mode: 'dark',
		primary: {
			main: '#90caf9',
		},
		secondary: {
			main: '#f48fb1',
		},
		background: {
			default: '#121212',
			paper: '#1e1e1e',
		},
		text: {
			primary: '#fff',
			secondary: '#ccc',
		},
	},
	typography: {
		...baseTheme.typography,
		fontFamily: "'Roboto', sans-serif",
		h1: {
			...baseTheme.typography.h1,
			fontSize: baseTheme.typography.pxToRem(32),
			fontWeight: 700,
		},
		h2: {
			...baseTheme.typography.h2,
			fontSize: baseTheme.typography.pxToRem(28),
			fontWeight: 600,
		},
		body1: {
			...baseTheme.typography.body1,
			fontSize: baseTheme.typography.pxToRem(16),
		},
	},
};
