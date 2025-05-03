'use client';

import { useColorMode } from '@/theme/ThemeRegistry';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { IconButton, Tooltip } from '@mui/material';

export default function ThemeToggle() {
	const { toggleColorMode, mode } = useColorMode();

	const isLightMode = mode === 'light';
	const nextMode = isLightMode ? 'dark' : 'light';

	return (
		<Tooltip title={`Switch to ${nextMode} mode`}>
			<IconButton onClick={toggleColorMode} color='inherit' aria-label={`Switch to ${nextMode} mode`}>
				{isLightMode ? <DarkModeIcon /> : <LightModeIcon />}
			</IconButton>
		</Tooltip>
	);
}
