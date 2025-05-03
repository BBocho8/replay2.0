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
		fontFamily: "'Roboto', sans-serif",
		h1: {
			fontSize: '2rem',
			fontWeight: 700,
		},
		h2: {
			fontSize: '1.75rem',
			fontWeight: 600,
		},
		h3: {
			fontSize: '1.5rem',
			fontWeight: 600,
		},
		h4: {
			fontSize: '1.25rem',
			fontWeight: 600,
		},
		h5: {
			fontSize: '1.125rem',
			fontWeight: 500,
		},
		h6: {
			fontSize: '1rem',
			fontWeight: 500,
		},
		body1: {
			fontSize: '1rem',
		},
		body2: {
			fontSize: '0.875rem',
		},
	},
};
