'use client';

import { createClient } from '@/utils/supabase/supabaseClient';
import MenuIcon from '@mui/icons-material/Menu';
import {
	AppBar,
	Box,
	Button,
	Container,
	Divider,
	Drawer,
	IconButton,
	List,
	ListItem,
	ListItemButton,
	ListItemText,
	Stack,
	Toolbar,
	Typography,
	useMediaQuery,
	useTheme,
} from '@mui/material';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import DarkModeToggleButton from './DarkModeToggleButton';

export default function NavbarLanding() {
	const supabase = createClient();
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [mobileOpen, setMobileOpen] = useState(false);
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('md'));

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

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};

	const drawer = (
		<Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
			<Typography
				variant='h6'
				sx={{
					my: 2,
					fontWeight: 700,
					color: 'text.primary',
				}}
			>
				Match Replay
			</Typography>
			<Divider />
			<List>
				<ListItem disablePadding>
					<ListItemButton
						component={Link}
						href='/about'
						sx={{
							textAlign: 'center',
							'&:hover': {
								backgroundColor: 'action.hover',
							},
						}}
					>
						<ListItemText primary='About' />
					</ListItemButton>
				</ListItem>
				<ListItem disablePadding>
					<ListItemButton
						component={Link}
						href='/contact'
						sx={{
							textAlign: 'center',
							'&:hover': {
								backgroundColor: 'action.hover',
							},
						}}
					>
						<ListItemText primary='Contact' />
					</ListItemButton>
				</ListItem>
				{isLoggedIn ? (
					<>
						<ListItem disablePadding>
							<ListItemButton
								component={Link}
								href='/administrator'
								sx={{
									textAlign: 'center',
									'&:hover': {
										backgroundColor: 'action.hover',
									},
								}}
							>
								<ListItemText primary='Dashboard' />
							</ListItemButton>
						</ListItem>
						<ListItem disablePadding>
							<ListItemButton
								onClick={handleLogout}
								sx={{
									textAlign: 'center',
									'&:hover': {
										backgroundColor: 'action.hover',
									},
								}}
							>
								<ListItemText primary='Logout' />
							</ListItemButton>
						</ListItem>
					</>
				) : (
					<ListItem disablePadding>
						<ListItemButton
							component={Link}
							href='/login'
							sx={{
								textAlign: 'center',
								'&:hover': {
									backgroundColor: 'action.hover',
								},
							}}
						>
							<ListItemText primary='Login' />
						</ListItemButton>
					</ListItem>
				)}
			</List>
			<Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
				<DarkModeToggleButton />
			</Box>
		</Box>
	);

	return (
		<AppBar
			position='static'
			color='transparent'
			elevation={0}
			sx={{
				backdropFilter: 'blur(8px)',
				backgroundColor: 'rgba(255, 255, 255, 0.8)',
				borderBottom: '1px solid',
				borderColor: 'divider',
			}}
		>
			<Container maxWidth='lg'>
				<Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
					<Link href={'/'} style={{ textDecoration: 'none' }}>
						<Typography
							variant='h6'
							sx={{
								fontWeight: 700,
								color: 'text.primary',
								'&:hover': {
									color: 'primary.main',
									transition: 'color 0.2s ease',
								},
							}}
						>
							Match Replay
						</Typography>
					</Link>

					{isMobile ? (
						<>
							<IconButton
								color='inherit'
								aria-label='open drawer'
								edge='start'
								onClick={handleDrawerToggle}
								sx={{
									display: { md: 'none' },
									'&:hover': {
										backgroundColor: 'action.hover',
									},
								}}
							>
								<MenuIcon />
							</IconButton>
							<Drawer
								variant='temporary'
								anchor='right'
								open={mobileOpen}
								onClose={handleDrawerToggle}
								ModalProps={{
									keepMounted: true, // Better open performance on mobile.
								}}
								sx={{
									display: { xs: 'block', md: 'none' },
									'& .MuiDrawer-paper': {
										boxSizing: 'border-box',
										width: 240,
										backgroundColor: 'background.paper',
									},
								}}
							>
								{drawer}
							</Drawer>
						</>
					) : (
						<Stack direction='row' spacing={2} alignItems='center'>
							<Link href='/about'>
								<Button
									color='inherit'
									sx={{
										textTransform: 'none',
										fontWeight: 500,
										'&:hover': {
											color: 'primary.main',
											backgroundColor: 'transparent',
										},
									}}
								>
									About
								</Button>
							</Link>
							<Link href='/contact'>
								<Button
									color='inherit'
									sx={{
										textTransform: 'none',
										fontWeight: 500,
										'&:hover': {
											color: 'primary.main',
											backgroundColor: 'transparent',
										},
									}}
								>
									Contact
								</Button>
							</Link>
							{isLoggedIn ? (
								<>
									<Link href='/administrator'>
										<Button
											color='inherit'
											sx={{
												textTransform: 'none',
												fontWeight: 500,
												'&:hover': {
													color: 'primary.main',
													backgroundColor: 'transparent',
												},
											}}
										>
											Dashboard
										</Button>
									</Link>
									<Button
										color='inherit'
										onClick={handleLogout}
										sx={{
											textTransform: 'none',
											fontWeight: 500,
											'&:hover': {
												color: 'primary.main',
												backgroundColor: 'transparent',
											},
										}}
									>
										Logout
									</Button>
								</>
							) : (
								<Link href='/login'>
									<Button
										color='inherit'
										sx={{
											textTransform: 'none',
											fontWeight: 500,
											'&:hover': {
												color: 'primary.main',
												backgroundColor: 'transparent',
											},
										}}
									>
										Login
									</Button>
								</Link>
							)}
							<DarkModeToggleButton />
						</Stack>
					)}
				</Toolbar>
			</Container>
		</AppBar>
	);
}
