import { createTheme } from '@mui/material/styles';

// Custom breakpoints + default palette
const theme = (mode: 'light' | 'dark') =>
	createTheme({
		palette: {
			mode,
			...(mode === 'light'
				? {
						background: {
							default: '#f5f5f5',
						},
					}
				: {
						background: {
							default: '#1E1E1E',
						},
					}),
		},
		breakpoints: {
			values: {
				xs: 0, // Mobile
				sm: 600, // Tablet portrait
				md: 768, // Tablet landscape / small laptop
				lg: 1024, // Laptop
				xl: 1440, // Desktop and beyond
			},
		},
	});

export default theme;
