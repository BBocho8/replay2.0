import type { Config } from 'tailwindcss';

const config: Config = {
	content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './pages/**/*.{ts,tsx}', './utils/**/*.{ts,tsx}'],
	theme: {
		extend: {
			colors: {
				primary: {
					light: '#1976d2',
					dark: '#90caf9',
				},
				secondary: {
					light: '#9c27b0',
					dark: '#ce93d8',
				},
				background: {
					light: '#f5f5f5',
					dark: '#121212',
				},
				surface: {
					light: '#ffffff',
					dark: '#1e1e1e',
				},
				text: {
					light: '#1a1a1a',
					dark: '#f5f5f5',
				},
			},
			fontFamily: {
				sans: ['Roboto', 'sans-serif'],
			},
			fontSize: {
				sm: '0.875rem',
				base: '1rem',
				lg: '1.125rem',
				xl: '1.25rem',
				'2xl': '1.5rem',
				'3xl': '1.875rem',
				'4xl': '2.25rem',
				'5xl': '3rem',
				'6xl': '3.75rem',
			},
			spacing: {
				4: '1rem',
				6: '1.5rem',
				8: '2rem',
				10: '2.5rem',
				12: '3rem',
			},
			borderRadius: {
				DEFAULT: '8px',
				lg: '12px',
			},
		},
	},
	darkMode: 'class',
	plugins: [],
};

export default config;
