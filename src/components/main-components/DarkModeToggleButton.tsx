'use client';

import { useColorMode } from '@/theme/ThemeRegistry';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { useTheme } from '@mui/material/styles';

export default function DarkModeToggleButton() {
	const theme = useTheme();
	const colorMode = useColorMode();

	return (
		<IconButton onClick={colorMode.toggleColorMode} color='inherit'>
			{theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
		</IconButton>
	);
}
