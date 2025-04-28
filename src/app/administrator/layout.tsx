'use client';

import DarkModeToggleButton from '@/components/main-components/DarkModeToggleButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import DashboardIcon from '@mui/icons-material/Dashboard';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import MenuIcon from '@mui/icons-material/Menu';
import PeopleIcon from '@mui/icons-material/People';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import {
	AppBar,
	Box,
	Drawer,
	IconButton,
	List,
	ListItemButton,
	Toolbar,
	Tooltip,
	Typography,
	useMediaQuery,
	useTheme,
} from '@mui/material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const expandedDrawerWidth = 240;
const collapsedDrawerWidth = 84;

const navItems = [
	{ text: 'Dashboard', href: '/administrator/dashboard', icon: <DashboardIcon /> },
	{ text: 'Manage Matches', href: '/administrator/matches', icon: <SportsSoccerIcon /> },
	{ text: 'Manage Competitions', href: '/administrator/competitions', icon: <EmojiEventsIcon /> },
	{ text: 'Manage Players/Coaches', href: '/administrator/users', icon: <PeopleIcon /> },
	{ text: 'Manage Clubs', href: '/administrator/clubs', icon: <HomeWorkIcon /> },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
	const pathname = usePathname();
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('md'));
	const isSmallDesktop = useMediaQuery(theme.breakpoints.down('lg'));
	const [mobileOpen, setMobileOpen] = useState(false);
	const [collapsed, setCollapsed] = useState(false);

	useEffect(() => {
		if (isMobile) {
			setCollapsed(false);
		} else if (isSmallDesktop) {
			setCollapsed(true);
		} else {
			setCollapsed(false);
		}
	}, [isMobile, isSmallDesktop]);

	const toggleDrawer = () => {
		setMobileOpen(!mobileOpen);
	};

	const toggleCollapse = () => {
		setCollapsed(!collapsed);
	};

	const drawerContent = (
		<Box
			height='100%'
			display='flex'
			flexDirection='column'
			sx={{
				bgcolor: theme.palette.mode === 'light' ? 'grey.100' : 'grey.900',
				color: 'text.primary',
			}}
		>
			<Box className='p-4 flex items-center justify-between'>
				{!collapsed && (
					<Typography fontWeight='bold' fontSize='1.25rem'>
						Admin
					</Typography>
				)}
				{!isMobile && (
					<IconButton onClick={toggleCollapse} color='inherit' size='small'>
						{collapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
					</IconButton>
				)}
			</Box>

			<List className='flex-1'>
				{navItems.map(item => (
					<Link key={item.href} href={item.href} passHref>
						<Tooltip title={collapsed ? item.text : ''} placement='right'>
							<ListItemButton
								selected={pathname.startsWith(item.href)}
								className='rounded-lg mx-2 my-1 flex-col md:flex-row md:items-center'
								sx={{
									color: 'inherit',
									backgroundColor: pathname.startsWith(item.href)
										? theme.palette.mode === 'light'
											? 'rgba(0,0,0,0.04)'
											: 'rgba(255,255,255,0.08)'
										: 'transparent',
									'&.Mui-selected': {
										backgroundColor: theme.palette.mode === 'light' ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.16)',
									},
									justifyContent: 'center',
									alignItems: { xs: 'center', md: collapsed ? 'center' : 'flex-start' },
									py: collapsed ? 2 : 1,
								}}
							>
								<Box display='flex' flexDirection='column' alignItems='center' justifyContent='center'>
									<Box
										sx={{
											fontSize: collapsed ? '1.5rem' : '1.25rem',
											display: 'flex',
											alignItems: 'center',
											justifyContent: 'center',
											transition: 'font-size 0.3s ease',
										}}
									>
										{item.icon}
									</Box>
									<Typography
										variant='caption'
										sx={{
											color: 'text.primary',
											fontSize: collapsed ? '0.6rem' : '1rem',
											mt: 0.5,
											display: 'block', // 🛠 Always block
											textAlign: 'center',
										}}
									>
										{item.text}
									</Typography>
								</Box>
							</ListItemButton>
						</Tooltip>
					</Link>
				))}
			</List>

			{/* Exit Admin Button */}
			<Link href='/' passHref>
				<ListItemButton
					className='rounded-lg mx-2 my-1 flex-col md:flex-row md:items-center'
					sx={{
						color: 'inherit',
						backgroundColor: 'rgba(255,255,255,0.05)',
						'&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' },
						justifyContent: 'center',
						alignItems: { xs: 'center', md: collapsed ? 'center' : 'flex-start' },
						py: collapsed ? 2 : 1,
					}}
				>
					<Box display='flex' flexDirection='column' alignItems='center' justifyContent='center'>
						<Box
							sx={{
								fontSize: collapsed ? '1.5rem' : '1.25rem',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								transition: 'font-size 0.3s ease',
							}}
						>
							<ExitToAppIcon />
						</Box>
						<Typography
							variant='caption'
							sx={{
								color: 'text.primary',
								fontSize: collapsed ? '0.6rem' : '1rem',
								mt: 0.5,
								display: 'block', // 🛠 Always block
								textAlign: 'center',
							}}
						>
							Exit Admin
						</Typography>
					</Box>
				</ListItemButton>
			</Link>

			<Box className='p-4 flex justify-center'>
				<DarkModeToggleButton />
			</Box>
		</Box>
	);

	return (
		<Box className='flex h-screen'>
			{/* AppBar */}
			<AppBar
				position='fixed'
				sx={{
					width: { md: `calc(100% - ${collapsed ? collapsedDrawerWidth : expandedDrawerWidth}px)` },
					ml: { md: `${collapsed ? collapsedDrawerWidth : expandedDrawerWidth}px` },
					backgroundColor: 'background.paper',
					color: 'text.primary',
					boxShadow: theme.palette.mode === 'dark' ? '0 1px 2px rgba(0,0,0,0.5)' : '0 1px 2px rgba(0,0,0,0.1)',
				}}
			>
				<Toolbar className='flex justify-between'>
					{isMobile && (
						<IconButton color='inherit' edge='start' onClick={toggleDrawer}>
							<MenuIcon />
						</IconButton>
					)}
					<Typography fontWeight='bold' fontSize='1.25rem'>
						Administrator
					</Typography>
					{!isMobile && <DarkModeToggleButton />}
				</Toolbar>
			</AppBar>
			{/* Sidebar */}
			<nav>
				{isMobile ? (
					<Drawer
						variant='temporary'
						open={mobileOpen}
						onClose={toggleDrawer}
						ModalProps={{ keepMounted: true }}
						sx={{
							'& .MuiDrawer-paper': {
								width: expandedDrawerWidth,
								bgcolor: theme.palette.mode === 'light' ? 'grey.100' : 'grey.900',
								color: 'text.primary',
							},
						}}
					>
						{drawerContent}
					</Drawer>
				) : (
					<Drawer
						variant='permanent'
						sx={{
							width: collapsed ? collapsedDrawerWidth : expandedDrawerWidth,
							flexShrink: 0,
							'& .MuiDrawer-paper': {
								width: collapsed ? collapsedDrawerWidth : expandedDrawerWidth,
								top: '64px',
								height: 'calc(100% - 64px)',
								transition: 'width 0.3s ease',
							},
						}}
						open
					>
						{drawerContent}
					</Drawer>
				)}
			</nav>
			{/* Page Content */}
			<main
				className='flex-1 overflow-y-auto p-6 mt-[64px] transition-all duration-300'
				style={{
					backgroundColor: theme.palette.mode === 'light' ? '#f5f5f5' : theme.palette.background.default,
				}}
			>
				{children}
			</main>{' '}
		</Box>
	);
}
