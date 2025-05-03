'use client';

import { useDashboardStats } from '@/hook/useDashboardStats';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import PeopleIcon from '@mui/icons-material/People';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import { Box, Card, CardActionArea, CardContent, Grid, Typography } from '@mui/material';
import Link from 'next/link';

const sections = [
	{ title: 'Matches', icon: <SportsSoccerIcon fontSize='large' />, href: '/administrator/matches' },
	{ title: 'Competitions', icon: <EmojiEventsIcon fontSize='large' />, href: '/administrator/competitions' },
	{ title: 'Users', icon: <PeopleIcon fontSize='large' />, href: '/administrator/users' },
	{ title: 'Clubs', icon: <HomeWorkIcon fontSize='large' />, href: '/administrator/clubs' },
	{ title: 'Calendar', icon: <CalendarMonthIcon fontSize='large' />, href: '/administrator/calendar' },
	{ title: 'Fines', icon: <MonetizationOnIcon fontSize='large' />, href: '/administrator/fines' },
];

export default function DashboardPage() {
	const { stats, isLoading: statsLoading, error: statsError } = useDashboardStats();
	return (
		<Box p={6}>
			<Typography color='text.primary' variant='h4' fontWeight='bold' mb={4}>
				Admin Dashboard
			</Typography>

			<Grid container spacing={2} mb={4}>
				{[
					{ label: 'Players', value: stats?.players },
					{ label: 'Coaches', value: stats?.coaches },
					{ label: 'Admins', value: stats?.admins },
					{ label: 'Competitions', value: stats?.competitions },
					{ label: 'Matches Played', value: stats?.matches },
				].map(stat => (
					<Grid
						size={{
							xs: 12,
							sm: 6,
							md: 4,
							lg: 2.4,
						}}
						key={stat.label}
					>
						<Card sx={{ borderRadius: 3, boxShadow: 3 }}>
							<CardContent>
								<Typography variant='subtitle1' color='text.secondary'>
									{stat.label}
								</Typography>
								<Typography variant='h5'>{stat.value ?? 0}</Typography>
							</CardContent>
						</Card>
					</Grid>
				))}
			</Grid>

			<Grid container spacing={4}>
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
							<Card elevation={3} sx={{ textAlign: 'center', p: 2 }}>
								<CardActionArea sx={{ p: 3 }}>
									{section.icon}
									<Typography variant='h6' mt={1}>
										{section.title}
									</Typography>
								</CardActionArea>
							</Card>
						</Link>
					</Grid>
				))}
			</Grid>
		</Box>
	);
}
