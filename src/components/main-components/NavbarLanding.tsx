'use client';

import { createClient } from '@/utils/supabase/supabaseClient';
import { AppBar, Box, Button, Container, Toolbar, Typography } from '@mui/material';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import DarkModeToggleButton from './DarkModeToggleButton';

export default function NavbarLanding() {
	const supabase = createClient();
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	useEffect(() => {
		const checkAuth = async () => {
			const {
				data: { session },
			} = await supabase.auth.getSession();
			setIsLoggedIn(!!session?.user);
		};

		checkAuth();

		const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
			setIsLoggedIn(!!session?.user);
		});

		return () => {
			listener.subscription.unsubscribe();
		};
	}, [supabase]);

	const handleLogout = async () => {
		await supabase.auth.signOut();
		window.location.reload();
	};

	return (
		<AppBar position='static' color='transparent' elevation={0}>
			<Container maxWidth='lg'>
				<Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
					<Typography variant='h6' fontWeight='bold'>
						Match Replay
					</Typography>
					<Box display='flex' alignItems='center' gap={2}>
						<Link href='/about'>
							<Button color='inherit'>About</Button>
						</Link>

						{isLoggedIn ? (
							<>
								<Link href='/administrator'>
									<Button color='inherit'>Dashboard</Button>
								</Link>
								<Button color='inherit' onClick={handleLogout}>
									Logout
								</Button>
							</>
						) : (
							<Link href='/login'>
								<Button color='inherit'>Login</Button>
							</Link>
						)}

						<DarkModeToggleButton />
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
}
