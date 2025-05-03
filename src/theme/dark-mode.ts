import type { ThemeOptions } from '@mui/material/styles';

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
