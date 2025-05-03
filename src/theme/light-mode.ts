import { type ThemeOptions, createTheme } from '@mui/material/styles';

const baseTheme = createTheme();

export const lightThemeOptions: ThemeOptions = {
	palette: {
		mode: 'light',
		primary: {
			main: '#0066cc',
		},
		secondary: {
			main: '#e91e63',
		},
		background: {
			default: '#f9f9f9',
			paper: '#fff',
		},
		text: {
			primary: '#1a1a1a',
			secondary: '#333',
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
