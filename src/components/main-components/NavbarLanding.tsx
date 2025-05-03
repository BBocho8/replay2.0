'use client';

import { AppBar, Box, Button, Container, Toolbar, Typography } from '@mui/material';
import Link from 'next/link';
import DarkModeToggleButton from './DarkModeToggleButton';

export default function NavbarLanding() {
	return (
		<AppBar position='static' color='transparent' elevation={0}>
			<Container maxWidth='lg'>
				<Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
					<Typography variant='h6' fontWeight='bold'>
						Match Replay
					</Typography>
					<Box display='flex' alignItems='center' gap={2}>
						<Link href='/login'>
							<Button color='inherit'>Login</Button>
						</Link>
						<Link href='/about'>
							<Button color='inherit'>About</Button>
						</Link>
						<DarkModeToggleButton />
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
}
