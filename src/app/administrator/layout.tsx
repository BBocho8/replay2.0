'use client';

import DarkModeToggleButton from '@/components/main-components/DarkModeToggleButton';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import DashboardIcon from '@mui/icons-material/Dashboard';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import MenuIcon from '@mui/icons-material/Menu';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PeopleIcon from '@mui/icons-material/People';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import {
	AppBar,
	Avatar,
	Badge,
	Box,
	Button,
	Drawer,
	IconButton,
	List,
	ListItemButton,
	Stack,
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
const collapsedDrawerWidth = 100;

const navItems = [
	{ text: 'Dashboard', href: '/administrator/dashboard', icon: <DashboardIcon /> },
	{ text: 'Manage Matches', href: '/administrator/matches', icon: <SportsSoccerIcon /> },
	{ text: 'Manage Competitions', href: '/administrator/competitions', icon: <EmojiEventsIcon /> },
	{ text: 'Manage Players/Coaches', href: '/administrator/users', icon: <PeopleIcon /> },
	{ text: 'Manage Clubs', href: '/administrator/clubs', icon: <HomeWorkIcon /> },
	{ text: 'Manage Calendar', href: '/administrator/calendar', icon: <CalendarMonthIcon /> },
	{ text: 'Manage Fines', href: '/administrator/fines', icon: <MonetizationOnIcon /> },
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
			<Box px={2} py={1.5} display='flex' alignItems='center' justifyContent='space-between'>
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

			<List sx={{ flexGrow: 1 }}>
				{navItems.map(item => (
					<Link key={item.href} href={item.href} passHref>
						<Tooltip title={collapsed ? item.text : ''} placement='right'>
							<ListItemButton
								selected={pathname.startsWith(item.href)}
								sx={{
									borderRadius: 2,
									mx: 1,
									my: 0.5,
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
									alignItems: collapsed ? 'center' : 'flex-start',
									py: collapsed ? 2 : 1,
								}}
							>
								<Box display='flex' flexDirection='column' alignItems='center'>
									<Box sx={{ fontSize: collapsed ? '1.5rem' : '1.25rem', transition: 'font-size 0.3s ease' }}>
										{item.icon}
									</Box>
									<Typography
										variant='caption'
										sx={{ mt: 0.5, fontSize: collapsed ? '0.6rem' : '1rem', textAlign: 'center' }}
									>
										{item.text}
									</Typography>
								</Box>
							</ListItemButton>
						</Tooltip>
					</Link>
				))}
			</List>

			<Link href='/' passHref>
				<ListItemButton
					sx={{
						borderRadius: 2,
						mx: 1,
						my: 0.5,
						color: 'inherit',
						backgroundColor: 'rgba(255,255,255,0.05)',
						'&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' },
						justifyContent: 'center',
						alignItems: collapsed ? 'center' : 'flex-start',
						py: collapsed ? 2 : 1,
					}}
				>
					<Box display='flex' flexDirection='column' alignItems='center'>
						<Box sx={{ fontSize: collapsed ? '1.5rem' : '1.25rem', transition: 'font-size 0.3s ease' }}>
							<ExitToAppIcon />
						</Box>
						<Typography
							variant='caption'
							sx={{ mt: 0.5, fontSize: collapsed ? '0.6rem' : '1rem', textAlign: 'center' }}
						>
							Exit Admin
						</Typography>
					</Box>
				</ListItemButton>
			</Link>

			<Box p={2} display='flex' justifyContent='center'>
				<DarkModeToggleButton />
			</Box>
		</Box>
	);

	return (
		<Box
			display='flex'
			height='100vh'
			sx={{
				width: '100%',
				overflow: 'hidden',
				position: 'relative',
			}}
		>
			<AppBar
				position='fixed'
				sx={{
					width: { md: `calc(100% - ${collapsed ? collapsedDrawerWidth : expandedDrawerWidth}px)` },
					ml: { md: `${collapsed ? collapsedDrawerWidth : expandedDrawerWidth}px` },
					backgroundColor: 'background.paper',
					color: 'text.primary',
					boxShadow: theme.palette.mode === 'dark' ? '0 1px 2px rgba(0,0,0,0.5)' : '0 1px 2px rgba(0,0,0,0.1)',
					zIndex: theme.zIndex.drawer + 1,
				}}
			>
				<Toolbar sx={{ justifyContent: 'space-between' }}>
					{isMobile && (
						<IconButton color='inherit' edge='start' onClick={toggleDrawer}>
							<MenuIcon />
						</IconButton>
					)}
					<Stack direction='row' spacing={2} alignItems='center'>
						<Typography fontWeight='bold' fontSize='1.25rem'>
							Administrator
						</Typography>
						<Button
							variant='outlined'
							size='small'
							sx={{
								ml: 2,
								textTransform: 'none',
								borderRadius: 2,
							}}
						>
							Quick Actions
						</Button>
					</Stack>
					<Stack direction='row' spacing={1} alignItems='center'>
						<IconButton color='inherit'>
							<Badge badgeContent={3} color='error'>
								<NotificationsIcon />
							</Badge>
						</IconButton>
						<Avatar
							sx={{
								width: 32,
								height: 32,
								bgcolor: 'primary.main',
							}}
						>
							A
						</Avatar>
						{!isMobile && <DarkModeToggleButton />}
					</Stack>
				</Toolbar>
			</AppBar>

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

			<Box
				component='main'
				sx={{
					flexGrow: 1,
					width: { md: `calc(100% - ${collapsed ? collapsedDrawerWidth : expandedDrawerWidth}px)` },
					mt: '64px',
					height: 'calc(100vh - 64px)',
					overflow: 'auto',
					backgroundColor: theme.palette.mode === 'light' ? '#f5f5f5' : theme.palette.background.default,
					transition: 'all 0.3s ease',
					p: { xs: 2, md: 3 },
					position: 'relative',
					zIndex: 0,
				}}
			>
				{children}
			</Box>
		</Box>
	);
}
