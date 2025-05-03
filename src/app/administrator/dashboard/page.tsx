'use client';

import { useDashboardStats } from '@/hook/useDashboardStats';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import PeopleIcon from '@mui/icons-material/People';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import { Avatar, Box, Card, CardActionArea, CardContent, Grid, LinearProgress, Stack, Typography } from '@mui/material';
import Link from 'next/link';

const sections = [
	{
		title: 'Matches',
		icon: <SportsSoccerIcon fontSize='large' />,
		href: '/administrator/matches',
		description: 'Manage match schedules, results, and video uploads',
	},
	{
		title: 'Competitions',
		icon: <EmojiEventsIcon fontSize='large' />,
		href: '/administrator/competitions',
		description: 'Organize leagues, tournaments, and standings',
	},
	{
		title: 'Users',
		icon: <PeopleIcon fontSize='large' />,
		href: '/administrator/users',
		description: 'Manage player, coach, and staff accounts',
	},
	{
		title: 'Clubs',
		icon: <HomeWorkIcon fontSize='large' />,
		href: '/administrator/clubs',
		description: 'Handle club registrations and memberships',
	},
	{
		title: 'Calendar',
		icon: <CalendarMonthIcon fontSize='large' />,
		href: '/administrator/calendar',
		description: 'Schedule events and track attendance',
	},
	{
		title: 'Fines',
		icon: <MonetizationOnIcon fontSize='large' />,
		href: '/administrator/fines',
		description: 'Manage fines and payment tracking',
	},
];

export default function DashboardPage() {
	const { stats, isLoading: statsLoading, error: statsError } = useDashboardStats();

	const statCards = [
		{
			label: 'Players',
			value: stats?.players,
			icon: <PeopleIcon />,
			color: 'primary.main',
		},
		{
			label: 'Coaches',
			value: stats?.coaches,
			icon: <PeopleIcon />,
			color: 'secondary.main',
		},
		{
			label: 'Admins',
			value: stats?.admins,
			icon: <PeopleIcon />,
			color: 'success.main',
		},
		{
			label: 'Competitions',
			value: stats?.competitions,
			icon: <EmojiEventsIcon />,
			color: 'info.main',
		},
		{
			label: 'Matches Played',
			value: stats?.matches,
			icon: <SportsSoccerIcon />,
			color: 'warning.main',
		},
	];

	return (
		<Box sx={{ p: { xs: 2, md: 4 } }}>
			<Typography
				variant='h4'
				sx={{
					fontWeight: 700,
					mb: 4,
					color: 'text.primary',
				}}
			>
				Admin Dashboard
			</Typography>

			{/* Stats Overview */}
			<Grid container spacing={3} mb={4}>
				{statCards.map(stat => (
					<Grid
						size={{
							xs: 12,
							sm: 6,
							md: 4,
							lg: 2.4,
						}}
						key={stat.label}
					>
						<Card
							sx={{
								height: '100%',
								borderRadius: 2,
								boxShadow: 3,
								transition: 'transform 0.2s',
								'&:hover': {
									transform: 'translateY(-4px)',
								},
							}}
						>
							<CardContent>
								<Stack direction='row' alignItems='center' spacing={2} mb={2}>
									<Avatar
										sx={{
											bgcolor: stat.color,
											width: 40,
											height: 40,
										}}
									>
										{stat.icon}
									</Avatar>
									<Typography variant='subtitle1' color='text.secondary'>
										{stat.label}
									</Typography>
								</Stack>
								<Typography
									variant='h4'
									sx={{
										fontWeight: 700,
										color: stat.color,
									}}
								>
									{stat.value ?? 0}
								</Typography>
								<LinearProgress
									variant='determinate'
									value={100}
									sx={{
										mt: 1,
										height: 4,
										borderRadius: 2,
										backgroundColor: `${stat.color}20`,
										'& .MuiLinearProgress-bar': {
											backgroundColor: stat.color,
										},
									}}
								/>
							</CardContent>
						</Card>
					</Grid>
				))}
			</Grid>

			{/* Quick Access Sections */}
			<Typography
				variant='h5'
				sx={{
					fontWeight: 600,
					mb: 3,
					color: 'text.primary',
				}}
			>
				Quick Access
			</Typography>
			<Grid container spacing={3}>
				{sections.map(section => (
					<Grid
						size={{
							xs: 12,
							sm: 6,
							md: 4,
							lg: 3,
						}}
						key={section.title}
					>
						<Link href={section.href} passHref legacyBehavior>
							<Card
								elevation={3}
								sx={{
									height: '100%',
									borderRadius: 2,
									transition: 'transform 0.2s',
									'&:hover': {
										transform: 'translateY(-4px)',
										boxShadow: 6,
									},
								}}
							>
								<CardActionArea sx={{ p: 3 }}>
									<Stack spacing={2} alignItems='center'>
										<Avatar
											sx={{
												bgcolor: 'primary.main',
												width: 56,
												height: 56,
												mb: 1,
											}}
										>
											{section.icon}
										</Avatar>
										<Typography
											variant='h6'
											sx={{
												fontWeight: 600,
												textAlign: 'center',
											}}
										>
											{section.title}
										</Typography>
										<Typography
											variant='body2'
											color='text.secondary'
											sx={{
												textAlign: 'center',
											}}
										>
											{section.description}
										</Typography>
									</Stack>
								</CardActionArea>
							</Card>
						</Link>
					</Grid>
				))}
			</Grid>
		</Box>
	);
}
