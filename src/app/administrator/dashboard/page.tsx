'use client';

import { useDashboardStats } from '@/hook/useDashboardStats';
import type { Match } from '@/types/supabase/database';
import { Button, Card, CardContent, CircularProgress, Typography } from '@mui/material';
import dayjs from 'dayjs';
import Link from 'next/link';

export default function DashboardPage() {
	const { stats, isLoading, error } = useDashboardStats();

	const recentMatches: Match[] = []; // Fetch real data later

	if (isLoading) {
		return (
			<div className='flex justify-center items-center h-60'>
				<CircularProgress />
			</div>
		);
	}

	if (error) {
		return (
			<div className='flex justify-center items-center h-60'>
				<Typography color='error'>Failed to load dashboard data.</Typography>
			</div>
		);
	}

	return (
		<div className='p-6 space-y-8'>
			{/* Quick Actions */}
			<div className='flex flex-wrap gap-4'>
				<Link href='/administrator/matches'>
					<Button variant='contained' color='primary'>
						Create Match
					</Button>
				</Link>
				<Link href='/administrator/competitions'>
					<Button variant='contained' color='secondary'>
						Add Competition
					</Button>
				</Link>
				<Link href='/administrator/people'>
					<Button variant='outlined'>Manage People</Button>
				</Link>
			</div>

			{/* Metrics */}
			<div className='grid grid-cols-1 md:grid-cols-4 gap-6'>
				<Card className='shadow'>
					<CardContent>
						<Typography variant='h6' className='mb-2'>
							Matches Played
						</Typography>
						<Typography variant='h4'>{stats?.matches}</Typography>
					</CardContent>
				</Card>
				<Card className='shadow'>
					<CardContent>
						<Typography variant='h6' className='mb-2'>
							Competitions
						</Typography>
						<Typography variant='h4'>{stats?.competitions}</Typography>
					</CardContent>
				</Card>
				<Card className='shadow'>
					<CardContent>
						<Typography variant='h6' className='mb-2'>
							Players
						</Typography>
						<Typography variant='h4'>{stats?.players}</Typography>
					</CardContent>
				</Card>
				<Card className='shadow'>
					<CardContent>
						<Typography variant='h6' className='mb-2'>
							Coaches
						</Typography>
						<Typography variant='h4'>{stats?.coaches}</Typography>
					</CardContent>
				</Card>
			</div>

			{/* Recent Matches */}
			<div className='space-y-4'>
				<Typography variant='h5'>Recent Matches</Typography>

				{recentMatches.length === 0 ? (
					<div className='text-gray-500'>No recent matches available.</div>
				) : (
					<ul className='space-y-2'>
						{recentMatches.map(match => (
							<li key={match.id} className='bg-white rounded p-4 shadow flex justify-between items-center'>
								<div>
									{match.home_team} vs {match.away_team}
								</div>
								<div className='text-sm text-gray-500'>{dayjs(match.date).format('DD/MM/YYYY')}</div>
							</li>
						))}
					</ul>
				)}
			</div>
		</div>
	);
}
